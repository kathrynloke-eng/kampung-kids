"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getMission } from "@/data/content";
import { defaultRewards } from "@/data/rewards";
import { calcStreak, dateKey } from "@/lib/dates";
import type {
  AgeBand,
  ChildProfile,
  GrownupRole,
  MissionProof,
  PracticeEntry,
  ProgressState,
  RewardItem,
  RewardRedemption,
} from "@/lib/types";

const STORAGE_KEY = "kampung-kids-progress-v2";

const defaultState: ProgressState = {
  profile: null,
  completedLessons: [],
  proofs: [],
  earnedBadges: [],
  totalStars: 0,
  parentPin: "1234",
  practiceDates: [],
  practiceEntries: [],
  rewards: defaultRewards,
  redemptions: [],
};

function normalizeProof(proof: MissionProof): MissionProof {
  if (proof.status) return proof;
  return {
    ...proof,
    status: proof.parentConfirmed ? "approved" : "pending",
  };
}

function withPracticeDay(
  prev: ProgressState,
  when = new Date(),
): ProgressState {
  const key = dateKey(when);
  if (prev.practiceDates.includes(key)) return prev;
  return {
    ...prev,
    practiceDates: [...prev.practiceDates, key],
  };
}

function normalizeState(raw: ProgressState): ProgressState {
  const savedRewards = raw.rewards?.length ? raw.rewards : defaultRewards;
  const knownIds = new Set(savedRewards.map((r) => r.id));
  const mergedRewards = [
    ...savedRewards,
    ...defaultRewards.filter((r) => !knownIds.has(r.id)),
  ];
  return {
    ...defaultState,
    ...raw,
    proofs: (raw.proofs ?? []).map(normalizeProof),
    practiceDates: raw.practiceDates ?? [],
    practiceEntries: raw.practiceEntries ?? [],
    rewards: mergedRewards,
    redemptions: raw.redemptions ?? [],
  };
}

