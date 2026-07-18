import type { Badge, Lesson, Mission } from "@/lib/types";
import { extraBadges, extraLessons, extraMissions } from "@/data/lessons-extra";

export const lessons: Lesson[] = [
  {
    id: "greeting-friends",
    title: "Friendly Greetings",
    pillar: "manners",
    heritage: "shared",
    ageBands: ["4-6", "7-9", "10-12"],
    classId: "friendly-voices",
    summary: "Learn warm ways Singaporeans say hello across cultures.",
    story:
      "In our kampung, every hello can make someone feel welcome. Chinese friends may say 'Ni hao', Malay friends may offer a gentle 'Assalamualaikum' or 'Apa khabar', Indian friends may say 'Namaste' or 'Vanakkam', and many of us simply smile and say 'Hi!' What matters most is kindness in your voice and eyes.",
    tryThis:
      "Practice three greetings at home: a smile + wave, a polite 'Good morning', and one greeting from another culture with respect.",
    reflectionPrompt: "Which greeting made someone smile today?",
    missionId: "mission-greet-someone",
    accent: "#0D9488",
  },
  {
    id: "queue-kampung",
    title: "Queue Like a Kampung Hero",
    pillar: "manners",
    heritage: "shared",
    ageBands: ["4-6", "7-9", "10-12"],
    classId: "kampung-care",
    summary: "Waiting your turn keeps everyone safe and fair.",
    story:
      "At the void deck, canteen, or bus stop, Singapore kids know a secret power: waiting patiently. Cutting the queue may feel faster, but it hurts fairness. A kampung hero stands behind the last person, keeps hands to themselves, and uses calm words if someone is unsure.",
    tryThis: "Next time you wait in line, count slowly to 10 and notice how calm waiting feels.",
    reflectionPrompt: "Where did you wait your turn today?",
    missionId: "mission-queue-turn",
    accent: "#0284C7",
  },
  {
    id: "cny-respect",
    title: "Chinese New Year Respect",
    pillar: "culture",
    heritage: "chinese",
    ageBands: ["4-6", "7-9", "10-12"],
    classId: "festival-friends",
    summary: "Greet elders warmly and celebrate with gratitude.",
    story:
      "During Chinese New Year, families gather, homes are cleaned, and children greet elders with respect. Saying 'Gong Xi Fa Cai' with a smile shows care. Receiving a red packet is exciting — and saying thank you shows good character. We also remember that festivals are about family, not only gifts.",
    tryThis: "Practice a respectful greeting and a clear 'Thank you' for an elder at home.",
    reflectionPrompt: "How did you show respect to an elder this week?",
    missionId: "mission-thank-elder",
    accent: "#DC2626",
  },
  {
    id: "hari-raya-sharing",
    title: "Hari Raya Sharing",
    pillar: "culture",
    heritage: "malay",
    ageBands: ["4-6", "7-9", "10-12"],
    classId: "festival-friends",
    summary: "Celebrate with forgiveness, visiting, and generous hearts.",
    story:
      "Hari Raya Aidilfitri is a joyful time of forgiveness, family visits, and delicious food. A beautiful kampung value is sharing — offering kuih, making guests feel welcome, and saying kind words. Even if it is not your celebration, you can show respect by greeting friends warmly and learning why the day matters.",
    tryThis: "Share a snack or kind word with a family member or friend today.",
    reflectionPrompt: "Who did you make feel welcome?",
    missionId: "mission-share-kindness",
    accent: "#059669",
  },
  {
    id: "deepavali-light",
    title: "Deepavali Light & Kindness",
    pillar: "culture",
    heritage: "indian",
    ageBands: ["4-6", "7-9", "10-12"],
    classId: "festival-friends",
    summary: "Light stands for hope — and kindness brightens others.",
    story:
      "Deepavali, the Festival of Lights, celebrates good over darkness. Homes glow with lamps and rangoli, and families share sweets. Beyond the pretty lights, the lesson for kampung kids is to bring brightness through kind actions: helping, speaking gently, and welcoming friends of every race.",
    tryThis: "Do one 'bright' act: help tidy, share a compliment, or invite someone to play.",
    reflectionPrompt: "What kind act lit someone else's day?",
    missionId: "mission-bright-act",
    accent: "#D97706",
  },
  {
    id: "eurasian-welcome",
    title: "Open-Door Welcome",
    pillar: "culture",
    heritage: "eurasian",
    ageBands: ["7-9", "10-12"],
    classId: "kind-heart",
    summary: "Eurasian hospitality teaches us to welcome everyone.",
    story:
      "Many Eurasian families in Singapore are known for warm hospitality — good food, music, and making guests feel at home. The kampung spirit is the same idea: your home, classroom, and playground can be places where everyone belongs. Welcoming others is a powerful Singapore value.",
    tryThis: "Invite a classmate or neighbour kid into a game and explain the rules kindly.",
    reflectionPrompt: "How did you help someone feel included?",
    missionId: "mission-include-friend",
    accent: "#B45309",
  },
  {
    id: "please-thank-you",
    title: "Magic Words",
    pillar: "manners",
    heritage: "shared",
    ageBands: ["4-6", "7-9"],
    classId: "friendly-voices",
    summary: "Please, thank you, and sorry keep hearts soft.",
    story:
      "Magic words are not magic because they are fancy — they are magic because they show care. 'Please' asks with respect. 'Thank you' notices someone's help. 'Sorry' repairs a mistake. In Singapore homes and schools, these words help us live well together.",
    tryThis: "Use please, thank you, and sorry at least once each today — and mean them.",
    reflectionPrompt: "Which magic word did you use, and why?",
    missionId: "mission-magic-words",
    accent: "#EA580C",
  },
  {
    id: "honest-heart",
    title: "Honest Heart",
    pillar: "character",
    heritage: "shared",
    ageBands: ["4-6", "7-9", "10-12"],
    classId: "brave-character",
    summary: "Truth builds trust in our kampung.",
    story:
      "Sometimes telling the truth feels scary — maybe you spilled a drink or forgot homework. But honesty helps adults help you, and friends trust you more. A kampung kid with an honest heart admits mistakes early, apologises, and tries again.",
    tryThis: "If you make a small mistake today, tell a trusted adult the truth gently.",
    reflectionPrompt: "When was it brave to be honest?",
    missionId: "mission-tell-truth",
    accent: "#0F766E",
  },
  {
    id: "racial-harmony",
    title: "Racial Harmony Everyday",
    pillar: "character",
    heritage: "shared",
    ageBands: ["7-9", "10-12"],
    classId: "brave-character",
    summary: "Friendship across races makes Singapore strong.",
    story:
      "Racial Harmony Day reminds us that Chinese, Malay, Indian, Eurasian, and many other Singaporeans share one home. Harmony is not only a special day — it is choosing curiosity over teasing, learning about festivals, and standing up kindly if someone is left out because of how they look, speak, or celebrate.",
    tryThis: "Ask a friend one respectful question about a tradition they celebrate.",
    reflectionPrompt: "What did you learn about a friend's culture?",
    missionId: "mission-learn-culture",
    accent: "#BE123C",
  },
  {
    id: "tidy-space",
    title: "Tidy Kampung Pride",
    pillar: "character",
    heritage: "shared",
    ageBands: ["4-6", "7-9", "10-12"],
    classId: "kampung-care",
    summary: "Cleaning up shows respect for shared spaces.",
    story:
      "Whether it is your toys, the canteen tray area, or a park bench, leaving a place better than you found it is kampung pride. It is a quiet way to care for neighbours you may never meet.",
    tryThis: "Pick up after yourself in one shared space without being asked.",
    reflectionPrompt: "Which space did you leave nicer?",
    missionId: "mission-tidy-up",
    accent: "#2563EB",
  },
  {
    id: "shoes-off",
    title: "Shoes at the Door",
    pillar: "manners",
    heritage: "indian",
    ageBands: ["4-6", "7-9"],
    classId: "kampung-care",
    summary: "Removing shoes shows respect in many homes.",
    story:
      "In many Indian homes — and many Singapore homes of all races — we remove shoes before entering. Clean feet help keep homes clean and show we respect the family's space. When you visit, watch what others do, or politely ask, 'Should I take off my shoes?'",
    tryThis: "At home or when visiting, remove your shoes carefully and place them neatly.",
    reflectionPrompt: "How did neat shoes show respect?",
    missionId: "mission-neat-shoes",
    accent: "#C2410C",
  },
  {
    id: "salam-respect",
    title: "Salam & Soft Hands",
    pillar: "manners",
    heritage: "malay",
    ageBands: ["7-9", "10-12"],
    classId: "friendly-voices",
    summary: "A respectful greeting can be gentle and sincere.",
    story:
      "Among Malay Muslims, the salam is a greeting of peace. Children often greet elders with care and humility. Even if salam is not part of your family practice, you can still greet Malay friends respectfully, speak softly to elders, and never tease how someone greets.",
    tryThis: "Greet an elder at home with soft voice, eye contact, and a warm smile.",
    reflectionPrompt: "How did your greeting show peace?",
    missionId: "mission-gentle-greeting",
    accent: "#047857",
  },
  ...extraLessons,
];


