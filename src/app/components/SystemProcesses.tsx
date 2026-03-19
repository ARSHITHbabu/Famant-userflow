const processes = [
  {
    title: 'Firebase Auth',
    color: 'bg-orange-50 border-orange-200',
    headerColor: 'bg-orange-500',
    items: [
      'Phone: OTP via Firebase SMS (6-digit, 60s expiry)',
      'Google OAuth: ID token verify',
      'Apple Sign-In: identity token verify',
      'Session persistence: refresh token stored on device',
      'Biometric re-auth on app reopen',
    ],
  },
  {
    title: 'Family Service',
    color: 'bg-green-50 border-green-200',
    headerColor: 'bg-green-600',
    items: [
      'Create family: POST /families → returns family_id + invite_code',
      'Invite code: 6-char alphanumeric, unique, stored in DB',
      'Join family: POST /families/:id/join — validates code, links user',
      'Role assignment: admin | member | child',
      'Invite push notifications to invited phone numbers / emails',
    ],
  },
  {
    title: 'Dashboard AI Agent',
    color: 'bg-indigo-50 border-indigo-200',
    headerColor: 'bg-indigo-600',
    items: [
      'Runs on every dashboard load',
      'Queries: today\'s tasks, upcoming events, recent expenses, expiring docs',
      'Gemini 2.0 Flash generates personalized card text and action labels',
      'Mood signal adjusts card count and urgency threshold',
      'Conflict / deadline nudges surfaced as special reminder cards',
      'Output: ordered list of action cards with type, text, and CTAs',
    ],
  },
  {
    title: 'Session & Routing',
    color: 'bg-blue-50 border-blue-200',
    headerColor: 'bg-blue-600',
    items: [
      'New user (no family) → always shows Join/Create after auth',
      'Returning user (family exists) → skips setup, goes to Dashboard',
      'Deep-link support: share link can land user on specific module after onboarding',
      'Token refresh happens silently in background',
    ],
  },
];

export function SystemProcesses() {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">System Processes</h2>
      <p className="text-sm text-gray-600 mb-4">Backend operations during onboarding and dashboard load</p>
      <div className="space-y-4">
        {processes.map((p) => (
          <div key={p.title} className={`border rounded-lg overflow-hidden ${p.color}`}>
            <div className={`${p.headerColor} px-3 py-1.5`}>
              <span className="text-white font-semibold text-xs">{p.title}</span>
            </div>
            <ul className="px-3 py-2 space-y-1">
              {p.items.map((item, i) => (
                <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                  <span className="text-gray-400 shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
