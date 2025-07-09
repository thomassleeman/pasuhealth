"use client";
import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import { ContactFormData } from "@/types/riskChecker";
import logo from "@public/brainLogoCompressed.png";
import { PDFDownloadButton } from "@components/PDFDownloadButton";
import Image from "next/image";
import InfoDialogue from "@/components/InfoDialogue";
import { submitAssessmentResults } from "@actions/assessmentEmail";

import {
  ChevronRightIcon,
  ChevronLeftIcon,
  MapPinIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ArrowTurnRightDownIcon,
} from "@heroicons/react/24/outline";

// Import our types and utilities (these would be in separate files)
import {
  Location,
  LegalPolicyQuestion,
  PsychosocialQuestion,
  ContactDetails,
  AssessmentResults,
} from "../../types/riskChecker";

import {
  getQuestionsForLocation,
  calculateSectionAResults,
  calculateSectionBResults,
  calculateOverallRiskLevel,
  generateRiskInterpretations,
  generateComplianceInterpretation,
  getRiskLevelDisplayProps,
  calculateProgress,
} from "./riskCheckerUtils";

export type AssessmentStep =
  | "introduction"
  | "location"
  | "sectionA"
  | "sectionB"
  | "contact"
  | "results";

interface AssessmentState {
  step: AssessmentStep;
  location: Location | null;
  sectionAQuestions: LegalPolicyQuestion[];
  sectionBQuestions: PsychosocialQuestion[];
  currentQuestionIndex: number;
  sectionAAnswers: Record<string, boolean>;
  sectionBAnswers: Record<string, number>;
  contactDetails: ContactDetails;
  results: AssessmentResults | null;
  selectedAnswer: boolean | number | null;
}

