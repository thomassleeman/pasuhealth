"use client";
import { useState } from "react";
import { questions } from "./questions";
import {
  CheckIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

interface ContactDetails {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  phone?: string;
}

interface Results {
  scores: Record<string, number>;
  categoryScores: Record<string, number>;
  totalScore: number;
  riskLevel: "low" | "moderate" | "high";
  contactDetails?: ContactDetails;
}

export default function MentalHealthRiskIdentifier() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    phone: "",
  });
  const [results, setResults] = useState<Results | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNext = () => {
    if (selectedOption !== null) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: selectedOption,
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        setShowContactForm(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevQuestion = questions[currentQuestionIndex - 1];
      setSelectedOption(answers[prevQuestion.id] || null);
    }
  };

  const calculateResults = (): Results => {
    const scores: Record<string, number> = {};
    const categoryScores: Record<string, number> = {
      Role: 0,
      Demands: 0,
      Control: 0,
      Relationships: 0,
      Support: 0,
      Change: 0,
    };
    const categoryCounts: Record<string, number> = {
      Role: 0,
      Demands: 0,
      Control: 0,
      Relationships: 0,
      Support: 0,
      Change: 0,
    };

    questions.forEach((q) => {
      const score = answers[q.id] || 0;
      scores[q.id] = score;
      categoryScores[q.category] += score;
      categoryCounts[q.category] += 1;
    });

    // Calculate average scores per category
    Object.keys(categoryScores).forEach((category) => {
      if (categoryCounts[category] > 0) {
        categoryScores[category] =
          categoryScores[category] / categoryCounts[category];
      }
    });

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const averageScore = totalScore / questions.length;

    let riskLevel: "low" | "moderate" | "high" = "low";
    if (averageScore >= 2) {
      riskLevel = "high";
    } else if (averageScore >= 1) {
      riskLevel = "moderate";
    }

    return {
      scores,
      categoryScores,
      totalScore,
      riskLevel,
      contactDetails,
    };
  };

  const handleSubmitContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setShowContactForm(false);
    setShowResults(true);
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600 bg-green-50";
      case "moderate":
        return "text-yellow-600 bg-yellow-50";
      case "high":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  if (showResults && results) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Your Workplace Mental Health Risk Assessment Results
          </h2>

          <div
            className={`mb-8 p-6 rounded-lg ${getRiskLevelColor(results.riskLevel)}`}
          >
            <h3 className="text-2xl font-semibold mb-2">
              Overall Risk Level:{" "}
              {results.riskLevel.charAt(0).toUpperCase() +
                results.riskLevel.slice(1)}
            </h3>
            <p className="text-lg">
              Based on your responses, your workplace shows a{" "}
              {results.riskLevel} risk level for mental health issues.
            </p>
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">
              Risk Scores by Category
            </h4>
            <div className="space-y-4">
              {Object.entries(results.categoryScores).map(
                ([category, score]) => (
                  <div key={category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {category}
                      </span>
                      <span className="text-sm text-gray-600">
                        {score.toFixed(1)}/3.0
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          score < 1
                            ? "bg-green-600"
                            : score < 2
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        }`}
                        style={{ width: `${(score / 3) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold mb-3">Next Steps</h4>
            <p className="text-gray-700 mb-4">
              Thank you for completing the assessment,{" "}
              {contactDetails.firstName}. A workplace wellness specialist will
              contact you at {contactDetails.email} within 24-48 hours to
              discuss:
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
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Start New Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showContactForm) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Get Your Personalised Results
          </h2>
          <p className="text-gray-600 mb-8">
            Please provide your contact information to receive your detailed
            workplace mental health risk assessment and recommendations.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactDetails.firstName}
                  onChange={(e) =>
                    setContactDetails({
                      ...contactDetails,
                      firstName: e.target.value,
                    })
                  }
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactDetails.lastName}
                  onChange={(e) =>
                    setContactDetails({
                      ...contactDetails,
                      lastName: e.target.value,
                    })
                  }
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Email *
              </label>
              <input
                type="email"
                required
                value={contactDetails.email}
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    email: e.target.value,
                  })
                }
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={contactDetails.company}
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    company: e.target.value,
                  })
                }
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Role *
              </label>
              <input
                type="text"
                required
                value={contactDetails.role}
                onChange={(e) =>
                  setContactDetails({ ...contactDetails, role: e.target.value })
                }
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={contactDetails.phone}
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    phone: e.target.value,
                  })
                }
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowContactForm(false);
                  setCurrentQuestionIndex(questions.length - 1);
                  setSelectedOption(
                    answers[questions[questions.length - 1].id] || null
                  );
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Back
              </button>
              <button
                onClick={handleSubmitContact}
                disabled={
                  !contactDetails.firstName ||
                  !contactDetails.lastName ||
                  !contactDetails.email ||
                  !contactDetails.company ||
                  !contactDetails.role
                }
                className={`flex-1 px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                  !contactDetails.firstName ||
                  !contactDetails.lastName ||
                  !contactDetails.email ||
                  !contactDetails.company ||
                  !contactDetails.role
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                Get My Results
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Workplace Mental Health Risk Identifier
          </h1>
          <p className="text-gray-600">
            Assess your organisation&apos;s mental health risk factors and get
            personalised recommendations.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {currentQuestion.category}
          </h2>
          <h3 className="text-lg text-gray-700 mb-6">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.score)}
                className={`w-full relative flex cursor-pointer rounded-lg border p-4 shadow-sm hover:border-gray-400 focus:outline-none transition-colors ${
                  selectedOption === option.score
                    ? "border-emerald-600 ring-2 ring-emerald-600 bg-emerald-50"
                    : "border-gray-300 bg-white"
                }`}
              >
                <span className="flex flex-1 text-left">
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-gray-900">
                      {option.text}
                    </span>
                  </span>
                </span>
                {selectedOption === option.score && (
                  <CheckIcon className="h-5 w-5 text-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
              currentQuestionIndex === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
              selectedOption === null
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {currentQuestionIndex === questions.length - 1
              ? "Complete Assessment"
              : "Next"}
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
