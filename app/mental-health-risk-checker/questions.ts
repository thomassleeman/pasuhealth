interface Question {
  id: string;
  category: string;
  question: string;
  options: {
    id: number;
    text: string;
    score: number;
  }[];
}

export const questions: Question[] = [
  // ROLE Questions
  {
    id: "role_1",
    category: "Role",
    question:
      "How clear are job roles and responsibilities in your organisation?",
    options: [
      {
        id: 1,
        text: "Very clear - everyone knows their responsibilities",
        score: 0,
      },
      { id: 2, text: "Mostly clear with occasional confusion", score: 1 },
      { id: 3, text: "Often unclear or overlapping", score: 2 },
      { id: 4, text: "Very unclear - frequent role conflicts", score: 3 },
    ],
  },
  {
    id: "role_2",
    category: "Role",
    question:
      "How well does your organisation handle conflicting priorities between roles?",
    options: [
      {
        id: 1,
        text: "Excellent - conflicts are rare and quickly resolved",
        score: 0,
      },
      { id: 2, text: "Good - occasional conflicts but manageable", score: 1 },
      { id: 3, text: "Poor - frequent conflicts that cause stress", score: 2 },
      { id: 4, text: "Very poor - constant conflicts and confusion", score: 3 },
    ],
  },
  // DEMANDS Questions
  {
    id: "demands_1",
    category: "Demands",
    question:
      "How would you describe the typical workload in your organisation?",
    options: [
      {
        id: 1,
        text: "Manageable - people can complete work within normal hours",
        score: 0,
      },
      {
        id: 2,
        text: "Busy but achievable with good time management",
        score: 1,
      },
      { id: 3, text: "Often excessive - regular overtime required", score: 2 },
      {
        id: 4,
        text: "Overwhelming - constant pressure and long hours",
        score: 3,
      },
    ],
  },
  {
    id: "demands_2",
    category: "Demands",
    question:
      "How often do employees work outside of normal hours (evenings/weekends)?",
    options: [
      { id: 1, text: "Rarely or never", score: 0 },
      { id: 2, text: "Occasionally during busy periods", score: 1 },
      { id: 3, text: "Regularly - at least weekly", score: 2 },
      { id: 4, text: "Constantly - work-life balance is poor", score: 3 },
    ],
  },
  // CONTROL Questions
  {
    id: "control_1",
    category: "Control",
    question:
      "How much autonomy do employees have over their work methods and schedules?",
    options: [
      {
        id: 1,
        text: "High autonomy - flexible working and decision-making",
        score: 0,
      },
      { id: 2, text: "Moderate autonomy - some flexibility allowed", score: 1 },
      { id: 3, text: "Limited autonomy - mostly prescribed methods", score: 2 },
      { id: 4, text: "No autonomy - rigid control over all aspects", score: 3 },
    ],
  },
  {
    id: "control_2",
    category: "Control",
    question: "Can employees influence decisions that affect their work?",
    options: [
      { id: 1, text: "Yes - input is actively sought and valued", score: 0 },
      { id: 2, text: "Sometimes - for certain decisions", score: 1 },
      { id: 3, text: "Rarely - limited consultation", score: 2 },
      { id: 4, text: "Never - decisions imposed from above", score: 3 },
    ],
  },
  // RELATIONSHIPS Questions
  {
    id: "relationships_1",
    category: "Relationships",
    question:
      "How would you describe workplace relationships in your organisation?",
    options: [
      {
        id: 1,
        text: "Excellent - supportive and collaborative culture",
        score: 0,
      },
      { id: 2, text: "Good - generally positive with minor issues", score: 1 },
      { id: 3, text: "Problematic - frequent conflicts or tensions", score: 2 },
      {
        id: 4,
        text: "Toxic - bullying, harassment or exclusion present",
        score: 3,
      },
    ],
  },
  {
    id: "relationships_2",
    category: "Relationships",
    question:
      "How effectively does your organisation handle workplace conflicts?",
    options: [
      {
        id: 1,
        text: "Very well - clear procedures and quick resolution",
        score: 0,
      },
      { id: 2, text: "Adequately - some delays but resolved", score: 1 },
      { id: 3, text: "Poorly - conflicts often escalate or linger", score: 2 },
      { id: 4, text: "Not at all - conflicts ignored or mishandled", score: 3 },
    ],
  },
  // SUPPORT Questions
  {
    id: "support_1",
    category: "Support",
    question: "What level of support do employees receive from management?",
    options: [
      {
        id: 1,
        text: "Excellent - regular feedback and encouragement",
        score: 0,
      },
      { id: 2, text: "Good - support available when needed", score: 1 },
      { id: 3, text: "Limited - minimal support or recognition", score: 2 },
      { id: 4, text: "None - employees feel abandoned", score: 3 },
    ],
  },
  {
    id: "support_2",
    category: "Support",
    question:
      "Are mental health and wellbeing resources available to employees?",
    options: [
      {
        id: 1,
        text: "Comprehensive - EAP, mental health days, training",
        score: 0,
      },
      { id: 2, text: "Some resources - basic support available", score: 1 },
      { id: 3, text: "Very limited - minimal provisions", score: 2 },
      { id: 4, text: "None - no wellbeing support offered", score: 3 },
    ],
  },
  // CHANGE Questions
  {
    id: "change_1",
    category: "Change",
    question: "How well does your organisation manage and communicate changes?",
    options: [
      {
        id: 1,
        text: "Excellently - clear communication and support throughout",
        score: 0,
      },
      { id: 2, text: "Well - most changes handled smoothly", score: 1 },
      { id: 3, text: "Poorly - changes cause confusion and stress", score: 2 },
      {
        id: 4,
        text: "Very poorly - constant upheaval and uncertainty",
        score: 3,
      },
    ],
  },
  {
    id: "change_2",
    category: "Change",
    question:
      "How involved are employees in organisational changes that affect them?",
    options: [
      {
        id: 1,
        text: "Highly involved - consulted early and throughout",
        score: 0,
      },
      {
        id: 2,
        text: "Somewhat involved - informed and some input sought",
        score: 1,
      },
      {
        id: 3,
        text: "Minimally involved - told after decisions made",
        score: 2,
      },
      {
        id: 4,
        text: "Not involved - changes imposed without warning",
        score: 3,
      },
    ],
  },
];
