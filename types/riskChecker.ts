export type Location = "UK" | "Ireland" | "Both";

export interface LegalPolicyQuestion {
  id: string;
  question: string;
  legalBasis?: {
    ireland?: string;
    uk?: string;
  };
  applicableLocations: Location[];
  category: "legal-policy";
}

export interface PsychosocialQuestion {
  id: string;
  category:
    | "Demands"
    | "Control"
    | "Support"
    | "Relationships"
    | "Role"
    | "Change";
  subcategory?: string;
  question: string;
  options: {
    id: number;
    text: string;
    score: number; // 0-3 scale
    description: string;
  }[];
  applicableLocations: Location[];
}

export interface ContactDetails {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  phone?: string;
  location: Location;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  phone?: string;
}

export interface SectionAResults {
  answers: Record<string, boolean>; // questionId -> yes/no
  hasComplianceGaps: boolean;
  failedQuestions: string[];
}

export interface SectionBResults {
  answers: Record<string, number>; // questionId -> score (0-3)
  categoryScores: Record<string, number>; // category -> average score (0-3)
  categoryRatings: Record<string, number>; // category -> converted rating (0-5)
  totalScore: number;
}

export interface AssessmentResults {
  sectionA: SectionAResults;
  sectionB: SectionBResults;
  overallRiskLevel: "low" | "moderate" | "severe";
  contactDetails: ContactDetails;
  completedAt: Date;
}

export interface RiskInterpretation {
  category: string;
  score: number;
  riskLevel: "low" | "moderate" | "high";
  interpretation: string;
  recommendations: string[];
}

// Question data structures
export const SECTION_A_QUESTIONS: LegalPolicyQuestion[] = [
  {
    id: "safety_statement",
    question:
      "Does your organisation's risk/safety policy explicitly acknowledge the management of work-related stress and psychosocial risks?",
    legalBasis: {
      ireland:
        "The Safety, Health and Welfare at Work Act 2005 requires your Safety Statement to be based on a full risk assessment, which must include psychosocial hazards like stress.",
      uk: "The Health and Safety at Work etc. Act 1974 requires a written health and safety policy. HSE guidance is clear that work-related stress must be treated like any other health hazard.",
    },
    applicableLocations: ["Both"],
    category: "legal-policy",
  },
  {
    id: "risk_assessment",
    question:
      "Has your organisation conducted and formally recorded a specific risk assessment to identify psychosocial hazards and assess the risk of work-related stress?",
    legalBasis: {
      ireland:
        "Section 19 of the Safety, Health and Welfare at Work Act 2005 mandates that employers identify all workplace hazards and assess the associated risks. The HSA's 'Work-Related Stress, A Guide for Employers' provides a clear framework for this.",
      uk: "The Management of Health and Safety at Work Regulations 1999 legally require employers to conduct a 'suitable and sufficient' risk assessment for all significant workplace hazards, including stress.",
    },
    applicableLocations: ["Both"],
    category: "legal-policy",
  },
  {
    id: "dignity_policy",
    question:
      "Does your organisation have a clear, well-communicated policy on Dignity at Work, bullying, and harassment that is actively implemented and understood by all staff?",
    legalBasis: {
      ireland:
        "The HSA's 'Code of Practice for Employers and Employees on the Prevention and Resolution of Bullying at Work' sets a clear standard. A failure to have and implement such a policy makes it very difficult to defend against personal injury or constructive dismissal claims.",
      uk: "While not a single specific law, Acas guidance makes it clear that a failure to prevent bullying and harassment can lead to claims under the Equality Act 2010 and breaches of the employer's duty of care.",
    },
    applicableLocations: ["Both"],
    category: "legal-policy",
  },
  {
    id: "control_implementation",
    question:
      "Has your organisation implemented and documented control measures to eliminate or reduce the psychosocial risks identified in the risk assessment?",
    legalBasis: {
      ireland:
        "Both UK and Irish legislation require employers to implement control measures to reduce identified risks to the lowest reasonably practicable level. An unaddressed risk assessment can be used as evidence of negligence.",
      uk: "Both UK and Irish legislation require employers to implement control measures to reduce identified risks to the lowest reasonably practicable level. An unaddressed risk assessment can be used as evidence of negligence.",
    },
    applicableLocations: ["Both"],
    category: "legal-policy",
  },
  {
    id: "manager_training",
    question:
      "Have line managers received specific training on identifying the signs of chronic stress and on their role in preventing and managing it within their teams?",
    legalBasis: {
      ireland:
        "You are empowering your managers to be your first line of defence in preventing and managing stress, which is recognised as a critical control measure by both the HSA and HSE.",
      uk: "You are empowering your managers to be your first line of defence in preventing and managing stress, which is recognised as a critical control measure by both the HSA and HSE.",
    },
    applicableLocations: ["Both"],
    category: "legal-policy",
  },
  {
    id: "equality_act_awareness",
    question:
      "Are managers aware of their duties under the Equality Act 2010 to consider making reasonable adjustments for an employee whose mental health condition could be defined as a disability?",
    legalBasis: {
      uk: "Your UK-based managers understand their legal duty to support employees with mental health conditions that may constitute a disability, including the duty to make reasonable adjustments.",
    },
    applicableLocations: ["UK"],
    category: "legal-policy",
  },
];

