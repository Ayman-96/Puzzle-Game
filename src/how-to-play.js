const rulesInfo = [
  {
    id: "01",
    icon: "📄",
    title: "Read the Case File",
    desc: "Every puzzle is a realistic document — an email chain, a witness statement, a report. Read every word carefully. The answer is always hidden inside the text.",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.15)",
    border: "rgba(168,85,247,0.25)",
  },
  {
    id: "02",
    icon: "🔍",
    title: "Find the Contradiction",
    desc: "Someone is lying. A date doesn't match. A detail slipped through. Use the highlight tool to mark suspicious parts of the text as you read.",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.15)",
    border: "rgba(56,189,248,0.25)",
  },
  {
    id: "03",
    icon: "🎯",
    title: "Pick Your Answer",
    desc: "Four options — A, B, C, D. All of them will feel almost right. Only one is supported by the text itself. Trust what you read, not what you assume.",
    color: "#22c55e",
    glow: "rgba(34,197,94,0.15)",
    border: "rgba(34,197,94,0.25)",
  },
  {
    id: "04",
    icon: "⏱️",
    title: "Beat the Clock",
    desc: "Every case has a time limit. The faster you solve it the better your Time Rank — Instant, Sharp, Steady or Turtle. Speed matters.",
    color: "#facc15",
    glow: "rgba(250,204,21,0.15)",
    border: "rgba(250,204,21,0.25)",
  },
  {
    id: "05",
    icon: "🔥",
    title: "Build Your Streak",
    desc: "Solve cases back to back without mistakes to grow your streak. One wrong answer resets it to zero. How far can you go?",
    color: "#f97316",
    glow: "rgba(249,115,22,0.15)",
    border: "rgba(249,115,22,0.25)",
  },
];
const timeRankInfo = [
  {
    icon: "⚡",
    rank: "INSTANT",
    desc: "Solved in 1st quarter of time",
    bar: "100%",
    color: "#facc15",
  },
  {
    icon: "🎯",
    rank: "SHARP",
    desc: "Solved in 2nd quarter of time",
    bar: "70%",
    color: "#a855f7",
  },
  {
    icon: "⏳",
    rank: "STEADY",
    desc: "Solved in 3rd quarter of time",
    bar: "40%",
    color: "#38bdf8",
  },
  {
    icon: "🐢",
    rank: "TURTLE",
    desc: "Solved in 4th quarter of time",
    bar: "20%",
    color: "#22c55e",
  },
];
const medalsInfo = [
  {
    icon: "🥇",
    label: "Gold",
    desc: "Solved in 1st Try",
    color: "#facc15",
  },
  {
    icon: "🥈",
    label: "Silver",
    desc: "Solved in 2nd Try",
    color: "#94a3b8",
  },
  {
    icon: "🥉",
    label: "Bronze",
    desc: "Solved in 3rd Try",
    color: "#f97316",
  },
];

export const howToPlayInfo = [rulesInfo, timeRankInfo, medalsInfo];
