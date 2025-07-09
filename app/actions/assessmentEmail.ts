"use server";

import { z } from "zod";
import { Resend } from "resend";
import type { AssessmentResults } from "@/types/riskChecker";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema for assessment results
const AssessmentResultsSchema = z.object({
  sectionA: z.object({
    answers: z.record(z.boolean()),
    hasComplianceGaps: z.boolean(),
    failedQuestions: z.array(z.string()),
  }),
  sectionB: z.object({
    answers: z.record(z.number()),
    categoryScores: z.record(z.number()),
    categoryRatings: z.record(z.number()),
    totalScore: z.number(),
  }),
  overallRiskLevel: z.enum(["low", "moderate", "severe"]),
  contactDetails: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    company: z.string(),
    role: z.string(),
    phone: z.string().optional(),
    location: z.enum(["UK", "Ireland", "Both"]),
  }),
  completedAt: z.date(),
});

// Question mappings for email formatting
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

function getRiskLevelSummary(level: "low" | "moderate" | "severe"): string {
  switch (level) {
    case "low":
      return "Low Risk - Good practices in place with minor areas for improvement";
    case "moderate":
      return "Moderate Risk - Some areas need attention to prevent escalation";
    case "severe":
      return "Severe Risk - Urgent action required to address significant gaps";
  }
}

function formatCategoryScore(category: string, score: number): string {
  let status = "Good";
  if (score < 2) status = "Needs Attention";
  else if (score < 3.5) status = "Fair";

  return `${category}: ${score.toFixed(1)}/5.0 (${status})`;
}

