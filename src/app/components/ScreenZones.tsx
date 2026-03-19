import { motion } from 'motion/react';

interface ScreenZonesProps {
  onSelectZone: (zone: string) => void;
  selectedZone: string | null;
}

const screens = [
  {
    id: 'zone-login',
    label: 'Login Screen',
    color: 'bg-gray-100 border-gray-400',
    zones: [
      { name: 'Logo Zone', desc: 'Famant logo + tagline, dark background' },
      { name: 'Input Zone', desc: 'Phone number field with country code picker' },
      { name: 'CTA Zone', desc: '"Continue with Phone" primary button' },
      { name: 'Social Zone', desc: 'Google + Apple login buttons' },
      { name: 'Legal Zone', desc: 'Terms & Privacy footer text' },
    ],
  },
  {
    id: 'zone-setup',
    label: 'Join / Create Screen',
    color: 'bg-indigo-100 border-indigo-400',
    zones: [
      { name: 'Progress Bar', desc: 'Step 1 of 2 indicator' },
      { name: 'Option Cards', desc: 'Two selectable cards — Create / Join' },
      { name: 'Selection State', desc: 'Selected card shows checkmark ring' },
      { name: 'CTA Button', desc: '"Continue" — enabled only after selection' },
    ],
  },
  {
    id: 'zone-dashboard',
    label: 'Dashboard Screen',
    color: 'bg-blue-100 border-blue-400',
    zones: [
      { name: 'Zone 1 — Header', desc: 'Family dropdown + member avatar strip (context switcher)' },
      { name: 'Zone 2 — Greeting', desc: 'AI greeting + mood selector' },
      { name: 'Zone 3 — Task Cards', desc: 'AI-curated action cards with inline CTAs' },
      { name: 'Zone 4 — Reminders', desc: 'Smart reminder + family nudge cards' },
      { name: 'Zone 5 — Widgets', desc: 'Home Status · Financials · Upcoming' },
      { name: 'Zone 6 — Bottom Nav', desc: 'Fixed: Home · Grid · AI Chat · Bell · Profile' },
    ],
  },
];

export function ScreenZones({ onSelectZone, selectedZone }: ScreenZonesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Screen Zones</h2>
      <p className="text-sm text-gray-600 mb-4">Key screen zones across the onboarding flow</p>
      <div className="space-y-4">
        {screens.map((s) => (
          <div key={s.id}>
            <div
              className={`border-2 rounded-lg p-3 cursor-pointer ${s.color} ${selectedZone === s.id ? 'ring-2 ring-indigo-400' : ''}`}
              onClick={() => onSelectZone(s.id)}
            >
              <p className="font-bold text-gray-900 text-sm">{s.label}</p>
            </div>
            <div className="ml-4 mt-1 space-y-0.5">
              {s.zones.map((z) => (
                <motion.div
                  key={z.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-2 text-xs text-gray-600"
                >
                  <span className="text-indigo-400 shrink-0">•</span>
                  <span><strong>{z.name}</strong> — {z.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