export const SECTION_B_QUESTIONS: PsychosocialQuestion[] = [
  {
    id: "demands_workload",
    category: "Demands",
    subcategory: "Workload",
    question:
      "How would you describe the typical workload in your organisation?",
    options: [
      {
        id: 0,
        text: "Optimised & Sustainable",
        score: 0,
        description:
          "Work is consistently achievable within contracted hours, with peak periods managed proactively. The culture encourages taking proper breaks and compassionate support is offered if performance dips.",
      },
      {
        id: 1,
        text: "Busy but Achievable",
        score: 1,
        description:
          "While often busy, work is generally manageable for most staff. Occasional overtime may be needed during peak times, but it is the exception rather than the rule.",
      },
      {
        id: 2,
        text: "Often Excessive",
        score: 2,
        description:
          "Regular overtime is a default expectation to keep up. Employees frequently feel they have to sacrifice quality or personal time simply to meet demands.",
      },
      {
        id: 3,
        text: "Overwhelming & Unsustainable",
        score: 3,
        description:
          "The volume of work is persistently unmanageable, leading to widespread stress and burnout. There is a constant sense of pressure with no end in sight.",
      },
    ],
    applicableLocations: ["Both"],
  },
  {
    id: "control_autonomy",
    category: "Control",
    subcategory: "Autonomy",
    question:
      "How much influence do employees have over their pace of work and how they carry it out?",
    options: [
      {
        id: 0,
        text: "High Trust & Autonomy",
        score: 0,
        description:
          "Employees are trusted as professionals to manage their own time and methods to achieve goals. Flexible working is common and input on work processes is actively encouraged and implemented.",
      },
      {
        id: 1,
        text: "Moderate Flexibility",
        score: 1,
        description:
          "There is some flexibility in how tasks are done, but this is often within rigid departmental procedures. Employees have some say, but final decisions on 'how' work is done rest firmly with management.",
      },
      {
        id: 2,
        text: "Limited & Prescribed",
        score: 2,
        description:
          "Tasks and methods are rigidly prescribed with little room for individual initiative. Employees are generally expected to follow instructions without question.",
      },
      {
        id: 3,
        text: "Rigid & Monitored",
        score: 3,
        description:
          "Work is highly controlled and closely monitored. There is no scope for autonomy, and a culture of micromanagement is prevalent.",
      },
    ],
    applicableLocations: ["Both"],
  },
  {
    id: "support_management",
    category: "Support",
    subcategory: "Management Support",
    question:
      "How would you rate the level of support and respect employees receive from their line managers?",
    options: [
      {
        id: 0,
        text: "Actively Supportive & Coaching",
        score: 0,
        description:
          "Managers are approachable, provide regular constructive feedback, and are trained to have supportive conversations. They actively work to remove obstacles for their team.",
      },
      {
        id: 1,
        text: "Generally Available",
        score: 1,
        description:
          "Managers are supportive when an employee directly asks for help. However, they tend to be reactive rather than proactive in offering support.",
      },
      {
        id: 2,
        text: "Inconsistent & Distant",
        score: 2,
        description:
          "Support is dependent on the individual manager, and many are perceived as too busy or unapproachable. Feedback is rare or often purely negative.",
      },
      {
        id: 3,
        text: "Unsupportive or a Source of Stress",
        score: 3,
        description:
          "Managers are often perceived as a primary source of pressure. There is a culture of blame, and employees feel they cannot raise concerns without negative consequences.",
      },
    ],
    applicableLocations: ["Both"],
  },
  {
    id: "support_professional",
    category: "Support",
    subcategory: "Professional Support",
    question:
      "What level of professional, confidential support is available for employees facing difficulties?",
    options: [
      {
        id: 0,
        text: "Comprehensive & Well-Promoted Service",
        score: 0,
        description:
          "A full Employee Assistance Programme (EAP) is actively promoted and accessible to all. Employees know what it is for and feel confident using it confidentially.",
      },
      {
        id: 1,
        text: "Basic Provision",
        score: 1,
        description:
          "A service exists (e.g., a helpline number) but it is not well-promoted or fully understood by staff. Usage is likely very low.",
      },
      {
        id: 2,
        text: "Informal Only",
        score: 2,
        description:
          "There is no formal external service. Employees are simply told they can talk to HR or a manager, which prevents confidential, impartial support.",
      },
      {
        id: 3,
        text: "No Formal Support",
        score: 3,
        description:
          "There are no defined structures in place for employees to seek confidential help with personal or professional difficulties.",
      },
    ],
    applicableLocations: ["Both"],
  },
  {
    id: "support_preventative",
    category: "Support",
    subcategory: "Preventative Resources",
    question:
      "What proactive and preventative resources are provided to help employees manage their own mental health?",
    options: [
      {
        id: 0,
        text: "Holistic & Proactive",
        score: 0,
        description:
          "The organisation invests in a full suite of preventative resources. This includes practical training for all staff on managing stress, alongside access to digital mental health platforms and tangible wellness initiatives.",
      },
      {
        id: 1,
        text: "General & Ad-Hoc",
        score: 1,
        description:
          "Some general resources are provided, such as one-off 'lunch and learn' awareness talks or links to articles on an intranet. These are often uncoordinated and seen as token gestures.",
      },
      {
        id: 2,
        text: "Passive Information Only",
        score: 2,
        description:
          "The only resources are passive, such as posters on a wall or a leaflet in a welcome pack. There is no active engagement in employee wellbeing.",
      },
      {
        id: 3,
        text: "No Preventative Resources",
        score: 3,
        description:
          "The organisation's approach is entirely reactive. No time or budget is invested in proactively educating or equipping employees to maintain their wellbeing.",
      },
    ],
    applicableLocations: ["Both"],
  },
  {
    id: "relationships_conflict",
    category: "Relationships",
    subcategory: "Conflict Management",
    question:
      "How are disagreements or conflicts within teams typically handled?",
    options: [
      {
        id: 0,
        text: "Constructively & Fairly",
        score: 0,
        description:
          "Conflict is accepted as normal and managed through fair, transparent procedures. There is a focus on resolution and learning, and mediation support is available.",
      },
      {
        id: 1,
        text: "Adequately, but Slowly",
        score: 1,
        description:
          "Conflicts are eventually addressed, but the process can be slow and bureaucratic. Issues can linger, causing unnecessary tension.",
      },
      {
        id: 2,
        text: "Poorly & Inconsistently",
        score: 2,
        description:
          "Conflicts are often ignored, or handled based on seniority or favouritism. This creates a sense of unfairness and mistrust.",
      },
      {
        id: 3,
        text: "Negatively & with Blame",
        score: 3,
        description:
          "A blame culture is prevalent. Disagreements often escalate into personal attacks, and behaviours like bullying or exclusion are tolerated.",
      },
    ],
    applicableLocations: ["Both"],
  },
  {
    id: "role_clarity",
    category: "Role",
    subcategory: "Role Clarity",
    question:
      "How clear are employees about their specific job role and responsibilities?",
    options: [
      {
        id: 0,
        text: "High Clarity & Purpose",
        score: 0,
        description:
          "Every employee has an up-to-date job description and understands how their role contributes to organisational goals. There are clear systems for managing priorities and resolving overlap.",
      },
      {
        id: 1,
        text: "Mostly Clear",
        score: 1,
        description:
          "Most people know their main duties, but there is occasional confusion over responsibilities on new or cross-functional projects.",
      },
      {
        id: 2,
        text: "Often Ambiguous",
        score: 2,
        description:
          "Roles frequently overlap, and employees are often unsure who is responsible for what. This leads to duplication of work or tasks being missed entirely.",
      },
      {
        id: 3,
        text: "Constant Confusion & Conflict",
        score: 3,
        description:
          "There is no role clarity. Employees are frequently given conflicting instructions from different managers, leading to high levels of stress and frustration.",
      },
    ],
    applicableLocations: ["Both"],
  },
  {
    id: "change_management",
    category: "Change",
    subcategory: "Change Communication",
    question:
      "How effectively is organisational change managed and communicated?",
    options: [
      {
        id: 0,
        text: "Transparently & Inclusively",
        score: 0,
        description:
          "Change is managed as a collaborative process. Staff are consulted early, provided with a clear rationale and timeline, and actively supported by leadership throughout the transition.",
      },
      {
        id: 1,
        text: "Well-Informed",
        score: 1,
        description:
          "There is good one-way communication, with management providing clear updates on changes. However, meaningful consultation with staff before decisions are made is limited.",
      },
      {
        id: 2,
        text: "Poorly & with Uncertainty",
        score: 2,
        description:
          "Changes are often announced with little warning or clear explanation, creating significant uncertainty and anxiety. Information is shared on a 'need-to-know' basis.",
      },
      {
        id: 3,
        text: "Abrupt & Chaotic",
        score: 3,
        description:
          "Changes are imposed suddenly and without warning. The resulting chaos and lack of support damages morale and trust in leadership.",
      },
    ],
    applicableLocations: ["Both"],
  },
];

