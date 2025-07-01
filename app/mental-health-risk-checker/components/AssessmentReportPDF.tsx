import fs from "fs";
import path from "path";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
  // Font,
} from "@react-pdf/renderer";

import type { AssessmentResults } from "@/types/riskChecker";

const getLogoImageData = () => {
  const imagePath = path.join(
    process.cwd(),
    "public",
    "brainLogoCompressed.png"
  );
  const imageBuffer = fs.readFileSync(imagePath);
  return {
    data: imageBuffer,
    format: "png" as const,
  };
};

const getRiskLevelInfo = (level: "low" | "moderate" | "severe") => {
  switch (level) {
    case "low":
      return {
        label: "Low Risk",
        color: "#059669",
        bgColor: "#f0fdf4",
        description:
          "You have a good handle on your legal obligations and positive practices in place.",
      };
    case "moderate":
      return {
        label: "Moderate Risk",
        color: "#d97706",
        bgColor: "#fffbeb",
        description:
          "While foundational duties appear to be met, key areas need proactive intervention.",
      };
    case "severe":
      return {
        label: "Severe Risk",
        color: "#dc2626",
        bgColor: "#fef2f2",
        description:
          "Significant gaps in legal compliance and/or major psychosocial hazards present.",
      };
  }
};

// Font.register({
//   family: "Red Hat Display",
//   fonts: [
//     {
//       src: "https://fonts.gstatic.com/s/redhatdisplay/v20/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbmyWQk8z-FWZk33BGg.woff2",
//       fontWeight: 400,
//       fontStyle: "normal",
//     },
//     {
//       src: "https://fonts.gstatic.com/s/redhatdisplay/v20/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVmgsD-l-YsXnZG0mH.woff2",
//       fontWeight: 400,
//       fontStyle: "italic",
//     },
//   ],
// });

// Simplified PDF Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 40,
    backgroundColor: "#ffffff",
    color: "#1f2937",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 15,
    borderBottom: 2,
    borderBottomColor: "#059669",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoImage: {
    height: 40,
    width: 40,
    objectFit: "contain",
  },
  // TODO working on these styles. This could be causing breakages if they don't compile correctly due to recent changes.
  logoText: {
    fontFamily: "Helvetica",
    fontSize: 20,
    fontWeight: "100",
    color: "#292524",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
    borderBottom: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 5,
  },
  subsectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 6,
    marginTop: 12,
  },
  priorityTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#dc2626", // Red for urgent
    marginBottom: 6,
    marginTop: 12,
    backgroundColor: "#fef2f2",
    padding: 6,
    borderLeft: 3,
    borderLeftColor: "#dc2626",
  },

  recommendationTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 6,
    marginTop: 12,
    backgroundColor: "#f3f4f6",
    padding: 6,
    borderLeft: 3,
    borderLeftColor: "#6b7280",
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 6,
    color: "#374151",
  },
  riskCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    style: { border: 1 },
  },
  riskLevel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  complianceItem: {
    padding: 8,
    marginBottom: 6,
    borderRadius: 4,
    borderLeft: 3,
  },
  complianceLabel: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 3,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    marginBottom: 4,
    backgroundColor: "#f9fafb",
    borderRadius: 4,
  },
  categoryName: {
    fontSize: 11,
    fontWeight: "bold",
  },
  scoreText: {
    fontSize: 10,
    color: "#6b7280",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#6b7280",
    borderTop: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 8,
  },
  contactInfo: {
    backgroundColor: "#f8fafc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  contactTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1f2937",
  },
  contactDetail: {
    fontSize: 9,
    marginBottom: 2,
    color: "#4b5563",
  },
  bulletPoint: {
    fontSize: 9,
    marginBottom: 3,
    marginLeft: 10,
    lineHeight: 1.4,
  },
});

