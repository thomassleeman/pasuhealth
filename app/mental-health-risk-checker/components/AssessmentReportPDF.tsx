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

const getMentalHealthRafikiImageData = () => {
  const imagePath = path.join(
    process.cwd(),
    "public",
    "mental-health-rafiki.png"
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
  logoImageSmall: {
    height: 30,
    width: 30,
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1f2937",
  },
  contactDetail: {
    fontSize: 14,
    marginBottom: 3,
    color: "#4b5563",
  },
  bulletPoint: {
    fontSize: 14,
    marginBottom: 3,
    marginLeft: 10,
    lineHeight: 1.4,
  },
  centeredImage: {
    width: 350,
    height: 350,
    objectFit: "contain",
    alignSelf: "center",
    marginTop: 40,
  },
});

// Simplified questions data
const SECTION_A_QUESTIONS = [
  {
    id: "safety_statement",
    question:
      "Does your organisation's risk/safety policy explicitly acknowledge the management of work-related stress and psychosocial risks?",
  },
  {
    id: "risk_assessment",
    question:
      "Has your organisation conducted and formally recorded a specific risk assessment to identify psychosocial hazards and assess the risk of work-related stress?",
  },
  {
    id: "dignity_policy",
    question:
      "Does your organisation have a clear, well-communicated policy on Dignity at Work, bullying, and harassment that is actively implemented and understood by all staff?",
  },
  {
    id: "control_implementation",
    question:
      "Has your organisation implemented and documented control measures to eliminate or reduce the psychosocial risks identified in the risk assessment?",
  },
  {
    id: "manager_training",
    question:
      "Have line managers received specific training on identifying the signs of chronic stress and on their role in preventing and managing it within their teams?",
  },
  {
    id: "equality_act_awareness",
    question:
      "Are managers aware of their duties under the Equality Act 2010 to consider making reasonable adjustments for an employee whose mental health condition could be defined as a disability?",
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
        "Your assessment shows that your organisation's approach to workload is Optimised & Sustainable. This culture of managing peak periods proactively and encouraging breaks is a key strength that protects against burnout.",
      average:
        "Your rating suggests workloads are Busy but Achievable or Often Excessive. To improve from a culture where overtime is a default expectation, focus on proactive capacity planning and ensuring managers regularly check in with staff about workload pressures.",
      critical:
        "You have identified that workloads are Overwhelming & Unsustainable. This is a primary driver of stress and requires an urgent review of job roles, team capacity, and resource allocation to prevent widespread burnout.",
    },
    Control: {
      excellent:
        "Your organisation fosters High Trust & Autonomy, empowering employees as trusted professionals. This approach is proven to increase engagement and reduce work-related stress.",
      average:
        "You offer Moderate Flexibility, but work can feel Limited & Prescribed. To improve, focus on managing outcomes rather than dictating methods. Empowering teams to decide how they achieve their goals can significantly increase their sense of control.",
      critical:
        "Your rating indicates a culture of Rigid & Monitored work with little autonomy. This style of micromanagement is a significant stressor. To improve, you must actively seek employee input and delegate decision-making where appropriate.",
    },
    Support: {
      excellent:
        "Your organisation provides excellent all-around support. You combine Actively Supportive & Coaching managers with Comprehensive & Well-Promoted professional services and a Holistic & Proactive suite of preventative resources.",
      average:
        "You have a foundational level of support, but it tends to be reactive (e.g., Generally Available managers or a Basic Provision of support). To move from providing General & Ad-Hoc resources to a truly preventative culture, the next step is to invest in practical training on stress management for all staff and provide access to on-demand digital wellness platforms.",
      critical:
        "Your rating indicates that support structures are poor, with managers potentially being a Source of Stress and support being Informal Only or non-existent. The immediate priority is to address managerial behaviour through training and implement a formal, confidential support service (like an EAP), followed by introducing proactive educational resources.",
    },
    Relationships: {
      excellent:
        "Your assessment shows that conflict is managed Constructively & Fairly. This ability to see disagreement as normal and resolve it transparently is the hallmark of a psychologically safe culture.",
      average:
        "You indicated that conflicts are handled Adequately, but Slowly or Poorly & Inconsistently. To improve, ensure all staff are regularly reminded of the Dignity at Work policy and provide managers with specific training on fair and timely conflict resolution.",
      critical:
        "You identified a Negatively & with Blame culture where conflicts escalate. This is highly damaging and requires urgent senior leadership intervention to reinforce a zero-tolerance policy on negative behaviours.",
    },
    Role: {
      excellent:
        "Your organisation provides High Clarity & Purpose, where everyone understands their duties and how they contribute. This is a key factor in preventing stress from ambiguity.",
      average:
        "Your rating suggests that while roles are Mostly Clear, there is Often Ambiguity, especially on new projects. To improve, ensure job descriptions are live documents and use project kick-off meetings to explicitly define roles and responsibilities.",
      critical:
        "You have identified Constant Confusion & Conflict regarding roles. This requires a fundamental review of your organisational structure to ensure responsibilities are clearly delineated and that conflicting instructions are eliminated.",
    },
    Change: {
      excellent:
        "Your organisation manages change Transparently & Inclusively. Treating change as a collaborative process builds the trust and resilience needed to navigate transitions successfully.",
      average:
        "You indicated that change is Well-Informed but can be Poorly & with Uncertainty. To improve, you must shift from simply informing employees to meaningfully consulting them before decisions are made, giving them a voice in the process.",
      critical:
        "Your rating shows that change is perceived as Abrupt & Chaotic. This approach damages morale and trust. To fix this, you must implement a formal change management process built on early communication and genuine consultation.",
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
          Basic Risk Analysis & Compliance Review
        </Text>

        <View style={[styles.contactInfo, { marginBottom: 20 }]}>
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

        <Image
          style={styles.centeredImage}
          src={getMentalHealthRafikiImageData()}
        />
      </Page>

      {/* What This Report Is and What It Is Not Section */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            What This Report Is and What It Is Not
          </Text>
          <Text style={styles.paragraph}>
            Please read this section carefully.
          </Text>

          <View
            style={[
              styles.contactInfo,
              {
                backgroundColor: "#f0fdf4",
                borderLeft: 3,
                borderLeftColor: "#059669",
                marginBottom: 15,
              },
            ]}
          >
            <Text style={[styles.contactTitle, { color: "#059669" }]}>
              What This Report Is:
            </Text>
            <Text style={[styles.paragraph, { fontSize: 9, margin: 0 }]}>
              This report provides high-level guidance based on your responses
              to our workplace mental health risk assessment questionnaire. We
              hope that you will find it useful as a starting point for
              discussions about mental health in your workplace. With this free
              report we aim to:
            </Text>
          </View>

          <Text style={styles.bulletPoint}>
            • Offer initial insights into potential areas of concern within your
            organisation&apos;s approach to workplace mental health
          </Text>
          <Text style={styles.bulletPoint}>
            • Highlight possible compliance gaps that may require attention
            under relevant health and safety legislation
          </Text>
          <Text style={styles.bulletPoint}>
            • Provide general recommendations for improving workplace mental
            health practices
          </Text>
          <Text style={styles.bulletPoint}>
            • Suggest potential next steps for developing a more comprehensive
            mental health strategy
          </Text>
          <Text style={styles.bulletPoint}>
            • Demonstrate how PASU Health&apos;s professional services could
            support your organisation&apos;s mental health objectives
          </Text>

          <View
            style={[
              styles.contactInfo,
              {
                backgroundColor: "#fef2f2",
                borderLeft: 3,
                borderLeftColor: "#dc2626",
                marginTop: 15,
                marginBottom: 15,
              },
            ]}
          >
            <Text style={[styles.contactTitle, { color: "#dc2626" }]}>
              What This Report Is Not:
            </Text>
            <Text style={[styles.paragraph, { fontSize: 9, margin: 0 }]}>
              This is not a comprehensive professional assessment and has
              important limitations:
            </Text>
          </View>

          <Text style={styles.bulletPoint}>
            • Not a substitute for professional consultation - This automated
            report cannot replace the nuanced analysis that comes from direct
            professional evaluation
          </Text>
          <Text style={styles.bulletPoint}>
            • Not legal advice - While we reference relevant legislation, this
            report does not constitute formal legal or compliance advice
          </Text>
          <Text style={styles.bulletPoint}>
            • Not a detailed risk assessment - Responses are based on
            self-reported information and cannot capture the full workplace
            complexity
          </Text>
          <Text style={styles.bulletPoint}>
            • Not a complete solution - Implementing meaningful change requires
            deeper analysis, stakeholder consultation, and professional guidance
          </Text>

          <Text style={styles.subsectionTitle}>
            Important Limitations to Consider:
          </Text>
          <Text style={styles.bulletPoint}>
            • Self-assessment limitations - The accuracy depends entirely on the
            honesty and accuracy of your responses
          </Text>
          <Text style={styles.bulletPoint}>
            • Snapshot in time - Workplace conditions change frequently; this
            assessment reflects only the current moment
          </Text>
          <Text style={styles.bulletPoint}>
            • General recommendations - Our suggestions are necessarily broad
            and may not address your unique circumstances
          </Text>
          <Text style={styles.bulletPoint}>
            • No site-specific analysis - We have not observed your workplace
            directly or interviewed your employees
          </Text>

          <View
            style={[
              styles.contactInfo,
              {
                backgroundColor: "#fffbeb",
                borderLeft: 3,
                borderLeftColor: "#d97706",
                marginTop: 15,
              },
            ]}
          >
            <Text style={[styles.contactTitle, { color: "#d97706" }]}>
              Remember:
            </Text>
            <Text
              style={[
                styles.paragraph,
                { fontSize: 9, margin: 0, fontStyle: "italic" },
              ]}
            >
              This report is intended as a starting point to facilitate
              discussion around mental health within your organisation. To move
              forwards in exploring the contents of the report and gain a more
              nuanced understanding of mental health within your organisation
              please see below for details of how to schedule a free initial
              consultation with one of our workplace wellness specialists.
            </Text>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
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
            This assessment evaluated your organisation across multiple critical
            areas of workplace mental health, including legal compliance
            requirements and psychosocial risk factors.
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
          PASU Health - Workplace Mental Health Assessment Report | Section 1
        </Text>
      </Page>

      {/* Page 2: Legal Compliance */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logoImage} src={getLogoImageData()} />
            <Text style={styles.logoText}>PASU Health</Text>
          </View>
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
          PASU Health - Workplace Mental Health Assessment Report | Section 2
        </Text>
      </Page>

      {/* Page 3: Risk Analysis */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logoImage} src={getLogoImageData()} />
            <Text style={styles.logoText}>PASU Health</Text>
          </View>
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
          PASU Health - Workplace Mental Health Assessment Report | Section 3
        </Text>
      </Page>

      {/* Page 4: Recommendations */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logoImage} src={getLogoImageData()} />
            <Text style={styles.logoText}>PASU Health</Text>
          </View>
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
              Email: contact@pasuhealth.com
            </Text>
            <Text style={styles.contactDetail}>
              Website: www.pasuhealth.com
            </Text>
            <Text style={styles.contactDetail}>Platform: www.pasu.io</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          PASU Health - Workplace Mental Health Assessment Report | Section 4
        </Text>
      </Page>
      {/* Page 5: Free Consultation Offer */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logoImage} src={getLogoImageData()} />
            <Text style={styles.logoText}>PASU Health</Text>
          </View>
          <Text style={{ fontSize: 10, color: "#6b7280" }}>
            {results.contactDetails.company} - Next Steps
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Thank You for Completing Your Assessment
          </Text>

          <View
            style={[
              styles.riskCard,
              {
                backgroundColor: "#f0f9ff",
                borderColor: "#258fc1",
                marginBottom: 20,
                padding: 15,
              },
            ]}
          >
            <Text
              style={[styles.riskLevel, { color: "#0369a1", fontSize: 26 }]}
            >
              We&apos;d like to offer you a FREE 30-minute consultation
            </Text>
            <Text style={[styles.paragraph, { fontSize: 11, marginTop: 10 }]}>
              With one of our workplace wellness specialists to discuss your
              results and next steps.
            </Text>
          </View>
          <Text style={styles.sectionTitle}>
            What Your Free Consultation Will Cover
          </Text>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.bulletPoint}>
              • Detailed analysis of your organisation&apos;s specific risk
              factors
            </Text>
            <Text style={styles.bulletPoint}>
              • Customised mental health training solutions tailored to your
              needs
            </Text>
            <Text style={styles.bulletPoint}>
              • Implementation strategies for improving employee wellbeing
            </Text>
            <Text style={styles.bulletPoint}>
              • Available resources and support programs
            </Text>
            <Text style={styles.bulletPoint}>
              • Practical recommendations based on your assessment results
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.paragraph, { fontSize: 11, marginTop: 15 }]}>
            Your consultation is a personalised 30-minute online video call with
            one of our workplace wellness specialists. We&apos;ll go through all
            of your assessment results in detail, adding context and explaining
            what they mean for your business.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            How to Schedule Your Consultation
          </Text>

          <Text style={styles.bulletPoint}>
            • Visit: pasuhealth.com/schedule-a-consultation
          </Text>
          <Text style={styles.bulletPoint}>
            • Email us directly: contact@pasuhealth.com
          </Text>
        </View>

        <Text style={styles.footer}>
          PASU Health - Workplace Mental Health Assessment Report | Section 5 of
          5
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
