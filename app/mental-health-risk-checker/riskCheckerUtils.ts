// utils/riskAssessmentUtils.ts

import {
  Location,
  LegalPolicyQuestion,
  PsychosocialQuestion,
  SectionAResults,
  SectionBResults,
  AssessmentResults,
  RiskInterpretation,
  SECTION_A_QUESTIONS,
  SECTION_B_QUESTIONS,
  RISK_LEVEL_THRESHOLDS,
  CATEGORY_INTERPRETATIONS,
  LEGAL_COMPLIANCE_INTERPRETATIONS,
  ContactDetails,
} from "../../types/riskChecker";

import { AssessmentStep } from "./RiskChecker";

/**
 * Filter questions based on selected location
 */
export function getQuestionsForLocation(location: Location): {
  sectionA: LegalPolicyQuestion[];
  sectionB: PsychosocialQuestion[];
} {
  const sectionA = SECTION_A_QUESTIONS.filter(
    (q) =>
      q.applicableLocations.includes(location) ||
      q.applicableLocations.includes("Both")
  );

  const sectionB = SECTION_B_QUESTIONS.filter(
    (q) =>
      q.applicableLocations.includes(location) ||
      q.applicableLocations.includes("Both")
  );

  return { sectionA, sectionB };
}

/**
 * Calculate Section A (Legal/Policy) results
 */
export function calculateSectionAResults(
  answers: Record<string, boolean>
): SectionAResults {
  const failedQuestions = Object.entries(answers)
    .filter(([, answer]) => answer === false)
    .map(([questionId]) => questionId);

  return {
    answers,
    hasComplianceGaps: failedQuestions.length > 0,
    failedQuestions,
  };
}

/**
 * Calculate Section B (Psychosocial) results
 */
export function calculateSectionBResults(
  answers: Record<string, number>
): SectionBResults {
  // Group answers by category
  const categoryScores: Record<string, number[]> = {};

  SECTION_B_QUESTIONS.forEach((question) => {
    const score = answers[question.id];
    if (score !== undefined) {
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = [];
      }
      categoryScores[question.category].push(score);
    }
  });

  // Calculate average scores per category (0-3 scale)
  const categoryAverages: Record<string, number> = {};
  Object.entries(categoryScores).forEach(([category, scores]) => {
    categoryAverages[category] =
      scores.reduce((sum, score) => sum + score, 0) / scores.length;
  });

  // Convert to 0-5 rating scale for display
  const categoryRatings: Record<string, number> = {};
  Object.entries(categoryAverages).forEach(([category, average]) => {
    // Convert 0-3 scale to 0-5 scale: 5 - (average * 5/3)
    categoryRatings[category] = Math.max(0, 5 - average * (5 / 3));
  });

  // Calculate total score
  const totalScore = Object.values(answers).reduce(
    (sum, score) => sum + score,
    0
  );

  return {
    answers,
    categoryScores: categoryAverages,
    categoryRatings,
    totalScore,
  };
}

/**
 * Determine overall risk level
 */
export function calculateOverallRiskLevel(
  sectionAResults: SectionAResults,
  sectionBResults: SectionBResults
): "low" | "moderate" | "severe" {
  // If any compliance gaps in Section A, immediate severe risk
  if (sectionAResults.hasComplianceGaps) {
    return "severe";
  }

  // Check Section B thresholds
  if (sectionBResults.totalScore >= RISK_LEVEL_THRESHOLDS.SECTION_B_SEVERE) {
    return "severe";
  }

  if (
    sectionBResults.totalScore >= RISK_LEVEL_THRESHOLDS.SECTION_B_MODERATE_MIN
  ) {
    return "moderate";
  }

  return "low";
}

/**
 * Generate detailed interpretations for each category
 */
export function generateRiskInterpretations(
  sectionBResults: SectionBResults
): RiskInterpretation[] {
  return Object.entries(sectionBResults.categoryRatings).map(
    ([category, rating]) => {
      let riskLevel: "low" | "moderate" | "high";
      let interpretation: string;

      if (rating >= 4) {
        riskLevel = "low";
        interpretation = CATEGORY_INTERPRETATIONS[category]?.excellent || "";
      } else if (rating >= 2) {
        riskLevel = "moderate";
        interpretation = CATEGORY_INTERPRETATIONS[category]?.average || "";
      } else {
        riskLevel = "high";
        interpretation = CATEGORY_INTERPRETATIONS[category]?.critical || "";
      }

      return {
        category,
        score: rating,
        riskLevel,
        interpretation,
        recommendations: generateRecommendations(category, riskLevel),
      };
    }
  );
}