// Scoring and interpretation logic
export const RISK_LEVEL_THRESHOLDS = {
  SECTION_B_SEVERE: 16, // Total score of 16+ in Section B
  SECTION_B_MODERATE_MIN: 8,
  SECTION_B_MODERATE_MAX: 15,
  SECTION_B_LOW_MAX: 7,
};

export const CATEGORY_INTERPRETATIONS: Record<
  string,
  {
    excellent: string;
    average: string;
    critical: string;
  }
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
      "Your organisation manages change transparently & inclusively. Treating change as a collaborative process builds the trust and resilience needed to navigate transitions successfully.",
    average:
      "You indicated that change is Well-Informed but can be Poorly & with Uncertainty. To improve, you must shift from simply informing employees to meaningfully consulting them before decisions are made, giving them a voice in the process.",
    critical:
      "Your rating shows that change is perceived as Abrupt & Chaotic. This approach damages morale and trust. To fix this, you must implement a formal change management process built on early communication and genuine consultation.",
  },
};

export const LEGAL_COMPLIANCE_INTERPRETATIONS = {
  safety_statement: {
    compliant:
      "You have correctly identified that your primary safety document must include mental health and work-related stress. This is a foundational step in meeting your duty of care.",
    nonCompliant: "This is a critical compliance failure.",
  },
  risk_assessment: {
    compliant:
      "You have correctly conducted a specific risk assessment for psychosocial hazards. This is the most critical active step in preventing work-related stress.",
    nonCompliant: "This is a direct breach of health and safety legislation.",
  },
  dignity_policy: {
    compliant:
      "Your organisation has an established policy for managing interpersonal conflicts and preventing bullying, which is essential for a psychologically safe workplace.",
    nonCompliant:
      "Your organisation is exposed to significant legal risk and is failing in its duty of care.",
  },
  control_implementation: {
    compliant:
      "You are correctly taking action based on your risk assessment findings. This demonstrates a proactive approach to managing safety.",
    nonCompliant:
      "A risk assessment without action is legally insufficient. Both UK and Irish legislation require employers to implement control measures to reduce identified risks to the lowest reasonably practicable level. An unaddressed risk assessment can be used as evidence of negligence.",
  },
  manager_training: {
    compliant:
      "You are empowering your managers to be your first line of defence in preventing and managing stress, which is recognised as a critical control measure by both the HSA and HSE.",
    nonCompliant:
      "Your managers may be unknowingly contributing to risk. Failing to provide managers with the necessary skills to manage their teams effectively is a common cause of work-related stress claims. Investing in manager training is a key preventative action.",
  },
  equality_act_awareness: {
    compliant:
      "Your UK-based managers understand their legal duty to support employees with mental health conditions that may constitute a disability, including the duty to make reasonable adjustments.",
    nonCompliant:
      "Your UK-based organisation is at high risk of a disability discrimination claim under the Equality Act 2010. This is a separate and serious legal obligation from general health and safety duties.",
  },
};