// Simplified questions data
const SECTION_A_QUESTIONS = [
  {
    id: "safety_statement",
    question:
      "Does your organisation's Safety Statement/Health & Safety Policy explicitly acknowledge work-related stress?",
  },
  {
    id: "risk_assessment",
    question:
      "Has your organisation conducted a specific risk assessment for psychosocial hazards?",
  },
  {
    id: "dignity_policy",
    question:
      "Do you have a clear Dignity at Work policy on bullying and harassment?",
  },
  {
    id: "control_implementation",
    question:
      "Have you implemented control measures to reduce identified psychosocial risks?",
  },
  {
    id: "manager_training",
    question:
      "Have managers received training on identifying and managing chronic stress?",
  },
  {
    id: "equality_act_awareness",
    question:
      "Are UK managers aware of Equality Act 2010 duties for mental health disabilities?",
  },
];

// Category interpretations
const getCategoryInterpretation = (category: string, score: number) => {
  const interpretations: Record<
    string,
    { excellent: string; average: string; critical: string }
  > = {
    Demands: {
      excellent:
        "Your organisation's approach to workload is optimised and sustainable.",
      average:
        "Workloads are busy but achievable, though regular overtime may be expected.",
      critical:
        "Workloads are overwhelming and unsustainable, requiring urgent review.",
    },
    Control: {
      excellent:
        "Your organisation fosters high trust and autonomy for employees.",
      average: "There is moderate flexibility, but work can feel prescribed.",
      critical:
        "Work is rigidly controlled with little autonomy - a significant stressor.",
    },
    Support: {
      excellent:
        "Excellent all-around support with proactive resources and coaching managers.",
      average:
        "Foundational support exists but tends to be reactive rather than proactive.",
      critical:
        "Poor support structures with managers potentially being a source of stress.",
    },
    Relationships: {
      excellent:
        "Conflict is managed constructively and fairly with transparent procedures.",
      average: "Conflicts are addressed adequately but processes can be slow.",
      critical:
        "A blame culture exists where conflicts sometimes escalate and negative behaviours are tolerated.",
    },
    Role: {
      excellent:
        "High clarity and purpose - everyone understands their responsibilities.",
      average:
        "Roles are mostly clear but occasional confusion exists on new projects.",
      critical:
        "Constant confusion and conflict regarding roles and responsibilities.",
    },
    Change: {
      excellent:
        "Change is managed transparently and inclusively as a collaborative process.",
      average:
        "Change is well-communicated but consultation before decisions is limited.",
      critical:
        "Changes are imposed suddenly without warning, damaging morale and trust.",
    },
  };

  const categoryData = interpretations[category];
  if (!categoryData) return "No interpretation available.";

  if (score >= 4) return categoryData.excellent;
  if (score >= 2) return categoryData.average;
  return categoryData.critical;
};