/**
 * Generate specific recommendations based on category and risk level
 */
function generateRecommendations(
  category: string,
  riskLevel: "low" | "moderate" | "high"
): string[] {
  const recommendationMap: Record<string, Record<string, string[]>> = {
    Demands: {
      high: [
        "Conduct urgent workload review across all teams",
        "Implement resource planning and capacity management",
        "Set clear boundaries on working hours",
        "Provide immediate support for overwhelmed staff",
      ],
      moderate: [
        "Review peak period management strategies",
        "Implement regular workload check-ins with managers",
        "Consider flexible working arrangements",
        "Provide time management training",
      ],
      low: [
        "Continue monitoring workload sustainability",
        "Maintain proactive capacity planning",
        "Share best practices across teams",
      ],
    },
    Control: {
      high: [
        "Implement management training on delegation and autonomy",
        "Review and reduce micromanagement practices",
        "Establish clear decision-making frameworks",
        "Create employee input mechanisms for work processes",
      ],
      moderate: [
        "Increase flexibility in work methods where possible",
        "Provide training on outcome-focused management",
        "Establish regular team consultation processes",
      ],
      low: [
        "Maintain current autonomy levels",
        "Continue to trust employees as professionals",
        "Share autonomy best practices",
      ],
    },
    Support: {
      high: [
        "Implement comprehensive manager support training",
        "Establish formal Employee Assistance Programme",
        "Create confidential support channels",
        "Invest in proactive mental health resources",
      ],
      moderate: [
        "Enhance existing support services",
        "Improve promotion of available resources",
        "Provide basic mental health training for all staff",
      ],
      low: [
        "Continue excellent support practices",
        "Maintain comprehensive EAP services",
        "Keep investing in preventative resources",
      ],
    },
    Relationships: {
      high: [
        "Urgent leadership intervention required",
        "Implement zero-tolerance policy for negative behaviours",
        "Provide conflict resolution training for all managers",
        "Review and strengthen dignity at work policies",
      ],
      moderate: [
        "Improve conflict resolution processes",
        "Provide mediation training for managers",
        "Regular reminders about dignity at work policies",
      ],
      low: [
        "Maintain transparent conflict resolution",
        "Continue to treat disagreement as normal",
        "Keep mediation support available",
      ],
    },
    Role: {
      high: [
        "Fundamental review of organisational structure",
        "Clarify all job descriptions and responsibilities",
        "Eliminate conflicting instructions from different managers",
        "Implement clear escalation processes",
      ],
      moderate: [
        "Update job descriptions to be living documents",
        "Use project kick-off meetings to define roles",
        "Improve communication about responsibilities",
      ],
      low: [
        "Maintain high clarity and purpose",
        "Continue clear systems for managing priorities",
        "Keep up-to-date job descriptions",
      ],
    },
    Change: {
      high: [
        "Implement formal change management process",
        "Ensure early communication and consultation",
        "Provide change management training for leaders",
        "Create genuine consultation mechanisms",
      ],
      moderate: [
        "Shift from informing to consulting employees",
        "Improve change communication timing",
        "Provide more rationale for changes",
      ],
      low: [
        "Continue transparent and inclusive approach",
        "Maintain collaborative change processes",
        "Keep supporting staff through transitions",
      ],
    },
  };

  return recommendationMap[category]?.[riskLevel] || [];
}

/**
 * Generate compliance interpretation for Section A
 */
export function generateComplianceInterpretation(
  questionId: string,
  isCompliant: boolean,
  location: Location
): string {
  const interpretations =
    LEGAL_COMPLIANCE_INTERPRETATIONS[
      questionId as keyof typeof LEGAL_COMPLIANCE_INTERPRETATIONS
    ];

  if (!interpretations) return "";

  if (isCompliant) {
    return interpretations.compliant;
  }

  let result = interpretations.nonCompliant;

  // Add location-specific legal basis if available
  const question = SECTION_A_QUESTIONS.find((q) => q.id === questionId);
  if (question?.legalBasis && !isCompliant) {
    if (location === "Ireland" && question.legalBasis.ireland) {
      result += ` In Ireland: ${question.legalBasis.ireland}`;
    } else if (location === "UK" && question.legalBasis.uk) {
      result += ` In the UK: ${question.legalBasis.uk}`;
    } else if (location === "Both") {
      if (question.legalBasis.ireland) {
        result += ` In Ireland: ${question.legalBasis.ireland}`;
      }
      if (question.legalBasis.uk) {
        result += ` In the UK: ${question.legalBasis.uk}`;
      }
    }
  }

  return result;
}

/**
 * Get risk level display properties
 */
