import { motion } from 'motion/react';

interface UserActionsProps {
  onSelectFlow: (flow: string) => void;
  selectedFlow: string | null;
}

const actions = [
  {
    id: 'ua-phone-login',
    screen: 'Login',
    action: 'Enter phone number + tap Continue',
    path: '→ OTP verification screen',
    color: 'border-gray-400',
  },
  {
    id: 'ua-social-login',
    screen: 'Login',
    action: 'Tap Google or Apple button',
    path: '→ OAuth → Join/Create screen (no OTP)',
    color: 'border-gray-400',
  },
  {
    id: 'ua-otp',
    screen: 'OTP',
    action: 'Type 6-digit code',
    path: '→ Auto-submit → Join/Create screen',
    color: 'border-gray-400',
  },
  {
    id: 'ua-create',
    screen: 'Join/Create',
    action: 'Select "Create a Family" → Continue',
    path: '→ Create Family form',
    color: 'border-green-400',
  },
  {
    id: 'ua-join',
    screen: 'Join/Create',
    action: 'Select "Join a Family" → Continue',
    path: '→ Enter invite code screen',
    color: 'border-blue-400',
  },
  {
    id: 'ua-create-submit',
    screen: 'Create Family',
    action: 'Enter name, invite members → Create',
    path: '→ Family created → Dashboard',
    color: 'border-green-400',
  },
  {
    id: 'ua-join-submit',
    screen: 'Join Family',
    action: 'Type code → preview → confirm',
    path: '→ Joined family → Dashboard',
    color: 'border-blue-400',
  },
  {
    id: 'ua-dashboard-nav',
    screen: 'Dashboard',
    action: 'Tap bottom nav or module card',
    path: '→ Respective module (Tasks / Calendar / etc.)',
    color: 'border-indigo-400',
  },
  {
    id: 'ua-mood',
    screen: 'Dashboard',
    action: 'Tap mood emoji',
    path: '→ AI re-prioritizes and re-renders cards',
    color: 'border-indigo-400',
  },
  {
    id: 'ua-member',
    screen: 'Dashboard',
    action: 'Tap a member avatar in header strip',
    path: '→ Individual member view (shared snapshot)',
    color: 'border-purple-400',
  },
];

export function UserActions({ onSelectFlow, selectedFlow }: UserActionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">User Actions</h2>
      <p className="text-sm text-gray-600 mb-4">All user interactions across the onboarding flow</p>
      <div className="space-y-2">
        {actions.map((a) => (
          <motion.div
            key={a.id}
            className={`border-l-4 ${a.color} bg-gray-50 rounded-r-lg p-3 cursor-pointer hover:bg-indigo-50/40 transition-colors ${selectedFlow === a.id ? 'bg-indigo-50 border-indigo-500' : ''}`}
            onClick={() => onSelectFlow(a.id)}
            whileHover={{ x: 2 }}
          >
            <div className="flex items-start gap-2">
              <span className="text-[9px] font-bold text-gray-400 bg-gray-200 px-1 py-0.5 rounded mt-0.5 shrink-0">{a.screen}</span>
              <div>
                <p className="text-sm font-medium text-gray-800">{a.action}</p>
                <p className="text-xs text-gray-500 mt-0.5">{a.path}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