// Main PDF Document Component
const AssessmentReportPDF: React.FC<{ results: AssessmentResults }> = ({
  results,
}) => {
  const riskInfo = getRiskLevelInfo(results.overallRiskLevel);

  return (
    <Document>
      {/* Page 1: Executive Summary */}
      <Page size="A4" style={styles.page}>
        {/* <View style={styles.header}>
          <Image
            src="../public/brainLogoCompressed.png"
            // style={styles.logoImage}
            // alt="PASU Health Logo"
          />
          <Text style={styles.logo}>PASU Health</Text>
          <Text style={{ fontSize: 10, color: "#6b7280" }}>
            Generated: {results.completedAt.toLocaleDateString()}
          </Text>
        </View> */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logoImage} src={getLogoImageData()} />
            <Text style={styles.logoText}>PASU Health</Text>
          </View>
          <Text style={{ fontSize: 10, color: "#6b7280" }}>
            Generated:{" "}
            {results.completedAt.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </Text>
        </View>

        <Text style={styles.title}>
          Workplace Mental Health Risk Assessment Report
        </Text>
        <Text style={styles.subtitle}>
          Comprehensive Risk Analysis & Compliance Review
        </Text>

        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Assessment Details</Text>
          <Text style={styles.contactDetail}>
            Company: {results.contactDetails.company}
          </Text>
          <Text style={styles.contactDetail}>
            Contact: {results.contactDetails.firstName}{" "}
            {results.contactDetails.lastName}
          </Text>
          <Text style={styles.contactDetail}>
            Role: {results.contactDetails.role}
          </Text>
          <Text style={styles.contactDetail}>
            Email: {results.contactDetails.email}
          </Text>
          <Text style={styles.contactDetail}>
            Location: {results.contactDetails.location}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>

          <View
            style={[
              styles.riskCard,
              {
                backgroundColor: riskInfo.bgColor,
                borderColor: riskInfo.color,
              },
            ]}
          >
            <Text style={[styles.riskLevel, { color: riskInfo.color }]}>
              Overall Risk Level: {riskInfo.label}
            </Text>
            <Text style={styles.paragraph}>{riskInfo.description}</Text>
          </View>

          <Text style={styles.paragraph}>
            This comprehensive assessment evaluated your organisation across
            multiple critical areas of workplace mental health, including legal
            compliance requirements and psychosocial risk factors.
          </Text>

          <Text style={styles.subsectionTitle}>Key Findings:</Text>
          <Text style={styles.paragraph}>
            • Legal Compliance:{" "}
            {results.sectionA.hasComplianceGaps
              ? "Issues Identified"
              : "Compliant"}
          </Text>
          <Text style={styles.paragraph}>
            • Psychosocial Risk Score: {results.sectionB.totalScore}
          </Text>
          <Text style={styles.paragraph}>
            • Failed Compliance Items: {results.sectionA.failedQuestions.length}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Scores</Text>
          {Object.entries(results.sectionB.categoryRatings).map(
            ([category, rating]) => (
              <View key={category} style={styles.categoryItem}>
                <Text style={styles.categoryName}>{category}</Text>
                <Text style={styles.scoreText}>{rating.toFixed(1)}/5.0</Text>
              </View>
            )
          )}
        </View>

        <Text style={styles.footer}>
          PASU Health - Workplace Mental Health Assessment Report | Page 1
        </Text>
      </Page>

      {/* Page 2: Legal Compliance */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logoText}>PASU Health</Text>
          <Text style={{ fontSize: 10, color: "#6b7280" }}>
            {results.contactDetails.company} - Legal Compliance Review
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Legal & Policy Compliance Review
          </Text>
          <Text style={styles.paragraph}>
            This section evaluated your adherence to fundamental legal and
            policy duties. Any &apos;No&apos; answer represents a significant
            compliance gap requiring immediate attention.
          </Text>

          {SECTION_A_QUESTIONS.map((question, index) => {
            // Skip UK-specific question if Ireland
            if (
              question.id === "equality_act_awareness" &&
              results.contactDetails.location === "Ireland"
            ) {
              return null;
            }

            const isCompliant = results.sectionA.answers[question.id];

            return (
              <View
                key={question.id}
                style={[
                  styles.complianceItem,
                  {
                    backgroundColor: isCompliant ? "#f0fdf4" : "#fef2f2",
                    borderLeftColor: isCompliant ? "#10b981" : "#ef4444",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.complianceLabel,
                    { color: isCompliant ? "#059669" : "#dc2626" },
                  ]}
                >
                  {isCompliant ? "✓ COMPLIANT" : "✗ NON-COMPLIANT"}
                </Text>
                <Text
                  style={[
                    styles.paragraph,
                    { fontSize: 9, fontWeight: "bold", marginBottom: 3 },
                  ]}
                >
                  {index + 1}. {question.question}
                </Text>
                <Text style={[styles.paragraph, { fontSize: 8, margin: 0 }]}>
                  {isCompliant
                    ? "This requirement is being met appropriately."
                    : "This represents a significant compliance gap that requires immediate attention."}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.footer}>
          PASU Health - Workplace Mental Health Assessment Report | Page 2
        </Text>
      </Page>

      {/* Page 3: Risk Analysis */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logoText}>PASU Health</Text>
          <Text style={{ fontSize: 10, color: "#6b7280" }}>
            {results.contactDetails.company} - Risk Analysis
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Psychosocial Risk Analysis</Text>
          <Text style={styles.paragraph}>
            This section analyses your organisation&apos;s performance across
            six key areas known to impact employee mental health. Higher scores
            indicate better performance.
          </Text>

          {Object.entries(results.sectionB.categoryRatings).map(
            ([category, rating]) => (
              <View key={category} style={{ marginBottom: 15 }}>
                <View style={styles.categoryItem}>
                  <Text style={styles.categoryName}>{category}</Text>
                  <Text style={styles.scoreText}>{rating.toFixed(1)}/5.0</Text>
                </View>

                <Text
                  style={[styles.paragraph, { fontSize: 9, marginLeft: 5 }]}
                >
                  {getCategoryInterpretation(category, rating)}
                </Text>
              </View>
            )
          )}
        </View>

        <Text style={styles.footer}>
          PASU Health - Workplace Mental Health Assessment Report | Page 3
        </Text>
      </Page>

      {/* Page 4: Recommendations */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logoText}>PASU Health</Text>
          <Text style={{ fontSize: 10, color: "#6b7280" }}>
            {results.contactDetails.company} - Recommendations
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Actions</Text>

          {results.sectionA.hasComplianceGaps && (
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.priorityTitle}>
                Immediate Legal Compliance Required!
              </Text>
              <Text style={styles.paragraph}>
                Address the following compliance gaps immediately:
              </Text>
              {results.sectionA.failedQuestions.map((questionId, index) => (
                <Text key={questionId} style={styles.bulletPoint}>
                  • Review and update policies for compliance requirement{" "}
                  {index + 1}
                </Text>
              ))}
            </View>
          )}

          <View style={{ marginBottom: 15 }}>
            <Text style={styles.priorityTitle}>Risk Reduction Priorities</Text>
            {Object.entries(results.sectionB.categoryRatings)
              .filter(([, rating]) => rating < 3)
              .map(([category, rating]) => (
                <Text key={category} style={styles.bulletPoint}>
                  • Improve {category} management (Current score:{" "}
                  {rating.toFixed(1)}/5.0)
                </Text>
              ))}
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={styles.recommendationTitle}>
              Training Recommendations
            </Text>
            <Text style={styles.bulletPoint}>
              • Mental health awareness training for all staff
            </Text>
            <Text style={styles.bulletPoint}>
              • Manager training on stress identification and support
            </Text>
            <Text style={styles.bulletPoint}>
              • Conflict resolution and communication skills training
            </Text>
            {results.contactDetails.location === "UK" && (
              <Text style={styles.bulletPoint}>
                • Equality Act 2010 disability awareness for managers
              </Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Steps</Text>
          <Text style={styles.paragraph}>
            A PASU Health specialist will contact you within 24-48 hours to
            discuss:
          </Text>
          <Text style={styles.bulletPoint}>
            • Detailed analysis of your specific risk factors
          </Text>
          <Text style={styles.bulletPoint}>
            • Customised mental health training solutions
          </Text>
          <Text style={styles.bulletPoint}>
            • Implementation strategies for improvements
          </Text>
          <Text style={styles.bulletPoint}>
            • Available resources and support programs
          </Text>

          <View style={[styles.contactInfo, { marginTop: 15 }]}>
            <Text style={styles.contactTitle}>Contact Information</Text>
            <Text style={styles.contactDetail}>
              Email: training@pasuhealth.com
            </Text>
            <Text style={styles.contactDetail}>
              Website: www.pasuhealth.com
            </Text>
            <Text style={styles.contactDetail}>Platform: www.pasu.io</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          PASU Health - Workplace Mental Health Assessment Report | Page 4
        </Text>
      </Page>
    </Document>
  );
};

// PDF Download Button Component
interface PDFDownloadButtonProps {
  results: AssessmentResults;
  fileName?: string;
  className?: string;
  children: React.ReactNode;
}

export const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  results,
  fileName = `Mental_Health_Assessment_${results.contactDetails.company}_${results.completedAt.toISOString().split("T")[0]}.pdf`,
  className = "px-6 py-3 border border-emerald-600 text-emerald-600 font-medium rounded-md hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500",
  children,
}) => (
  <PDFDownloadLink
    document={<AssessmentReportPDF results={results} />}
    fileName={fileName}
    className={className}
  >
    {({ loading, error }) => {
      if (loading) return "Generating PDF...";
      if (error) return "Error generating PDF";
      return children;
    }}
  </PDFDownloadLink>
);

export default AssessmentReportPDF;
