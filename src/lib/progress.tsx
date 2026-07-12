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
import { getMission } from "@/data/content";
import type {
  AgeBand,
  ChildProfile,
  GrownupRole,
  MissionProof,
  ProgressState,
} from "@/lib/types";

const STORAGE_KEY = "kampung-kids-progress-v2";

const defaultState: ProgressState = {
  profile: null,
  completedLessons: [],
  proofs: [],
  earnedBadges: [],
  totalStars: 0,
  parentPin: "1234",
};

function normalizeProof(proof: MissionProof): MissionProof {
  if (proof.status) return proof;
  return {
    ...proof,
    status: proof.parentConfirmed ? "approved" : "pending",
  };
}

function normalizeState(raw: ProgressState): ProgressState {
  return {
    ...defaultState,
    ...raw,
    proofs: (raw.proofs ?? []).map(normalizeProof),
  };
}

type ProgressContextValue = {
  state: ProgressState;
  hydrated: boolean;
  setProfile: (name: string, ageBand: AgeBand) => void;
  completeLesson: (lessonId: string) => void;
  submitProof: (input: {
    missionId: string;
    note: string;
  }) => { ok: true } | { ok: false; errorKey: "errorEmptyNote" | "errorAlready" | "errorNotFound" };
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

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

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
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  }, []);

  const submitProof = useCallback(
    (input: { missionId: string; note: string }) => {
      const mission = getMission(input.missionId);
      if (!mission) {
        return { ok: false as const, errorKey: "errorNotFound" as const };
      }

      const existing = state.proofs.find((p) => p.missionId === input.missionId);
      if (existing && existing.status !== "rejected") {
        return { ok: false as const, errorKey: "errorAlready" as const };
      }

      if (!input.note.trim()) {
        return { ok: false as const, errorKey: "errorEmptyNote" as const };
      }

      const proof: MissionProof = {
        missionId: input.missionId,
        note: input.note.trim(),
        submittedAt: new Date().toISOString(),
        status: "pending",
        parentConfirmed: false,
        starsEarned: 0,
      };

      setState((prev) => ({
        ...prev,
        proofs: [
          ...prev.proofs.filter((p) => p.missionId !== input.missionId),
          proof,
        ],
        completedLessons: prev.completedLessons.includes(mission.lessonId)
          ? prev.completedLessons
          : [...prev.completedLessons, mission.lessonId],
      }));

      return { ok: true as const };
    },
    [state.proofs],
  );

  const approveProof = useCallback(
    (missionId: string, role: GrownupRole) => {
      const mission = getMission(missionId);
      if (!mission) return { ok: false as const, error: "Mission not found." };

      const proof = state.proofs.find((p) => p.missionId === missionId);
      if (!proof || proof.status !== "pending") {
        return { ok: false as const, error: "No pending proof." };
      }

      setState((prev) => ({
        ...prev,
        proofs: prev.proofs.map((p) =>
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
        totalStars: prev.totalStars + mission.stars,
        earnedBadges: prev.earnedBadges.includes(mission.badgeId)
          ? prev.earnedBadges
          : [...prev.earnedBadges, mission.badgeId],
      }));

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

  const pendingProofs = useMemo(
    () => state.proofs.filter((p) => p.status === "pending"),
    [state.proofs],
  );

  const approvedProofs = useMemo(
    () => state.proofs.filter((p) => p.status === "approved"),
    [state.proofs],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      hydrated,
      setProfile,
      completeLesson,
      submitProof,
      approveProof,
      rejectProof,
      changePin,
      verifyPin,
      resetProgress,
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
    }),
    [
      state,
      hydrated,
      setProfile,
      completeLesson,
      submitProof,
      approveProof,
      rejectProof,
      changePin,
      verifyPin,
      resetProgress,
      pendingProofs,
      approvedProofs,
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