export default function EnhancedMentalHealthRiskAssessment() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, setState] = useState<AssessmentState>({
    step: "introduction",
    location: null,
    sectionAQuestions: [],
    sectionBQuestions: [],
    currentQuestionIndex: 0,
    sectionAAnswers: {},
    sectionBAnswers: {},
    contactDetails: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      role: "",
      phone: "",
      location: "UK",
    },
    results: null,
    selectedAnswer: null,
  });

  /* ------------ dev section-------------------------- */
  // Add this useEffect to check for URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("dev") === "results") {
      const loadMockData = () => {
        const MOCK_RESULTS: AssessmentResults = {
          sectionA: {
            answers: {
              safety_statement: true,
              risk_assessment: false,
              dignity_policy: true,
              control_implementation: false,
              manager_training: true,
              equality_act_awareness: true,
            },
            hasComplianceGaps: true,
            failedQuestions: ["risk_assessment", "control_implementation"],
          },
          sectionB: {
            answers: {
              demands_workload: 2,
              control_autonomy: 1,
              support_management: 2,
              support_professional: 3,
              support_preventative: 1,
              relationships_conflict: 1,
              role_clarity: 0,
              change_management: 2,
            },
            categoryScores: {
              Demands: 2.0,
              Control: 1.0,
              Support: 2.0,
              Relationships: 1.0,
              Role: 0.0,
              Change: 2.0,
            },
            categoryRatings: {
              Demands: 1.7,
              Control: 3.3,
              Support: 2.5,
              Relationships: 3.3,
              Role: 5.0,
              Change: 1.7,
            },
            totalScore: 12,
          },
          overallRiskLevel: "severe" as const,
          contactDetails: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            company: "Example Corp",
            role: "HR Manager",
            phone: "123-456-7890",
            location: "UK" as Location,
          },
          completedAt: new Date(),
        };
        const questions = getQuestionsForLocation("UK");
        setState({
          step: "results",
          location: "UK",
          sectionAQuestions: questions.sectionA,
          sectionBQuestions: questions.sectionB,
          currentQuestionIndex: 0,
          sectionAAnswers: MOCK_RESULTS.sectionA.answers,
          sectionBAnswers: MOCK_RESULTS.sectionB.answers,
          contactDetails: MOCK_RESULTS.contactDetails,
          results: MOCK_RESULTS,
          selectedAnswer: null,
        });
      };
      loadMockData();
    }
  }, []);

  /* ------------ dev section-------------------------- */

  // Introduction Component
  const Introduction = () => (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center mb-6">
            <Image
              src={logo}
              alt="PASU Health Logo"
              className="h-16 w-16 object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-3xl text-gray-900 mb-4">
            Workplace Mental Health Risk & Compliance Assessment
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Take the first step towards creating a mentally healthy workplace.
          </p>
        </div>

        <div className="border border-emerald-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            How It Works
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-medium text-emerald-600">
                1
              </div>
              <p className="ml-3 text-gray-700">
                Select your location (UK or Ireland)
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-medium text-emerald-600">
                2
              </div>
              <p className="ml-3 text-gray-700">
                Answer questions about your policies & compliance
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-medium text-emerald-600">
                3
              </div>
              <p className="ml-3 text-gray-700">
                Assess key psychosocial risk factors
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-medium text-emerald-600">
                4
              </div>
              <p className="ml-3 text-gray-700">
                Receive your organisation&apos;s risk report in PDF format
              </p>
            </div>
          </div>
        </div>

        <div className="bg-sky-50 rounded-lg p-6 mb-6 border border-sky-200">
          <h3 className="text-lg font-medium text-sky-900 mb-3 ">
            What you&apos;ll get
          </h3>
          <ul className=" text-sky-800 space-y-2">
            <li>• Initial risk assessment covering 6 key areas</li>
            <li>• Legal compliance review specific to your location</li>
            <li>• Overview of recommendations and possible next steps</li>
            <li>
              • Option of a <span className="font-bold">free</span> consultation
              with our workplace wellness experts
            </li>
          </ul>
        </div>

        <div className="space-y-6 ">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Why This Assessment Matters
            </h2>
            <p className="text-gray-700 mb-4">
              Poor mental health costs UK businesses £45 billion annually. This
              assessment helps you:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span>
                  Identify key psychosocial risk factors in your workplace
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span>Ensure compliance with mental health legislation</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span>
                  Get actionable recommendations to improve employee wellbeing
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span>Reduce absenteeism and improve productivity</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>Time required:</strong> Approximately 5-7 minutes
            </p>
          </div>
          <InfoDialogue
            label="Confidentiality"
            title="confidentiality"
            description="Your responses are confidential and will not be shared with any third party, ever. With your permission we will store a copy of your report solely for the purposes of providing additional services, whether free of charge or on a chargeable basis."
            content="This assessment is designed to help you identify key mental health risks in your workplace and ensure compliance with relevant legislation."
          />
        </div>

        <button
          onClick={handleStartAssessment}
          className="w-full mt-6 py-3 px-6 text-white cursor-pointer font-medium bg-emerald-600 hover:bg-emerald-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Start Here
        </button>
      </div>
    </div>
  );

  // Location Selection Component
  const LocationSelector = () => (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <MapPinIcon className="mx-auto h-16 w-16 text-emerald-600 mb-4" />
          <h1 className="text-3xl text-gray-900 mb-2">
            Workplace Mental Health Risk & Compliance Assessment
          </h1>
          <p className="text-gray-600">
            Start by selecting your location below.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Where is your organisation based?
          </h2>
          <p className="text-gray-600 mb-6">
            This helps us provide location-specific legal guidance and
            compliance requirements.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(["UK", "Ireland"] as Location[]).map((location) => (
              <button
                key={location}
                onClick={() => handleLocationSelect(location)}
                className={`${location === state.location ? "border-emerald-600 shadow-md outline-2 outline-emerald-600 bg-emerald-50" : "border-gray-300 border"} relative flex cursor-pointer rounded-lg p-6 shadow-sm hover:shadow-md`}
              >
                <div className="flex flex-1 items-center">
                  <div className="text-left">
                    <span className="block text-lg font-medium text-gray-900">
                      {location === "UK" ? "United Kingdom" : "Ireland"}
                    </span>
                    <span className="mt-1 flex items-center text-sm text-gray-500">
                      {location === "UK"
                        ? "Health and Safety at Work etc. Act 1974, Equality Act 2010"
                        : "Safety, Health and Welfare at Work Act 2005, HSA Guidelines"}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setState((prev) => ({ ...prev, step: "sectionA" }))}
            className="w-full mt-6 py-3 px-6 text-white cursor-pointer font-medium bg-emerald-600 hover:bg-emerald-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={!state.location}
          >
            Start Assessment
            <ChevronRightIcon className="inline-block ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );

  // Section A - Legal/Policy Questions Component
  const SectionAQuestion = () => {
    const question = state.sectionAQuestions[state.currentQuestionIndex];
    if (!question) return null;

    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-emerald-600 mb-2">
              <DocumentTextIcon className="h-5 w-5" />
              <span>Legal & Policy Compliance</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Core Legal & Policy Audit
            </h1>
            <p className="text-gray-600">
              This section assesses adherence to mandatory legal and
              foundational policy requirements. A &apos;No&apos; answer
              indicates a significant compliance gap.
            </p>
          </div>

          <ProgressBar />

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {[
                { value: true, label: "Yes", color: "emerald" },
                { value: false, label: "No", color: "red" },
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      selectedAnswer: option.value,
                    }))
                  }
                  className={`w-full relative flex cursor-pointer rounded-lg border p-4 shadow-sm hover:border-gray-400 focus:outline-none transition-colors ${
                    state.selectedAnswer === option.value
                      ? option.color === "emerald"
                        ? "border-emerald-600 ring-2 ring-emerald-600 bg-emerald-50"
                        : "border-red-600 ring-2 ring-red-600 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <span className="flex flex-1 text-left">
                    <span className="flex flex-col">
                      <span className="block text-base font-medium text-gray-900">
                        {option.label}
                      </span>
                    </span>
                  </span>
                  {/* {state.selectedAnswer === option.value && (
                    <CheckIcon
                      className={`h-5 w-5 ${option.color === "emerald" ? "text-emerald-600" : "text-red-600"}`}
                    />
                  )} */}
                </button>
              ))}
            </div>

            {question.legalBasis && (
              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                  Legal Context:
                </h3>
                <p className="text-sm text-blue-700">
                  {state.location === "Ireland" && question.legalBasis.ireland
                    ? question.legalBasis.ireland
                    : state.location === "UK" && question.legalBasis.uk
                      ? question.legalBasis.uk
                      : question.legalBasis.ireland || question.legalBasis.uk}
                </p>
              </div>
            )}
          </div>

          <NavigationButtons />
        </div>
      </div>
    );
  };

  // Section B - Psychosocial Questions Component
  const SectionBQuestion = () => {
    const question = state.sectionBQuestions[state.currentQuestionIndex];
    if (!question) return null;

    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-emerald-600 mb-2">
              <ChartBarIcon className="h-5 w-5" />
              <span>Psychosocial Risk Assessment</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {question.category} - {question.subcategory}
            </h1>
            <p className="text-gray-600">
              This section evaluates the key areas of psychosocial risk. Select
              the description that best fits your organisation&apos;s typical
              environment.
            </p>
          </div>

          <ProgressBar />

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {question.question}
            </h2>

            <div className="space-y-4">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      selectedAnswer: option.score,
                    }))
                  }
                  className={`w-full relative flex cursor-pointer rounded-lg border p-4 shadow-sm hover:border-gray-400 focus:outline-none transition-colors ${
                    state.selectedAnswer === option.score
                      ? "border-emerald-600 ring-2 ring-emerald-600 bg-emerald-50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <span className="flex flex-1 text-left">
                    <span className="flex flex-col">
                      <span className="block text-base font-medium text-gray-900 mb-2">
                        {option.text}
                      </span>
                      <span className="block text-sm text-gray-600">
                        {option.description}
                      </span>
                    </span>
                  </span>
                  {/* {state.selectedAnswer === option.score && (
                    <CheckIcon className="h-5 w-5 text-emerald-600 mt-1" />
                  )} */}
                </button>
              ))}
            </div>
          </div>

          <NavigationButtons />
        </div>
      </div>
    );
  };

  const handleContactSubmit = async (data: ContactFormData) => {
    // Update state with the form data
    const updatedContactDetails = {
      ...data,
      location: state.location!,
      phone: data.phone || "",
    };

    // Calculate results
    const sectionAResults = calculateSectionAResults(state.sectionAAnswers);
    const sectionBResults = calculateSectionBResults(state.sectionBAnswers);
    const overallRiskLevel = calculateOverallRiskLevel(
      sectionAResults,
      sectionBResults
    );

    const results: AssessmentResults = {
      sectionA: sectionAResults,
      sectionB: sectionBResults,
      overallRiskLevel,
      contactDetails: updatedContactDetails,
      completedAt: new Date(),
    };

    // Update state first to show results to user
    setState((prev) => ({
      ...prev,
      contactDetails: updatedContactDetails,
      results,
      step: "results",
    }));

    // Send assessment results via email (async, don't block UI)
    try {
      const emailResult = await submitAssessmentResults(results);
      if (!emailResult.success) {
        console.error("Failed to send assessment email:", emailResult.error);
        // You might want to show a non-blocking notification to the user
        // that the email failed to send, but don't prevent them from seeing results
      }
    } catch (error) {
      console.error("Error sending assessment email:", error);
      // Handle error silently or show a non-blocking notification
    }
  };

  const ResultsDisplay = () => {
    if (!state.results) return null;

    const riskProps = getRiskLevelDisplayProps(state.results.overallRiskLevel);
    const interpretations = generateRiskInterpretations(state.results.sectionB);

    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Your Workplace Mental Health Risk Assessment Results
          </h2>
          <div className="flex items-center gap-x-2 text-gray-500 mb-4 w-fit border border-gray-400 rounded-md py-1 px-4 ">
            <p className="">Download a pdf copy below</p>
            <ArrowTurnRightDownIcon className="h-5 w-5 mt-2.5" />
          </div>

          {/* Overall Risk Level */}
          <div className={`mb-8 p-6 rounded-lg ${riskProps.bgColor}`}>
            <h3 className={`text-2xl font-semibold mb-2 ${riskProps.color}`}>
              Overall Risk Level: {riskProps.label}
            </h3>
            <p className={`text-lg ${riskProps.color}`}>
              {riskProps.description}
            </p>
          </div>

          {/* Section A Results */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">
              Legal & Policy Compliance
            </h4>
            <div className="grid gap-4">
              {state.sectionAQuestions.map((question) => {
                const isCompliant =
                  state.results!.sectionA.answers[question.id];
                const interpretation = generateComplianceInterpretation(
                  question.id,
                  isCompliant,
                  state.location!
                );

                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      isCompliant
                        ? "bg-green-50 border-green-400"
                        : "bg-red-50 border-red-400"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-sm font-medium ${
                          isCompliant ? "text-green-800" : "text-red-800"
                        }`}
                      >
                        {isCompliant ? "COMPLIANT" : "NON-COMPLIANT"}
                      </span>
                    </div>
                    <h5 className="font-medium text-gray-900 mb-2">
                      {question.question}
                    </h5>
                    <p
                      className={`text-sm ${isCompliant ? "text-green-700" : "text-red-700"}`}
                    >
                      {interpretation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section B Results */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">
              Psychosocial Risk Analysis
            </h4>
            <div className="space-y-6">
              {interpretations.map((interpretation) => (
                <div
                  key={interpretation.category}
                  className="border rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-lg font-medium text-gray-900">
                      {interpretation.category}
                    </h5>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {interpretation.score.toFixed(1)}/5.0
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          interpretation.riskLevel === "low"
                            ? "bg-green-100 text-green-800"
                            : interpretation.riskLevel === "moderate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {interpretation.riskLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                    <div
                      className={`h-2.5 rounded-full ${
                        interpretation.riskLevel === "low"
                          ? "bg-green-600"
                          : interpretation.riskLevel === "moderate"
                            ? "bg-yellow-600"
                            : "bg-red-600"
                      }`}
                      style={{ width: `${(interpretation.score / 5) * 100}%` }}
                    />
                  </div>
                  <p className="text-gray-700 mb-3">
                    {interpretation.interpretation}
                  </p>
                  {interpretation.recommendations.length > 0 && (
                    <div>
                      <h6 className="font-medium text-gray-900 mb-2">
                        Recommendations:
                      </h6>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {interpretation.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}

          <div className="">
            <div className="bg-gradient-to-br from-white to-gray-50 ring-1 ring-yellow-200 rounded-lg outline-8 drop-shadow-md outline-yellow-300/15">
              <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                  <p className="text-emerald-800 text-lg font-medium mb-3">
                    Thank you for completing the assessment,{" "}
                    {state.contactDetails.firstName}...
                  </p>
                  <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-10">
                    We&apos;d like to offer you a{" "}
                    <span className="text-sky-600">
                      free 30 min consultation
                    </span>{" "}
                    with one of our workplace wellness specialists.
                    <Image
                      src={logo}
                      alt="Logo"
                      className="w-12 lg:w-14 ml-3 h-auto mx-auto inline-block"
                    />
                  </h2>

                  {/* Primary CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <a
                      href="https://www.calendly.com/theburnouthub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-emerald-200"
                    >
                      Schedule Free Consultation
                    </a>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full sm:w-auto text-gray-700 hover:text-emerald-600 font-semibold px-6 py-4 border-2 border-gray-300 hover:border-emerald-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
                    >
                      Learn More
                      <span className="ml-2" aria-hidden="true">
                        →
                      </span>
                    </button>
                    {isModalOpen && (
                      <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                          <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={() => setIsModalOpen(false)}
                          ></div>

                          <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                            <div className="bg-white px-6 pt-6 pb-4 sm:p-8">
                              <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <svg
                                      className="w-6 h-6 text-emerald-600"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                      />
                                    </svg>
                                  </div>
                                  <div className="ml-4">
                                    <h3 className="text-2xl font-bold text-gray-900">
                                      About Your Free Consultation
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                      30-minute video call
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setIsModalOpen(false)}
                                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                  <span className="sr-only">Close</span>
                                  <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>

                              <div>
                                <p className="text-gray-600 leading-relaxed">
                                  Your consultation is a personalized 30-minute
                                  online video call with one of our workplace
                                  wellness specialists. We&apos;ll go through
                                  all of your assessment results in detail,
                                  adding context and explaining what they mean
                                  for your business. You&apos;ll receive
                                  practical recommendations on what you can do
                                  to improve the wellbeing of your people,
                                  tailored specifically to your
                                  organization&apos;s unique needs and
                                  challenges.
                                </p>
                              </div>
                            </div>

                            <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse">
                              <a
                                href="https://www.calendly.com/theburnouthub"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsModalOpen(false)}
                                className="w-full inline-flex justify-center rounded-lg border border-transparent bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                              >
                                Schedule My Consultation
                              </a>
                              <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm transition-colors duration-200"
                                onClick={() => setIsModalOpen(false)}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Your free consultation will cover:
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg
                          className="w-3 h-3 text-emerald-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700">
                        Detailed analysis of your organisation&apos;s risk
                        factors
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg
                          className="w-3 h-3 text-emerald-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700">
                        Customised mental health training solutions
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg
                          className="w-3 h-3 text-emerald-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700">
                        Implementation strategies for employee wellbeing
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg
                          className="w-3 h-3 text-emerald-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700">
                        Available resources and support programs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-6 py-3 rounded-lg border border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                Start New Assessment
              </button>
              <PDFDownloadButton results={state.results}>
                Download PDF Report
              </PDFDownloadButton>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Progress Bar Component
  const ProgressBar = () => {
    const progress = calculateProgress(
      state.step,
      state.currentQuestionIndex,
      state.sectionAQuestions.length,
      state.sectionBQuestions.length
    );

    return (
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Assessment Progress</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };

  // Navigation Buttons Component
  const NavigationButtons = () => (
    <div className="flex gap-4">
      <button
        onClick={handlePrevious}
        disabled={!canGoBack()}
        className={`flex items-center gap-2 px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
          !canGoBack()
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        }`}
      >
        <ChevronLeftIcon className="h-5 w-5" />
        Previous
      </button>

      <button
        onClick={handleNext}
        disabled={state.selectedAnswer === null}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
          state.selectedAnswer === null
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-emerald-600 text-white hover:bg-emerald-700"
        }`}
      >
        {getNextButtonText()}
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );

  // Helper Functions

  const handleStartAssessment = () => {
    setState((prev) => ({
      ...prev,
      step: "location",
    }));
  };

  const handleLocationSelect = (location: Location) => {
    const questions = getQuestionsForLocation(location);
    setState((prev) => ({
      ...prev,
      location,
      sectionAQuestions: questions.sectionA,
      sectionBQuestions: questions.sectionB,
      // step: "sectionA",
      currentQuestionIndex: 0,
      selectedAnswer: null,
      contactDetails: { ...prev.contactDetails, location },
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    if (state.selectedAnswer === null) return;

    scrollToTop();

    if (state.step === "sectionA") {
      const newAnswers = {
        ...state.sectionAAnswers,
        [state.sectionAQuestions[state.currentQuestionIndex].id]:
          state.selectedAnswer as boolean,
      };

      if (state.currentQuestionIndex < state.sectionAQuestions.length - 1) {
        setState((prev) => ({
          ...prev,
          sectionAAnswers: newAnswers,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          selectedAnswer: null,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          sectionAAnswers: newAnswers,
          step: "sectionB",
          currentQuestionIndex: 0,
          selectedAnswer: null,
        }));
      }
    } else if (state.step === "sectionB") {
      const newAnswers = {
        ...state.sectionBAnswers,
        [state.sectionBQuestions[state.currentQuestionIndex].id]:
          state.selectedAnswer as number,
      };

      if (state.currentQuestionIndex < state.sectionBQuestions.length - 1) {
        setState((prev) => ({
          ...prev,
          sectionBAnswers: newAnswers,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          selectedAnswer: null,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          sectionBAnswers: newAnswers,
          step: "contact",
          selectedAnswer: null,
        }));
      }
    }
  };

  const handlePrevious = () => {
    if (state.step === "sectionA") {
      if (state.currentQuestionIndex > 0) {
        setState((prev) => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1,
          selectedAnswer:
            prev.sectionAAnswers[
              prev.sectionAQuestions[prev.currentQuestionIndex - 1].id
            ] ?? null,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          step: "location",
          selectedAnswer: null,
        }));
      }
    } else if (state.step === "sectionB") {
      if (state.currentQuestionIndex > 0) {
        setState((prev) => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1,
          selectedAnswer:
            prev.sectionBAnswers[
              prev.sectionBQuestions[prev.currentQuestionIndex - 1].id
            ] ?? null,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          step: "sectionA",
          currentQuestionIndex: prev.sectionAQuestions.length - 1,
          selectedAnswer:
            prev.sectionAAnswers[
              prev.sectionAQuestions[prev.sectionAQuestions.length - 1].id
            ] ?? null,
        }));
      }
    } else if (state.step === "contact") {
      setState((prev) => ({
        ...prev,
        step: "sectionB",
        currentQuestionIndex: prev.sectionBQuestions.length - 1,
        selectedAnswer:
          prev.sectionBAnswers[
            prev.sectionBQuestions[prev.sectionBQuestions.length - 1].id
          ] ?? null,
      }));
    }
  };

  const canGoBack = (): boolean => {
    return !(state.step === "sectionA" && state.currentQuestionIndex === 0);
  };

  const getNextButtonText = (): string => {
    if (state.step === "sectionA") {
      return state.currentQuestionIndex === state.sectionAQuestions.length - 1
        ? "Continue to Risk Assessment"
        : "Next Question";
    } else if (state.step === "sectionB") {
      return state.currentQuestionIndex === state.sectionBQuestions.length - 1
        ? "Complete Assessment"
        : "Next Question";
    }
    return "Next";
  };

  // Main Render
  switch (state.step) {
    case "introduction":
      return <Introduction />;
    case "location":
      return <LocationSelector />;
    case "sectionA":
      return <SectionAQuestion />;
    case "sectionB":
      return <SectionBQuestion />;
    case "contact":
      return (
        <ContactForm
          onSubmit={handleContactSubmit}
          onBack={handlePrevious}
          initialData={state.contactDetails}
        />
      );
    case "results":
      return <ResultsDisplay />;
    default:
      return <Introduction />;
  }
}
