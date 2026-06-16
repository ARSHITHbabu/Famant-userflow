// SettingsFeature.tsx — Section 7 · Profile & Settings · Role-Based UI + Flows

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

// ─── Reusable Phone Shell (matches PhoneLayoutDiagram style) ─────────────────

function PhoneShell({
  children,
  label,
  sublabel,
  accent = 'border-gray-700',
}: {
  children: React.ReactNode;
  label?: string;
  sublabel?: string;
  accent?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative flex flex-col rounded-[2rem] border-[4px] shadow-2xl overflow-hidden w-36 bg-gray-800 ${accent}`}
      >
        <div className="bg-gray-800 flex justify-between items-center px-3 py-1">
          <span className="text-[7px] text-gray-400">9:41</span>
          <div className="w-8 h-2 bg-gray-600 rounded-full" />
          <span className="text-[7px] text-gray-400">▶▶</span>
        </div>
        <div className="bg-white flex-1 overflow-hidden relative">
          {children}
          <div className="absolute top-1 right-1 z-10 bg-gray-900/80 rounded-md p-0.5">
            <ScanIconSVG size={9} />
          </div>
        </div>
        <div className="bg-gray-800 flex justify-center py-1.5">
          <div className="w-14 h-1 bg-gray-500 rounded-full" />
        </div>
      </motion.div>
      {label && (
        <div className="text-center">
          <p className="text-xs font-bold text-gray-800">{label}</p>
          {sublabel && <p className="text-[10px] text-gray-500 max-w-[140px]">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}

function ScanIconSVG({ size = 9 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 9V4h5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 9V4h-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 15v5h5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 15v5h-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BottomNav({ active }: { active: 'home' | 'grid' | 'bell' | 'profile' }) {
  const c = (t: string) => t === active ? 'text-violet-600' : 'text-gray-400';
  return (
    <div className="bg-white border-t border-gray-100 flex items-center justify-around py-1.5 px-2">
      <span className={`text-[10px] ${c('home')}`}>🏠</span>
      <span className={`text-[11px] font-bold ${c('grid')}`}>⊞</span>
      <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center shadow-md">
        <span className="text-[8px] text-white">🤖</span>
      </div>
      <span className={`text-[10px] ${c('bell')}`}>🔔</span>
      <span className={`text-[10px] ${c('profile')}`}>👤</span>
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-2 shrink-0">
      {label && <span className="text-[10px] text-gray-500 font-medium text-center max-w-[56px] leading-tight">{label}</span>}
      <ArrowRight className="w-5 h-5 text-gray-300" />
    </div>
  );
}

// ─── Settings Row primitive ───────────────────────────────────────────────────

function SR({ icon, label, value, badge, danger, sub }: {
  icon: string; label: string; value?: string;
  badge?: string | number; danger?: boolean; sub?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-[4.5px] bg-white">
      <div className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center shrink-0 ${danger ? 'bg-red-50' : 'bg-violet-50'}`}>
        <span className="text-[8px]">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[7px] font-medium leading-none ${danger ? 'text-red-500' : 'text-gray-800'}`}>{label}</p>
        {sub && <p className="text-[5.5px] text-gray-400 mt-0.5 leading-none">{sub}</p>}
      </div>
      {badge !== undefined && (
        <span className="text-[6px] font-bold bg-violet-600 text-white rounded-full px-1 py-0.5 leading-none">{badge}</span>
      )}
      {value && <span className="text-[6.5px] text-gray-400">{value}</span>}
      {!danger && <span className="text-[9px] text-gray-300 leading-none">›</span>}
    </div>
  );
}

function SH({ label }: { label: string }) {
  return <p className="text-[5.5px] uppercase tracking-widest text-gray-400 font-bold px-2 pt-1.5 pb-0.5">{label}</p>;
}

function SD() {
  return <div className="h-px bg-gray-100 mx-2" />;
}

function Locked({ label }: { label: string }) {
  return (
    <div className="mx-2 my-0.5 rounded-lg border border-dashed border-gray-200 bg-gray-50 flex items-center gap-1.5 px-1.5 py-1">
      <span className="text-[7px] text-gray-300">🔒</span>
      <span className="text-[6px] text-gray-300 flex-1">{label}</span>
      <span className="text-[5.5px] text-gray-200 italic">hidden</span>
    </div>
  );
}

function MiniBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className={`${color} rounded-lg mx-2 px-1.5 py-1 mb-0.5`}>
      <div className="flex justify-between mb-0.5">
        <span className="text-[6px] font-semibold text-gray-700">{label}</span>
        <span className="text-[6px] font-bold text-gray-600">{pct}%</span>
      </div>
      <div className="bg-white/50 rounded-full h-1">
        <div className="bg-violet-500 rounded-full h-1" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ─── Profile Header ───────────────────────────────────────────────────────────

function ProfileHeader({ name, role, tasks, lists, events }: {
  name: string; role: string; tasks: number; lists: number; events: number;
}) {
  return (
    <div className="bg-white px-2 pt-2 pb-1.5 border-b border-gray-100">
      <div className="flex items-center gap-1.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-sm">
          <span className="text-[12px] font-black text-white">{name[0]}</span>
        </div>
        <div className="flex-1">
          <p className="text-[8.5px] font-black text-gray-900 leading-tight">{name}</p>
          <p className="text-[6.5px] text-violet-600 font-semibold leading-tight">{role}</p>
        </div>
        <div className="text-[6px] text-violet-500 font-bold border border-violet-200 rounded-md px-1 py-0.5 bg-violet-50">Edit</div>
      </div>
      <div className="flex gap-2 mt-1.5">
        {[['Tasks', tasks], ['Lists', lists], ['Events', events]].map(([k, v]) => (
          <div key={String(k)} className="text-center">
            <p className="text-[8px] font-black text-gray-800 leading-none">{v}</p>
            <p className="text-[5.5px] text-gray-400 mt-0.5">{k}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROLE SCREENS
// ═══════════════════════════════════════════════════════════════════════════════

function OwnerSettingsScreen() {
  return (
    <div className="flex flex-col" style={{ minHeight: 290 }}>
      <div className="bg-white px-2 py-1 flex items-center justify-between border-b border-gray-100">
        <p className="text-[9px] font-black text-gray-900">Profile</p>
      </div>
      <div className="flex-1">
        <ProfileHeader name="Natasha" role="Owner" tasks={52} lists={5} events={3} />
        <SH label="Personal" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="✏️" label="Edit Profile" />
          <SD /><SR icon="🔔" label="Notifications" />
          <SD /><SR icon="🎨" label="Appearance" value="Light" />
          <SD /><SR icon="💜" label="Care Point Prefs" />
          <SD /><SR icon="🔒" label="Account & Security" />
        </div>
        <SH label="Family Management" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="👨‍👩‍👧" label="Family Members" badge={4} />
          <SD /><SR icon="➕" label="Invite Members" />
          <SD /><SR icon="🔑" label="Invite Code / QR" />
          <SD /><SR icon="👑" label="Manage Roles" />
          <SD /><SR icon="⚡" label="Permissions" />
          <SD /><SR icon="📱" label="Linked Devices" value="3" />
        </div>
        <SH label="Subscription & Billing" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="⭐" label="Current Plan" value="Pro" />
          <SD /><SR icon="💳" label="Payment" value="••4291" />
          <SD /><SR icon="📋" label="Billing History" />
        </div>
        <SH label="AI & Storage" />
        <MiniBar label="AI Usage" pct={72} color="bg-violet-50" />
        <MiniBar label="Voice AI" pct={45} color="bg-blue-50" />
        <MiniBar label="Storage" pct={60} color="bg-amber-50" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="🤖" label="AI Analytics" />
          <SD /><SR icon="💾" label="Storage Usage" />
          <SD /><SR icon="🛒" label="Buy More Storage" />
        </div>
        <SH label="Support" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="❓" label="Help & Support" />
          <SD /><SR icon="📄" label="Terms & Privacy" />
        </div>
        <div className="mx-2 my-1 rounded-lg overflow-hidden border border-red-100">
          <SR icon="🚪" label="Log Out" danger />
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function OrganizerSettingsScreen() {
  return (
    <div className="flex flex-col" style={{ minHeight: 290 }}>
      <div className="bg-white px-2 py-1 flex items-center border-b border-gray-100">
        <p className="text-[9px] font-black text-gray-900">Profile</p>
      </div>
      <div className="flex-1">
        <ProfileHeader name="James" role="Organizer" tasks={38} lists={4} events={2} />
        <SH label="Personal" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="✏️" label="Edit Profile" />
          <SD /><SR icon="🔔" label="Notifications" />
          <SD /><SR icon="🎨" label="Appearance" value="Dark" />
          <SD /><SR icon="💜" label="Care Point Prefs" />
          <SD /><SR icon="🔒" label="Account & Security" />
        </div>
        <SH label="Family Management" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="👨‍👩‍👧" label="Family Members" badge={4} />
          <SD /><SR icon="➕" label="Invite Members" />
          <SD /><SR icon="🔑" label="Invite Code / QR" />
        </div>
        <Locked label="Manage Roles — Owner only" />
        <Locked label="Permissions — Owner only" />
        <SH label="AI & Storage (Permitted)" />
        <div className="mx-2 mb-0.5 rounded-lg border border-green-100 bg-green-50 px-1.5 py-1 flex items-center gap-1">
          <span className="text-[7px]">✅</span>
          <p className="text-[6px] text-green-700 font-semibold">Permitted by Owner</p>
        </div>
        <MiniBar label="Storage" pct={60} color="bg-amber-50" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="💾" label="Storage Analytics" />
          <SD /><SR icon="🤖" label="AI Analytics" />
        </div>
        <Locked label="Billing & Subscription — Owner only" />
        <Locked label="Payment Method — Owner only" />
        <SH label="Support" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="❓" label="Help & Support" />
        </div>
        <div className="mx-2 my-1 rounded-lg overflow-hidden border border-red-100">
          <SR icon="🚪" label="Log Out" danger />
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function MemberSettingsScreen() {
  return (
    <div className="flex flex-col" style={{ minHeight: 290 }}>
      <div className="bg-white px-2 py-1 flex items-center border-b border-gray-100">
        <p className="text-[9px] font-black text-gray-900">Profile</p>
      </div>
      <div className="flex-1">
        <ProfileHeader name="Stella" role="Member" tasks={14} lists={2} events={1} />
        <SH label="Personal" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="✏️" label="Edit Profile" />
          <SD /><SR icon="🔔" label="Notifications" />
          <SD /><SR icon="🎨" label="Appearance" value="Light" />
          <SD /><SR icon="💜" label="Care Point Prefs" />
          <SD /><SR icon="🔒" label="Account & Security" />
          <SD /><SR icon="🛡️" label="Privacy Controls" />
        </div>
        <SH label="Family & Organizer Sections" />
        <Locked label="Family Members — Organizer only" />
        <Locked label="Invite Members — Organizer only" />
        <Locked label="Manage Roles — Owner only" />
        <Locked label="Billing — Owner only" />
        <Locked label="AI Analytics — Organizer/Owner" />
        <Locked label="Storage Analytics — Organizer/Owner" />
        <SH label="Support" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="❓" label="Help & Support" />
          <SD /><SR icon="📄" label="Terms & Privacy" />
        </div>
        <div className="mx-2 my-1 rounded-lg overflow-hidden border border-red-100">
          <SR icon="🚪" label="Log Out" danger />
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FLOW SCREENS
// ═══════════════════════════════════════════════════════════════════════════════

function TopBar({ title }: { title: string }) {
  return (
    <div className="bg-white flex items-center gap-1 px-2 py-1.5 border-b border-gray-100">
      <span className="text-[8px] text-violet-600 font-bold">‹</span>
      <p className="text-[8.5px] font-black text-gray-900">{title}</p>
    </div>
  );
}

function InputField({ label, value, placeholder }: { label: string; value?: string; placeholder?: string }) {
  return (
    <div className="px-2 py-1">
      <p className="text-[5.5px] text-gray-400 mb-0.5 font-medium uppercase tracking-wider">{label}</p>
      <div className="bg-gray-100 rounded-lg px-1.5 py-1">
        <p className={`text-[7px] ${value ? 'text-gray-800 font-medium' : 'text-gray-300'}`}>{value || placeholder}</p>
      </div>
    </div>
  );
}

function Toggle({ on, label }: { on?: boolean; label: string }) {
  return (
    <div className="flex items-center px-2 py-[4.5px] bg-white">
      <span className="text-[7px] text-gray-700 flex-1 leading-tight">{label}</span>
      <div className={`w-7 h-4 rounded-full relative shrink-0 ${on ? 'bg-violet-500' : 'bg-gray-200'}`}>
        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all ${on ? 'right-0.5' : 'left-0.5'}`} />
      </div>
    </div>
  );
}

// ── Flow Screen content nodes ─────────────────────────────────────────────────