export const missions: Mission[] = [
  {
    id: "mission-greet-someone",
    lessonId: "greeting-friends",
    title: "Greet Three People",
    description:
      "Greet three people today using a smile and kind words. Try at least one greeting from another culture if you can do so respectfully.",
    proofType: "parent-confirm",
    proofHint: "Ask a parent to confirm who you greeted and how.",
    stars: 2,
    badgeId: "badge-hello-hero",
  },
  {
    id: "mission-queue-turn",
    lessonId: "queue-kampung",
    title: "Wait Your Turn",
    description: "Wait patiently in a real queue — canteen, bus, shop, or game — without cutting.",
    proofType: "parent-confirm",
    proofHint: "Parent confirms where you queued and that you waited fairly.",
    stars: 2,
    badgeId: "badge-fair-friend",
  },
  {
    id: "mission-thank-elder",
    lessonId: "cny-respect",
    title: "Thank an Elder",
    description: "Greet or thank an elder with respect. A clear thank you counts!",
    proofType: "reflection",
    proofHint: "Write or tell what you said and how the elder responded.",
    stars: 3,
    badgeId: "badge-filial-star",
  },
  {
    id: "mission-share-kindness",
    lessonId: "hari-raya-sharing",
    title: "Share Something Kind",
    description: "Share food, a toy turn, or a kind message with someone at home or school.",
    proofType: "parent-confirm",
    proofHint: "Parent confirms what you shared.",
    stars: 3,
    badgeId: "badge-generous-heart",
  },
  {
    id: "mission-bright-act",
    lessonId: "deepavali-light",
    title: "One Bright Act",
    description: "Do one helpful or kind act that brightens someone’s day.",
    proofType: "photo-note",
    proofHint: "Describe your bright act (optional photo note). Parent confirms.",
    stars: 3,
    badgeId: "badge-light-bringer",
  },
  {
    id: "mission-include-friend",
    lessonId: "eurasian-welcome",
    title: "Include a Friend",
    description: "Invite someone into a game or activity and help them feel welcome.",
    proofType: "reflection",
    proofHint: "Who did you include, and what did you do to welcome them?",
    stars: 3,
    badgeId: "badge-welcome-host",
  },
  {
    id: "mission-magic-words",
    lessonId: "please-thank-you",
    title: "Use Magic Words",
    description: "Use please, thank you, and sorry sincerely at least once each.",
    proofType: "parent-confirm",
    proofHint: "Parent confirms they heard your magic words today.",
    stars: 2,
    badgeId: "badge-polite-parrot",
  },
  {
    id: "mission-tell-truth",
    lessonId: "honest-heart",
    title: "Brave Truth",
    description: "Tell the truth about something small, even if it was hard.",
    proofType: "parent-confirm",
    proofHint: "Parent confirms you were honest and brave.",
    stars: 3,
    badgeId: "badge-truth-keeper",
  },
  {
    id: "mission-learn-culture",
    lessonId: "racial-harmony",
    title: "Learn a Tradition",
    description: "Ask a respectful question about a friend’s or family’s tradition and listen carefully.",
    proofType: "reflection",
    proofHint: "Write one thing you learned and how you showed respect.",
    stars: 4,
    badgeId: "badge-harmony-helper",
  },
  {
    id: "mission-tidy-up",
    lessonId: "tidy-space",
    title: "Leave It Nicer",
    description: "Tidy a shared space without being asked.",
    proofType: "photo-note",
    proofHint: "Describe what you tidied. Parent confirms.",
    stars: 2,
    badgeId: "badge-kampung-keeper",
  },
  {
    id: "mission-neat-shoes",
    lessonId: "shoes-off",
    title: "Neat Shoes Mission",
    description: "Remove shoes politely and place them neatly at the door.",
    proofType: "parent-confirm",
    proofHint: "Parent confirms your shoes were neat.",
    stars: 2,
    badgeId: "badge-neat-feet",
  },
  {
    id: "mission-gentle-greeting",
    lessonId: "salam-respect",
    title: "Gentle Greeting",
    description: "Greet an elder with a soft voice, eye contact, and warmth.",
    proofType: "parent-confirm",
    proofHint: "Parent or elder confirms your gentle greeting.",
    stars: 3,
    badgeId: "badge-peace-greeter",
  },
  ...extraMissions,
];

