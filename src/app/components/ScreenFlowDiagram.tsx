import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type FlowStep = {
  id: string;
  screen: string;
  tag: string;
  tagColor: string;
  description: string;
  userAction: string;
  systemResponse: string;
  nextScreens: string[];
};

const flows: FlowStep[] = [
  {
    id: 'login',
    screen: 'Login Screen',
    tag: 'AUTH',
    tagColor: 'bg-gray-700 text-white',
    description: 'First screen the user sees on app open. Two entry methods: phone number or social (Google/Apple).',
    userAction: 'Enters phone number → taps "Continue with Phone"\nOR taps Google / Apple button',
    systemResponse: 'Phone: Firebase Auth sends 6-digit OTP via SMS\nGoogle/Apple: OAuth token verified → skip OTP',
    nextScreens: ['OTP Verification (phone)', 'Join/Create screen (social — skips OTP)'],
  },
  {
    id: 'otp',
    screen: 'OTP Verification',
    tag: 'AUTH',
    tagColor: 'bg-gray-700 text-white',
    description: 'Only shown for phone number login. User enters the 6-digit SMS code.',
    userAction: 'Types 6-digit OTP → auto-submits when complete',
    systemResponse: 'Verify OTP with Firebase Auth\nOn success: check if user has a family linked\nIf no family → go to Join/Create screen\nIf family exists → go directly to Dashboard',
    nextScreens: ['Join/Create Family (new user)', 'Dashboard (returning user with family)'],
  },
  {
    id: 'join-create',
    screen: 'Join or Create Family',
    tag: 'SETUP',
    tagColor: 'bg-indigo-600 text-white',
    description: 'Shown only once — when user has no family linked. User picks their path.',
    userAction: 'Selects "Create a Family" or "Join a Family" → taps Continue',
    systemResponse: 'Saves selection state\nRoutes to the corresponding setup screen',
    nextScreens: ['Create Family screen', 'Join Family screen'],
  },
  {
    id: 'create-family',
    screen: 'Create Family',
    tag: 'SETUP — Path A',
    tagColor: 'bg-green-600 text-white',
    description: 'User sets up a new family workspace. Provides name, optional photo, and invites members.',
    userAction: 'Enters family name → optional photo → optional invite members → taps "Create Family & Enter"',
    systemResponse: 'Creates family record in DB (family_id, name, created_by)\nGenerates unique 6-digit invite code\nSets current user as Admin/Owner\nSends push invite to invited members\nNavigates to Dashboard',
    nextScreens: ['Dashboard (Home)'],
  },
  {
    id: 'join-family',
    screen: 'Join Family (Enter Code)',
    tag: 'SETUP — Path B',
    tagColor: 'bg-blue-600 text-white',
    description: 'User enters the 6-digit invite code shared by their family admin.',
    userAction: 'Types 6-digit invite code → system shows family preview → taps "Join Family & Enter"',
    systemResponse: 'Validates code against DB\nFetches family record for preview\nOn confirm: links user to family_id with Member role\nNotifies admin of new join\nNavigates to Dashboard',
    nextScreens: ['Dashboard (Home)'],
  },
  {
    id: 'dashboard',
    screen: 'Dashboard (Home)',
    tag: 'HOME',
    tagColor: 'bg-indigo-600 text-white',
    description: 'The main hub of the app. AI-curated, personalized, and updated in real-time. Entry point to all 5 feature modules.',
    userAction: 'Arrives here after family setup (or on every app open for returning users)\nTaps AI cards, module shortcuts, or bottom nav',
    systemResponse: 'AI Dashboard Agent runs on load:\n→ Fetches today\'s tasks for user\n→ Fetches upcoming calendar events\n→ Checks for conflicts, deadlines, expirations\n→ Renders personalized action cards\n→ Loads financials snapshot\n→ Loads upcoming event preview\nUser mood input → AI adjusts card priorities',
    nextScreens: ['Tasks', 'Lists', 'Calendar', 'Documents', 'Expenses', 'AI Chat', 'Member Profile', 'Notifications'],
  },
];