function S_EditProfileForm() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Edit Profile" />
      <div className="flex flex-col items-center py-2 bg-white border-b border-gray-100">
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow">
            <span className="text-xl font-black text-white">N</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-violet-600 border border-white flex items-center justify-center">
            <span className="text-[7px] text-white">📷</span>
          </div>
        </div>
        <p className="text-[7px] text-violet-600 font-semibold mt-1">Change Photo</p>
      </div>
      <InputField label="Full Name" value="Natasha Thaikaattu" />
      <SD /><InputField label="Display Name" value="Natasha" />
      <SD /><InputField label="Phone" value="+91 98765 43210" />
      <SD /><InputField label="Email" value="natasha@email.com" />
      <SD /><InputField label="Bio" placeholder="Add a short bio..." />
      <div className="px-2 pt-1.5 pb-1">
        <div className="bg-violet-600 rounded-xl text-center py-1.5">
          <span className="text-[7.5px] font-bold text-white">Save Changes</span>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function S_AccountSecurity() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Account & Security" />
      <div className="flex-1">
        <SH label="Authentication" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="📱" label="Phone" value="+91 ••4210" />
          <SD /><SR icon="🔑" label="Change Password" />
          <SD /><SR icon="👁️" label="Biometric Login" value="Face ID" />
          <SD /><SR icon="🛡️" label="Two-Factor Auth" sub="Extra login security" />
        </div>
        <SH label="Sessions" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="📱" label="Active Sessions" badge={3} />
          <SD /><SR icon="🔓" label="Sign Out All Devices" danger />
        </div>
        <SH label="Danger Zone" />
        <div className="mx-2 rounded-lg overflow-hidden border border-red-100">
          <SR icon="⚠️" label="Delete Account" danger />
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function S_Notifications() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Notifications" />
      <div className="flex-1">
        <SH label="Family Alerts" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <Toggle on label="Task Assigned to Me" />
          <SD /><Toggle on label="Task Completed" />
          <SD /><Toggle label="Task Overdue" />
          <SD /><Toggle on label="New Member Joined" />
        </div>
        <SH label="Reminders" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <Toggle on label="Document Expiry Alerts" />
          <SD /><Toggle on label="Upcoming Events (1 day)" />
          <SD /><Toggle label="Budget Limit Reached" />
        </div>
        <SH label="AI Nudges" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <Toggle on label="AI Suggestions" />
          <SD /><Toggle on label="Weekly CP Summary" />
        </div>
        <SH label="Quiet Hours" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="🌙" label="Do Not Disturb" value="10PM–7AM" />
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function S_FamilyMembers() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Family Members" />
      <div className="flex-1">
        <div className="mx-2 mt-1.5 bg-violet-50 rounded-lg px-1.5 py-1 flex items-center gap-1 border border-violet-100">
          <span className="text-[8px]">👨‍👩‍👧‍👦</span>
          <span className="text-[6.5px] font-semibold text-violet-700">Thaikaattu Family · 4 members</span>
        </div>
        <SH label="Members" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          {[
            { n: 'Natasha', r: 'Owner', c: 'bg-violet-500', dot: true },
            { n: 'James', r: 'Organizer', c: 'bg-blue-500', dot: true },
            { n: 'Stella', r: 'Member', c: 'bg-pink-400', dot: false },
            { n: 'Oliver', r: 'Child', c: 'bg-amber-400', dot: false },
          ].map((m, i) => (
            <div key={m.n}>
              {i > 0 && <SD />}
              <div className="flex items-center gap-1.5 px-2 py-[4.5px] bg-white">
                <div className="relative">
                  <div className={`w-6 h-6 rounded-lg ${m.c} flex items-center justify-center`}>
                    <span className="text-[8px] font-black text-white">{m.n[0]}</span>
                  </div>
                  {m.dot && <div className="absolute -bottom-px -right-px w-1.5 h-1.5 rounded-full bg-green-400 border border-white" />}
                </div>
                <div className="flex-1">
                  <p className="text-[7px] font-semibold text-gray-800">{m.n}</p>
                  <p className="text-[5.5px] text-gray-400">{m.r}</p>
                </div>
                <span className="text-[9px] text-gray-300">›</span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-2 pt-1.5 flex gap-1.5">
          <div className="flex-1 bg-violet-600 rounded-xl text-center py-1">
            <span className="text-[6.5px] font-bold text-white">➕ Invite</span>
          </div>
          <div className="flex-1 bg-gray-100 rounded-xl text-center py-1">
            <span className="text-[6.5px] font-semibold text-gray-600">📋 Code</span>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function S_ManageRoles() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Roles & Permissions" />
      <div className="flex-1">
        <div className="mx-2 mt-1 bg-amber-50 rounded-lg px-1.5 py-1 border border-amber-100 flex items-center gap-1">
          <span className="text-[8px]">⚡</span>
          <p className="text-[6px] text-amber-700 font-semibold">Changes apply immediately</p>
        </div>
        <SH label="Organizer Permissions (James)" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <Toggle on label="Can Invite Members" />
          <SD /><Toggle on label="Can Manage Tasks" />
          <SD /><Toggle on label="View Storage Analytics" />
          <SD /><Toggle on label="View AI Analytics" />
          <SD /><Toggle label="Manage Payment Methods" />
          <SD /><Toggle label="View Billing History" />
        </div>
        <SH label="Roles" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          {[
            { n: 'James', r: 'Organizer', c: 'bg-blue-500' },
            { n: 'Stella', r: 'Member', c: 'bg-pink-400' },
            { n: 'Oliver', r: 'Child', c: 'bg-amber-400' },
          ].map((m, i) => (
            <div key={m.n}>
              {i > 0 && <SD />}
              <div className="flex items-center gap-1.5 px-2 py-[4.5px] bg-white">
                <div className={`w-5 h-5 rounded-md ${m.c} flex items-center justify-center`}>
                  <span className="text-[7px] font-black text-white">{m.n[0]}</span>
                </div>
                <p className="text-[7px] font-semibold text-gray-800 flex-1">{m.n}</p>
                <div className="bg-gray-100 rounded-md px-1.5 py-0.5">
                  <p className="text-[6px] text-gray-600 font-medium">{m.r}</p>
                </div>
                <span className="text-[9px] text-gray-300 ml-1">›</span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-2 pt-1.5 pb-1">
          <div className="bg-violet-600 rounded-xl text-center py-1">
            <span className="text-[7px] font-bold text-white">Save Permissions</span>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function S_InviteCode() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Invite Code" />
      <div className="flex-1 flex flex-col items-center py-2 gap-1.5 bg-gray-50">
        {/* QR */}
        <div className="bg-white rounded-xl shadow-sm p-2 border border-gray-100">
          <div className="w-16 h-16 rounded-lg bg-gray-900 grid grid-cols-5 gap-px p-1">
            {Array(25).fill(0).map((_, i) => (
              <div key={i} className={`rounded-sm ${[0,1,2,5,10,12,14,20,22,23,24,6,7,11,13,17,18,19].includes(i) ? 'bg-white' : 'bg-gray-900'}`} />
            ))}
          </div>
        </div>
        <div className="bg-violet-600 rounded-xl px-4 py-1.5 shadow-sm">
          <p className="text-[6px] text-violet-200 text-center font-medium mb-0.5">Family Code</p>
          <p className="text-[14px] font-black text-white tracking-[0.2em]">THKTU7</p>
        </div>
        <p className="text-[6.5px] text-gray-500 text-center px-3 leading-relaxed">
          Share with family to join instantly
        </p>
        <div className="flex gap-1.5 px-3 w-full">
          <div className="flex-1 bg-white rounded-xl border border-gray-200 text-center py-1">
            <span className="text-[6.5px] font-semibold text-gray-600">📋 Copy</span>
          </div>
          <div className="flex-1 bg-violet-600 rounded-xl text-center py-1">
            <span className="text-[6.5px] font-bold text-white">📤 Share</span>
          </div>
        </div>
        <div className="mx-3 bg-amber-50 rounded-lg border border-amber-100 px-1.5 py-1 w-full">
          <p className="text-[6px] text-amber-700">⚠️ Regenerate resets code — old links stop working</p>
        </div>
        <div className="w-full px-3">
          <div className="bg-gray-100 rounded-xl text-center py-1">
            <span className="text-[6.5px] font-semibold text-gray-500">🔄 Regenerate Code</span>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function S_Subscription() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Subscription & Billing" />
      <div className="flex-1">
        <div className="mx-2 mt-1.5 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl p-2.5 shadow">
          <p className="text-[6px] text-violet-300 uppercase tracking-wider font-semibold">Current Plan</p>
          <p className="text-[12px] font-black text-white mt-0.5">Family Pro ⭐</p>
          <p className="text-[6px] text-violet-200 mt-0.5">Up to 6 members · AI · 10 GB storage</p>
          <div className="flex items-center justify-between mt-1.5">
            <p className="text-[9px] font-black text-white">₹499<span className="text-[6px] text-violet-300">/mo</span></p>
            <div className="bg-white/20 rounded-md px-1.5 py-0.5">
              <p className="text-[6px] text-white font-semibold">Renews Jun 15</p>
            </div>
          </div>
        </div>
        <SH label="Manage" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="🚀" label="Upgrade to Family Max" sub="More members · Priority AI" />
          <SD /><SR icon="📋" label="Billing History" />
          <SD /><SR icon="⏸️" label="Pause Subscription" />
          <SD /><SR icon="❌" label="Cancel Plan" danger />
        </div>
        <SH label="Payment" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="💳" label="Visa ending ••4291" value="Default" />
          <SD /><SR icon="➕" label="Add Payment Method" />
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function S_AIUsage() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="AI Usage Analytics" />
      <div className="flex-1">
        {/* Circular meters row */}
        <div className="bg-white border-b border-gray-100 px-2 py-2 flex justify-around">
          {[
            { label: 'AI Usage', pct: 72, color: '#7c3aed' },
            { label: 'Voice AI', pct: 45, color: '#3b82f6' },
            { label: 'Storage', pct: 60, color: '#f59e0b' },
          ].map((m) => {
            const r = 13; const c = 2 * Math.PI * r;
            return (
              <div key={m.label} className="flex flex-col items-center gap-0.5">
                <div className="relative" style={{ width: 34, height: 34 }}>
                  <svg width={34} height={34} className="-rotate-90">
                    <circle cx={17} cy={17} r={r} fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle cx={17} cy={17} r={r} fill="none" stroke={m.color} strokeWidth="3"
                      strokeDasharray={c} strokeDashoffset={c - (m.pct / 100) * c} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-[7px] font-black text-gray-800">{m.pct}%</p>
                  </div>
                </div>
                <p className="text-[5.5px] text-gray-500 font-medium">{m.label}</p>
              </div>
            );
          })}
        </div>
        <div className="mx-2 mt-1 bg-amber-50 rounded-lg border border-amber-100 px-1.5 py-1 flex gap-1 items-start">
          <span className="text-[8px]">⚠️</span>
          <p className="text-[6px] text-amber-700">72% of monthly AI limit used — ~8 days remaining</p>
        </div>
        <SH label="Monthly Breakdown" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          {[
            { label: 'AI Chat & Suggestions', pct: 72, color: 'bg-violet-500' },
            { label: 'Document AI Analysis', pct: 46, color: 'bg-purple-400' },
            { label: 'Task AI Planning', pct: 57, color: 'bg-indigo-400' },
          ].map((item, i) => (
            <div key={item.label}>
              {i > 0 && <SD />}
              <div className="px-2 py-1.5">
                <p className="text-[6.5px] font-semibold text-gray-700 mb-0.5">{item.label}</p>
                <div className="bg-gray-100 rounded-full h-1.5">
                  <div className={`${item.color} rounded-full h-1.5`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-2 mt-1 bg-gradient-to-r from-violet-600 to-purple-700 rounded-xl p-2">
          <p className="text-[7px] font-black text-white mb-0.5">Need more AI?</p>
          <p className="text-[5.5px] text-violet-200 mb-1">Upgrade to Family Max for unlimited AI</p>
          <div className="bg-white/20 rounded-md px-1.5 py-0.5 inline-block">
            <p className="text-[6px] font-bold text-white">Upgrade Plan →</p>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function S_StorageUsage() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Storage Usage" />
      <div className="flex-1">
        <div className="mx-2 mt-1.5 bg-white rounded-xl border border-gray-100 p-2">
          <div className="flex items-center gap-2">
            {/* Circular */}
            <div className="relative shrink-0" style={{ width: 44, height: 44 }}>
              <svg width={44} height={44} className="-rotate-90">
                <circle cx={22} cy={22} r={17} fill="none" stroke="#e5e7eb" strokeWidth="4" />
                <circle cx={22} cy={22} r={17} fill="none" stroke="#f59e0b" strokeWidth="4"
                  strokeDasharray={2 * Math.PI * 17} strokeDashoffset={2 * Math.PI * 17 * 0.4} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[7px] font-black text-gray-800">60%</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[7px] font-black text-gray-900 mb-1">6 GB of 10 GB used</p>
              {[
                { type: 'Documents', size: '3.2 GB', color: 'bg-blue-400' },
                { type: 'Photos', size: '1.8 GB', color: 'bg-pink-400' },
                { type: 'Voice', size: '0.7 GB', color: 'bg-purple-400' },
                { type: 'Other', size: '0.3 GB', color: 'bg-gray-300' },
              ].map((s) => (
                <div key={s.type} className="flex items-center gap-1 mb-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${s.color} shrink-0`} />
                  <p className="text-[6px] text-gray-600 flex-1">{s.type}</p>
                  <p className="text-[6px] font-semibold text-gray-700">{s.size}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <SH label="By Member" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          {[
            { n: 'Natasha', s: '2.8 GB', pct: 47, c: 'bg-violet-500' },
            { n: 'James', s: '1.9 GB', pct: 32, c: 'bg-blue-400' },
            { n: 'Stella', s: '0.9 GB', pct: 15, c: 'bg-pink-400' },
            { n: 'Oliver', s: '0.4 GB', pct: 6, c: 'bg-amber-400' },
          ].map((m, i) => (
            <div key={m.n}>
              {i > 0 && <SD />}
              <div className="flex items-center gap-1.5 px-2 py-1">
                <div className={`w-4 h-4 rounded-full ${m.c} flex items-center justify-center shrink-0`}>
                  <span className="text-[6px] font-black text-white">{m.n[0]}</span>
                </div>
                <p className="text-[6.5px] font-medium text-gray-700 w-9">{m.n}</p>
                <div className="flex-1 bg-gray-100 rounded-full h-1">
                  <div className={`${m.c} rounded-full h-1`} style={{ width: `${m.pct}%` }} />
                </div>
                <p className="text-[6px] text-gray-500 ml-1 shrink-0">{m.s}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-2 pt-1.5 flex gap-1">
          <div className="flex-1 bg-amber-500 rounded-xl text-center py-1">
            <span className="text-[6.5px] font-bold text-white">🛒 Buy More</span>
          </div>
          <div className="flex-1 bg-gray-100 rounded-xl text-center py-1">
            <span className="text-[6.5px] font-semibold text-gray-600">🗑️ Free Space</span>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Care Point Preferences screens ───────────────────────────────────────────

function CPSlider({ category, left, right, pct, color }: {
  category: string; left: string; right: string; pct: number; color: string;
}) {
  return (
    <div className="px-2 py-1.5 border-b border-gray-50 last:border-0">
      <p className="text-[6.5px] font-semibold text-gray-700 mb-1">{category}</p>
      <div className="relative">
        <div className="bg-gray-100 rounded-full h-2">
          <div className={`${color} rounded-full h-2`} style={{ width: `${pct}%` }} />
        </div>
        <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${color} border-2 border-white shadow`}
          style={{ left: `calc(${pct}% - 6px)` }} />
      </div>
      <div className="flex justify-between mt-0.5">
        <p className="text-[5.5px] text-gray-400">{left}</p>
        <p className="text-[5.5px] text-gray-400">{right}</p>
      </div>
    </div>
  );
}

function S_CPEntry() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <div className="bg-white px-2 py-1 border-b border-gray-100">
        <p className="text-[9px] font-black text-gray-900">Profile</p>
      </div>
      <div className="flex-1">
        <SH label="Personal" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="✏️" label="Edit Profile" />
          <SD />
          <div className="flex items-center gap-1.5 px-2 py-[4.5px] bg-violet-50">
            <div className="w-[18px] h-[18px] rounded-[5px] bg-violet-100 flex items-center justify-center shrink-0">
              <span className="text-[8px]">💜</span>
            </div>
            <div className="flex-1">
              <p className="text-[7px] font-semibold text-violet-700 leading-none">Care Point Prefs</p>
              <p className="text-[5.5px] text-violet-400 mt-0.5">Update your preferences</p>
            </div>
            <span className="text-[9px] text-violet-400">›</span>
          </div>
          <SD />
          <SR icon="🔔" label="Notifications" />
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function S_CPOverview() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Care Point Prefs" />
      <div className="flex-1">
        <div className="mx-2 mt-1 bg-violet-50 rounded-lg border border-violet-100 px-1.5 py-1 flex gap-1">
          <span className="text-[8px] shrink-0">🤖</span>
          <p className="text-[6px] text-violet-700 leading-relaxed">Liv uses these to balance tasks and care points fairly. Answers are personal and private.</p>
        </div>
        <SH label="Your Categories" />
        <div className="mx-2 space-y-1">
          {[
            { e: '🚗', n: 'Driving', f: 75, s: 85 },
            { e: '🧹', n: 'Cleaning', f: 40, s: 70 },
            { e: '🍳', n: 'Cooking', f: 80, s: 90 },
            { e: '🛒', n: 'Shopping', f: 55, s: 75 },
            { e: '📅', n: 'Planning', f: 65, s: 60 },
            { e: '👶', n: 'Child Care', f: 85, s: 80 },
          ].map((c) => (
            <div key={c.n} className="bg-white rounded-lg border border-gray-100 px-1.5 py-1 flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                <span className="text-[10px]">{c.e}</span>
              </div>
              <div className="flex-1">
                <p className="text-[7px] font-bold text-gray-800">{c.n}</p>
                <div className="flex gap-1.5 mt-0.5">
                  <div className="flex-1">
                    <p className="text-[5px] text-gray-400">Feeling</p>
                    <div className="bg-gray-100 rounded-full h-1">
                      <div className="bg-pink-400 rounded-full h-1" style={{ width: `${c.f}%` }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[5px] text-gray-400">Skill</p>
                    <div className="bg-gray-100 rounded-full h-1">
                      <div className="bg-violet-400 rounded-full h-1" style={{ width: `${c.s}%` }} />
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-[9px] text-gray-300">›</span>
            </div>
          ))}
        </div>
        <div className="mx-2 mt-1">
          <div className="rounded-lg border-2 border-dashed border-violet-200 px-2 py-1 flex items-center gap-1">
            <span className="text-[9px] text-violet-500">➕</span>
            <p className="text-[7px] font-semibold text-violet-600">Add Custom Category</p>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function S_CPEditor() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Cooking Preferences" />
      <div className="flex-1">
        <div className="bg-white border-b border-gray-100 px-2 py-1.5 flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <span className="text-[16px]">🍳</span>
          </div>
          <div>
            <p className="text-[8.5px] font-black text-gray-900">Cooking</p>
            <p className="text-[6px] text-gray-400">Update your cooking preferences</p>
          </div>
        </div>
        <div className="mx-2 mt-1.5 bg-white rounded-lg border border-gray-100">
          <div className="px-2 py-1.5 border-b border-gray-50">
            <p className="text-[7px] font-bold text-gray-700 mb-1">How much do you enjoy cooking?</p>
            <CPSlider category="" left="😫 Avoiding" right="😍 Loving" pct={80} color="bg-pink-400" />
          </div>
          <div className="px-2 py-1.5">
            <p className="text-[7px] font-bold text-gray-700 mb-1">How confident are you?</p>
            <CPSlider category="" left="📚 Learning" right="⭐ Confident" pct={90} color="bg-violet-500" />
          </div>
        </div>
        <SH label="How Often?" />
        <div className="mx-2 flex gap-1">
          {['Daily', '3–4x/wk', 'Rarely'].map((f, i) => (
            <div key={f} className={`flex-1 rounded-lg border-2 text-center py-1 text-[6.5px] font-bold ${
              i === 0 ? 'border-violet-500 text-violet-700 bg-violet-50' : 'border-gray-100 text-gray-400'
            }`}>{f}</div>
          ))}
        </div>
        <SH label="How does it make you feel?" />
        <div className="mx-2 flex gap-1">
          {[['😩', 'Drained'], ['😐', 'Neutral'], ['😊', 'Happy'], ['🤩', 'Energized']].map(([e, t], i) => (
            <div key={t} className={`flex-1 rounded-lg border-2 flex flex-col items-center gap-0.5 py-1 ${
              i === 2 ? 'border-violet-500 bg-violet-50' : 'border-gray-100'
            }`}>
              <span className="text-[10px]">{e}</span>
              <p className={`text-[5px] font-semibold text-center leading-tight ${i === 2 ? 'text-violet-700' : 'text-gray-400'}`}>{t}</p>
            </div>
          ))}
        </div>
        <div className="px-2 pt-1.5 pb-1 flex gap-1">
          <div className="flex-1 rounded-xl border border-gray-200 text-center py-1">
            <span className="text-[7px] font-semibold text-gray-500">← Prev</span>
          </div>
          <div className="flex-1 rounded-xl bg-violet-600 text-center py-1">
            <span className="text-[7px] font-bold text-white">Next →</span>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function S_CPSaved() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Care Point Prefs" />
      <div className="flex-1 flex flex-col items-center justify-center px-3 gap-2 bg-gray-50">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-2xl">✅</span>
        </div>
        <div className="text-center">
          <p className="text-[9px] font-black text-gray-900">Preferences Saved!</p>
          <p className="text-[7px] text-gray-500 mt-1 leading-relaxed">Liv will use your updates to better balance tasks and care points</p>
        </div>
        <div className="bg-white rounded-xl border border-violet-100 p-2 w-full">
          <p className="text-[6.5px] font-bold text-gray-700 mb-1">What changes:</p>
          {[
            ['🍳', 'Cooking tasks may be assigned more often'],
            ['🧹', 'Cleaning balanced across family'],
            ['🤖', 'AI suggestions updated'],
          ].map(([e, t]) => (
            <div key={String(t)} className="flex items-center gap-1 mb-0.5">
              <span className="text-[8px]">{e}</span>
              <p className="text-[6px] text-gray-600">{t}</p>
            </div>
          ))}
        </div>
        <div className="w-full bg-violet-600 rounded-xl text-center py-1">
          <span className="text-[7.5px] font-bold text-white">Done</span>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Appearance & Theme ────────────────────────────────────────────────────────
function S_Appearance() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Appearance & Theme" />
      <div className="flex-1 overflow-y-auto bg-[#f8f7ff]">
        <SH label="Theme" />
        <div className="mx-2 flex gap-1.5">
          {[
            { label: 'Light', bg: 'bg-white', active: true },
            { label: 'Dark', bg: 'bg-gray-900', active: false },
            { label: 'System', bg: 'bg-gradient-to-br from-white to-gray-800', active: false },
          ].map((t) => (
            <div key={t.label} className={`flex-1 rounded-xl border-2 p-1.5 flex flex-col items-center gap-0.5 ${t.active ? 'border-violet-500' : 'border-gray-200'}`}>
              <div className={`w-7 h-5 rounded-md ${t.bg} border border-gray-200`} />
              <p className="text-[6.5px] font-semibold text-gray-600">{t.label}</p>
              {t.active && <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />}
            </div>
          ))}
        </div>
        <SH label="Accent Color" />
        <div className="mx-2 flex gap-1.5 flex-wrap">
          {['bg-violet-500', 'bg-blue-500', 'bg-pink-500', 'bg-green-500', 'bg-amber-500', 'bg-red-500'].map((c) => (
            <div key={c} className={`w-6 h-6 rounded-full ${c} ${c === 'bg-violet-500' ? 'ring-2 ring-offset-1 ring-violet-500' : ''}`} />
          ))}
        </div>
        <SH label="Text Size" />
        <div className="mx-2 bg-white rounded-xl border border-gray-100 px-2 py-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[6.5px] text-gray-400">A</span>
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div className="bg-violet-500 rounded-full h-1.5 w-2/5" />
            </div>
            <span className="text-[10px] text-gray-600 font-bold">A</span>
          </div>
          <p className="text-[5.5px] text-gray-400 mt-1 text-center">Default size</p>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Invite Member ─────────────────────────────────────────────────────────────
function S_InviteMember() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Invite Member" />
      <div className="flex-1 overflow-y-auto bg-[#f8f7ff]">
        <div className="px-2 pt-2">
          <div className="bg-white rounded-xl p-1.5 border border-gray-100 mb-1.5">
            <p className="text-[6px] text-gray-500 mb-1 font-medium">Send via phone number</p>
            <div className="flex gap-1">
              <div className="flex-1 bg-gray-100 rounded-lg px-1.5 py-1">
                <p className="text-[6.5px] text-gray-400">+91 Enter number...</p>
              </div>
              <div className="bg-violet-600 rounded-lg px-1.5 py-1 flex items-center">
                <span className="text-[6px] font-bold text-white">Send</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-1.5 border border-gray-100 mb-1.5">
            <p className="text-[6px] text-gray-500 mb-1 font-medium">Or share invite link</p>
            <div className="bg-violet-50 rounded-lg px-1.5 py-1 border border-violet-100">
              <p className="text-[5.5px] text-violet-700 font-mono">famant.app/join/THKTU7</p>
            </div>
            <div className="flex gap-1 mt-1">
              {['📋 Copy', '📤 Share', '📸 QR'].map((a) => (
                <div key={a} className="flex-1 bg-gray-100 rounded-md py-0.5 text-center">
                  <span className="text-[5.5px] font-medium text-gray-600">{a}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[6px] text-gray-400 font-medium px-0.5 mb-1">Assign role on join:</p>
          <div className="flex gap-1">
            {['Organizer', 'Member', 'Child'].map((r) => (
              <div key={r} className={`flex-1 rounded-xl border-2 text-center py-0.5 text-[6.5px] font-bold ${r === 'Member' ? 'border-violet-500 text-violet-700 bg-violet-50' : 'border-gray-200 text-gray-400'}`}>{r}</div>
            ))}
          </div>
        </div>
        <SH label="Pending Invites" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100 bg-white">
          <div className="flex items-center gap-1.5 px-2 py-[4.5px]">
            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-[7px]">⏳</span>
            </div>
            <div className="flex-1">
              <p className="text-[7px] font-semibold text-gray-700">+91 88765 00123</p>
              <p className="text-[5.5px] text-gray-400">Sent 2h ago · Member</p>
            </div>
            <span className="text-[5.5px] text-red-400 font-semibold">Revoke</span>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Payment Method ────────────────────────────────────────────────────────────
function S_PaymentMethod() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Payment Methods" />
      <div className="flex-1 overflow-y-auto bg-[#f8f7ff]">
        <div className="mx-2 mt-1.5 space-y-1.5">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-2.5 shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[7px] font-semibold text-gray-300">VISA</p>
              <div className="w-3.5 h-3.5 rounded-full bg-green-400 flex items-center justify-center">
                <span className="text-[5px] text-white">✓</span>
              </div>
            </div>
            <p className="text-[8px] font-mono text-white tracking-widest">•••• •••• •••• 4291</p>
            <div className="flex justify-between mt-1.5">
              <p className="text-[6px] text-gray-400">Expires 12/27</p>
              <p className="text-[6px] text-green-400 font-semibold">Default</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border-2 border-dashed border-violet-200 p-2 flex flex-col items-center gap-0.5">
            <span className="text-base">💳</span>
            <p className="text-[7px] font-semibold text-violet-600">Add New Card</p>
            <p className="text-[5.5px] text-gray-400">UPI · Net Banking · Debit/Credit</p>
          </div>
        </div>
        <SH label="Other Methods" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="🏦" label="UPI / Net Banking" />
          <SD /><SR icon="💰" label="Famant Wallet" value="₹0" />
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Linked Devices ────────────────────────────────────────────────────────────
function S_LinkedDevices() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Linked Devices" />
      <div className="flex-1">
        <SH label="Active Devices" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          {[
            { icon: '📱', name: 'iPhone 15 Pro', info: 'Last active now', active: true },
            { icon: '💻', name: 'MacBook Pro', info: 'Last active 2h ago', active: false },
            { icon: '📱', name: 'iPad Air', info: 'Last active yesterday', active: false },
          ].map((d, i) => (
            <div key={d.name}>
              {i > 0 && <SD />}
              <div className="flex items-center gap-1.5 px-2 py-[4.5px] bg-white">
                <div className="w-5 h-5 rounded-md bg-gray-100 flex items-center justify-center">
                  <span className="text-[9px]">{d.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[7px] font-semibold text-gray-800">{d.name}</p>
                  <p className="text-[5.5px] text-gray-400">{d.info}</p>
                </div>
                {d.active
                  ? <span className="text-[5.5px] font-bold text-green-500 bg-green-50 px-1 py-0.5 rounded-full">This device</span>
                  : <span className="text-[5.5px] text-red-400 font-semibold">Remove</span>
                }
              </div>
            </div>
          ))}
        </div>
        <div className="px-2 pt-1.5">
          <div className="bg-red-50 rounded-xl border border-red-100 px-2 py-1 flex items-center gap-1">
            <span className="text-[8px]">⚠️</span>
            <span className="text-[6.5px] text-red-600 font-medium flex-1">Sign out all other devices</span>
            <span className="text-[8px] text-red-400">›</span>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Privacy Controls ──────────────────────────────────────────────────────────
function S_PrivacyControls() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Privacy Controls" />
      <div className="flex-1">
        <SH label="Visibility" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <Toggle on label="Show Profile to Family" />
          <SD /><Toggle on label="Show Online Status" />
          <SD /><Toggle label="Show Care Points" />
          <SD /><Toggle on label="Share Location for Events" />
        </div>
        <SH label="Data & AI" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <Toggle on label="Allow AI to Learn Preferences" />
          <SD /><Toggle label="Share Usage Data" />
          <SD /><Toggle on label="Personalized AI Suggestions" />
        </div>
        <SH label="Data Management" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="📦" label="Export My Data" />
          <SD /><SR icon="🗑️" label="Delete All Personal Data" danger />
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Help & Support ────────────────────────────────────────────────────────────
function S_HelpSupport() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Help & Support" />
      <div className="flex-1 overflow-y-auto bg-[#f8f7ff]">
        <div className="px-2 pt-1.5">
          <div className="bg-white rounded-lg border border-gray-100 px-2 py-1 flex items-center gap-1">
            <span className="text-[8px] text-gray-400">🔍</span>
            <p className="text-[7px] text-gray-300">Search help articles...</p>
          </div>
        </div>
        <SH label="Get Help" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="💬" label="Chat with Support" sub="Usually replies in 5 min" />
          <SD /><SR icon="📖" label="Help Center" sub="Browse all articles" />
          <SD /><SR icon="🎥" label="Video Tutorials" />
          <SD /><SR icon="🐛" label="Report a Bug" />
        </div>
        <SH label="Popular Topics" />
        <div className="mx-2 space-y-1 mb-2">
          {['Invite family members', 'Understanding Care Points', 'Manage subscriptions', 'AI chat tips'].map((t) => (
            <div key={t} className="bg-white rounded-lg border border-gray-100 px-1.5 py-1 flex items-center gap-1">
              <span className="text-[7px] text-violet-500">→</span>
              <p className="text-[7px] text-gray-700">{t}</p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Voice AI Usage ────────────────────────────────────────────────────────────
function S_VoiceAIUsage() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Voice AI Usage" />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-2 mt-1.5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-2 shadow">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-[10px]">🎤</span>
            </div>
            <div>
              <p className="text-[5.5px] text-blue-200 font-medium uppercase tracking-wider">Voice Assistant</p>
              <p className="text-[8px] font-black text-white">Monthly Usage</p>
            </div>
          </div>
          <div className="flex items-end justify-between mb-1">
            <div>
              <p className="text-[15px] font-black text-white leading-none">22.5</p>
              <p className="text-[5.5px] text-blue-300">of 50 minutes used</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-blue-100">45%</p>
              <p className="text-[5px] text-blue-300">this month</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-full h-1.5">
            <div className="bg-white rounded-full h-1.5" style={{ width: '45%' }} />
          </div>
          <p className="text-[5.5px] text-blue-300 mt-0.5">Resets Jun 15, 2026</p>
        </div>
        <SH label="Top Voice Commands" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          {[
            { cmd: '"Add task..."', count: '34 uses', pct: 68 },
            { cmd: '"What\'s today\'s tasks?"', count: '22 uses', pct: 44 },
            { cmd: '"Create shopping list"', count: '18 uses', pct: 36 },
            { cmd: '"Set reminder for..."', count: '12 uses', pct: 24 },
          ].map((c, i) => (
            <div key={i}>
              {i > 0 && <SD />}
              <div className="flex items-center gap-1.5 px-2 py-1.5">
                <div className="flex-1">
                  <p className="text-[6.5px] font-medium text-gray-700 italic">{c.cmd}</p>
                  <div className="bg-gray-100 rounded-full h-1 mt-0.5">
                    <div className="bg-blue-400 rounded-full h-1" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
                <p className="text-[6px] text-gray-400 shrink-0">{c.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Buy More Storage ──────────────────────────────────────────────────────────
function S_BuyStorage() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Buy Storage" />
      <div className="flex-1 overflow-y-auto bg-[#f8f7ff]">
        <SH label="Choose a Plan" />
        {[
          { size: '+5 GB', price: '₹49/mo', desc: 'Small families', popular: false },
          { size: '+20 GB', price: '₹149/mo', desc: 'Most popular', popular: true },
          { size: '+50 GB', price: '₹349/mo', desc: 'Large families', popular: false },
        ].map((plan) => (
          <div key={plan.size} className={`mx-2 mb-1 rounded-xl border-2 p-2 ${plan.popular ? 'border-violet-500 bg-violet-50' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-[9px] font-black text-gray-900">{plan.size}</p>
                  {plan.popular && <span className="text-[5px] font-bold bg-violet-600 text-white px-1 py-0.5 rounded-full">Popular</span>}
                </div>
                <p className="text-[5.5px] text-gray-500">{plan.desc}</p>
              </div>
              <p className="text-[9px] font-black text-gray-900">{plan.price}</p>
            </div>
            <div className={`mt-1 w-full rounded-lg text-center py-0.5 text-[6.5px] font-bold ${plan.popular ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
              {plan.popular ? '⭐ Select' : 'Select'}
            </div>
          </div>
        ))}
        <div className="mx-2 mb-1 rounded-xl border border-dashed border-gray-200 bg-white p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[8px] font-bold text-gray-700">+10 GB One-Time</p>
              <p className="text-[5.5px] text-gray-400">No subscription, yours forever</p>
            </div>
            <p className="text-[9px] font-black text-gray-900">₹299</p>
          </div>
          <div className="mt-1 bg-gray-100 rounded-lg text-center py-0.5 text-[6.5px] font-semibold text-gray-600">Buy Once</div>
        </div>
        <SH label="Payment" />
        <div className="mx-2 bg-white rounded-lg border border-gray-100 px-2 py-1 flex items-center gap-1.5 mb-1">
          <span className="text-[9px]">💳</span>
          <p className="text-[7px] font-medium text-gray-700">Visa ••4291</p>
          <span className="ml-auto text-[6.5px] text-violet-500 font-semibold">Change</span>
        </div>
        <div className="px-2 pb-2">
          <div className="bg-violet-600 rounded-xl text-center py-1 text-[7px] font-bold text-white">Confirm Purchase</div>
          <p className="text-[5.5px] text-gray-400 text-center mt-0.5">Cancel anytime · Billed monthly</p>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── All Sliders (Care Points bulk update) ─────────────────────────────────────
function S_AllSliders() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Update Preferences" />
      <div className="flex-1 overflow-y-auto">
        <div className="px-2 pt-1 pb-0.5">
          <div className="bg-violet-50 rounded-lg px-1.5 py-1 border border-violet-100">
            <p className="text-[6px] text-violet-700 font-semibold">Slide to update · saved values shown</p>
          </div>
        </div>
        <SH label="Enjoyment Level" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100 bg-white mb-1">
          {[
            { label: '🚗 Driving', pct: 75, color: 'bg-blue-400' },
            { label: '🧹 Cleaning', pct: 40, color: 'bg-blue-400' },
            { label: '🍳 Cooking', pct: 80, color: 'bg-pink-400' },
            { label: '🛒 Shopping', pct: 55, color: 'bg-amber-400' },
          ].map((s) => (
            <CPSlider key={s.label} category={s.label} left="Avoiding" right="Loving" pct={s.pct} color={s.color} />
          ))}
        </div>
        <SH label="Confidence Level" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100 bg-white mb-1">
          {[
            { label: '🚗 Driving', pct: 85 },
            { label: '🧹 Cleaning', pct: 70 },
            { label: '🍳 Cooking', pct: 90 },
          ].map((s) => (
            <CPSlider key={s.label} category={s.label} left="Learning" right="Confident" pct={s.pct} color="bg-violet-500" />
          ))}
        </div>
        <div className="px-2 pb-1">
          <div className="bg-violet-600 rounded-xl text-center py-1 text-[7px] font-bold text-white">Save All</div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FLOW ACCORDION DATA
// ═══════════════════════════════════════════════════════════════════════════════

const flowData = [
  {
    id: 'edit-profile', emoji: '✏️', title: 'Edit Profile',
    tag: 'Personal', tagColor: 'bg-violet-100 text-violet-700',
    desc: 'Tap "Edit" on profile header to update name, photo, bio, email and phone.',
    screens: [
      { label: 'Settings Home', node: <OwnerSettingsScreen /> },
      { label: 'Edit Profile Form', node: <S_EditProfileForm /> },
    ],
  },
  {
    id: 'account-security', emoji: '🔒', title: 'Account & Security',
    tag: 'Account', tagColor: 'bg-gray-100 text-gray-700',
    desc: 'Auth methods, biometric login, 2FA, active sessions and account deletion.',
    screens: [
      { label: 'Settings Home', node: <OwnerSettingsScreen /> },
      { label: 'Account & Security', node: <S_AccountSecurity /> },
    ],
  },
  {
    id: 'notifications', emoji: '🔔', title: 'Notification Preferences',
    tag: 'Personal', tagColor: 'bg-violet-100 text-violet-700',
    desc: 'Granular toggles for family alerts, reminders, AI nudges and quiet hours.',
    screens: [
      { label: 'Settings Home', node: <OwnerSettingsScreen /> },
      { label: 'Notification Prefs', node: <S_Notifications /> },
    ],
  },
  {
    id: 'family-members', emoji: '👨‍👩‍👧', title: 'Family Members',
    tag: 'Family', tagColor: 'bg-blue-100 text-blue-700',
    desc: 'View all members, their roles, online status, and tap to open individual profiles.',
    screens: [
      { label: 'Settings Home', node: <OwnerSettingsScreen /> },
      { label: 'Family Members', node: <S_FamilyMembers /> },
    ],
  },
  {
    id: 'roles', emoji: '👑', title: 'Manage Roles & Permissions',
    tag: 'Family', tagColor: 'bg-blue-100 text-blue-700',
    desc: 'Change member roles (Organizer / Member / Child) and set granular per-organizer permissions.',
    screens: [
      { label: 'Family Members', node: <S_FamilyMembers /> },
      { label: 'Roles & Permissions', node: <S_ManageRoles /> },
    ],
  },
  {
    id: 'invite-code', emoji: '🔑', title: 'Invite Code / QR Share',
    tag: 'Family', tagColor: 'bg-blue-100 text-blue-700',
    desc: 'Display and share 6-digit family code with scannable QR. Regenerate option included.',
    screens: [
      { label: 'Family Members', node: <S_FamilyMembers /> },
      { label: 'Invite Code + QR', node: <S_InviteCode /> },
    ],
  },
  {
    id: 'subscription', emoji: '⭐', title: 'Subscription & Billing',
    tag: 'Billing', tagColor: 'bg-amber-100 text-amber-700',
    desc: 'View current plan, renewal date, upgrade options, payment method. Owner only.',
    screens: [
      { label: 'Settings Home', node: <OwnerSettingsScreen /> },
      { label: 'Subscription', node: <S_Subscription /> },
    ],
  },
  {
    id: 'ai-usage', emoji: '🤖', title: 'AI Usage Analytics',
    tag: 'AI & Storage', tagColor: 'bg-indigo-100 text-indigo-700',
    desc: 'Circular usage meters, monthly feature breakdown, per-member distribution, upgrade CTA.',
    screens: [
      { label: 'Settings Home', node: <OwnerSettingsScreen /> },
      { label: 'AI Analytics', node: <S_AIUsage /> },
    ],
  },
  {
    id: 'storage', emoji: '💾', title: 'Storage Usage Analytics',
    tag: 'AI & Storage', tagColor: 'bg-indigo-100 text-indigo-700',
    desc: 'Storage breakdown by type (docs/photos/voice) and per-member, with Buy More CTA.',
    screens: [
      { label: 'Settings Home', node: <OwnerSettingsScreen /> },
      { label: 'Storage Usage', node: <S_StorageUsage /> },
    ],
  },
  {
    id: 'voice-ai', emoji: '🎤', title: 'Voice AI Usage',
    tag: 'AI & Storage', tagColor: 'bg-indigo-100 text-indigo-700',
    desc: 'Dedicated Voice AI screen with monthly minutes tracker and top voice commands breakdown.',
    screens: [
      { label: 'Settings Home', node: <OwnerSettingsScreen /> },
      { label: 'Voice AI Usage', node: <S_VoiceAIUsage /> },
    ],
  },
  {
    id: 'buy-storage', emoji: '🛒', title: 'Buy Additional Storage',
    tag: 'AI & Storage', tagColor: 'bg-indigo-100 text-indigo-700',
    desc: 'Storage purchase flow with monthly plans, one-time option, and existing payment method prefilled.',
    screens: [
      { label: 'Storage Usage', node: <S_StorageUsage /> },
      { label: 'Buy More Storage', node: <S_BuyStorage /> },
    ],
  },
  {
    id: 'appearance', emoji: '🎨', title: 'Appearance & Theme',
    tag: 'Personal', tagColor: 'bg-violet-100 text-violet-700',
    desc: 'Choose light/dark/system theme, accent color and text size for a personalized look.',
    screens: [
      { label: 'Settings Home', node: <OwnerSettingsScreen /> },
      { label: 'Appearance & Theme', node: <S_Appearance /> },
    ],
  },
  {
    id: 'invite-member', emoji: '➕', title: 'Invite Member',
    tag: 'Family', tagColor: 'bg-blue-100 text-blue-700',
    desc: 'Invite via phone number, share link, or QR code. Assign role and manage pending invites.',
    screens: [
      { label: 'Family Members', node: <S_FamilyMembers /> },
      { label: 'Invite Options', node: <S_InviteMember /> },
    ],
  },
  {
    id: 'payment-method', emoji: '💳', title: 'Payment Method',
    tag: 'Billing', tagColor: 'bg-amber-100 text-amber-700',
    desc: 'Manage saved cards, UPI, net banking, and Famant wallet. Add or remove payment methods.',
    screens: [
      { label: 'Subscription', node: <S_Subscription /> },
      { label: 'Payment Methods', node: <S_PaymentMethod /> },
    ],
  },
  {
    id: 'linked-devices', emoji: '📱', title: 'Linked Devices',
    tag: 'Account', tagColor: 'bg-gray-100 text-gray-700',
    desc: 'See all active sessions by device. Remove individual devices or sign out all.',
    screens: [
      { label: 'Settings Home', node: <OwnerSettingsScreen /> },
      { label: 'Linked Devices', node: <S_LinkedDevices /> },
    ],
  },
  {
    id: 'privacy-controls', emoji: '🛡️', title: 'Privacy Controls',
    tag: 'Account', tagColor: 'bg-gray-100 text-gray-700',
    desc: 'Control profile visibility, online status, AI learning preferences, and data export/deletion.',
    screens: [
      { label: 'Settings Home', node: <OwnerSettingsScreen /> },
      { label: 'Privacy Controls', node: <S_PrivacyControls /> },
    ],
  },
  {
    id: 'help-support', emoji: '❓', title: 'Help & Support',
    tag: 'Support', tagColor: 'bg-green-100 text-green-700',
    desc: 'Live chat, help center articles, video tutorials, and bug reporting. Searchable.',
    screens: [
      { label: 'Settings Home', node: <OwnerSettingsScreen /> },
      { label: 'Support Center', node: <S_HelpSupport /> },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ── 1. Overview Hub ───────────────────────────────────────────────────────────
export function SettingsOverview() {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Section 7 — Profile & Settings (👤 Profile Icon)
          </h2>
          <p className="text-sm text-gray-600 mb-4 max-w-2xl leading-relaxed">
            One unified settings system with role-based visibility. Owner sees billing, AI analytics,
            and full family controls. Organizer sees permitted sections. Member sees personal settings only.
            <strong> This is NOT three separate apps — it is the same screen with different content shown.</strong>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {[['3', 'Roles'], ['17', 'Flows'], ['40+', 'Screens']].map(([v, l]) => (
            <div key={l} className="bg-violet-50 border border-violet-100 rounded-xl px-3 py-1.5 text-center">
              <p className="text-lg font-black text-violet-700">{v}</p>
              <p className="text-[10px] text-violet-500">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {[
          {
            role: 'Owner', color: 'from-violet-600 to-purple-700', border: 'border-violet-200', bg: 'bg-violet-50',
            desc: 'Family creator · Subscription owner',
            perms: ['Full family control', 'Billing & payment', 'Subscription management', 'AI & storage analytics', 'Manage organizer permissions'],
          },
          {
            role: 'Organizer', color: 'from-blue-500 to-indigo-600', border: 'border-blue-200', bg: 'bg-blue-50',
            desc: 'Delegated by Owner',
            perms: ['Manage members', 'Invite members', 'Analytics if permitted', 'Personal settings'],
          },
          {
            role: 'Member', color: 'from-gray-500 to-gray-600', border: 'border-gray-200', bg: 'bg-gray-50',
            desc: 'Standard family member',
            perms: ['Personal settings only', 'Care point prefs', 'No billing access', 'No family organizer features'],
          },
        ].map((r) => (
          <div key={r.role} className={`rounded-xl border ${r.border} ${r.bg} p-4`}>
            <div className={`inline-flex bg-gradient-to-r ${r.color} text-white text-xs font-bold px-3 py-1 rounded-lg mb-2`}>
              {r.role}
            </div>
            <p className="text-xs text-gray-500 mb-2">{r.desc}</p>
            <ul className="space-y-1">
              {r.perms.map((p) => (
                <li key={p} className="flex items-center gap-1.5 text-xs text-gray-700">
                  <span className="text-green-500 shrink-0">✓</span>{p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Feature matrix */}
      <div className="overflow-x-auto">
        <p className="text-xs font-bold text-gray-700 mb-2">Feature Visibility Matrix</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-violet-100">
              <th className="text-left py-1.5 pr-3 text-xs font-semibold text-gray-500">Setting</th>
              <th className="text-center py-1.5 px-2 text-xs font-bold text-violet-700">Owner</th>
              <th className="text-center py-1.5 px-2 text-xs font-bold text-blue-600">Organizer</th>
              <th className="text-center py-1.5 px-2 text-xs font-bold text-gray-600">Member</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {[
              ['Edit Profile / Notifications / Theme', '✓', '✓', '✓'],
              ['Care Point Preferences', '✓', '✓', '✓'],
              ['Account & Security / Privacy', '✓', '✓', '✓'],
              ['View Family Members', '✓', '✓', '—'],
              ['Invite Members / Invite Code', '✓', '✓', '—'],
              ['Manage Roles', '✓', '—', '—'],
              ['Manage Permissions', '✓', '—', '—'],
              ['Linked Devices', '✓', '—', '—'],
              ['AI Usage Analytics', '✓', 'if permitted', '—'],
              ['Storage Analytics', '✓', 'if permitted', '—'],
              ['Subscription / Billing', '✓', '—', '—'],
              ['Payment Method', '✓', '—', '—'],
              ['Buy More Storage', '✓', '—', '—'],
            ].map(([f, sa, ad, me], i) => (
              <tr key={f} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-gray-50/30' : ''}`}>
                <td className="py-1.5 pr-3 font-medium text-gray-700">{f}</td>
                {[sa, ad, me].map((v, j) => (
                  <td key={j} className="py-1.5 px-2 text-center">
                    {v === '✓' && <span className="text-green-600 font-bold">✓</span>}
                    {v === '—' && <span className="text-red-300">—</span>}
                    {v === 'if permitted' && <span className="text-amber-500 text-[10px] font-semibold">if permitted</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Detailed Role Screen Helpers (copied from settings-map RoleOverview.tsx) ──

function RoleProfileHeader({ name, role, family, tasks, lists, events }: {
  name: string; role: string; family: string; tasks: number; lists: number; events: number;
}) {
  return (
    <div className="bg-white px-2.5 pt-3 pb-2 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-md">
          <span className="text-sm font-black text-white">{name[0]}</span>
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-black text-gray-900">{name}</p>
          <p className="text-[7px] text-violet-600 font-semibold">{role}</p>
          <p className="text-[7px] text-gray-400">{family}</p>
        </div>
        <div className="text-[7px] text-violet-500 font-bold border border-violet-200 rounded-lg px-1.5 py-0.5 bg-violet-50">Edit</div>
      </div>
      <div className="flex gap-3 mt-2">
        {([['Tasks', tasks], ['Lists', lists], ['Events', events]] as [string, number][]).map(([k, v]) => (
          <div key={k} className="text-center">
            <p className="text-[9px] font-black text-gray-800">{v}</p>
            <p className="text-[6px] text-gray-400">{k}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoleMiniUsage({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className={`rounded-xl p-1.5 mx-2.5 mb-1 ${color}`}>
      <div className="flex items-center justify-between mb-0.5">
        <p className="text-[7px] font-bold text-gray-700">{label}</p>
        <p className="text-[7px] font-black text-gray-600">{pct}%</p>
      </div>
      <div className="bg-white/60 rounded-full h-1">
        <div className="bg-violet-500 rounded-full h-1 transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function RoleLockedSection({ label }: { label: string }) {
  return (
    <div className="mx-2.5 my-1 rounded-xl border border-dashed border-gray-200 bg-gray-50 flex items-center gap-2 px-2 py-1.5">
      <span className="text-[8px] text-gray-300">🔒</span>
      <span className="text-[7px] text-gray-300 font-medium">{label}</span>
      <span className="ml-auto text-[6px] text-gray-200 italic">hidden</span>
    </div>
  );
}

function RSRow({ icon, label, value, badge, danger }: {
  icon: string; label: string; value?: string; badge?: string | number; danger?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 px-2.5 py-[5px] bg-white">
      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${danger ? 'bg-red-50' : 'bg-violet-50'}`}>
        <span className="text-[9px]">{icon}</span>
      </div>
      <span className={`text-[8px] flex-1 font-medium ${danger ? 'text-red-500' : 'text-gray-800'}`}>{label}</span>
      {badge !== undefined && <span className="text-[7px] font-bold bg-violet-600 text-white rounded-full px-1.5 py-0.5">{badge}</span>}
      {value && <span className="text-[7px] text-gray-400">{value}</span>}
      {!danger && <span className="text-[9px] text-gray-300">›</span>}
    </div>
  );
}

function RSHead({ label }: { label: string }) {
  return <p className="text-[6px] uppercase tracking-widest text-gray-400 font-bold px-2.5 pt-2 pb-0.5">{label}</p>;
}

function RSD() { return <div className="h-px bg-gray-100 mx-2.5" />; }

function FullOwnerScreen() {
  return (
    <div className="flex flex-col h-full" style={{ minHeight: 520 }}>
      <div className="bg-white px-2.5 py-1.5 flex items-center justify-between border-b border-gray-100">
        <p className="text-[10px] font-black text-gray-900">Profile</p>
        <div className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center">
          <span className="text-[8px] text-gray-400">⊕</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <RoleProfileHeader name="Natasha" role="Owner" family="Thaikaattu Family" tasks={52} lists={5} events={3} />
        <RSHead label="Personal" />
        <div className="mx-2.5 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <RSRow icon="✏️" label="Edit Profile" /><RSD />
          <RSRow icon="🌐" label="Language & Localization" value="EN" /><RSD />
          <RSRow icon="🔔" label="Notification Preferences" /><RSD />
          <RSRow icon="🎨" label="Appearance & Theme" value="Light" /><RSD />
          <RSRow icon="💜" label="Care Point Preferences" />
        </div>
        <RSHead label="Account" />
        <div className="mx-2.5 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <RSRow icon="🔒" label="Account & Security" /><RSD />
          <RSRow icon="🛡️" label="Privacy Controls" />
        </div>
        <RSHead label="Family Management" />
        <div className="mx-2.5 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <RSRow icon="👨‍👩‍👧" label="Family Members" badge={4} /><RSD />
          <RSRow icon="➕" label="Invite Members" /><RSD />
          <RSRow icon="🔑" label="Invite Code / QR" /><RSD />
          <RSRow icon="🔗" label="Share Family Link" /><RSD />
          <RSRow icon="👑" label="Manage Roles" /><RSD />
          <RSRow icon="⚡" label="Manage Permissions" /><RSD />
          <RSRow icon="📱" label="Linked Devices" value="3" /><RSD />
          <RSRow icon="🔐" label="Shared Access Controls" />
        </div>
        <RSHead label="Subscription & Billing" />
        <div className="mx-2.5 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <RSRow icon="⭐" label="Current Plan" value="Family Pro" /><RSD />
          <RSRow icon="🚀" label="Upgrade Plan" /><RSD />
          <RSRow icon="💳" label="Payment Method" value="••4291" /><RSD />
          <RSRow icon="📋" label="Billing History" />
        </div>
        <RSHead label="AI & Storage" />
        <RoleMiniUsage label="AI Usage this month" pct={72} color="bg-violet-50" />
        <RoleMiniUsage label="Voice AI Usage" pct={45} color="bg-blue-50" />
        <RoleMiniUsage label="Document Storage" pct={60} color="bg-amber-50" />
        <div className="mx-2.5 rounded-xl overflow-hidden border border-gray-100 bg-white mb-1">
          <RSRow icon="🤖" label="AI Usage Analytics" /><RSD />
          <RSRow icon="🎤" label="Voice AI Limit" /><RSD />
          <RSRow icon="💾" label="Storage Usage" /><RSD />
          <RSRow icon="🛒" label="Buy More Storage" />
        </div>
        <RSHead label="Support" />
        <div className="mx-2.5 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <RSRow icon="❓" label="Help & Support" /><RSD />
          <RSRow icon="📄" label="Terms & Privacy" />
        </div>
        <div className="mx-2.5 my-2 rounded-xl overflow-hidden border border-red-100 bg-white">
          <RSRow icon="🚪" label="Log Out" danger />
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function FullOrganizerScreen() {
  return (
    <div className="flex flex-col h-full" style={{ minHeight: 520 }}>
      <div className="bg-white px-2.5 py-1.5 flex items-center justify-between border-b border-gray-100">
        <p className="text-[10px] font-black text-gray-900">Profile</p>
        <div className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center">
          <span className="text-[8px] text-gray-400">⊕</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <RoleProfileHeader name="James" role="Organizer" family="Thaikaattu Family" tasks={38} lists={4} events={2} />
        <RSHead label="Personal" />
        <div className="mx-2.5 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <RSRow icon="✏️" label="Edit Profile" /><RSD />
          <RSRow icon="🌐" label="Language & Localization" value="EN" /><RSD />
          <RSRow icon="🔔" label="Notification Preferences" /><RSD />
          <RSRow icon="🎨" label="Appearance & Theme" value="Dark" /><RSD />
          <RSRow icon="💜" label="Care Point Preferences" />
        </div>
        <RSHead label="Account" />
        <div className="mx-2.5 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <RSRow icon="🔒" label="Account & Security" /><RSD />
          <RSRow icon="🛡️" label="Privacy Controls" />
        </div>
        <RSHead label="Family Management" />
        <div className="mx-2.5 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <RSRow icon="👨‍👩‍👧" label="Family Members" badge={4} /><RSD />
          <RSRow icon="➕" label="Invite Members" /><RSD />
          <RSRow icon="🔑" label="Invite Code / QR" /><RSD />
          <RSRow icon="🔗" label="Share Family Link" />
        </div>
        <RoleLockedSection label="Manage Roles — Owner only" />
        <RoleLockedSection label="Manage Permissions — Owner only" />
        <RSHead label="AI & Storage (Permitted)" />
        <div className="mx-2.5 mb-0.5 rounded-xl border border-green-100 bg-green-50 px-2 py-1 flex items-center gap-1.5">
          <span className="text-[8px]">✅</span>
          <p className="text-[7px] text-green-700 font-semibold">Permitted by Owner</p>
        </div>
        <RoleMiniUsage label="Document Storage" pct={60} color="bg-amber-50" />
        <RoleMiniUsage label="AI Usage" pct={72} color="bg-violet-50" />
        <div className="mx-2.5 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <RSRow icon="💾" label="Storage Analytics" /><RSD />
          <RSRow icon="🤖" label="AI Usage Analytics" />
        </div>
        <RoleLockedSection label="Billing & Subscription — Owner only" />
        <RoleLockedSection label="Payment Method — Owner only" />
        <RSHead label="Support" />
        <div className="mx-2.5 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <RSRow icon="❓" label="Help & Support" /><RSD />
          <RSRow icon="📄" label="Terms & Privacy" />
        </div>
        <div className="mx-2.5 my-2 rounded-xl overflow-hidden border border-red-100 bg-white">
          <RSRow icon="🚪" label="Log Out" danger />
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function FullMemberScreen() {
  return (
    <div className="flex flex-col h-full" style={{ minHeight: 520 }}>
      <div className="bg-white px-2.5 py-1.5 flex items-center justify-between border-b border-gray-100">
        <p className="text-[10px] font-black text-gray-900">Profile</p>
        <div className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center">
          <span className="text-[8px] text-gray-400">⊕</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <RoleProfileHeader name="Stella" role="Member" family="Thaikaattu Family" tasks={14} lists={2} events={1} />
        <RSHead label="Personal" />
        <div className="mx-2.5 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <RSRow icon="✏️" label="Edit Profile" /><RSD />
          <RSRow icon="🌐" label="Language & Localization" value="EN" /><RSD />
          <RSRow icon="🔔" label="Notification Preferences" /><RSD />
          <RSRow icon="🎨" label="Appearance & Theme" value="Light" /><RSD />
          <RSRow icon="💜" label="Care Point Preferences" />
        </div>
        <RSHead label="Account" />
        <div className="mx-2.5 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <RSRow icon="🔒" label="Account & Security" /><RSD />
          <RSRow icon="🛡️" label="Privacy Controls" />
        </div>
        <RSHead label="Family & Organizer Sections" />
        <RoleLockedSection label="Family Members — Organizer only" />
        <RoleLockedSection label="Invite Members — Organizer only" />
        <RoleLockedSection label="Manage Roles — Owner only" />
        <RoleLockedSection label="Subscription & Billing — Owner only" />
        <RoleLockedSection label="AI Usage Analytics — Owner / Organizer" />
        <RoleLockedSection label="Storage Analytics — Owner / Organizer" />
        <RSHead label="Support" />
        <div className="mx-2.5 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <RSRow icon="❓" label="Help & Support" /><RSD />
          <RSRow icon="📄" label="Terms & Privacy" />
        </div>
        <div className="mx-2.5 my-2 rounded-xl overflow-hidden border border-red-100 bg-white">
          <RSRow icon="🚪" label="Log Out" danger />
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── 2. Role-Based Phone Screens ───────────────────────────────────────────────
export function SettingsRoleScreens() {
  return (
    <div className="space-y-8">

      {/* 3 Phone Screens */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Settings Home — 3 Role Views</h2>
        <p className="text-sm text-gray-500 mb-6">
          Same settings page, different sections visible based on role. Locked sections show a grayed-out hint — not an error.
        </p>
        <div className="flex flex-wrap gap-8 justify-center">
          <PhoneShell label="Owner" sublabel="Sees everything: billing, AI analytics, full family management" accent="border-violet-600">
            <FullOwnerScreen />
          </PhoneShell>
          <PhoneShell label="Organizer" sublabel="Family management visible; billing hidden; analytics if permitted" accent="border-blue-500">
            <FullOrganizerScreen />
          </PhoneShell>
          <PhoneShell label="Member" sublabel="Personal settings only — family, billing, analytics all locked" accent="border-gray-500">
            <FullMemberScreen />
          </PhoneShell>
        </div>
      </div>

      {/* Role Hierarchy */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Role Hierarchy</h2>
        <div className="flex flex-col lg:flex-row gap-4 justify-center items-stretch">
          {[
            {
              role: 'Owner', color: 'from-violet-600 to-purple-700', border: 'border-violet-300', bg: 'bg-violet-50',
              desc: 'Family creator & subscription owner',
              perms: ['Full family control', 'Billing & payment owner', 'Subscription management', 'AI usage & storage analytics', 'Manage organizer permissions', 'Linked device management'],
            },
            {
              role: 'Organizer', color: 'from-blue-500 to-indigo-600', border: 'border-blue-200', bg: 'bg-blue-50',
              desc: 'Delegated by Owner',
              perms: ['Manage family members', 'Invite new members', 'View analytics if permitted', 'Personal settings', 'Cannot manage billing'],
            },
            {
              role: 'Member', color: 'from-gray-500 to-gray-600', border: 'border-gray-200', bg: 'bg-gray-50',
              desc: 'Standard family member',
              perms: ['Personal settings only', 'Care point preferences', 'Notification preferences', 'No family organizer features', 'No billing access'],
            },
          ].map((r) => (
            <div key={r.role} className={`flex-1 rounded-2xl border ${r.border} ${r.bg} p-5`}>
              <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${r.color} text-white text-sm font-bold px-3 py-1.5 rounded-xl mb-3`}>
                {r.role}
              </div>
              <p className="text-xs text-gray-500 mb-3">{r.desc}</p>
              <ul className="space-y-1.5">
                {r.perms.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-xs text-gray-700">
                    <span className="text-green-500">✓</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Visibility Matrix */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Feature Visibility Matrix</h2>
        <p className="text-sm text-gray-500 mb-4">What each role can see in settings</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-violet-100">
                <th className="text-left py-2 pr-4 font-semibold text-gray-600 text-xs">Settings Feature</th>
                <th className="text-center py-2 px-3 font-semibold text-violet-700 text-xs">Owner</th>
                <th className="text-center py-2 px-3 font-semibold text-blue-600 text-xs">Organizer</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-600 text-xs">Member</th>
              </tr>
            </thead>
            <tbody>
              {([
                { label: 'Edit Profile', sa: true, ad: true, mb: true },
                { label: 'Notification Prefs', sa: true, ad: true, mb: true },
                { label: 'Appearance & Theme', sa: true, ad: true, mb: true },
                { label: 'Care Point Prefs', sa: true, ad: true, mb: true },
                { label: 'Account & Security', sa: true, ad: true, mb: true },
                { label: 'Privacy Controls', sa: true, ad: true, mb: true },
                { label: 'Help & Support', sa: true, ad: true, mb: true },
                { label: 'View Family Members', sa: true, ad: true, mb: false },
                { label: 'Invite Members', sa: true, ad: true, mb: false },
                { label: 'Invite Code / QR', sa: true, ad: true, mb: false },
                { label: 'Manage Roles', sa: true, ad: false, mb: false },
                { label: 'Manage Permissions', sa: true, ad: false, mb: false },
                { label: 'Linked Devices', sa: true, ad: false, mb: false },
                { label: 'AI Usage Analytics', sa: true, ad: 'if permitted', mb: false },
                { label: 'Storage Analytics', sa: true, ad: 'if permitted', mb: false },
                { label: 'Subscription / Billing', sa: true, ad: false, mb: false },
                { label: 'Payment Method', sa: true, ad: false, mb: false },
                { label: 'Buy More Storage', sa: true, ad: false, mb: false },
              ] as Array<{ label: string; sa: boolean; ad: boolean | string; mb: boolean }>).map((f, i) => {
                const cell = (v: boolean | string) =>
                  v === true ? <span className="text-green-600 font-bold text-xs">✓</span>
                  : v === false ? <span className="text-red-300 text-xs">—</span>
                  : <span className="text-amber-500 text-[10px] font-semibold">{v}</span>;
                return (
                  <tr key={f.label} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                    <td className="py-2 pr-4 text-xs text-gray-700 font-medium">{f.label}</td>
                    <td className="py-2 px-3 text-center">{cell(f.sa)}</td>
                    <td className="py-2 px-3 text-center">{cell(f.ad)}</td>
                    <td className="py-2 px-3 text-center">{cell(f.mb)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="text-green-600 font-bold">✓</span> Visible</span>
          <span className="flex items-center gap-1"><span className="text-red-300">—</span> Hidden</span>
          <span className="flex items-center gap-1"><span className="text-amber-500 font-semibold">if permitted</span> Conditional</span>
        </div>
      </div>

    </div>
  );
}

// ── 3. Settings Flows Accordion ───────────────────────────────────────────────
export function SettingsFlows() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-1">Settings Flow Screens — Owner</h2>
      <p className="text-sm text-gray-600 mb-5">
        Click any flow card to expand and see the before → after screens
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {['Personal', 'Account', 'Family', 'Billing', 'AI & Storage'].map((tag) => (
          <span key={tag} className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{tag}</span>
        ))}
      </div>

      <div className="space-y-2">
        {flowData.map((flow) => {
          const isOpen = open === flow.id;
          return (
            <div key={flow.id} className="border-2 rounded-xl overflow-hidden border-gray-100">
              <motion.div
                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${isOpen ? 'bg-violet-50' : 'bg-gray-50 hover:bg-gray-100'}`}
                onClick={() => setOpen(isOpen ? null : flow.id)}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl shrink-0">{flow.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-gray-900">{flow.title}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${flow.tagColor}`}>{flow.tag}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{flow.desc}</p>
                  </div>
                </div>
                {isOpen
                  ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
                  : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-2" />}
              </motion.div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-5 pt-3 border-t border-violet-100 bg-violet-50/20">
                      <div className="flex flex-wrap items-start gap-4 justify-center">
                        {flow.screens.map((s, i) => (
                          <div key={i} className="flex items-start gap-4">
                            <PhoneShell
                              label={s.label}
                              accent={i === 0 ? 'border-gray-600' : 'border-violet-600'}
                            >
                              {s.node}
                            </PhoneShell>
                            {i < flow.screens.length - 1 && <Arrow label="tap →" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 4. Care Point Preferences Flow ────────────────────────────────────────────

const cpCategories = [
  { emoji: '🚗', name: 'Driving', desc: 'Pickups, drop-offs, errands' },
  { emoji: '🧹', name: 'Cleaning', desc: 'Vacuuming, bathrooms, surfaces' },
  { emoji: '🍳', name: 'Cooking', desc: 'Meal prep and daily cooking' },
  { emoji: '🛒', name: 'Shopping', desc: 'Groceries, supplies, orders' },
  { emoji: '📅', name: 'Planning', desc: 'Scheduling, research, logistics' },
  { emoji: '👶', name: 'Child Care', desc: 'School, homework, bedtime' },
  { emoji: '📦', name: 'Organizing', desc: 'Declutter, storage, admin' },
  { emoji: '🏥', name: 'Healthcare', desc: 'Appointments, medications' },
  { emoji: '🔧', name: 'Home Repair', desc: 'Fixes, maintenance, garden' },
  { emoji: '💰', name: 'Finance Mgmt', desc: 'Bills, budgets, tracking' },
];

export function SettingsCarePointsFlow() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      title: 'Entry Point in Settings',
      desc: 'Tapping "Care Point Preferences" in Personal settings opens the care points hub',
      screen: <S_CPEntry />,
      accent: 'border-gray-600',
    },
    {
      title: 'Category Overview',
      desc: 'All household task categories shown with their saved feeling + skill bars. Tap any to edit',
      screen: <S_CPOverview />,
      accent: 'border-violet-500',
    },
    {
      title: 'Category Deep Editor',
      desc: 'Per-category editor with feeling slider, confidence slider, frequency, and emotional state picker',
      screen: <S_CPEditor />,
      accent: 'border-pink-500',
    },
    {
      title: 'All Sliders View',
      desc: 'Bulk view — update all categories at once using the same slider UX as onboarding',
      screen: <S_AllSliders />,
      accent: 'border-blue-500',
    },
    {
      title: 'Saved Confirmation',
      desc: 'Success state showing what changed and how Liv will use the new preferences',
      screen: <S_CPSaved />,
      accent: 'border-green-500',
    },
  ];

  return (
    <div className="space-y-8">

      {/* Explainer */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-2xl">💜</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">What is Care Point Preferences?</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              During onboarding, Liv (the AI) asks each family member how they feel about different household tasks
              using feeling sliders (Avoiding ↔ Loving) and confidence sliders (Still Learning ↔ Confident).
              These answers directly affect AI task assignment and mental load balancing across the family.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">
              <strong>In Settings</strong>, users can revisit and update their answers at any time — the same
              emotionally-designed UI with their saved values pre-filled.
            </p>
          </div>
        </div>

        {/* Formula */}
        <div className="mt-5 bg-violet-50 rounded-2xl p-4 border border-violet-100">
          <p className="text-xs font-bold text-violet-800 mb-2">Care Point Formula</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div className="bg-white rounded-xl px-3 py-1.5 border border-violet-200 font-bold text-violet-700">CP</div>
            <span className="text-gray-400">=</span>
            <div className="bg-white rounded-xl px-3 py-1.5 border border-violet-200 text-violet-600 font-medium">Time Spent</div>
            <span className="text-gray-400">×</span>
            <div className="bg-white rounded-xl px-3 py-1.5 border border-violet-200 text-violet-600 font-medium">Effort Weight</div>
            <span className="text-xs text-gray-400">(personal, not comparative)</span>
          </div>
          <p className="text-xs text-violet-600 mt-2">
            The effort weight is calculated from feeling + confidence scores. Lower enjoyment + lower confidence = higher effort weight.
          </p>
        </div>
      </div>

      {/* Category grid */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Task Categories</h2>
        <p className="text-sm text-gray-500 mb-4">10 built-in categories + ability to add custom ones</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {cpCategories.map((c) => (
            <div key={c.name} className="bg-violet-50 rounded-2xl p-3 border border-violet-100 text-center">
              <span className="text-2xl block mb-1">{c.emoji}</span>
              <p className="text-xs font-bold text-gray-800">{c.name}</p>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Flow screens — expandable step accordion */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Complete Settings Flow — 5 Screens</h2>
        <p className="text-sm text-gray-500 mb-6">Click each step to explore the screen detail</p>

        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="border-2 rounded-2xl overflow-hidden border-violet-100">
              <motion.button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-violet-50/40 transition-colors text-left"
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                whileTap={{ scale: 0.99 }}
              >
                <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-black text-white">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
                {activeStep === i ? (
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </motion.button>

              <AnimatePresence>
                {activeStep === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 pt-2 bg-violet-50/20 border-t border-violet-100 flex justify-center">
                      <PhoneShell label={`Screen ${i + 1}: ${step.title}`} accent={step.accent}>
                        {step.screen}
                      </PhoneShell>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Full flow gallery — all 5 in a row */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Full Flow — All 5 Screens</h2>
        <p className="text-sm text-gray-500 mb-6">Complete linear path through the Care Point preferences update flow</p>
        <div className="flex flex-wrap gap-4 items-start justify-center">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <PhoneShell label={`${i + 1}. ${step.title}`} accent={step.accent}>
                {step.screen}
              </PhoneShell>
              {i < steps.length - 1 && (
                <div className="flex flex-col items-center justify-center mt-20 gap-1">
                  <span className="text-gray-300 text-2xl">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Design principles */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Design Principles for Care Points UI</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🎚️', title: 'Slider-first', desc: 'No dropdowns or radio buttons. Sliders feel intuitive and emotional — perfect for preference capture.' },
            { icon: '💜', title: 'Personal & Private', desc: "Values are never shown to other family members. The UI reinforces this with messaging like \"personal to you.\"" },
            { icon: '🤖', title: 'AI-connected', desc: "Liv (AI) is always mentioned in context — users understand why they're answering and how it helps." },
            { icon: '🔄', title: 'Revisit anytime', desc: 'Previously saved values are pre-loaded. No need to start fresh. Just update what changed.' },
            { icon: '😊', title: 'Emotionally designed', desc: 'Emoji pickers, friendly language, warm colors. This is about feelings — the UI should reflect that.' },
            { icon: '⚡', title: 'Impact feedback', desc: 'After saving, Liv explains what will change — making the update feel meaningful and worthwhile.' },
          ].map((p) => (
            <div key={p.title} className="bg-white rounded-xl p-4 border border-violet-100">
              <span className="text-xl block mb-2">{p.icon}</span>
              <p className="text-sm font-bold text-gray-800 mb-1">{p.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ── 5. Analytics Screens Flow ─────────────────────────────────────────────────

// ── Circular Usage Indicator ─────────────────────────────────────────────────
function CircularUsage({
  pct, label, sublabel, color, size = 56,
}: {
  pct: number; label: string; sublabel?: string; color: string; size?: number;
}) {
  const radius = (size / 2) - 5;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (pct / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth="4" />
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth="4"
            strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[9px] font-black text-gray-800 leading-none">{pct}%</p>
        </div>
      </div>
      <p className="text-[7px] font-semibold text-gray-600 text-center leading-tight max-w-[64px]">{label}</p>
      {sublabel && <p className="text-[6px] text-gray-400 text-center">{sublabel}</p>}
    </div>
  );
}

// ── Bar Progress Row ──────────────────────────────────────────────────────────
function ProgressRow({ label, used, total, unit, color, pct }: {
  label: string; used: string; total: string; unit: string; color: string; pct: number;
}) {
  return (
    <div className="px-2 py-1.5">
      <div className="flex justify-between items-center mb-0.5">
        <p className="text-[7.5px] font-semibold text-gray-700">{label}</p>
        <p className="text-[7px] text-gray-500">
          <span className="font-black text-gray-800">{used}</span> / {total} {unit}
        </p>
      </div>
      <div className="bg-gray-100 rounded-full h-2">
        <div className={`${color} rounded-full h-2 transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-[6px] text-gray-400 mt-0.5">{100 - pct}% remaining this month</p>
    </div>
  );
}

// ── Screen: AI Usage Analytics (full) ────────────────────────────────────────
function Screen_AIUsage() {
  return (
    <div className="flex flex-col" style={{ minHeight: 380 }}>
      <TopBar title="AI Usage Analytics" />
      <div className="flex-1 overflow-y-auto bg-[#f8f7ff]">
        <div className="bg-white border-b border-gray-100 px-2 py-2 flex justify-around items-center">
          <CircularUsage pct={72} label="AI Usage" color="#7c3aed" size={52} />
          <CircularUsage pct={45} label="Voice AI" color="#3b82f6" size={52} />
          <CircularUsage pct={60} label="Storage" color="#f59e0b" size={52} />
        </div>
        <div className="mx-2 mt-1.5 bg-amber-50 rounded-xl border border-amber-100 px-2 py-1.5 flex gap-1.5 items-start">
          <span className="text-[9px] shrink-0 mt-0.5">⚠️</span>
          <p className="text-[6.5px] text-amber-700 leading-relaxed">
            You've used 72% of your monthly AI limit. At this rate, you'll reach the limit in ~8 days.
          </p>
        </div>
        <p className="text-[6px] uppercase tracking-widest text-gray-400 font-bold px-2 pt-2 pb-0.5">Monthly Breakdown</p>
        <div className="mx-2 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <ProgressRow label="AI Chat & Suggestions" used="1,440" total="2,000" unit="msgs" color="bg-violet-500" pct={72} />
          <div className="h-px bg-gray-100 mx-2" />
          <ProgressRow label="Document AI Analysis" used="23" total="50" unit="docs" color="bg-purple-400" pct={46} />
          <div className="h-px bg-gray-100 mx-2" />
          <ProgressRow label="Task AI Planning" used="286" total="500" unit="tasks" color="bg-indigo-400" pct={57} />
        </div>
        <p className="text-[6px] uppercase tracking-widest text-gray-400 font-bold px-2 pt-2 pb-0.5">Usage by Member</p>
        <div className="mx-2 rounded-xl overflow-hidden border border-gray-100 bg-white mb-2">
          {[
            { name: 'Natasha', pct: 42, color: 'bg-violet-500' },
            { name: 'James', pct: 28, color: 'bg-blue-400' },
            { name: 'Stella', pct: 18, color: 'bg-pink-400' },
            { name: 'Oliver', pct: 12, color: 'bg-amber-400' },
          ].map((m) => (
            <div key={m.name} className="flex items-center gap-2 px-2 py-1.5 border-b border-gray-50 last:border-0">
              <div className={`w-5 h-5 rounded-full ${m.color} flex items-center justify-center`}>
                <span className="text-[7px] font-black text-white">{m.name[0]}</span>
              </div>
              <p className="text-[7.5px] font-medium text-gray-700 w-12">{m.name}</p>
              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                <div className={`${m.color} rounded-full h-1.5`} style={{ width: `${m.pct}%` }} />
              </div>
              <p className="text-[7px] text-gray-500 w-6 text-right">{m.pct}%</p>
            </div>
          ))}
        </div>
        <div className="mx-2 mb-2 bg-gradient-to-r from-violet-600 to-purple-700 rounded-xl p-2.5">
          <p className="text-[8px] font-black text-white mb-0.5">Need more AI?</p>
          <p className="text-[6.5px] text-violet-200 mb-1.5">Upgrade to Family Max for unlimited AI</p>
          <div className="bg-white/20 rounded-lg px-2 py-0.5 inline-block">
            <p className="text-[7px] font-bold text-white">Upgrade Plan →</p>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Screen: Voice AI Usage (full) ────────────────────────────────────────────
function Screen_VoiceAI() {
  return (
    <div className="flex flex-col" style={{ minHeight: 380 }}>
      <TopBar title="Voice AI Usage" />
      <div className="flex-1 overflow-y-auto bg-[#f8f7ff]">
        <div className="mx-2 mt-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-3 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="text-[12px]">🎤</span>
            </div>
            <div>
              <p className="text-[7px] text-blue-200 font-medium uppercase tracking-wider">Voice Assistant</p>
              <p className="text-[9px] font-black text-white">Monthly Usage</p>
            </div>
          </div>
          <div className="flex items-end justify-between mb-1">
            <div>
              <p className="text-[18px] font-black text-white leading-none">22.5</p>
              <p className="text-[7px] text-blue-300">of 50 minutes used</p>
            </div>
            <div className="text-right">
              <p className="text-[12px] font-black text-blue-100">45%</p>
              <p className="text-[6px] text-blue-300">used this month</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-full h-2 mt-1">
            <div className="bg-white rounded-full h-2" style={{ width: '45%' }} />
          </div>
          <p className="text-[6px] text-blue-300 mt-1">Resets on Jun 15, 2026</p>
        </div>
        <p className="text-[6px] uppercase tracking-widest text-gray-400 font-bold px-2 pt-2 pb-0.5">Daily Usage — Past 7 Days</p>
        <div className="mx-2 bg-white rounded-xl border border-gray-100 px-2 py-2 mb-1">
          <div className="flex items-end gap-1 h-10">
            {[4.2, 2.1, 5.8, 3.3, 4.0, 1.5, 1.6].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div className="w-full rounded-t-sm bg-blue-400" style={{ height: `${(v / 6) * 32}px` }} />
              </div>
            ))}
          </div>
          <div className="flex gap-1 mt-0.5">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <p key={i} className="flex-1 text-center text-[6px] text-gray-400">{d}</p>
            ))}
          </div>
        </div>
        <p className="text-[6px] uppercase tracking-widest text-gray-400 font-bold px-2 pt-1 pb-0.5">Top Voice Commands</p>
        <div className="mx-2 rounded-xl overflow-hidden border border-gray-100 bg-white mb-2">
          {[
            { cmd: 'Add task...', count: '34 uses', pct: 68 },
            { cmd: "What's today's tasks?", count: '22 uses', pct: 44 },
            { cmd: 'Create shopping list', count: '18 uses', pct: 36 },
            { cmd: 'Set reminder for...', count: '12 uses', pct: 24 },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-1.5 border-b border-gray-50 last:border-0">
              <div className="flex-1">
                <p className="text-[7px] font-medium text-gray-700 italic">"{c.cmd}"</p>
                <div className="bg-gray-100 rounded-full h-1 mt-0.5">
                  <div className="bg-blue-400 rounded-full h-1" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
              <p className="text-[6.5px] text-gray-400 shrink-0">{c.count}</p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Screen: Storage Usage (full) ─────────────────────────────────────────────
function Screen_Storage() {
  return (
    <div className="flex flex-col" style={{ minHeight: 380 }}>
      <TopBar title="Storage Usage" />
      <div className="flex-1 overflow-y-auto bg-[#f8f7ff]">
        <div className="mx-2 mt-2 bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
          <div className="flex items-center gap-3">
            <CircularUsage pct={60} label="Used" sublabel="6 of 10 GB" color="#f59e0b" size={64} />
            <div className="flex-1">
              <p className="text-[8px] font-black text-gray-900 mb-1.5">Storage Summary</p>
              <div className="space-y-1">
                {[
                  { type: 'Documents', used: '3.2 GB', color: 'bg-blue-400', pct: 53 },
                  { type: 'Photos', used: '1.8 GB', color: 'bg-pink-400', pct: 30 },
                  { type: 'Voice Files', used: '0.7 GB', color: 'bg-purple-400', pct: 12 },
                  { type: 'Other', used: '0.3 GB', color: 'bg-gray-300', pct: 5 },
                ].map((item) => (
                  <div key={item.type} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                    <p className="text-[6.5px] text-gray-600 flex-1">{item.type}</p>
                    <p className="text-[6.5px] font-semibold text-gray-700">{item.used}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2 mt-1.5 bg-amber-50 rounded-xl border border-amber-100 px-2 py-1.5 flex gap-1.5">
          <span className="text-[9px] shrink-0">📦</span>
          <p className="text-[6.5px] text-amber-700 leading-relaxed">
            4 GB remaining. Consider purchasing additional storage to keep adding documents.
          </p>
        </div>
        <p className="text-[6px] uppercase tracking-widest text-gray-400 font-bold px-2 pt-2 pb-0.5">Usage by Member</p>
        <div className="mx-2 rounded-xl overflow-hidden border border-gray-100 bg-white">
          {[
            { name: 'Natasha', size: '2.8 GB', pct: 47, color: 'bg-violet-500' },
            { name: 'James', size: '1.9 GB', pct: 32, color: 'bg-blue-400' },
            { name: 'Stella', size: '0.9 GB', pct: 15, color: 'bg-pink-400' },
            { name: 'Oliver', size: '0.4 GB', pct: 6, color: 'bg-amber-400' },
          ].map((m) => (
            <div key={m.name} className="flex items-center gap-2 px-2 py-1.5 border-b border-gray-50 last:border-0">
              <div className={`w-4 h-4 rounded-full ${m.color} flex items-center justify-center`}>
                <span className="text-[6px] font-black text-white">{m.name[0]}</span>
              </div>
              <p className="text-[7px] font-medium text-gray-700 w-10">{m.name}</p>
              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                <div className={`${m.color} rounded-full h-1.5`} style={{ width: `${m.pct}%` }} />
              </div>
              <p className="text-[6.5px] text-gray-500 shrink-0">{m.size}</p>
            </div>
          ))}
        </div>
        <div className="px-2 pt-2 pb-1 flex gap-1.5">
          <div className="flex-1 bg-amber-500 rounded-xl text-center py-1.5 text-[7.5px] font-bold text-white">
            🛒 Buy More Storage
          </div>
          <div className="flex-1 bg-gray-100 rounded-xl text-center py-1.5 text-[7.5px] font-semibold text-gray-600">
            🗑️ Free Up Space
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Screen: Buy Additional Storage (full) ────────────────────────────────────
function Screen_BuyStorage() {
  return (
    <div className="flex flex-col" style={{ minHeight: 380 }}>
      <TopBar title="Buy Storage" />
      <div className="flex-1 overflow-y-auto bg-[#f8f7ff]">
        <p className="text-[6px] uppercase tracking-widest text-gray-400 font-bold px-2 pt-2 pb-1">Choose a Plan</p>
        {[
          { size: '+5 GB', price: '₹49', period: '/mo', desc: 'Great for small families', popular: false, color: 'border-gray-200 bg-white' },
          { size: '+20 GB', price: '₹149', period: '/mo', desc: 'Most popular · Up to 6 members', popular: true, color: 'border-violet-500 bg-violet-50' },
          { size: '+50 GB', price: '₹349', period: '/mo', desc: 'Power users & large families', popular: false, color: 'border-gray-200 bg-white' },
        ].map((plan) => (
          <div key={plan.size} className={`mx-2 mb-1.5 rounded-xl border-2 p-2.5 ${plan.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-[11px] font-black text-gray-900">{plan.size}</p>
                  {plan.popular && (
                    <span className="text-[6px] font-bold bg-violet-600 text-white px-1.5 py-0.5 rounded-full">Popular</span>
                  )}
                </div>
                <p className="text-[6.5px] text-gray-500 mt-0.5">{plan.desc}</p>
              </div>
              <div className="text-right">
                <p className="text-[12px] font-black text-gray-900">{plan.price}</p>
                <p className="text-[6px] text-gray-400">{plan.period}</p>
              </div>
            </div>
            <div className={`mt-1.5 w-full rounded-xl text-center py-1 text-[7.5px] font-bold ${
              plan.popular ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              {plan.popular ? '⭐ Select Plan' : 'Select'}
            </div>
          </div>
        ))}
        <div className="mx-2 mb-1.5 rounded-xl border border-dashed border-gray-200 bg-white p-2.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold text-gray-700">+10 GB One-Time</p>
              <p className="text-[6.5px] text-gray-400">No subscription, yours forever</p>
            </div>
            <p className="text-[10px] font-black text-gray-900">₹299</p>
          </div>
          <div className="mt-1.5 bg-gray-100 rounded-xl text-center py-1 text-[7px] font-semibold text-gray-600">
            Buy Once
          </div>
        </div>
        <p className="text-[6px] uppercase tracking-widest text-gray-400 font-bold px-2 pt-1 pb-0.5">Payment</p>
        <div className="mx-2 bg-white rounded-xl border border-gray-100 px-2 py-1.5 flex items-center gap-2 mb-2">
          <span className="text-[10px]">💳</span>
          <p className="text-[7.5px] font-medium text-gray-700">Visa ••4291</p>
          <span className="ml-auto text-[7px] text-violet-500 font-semibold">Change</span>
        </div>
        <div className="px-2 pb-2">
          <div className="bg-violet-600 rounded-xl text-center py-1.5 text-[8px] font-bold text-white">
            Confirm Purchase
          </div>
          <p className="text-[6px] text-gray-400 text-center mt-1">Cancel anytime · Billed monthly</p>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Screen: Settings Analytics Entry ─────────────────────────────────────────
function Screen_SettingsAIEntry() {
  return (
    <div className="flex flex-col" style={{ minHeight: 380 }}>
      <div className="bg-white px-2 py-1.5 border-b border-gray-100">
        <p className="text-[10px] font-black text-gray-900">Profile</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="mx-2 mt-2 bg-violet-50 rounded-xl border border-violet-100 px-2 py-2">
          <p className="text-[7px] font-bold text-violet-800 mb-1.5">AI &amp; Storage at a glance</p>
          <div className="flex gap-2">
            <CircularUsage pct={72} label="AI" color="#7c3aed" size={38} />
            <CircularUsage pct={45} label="Voice" color="#3b82f6" size={38} />
            <CircularUsage pct={60} label="Storage" color="#f59e0b" size={38} />
          </div>
        </div>
        <p className="text-[6px] uppercase tracking-widest text-gray-400 font-bold px-2 pt-2 pb-0.5">AI &amp; Storage</p>
        <div className="mx-2 rounded-xl overflow-hidden border border-gray-100 bg-white">
          <div className="flex items-center gap-2 px-2 py-[5px] bg-white">
            <div className="w-5 h-5 rounded-md bg-violet-50 flex items-center justify-center shrink-0">
              <span className="text-[9px]">🤖</span>
            </div>
            <span className="text-[8px] flex-1 font-medium text-gray-800">AI Usage Analytics</span>
            <span className="text-[7px] font-bold text-amber-500">72%</span>
            <span className="text-[9px] text-gray-300 ml-1">›</span>
          </div>
          <div className="h-px bg-gray-100 mx-2" />
          <div className="flex items-center gap-2 px-2 py-[5px] bg-white">
            <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
              <span className="text-[9px]">🎤</span>
            </div>
            <span className="text-[8px] flex-1 font-medium text-gray-800">Voice AI Usage</span>
            <span className="text-[7px] font-bold text-blue-500">45%</span>
            <span className="text-[9px] text-gray-300 ml-1">›</span>
          </div>
          <div className="h-px bg-gray-100 mx-2" />
          <div className="flex items-center gap-2 px-2 py-[5px] bg-white">
            <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center shrink-0">
              <span className="text-[9px]">💾</span>
            </div>
            <span className="text-[8px] flex-1 font-medium text-gray-800">Storage Usage</span>
            <span className="text-[7px] font-bold text-amber-500">60%</span>
            <span className="text-[9px] text-gray-300 ml-1">›</span>
          </div>
          <div className="h-px bg-gray-100 mx-2" />
          <div className="flex items-center gap-2 px-2 py-[5px] bg-white">
            <div className="w-5 h-5 rounded-md bg-green-50 flex items-center justify-center shrink-0">
              <span className="text-[9px]">🛒</span>
            </div>
            <span className="text-[8px] flex-1 font-medium text-gray-800">Buy More Storage</span>
            <span className="text-[9px] text-gray-300">›</span>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Analytics Design Principles ───────────────────────────────────────────────
const analyticsDesignPrinciples = [
  { icon: '💬', title: 'No jargon', desc: '"AI Usage" not "token count". "Voice AI" not "Whisper API". Simple language for everyone.' },
  { icon: '🔵', title: 'Circular indicators', desc: 'Circular progress for at-a-glance overview. Rings feel premium and are instantly readable.' },
  { icon: '📊', title: 'Segmented bars', desc: 'Linear bars for breakdown by type or member. Shows proportion clearly inside cards.' },
  { icon: '⚠️', title: 'Proactive alerts', desc: 'Warn users before they hit limits — "At this rate, 8 days left." Not a surprise.' },
  { icon: '🛒', title: 'Contextual upgrade', desc: "Upgrade prompts appear inside analytics — not in a settings menu users won't visit." },
  { icon: '👥', title: 'By-member breakdown', desc: 'Who is using what — helps the Owner understand family usage patterns.' },
];

// ── Analytics Flow Data ───────────────────────────────────────────────────────
const analyticsFlows = [
  {
    id: 'entry',
    title: '14. Settings Entry → AI & Storage Section',
    emoji: '⚙️',
    tag: 'Entry',
    tagColor: 'bg-gray-100 text-gray-700',
    desc: 'Mini usage summary visible in settings home. Circular indicators show 3 key metrics at a glance before even tapping.',
    screens: [
      { label: 'Settings Home\nwith AI summary', node: <Screen_SettingsAIEntry /> },
    ],
  },
  {
    id: 'ai-analytics',
    title: '15. AI Usage Analytics',
    emoji: '🤖',
    tag: 'AI',
    tagColor: 'bg-violet-100 text-violet-700',
    desc: 'Full AI usage breakdown with circular meters, monthly bars, per-feature usage, and per-member distribution.',
    screens: [
      { label: 'AI Usage\nAnalytics', node: <Screen_AIUsage /> },
    ],
  },
  {
    id: 'voice-ai',
    title: '16. Voice AI Usage Limit',
    emoji: '🎤',
    tag: 'Voice',
    tagColor: 'bg-blue-100 text-blue-700',
    desc: 'Dedicated voice AI screen with monthly minutes tracker, 7-day daily chart, and top voice commands breakdown.',
    screens: [
      { label: 'Voice AI\nUsage', node: <Screen_VoiceAI /> },
    ],
  },
  {
    id: 'storage',
    title: '17. Storage Usage Analytics',
    emoji: '💾',
    tag: 'Storage',
    tagColor: 'bg-amber-100 text-amber-700',
    desc: 'Storage breakdown with circular total indicator, type segmentation (docs/photos/voice), and per-member usage.',
    screens: [
      { label: 'Storage\nUsage', node: <Screen_Storage /> },
    ],
  },
  {
    id: 'buy-storage',
    title: '18. Buy Additional Storage',
    emoji: '🛒',
    tag: 'Purchase',
    tagColor: 'bg-green-100 text-green-700',
    desc: 'Storage purchase flow with monthly plans, one-time option, and existing payment method prefilled.',
    screens: [
      { label: 'Storage Analytics\n(CTA)', node: <Screen_Storage /> },
      { label: 'Buy More\nStorage', node: <Screen_BuyStorage /> },
    ],
  },
];

// ── Flow Card Accordion ───────────────────────────────────────────────────────
function Arrow2({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 shrink-0 px-2 mt-20">
      {label && <span className="text-[8px] text-gray-400 text-center leading-tight">{label}</span>}
      <span className="text-gray-300 text-2xl">→</span>
    </div>
  );
}

function FlowCard({ flow }: { flow: typeof analyticsFlows[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 rounded-2xl overflow-hidden border-violet-100 bg-white shadow-sm">
      <motion.button
        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-violet-50/40 transition-colors text-left"
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-3">
          <div className="text-xl shrink-0">{flow.emoji}</div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-gray-900">{flow.title}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${flow.tagColor}`}>{flow.tag}</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{flow.desc}</p>
          </div>
        </div>
        {open ? (
          <svg className="w-4 h-4 text-gray-400 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-gray-400 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 pt-2 bg-violet-50/20 border-t border-violet-100">
              <div className="flex flex-wrap items-start gap-2 justify-center">
                {flow.screens.map((screen, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <PhoneShell
                      label={screen.label}
                      accent={i === 0 && flow.screens.length > 1 ? 'border-gray-600' : 'border-violet-600'}
                    >
                      {screen.node}
                    </PhoneShell>
                    {i < flow.screens.length - 1 && <Arrow2 label="tap →" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SettingsAnalyticsFlow() {
  return (
    <div className="space-y-8">

      {/* Flow cards */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Analytics & Storage Flows (14–18)</h2>
        <p className="text-sm text-gray-500 mb-5">
          Premium analytics screens for Owner — no technical jargon, user-friendly language throughout
        </p>
        <div className="space-y-3">
          {analyticsFlows.map((flow) => (
            <FlowCard key={flow.id} flow={flow} />
          ))}
        </div>
      </div>

      {/* All screens gallery */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Full Analytics Flow — All Screens</h2>
        <p className="text-sm text-gray-500 mb-6">
          Entry from settings → AI analytics → Voice AI → Storage → Buy More
        </p>
        <div className="flex flex-wrap gap-3 items-start justify-center">
          <PhoneShell label="Entry\n(Summary cards)" accent="border-gray-500">
            <Screen_SettingsAIEntry />
          </PhoneShell>
          <Arrow label="tap AI →" />
          <PhoneShell label="AI Usage\nAnalytics" accent="border-violet-600">
            <Screen_AIUsage />
          </PhoneShell>
          <Arrow label="tap Voice →" />
          <PhoneShell label="Voice AI\nUsage" accent="border-blue-500">
            <Screen_VoiceAI />
          </PhoneShell>
          <Arrow label="tap Storage →" />
          <PhoneShell label="Storage\nUsage" accent="border-amber-500">
            <Screen_Storage />
          </PhoneShell>
          <Arrow label="Buy More →" />
          <PhoneShell label="Buy Storage\nCheckout" accent="border-green-500">
            <Screen_BuyStorage />
          </PhoneShell>
        </div>
      </div>

      {/* Design principles */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Analytics UI Design Principles</h2>
        <p className="text-sm text-gray-500 mb-5">
          Inspired by iCloud Storage, ChatGPT usage, and Linear's clean analytics
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {analyticsDesignPrinciples.map((p) => (
            <div key={p.title} className="bg-violet-50 rounded-2xl p-4 border border-violet-100">
              <span className="text-xl block mb-2">{p.icon}</span>
              <p className="text-sm font-bold text-gray-800 mb-1">{p.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wording guide — all 8 entries */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">User-Friendly Language Guide</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-violet-100">
                <th className="text-left py-2 pr-4 text-xs font-bold text-red-500">❌ Technical (Don't Use)</th>
                <th className="text-left py-2 pr-4 text-xs font-bold text-green-600">✅ Friendly (Use This)</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {[
                ['API tokens', 'AI Usage'],
                ['Whisper API minutes', 'Voice AI Usage'],
                ['LLM inference calls', 'AI requests this month'],
                ['Token quota exhausted', 'Monthly AI limit reached'],
                ['RAG document chunks', 'Stored document pages'],
                ['Embedding vectors', 'Searchable documents'],
                ["Rate limit exceeded", "You've reached your daily limit"],
                ['Storage bucket capacity', 'Document Storage'],
              ].map(([bad, good], i) => (
                <tr key={i} className={`border-b border-violet-50 ${i % 2 === 0 ? 'bg-white/50' : ''}`}>
                  <td className="py-2 pr-4 text-red-400 font-mono">{bad}</td>
                  <td className="py-2 pr-4 text-green-700 font-semibold">{good}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7B · LANGUAGE & LOCALIZATION
// ═══════════════════════════════════════════════════════════════════════════════
// Lets users localize the app: language + country + region/state. Currency and
// time zone are NOT chosen manually — they are auto-derived from country/region.

// ── Small primitives for the localization screens ─────────────────────────────

function PickRow({ flag, label, sub, selected }: {
  flag?: string; label: string; sub?: string; selected?: boolean;
}) {
  return (
    <div className={`flex items-center gap-1.5 px-2 py-[5px] ${selected ? 'bg-violet-50' : 'bg-white'}`}>
      {flag && <span className="text-[11px] leading-none shrink-0">{flag}</span>}
      <div className="flex-1 min-w-0">
        <p className={`text-[7px] font-semibold leading-none ${selected ? 'text-violet-700' : 'text-gray-800'}`}>{label}</p>
        {sub && <p className="text-[5.5px] text-gray-400 mt-0.5 leading-none">{sub}</p>}
      </div>
      {selected
        ? <span className="text-[8px] text-violet-600 font-black leading-none">✓</span>
        : <span className="w-2.5 h-2.5 rounded-full border border-gray-200 shrink-0" />}
    </div>
  );
}

function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="mx-2 mt-1.5 mb-1 bg-gray-100 rounded-lg px-1.5 py-1 flex items-center gap-1">
      <span className="text-[7px] text-gray-400">🔍</span>
      <span className="text-[6.5px] text-gray-400">{placeholder}</span>
    </div>
  );
}

// Read-only "auto configured" row — derived value, not editable
function AutoRow({ icon, label, value, note }: {
  icon: string; label: string; value: string; note?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-[5px] bg-white">
      <div className="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center shrink-0 bg-emerald-50">
        <span className="text-[8px]">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[7px] font-medium text-gray-800 leading-none">{label}</p>
        {note && <p className="text-[5.5px] text-gray-400 mt-0.5 leading-none">{note}</p>}
      </div>
      <span className="text-[6.5px] text-gray-600 font-semibold">{value}</span>
      <span className="text-[5px] font-bold bg-emerald-100 text-emerald-700 rounded px-1 py-0.5 leading-none">AUTO</span>
    </div>
  );
}

// ── L&L screen content nodes ──────────────────────────────────────────────────

// 1 — entry point inside Personal settings
function S_LL_Entry() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Settings" />
      <div className="flex-1">
        <SH label="Personal" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="✏️" label="Edit Profile" />
          <SD /><SR icon="🔔" label="Notifications" />
          <SD /><SR icon="🎨" label="Appearance" value="Light" />
          <SD />
          {/* highlighted target row */}
          <div className="flex items-center gap-1.5 px-2 py-[5px] bg-violet-50 ring-1 ring-inset ring-violet-200">
            <div className="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center shrink-0 bg-violet-100">
              <span className="text-[8px]">🌐</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[7px] font-bold text-violet-700 leading-none">Language &amp; Localization</p>
              <p className="text-[5.5px] text-violet-400 mt-0.5 leading-none">English · India · Kerala</p>
            </div>
            <span className="text-[9px] text-violet-400 leading-none">›</span>
          </div>
          <SD /><SR icon="💜" label="Care Point Prefs" />
          <SD /><SR icon="🔒" label="Account &amp; Security" />
        </div>
        <div className="mx-2 mt-2 bg-violet-50 rounded-lg px-1.5 py-1 border border-violet-100">
          <p className="text-[6px] text-violet-700 leading-snug">
            Localize the whole app — language, region, and the formats derived from them.
          </p>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// 2 — Language & Localization hub
function S_LL_Main() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Language & Localization" />
      <div className="flex-1 overflow-y-auto bg-[#f8f7ff]">
        <SH label="Language" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="🗣️" label="App Language" value="English" />
        </div>
        <SH label="Region" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <div className="flex items-center gap-1.5 px-2 py-[5px] bg-white">
            <span className="text-[10px] shrink-0">🇮🇳</span>
            <p className="text-[7px] font-medium text-gray-800 flex-1">Country</p>
            <span className="text-[6.5px] text-gray-500 font-semibold">India</span>
            <span className="text-[9px] text-gray-300 leading-none">›</span>
          </div>
          <SD />
          <SR icon="📍" label="Region / State" value="Kerala" />
        </div>
        <SH label="Set Automatically" />
        <div className="mx-2 rounded-lg overflow-hidden border border-emerald-100">
          <AutoRow icon="💱" label="Currency" value="₹ INR" note="from country" />
          <SD />
          <AutoRow icon="🕒" label="Time Zone" value="GMT+5:30" note="IST · from region" />
        </div>
        <div className="mx-2 mt-1.5 mb-1 bg-emerald-50 rounded-lg px-1.5 py-1 border border-emerald-100 flex items-start gap-1">
          <span className="text-[7px] leading-none mt-px">✨</span>
          <p className="text-[5.5px] text-emerald-700 leading-snug">
            Currency &amp; time zone update automatically when you change country or region.
          </p>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// 3 — language picker
function S_LL_Language() {
  const langs = [
    { l: 'English', s: 'Default', sel: true },
    { l: 'हिन्दी', s: 'Hindi' },
    { l: 'മലയാളം', s: 'Malayalam' },
    { l: 'தமிழ்', s: 'Tamil' },
    { l: 'తెలుగు', s: 'Telugu' },
    { l: 'Español', s: 'Spanish' },
    { l: 'Français', s: 'French' },
    { l: 'العربية', s: 'Arabic' },
  ];
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="App Language" />
      <div className="flex-1 overflow-y-auto bg-white">
        <SearchBar placeholder="Search languages…" />
        <SH label="Choose Language" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          {langs.map((x, i) => (
            <div key={x.l}>
              {i > 0 && <SD />}
              <PickRow label={x.l} sub={x.s} selected={x.sel} />
            </div>
          ))}
        </div>
        <div className="px-2 pt-1.5">
          <div className="bg-violet-600 rounded-xl text-center py-1.5">
            <span className="text-[7.5px] font-bold text-white">Apply</span>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// 4 — country picker
function S_LL_Country() {
  const countries = [
    { f: '🇮🇳', l: 'India', s: '₹ INR · GMT+5:30', sel: true },
    { f: '🇺🇸', l: 'United States', s: '$ USD · GMT−5:00' },
    { f: '🇬🇧', l: 'United Kingdom', s: '£ GBP · GMT+0:00' },
    { f: '🇦🇪', l: 'UAE', s: 'د.إ AED · GMT+4:00' },
    { f: '🇦🇺', l: 'Australia', s: '$ AUD · GMT+10:00' },
    { f: '🇸🇬', l: 'Singapore', s: '$ SGD · GMT+8:00' },
    { f: '🇨🇦', l: 'Canada', s: '$ CAD · GMT−5:00' },
  ];
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Country" />
      <div className="flex-1 overflow-y-auto bg-white">
        <SearchBar placeholder="Search countries…" />
        <div className="mx-2 mt-0.5 mb-1 bg-amber-50 rounded-lg px-1.5 py-1 border border-amber-100 flex items-start gap-1">
          <span className="text-[7px] leading-none mt-px">⚠️</span>
          <p className="text-[5.5px] text-amber-700 leading-snug">
            Changing country resets Region/State and re-derives currency &amp; time zone.
          </p>
        </div>
        <SH label="Select Country" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          {countries.map((x, i) => (
            <div key={x.l}>
              {i > 0 && <SD />}
              <PickRow flag={x.f} label={x.l} sub={x.s} selected={x.sel} />
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// 5 — region / state picker (depends on selected country = India)
function S_LL_Region() {
  const states = [
    { l: 'Kerala', s: 'GMT+5:30', sel: true },
    { l: 'Karnataka', s: 'GMT+5:30' },
    { l: 'Tamil Nadu', s: 'GMT+5:30' },
    { l: 'Maharashtra', s: 'GMT+5:30' },
    { l: 'Delhi (NCT)', s: 'GMT+5:30' },
    { l: 'West Bengal', s: 'GMT+5:30' },
    { l: 'Gujarat', s: 'GMT+5:30' },
  ];
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Region / State" />
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="mx-2 mt-1.5 bg-violet-50 rounded-lg px-1.5 py-1 flex items-center gap-1 border border-violet-100">
          <span className="text-[9px]">🇮🇳</span>
          <span className="text-[6px] font-semibold text-violet-700">States of India · based on your country</span>
        </div>
        <SearchBar placeholder="Search states…" />
        <SH label="Select Region / State" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          {states.map((x, i) => (
            <div key={x.l}>
              {i > 0 && <SD />}
              <PickRow flag="📍" label={x.l} sub={x.s} selected={x.sel} />
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// 6 — saved / updated confirmation
function S_LL_Updated() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Language & Localization" />
      <div className="flex-1 overflow-y-auto bg-[#f8f7ff]">
        <div className="mx-2 mt-2 bg-emerald-50 rounded-xl border border-emerald-200 px-2 py-1.5 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
            <span className="text-[8px] text-white font-black">✓</span>
          </div>
          <p className="text-[6.5px] font-bold text-emerald-700 leading-snug">Localization updated for your account</p>
        </div>
        <SH label="Your Settings" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="🗣️" label="App Language" value="English" />
          <SD />
          <div className="flex items-center gap-1.5 px-2 py-[5px] bg-white">
            <span className="text-[10px] shrink-0">🇮🇳</span>
            <p className="text-[7px] font-medium text-gray-800 flex-1">Country</p>
            <span className="text-[6.5px] text-gray-500 font-semibold">India</span>
          </div>
          <SD />
          <SR icon="📍" label="Region / State" value="Kerala" />
        </div>
        <SH label="Auto-Applied" />
        <div className="mx-2 rounded-lg overflow-hidden border border-emerald-100">
          <AutoRow icon="💱" label="Currency" value="₹ INR" note="Indian Rupee" />
          <SD />
          <AutoRow icon="🕒" label="Time Zone" value="GMT+5:30" note="IST" />
        </div>
        <div className="mx-2 mt-1.5 bg-white rounded-lg px-1.5 py-1 border border-gray-100">
          <p className="text-[5.5px] text-gray-500 leading-snug">
            Dates, prices and reminders across Tasks, Calendar &amp; Expenses now use these formats.
          </p>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Exported: Language & Localization flow ────────────────────────────────────
export function SettingsLanguageLocalizationFlow() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    { title: 'Entry in Settings', desc: 'A "Language & Localization" row sits under Personal settings, showing the current setup at a glance.', screen: <S_LL_Entry />, accent: 'border-gray-600' },
    { title: 'Localization Hub', desc: 'Language, Country and Region/State are editable. Currency & Time Zone are shown as auto-derived (read-only).', screen: <S_LL_Main />, accent: 'border-violet-600' },
    { title: 'Select Language', desc: 'Searchable list of supported languages. Tapping one applies it instantly across the app UI.', screen: <S_LL_Language />, accent: 'border-violet-500' },
    { title: 'Select Country', desc: 'Searchable country list. Each shows the currency + time zone it will derive. Changing it resets Region.', screen: <S_LL_Country />, accent: 'border-blue-500' },
    { title: 'Select Region / State', desc: 'State list filtered by the chosen country — drives the precise time zone.', screen: <S_LL_Region />, accent: 'border-pink-500' },
    { title: 'Updated & Auto-Applied', desc: 'Confirmation showing currency & time zone were configured automatically from the choices.', screen: <S_LL_Updated />, accent: 'border-emerald-500' },
  ];

  return (
    <div className="space-y-8">

      {/* Explainer */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-2xl">🌐</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Language &amp; Localization</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Lets users customize language and regional settings for a localized experience. The key idea:
              users pick only <strong>three</strong> things — language, country, and region/state. From those,
              the app <strong>automatically configures currency and time zone</strong>, so formatting stays
              correct everywhere without extra setup.
            </p>
          </div>
        </div>

        {/* Manual vs Auto split */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-violet-50 rounded-2xl p-4 border border-violet-100">
            <p className="text-xs font-bold text-violet-800 mb-2">👆 User Chooses</p>
            <ul className="space-y-1.5">
              {[
                ['🗣️', 'Language', 'App UI language'],
                ['🇮🇳', 'Country', 'Your country of residence'],
                ['📍', 'Region / State', 'List depends on the country'],
              ].map(([e, t, d]) => (
                <li key={t} className="flex items-center gap-2 text-xs text-gray-700">
                  <span>{e}</span><strong>{t}</strong>
                  <span className="text-gray-400">— {d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <p className="text-xs font-bold text-emerald-800 mb-2">✨ App Derives Automatically</p>
            <ul className="space-y-1.5">
              {[
                ['💱', 'Currency', 'From country → e.g. India = ₹ INR'],
                ['🕒', 'Time Zone', 'From region → e.g. Kerala = IST GMT+5:30'],
              ].map(([e, t, d]) => (
                <li key={t} className="flex items-center gap-2 text-xs text-gray-700">
                  <span>{e}</span><strong>{t}</strong>
                  <span className="text-gray-400">— {d}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-emerald-600 mt-2 leading-snug">
              Shown read-only with an <span className="font-bold">AUTO</span> badge — re-derived whenever country/region changes.
            </p>
          </div>
        </div>

        {/* Derivation chain */}
        <div className="mt-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <p className="text-xs font-bold text-gray-700 mb-2">Derivation Chain</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div className="bg-white rounded-xl px-3 py-1.5 border border-violet-200 font-bold text-violet-700">Country</div>
            <span className="text-gray-400">→</span>
            <div className="bg-white rounded-xl px-3 py-1.5 border border-emerald-200 text-emerald-700 font-medium">Currency</div>
            <span className="text-gray-300 mx-1">·</span>
            <div className="bg-white rounded-xl px-3 py-1.5 border border-violet-200 font-bold text-violet-700">Region / State</div>
            <span className="text-gray-400">→</span>
            <div className="bg-white rounded-xl px-3 py-1.5 border border-emerald-200 text-emerald-700 font-medium">Time Zone</div>
          </div>
        </div>
      </div>

      {/* Flow screens — expandable step accordion */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Complete Flow — 6 Screens</h2>
        <p className="text-sm text-gray-500 mb-6">Click each step to explore the screen detail</p>

        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="border-2 rounded-2xl overflow-hidden border-violet-100">
              <motion.button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-violet-50/40 transition-colors text-left"
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                whileTap={{ scale: 0.99 }}
              >
                <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-black text-white">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
                {activeStep === i ? (
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </motion.button>

              <AnimatePresence>
                {activeStep === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 pt-2 bg-violet-50/20 border-t border-violet-100 flex justify-center">
                      <PhoneShell label={`Screen ${i + 1}: ${step.title}`} accent={step.accent}>
                        {step.screen}
                      </PhoneShell>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Full flow gallery */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Full Flow — All 6 Screens</h2>
        <p className="text-sm text-gray-500 mb-6">Settings → Localization hub → Language · Country · Region → auto-applied</p>
        <div className="flex flex-wrap gap-4 items-start justify-center">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <PhoneShell label={`${i + 1}. ${step.title}`} accent={step.accent}>
                {step.screen}
              </PhoneShell>
              {i < steps.length - 1 && (
                <div className="flex flex-col items-center justify-center mt-20 gap-1">
                  <span className="text-gray-300 text-2xl">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7C · HOUSEHOLD MEMBER · CURRENT STATUS (CAPACITY)
// ═══════════════════════════════════════════════════════════════════════════════
// Settings → Household Members → [Name] → Current Status
//   🟢 Full capacity   🟡 Reduced capacity (custom %)   🔴 On rest
// Only the admin OR the member themselves can change a member's status. The status
// feeds the AI so task load is shared fairly (a resting member isn't assigned work).

// ── Status primitives ─────────────────────────────────────────────────────────

type CapKey = 'full' | 'reduced' | 'rest';

const CAP: Record<CapKey, { dot: string; ring: string; bg: string; text: string; label: string; emoji: string }> = {
  full:    { dot: 'bg-green-500',  ring: 'border-green-400',  bg: 'bg-green-50',  text: 'text-green-700',  label: 'Full capacity',    emoji: '🟢' },
  reduced: { dot: 'bg-amber-400',  ring: 'border-amber-400',  bg: 'bg-amber-50',  text: 'text-amber-700',  label: 'Reduced capacity', emoji: '🟡' },
  rest:    { dot: 'bg-red-500',    ring: 'border-red-400',    bg: 'bg-red-50',    text: 'text-red-700',    label: 'On rest',          emoji: '🔴' },
};

// pill badge used on member rows
function StatusPill({ k, pct }: { k: CapKey; pct?: number }) {
  const c = CAP[k];
  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-1 py-0.5 ${c.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      <span className={`text-[5.5px] font-bold ${c.text}`}>
        {k === 'reduced' && pct !== undefined ? `${pct}%` : c.label}
      </span>
    </span>
  );
}

// ── Current Status screen content nodes ───────────────────────────────────────

// 1 — Household members list with live status, tap a member
function S_CS_Members() {
  const members: { n: string; r: string; c: string; k: CapKey; pct?: number }[] = [
    { n: 'Natasha', r: 'Admin', c: 'bg-violet-500', k: 'full' },
    { n: 'James', r: 'Organizer', c: 'bg-blue-500', k: 'reduced', pct: 60 },
    { n: 'Stella', r: 'Member', c: 'bg-pink-400', k: 'rest' },
    { n: 'Oliver', r: 'Child', c: 'bg-amber-400', k: 'full' },
  ];
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Household Members" />
      <div className="flex-1">
        <div className="mx-2 mt-1.5 bg-violet-50 rounded-lg px-1.5 py-1 flex items-center gap-1 border border-violet-100">
          <span className="text-[8px]">👨‍👩‍👧‍👦</span>
          <span className="text-[6.5px] font-semibold text-violet-700">Thaikaattu Family · live capacity</span>
        </div>
        <SH label="Members" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          {members.map((m, i) => (
            <div key={m.n}>
              {i > 0 && <SD />}
              <div className={`flex items-center gap-1.5 px-2 py-[5px] ${m.n === 'James' ? 'bg-violet-50 ring-1 ring-inset ring-violet-200' : 'bg-white'}`}>
                <div className="relative">
                  <div className={`w-6 h-6 rounded-lg ${m.c} flex items-center justify-center`}>
                    <span className="text-[8px] font-black text-white">{m.n[0]}</span>
                  </div>
                  <div className={`absolute -bottom-px -right-px w-2 h-2 rounded-full ${CAP[m.k].dot} border border-white`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[7px] font-semibold text-gray-800 leading-none">{m.n}</p>
                  <p className="text-[5.5px] text-gray-400 mt-0.5 leading-none">{m.r}</p>
                </div>
                <StatusPill k={m.k} pct={m.pct} />
                <span className="text-[9px] text-gray-300">›</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-2 mt-2 bg-gray-50 rounded-lg px-1.5 py-1 border border-gray-100 flex items-start gap-1">
          <span className="text-[7px] leading-none mt-px">🤖</span>
          <p className="text-[5.5px] text-gray-500 leading-snug">
            Liv balances task load using each member's current capacity.
          </p>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// 2 — Member detail with Current Status row
function S_CS_MemberDetail() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="James" />
      <div className="flex-1 overflow-y-auto bg-[#f8f7ff]">
        {/* member header */}
        <div className="bg-white px-2 pt-2 pb-1.5 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-sm">
              <span className="text-[12px] font-black text-white">J</span>
            </div>
            <div className="flex-1">
              <p className="text-[8.5px] font-black text-gray-900 leading-tight">James Thaikaattu</p>
              <p className="text-[6.5px] text-blue-600 font-semibold leading-tight">Organizer</p>
            </div>
            <StatusPill k="reduced" pct={60} />
          </div>
        </div>
        <SH label="Availability" />
        <div className="mx-2 rounded-lg overflow-hidden border border-amber-100">
          {/* current status row — highlighted target */}
          <div className="flex items-center gap-1.5 px-2 py-[5px] bg-amber-50">
            <div className="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center shrink-0 bg-amber-100">
              <span className="text-[8px]">⚡</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[7px] font-bold text-gray-800 leading-none">Current Status</p>
              <p className="text-[5.5px] text-amber-600 mt-0.5 leading-none">🟡 Reduced capacity · 60%</p>
            </div>
            <span className="text-[9px] text-gray-300">›</span>
          </div>
        </div>
        <SH label="Profile" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="👑" label="Role" value="Organizer" />
        </div>
        <div className="mx-2 mt-1.5 bg-violet-50 rounded-lg px-1.5 py-1 border border-violet-100 flex items-start gap-1">
          <span className="text-[7px] leading-none mt-px">🔒</span>
          <p className="text-[5.5px] text-violet-700 leading-snug">
            Status editable by James (self) or the family Admin only.
          </p>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// 3 — Status selector (Reduced selected, custom % slider shown)
function S_CS_Selector() {
  const options: { k: CapKey; desc: string }[] = [
    { k: 'full', desc: 'Available for normal task load' },
    { k: 'reduced', desc: 'Lighter load — set a custom %' },
    { k: 'rest', desc: 'Paused — no tasks assigned' },
  ];
  const selected: CapKey = 'reduced';
  const pct = 60;
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Current Status" />
      <div className="flex-1 overflow-y-auto bg-white">
        {/* permission banner */}
        <div className="mx-2 mt-1.5 bg-violet-50 rounded-lg px-1.5 py-1 border border-violet-100 flex items-start gap-1">
          <span className="text-[7px] leading-none mt-px">🔒</span>
          <p className="text-[5.5px] text-violet-700 leading-snug">
            Only the <strong>Admin</strong> or <strong>James</strong> can change this status.
          </p>
        </div>
        <SH label="Set Capacity" />
        <div className="mx-2 space-y-1.5">
          {options.map((o) => {
            const c = CAP[o.k];
            const on = o.k === selected;
            return (
              <div key={o.k} className={`rounded-xl border-2 px-1.5 py-1.5 ${on ? `${c.ring} ${c.bg}` : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] leading-none">{c.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[7.5px] font-bold leading-none ${on ? c.text : 'text-gray-700'}`}>{c.label}</p>
                    <p className="text-[5.5px] text-gray-400 mt-0.5 leading-none">{o.desc}</p>
                  </div>
                  {on
                    ? <span className={`w-3 h-3 rounded-full ${c.dot} flex items-center justify-center`}><span className="text-[6px] text-white font-black">✓</span></span>
                    : <span className="w-3 h-3 rounded-full border border-gray-300" />}
                </div>
                {/* custom % slider appears only for reduced when selected */}
                {o.k === 'reduced' && on && (
                  <div className="mt-1.5 pt-1.5 border-t border-amber-200">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[5.5px] font-semibold text-amber-700">Capacity level</span>
                      <span className="text-[6.5px] font-black text-amber-700">{pct}%</span>
                    </div>
                    <div className="bg-amber-100 rounded-full h-1.5 relative">
                      <div className="bg-amber-400 rounded-full h-1.5" style={{ width: `${pct}%` }} />
                      <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-amber-400 shadow" style={{ left: `calc(${pct}% - 5px)` }} />
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span className="text-[5px] text-gray-400">10%</span>
                      <span className="text-[5px] text-gray-400">90%</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="px-2 pt-2 pb-1">
          <div className="bg-violet-600 rounded-xl text-center py-1.5">
            <span className="text-[7.5px] font-bold text-white">Save Status</span>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// 4 — Saved confirmation
function S_CS_Saved() {
  return (
    <div style={{ minHeight: 260 }} className="flex flex-col">
      <TopBar title="Current Status" />
      <div className="flex-1 overflow-y-auto bg-[#f8f7ff]">
        <div className="mx-2 mt-2 bg-amber-50 rounded-xl border border-amber-200 px-2 py-1.5 flex items-center gap-1.5">
          <span className="text-[12px]">🟡</span>
          <div className="flex-1">
            <p className="text-[7px] font-black text-amber-700 leading-tight">Reduced capacity · 60%</p>
            <p className="text-[5.5px] text-amber-500 leading-tight">Status updated for James</p>
          </div>
        </div>
        <SH label="What changes" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <SR icon="🤖" label="AI assigns ~40% less to James" />
          <SD /><SR icon="🔄" label="Redistributes to full-capacity members" />
          <SD /><SR icon="💜" label="Care Point expectations adjusted" />
          <SD /><SR icon="👀" label="New status visible to the family" />
        </div>
        <SH label="Member" />
        <div className="mx-2 rounded-lg overflow-hidden border border-gray-100">
          <div className="flex items-center gap-1.5 px-2 py-[5px] bg-white">
            <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center">
              <span className="text-[8px] font-black text-white">J</span>
            </div>
            <p className="text-[7px] font-semibold text-gray-800 flex-1">James</p>
            <StatusPill k="reduced" pct={60} />
          </div>
        </div>
        <div className="mx-2 mt-1.5 bg-white rounded-lg px-1.5 py-1 border border-gray-100">
          <p className="text-[5.5px] text-gray-500 leading-snug">
            Change it back anytime — set to 🟢 Full capacity when James is ready for normal load.
          </p>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Exported: Member Current Status flow ──────────────────────────────────────
export function SettingsMemberStatusFlow() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    { title: 'Household Members', desc: 'Each member shows a live capacity dot + status pill. Tap a member to open them.', screen: <S_CS_Members />, accent: 'border-violet-600' },
    { title: 'Member · Current Status', desc: 'The member profile surfaces a "Current Status" row under Availability, with a permission note.', screen: <S_CS_MemberDetail />, accent: 'border-amber-500' },
    { title: 'Set Capacity', desc: 'Pick 🟢 Full / 🟡 Reduced / 🔴 On rest. Reduced reveals a custom % slider. Admin or self only.', screen: <S_CS_Selector />, accent: 'border-amber-400' },
    { title: 'Saved & Applied', desc: 'Confirms the new status and explains how AI task assignment & care points adapt.', screen: <S_CS_Saved />, accent: 'border-green-500' },
  ];

  return (
    <div className="space-y-8">

      {/* Explainer */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-2xl">⚡</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Household Member · Current Status</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">Settings → Household Members → [Name] → Current Status</span>
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">
              A lightweight way to signal how much each person can take on right now. The AI uses it to share
              the household load fairly — nobody on rest gets assigned tasks, and a reduced-capacity member
              gets a lighter share.
            </p>
          </div>
        </div>

        {/* 3 status options */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {([
            { k: 'full' as CapKey, sub: 'Normal task load — fully available' },
            { k: 'reduced' as CapKey, sub: 'Lighter load with a custom % (e.g. 60%)' },
            { k: 'rest' as CapKey, sub: 'Paused — no tasks assigned at all' },
          ]).map(({ k, sub }) => {
            const c = CAP[k];
            return (
              <div key={k} className={`rounded-2xl border ${c.ring} ${c.bg} p-4`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{c.emoji}</span>
                  <p className={`text-sm font-bold ${c.text}`}>{c.label}</p>
                </div>
                <p className="text-xs text-gray-600 leading-snug">{sub}</p>
              </div>
            );
          })}
        </div>

        {/* Permission rule */}
        <div className="mt-4 bg-violet-50 rounded-2xl p-4 border border-violet-100 flex items-start gap-3">
          <span className="text-xl">🔒</span>
          <div>
            <p className="text-sm font-bold text-violet-800 mb-0.5">Who can set it</p>
            <p className="text-xs text-violet-700 leading-relaxed">
              Only the family <strong>Admin</strong> or the <strong>member themselves</strong> can change a member's
              current status. Everyone can see it; not everyone can edit it.
            </p>
          </div>
        </div>
      </div>

      {/* Flow screens — expandable step accordion */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Complete Flow — 4 Screens</h2>
        <p className="text-sm text-gray-500 mb-6">Click each step to explore the screen detail</p>

        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="border-2 rounded-2xl overflow-hidden border-violet-100">
              <motion.button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-violet-50/40 transition-colors text-left"
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                whileTap={{ scale: 0.99 }}
              >
                <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-black text-white">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
                {activeStep === i ? (
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </motion.button>

              <AnimatePresence>
                {activeStep === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 pt-2 bg-violet-50/20 border-t border-violet-100 flex justify-center">
                      <PhoneShell label={`Screen ${i + 1}: ${step.title}`} accent={step.accent}>
                        {step.screen}
                      </PhoneShell>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Full flow gallery */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Full Flow — All 4 Screens</h2>
        <p className="text-sm text-gray-500 mb-6">Members list → Member profile → Set capacity → Saved & applied</p>
        <div className="flex flex-wrap gap-4 items-start justify-center">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <PhoneShell label={`${i + 1}. ${step.title}`} accent={step.accent}>
                {step.screen}
              </PhoneShell>
              {i < steps.length - 1 && (
                <div className="flex flex-col items-center justify-center mt-20 gap-1">
                  <span className="text-gray-300 text-2xl">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
