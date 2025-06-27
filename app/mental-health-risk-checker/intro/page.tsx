import { UserGroupIcon } from "@heroicons/react/24/outline";

export default function MentalHealthRiskCheckerPage() {
  return (
    <div className="max-w-2xl container mx-auto py-8">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <UserGroupIcon className="mx-auto h-16 w-16 text-emerald-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Intro</h1>
            <p className="text-gray-600">
              Assess your organisation&apos;s mental health risk factors and get
              personalised recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