type ProgressContextValue = {
  state: ProgressState;
  hydrated: boolean;
  streak: number;
  practicedToday: boolean;
  setProfile: (name: string, ageBand: AgeBand) => void;
  completeLesson: (lessonId: string) => void;
  submitProof: (input: {
    missionId: string;
    note?: string;
    transcript?: string;
    drawingDataUrl?: string;
    audioDataUrl?: string;
  }) =>
    | { ok: true }
    | {
        ok: false;
        errorKey: "errorEmptyProof" | "errorAlready" | "errorNotFound";
      };
  logPractice: (input: {
    missionId: string;
    note?: string;
    transcript?: string;
    drawingDataUrl?: string;
    audioDataUrl?: string;
  }) =>
    | { ok: true }
    | {
        ok: false;
        errorKey:
          | "errorEmptyProof"
          | "errorAlready"
          | "errorNotFound"
          | "errorNeedApproveFirst"
          | "errorPracticedToday";
      };
  approveProof: (
    missionId: string,
    role: GrownupRole,
  ) => { ok: true } | { ok: false; error: string };
  rejectProof: (missionId: string) => void;
  changePin: (nextPin: string) => { ok: true } | { ok: false; errorKey: "pinInvalid" };
  verifyPin: (pin: string) => boolean;
  resetProgress: () => void;
  isLessonComplete: (lessonId: string) => boolean;
  isMissionApproved: (missionId: string) => boolean;
  isMissionPending: (missionId: string) => boolean;
  hasBadge: (badgeId: string) => boolean;
  pendingProofs: MissionProof[];
  approvedProofs: MissionProof[];
  recentPractice: PracticeEntry[];
  pendingRedemptions: RewardRedemption[];
  requestReward: (
    rewardId: string,
  ) =>
    | { ok: true }
    | { ok: false; errorKey: "errorNotFound" | "errorCannotAfford" | "errorRewardDisabled" };
  fulfillRedemption: (redemptionId: string) => void;
  cancelRedemption: (redemptionId: string) => void;
  upsertReward: (reward: RewardItem) => void;
  toggleReward: (rewardId: string, enabled: boolean) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function loadState(): ProgressState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ??
      localStorage.getItem("kampung-kids-progress-v1");
    if (!raw) return defaultState;
    return normalizeState(JSON.parse(raw) as ProgressState);
  } catch {
    return defaultState;
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const remoteProgress = useQuery(
    api.progress.getMine,
    isAuthenticated ? {} : "skip",
  );
  const saveRemoteProgress = useMutation(api.progress.saveMine);
  const [remoteLoaded, setRemoteLoaded] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated || remoteProgress === undefined || remoteLoaded) return;
    if (remoteProgress?.state) {
      setState(normalizeState(remoteProgress.state as ProgressState));
    }
    setRemoteLoaded(true);
  }, [isAuthenticated, remoteLoaded, remoteProgress]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  useEffect(() => {
    if (!isAuthenticated || !remoteLoaded) return;
    void saveRemoteProgress({ state });
  }, [isAuthenticated, remoteLoaded, saveRemoteProgress, state]);

  const setProfile = useCallback((name: string, ageBand: AgeBand) => {
    const profile: ChildProfile = {
      name: name.trim() || "Kampung Kid",
      ageBand,
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({ ...prev, profile }));
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setState((prev) => {
      const next = withPracticeDay(prev);
      if (next.completedLessons.includes(lessonId)) return next;
      return {
        ...next,
        completedLessons: [...next.completedLessons, lessonId],
      };
    });
  }, []);

  const submitProof = useCallback(
    (input: {
      missionId: string;
      note?: string;
      transcript?: string;
      drawingDataUrl?: string;
      audioDataUrl?: string;
    }) => {
      const mission = getMission(input.missionId);
      if (!mission) {
        return { ok: false as const, errorKey: "errorNotFound" as const };
      }

      const existing = state.proofs.find((p) => p.missionId === input.missionId);
      if (existing && existing.status !== "rejected") {
        return { ok: false as const, errorKey: "errorAlready" as const };
      }

      const transcript = (input.transcript ?? "").trim();
      const note = (input.note ?? transcript).trim();
      const drawingDataUrl = input.drawingDataUrl?.startsWith("data:")
        ? input.drawingDataUrl
        : undefined;
      const audioDataUrl = input.audioDataUrl?.startsWith("data:")
        ? input.audioDataUrl
        : undefined;

      if (!note && !drawingDataUrl && !audioDataUrl) {
        return { ok: false as const, errorKey: "errorEmptyProof" as const };
      }

      const proof: MissionProof = {
        missionId: input.missionId,
        note,
        transcript: transcript || undefined,
        drawingDataUrl,
        audioDataUrl,
        submittedAt: new Date().toISOString(),
        status: "pending",
        parentConfirmed: false,
        starsEarned: 0,
      };

      setState((prev) => {
        const next = withPracticeDay(prev);
        return {
          ...next,
          proofs: [
            ...next.proofs.filter((p) => p.missionId !== input.missionId),
            proof,
          ],
          completedLessons: next.completedLessons.includes(mission.lessonId)
            ? next.completedLessons
            : [...next.completedLessons, mission.lessonId],
        };
      });

      return { ok: true as const };
    },
    [state.proofs],
  );

  const logPractice = useCallback(
    (input: {
      missionId: string;
      note?: string;
      transcript?: string;
      drawingDataUrl?: string;
      audioDataUrl?: string;
    }) => {
      const mission = getMission(input.missionId);
      if (!mission) {
        return { ok: false as const, errorKey: "errorNotFound" as const };
      }

      const approved = state.proofs.some(
        (p) => p.missionId === input.missionId && p.status === "approved",
      );
      if (!approved) {
        return {
          ok: false as const,
          errorKey: "errorNeedApproveFirst" as const,
        };
      }

      const today = dateKey();
      if (
        state.practiceEntries.some(
          (e) => e.missionId === input.missionId && e.dateKey === today,
        )
      ) {
        return {
          ok: false as const,
          errorKey: "errorPracticedToday" as const,
        };
      }

      const transcript = (input.transcript ?? "").trim();
      const note = (input.note ?? transcript).trim();
      const drawingDataUrl = input.drawingDataUrl?.startsWith("data:")
        ? input.drawingDataUrl
        : undefined;
      const audioDataUrl = input.audioDataUrl?.startsWith("data:")
        ? input.audioDataUrl
        : undefined;

      if (!note && !drawingDataUrl && !audioDataUrl) {
        return { ok: false as const, errorKey: "errorEmptyProof" as const };
      }

      const entry: PracticeEntry = {
        id: `${input.missionId}-${today}-${Date.now()}`,
        missionId: input.missionId,
        lessonId: mission.lessonId,
        submittedAt: new Date().toISOString(),
        dateKey: today,
        note,
        transcript: transcript || undefined,
        drawingDataUrl,
        audioDataUrl,
      };

      setState((prev) => {
        const next = withPracticeDay(prev);
        return {
          ...next,
          practiceEntries: [...next.practiceEntries, entry],
          totalStars: next.totalStars + 1,
        };
      });

      return { ok: true as const };
    },
    [state.proofs, state.practiceEntries],
  );

  const approveProof = useCallback(
    (missionId: string, role: GrownupRole) => {
      const mission = getMission(missionId);
      if (!mission) return { ok: false as const, error: "Mission not found." };

      const proof = state.proofs.find((p) => p.missionId === missionId);
      if (!proof || proof.status !== "pending") {
        return { ok: false as const, error: "No pending proof." };
      }

      setState((prev) => {
        const next = withPracticeDay(prev);
        return {
          ...next,
          proofs: next.proofs.map((p) =>
            p.missionId === missionId
              ? {
                  ...p,
                  status: "approved" as const,
                  parentConfirmed: true,
                  starsEarned: mission.stars,
                  reviewedAt: new Date().toISOString(),
                  reviewedBy: role,
                }
              : p,
          ),
          totalStars: next.totalStars + mission.stars,
          earnedBadges: next.earnedBadges.includes(mission.badgeId)
            ? next.earnedBadges
            : [...next.earnedBadges, mission.badgeId],
        };
      });

      return { ok: true as const };
    },
    [state.proofs],
  );

  const rejectProof = useCallback((missionId: string) => {
    setState((prev) => ({
      ...prev,
      proofs: prev.proofs.map((p) =>
        p.missionId === missionId
          ? {
              ...p,
              status: "rejected" as const,
              parentConfirmed: false,
              reviewedAt: new Date().toISOString(),
            }
          : p,
      ),
    }));
  }, []);

  const changePin = useCallback((nextPin: string) => {
    if (!/^\d{4}$/.test(nextPin)) {
      return { ok: false as const, errorKey: "pinInvalid" as const };
    }
    setState((prev) => ({ ...prev, parentPin: nextPin }));
    return { ok: true as const };
  }, []);

  const verifyPin = useCallback(
    (pin: string) => pin === state.parentPin,
    [state.parentPin],
  );

  const resetProgress = useCallback(() => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("kampung-kids-progress-v1");
  }, []);

  const requestReward = useCallback(
    (rewardId: string) => {
      const reward = state.rewards.find((r) => r.id === rewardId);
      if (!reward) {
        return { ok: false as const, errorKey: "errorNotFound" as const };
      }
      if (!reward.enabled) {
        return { ok: false as const, errorKey: "errorRewardDisabled" as const };
      }
      if (state.totalStars < reward.cost) {
        return { ok: false as const, errorKey: "errorCannotAfford" as const };
      }
      const redemption: RewardRedemption = {
        id: `redeem-${rewardId}-${Date.now()}`,
        rewardId: reward.id,
        title: reward.title,
        emoji: reward.emoji,
        cost: reward.cost,
        status: "pending",
        requestedAt: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        totalStars: prev.totalStars - reward.cost,
        redemptions: [...prev.redemptions, redemption],
      }));
      return { ok: true as const };
    },
    [state.rewards, state.totalStars],
  );

  const fulfillRedemption = useCallback((redemptionId: string) => {
    setState((prev) => ({
      ...prev,
      redemptions: prev.redemptions.map((r) =>
        r.id === redemptionId
          ? {
              ...r,
              status: "fulfilled" as const,
              fulfilledAt: new Date().toISOString(),
            }
          : r,
      ),
    }));
  }, []);

  const cancelRedemption = useCallback((redemptionId: string) => {
    setState((prev) => {
      const target = prev.redemptions.find((r) => r.id === redemptionId);
      if (!target || target.status !== "pending") return prev;
      return {
        ...prev,
        totalStars: prev.totalStars + target.cost,
        redemptions: prev.redemptions.map((r) =>
          r.id === redemptionId
            ? { ...r, status: "cancelled" as const }
            : r,
        ),
      };
    });
  }, []);

  const upsertReward = useCallback((reward: RewardItem) => {
    setState((prev) => {
      const exists = prev.rewards.some((r) => r.id === reward.id);
      return {
        ...prev,
        rewards: exists
          ? prev.rewards.map((r) => (r.id === reward.id ? reward : r))
          : [...prev.rewards, reward],
      };
    });
  }, []);

  const toggleReward = useCallback((rewardId: string, enabled: boolean) => {
    setState((prev) => ({
      ...prev,
      rewards: prev.rewards.map((r) =>
        r.id === rewardId ? { ...r, enabled } : r,
      ),
    }));
  }, []);

  const pendingProofs = useMemo(
    () => state.proofs.filter((p) => p.status === "pending"),
    [state.proofs],
  );

  const approvedProofs = useMemo(
    () => state.proofs.filter((p) => p.status === "approved"),
    [state.proofs],
  );

  const streak = useMemo(
    () => calcStreak(state.practiceDates),
    [state.practiceDates],
  );

  const practicedTodayFlag = useMemo(
    () => state.practiceDates.includes(dateKey()),
    [state.practiceDates],
  );

  const recentPractice = useMemo(
    () => [...state.practiceEntries].reverse().slice(0, 8),
    [state.practiceEntries],
  );

  const pendingRedemptions = useMemo(
    () => state.redemptions.filter((r) => r.status === "pending"),
    [state.redemptions],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      hydrated: hydrated && !authLoading && (!isAuthenticated || remoteLoaded),
      streak,
      practicedToday: practicedTodayFlag,
      setProfile,
      completeLesson,
      submitProof,
      logPractice,
      approveProof,
      rejectProof,
      changePin,
      verifyPin,
      resetProgress,
      requestReward,
      fulfillRedemption,
      cancelRedemption,
      upsertReward,
      toggleReward,
      isLessonComplete: (lessonId) => state.completedLessons.includes(lessonId),
      isMissionApproved: (missionId) =>
        state.proofs.some(
          (p) => p.missionId === missionId && p.status === "approved",
        ),
      isMissionPending: (missionId) =>
        state.proofs.some(
          (p) => p.missionId === missionId && p.status === "pending",
        ),
      hasBadge: (badgeId) => state.earnedBadges.includes(badgeId),
      pendingProofs,
      approvedProofs,
      recentPractice,
      pendingRedemptions,
    }),
    [
      state,
      hydrated,
      streak,
      practicedTodayFlag,
      setProfile,
      completeLesson,
      submitProof,
      logPractice,
      approveProof,
      rejectProof,
      changePin,
      verifyPin,
      resetProgress,
      requestReward,
      fulfillRedemption,
      cancelRedemption,
      upsertReward,
      toggleReward,
      pendingProofs,
      approvedProofs,
      recentPractice,
      pendingRedemptions,
    ],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