export async function submitAssessmentResults(results: AssessmentResults) {
  try {
    // Validate the results
    const validatedResults = AssessmentResultsSchema.parse({
      ...results,
      completedAt: new Date(results.completedAt), // Ensure it's a Date object
    });

    const { contactDetails, sectionA, sectionB, overallRiskLevel } =
      validatedResults;

    // Generate HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background-color: #059669; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .section { margin-bottom: 30px; }
          .risk-badge { 
            display: inline-block; 
            padding: 8px 16px; 
            border-radius: 4px; 
            font-weight: bold;
            color: white;
          }
          .risk-low { background-color: #059669; }
          .risk-moderate { background-color: #d97706; }
          .risk-severe { background-color: #dc2626; }
          .compliance-item { 
            margin: 10px 0; 
            padding: 10px; 
            border-left: 4px solid #ccc;
            background-color: #f9f9f9;
          }
          .compliant { border-left-color: #059669; }
          .non-compliant { border-left-color: #dc2626; }
          .category-scores { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 10px; 
          }
          .category-item { 
            padding: 10px; 
            background-color: #f3f4f6; 
            border-radius: 4px; 
          }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f8f9fa; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Mental Health Risk Assessment Results</h1>
          <p>New assessment completed by ${contactDetails.firstName} ${contactDetails.lastName}</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2>Assessment Overview</h2>
            <p><strong>Overall Risk Level:</strong> 
              <span class="risk-badge risk-${overallRiskLevel}">${getRiskLevelSummary(overallRiskLevel)}</span>
            </p>
            <p><strong>Assessment Date:</strong> ${validatedResults.completedAt.toLocaleDateString("en-GB")}</p>
          </div>

          <div class="section">
            <h2>Contact Details</h2>
            <table>
              <tr><td><strong>Name:</strong></td><td>${contactDetails.firstName} ${contactDetails.lastName}</td></tr>
              <tr><td><strong>Company:</strong></td><td>${contactDetails.company}</td></tr>
              <tr><td><strong>Role:</strong></td><td>${contactDetails.role}</td></tr>
              <tr><td><strong>Email:</strong></td><td>${contactDetails.email}</td></tr>
              <tr><td><strong>Phone:</strong></td><td>${contactDetails.phone || "Not provided"}</td></tr>
              <tr><td><strong>Location:</strong></td><td>${contactDetails.location}</td></tr>
            </table>
          </div>

          <div class="section">
            <h2>Legal & Policy Compliance</h2>
            <p><strong>Compliance Status:</strong> ${sectionA.hasComplianceGaps ? "Issues Identified" : "Compliant"}</p>
            <p><strong>Failed Compliance Items:</strong> ${sectionA.failedQuestions.length}</p>
            
            ${SECTION_A_QUESTIONS.filter(
              (q) =>
                contactDetails.location !== "Ireland" ||
                q.id !== "equality_act_awareness"
            )
              .map((question) => {
                const isCompliant = sectionA.answers[question.id];
                return `
                  <div class="compliance-item ${isCompliant ? "compliant" : "non-compliant"}">
                    <strong>${isCompliant ? "✓ COMPLIANT" : "✗ NON-COMPLIANT"}:</strong> ${question.question}
                  </div>
                `;
              })
              .join("")}
          </div>

          <div class="section">
            <h2>Psychosocial Risk Analysis</h2>
            <p><strong>Total Risk Score:</strong> ${sectionB.totalScore} points</p>
            
            <h3>Category Breakdown:</h3>
            <div class="category-scores">
              ${Object.entries(sectionB.categoryRatings)
                .map(
                  ([category, rating]) => `
                <div class="category-item">
                  <strong>${category}</strong><br>
                  ${rating.toFixed(1)}/5.0
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <div class="section">
            <h2>Recommended Next Steps</h2>
            <ul>
              ${sectionA.hasComplianceGaps ? "<li><strong>Urgent:</strong> Address legal compliance gaps</li>" : ""}
              <li>Review and improve lower-scoring risk categories</li>
              <li>Implement targeted mental health training programmes</li>
              <li>Schedule follow-up consultation with PASU Health specialist</li>
            </ul>
          </div>

          <div class="section">
            <p><em>This assessment was generated automatically. Please contact the participant within 24-48 hours to discuss next steps.</em></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Generate text email content
    const textContent = `
MENTAL HEALTH RISK ASSESSMENT RESULTS

Assessment completed by: ${contactDetails.firstName} ${contactDetails.lastName}
Date: ${validatedResults.completedAt.toLocaleDateString("en-GB")}

CONTACT DETAILS
Name: ${contactDetails.firstName} ${contactDetails.lastName}
Company: ${contactDetails.company}
Role: ${contactDetails.role}
Email: ${contactDetails.email}
Phone: ${contactDetails.phone || "Not provided"}
Location: ${contactDetails.location}

OVERALL RISK ASSESSMENT
Risk Level: ${getRiskLevelSummary(overallRiskLevel)}

LEGAL & POLICY COMPLIANCE
Compliance Status: ${sectionA.hasComplianceGaps ? "Issues Identified" : "Compliant"}
Failed Compliance Items: ${sectionA.failedQuestions.length}

Compliance Details:
${SECTION_A_QUESTIONS.filter(
  (q) =>
    contactDetails.location !== "Ireland" || q.id !== "equality_act_awareness"
)
  .map((question) => {
    const isCompliant = sectionA.answers[question.id];
    return `- ${isCompliant ? "COMPLIANT" : "NON-COMPLIANT"}: ${question.question}`;
  })
  .join("\n")}

PSYCHOSOCIAL RISK ANALYSIS
Total Risk Score: ${sectionB.totalScore} points

Category Scores:
${Object.entries(sectionB.categoryRatings)
  .map(([category, rating]) => `- ${formatCategoryScore(category, rating)}`)
  .join("\n")}

RECOMMENDED NEXT STEPS
${sectionA.hasComplianceGaps ? "- URGENT: Address legal compliance gaps" : ""}
- Review and improve lower-scoring risk categories
- Implement targeted mental health training programmes
- Schedule follow-up consultation with PASU Health specialist

Contact the participant within 24-48 hours to discuss next steps.
    `;

    // Send email to business
    const businessResponse = await resend.emails.send({
      from: "Mental Health Assessment <contact@pasuhealth.com>",
      to:
        (process.env.TRAINING_EMAIL as string) ||
        (process.env.CONTACT_EMAIL as string),
      subject: `New Risk Assessment: ${contactDetails.company} - ${overallRiskLevel.toUpperCase()} Risk`,
      text: textContent,
      html: htmlContent,
    });

    // Send confirmation email to participant
    const participantHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background-color: #059669; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .section { margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Thank You for Completing Your Risk Assessment</h1>
        </div>
        
        <div class="content">
          <div class="section">
            <p>Dear ${contactDetails.firstName},</p>
            
            <p>Thank you for completing the Workplace Mental Health Risk Assessment for ${contactDetails.company}.</p>
            
            <p>Your assessment has been received and a PASU Health specialist will contact you within 24-48 hours to discuss:</p>
            <ul>
              <li>Your organisation's specific risk factors</li>
              <li>Customised mental health training solutions</li>
              <li>Implementation strategies for improvements</li>
              <li>Available resources and support programmes</li>
            </ul>
            
            <p>In the meantime, you can explore our training courses and workplace wellness platform at:</p>
            <ul>
              <li>Training Courses: <a href="https://pasuhealth.com">pasuhealth.com</a></li>
              <li>Wellness Platform: <a href="https://pasu.io">pasu.io</a></li>
            </ul>
            
            <p>If you have any immediate questions, please don't hesitate to contact us at contact@pasuhealth.com</p>
            
            <p>Best regards,<br>
            The PASU Health Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const participantResponse = await resend.emails.send({
      from: "PASU Health <contact@pasuhealth.com>",
      to: contactDetails.email,
      subject: "Your Workplace Mental Health Risk Assessment - Next Steps",
      text: `Dear ${contactDetails.firstName},

Thank you for completing the Workplace Mental Health Risk Assessment for ${contactDetails.company}.

Your assessment has been received and a PASU Health specialist will contact you within 24-48 hours to discuss:
- Your organisation's specific risk factors
- Customised mental health training solutions  
- Implementation strategies for improvements
- Available resources and support programmes

In the meantime, you can explore our training courses and workplace wellness platform at:
- Training Courses: pasuhealth.com
- Wellness Platform: pasu.io

If you have any immediate questions, please contact us at contact@pasuhealth.com

Best regards,
The PASU Health Team`,
      html: participantHtmlContent,
    });

    // Check for errors
    if (businessResponse.error) {
      console.error("Business email error:", businessResponse.error);
      return { success: false, error: "Failed to send notification email" };
    }

    if (participantResponse.error) {
      console.error("Participant email error:", participantResponse.error);
      // Don't fail the whole process if participant email fails
      console.warn(
        "Participant confirmation email failed, but assessment was recorded"
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Assessment email error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid assessment data provided",
      };
    }

    return {
      success: false,
      error: "Failed to send assessment results. Please try again.",
    };
  }
}
