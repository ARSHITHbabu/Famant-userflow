import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Users, Home, Bot, Shield, ChevronDown, ChevronUp } from 'lucide-react';

interface FeatureMapProps {
  onSelectFeature: (feature: string) => void;
  selectedFeature: string | null;
}

const features = [
  {
    id: 'auth',
    title: 'Authentication',
    icon: Smartphone,
    color: 'bg-gray-100 border-gray-300',
    subfeatures: [
      'Phone number login (Firebase Auth + SMS OTP)',
      'Google OAuth sign-in',
      'Apple sign-in',
      'Auto-login for returning users (persisted session)',
      'Biometric unlock on re-open (Face ID / Fingerprint)',
      'Social login bypasses OTP step',
    ],
  },
  {
    id: 'family-setup',
    title: 'Family Setup',
    icon: Users,
    color: 'bg-indigo-100 border-indigo-300',
    subfeatures: [
      'Create Family: set name, optional photo',
      'Auto-generate unique 6-digit invite code',
      'Invite members at setup (optional)',
      'Join Family: enter invite code → preview → confirm',
      'Creator becomes Admin/Owner automatically',
      'Joiner gets Member role (configurable by admin)',
      'Admin can change roles later in Settings',
    ],
  },
  {
    id: 'dashboard',
    title: 'Dashboard — AI Home Screen',
    icon: Home,
    color: 'bg-blue-100 border-blue-300',
    subfeatures: [
      'Greeting card with personalized name',
      'Mood emoji selector → AI adjusts card priorities',
      'AI-curated task cards for today',
      'Smart reminders (passport, insurance, deadlines)',
      'Family activity feed ("Dad assigned a task...")',
      'Home Status module widget',
      'Financials snapshot (spent vs budget)',
      'Upcoming event card',
      'Bottom nav: Home · Grid · AI Chat · Notifications · Profile',
    ],
  },
  {
    id: 'ai-layer',
    title: 'AI in Onboarding & Dashboard',
    icon: Bot,
    color: 'bg-violet-100 border-violet-300',
    subfeatures: [
      'Dashboard AI Agent runs on every app open',
      'Pulls tasks, events, reminders, expenses to build cards',
      'Mood input → fewer / more urgent cards shown',
      'Proactive nudges based on deadlines and patterns',
      'AI Chat (center FAB) accessible from dashboard',
      'AI does NOT run during login or family setup (no context yet)',
    ],
  },
  {
    id: 'permissions',
    title: 'Roles & Permissions',
    icon: Shield,
    color: 'bg-rose-100 border-rose-300',
    subfeatures: [
      'Admin/Owner: full access, manage members, invite/remove',
      'Member (Adult): create, edit, share own items',
      'Child role: restricted — request mode for lists, view-only for expenses',
      'Personal layer: always private, even admins cannot see it',
      'Family layer: visible per item-level permissions set by creator',
      'Role set at join; changeable by admin later',
    ],
  },
];

export function FeatureMap({ onSelectFeature, selectedFeature }: FeatureMapProps) {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedFeature(expandedFeature === id ? null : id);
    onSelectFeature(id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Feature & Subfeature Structure</h2>
      <p className="text-sm text-gray-600 mb-4">Click to expand features</p>
      <div className="space-y-2">
        {features.map((f) => (
          <div key={f.id}>
            <motion.div
              className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${f.color} ${selectedFeature === f.id ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
              onClick={() => toggle(f.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <f.icon className="w-4 h-4" />
                  <h3 className="font-semibold text-gray-900 text-sm">{f.title}</h3>
                </div>
                {expandedFeature === f.id ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
              </div>
            </motion.div>
            <AnimatePresence>
              {expandedFeature === f.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="ml-6 mt-2 space-y-1">
                    {f.subfeatures.map((sub, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="text-sm text-gray-700 flex items-start"
                      >
                        <span className="text-indigo-500 mr-2">→</span>
                        <span>{sub}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
