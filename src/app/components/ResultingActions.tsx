interface ResultingActionsProps {
  selectedFlow: string | null;
}

const responses: Record<string, { title: string; steps: string[]; color: string }> = {
  'ua-phone-login': {
    title: 'Phone Login',
    color: 'border-gray-400',
    steps: [
      'Validate phone number format',
      'Firebase Auth: send SMS OTP',
      'Show 6-digit input screen',
      'Start 60s OTP expiry countdown',
    ],
  },
  'ua-social-login': {
    title: 'Social Login',
    color: 'border-gray-400',
    steps: [
      'Launch Google/Apple OAuth flow',
      'Receive OAuth token',
      'Verify token server-side',
      'Check if user has family → skip setup if yes',
      'Go to Join/Create if new user',
    ],
  },
  'ua-otp': {
    title: 'OTP Submit',
    color: 'border-gray-400',
    steps: [
      'Auto-submit when 6th digit entered',
      'Verify with Firebase Auth',
      'On success: check existing family',
      'New user → Join/Create screen',
      'Returning user → Dashboard directly',
    ],
  },
  'ua-create': {
    title: 'Path A Selected',
    color: 'border-green-400',
    steps: [
      'Save path selection (create)',
      'Route to Create Family form',
      'Pre-fill admin name from auth profile',
    ],
  },
  'ua-join': {
    title: 'Path B Selected',
    color: 'border-blue-400',
    steps: [
      'Save path selection (join)',
      'Route to Enter Code screen',
      'Show 6-box invite code input',
    ],
  },
  'ua-create-submit': {
    title: 'Family Created',
    color: 'border-green-400',
    steps: [
      'Validate family name (required)',
      'Create family record in DB',
      'Generate unique 6-digit invite code',
      'Set current user as Admin',
      'Send push invites to invited members',
      'Navigate to Dashboard',
    ],
  },
  'ua-join-submit': {
    title: 'Family Joined',
    color: 'border-blue-400',
    steps: [
      'Validate code against DB',
      'Fetch + show family preview',
      'On confirm: link user to family_id',
      'Assign Member role',
      'Notify admin of new member',
      'Navigate to Dashboard',
    ],
  },
  'ua-dashboard-nav': {
    title: 'Module Navigation',
    color: 'border-indigo-400',
    steps: [
      'Bottom nav tap → route to module',
      'Grid icon → More screen (module tiles)',
      'AI FAB → AI Chat screen',
      'Bell → Notifications',
      'Profile → Settings',
    ],
  },
  'ua-mood': {
    title: 'Mood Selected',
    color: 'border-indigo-400',
    steps: [
      'Store mood signal (session)',
      'AI Dashboard Agent re-runs',
      'Tired → show fewer, urgent-only cards',
      'Happy → show all cards + suggestions',
      'Cards re-render with updated priorities',
    ],
  },
  'ua-member': {
    title: 'Member View Opened',
    color: 'border-purple-400',
    steps: [
      'Fetch member\'s shared tasks',
      'Fetch member\'s mood status',
      'Show member\'s financial summary (shared portion)',
      'Display "View All Tasks →" CTA for that member',
      'No access to member\'s personal items',
    ],
  },
};

const defaultResponse = {
  title: 'Select an action',
  color: 'border-gray-200',
  steps: ['Click any user action on the left to see the system response here'],
};

export function ResultingActions({ selectedFlow }: ResultingActionsProps) {
  const data = (selectedFlow && responses[selectedFlow]) ? responses[selectedFlow] : defaultResponse;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">System Response</h2>
      <p className="text-sm text-gray-600 mb-4">What the system does after each user action</p>

      <div className={`border-l-4 ${data.color} bg-gray-50 rounded-r-lg p-4`}>
        <p className="font-bold text-gray-900 text-sm mb-3">{data.title}</p>
        <div className="space-y-2">
          {data.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-indigo-500 text-xs mt-0.5 shrink-0">{i + 1}.</span>
              <span className="text-sm text-gray-700">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