export function getRiskLevelDisplayProps(
  level: "low" | "moderate" | "severe"
): {
  color: string;
  bgColor: string;
  label: string;
  description: string;
} {
  switch (level) {
    case "low":
      return {
        color: "text-green-600",
        bgColor: "bg-green-50",
        label: "Low Risk",
        description:
          "You have a good handle on your legal obligations and positive practices in place. Focusing on continuous improvement in the highlighted areas will further strengthen your supportive culture.",
      };
    case "moderate":
      return {
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        label: "Moderate Risk",
        description:
          "While foundational duties appear to be met, key areas of your work environment are likely causing employee stress. Proactive intervention is recommended to prevent issues escalating.",
      };
    case "severe":
      return {
        color: "text-red-600",
        bgColor: "bg-red-50",
        label: "Severe Risk",
        description:
          "There are significant gaps in your adherence to fundamental legal and policy duties, and/or major psychosocial hazards are present. Urgent action is required to mitigate legal exposure and protect employee wellbeing.",
      };
  }
}

/**
 * Calculate progress through assessment
 */
export function calculateProgress(
  currentSection: AssessmentStep,
  currentQuestionIndex: number,
  totalSectionAQuestions: number,
  totalSectionBQuestions: number
): number {
  switch (currentSection) {
    case "introduction":
      return 0; // Assuming introduction is the first step
    case "location":
      return 0;
    case "sectionA":
      return 0 + (currentQuestionIndex / totalSectionAQuestions) * 30;
    case "sectionB":
      return 30 + (currentQuestionIndex / totalSectionBQuestions) * 40;
    case "contact":
      return 75;
    case "results":
      return 100;
    default:
      return 0;
  }
}

/**
 * Validate contact form
 */
export function validateContactForm(contactDetails: ContactDetails): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!contactDetails.firstName?.trim()) {
    errors.firstName = "First name is required";
  }

  if (!contactDetails.lastName?.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!contactDetails.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactDetails.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!contactDetails.company?.trim()) {
    errors.company = "Company name is required";
  }

  if (!contactDetails.role?.trim()) {
    errors.role = "Your role is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Format results for report generation
 */
export function formatResultsForReport(results: AssessmentResults): {
  summary: {
    riskLevel: string;
    description: string;
    totalQuestions: number;
    completedAt: string;
  };
  sectionA: {
    totalQuestions: number;
    passedQuestions: number;
    failedQuestions: string[];
    complianceStatus: string;
  };
  sectionB: {
    totalScore: number;
    maxScore: number;
    categoryBreakdown: Array<{
      category: string;
      score: number;
      rating: number;
      status: string;
    }>;
  };
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
} {
  const { sectionA, sectionB, overallRiskLevel } = results;
  const riskProps = getRiskLevelDisplayProps(overallRiskLevel);
  const interpretations = generateRiskInterpretations(sectionB);

  // Categorize recommendations by urgency
  const allRecommendations = interpretations.flatMap((i) => i.recommendations);
  const immediate = allRecommendations.filter(
    (r) =>
      r.includes("urgent") ||
      r.includes("immediate") ||
      r.includes("zero-tolerance")
  );
  const shortTerm = allRecommendations.filter(
    (r) =>
      !immediate.includes(r) &&
      (r.includes("implement") ||
        r.includes("provide") ||
        r.includes("establish"))
  );
  const longTerm = allRecommendations.filter(
    (r) => !immediate.includes(r) && !shortTerm.includes(r)
  );

  return {
    summary: {
      riskLevel: riskProps.label,
      description: riskProps.description,
      totalQuestions:
        Object.keys(sectionA.answers).length +
        Object.keys(sectionB.answers).length,
      completedAt: results.completedAt.toLocaleDateString(),
    },
    sectionA: {
      totalQuestions: Object.keys(sectionA.answers).length,
      passedQuestions:
        Object.keys(sectionA.answers).length - sectionA.failedQuestions.length,
      failedQuestions: sectionA.failedQuestions,
      complianceStatus: sectionA.hasComplianceGaps
        ? "Non-Compliant"
        : "Compliant",
    },
    sectionB: {
      totalScore: sectionB.totalScore,
      maxScore: Object.keys(sectionB.answers).length * 3,
      categoryBreakdown: interpretations.map((i) => ({
        category: i.category,
        score: Math.round(sectionB.categoryScores[i.category] * 10) / 10,
        rating: Math.round(i.score * 10) / 10,
        status: i.riskLevel,
      })),
    },
    recommendations: {
      immediate: [...new Set(immediate)],
      shortTerm: [...new Set(shortTerm)],
      longTerm: [...new Set(longTerm)],
    },
  };
}
