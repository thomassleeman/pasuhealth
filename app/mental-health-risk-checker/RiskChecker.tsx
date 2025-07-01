"use client";
import { useState } from "react";
import ContactForm from "./components/ContactForm";
import { ContactFormData } from "@/types/riskChecker";
import logo from "@public/brainLogoCompressed.png";
import { PDFDownloadButton } from "@components/PDFDownloadButton";
import Image from "next/image";
import InfoDialogue from "@/components/InfoDialogue";

import {
  ChevronRightIcon,
  ChevronLeftIcon,
  MapPinIcon,
  DocumentTextIcon,
  ChartBarIcon,
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

  const handleContactSubmit = (data: ContactFormData) => {
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

    setState((prev) => ({
      ...prev,
      contactDetails: updatedContactDetails,
      results,
      step: "results",
    }));

    // TODO: Send results to backend/email service
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
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold mb-3">Next Steps</h4>
            <p className="text-gray-700 mb-4">
              Thank you for completing the assessment,{" "}
              {state.contactDetails.firstName}. A workplace wellness specialist
              will contact you at {state.contactDetails.email} within 24-48
              hours to discuss:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>
                Detailed analysis of your organisation&apos;s risk factors
              </li>
              <li>
                Customised mental health training solutions for your workplace
              </li>
              <li>
                Implementation strategies for improving employee wellbeing
              </li>
              <li>Available resources and support programs</li>
            </ul>

            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
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

  const handleNext = () => {
    if (state.selectedAnswer === null) return;

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