function Phone({ children, label, active }: { children: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className={`relative flex flex-col rounded-[2rem] border-[3px] shadow-xl overflow-hidden w-28 ${active ? 'border-indigo-600' : 'border-gray-700'} bg-gray-800`}>
        <div className="bg-gray-800 flex justify-between items-center px-2 py-1">
          <span className="text-[6px] text-gray-400">9:41</span>
          <div className="w-6 h-1.5 bg-gray-600 rounded-full" />
          <span className="text-[6px] text-gray-400">●●</span>
        </div>
        <div className="bg-white overflow-hidden flex-1">{children}</div>
        <div className="bg-gray-800 flex justify-center py-1">
          <div className="w-8 h-0.5 bg-gray-500 rounded-full" />
        </div>
      </div>
      <p className={`text-[9px] font-bold text-center max-w-[112px] leading-tight ${active ? 'text-indigo-700' : 'text-gray-700'}`}>{label}</p>
    </div>
  );
}

export function ScreenFlowDiagram() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-1">Screen-by-Screen Flow</h2>
      <p className="text-sm text-gray-600 mb-6">
        Click any screen card to see the full detail: user action, system response, and where it leads.
      </p>

      {/* Linear + branch flow */}
      <div className="space-y-3">
        {flows.map((step, idx) => {
          const isActive = activeStep === step.id;
          return (
            <div key={step.id}>
              <motion.div
                className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-colors ${
                  isActive ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 bg-gray-50 hover:bg-indigo-50/30'
                }`}
                onClick={() => setActiveStep(isActive ? null : step.id)}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-800 text-white text-[9px] font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{step.screen}</span>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${step.tagColor}`}>{step.tag}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: isActive ? 90 : 0 }}
                    className="text-gray-400 text-sm shrink-0 ml-2"
                  >
                    ▶
                  </motion.span>
                </div>
              </motion.div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 mt-1 mb-2 border-l-2 border-indigo-200 pl-4 space-y-3">
                      {/* User Action */}
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">User Action</p>
                        <p className="text-xs text-gray-700 whitespace-pre-line">{step.userAction}</p>
                      </div>

                      {/* System Response */}
                      <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                        <p className="text-[10px] font-bold text-purple-700 uppercase tracking-wider mb-1">System Response</p>
                        <p className="text-xs text-gray-700 whitespace-pre-line">{step.systemResponse}</p>
                      </div>

                      {/* Next screens */}
                      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <p className="text-[10px] font-bold text-green-700 uppercase tracking-wider mb-1">Leads To</p>
                        <div className="flex flex-wrap gap-1.5">
                          {step.nextScreens.map((ns) => (
                            <span key={ns} className="text-xs bg-white border border-green-300 text-green-800 px-2 py-0.5 rounded-full font-medium">
                              → {ns}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Arrow between steps (not after last) */}
              {idx < flows.length - 1 && (
                <div className="flex items-center gap-2 px-4 py-1">
                  <div className="w-6 flex justify-center">
                    <div className="text-gray-300 text-base">↓</div>
                  </div>
                  {(step.id === 'join-create') && (
                    <span className="text-[9px] text-gray-400 italic">branches into Path A or Path B — both converge at Dashboard</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Flow summary */}
      <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
        <p className="text-xs font-bold text-gray-700 mb-3">Complete Flow Summary</p>
        <div className="flex flex-wrap items-center gap-1 text-[10px]">
          {[
            { label: 'Login', color: 'bg-gray-700 text-white' },
            { label: '→', color: '' },
            { label: 'OTP', color: 'bg-gray-600 text-white' },
            { label: '→', color: '' },
            { label: 'Join / Create?', color: 'bg-indigo-600 text-white' },
            { label: '→', color: '' },
            { label: 'Create Family', color: 'bg-green-600 text-white' },
            { label: 'or', color: 'text-gray-400 font-bold' },
            { label: 'Join Family', color: 'bg-blue-600 text-white' },
            { label: '→', color: '' },
            { label: 'Dashboard ✓', color: 'bg-indigo-600 text-white' },
          ].map((item, i) => (
            item.color ? (
              <span key={i} className={`px-2 py-0.5 rounded-full font-bold ${item.color}`}>{item.label}</span>
            ) : (
              <span key={i} className="text-gray-400 font-bold">{item.label}</span>
            )
          ))}
        </div>
        <p className="text-[9px] text-gray-400 mt-2">
          * Social login (Google/Apple) skips the OTP step. Returning users with an existing family skip both Join/Create steps and land directly on Dashboard.
        </p>
      </div>
    </div>
  );
}