export const badges: Badge[] = [
  {
    id: "badge-hello-hero",
    name: "Hello Hero",
    description: "Greeted others with warmth across cultures.",
    icon: "👋",
  },
  {
    id: "badge-fair-friend",
    name: "Fair Friend",
    description: "Waited patiently and fairly in line.",
    icon: "🚌",
  },
  {
    id: "badge-filial-star",
    name: "Filial Star",
    description: "Showed respect and thanks to an elder.",
    icon: "🌟",
  },
  {
    id: "badge-generous-heart",
    name: "Generous Heart",
    description: "Shared kindness like Hari Raya hospitality.",
    icon: "🍪",
  },
  {
    id: "badge-light-bringer",
    name: "Light Bringer",
    description: "Brightened someone’s day with kindness.",
    icon: "🪔",
  },
  {
    id: "badge-welcome-host",
    name: "Welcome Host",
    description: "Made someone feel included.",
    icon: "🏡",
  },
  {
    id: "badge-polite-parrot",
    name: "Polite Parrot",
    description: "Used please, thank you, and sorry with meaning.",
    icon: "🦜",
  },
  {
    id: "badge-truth-keeper",
    name: "Truth Keeper",
    description: "Chose honesty even when it was hard.",
    icon: "💎",
  },
  {
    id: "badge-harmony-helper",
    name: "Harmony Helper",
    description: "Learned respectfully about another culture.",
    icon: "🤝",
  },
  {
    id: "badge-kampung-keeper",
    name: "Kampung Keeper",
    description: "Cared for a shared space.",
    icon: "🧹",
  },
  {
    id: "badge-neat-feet",
    name: "Neat Feet",
    description: "Respected a home by placing shoes neatly.",
    icon: "👟",
  },
  {
    id: "badge-peace-greeter",
    name: "Peace Greeter",
    description: "Offered a gentle, respectful greeting.",
    icon: "🕊️",
  },
  ...extraBadges,
];

export const pillarLabels: Record<string, string> = {
  culture: "Culture",
  manners: "Manners",
  character: "Character",
};

export const heritageLabels: Record<string, string> = {
  shared: "Singapore Shared",
  chinese: "Chinese",
  malay: "Malay",
  indian: "Indian",
  eurasian: "Eurasian",
};

export const ageBandLabels: Record<string, string> = {
  "4-6": "Little Seeds (4–6)",
  "7-9": "Young Explorers (7–9)",
  "10-12": "Kampung Champions (10–12)",
};

export function getLesson(id: string) {
  return lessons.find((l) => l.id === id);
}

export function getMission(id: string) {
  return missions.find((m) => m.id === id);
}

export function getBadge(id: string) {
  return badges.find((b) => b.id === id);
}

export function lessonsForAge(ageBand: string) {
  return lessons.filter((l) => l.ageBands.includes(ageBand as never));
}
