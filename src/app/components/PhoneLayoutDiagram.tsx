import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye, Paperclip, Palette, Cloud, Share2, History, AlertTriangle,
  Grid3x3, ChevronDown, ChevronUp, Filter, BrainCircuit,
  LayoutGrid, Bell, MessageSquare, LayoutDashboard, Zap, Bot,
  CalendarCheck, CheckSquare, ShoppingCart, DollarSign, Activity,
  ArrowDown, FolderOpen, Sparkles, ArrowRightLeft,
  Cpu, RefreshCw, Shield,
  ScanLine, BarChart2, Camera, Brain, MessageCircle, Lock, Wifi, CreditCard, TrendingUp, List, Plus,
  GripVertical, Mic, Lightbulb, Store, LayoutTemplate, SlidersHorizontal, Archive, LayoutList, Type, PlusCircle, Calendar,
  Inbox, UserCheck, Flag, CalendarClock, RotateCcw, FileText, Scale,
  Search, Grid,
} from 'lucide-react';

// ── Reusable Phone Shell ──────────────────────────────────────────
function PhoneShell({
  children,
  label,
  sublabel,
  highlight = false,
  accent = 'border-gray-700',
  showScan = true,
}: {
  children: React.ReactNode;
  label?: string;
  sublabel?: string;
  highlight?: boolean;
  accent?: string;
  showScan?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative flex flex-col rounded-[2rem] border-[4px] shadow-2xl overflow-hidden w-36 ${
          highlight ? 'border-indigo-600' : accent
        } bg-gray-800`}
      >
        <div className="bg-gray-800 flex justify-between items-center px-3 py-1">
          <span className="text-[7px] text-gray-400">9:41</span>
          <div className="w-8 h-2 bg-gray-600 rounded-full" />
          <span className="text-[7px] text-gray-400">▶▶</span>
        </div>
        <div className="bg-white flex-1 overflow-hidden relative">
          {children}
          {/* Scan icon — top-right corner of every screen (except auth) */}
          {showScan && (
            <div className="absolute top-1 right-1 z-10 bg-gray-900/80 rounded-md p-0.5">
              <ScanIconSVG size={9} color="white" />
            </div>
          )}
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

// ── Scan corner-bracket icon (appears top-right on every screen) ──
function ScanIconSVG({ size = 10, color = 'white' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 9V4h5"  stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 9V4h-5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 15v5h5"  stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 15v5h-5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Shared bottom nav (highlights active tab) ─────────────────────
function BottomNav({ active }: { active: 'home' | 'grid' | 'bell' | 'profile' }) {
  const cls = (tab: string) => tab === active ? 'text-indigo-600' : 'text-gray-400';
  return (
    <div className="bg-white border-t border-gray-100 flex items-center justify-around py-1.5 px-2">
      <span className={`text-[10px] ${cls('home')}`}>🏠</span>
      <span className={`text-[11px] font-bold ${cls('grid')}`}>⊞</span>
      <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center shadow-md">
        <span className="text-[8px] text-white">🤖</span>
      </div>
      <span className={`text-[10px] ${cls('bell')}`}>🔔</span>
      <span className={`text-[10px] ${cls('profile')}`}>👤</span>
    </div>
  );
}

function Arrow({ label, direction = 'right' }: { label?: string; direction?: 'right' | 'down' }) {
  if (direction === 'down') {
    return (
      <div className="flex flex-col items-center gap-1 py-2">
        {label && <span className="text-[10px] text-gray-500 font-medium text-center max-w-[90px]">{label}</span>}
        <div className="text-gray-400 text-2xl leading-none">↓</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-2 shrink-0">
      {label && <span className="text-[10px] text-gray-500 font-medium text-center max-w-[72px]">{label}</span>}
      <div className="text-gray-400 text-2xl leading-none">→</div>
    </div>
  );
}

// ── ONBOARDING SCREENS ────────────────────────────────────────────

// ── ONBOARDING SCREENS — dark-themed, card-based (reference: Perhe.app style) ──

function LoginScreen() {
  return (
    <div className="flex flex-col bg-black" style={{ minHeight: 280 }}>
      {/* Logo hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-6 pb-3">
        <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center mb-3 shadow-lg">
          <span className="text-white text-[20px] font-black">F</span>
        </div>
        <div className="text-[13px] font-black text-white tracking-tight">Famant</div>
        <div className="text-[6px] text-gray-400 mt-0.5 mb-1">Your Family OS</div>
        <div className="text-[5px] text-gray-600 text-center">Calendar · Tasks · Expenses · Documents</div>
      </div>
      {/* Action cards */}
      <div className="px-3 pb-4 space-y-2">
        <div className="bg-white rounded-2xl px-3 py-2.5 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-indigo-100 flex items-center justify-center">
            <span className="text-[11px]">📱</span>
          </div>
          <div className="flex-1">
            <div className="text-[7px] font-bold text-indigo-700">Continue with Phone</div>
            <div className="text-[5px] text-gray-400">+91 · OTP verification</div>
          </div>
          <div className="text-[9px] text-gray-400 font-bold">›</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl px-3 py-2 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-gray-800 flex items-center justify-center text-[9px] font-bold text-red-400">G</div>
          <div className="text-[7px] text-gray-200 flex-1">Continue with Google</div>
          <div className="text-[9px] text-gray-600 font-bold">›</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl px-3 py-2 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-gray-800 flex items-center justify-center text-[10px]"></div>
          <div className="text-[7px] text-gray-200 flex-1">Continue with Apple</div>
          <div className="text-[9px] text-gray-600 font-bold">›</div>
        </div>
        <div className="text-[4px] text-gray-700 text-center mt-1">By continuing you agree to our Terms & Privacy Policy</div>
      </div>
    </div>
  );
}

function JoinCreateScreen() {
  return (
    <div className="flex flex-col bg-black" style={{ minHeight: 280 }}>
      <div className="flex-1 flex flex-col items-center justify-center px-3 pt-5 pb-2">
        <div className="w-12 h-12 rounded-full bg-indigo-900 border border-indigo-700 flex items-center justify-center mb-3">
          <span className="text-[18px]">🏠</span>
        </div>
        <div className="text-[11px] font-black text-white">Set up Famant</div>
        <div className="text-[5px] text-gray-400 mt-0.5 text-center">Your family's own workspace</div>
      </div>
      <div className="px-3 pb-4 space-y-2">
        <div className="bg-white rounded-2xl px-3 py-2.5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
            <span className="text-[13px]">🏠</span>
          </div>
          <div className="flex-1">
            <div className="text-[7px] font-bold text-indigo-800">Create a Family</div>
            <div className="text-[5px] text-gray-400">I'm the first from my family</div>
          </div>
          <div className="text-[9px] text-gray-400 font-bold">›</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl px-3 py-2.5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gray-800 flex items-center justify-center">
            <span className="text-[13px]">👨‍👩‍👧</span>
          </div>
          <div className="flex-1">
            <div className="text-[7px] font-bold text-gray-200">I have an invite</div>
            <div className="text-[5px] text-gray-500">Someone invited me to their family</div>
          </div>
          <div className="text-[9px] text-gray-600 font-bold">›</div>
        </div>
        <div className="text-center pt-1">
          <div className="text-[5px] text-gray-600 underline">Already have an account? Sign in</div>
        </div>
      </div>
    </div>
  );
}

function CreateFamilyScreen() {
  return (
    <div className="flex flex-col bg-black" style={{ minHeight: 280 }}>
      <div className="flex items-center gap-1.5 px-3 pt-3 pb-1">
        <span className="text-[9px] text-gray-500">←</span>
        <span className="text-[6px] text-gray-500">Back</span>
      </div>
      <div className="flex flex-col items-center px-3 pb-2">
        <div className="w-11 h-11 rounded-full bg-indigo-900 border border-indigo-700 flex items-center justify-center mb-2">
          <span className="text-[16px]">🏠</span>
        </div>
        <div className="text-[10px] font-black text-white">Create your family</div>
        <div className="text-[5px] text-gray-500 mt-0.5">Name it and invite members</div>
      </div>
      <div className="flex-1 px-3 pb-3 flex flex-col gap-2">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl px-3 py-2.5">
          <div className="text-[4px] text-gray-600 uppercase tracking-wide mb-0.5">Family Name</div>
          <div className="text-[8px] font-semibold text-white">Thaikaattu Family</div>
        </div>
        <div className="mt-auto bg-indigo-600 rounded-2xl py-2 text-center">
          <span className="text-[7px] font-bold text-white">Create Family & Enter →</span>
        </div>
      </div>
    </div>
  );
}

function JoinFamilyScreen() {
  return (
    <div className="flex flex-col bg-black" style={{ minHeight: 280 }}>
      <div className="flex items-center gap-1.5 px-3 pt-3 pb-1">
        <span className="text-[9px] text-gray-500">←</span>
      </div>
      <div className="flex flex-col items-center px-3 pb-2">
        <div className="w-11 h-11 rounded-full bg-blue-900 border border-blue-700 flex items-center justify-center mb-2">
          <span className="text-[16px]">👨‍👩‍👧</span>
        </div>
        <div className="text-[10px] font-black text-white">Join family</div>
        <div className="text-[5px] text-gray-500 mt-0.5">Choose how to join</div>
      </div>
      <div className="px-3 pb-3 space-y-1.5">
        <div className="text-[4px] text-gray-500 uppercase tracking-wide">I'm joining as…</div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="bg-blue-900 border-2 border-blue-500 rounded-2xl p-2 flex flex-col items-center gap-0.5">
            <span className="text-[14px]">👩</span>
            <div className="text-[5px] font-bold text-blue-300">An adult</div>
            <div className="text-[4px] text-blue-500 text-center">Parent / guardian</div>
            <div className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-[5px] text-white mt-0.5">✓</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-2 flex flex-col items-center gap-0.5">
            <span className="text-[14px]">👦</span>
            <div className="text-[5px] font-bold text-gray-300">A child</div>
            <div className="text-[4px] text-gray-600 text-center">Young member</div>
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl px-2.5 py-2 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gray-800 flex items-center justify-center text-[10px]">⊞</div>
          <div className="flex-1">
            <div className="text-[6px] font-bold text-gray-200">Scan QR code</div>
            <div className="text-[4px] text-gray-500">Fastest — scan from parent's phone</div>
          </div>
          <div className="text-[9px] text-gray-600 font-bold">›</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl px-2.5 py-2 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gray-800 flex items-center justify-center text-[8px] text-gray-400 font-bold">123</div>
          <div className="flex-1">
            <div className="text-[6px] font-bold text-gray-200">Enter invite code</div>
            <div className="text-[4px] text-gray-500">6-character code from family</div>
          </div>
          <div className="text-[9px] text-gray-600 font-bold">›</div>
        </div>
      </div>
    </div>
  );
}

// New: Profile setup screen — who are you in the family + avatar picker
function ProfileSetupScreen() {
  const avatars = ['👩','👨','👴','👵','🧒','👧','👦','🧔','👩‍🦰','👩‍🦱','🧕','👱','🧑','👩‍🦳','👨‍🦳','👩‍🦲'];
  return (
    <div className="flex flex-col bg-black" style={{ minHeight: 280 }}>
      <div className="flex items-center gap-1.5 px-3 pt-3 pb-1">
        <span className="text-[9px] text-gray-500">←</span>
      </div>
      <div className="flex flex-col items-center px-3 pb-2">
        <div className="w-11 h-11 rounded-full bg-gray-800 border-2 border-teal-500 flex items-center justify-center mb-2">
          <span className="text-[18px]">👩</span>
        </div>
        <div className="text-[10px] font-black text-white">Who are you in the family?</div>
        <div className="text-[5px] text-gray-500 mt-0.5">Pick your avatar &amp; nickname</div>
      </div>
      <div className="flex-1 px-3 pb-3 space-y-2">
        <div className="bg-gray-900 border border-gray-800 rounded-xl px-2.5 py-1.5">
          <div className="text-[4px] text-gray-600 uppercase mb-0.5">Nickname</div>
          <div className="text-[7px] text-white">Natasha</div>
        </div>
        <div className="text-[4px] text-gray-500 uppercase tracking-wide">Select your character</div>
        <div className="grid grid-cols-8 gap-1">
          {avatars.map((a,i)=>(
            <div key={i} className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] ${i===0?'bg-teal-900 border-2 border-teal-500':'bg-gray-900 border border-gray-800'}`}>{a}</div>
          ))}
        </div>
        <div className="bg-teal-500 rounded-2xl py-2 text-center">
          <span className="text-[7px] font-bold text-black">Next →</span>
        </div>
      </div>
    </div>
  );
}

// New: Waiting for admin approval (join flow)
function WaitingApprovalScreen() {
  return (
    <div className="flex flex-col bg-black" style={{ minHeight: 280 }}>
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-14 h-14 rounded-full bg-indigo-900 flex items-center justify-center mb-3">
          <span className="text-[24px]">⏳</span>
        </div>
        <div className="text-[11px] font-black text-white mb-1.5">Waiting for approval</div>
        <div className="text-[5px] text-gray-400 leading-relaxed mb-2">
          Your request to join <span className="text-white font-bold">Thaikaattu Family</span> is waiting for approval from an admin.
        </div>
        <div className="text-[5px] text-gray-500">You'll be notified when your request is processed.</div>
        <div className="w-24 h-1 bg-gray-800 rounded-full mt-4 overflow-hidden">
          <div className="w-1/3 h-full bg-indigo-500 rounded-full"/>
        </div>
      </div>
      <div className="px-3 pb-4">
        <div className="border border-red-900 rounded-2xl py-2 text-center">
          <span className="text-[6px] font-medium text-red-500">Cancel and delete account</span>
        </div>
      </div>
    </div>
  );
}

// ── Sectograph Ring — multi-color arc ring matching the sectograph colors ──
// Segment colors: #f97316=tasks(orange), #8b5cf6=events(purple), #ef4444=conflict(red), #e5e7eb=free(gray)
type ArcSegment = { color: string; ratio: number };
function SectographRing({ segments, size = 22 }: { segments: ArcSegment[]; size?: number }) {
  const r = size / 2 - 1.5;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  let accumulated = 0;
  return (
    <svg width={size} height={size} className="absolute inset-0" style={{ transform: 'rotate(-90deg)' }}>
      {segments.map((seg, i) => {
        const dashLen = circ * seg.ratio;
        const offset = -accumulated;
        accumulated += dashLen;
        return (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={seg.color} strokeWidth="2"
            strokeDasharray={`${dashLen} ${circ - dashLen}`}
            strokeDashoffset={offset}
            strokeLinecap="butt"
          />
        );
      })}
    </svg>
  );
}

// member data — segments match sectograph colors shown in each member's view
const MEMBERS = [
  {
    name: 'Mom', color: 'bg-pink-400',
    segments: [
      { color: '#f97316', ratio: 0.40 },  // tasks — orange
      { color: '#8b5cf6', ratio: 0.18 },  // events — purple
      { color: '#ef4444', ratio: 0.12 },  // conflict — red
      { color: '#e5e7eb', ratio: 0.30 },  // free — gray
    ],
  },
  {
    name: 'John', color: 'bg-blue-400',
    segments: [
      { color: '#f97316', ratio: 0.18 },
      { color: '#8b5cf6', ratio: 0.10 },
      { color: '#e5e7eb', ratio: 0.72 },
    ],
  },
  {
    name: 'Dad', color: 'bg-orange-400',
    segments: [
      { color: '#f97316', ratio: 0.45 },  // tasks — orange
      { color: '#8b5cf6', ratio: 0.20 },  // events — purple
      { color: '#ef4444', ratio: 0.15 },  // conflict — red
      { color: '#e5e7eb', ratio: 0.20 },  // free — gray
    ],
  },
  {
    name: 'M', color: 'bg-purple-400',
    segments: [
      { color: '#f97316', ratio: 0.12 },
      { color: '#8b5cf6', ratio: 0.06 },
      { color: '#e5e7eb', ratio: 0.82 },
    ],
  },
];

function MemberAvatar({
  name, color, segments, active = false, activeRingColor = 'ring-pink-400',
}: { name: string; color: string; segments: ArcSegment[]; active?: boolean; activeRingColor?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="relative" style={{ width: 22, height: 22 }}>
        <SectographRing segments={segments} size={22} />
        <div
          className={`absolute rounded-full ${color} flex items-center justify-center text-[5px] text-white font-bold`}
          style={{ width: 16, height: 16, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          {name[0]}
        </div>
      </div>
      <span className={`text-[4px] ${active ? `font-bold ${activeRingColor.replace('ring-', 'text-')}` : 'text-gray-400'}`}>{name}</span>
    </div>
  );
}

// ── Dashboard Screen ──────────────────────────────────────────────
function DashboardScreen() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 480 }}>
      <div className="bg-white px-2 pt-2 pb-1.5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[6px]">🏠</div>
            <span className="text-[7px] font-bold text-gray-800">Thaikaattu Family</span>
            <span className="text-[6px] text-gray-400">▾</span>
          </div>
        </div>
        {/* Member avatars with sectograph rings */}
        <div className="flex gap-1 mt-1.5 items-center">
          <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-[5px]">🤖</div>
          {MEMBERS.map(m => <MemberAvatar key={m.name} {...m} />)}
          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[5px] text-gray-500 font-bold">+2</div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden px-2 py-1.5 space-y-1.5 bg-gray-50">
        <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm">
          <div className="text-[9px] font-black text-gray-900 leading-tight">Good Morning<br />Natasha!</div>
          <div className="text-[5px] text-gray-400 mt-0.5">How are you feeling now?</div>
          <div className="flex gap-1.5 mt-1">{['😤', '🥰', '😄', '😊'].map(e => <div key={e} className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center text-[8px]">{e}</div>)}</div>
        </div>
        <div className="text-[5px] font-bold text-gray-400 uppercase tracking-wider px-0.5">Tasks for Today.</div>
        <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm border-l-2 border-indigo-400">
          <div className="text-[7px] font-bold text-gray-800 leading-tight">Pick up John from the cricket ground</div>
          <div className="text-[5px] text-gray-400 mt-0.5">← Leaving by 4:50 should get you there right on time.</div>
          <div className="flex gap-1 mt-1">
            <span className="text-[5px] bg-gray-100 text-gray-500 px-1 py-0.5 rounded font-semibold">MODIFY</span>
            <span className="text-[5px] bg-gray-100 text-gray-500 px-1 py-0.5 rounded font-semibold">REASSIGN ▸</span>
          </div>
        </div>
        <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm border-l-2 border-green-400">
          <div className="text-[7px] font-bold text-gray-800 leading-tight">You've got groceries to buy from Supermart.</div>
          <div className="flex gap-1 mt-1">
            <span className="text-[5px] bg-gray-100 text-gray-500 px-1 py-0.5 rounded font-semibold">MODIFY</span>
            <span className="text-[5px] bg-gray-100 text-gray-500 px-1 py-0.5 rounded font-semibold">REASSIGN ▸</span>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl px-2 py-1.5">
          <div className="text-[5px] font-bold text-purple-500 uppercase tracking-wider mb-0.5">Reminder</div>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[7px] font-bold text-gray-800">Passport Expiration</div>
              <div className="text-[5px] text-gray-500 mt-0.5">Expiring in two weeks. Set a renewal reminder?</div>
            </div>
            <div className="flex gap-0.5 mt-0.5 shrink-0">
              <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[7px]">✕</div>
              <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-[6px] text-white">✓</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm">
          <div className="text-[5px] font-bold text-gray-400 uppercase tracking-wider mb-1">Financials</div>
          <div className="flex gap-4 items-end">
            <div><div className="text-[5px] text-gray-400">Spent this month</div><div className="text-[11px] font-black text-gray-900">$2,500</div></div>
            <div><div className="text-[5px] text-gray-400">Budget</div><div className="text-[11px] font-black text-gray-400">$6,000</div></div>
          </div>
          <div className="text-[5px] text-indigo-500 font-semibold mt-0.5">VIEW DETAILED REPORT →</div>
        </div>
        <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm">
          <div className="text-[5px] font-bold text-gray-400 uppercase tracking-wider mb-1">Upcoming</div>
          <div className="text-[9px] font-black text-gray-900 leading-tight">Family Outing 🌿</div>
          <div className="flex gap-2 mt-0.5">
            <span className="text-[5px] text-gray-400">📅 12 March</span>
            <span className="text-[5px] text-gray-400">📍 New York</span>
          </div>
        </div>
      </div>
      <BottomNav active="home" />
    </div>
  );
}

// ── SECTOGRAPH SVG ────────────────────────────────────────────────
type SectographSlot = { start: number; end: number; color: string; label: string };

const MOM_SLOTS: SectographSlot[] = [
  { start: 7,    end: 7.75,  color: '#f97316', label: '7–7:45 AM · Morning prep (Task)' },
  { start: 9,    end: 10.5,  color: '#8b5cf6', label: '9–10:30 AM · Team meeting (Event)' },
  { start: 12,   end: 12.75, color: '#f97316', label: '12–12:45 PM · Lunch prep (Task)' },
  { start: 14,   end: 15.5,  color: '#f97316', label: '2–3:30 PM · Grocery run (Task)' },
  { start: 15,   end: 16.5,  color: '#ef4444', label: '3–4:30 PM ⚠ CONFLICT: School Pickup + Doctor Apt' },
  { start: 17.5, end: 18.5,  color: '#8b5cf6', label: '5:30–6:30 PM · PTA meeting (Event)' },
  { start: 19,   end: 20,    color: '#f97316', label: '7–8 PM · Cook dinner (Task)' },
];

const DAD_SLOTS: SectographSlot[] = [
  { start: 5.5,  end: 6.5,   color: '#f97316', label: '5:30–6:30 AM · Morning prep for kids (Task)' },
  { start: 8,    end: 9.5,   color: '#8b5cf6', label: '8–9:30 AM · Budget Review Meeting (Event)' },
  { start: 8.5,  end: 9.5,   color: '#ef4444', label: '8:30–9:30 AM ⚠ CONFLICT: Car Service Drop-off + Budget Meeting' },
  { start: 10.5, end: 11.25, color: '#f97316', label: '10:30–11:15 AM · Car service pickup (Task)' },
  { start: 13,   end: 14.5,  color: '#8b5cf6', label: '1–2:30 PM · Dentist Appointment (Event)' },
  { start: 16,   end: 17.5,  color: '#f97316', label: '4–5:30 PM · Fix leaking pipe at home (Task)' },
  { start: 20,   end: 21,    color: '#f97316', label: '8–9 PM · Help John with night studies (Task)' },
];

// A 24-hour circular day view: arcs for tasks, events, conflicts
function Sectograph({ slots, onSlotClick, dayWorkload }: { slots: SectographSlot[]; onSlotClick?: (slot: string) => void; dayWorkload?: string }) {
  const cx = 46, cy = 46, outerR = 36, innerR = 20;

  // angle in degrees: 0° = midnight top, clockwise
  const timeToAngle = (h: number) => (h / 24) * 360 - 90;

  function arcPath(startH: number, endH: number, r: number, ir: number) {
    const sa = (timeToAngle(startH) * Math.PI) / 180;
    const ea = (timeToAngle(endH) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(sa),  y1 = cy + r * Math.sin(sa);
    const x2 = cx + r * Math.cos(ea),  y2 = cy + r * Math.sin(ea);
    const ix1 = cx + ir * Math.cos(ea), iy1 = cy + ir * Math.sin(ea);
    const ix2 = cx + ir * Math.cos(sa), iy2 = cy + ir * Math.sin(sa);
    const large = (endH - startH) > 12 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${ir} ${ir} 0 ${large} 0 ${ix2} ${iy2} Z`;
  }

  // Clock tick labels at 6-hour marks
  const ticks = [
    { h: 0,  label: '12a' },
    { h: 6,  label: '6a' },
    { h: 12, label: '12p' },
    { h: 18, label: '6p' },
  ];

  return (
    <svg width={92} height={92} viewBox="0 0 92 92" className="mx-auto">
      {/* Background ring */}
      <circle cx={cx} cy={cy} r={outerR} fill="#f1f5f9" />
      <circle cx={cx} cy={cy} r={innerR} fill="white" />

      {/* Hour tick lines (every 3h) */}
      {[0,3,6,9,12,15,18,21].map(h => {
        const a = (timeToAngle(h) * Math.PI) / 180;
        return (
          <line key={h}
            x1={cx + (innerR+1) * Math.cos(a)} y1={cy + (innerR+1) * Math.sin(a)}
            x2={cx + (outerR-1) * Math.cos(a)} y2={cy + (outerR-1) * Math.sin(a)}
            stroke="#e2e8f0" strokeWidth={0.5}
          />
        );
      })}

      {/* Slot arcs */}
      {slots.map((s, i) => (
        <path
          key={i}
          d={arcPath(s.start, s.end, outerR, innerR)}
          fill={s.color}
          opacity={0.88}
          className="cursor-pointer hover:opacity-100"
          onClick={() => onSlotClick?.(s.label)}
        />
      ))}

      {/* Inner white circle (keeps center clean) */}
      <circle cx={cx} cy={cy} r={innerR} fill="white" />

      {/* Clock labels */}
      {ticks.map(({ h, label }) => {
        const a = (timeToAngle(h) * Math.PI) / 180;
        const lx = cx + (outerR + 7) * Math.cos(a);
        const ly = cy + (outerR + 7) * Math.sin(a);
        return <text key={h} x={lx} y={ly} fontSize={4.5} textAnchor="middle" dominantBaseline="middle" fill="#94a3b8" fontWeight="600">{label}</text>;
      })}

      {/* Center label — day workload if provided, else date */}
      {dayWorkload ? (
        <>
          <text x={cx} y={cy - 4} fontSize={6} textAnchor="middle" fill="#374151" fontWeight="bold">{dayWorkload}</text>
          <text x={cx} y={cy + 4} fontSize={3.5} textAnchor="middle" fill="#9ca3af">today</text>
        </>
      ) : (
        <>
          <text x={cx} y={cy - 3} fontSize={4.5} textAnchor="middle" fill="#374151" fontWeight="bold">TODAY</text>
          <text x={cx} y={cy + 4} fontSize={3.5} textAnchor="middle" fill="#9ca3af">18 Mar</text>
        </>
      )}
    </svg>
  );
}

// ── Sectograph Legend (tiny) ──────────────────────────────────────
function SectographLegend() {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-0.5 justify-center">
      {[
        { color: 'bg-violet-500', label: 'Event' },
        { color: 'bg-orange-500', label: 'Task' },
        { color: 'bg-red-500',    label: 'Conflict ⚠' },
      ].map(l => (
        <div key={l.label} className="flex items-center gap-0.5">
          <div className={`w-1.5 h-1.5 rounded-full ${l.color}`} />
          <span className="text-[5px] text-gray-500">{l.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Member View Screen (Mom) ──────────────────────────────────────
function MemberViewScreen({ onSlotClick }: { onSlotClick?: (label: string) => void }) {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 560 }}>

      {/* Header — same as dashboard */}
      <div className="bg-white px-2 pt-2 pb-1.5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[6px]">🏠</div>
            <span className="text-[7px] font-bold text-gray-800">Thaikaattu Family</span>
            <span className="text-[6px] text-gray-400">▾</span>
          </div>
        </div>
        <div className="flex gap-1 mt-1.5 items-center">
          <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-[5px]">🤖</div>
          {MEMBERS.map(m => <MemberAvatar key={m.name} {...m} active={m.name === 'Mom'} activeRingColor="ring-pink-400" />)}
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 bg-gray-50 px-2 py-1.5 space-y-1.5 overflow-hidden">

        {/* ── Feeling + AI message ── */}
        <div className="bg-white rounded-xl px-2 py-2 shadow-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center">
              <span className="text-[12px]">😓</span>
            </div>
            <div>
              <div className="text-[9px] font-black text-gray-900 leading-tight">Mom feeling tired</div>
            </div>
          </div>
          <div className="text-[5.5px] text-gray-500 mt-1 leading-relaxed">
            Natasha, Mom has a packed schedule today — 4 tasks and 2 events. She has a conflict at 3 PM.<br />
            Maybe help her with the grocery run? 🏠
          </div>
          {/* Workload bar */}
          <div className="mt-1.5">
            <div className="flex justify-between mb-0.5">
              <span className="text-[4.5px] text-gray-400 font-semibold">TODAY'S WORKLOAD</span>
              <span className="text-[4.5px] text-red-500 font-bold">HIGH ⚠</span>
            </div>
            <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full bg-red-400" style={{ width: '82%' }} />
            </div>
          </div>
        </div>

        {/* ── Sectograph ── */}
        <div className="bg-white rounded-xl px-2 py-2 shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[6px] font-bold text-gray-700">Day View — 18 Mar</span>
            <span className="text-[5px] text-indigo-500 font-medium">Tap arc for details</span>
          </div>
          <Sectograph slots={MOM_SLOTS} onSlotClick={onSlotClick} dayWorkload="3.5h" />
          <SectographLegend />
          {/* Conflict callout */}
          <div className="mt-1.5 bg-red-50 border border-red-200 rounded-lg px-1.5 py-1">
            <div className="text-[5px] font-bold text-red-600">⚠ Conflict detected at 3:00 – 4:30 PM</div>
            <div className="text-[4.5px] text-red-500 mt-0.5">School Pickup + Doctor Appointment overlap</div>
          </div>
        </div>

        {/* ── Her tasks today ── */}
        <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm">
          <div className="text-[5px] font-bold text-gray-400 uppercase tracking-wider mb-1">Her Tasks for Today.</div>
          <div className="space-y-1">
            {[
              { text: 'Book the gas cylinder refill', time: '7:00 AM', takeable: false },
              { text: 'Grocery run from Supermart', time: '2:00 PM', takeable: true },
              { text: 'Pick up kids from school', time: '3:00 PM', takeable: true },
              { text: 'Cook dinner', time: '7:00 PM', takeable: false },
            ].map((t) => (
              <div key={t.text} className={`flex items-start justify-between rounded-lg px-1.5 py-1 ${t.takeable ? 'bg-orange-50 border border-orange-200' : 'bg-gray-50 border border-gray-100'}`}>
                <div>
                  <div className="text-[6px] font-semibold text-gray-800 leading-tight">{t.text}</div>
                  <div className="text-[4.5px] text-gray-400">{t.time}</div>
                </div>
                {t.takeable && (
                  <div className="bg-orange-500 rounded-md px-1 py-0.5 shrink-0 ml-1">
                    <span className="text-[4.5px] text-white font-bold">ASK</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-[5px] text-indigo-500 font-semibold mt-1.5 text-right">VIEW ALL TASKS ▸</div>
        </div>

        {/* ── Her events today ── */}
        <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm">
          <div className="text-[5px] font-bold text-gray-400 uppercase tracking-wider mb-1">Her Events Today</div>
          <div className="space-y-1">
            {[
              { title: 'Team Meeting', time: '9:00 – 10:30 AM', color: 'bg-violet-400' },
              { title: 'PTA Meeting', time: '5:30 – 6:30 PM', color: 'bg-violet-400' },
            ].map((ev) => (
              <div key={ev.title} className="flex items-center gap-1.5 bg-violet-50 border border-violet-100 rounded-lg px-1.5 py-1">
                <div className={`w-1.5 h-1.5 rounded-full ${ev.color} shrink-0`} />
                <div>
                  <div className="text-[6px] font-semibold text-gray-800">{ev.title}</div>
                  <div className="text-[4.5px] text-gray-400">{ev.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Financials ── */}
        <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm">
          <div className="text-[5px] font-bold text-gray-400 uppercase tracking-wider mb-1">Financials</div>
          {[
            { icon: '🛒', label: 'Whole Foods Market', cat: 'Groceries · Oct 24', amount: '-$142.50' },
            { icon: '🎬', label: 'Netflix Subscription', cat: 'Utilities · Auto', amount: '-$15.99' },
            { icon: '🎮', label: 'Roblox Credits', cat: 'Kids · Timmy', amount: '-$10.00' },
          ].map(f => (
            <div key={f.label} className="flex items-center justify-between py-0.5">
              <div className="flex items-center gap-1">
                <div className="w-3.5 h-3.5 rounded-full bg-gray-100 flex items-center justify-center text-[6px]">{f.icon}</div>
                <div>
                  <div className="text-[6px] font-medium text-gray-800">{f.label}</div>
                  <div className="text-[4.5px] text-gray-400">{f.cat}</div>
                </div>
              </div>
              <span className="text-[6px] font-semibold text-gray-700">{f.amount}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom nav */}
      <BottomNav active="home" />
    </div>
  );
}

// ── Member View Screen (Dad) ──────────────────────────────────────
function DadMemberViewScreen({ onSlotClick }: { onSlotClick?: (label: string) => void }) {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 560 }}>

      {/* Header */}
      <div className="bg-white px-2 pt-2 pb-1.5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[6px]">🏠</div>
            <span className="text-[7px] font-bold text-gray-800">Thaikaattu Family</span>
            <span className="text-[6px] text-gray-400">▾</span>
          </div>
        </div>
        <div className="flex gap-1 mt-1.5 items-center">
          <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-[5px]">🤖</div>
          {MEMBERS.map(m => <MemberAvatar key={m.name} {...m} active={m.name === 'Dad'} activeRingColor="ring-orange-400" />)}
        </div>
      </div>

      <div className="flex-1 bg-gray-50 px-2 py-1.5 space-y-1.5 overflow-hidden">

        {/* ── Feeling + AI message ── */}
        <div className="bg-white rounded-xl px-2 py-2 shadow-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-[12px]">😤</span>
            </div>
            <div>
              <div className="text-[9px] font-black text-gray-900 leading-tight">Dad feeling stressed</div>
            </div>
          </div>
          <div className="text-[5.5px] text-gray-500 mt-1 leading-relaxed">
            Natasha, Dad has a back-to-back morning — his car service clashes with his budget meeting at 8:30 AM.<br />
            Could you handle the car pickup or the pipe fix? 🔧
          </div>
          <div className="mt-1.5">
            <div className="flex justify-between mb-0.5">
              <span className="text-[4.5px] text-gray-400 font-semibold">TODAY'S WORKLOAD</span>
              <span className="text-[4.5px] text-red-600 font-bold">CRITICAL ⚠</span>
            </div>
            <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full bg-red-500" style={{ width: '91%' }} />
            </div>
          </div>
        </div>

        {/* ── Sectograph ── */}
        <div className="bg-white rounded-xl px-2 py-2 shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[6px] font-bold text-gray-700">Day View — 18 Mar</span>
            <span className="text-[5px] text-indigo-500 font-medium">Tap arc for details</span>
          </div>
          <Sectograph slots={DAD_SLOTS} onSlotClick={onSlotClick} dayWorkload="4.5h" />
          <SectographLegend />
          <div className="mt-1.5 bg-red-50 border border-red-200 rounded-lg px-1.5 py-1">
            <div className="text-[5px] font-bold text-red-600">⚠ Conflict at 8:30 – 9:30 AM</div>
            <div className="text-[4.5px] text-red-500 mt-0.5">Car Service Drop-off + Budget Review overlap</div>
          </div>
        </div>

        {/* ── His tasks today ── */}
        <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm">
          <div className="text-[5px] font-bold text-gray-400 uppercase tracking-wider mb-1">His Tasks for Today.</div>
          <div className="space-y-1">
            {[
              { text: 'Morning prep for kids',       time: '5:30 AM', takeable: false },
              { text: 'Car service drop-off',         time: '8:30 AM', takeable: true },
              { text: 'Car service pickup',           time: '10:30 AM', takeable: true },
              { text: 'Fix leaking pipe at home',     time: '4:00 PM', takeable: true },
              { text: 'Help John with night studies', time: '8:00 PM', takeable: false },
            ].map((t) => (
              <div key={t.text} className={`flex items-start justify-between rounded-lg px-1.5 py-1 ${t.takeable ? 'bg-orange-50 border border-orange-200' : 'bg-gray-50 border border-gray-100'}`}>
                <div>
                  <div className="text-[6px] font-semibold text-gray-800 leading-tight">{t.text}</div>
                  <div className="text-[4.5px] text-gray-400">{t.time}</div>
                </div>
                {t.takeable && (
                  <div className="bg-orange-500 rounded-md px-1 py-0.5 shrink-0 ml-1">
                    <span className="text-[4.5px] text-white font-bold">ASK</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-[5px] text-indigo-500 font-semibold mt-1.5 text-right">VIEW ALL TASKS ▸</div>
        </div>

        {/* ── His events today ── */}
        <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm">
          <div className="text-[5px] font-bold text-gray-400 uppercase tracking-wider mb-1">His Events Today</div>
          <div className="space-y-1">
            {[
              { title: 'Budget Review Meeting', time: '8:00 – 9:30 AM', color: 'bg-violet-400' },
              { title: 'Dentist Appointment',   time: '1:00 – 2:30 PM', color: 'bg-violet-400' },
            ].map((ev) => (
              <div key={ev.title} className="flex items-center gap-1.5 bg-violet-50 border border-violet-100 rounded-lg px-1.5 py-1">
                <div className={`w-1.5 h-1.5 rounded-full ${ev.color} shrink-0`} />
                <div>
                  <div className="text-[6px] font-semibold text-gray-800">{ev.title}</div>
                  <div className="text-[4.5px] text-gray-400">{ev.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Financials ── */}
        <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm">
          <div className="text-[5px] font-bold text-gray-400 uppercase tracking-wider mb-1">Financials</div>
          {[
            { icon: '🚗', label: 'City Auto Service',    cat: 'Car · Maintenance',   amount: '-$180.00' },
            { icon: '📦', label: 'Amazon Prime',          cat: 'Subscriptions · Auto', amount: '-$14.99' },
            { icon: '🖊️', label: 'Office Supplies',       cat: 'Work · Oct 24',        amount: '-$32.50' },
          ].map(f => (
            <div key={f.label} className="flex items-center justify-between py-0.5">
              <div className="flex items-center gap-1">
                <div className="w-3.5 h-3.5 rounded-full bg-gray-100 flex items-center justify-center text-[6px]">{f.icon}</div>
                <div>
                  <div className="text-[6px] font-medium text-gray-800">{f.label}</div>
                  <div className="text-[4.5px] text-gray-400">{f.cat}</div>
                </div>
              </div>
              <span className="text-[6px] font-semibold text-gray-700">{f.amount}</span>
            </div>
          ))}
        </div>

      </div>

      <BottomNav active="home" />
    </div>
  );
}

// ── Dad Task Transfer Request Screen ─────────────────────────────
function DadTaskTransferRequestScreen() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 420 }}>
      <div className="bg-white px-2 pt-2 pb-1.5 border-b border-gray-100">
        <div className="flex items-center gap-1">
          <span className="text-[8px] text-gray-500">←</span>
          <div className="text-[7px] font-bold text-gray-800">Dad's Schedule</div>
        </div>
      </div>
      <div className="flex-1 bg-gray-50 px-2 py-1.5 space-y-1 relative overflow-hidden">
        <div className="opacity-30 space-y-1.5">
          <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm">
            <div className="text-[9px] font-black text-gray-900">Dad feeling stressed 😤</div>
          </div>
          <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm h-16" />
          <div className="bg-orange-50 border border-orange-200 rounded-lg px-1.5 py-1">
            <div className="text-[6px] font-semibold text-gray-800">Fix leaking pipe at home</div>
            <div className="text-[4.5px] text-gray-400">4:00 PM</div>
          </div>
        </div>

        {/* ── Bottom sheet overlay ── */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl border-t border-gray-200 px-3 pt-3 pb-2">
          <div className="w-8 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
          <div className="text-[8px] font-black text-gray-900 mb-1">Take over this task?</div>
          <div className="bg-orange-50 border border-orange-300 rounded-xl px-2 py-1.5 mb-2">
            <div className="text-[6.5px] font-bold text-gray-800">Fix leaking pipe at home</div>
            <div className="text-[5px] text-gray-500 mt-0.5">Currently assigned to Dad · 4:00 PM today</div>
          </div>
          <div className="text-[5.5px] text-gray-500 mb-2 leading-relaxed">
            Sending a permission request to Dad. He'll need to approve before the task is transferred to you.
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg px-2 py-1 mb-2">
            <div className="text-[5px] text-green-700 font-semibold">✓ You're free at 4:00 PM — no conflicts</div>
          </div>
          <div className="flex gap-1.5">
            <div className="flex-1 border border-gray-200 rounded-lg py-1.5 text-center">
              <span className="text-[6.5px] font-bold text-gray-500">Cancel</span>
            </div>
            <div className="flex-1 bg-orange-500 rounded-lg py-1.5 text-center">
              <span className="text-[6.5px] font-bold text-white">Send Request</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dad Transfer Confirmed Screen ─────────────────────────────────
function DadTransferConfirmedScreen() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 340 }}>
      <div className="bg-white px-2 pt-2 pb-1 border-b border-gray-100">
        <div className="text-[7px] font-bold text-gray-800">Notification</div>
      </div>
      <div className="flex-1 bg-gray-50 px-2 py-2 space-y-1.5">

        <div className="bg-white rounded-xl px-2 py-2 shadow-sm border-l-2 border-orange-400">
          <div className="text-[5px] text-orange-500 font-bold uppercase tracking-wide mb-0.5">Request Sent</div>
          <div className="text-[6.5px] font-bold text-gray-800">You asked to take "Fix leaking pipe"</div>
          <div className="text-[5px] text-gray-400 mt-0.5">Waiting for Dad's approval...</div>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-[5px] text-orange-500">Pending</span>
          </div>
        </div>

        <div className="bg-white rounded-xl px-2 py-2 shadow-sm border-l-2 border-green-500">
          <div className="text-[5px] text-green-600 font-bold uppercase tracking-wide mb-0.5">Dad Approved ✓</div>
          <div className="text-[6.5px] font-bold text-gray-800">"Gotcha! I'll focus on the meeting 💪" — Dad</div>
          <div className="text-[5px] text-gray-400 mt-0.5">Task transferred to your task list</div>
        </div>

        <div className="bg-green-50 border border-green-300 rounded-xl px-2 py-2 shadow-sm">
          <div className="text-[5px] text-green-700 font-bold uppercase tracking-wide mb-1">Now in Your Tasks</div>
          <div className="flex items-start gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-[6.5px] font-bold text-gray-800">Fix leaking pipe at home</div>
              <div className="text-[5px] text-gray-500">Today · 4:00 PM · Transferred from Dad</div>
            </div>
          </div>
          <div className="mt-1.5 bg-green-500 rounded-lg py-1 text-center">
            <span className="text-[6px] font-bold text-white">View in Tasks →</span>
          </div>
        </div>

        <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm">
          <div className="text-[5px] font-bold text-gray-400 uppercase tracking-wider mb-1">Dad's Updated Tasks</div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-[5.5px] text-gray-400 line-through">
              <span className="text-[8px]">✓</span> Fix leaking pipe — removed
            </div>
            <div className="flex items-center gap-1 text-[5.5px] text-gray-700">
              <span>•</span> Car service drop-off (reassigned to you)
            </div>
            <div className="flex items-center gap-1 text-[5.5px] text-gray-700">
              <span>•</span> Help John with night studies
            </div>
          </div>
          <div className="text-[5px] text-gray-400 mt-1">Workload eased · Conflict resolved ✓</div>
        </div>

      </div>
      <BottomNav active="home" />
    </div>
  );
}

// ── Task Transfer Request Screen ──────────────────────────────────
function TaskTransferRequestScreen() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 420 }}>
      {/* Header */}
      <div className="bg-white px-2 pt-2 pb-1.5 border-b border-gray-100">
        <div className="flex items-center gap-1">
          <span className="text-[8px] text-gray-500">←</span>
          <div className="text-[7px] font-bold text-gray-800">Mom's Schedule</div>
        </div>
      </div>

      {/* Mom's view — dimmed behind sheet */}
      <div className="flex-1 bg-gray-50 px-2 py-1.5 space-y-1 relative overflow-hidden">
        <div className="opacity-30 space-y-1.5">
          <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm">
            <div className="text-[9px] font-black text-gray-900">Mom feeling tired 😓</div>
          </div>
          <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm h-16" />
          <div className="bg-orange-50 border border-orange-200 rounded-lg px-1.5 py-1">
            <div className="text-[6px] font-semibold text-gray-800">Grocery run from Supermart</div>
            <div className="text-[4.5px] text-gray-400">2:00 PM</div>
          </div>
        </div>

        {/* ── Bottom sheet overlay ── */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl border-t border-gray-200 px-3 pt-3 pb-2">
          {/* Handle */}
          <div className="w-8 h-1 bg-gray-200 rounded-full mx-auto mb-2" />

          <div className="text-[8px] font-black text-gray-900 mb-1">Take over this task?</div>

          {/* Task card in sheet */}
          <div className="bg-orange-50 border border-orange-300 rounded-xl px-2 py-1.5 mb-2">
            <div className="text-[6.5px] font-bold text-gray-800">Grocery run from Supermart</div>
            <div className="text-[5px] text-gray-500 mt-0.5">Currently assigned to Mom · 2:00 PM today</div>
          </div>

          <div className="text-[5.5px] text-gray-500 mb-2 leading-relaxed">
            Sending a permission request to Mom. She'll need to approve before the task is transferred to you.
          </div>

          {/* Mom's availability check */}
          <div className="bg-green-50 border border-green-200 rounded-lg px-2 py-1 mb-2">
            <div className="text-[5px] text-green-700 font-semibold">✓ You're free at 2:00 PM — no conflicts</div>
          </div>

          <div className="flex gap-1.5">
            <div className="flex-1 border border-gray-200 rounded-lg py-1.5 text-center">
              <span className="text-[6.5px] font-bold text-gray-500">Cancel</span>
            </div>
            <div className="flex-1 bg-orange-500 rounded-lg py-1.5 text-center">
              <span className="text-[6.5px] font-bold text-white">Send Request</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Transfer Confirmed Screen ─────────────────────────────────────
function TransferConfirmedScreen() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 340 }}>
      <div className="bg-white px-2 pt-2 pb-1 border-b border-gray-100">
        <div className="text-[7px] font-bold text-gray-800">Notification</div>
      </div>
      <div className="flex-1 bg-gray-50 px-2 py-2 space-y-1.5">

        {/* Step 1: Request sent */}
        <div className="bg-white rounded-xl px-2 py-2 shadow-sm border-l-2 border-orange-400">
          <div className="text-[5px] text-orange-500 font-bold uppercase tracking-wide mb-0.5">Request Sent</div>
          <div className="text-[6.5px] font-bold text-gray-800">You asked to take "Grocery run"</div>
          <div className="text-[5px] text-gray-400 mt-0.5">Waiting for Mom's approval...</div>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-[5px] text-orange-500">Pending</span>
          </div>
        </div>

        {/* Step 2: Mom approved */}
        <div className="bg-white rounded-xl px-2 py-2 shadow-sm border-l-2 border-green-500">
          <div className="text-[5px] text-green-600 font-bold uppercase tracking-wide mb-0.5">Mom Approved ✓</div>
          <div className="text-[6.5px] font-bold text-gray-800">"Sure, go ahead! Thanks 🙏" — Mom</div>
          <div className="text-[5px] text-gray-400 mt-0.5">Task transferred to your task list</div>
        </div>

        {/* Step 3: Task now in Natasha's list */}
        <div className="bg-green-50 border border-green-300 rounded-xl px-2 py-2 shadow-sm">
          <div className="text-[5px] text-green-700 font-bold uppercase tracking-wide mb-1">Now in Your Tasks</div>
          <div className="flex items-start gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-[6.5px] font-bold text-gray-800">Grocery run from Supermart</div>
              <div className="text-[5px] text-gray-500">Today · 2:00 PM · Transferred from Mom</div>
            </div>
          </div>
          <div className="mt-1.5 bg-green-500 rounded-lg py-1 text-center">
            <span className="text-[6px] font-bold text-white">View in Tasks →</span>
          </div>
        </div>

        {/* Mom's updated view */}
        <div className="bg-white rounded-xl px-2 py-1.5 shadow-sm">
          <div className="text-[5px] font-bold text-gray-400 uppercase tracking-wider mb-1">Mom's Updated Tasks</div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-[5.5px] text-gray-400 line-through">
              <span className="text-[8px]">✓</span> Grocery run — removed
            </div>
            <div className="flex items-center gap-1 text-[5.5px] text-gray-700">
              <span>•</span> Book the gas cylinder refill
            </div>
            <div className="flex items-center gap-1 text-[5.5px] text-gray-700">
              <span>•</span> Pick up kids from school
            </div>
          </div>
          <div className="text-[5px] text-gray-400 mt-1">3 tasks removed · Workload: Medium</div>
        </div>

      </div>
      <BottomNav active="home" />
    </div>
  );
}

// ── More Screen (grid / ⊞ icon) ──────────────────────────────────
function MoreScreen() {
  const tiles = [
    { icon: '☑️', label: 'Tasks',        color: 'bg-indigo-50',  border: 'border-indigo-100' },
    { icon: '📝', label: 'List',         color: 'bg-blue-50',    border: 'border-blue-100' },
    { icon: '📅', label: 'Reminder',     color: 'bg-purple-50',  border: 'border-purple-100' },
    { icon: '🗂️', label: 'Documents',    color: 'bg-yellow-50',  border: 'border-yellow-100' },
    { icon: '💰', label: 'Budgeting',    color: 'bg-green-50',   border: 'border-green-100' },
    { icon: '🍽️', label: 'Meal Planner', color: 'bg-orange-50',  border: 'border-orange-100' },
  ];
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 380 }}>
      <div className="bg-white px-2 pt-2 pb-1.5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[7px]">🏠</div>
            <span className="text-[7px] font-bold text-gray-800">Thaikaattu Family</span>
            <span className="text-[6px] text-gray-400">▾</span>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white px-2 py-2">
        <div className="text-[5px] font-bold text-gray-400 uppercase tracking-widest mb-2">Categories</div>
        <div className="grid grid-cols-2 gap-1.5">
          {tiles.map(t => (
            <div key={t.label} className={`${t.color} border ${t.border} rounded-2xl p-2.5 flex flex-col items-start gap-1.5 shadow-sm`}>
              <span className="text-[14px] leading-none">{t.icon}</span>
              <span className="text-[7px] font-bold text-gray-800">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="grid" />
    </div>
  );
}

// ── Notification / Family Feed Screen ────────────────────────────
function NotificationFeedScreen() {
  const items = [
    { type: 'task',    icon: '✅', color: 'border-green-400',  bg: 'bg-green-50',
      title: 'Mom completed a task',      sub: '"Book the gas cylinder refill" · 5 min ago' },
    { type: 'event',   icon: '📅', color: 'border-violet-400', bg: 'bg-violet-50',
      title: 'Dad added an event',         sub: '"Budget Review Meeting" · 8:00 AM · 12 min ago' },
    { type: 'list',    icon: '📝', color: 'border-blue-400',   bg: 'bg-blue-50',
      title: 'John shared a new list',     sub: '"School Supplies" · 18 items · 30 min ago' },
    { type: 'expense', icon: '💰', color: 'border-yellow-400', bg: 'bg-yellow-50',
      title: 'New family expense added',   sub: 'Whole Foods Market · -$142.50 · 1 hr ago' },
    { type: 'alert',   icon: '⚠️', color: 'border-red-400',    bg: 'bg-red-50',
      title: 'Conflict detected — Mom',    sub: 'School Pickup + Doctor Apt overlap at 3 PM' },
    { type: 'remind',  icon: '🔔', color: 'border-indigo-400', bg: 'bg-indigo-50',
      title: 'Upcoming: Family Outing 🌿', sub: 'In 2 days · New York · All members' },
  ];
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 430 }}>
      <div className="bg-white px-2 pt-2 pb-1.5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-black text-gray-900">Notifications</span>
        </div>
        {/* Filter tabs */}
        <div className="flex gap-1 mt-1.5">
          {['All','Tasks','Events','Expenses'].map((tab, i) => (
            <div key={tab} className={`px-1.5 py-0.5 rounded-full text-[4.5px] font-bold ${i === 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'}`}>{tab}</div>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-gray-50 px-2 py-1.5 space-y-1 overflow-hidden">
        {items.map((item, i) => (
          <div key={i} className={`${item.bg} border-l-2 ${item.color} rounded-r-xl px-1.5 py-1`}>
            <div className="flex items-center gap-1">
              <span className="text-[7px]">{item.icon}</span>
              <div className="flex-1">
                <div className="text-[6px] font-bold text-gray-800 leading-tight">{item.title}</div>
                <div className="text-[4.5px] text-gray-500 mt-0.5 leading-tight">{item.sub}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="text-[5px] text-indigo-500 font-semibold text-center pt-1">View all activity →</div>
      </div>
      <BottomNav active="bell" />
    </div>
  );
}

// ── Profile & Settings Screen ─────────────────────────────────────
function ProfileScreen() {
  const settings = [
    { section: 'Account',  items: [
      { icon: '🔒', label: 'Account & Security', sub: '' },
      { icon: '👨‍👩‍👧', label: 'Family Members', badge: '4', sub: '' },
    ]},
    { section: 'Family', items: [
      { icon: '🔑', label: 'Invite Code', sub: 'Tap to view & share code' },
      { icon: '🔗', label: 'Share Family Link', sub: 'Send invite via WhatsApp / link' },
    ]},
    { section: 'Preferences', items: [
      { icon: '🔔', label: 'Notification Preferences', sub: '' },
      { icon: '🕵️', label: 'Privacy Controls', sub: '' },
      { icon: '🎨', label: 'Appearance & Theme', sub: '' },
    ]},
    { section: 'Support', items: [
      { icon: '❓', label: 'Help & Support', sub: '' },
      { icon: '📋', label: 'Terms & Privacy', sub: '' },
    ]},
  ];
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 480 }}>
      <div className="bg-white px-2 pt-2 pb-1 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-black text-gray-900">Profile</span>
        </div>
      </div>
      <div className="flex-1 bg-gray-50 overflow-hidden">
        {/* Profile card */}
        <div className="bg-white px-3 py-3 flex items-center gap-2.5 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center">
            <span className="text-[14px] font-black text-white">N</span>
          </div>
          <div className="flex-1">
            <div className="text-[9px] font-black text-gray-900">Natasha</div>
            <div className="text-[5px] text-gray-500">Admin · Thaikaattu Family</div>
            <div className="flex gap-2 mt-0.5">
              <span className="text-[4.5px] text-indigo-600 font-semibold">12 Tasks</span>
              <span className="text-[4.5px] text-indigo-600 font-semibold">5 Lists</span>
              <span className="text-[4.5px] text-indigo-600 font-semibold">3 Events</span>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg px-1.5 py-0.5">
            <span className="text-[5px] font-bold text-gray-600">Edit</span>
          </div>
        </div>
        {/* Settings groups */}
        <div className="px-2 py-1.5 space-y-1.5">
          {settings.map(group => (
            <div key={group.section}>
              <div className="text-[4.5px] font-bold text-gray-400 uppercase tracking-widest mb-1 px-0.5">{group.section}</div>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                {group.items.map((item, i) => (
                  <div key={item.label} className={`flex items-center justify-between px-2 py-1.5 ${i > 0 ? 'border-t border-gray-50' : ''}`}>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px]">{item.icon}</span>
                      <span className="text-[6px] font-medium text-gray-800">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {'badge' in item && <div className="bg-indigo-500 rounded-full w-3 h-3 flex items-center justify-center"><span className="text-[4px] text-white font-bold">{item.badge}</span></div>}
                      <span className="text-[8px] text-gray-300">›</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* Logout */}
          <div className="bg-red-50 border border-red-100 rounded-xl px-2 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[8px]">🚪</span>
              <span className="text-[6px] font-bold text-red-600">Log Out</span>
            </div>
            <span className="text-[8px] text-red-300">›</span>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

// ── Scan Camera Screen ────────────────────────────────────────────
function ScanCameraScreen() {
  return (
    <div className="flex flex-col bg-gray-950" style={{ minHeight: 380 }}>
      <div className="flex items-center justify-between px-2 pt-2 pb-1.5">
        <span className="text-[7px] text-gray-400">✕ Cancel</span>
        <span className="text-[6px] font-bold text-white">SCAN</span>
        <div className="w-4 h-4" />
      </div>
      {/* Camera viewfinder */}
      <div className="flex-1 flex items-center justify-center relative px-3">
        {/* Dark overlay with cut-out */}
        <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
          {/* Corner brackets */}
          {[
            'top-0 left-0 border-t-2 border-l-2 rounded-tl-lg',
            'top-0 right-0 border-t-2 border-r-2 rounded-tr-lg',
            'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg',
            'bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg',
          ].map((cls, i) => (
            <div key={i} className={`absolute w-5 h-5 border-white ${cls}`} />
          ))}
          {/* Scan line */}
          <div className="absolute left-2 right-2 top-1/3 h-px bg-indigo-400 opacity-80" />
          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-40 rounded-lg px-2 py-1">
              <span className="text-[6px] text-white text-center block">Position in frame</span>
            </div>
          </div>
          {/* Simulated paper texture */}
          <div className="absolute inset-4 border border-dashed border-gray-600 rounded opacity-30" />
        </div>
      </div>
      {/* Scan type selector */}
      <div className="px-3 pb-2">
        <div className="flex gap-1 justify-center mb-2">
          {[
            { label: 'Document', active: true },
            { label: 'Receipt',  active: false },
            { label: 'ID Card',  active: false },
          ].map(t => (
            <div key={t.label} className={`px-2 py-0.5 rounded-full text-[5px] font-bold ${t.active ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-400'}`}>{t.label}</div>
          ))}
        </div>
        {/* Capture button */}
        <div className="flex items-center justify-center gap-4">
          <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-[7px]">🖼️</div>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-gray-400">
            <div className="w-7 h-7 rounded-full bg-white border-2 border-gray-300" />
          </div>
          <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-[7px]">⚙️</div>
        </div>
      </div>
    </div>
  );
}

// ── Scan Result Screen ────────────────────────────────────────────
function ScanResultScreen() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 380 }}>
      <div className="bg-gray-900 px-2 pt-2 pb-2">
        <div className="text-[8px] font-black text-white">Scan Complete ✓</div>
        <div className="text-[5px] text-gray-400 mt-0.5">Document recognized — what would you like to do?</div>
      </div>
      <div className="flex-1 bg-gray-50 px-2 py-2 space-y-2">
        {/* Scanned preview thumbnail */}
        <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200 flex items-center gap-2">
          <div className="w-10 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
            <span className="text-[10px]">🗒️</span>
          </div>
          <div>
            <div className="text-[6.5px] font-bold text-gray-800">Scanned Document</div>
            <div className="text-[5px] text-gray-500 mt-0.5">1 page · JPEG · 18 Mar 2026</div>
            <div className="text-[5px] text-indigo-500 mt-0.5 font-semibold">Tap to preview</div>
          </div>
        </div>
        {/* AI recognition result */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-2 py-1.5">
          <div className="text-[5px] text-indigo-600 font-bold uppercase tracking-wide mb-0.5">🤖 AI Detected</div>
          <div className="text-[6.5px] font-bold text-gray-800">Looks like a Receipt</div>
          <div className="text-[5px] text-gray-500 mt-0.5">Store: Whole Foods Market · Amount: $142.50 · Date: Oct 24</div>
        </div>
        {/* Action options */}
        <div className="space-y-1">
          <div className="text-[5px] font-bold text-gray-400 uppercase tracking-widest px-0.5">Save As</div>
          {[
            { icon: '💰', label: 'Add to Expenses',      sub: 'Auto-filled: Whole Foods · $142.50', bg: 'bg-green-50  border-green-200',  btn: 'bg-green-500' },
            { icon: '🗂️', label: 'Save to Document Vault', sub: 'Store in family documents folder',  bg: 'bg-yellow-50 border-yellow-200', btn: 'bg-yellow-500' },
            { icon: '📋', label: 'Create a Task from this', sub: 'e.g. "Review grocery bill"',        bg: 'bg-blue-50   border-blue-200',   btn: 'bg-blue-500' },
          ].map(opt => (
            <div key={opt.label} className={`border rounded-xl px-2 py-1.5 flex items-center justify-between ${opt.bg}`}>
              <div className="flex items-center gap-1.5">
                <span className="text-[8px]">{opt.icon}</span>
                <div>
                  <div className="text-[6px] font-bold text-gray-800">{opt.label}</div>
                  <div className="text-[4.5px] text-gray-500">{opt.sub}</div>
                </div>
              </div>
              <div className={`${opt.btn} rounded-md px-1.5 py-0.5`}>
                <span className="text-[5px] text-white font-bold">Select</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-[5px] text-center text-gray-400 pt-0.5">Discard scan</div>
      </div>
    </div>
  );
}

// ── Sectograph Slot Detail Tooltip ────────────────────────────────
function SlotDetailBanner({ label, onClose }: { label: string; onClose: () => void }) {
  const isConflict = label.includes('CONFLICT');
  return (
    <div className={`rounded-xl border px-4 py-3 flex items-start justify-between max-w-lg mx-auto shadow-sm ${isConflict ? 'bg-red-50 border-red-300' : 'bg-indigo-50 border-indigo-200'}`}>
      <div>
        <p className={`text-xs font-bold mb-0.5 ${isConflict ? 'text-red-700' : 'text-indigo-800'}`}>
          {isConflict ? '⚠ Conflict Slot' : 'Busy Slot'}
        </p>
        <p className="text-sm text-gray-700">{label}</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-sm ml-4 shrink-0">✕</button>
    </div>
  );
}

// ── Zone Legend ───────────────────────────────────────────────────
function ZoneLegend() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 w-full max-w-lg mx-auto mt-4">
      <p className="text-xs font-bold text-gray-700 mb-3">Dashboard Screen — Zone Legend</p>
      <div className="space-y-1.5">
        {[
          { color: 'bg-indigo-200', label: 'Zone 1 — Header', desc: 'Family selector dropdown + member avatar strip (context switcher)' },
          { color: 'bg-purple-200', label: 'Zone 2 — AI Greeting', desc: 'Personalized greeting + mood emoji selector' },
          { color: 'bg-blue-200',   label: 'Zone 3 — AI Task Cards', desc: 'AI-curated action cards with Modify / Reassign CTAs' },
          { color: 'bg-yellow-200', label: 'Zone 4 — Reminders & Nudges', desc: 'Smart reminder cards + family activity feed' },
          { color: 'bg-green-200',  label: 'Zone 5 — Module Widgets', desc: 'Home Status · Financials · Upcoming event' },
          { color: 'bg-gray-200',   label: 'Zone 6 — Bottom Nav', desc: 'Home · Grid · AI Chat (FAB) · Notifications · Profile' },
        ].map((z) => (
          <div key={z.label} className="flex items-start gap-2">
            <div className={`w-3 h-3 rounded mt-0.5 shrink-0 ${z.color}`} />
            <div>
              <span className="text-[10px] font-semibold text-gray-800">{z.label}</span>
              <span className="text-[10px] text-gray-500"> — {z.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Member View Legend ────────────────────────────────────────────
function MemberViewLegend() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 w-full max-w-2xl mx-auto mt-4">
      <p className="text-xs font-bold text-gray-700 mb-3">Member View Screen — Zone Breakdown</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {[
          { color: 'bg-pink-200',   label: 'Zone 1 — Feeling + AI Message', desc: 'Mood state, workload bar, AI-generated insight about their day' },
          { color: 'bg-indigo-200', label: 'Zone 2 — Sectograph', desc: '24-hour circular day view: events (purple), tasks (orange), conflicts (red). Tap arc for details.' },
          { color: 'bg-orange-200', label: 'Zone 3 — Tasks', desc: 'Her tasks today. "ASK" button appears on tasks you can request to take over.' },
          { color: 'bg-violet-200', label: 'Zone 4 — Events', desc: 'Her calendar events for the day with time and color' },
          { color: 'bg-green-200',  label: 'Zone 5 — Financials', desc: 'Shared portion of her expense feed (personal items hidden)' },
        ].map((z) => (
          <div key={z.label} className="flex items-start gap-2">
            <div className={`w-3 h-3 rounded mt-0.5 shrink-0 ${z.color}`} />
            <div>
              <p className="text-[10px] font-semibold text-gray-800">{z.label}</p>
              <p className="text-[10px] text-gray-500">{z.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CALENDAR MODULE — Screens, Flows, Panels
// ═══════════════════════════════════════════════════════════════════

// ── Calendar: Main Screen ─────────────────────────────────────────
function CalendarMainScreen() {
  const [isFamily, setIsFamily] = useState(true);
  return (
    <div className="h-full flex flex-col" style={{ minHeight: 280 }}>
      <div className="bg-purple-100 px-2 pt-2 pb-1 border-b border-purple-200">
        <div className="flex items-center justify-between">
          <div className="text-[7px] font-bold text-purple-900">👨‍👩‍👧 Sharma Family  ▾</div>
          {/* Personal / Family toggle icon — top-right of calendar header */}
          <button
            onClick={() => setIsFamily(f => !f)}
            title={isFamily ? 'Switch to Personal Calendar' : 'Switch to Family Calendar'}
            className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full border text-[5px] font-bold transition-colors ${
              isFamily
                ? 'bg-purple-600 text-white border-purple-700'
                : 'bg-white text-purple-700 border-purple-300'
            }`}
          >
            {isFamily ? (
              <span title="Family view">👥</span>
            ) : (
              <span title="Personal view">👤</span>
            )}
          </button>
        </div>
        {/* Personal mode banner */}
        {!isFamily && (
          <div className="mt-1 bg-purple-50 border border-purple-200 rounded px-1.5 py-0.5 flex items-center justify-between">
            <span className="text-[5px] text-purple-700 font-semibold">👤 Showing only your events</span>
            <button onClick={() => setIsFamily(true)} className="text-[5px] text-purple-500 underline">Show all</button>
          </div>
        )}
        {isFamily && (
          <div className="flex gap-1 mt-1">
            {['A', 'B', 'C', 'D'].map((m) => (
              <div key={m} className="w-4 h-4 rounded-full bg-purple-400 flex items-center justify-center text-[5px] text-white font-bold">{m}</div>
            ))}
            <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[5px] text-gray-600">+2</div>
          </div>
        )}
        <div className="flex gap-0.5 mt-1.5">
          {['M', 'W', 'D', '⊞'].map((v, i) => (
            <div key={v} className={`text-[6px] px-1.5 py-0.5 rounded font-semibold ${i === 0 ? 'bg-purple-600 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}>{v}</div>
          ))}
          <div className="ml-auto text-[6px] text-purple-600 font-semibold">↗ Share</div>
        </div>
      </div>
      <div className="bg-blue-50 px-1.5 pt-1 pb-1 border-b border-blue-100 flex-1">
        <div className="text-[7px] font-bold text-blue-900 mb-0.5 flex justify-between"><span>◀ March 2026 ▶</span></div>
        <div className="grid grid-cols-7 gap-0.5">
          {['S','M','T','W','T','F','S'].map((d,i)=><div key={i} className="text-[5px] text-center text-gray-400 font-semibold">{d}</div>)}
          {Array.from({length:31},(_,i)=>(
            <div key={i} className={`text-[5px] text-center rounded py-0.5 ${i===16?'bg-blue-600 text-white font-bold rounded-full':'text-gray-700'}`}>
              {i+1}
              {[2,8,15,21,26].includes(i)&&<div className="flex justify-center gap-0.5 mt-0.5"><div className="w-1 h-1 rounded-full bg-red-400"/>{[8,21].includes(i)&&<div className="w-1 h-1 rounded-full bg-blue-400"/>}</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-green-50 px-2 py-1.5 border-t border-green-200">
        <div className="text-[7px] font-bold text-green-800">Today · 3 events</div>
        <div className="mt-1 space-y-0.5">
          <div className="bg-white rounded border-l-2 border-blue-400 px-1 py-0.5"><div className="text-[6px] text-gray-700 font-medium">9:00 AM — Team Meeting</div><div className="text-[5px] text-gray-400">Work · Ajay</div></div>
          <div className="bg-white rounded border-l-2 border-red-400 px-1 py-0.5"><div className="text-[6px] text-gray-700 font-medium">2:00 PM — Doctor</div><div className="text-[5px] text-gray-400">Health · Sarah ⚠ conflict</div></div>
        </div>
      </div>
      <div className="relative bg-white h-7 border-t border-gray-100">
        <div className="absolute bottom-1 right-1.5 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[9px] font-bold shadow-md">+</div>
      </div>
    </div>
  );
}

function CalMultipleViewsScreen() {
  return (
    <div className="flex flex-col" style={{ minHeight: 280 }}>
      <div className="bg-gray-800 px-2 py-1.5"><div className="text-[7px] text-white font-bold">Select View</div></div>
      <div className="flex-1 p-2 space-y-1.5 bg-gray-50">
        {[
          { label:'Month View', desc:'Overview planning', color:'border-purple-400', selected:true },
          { label:'Week View', desc:'Schedule coordination', color:'border-blue-400', selected:false },
          { label:'Day View', desc:'Hourly time blocks', color:'border-green-400', selected:false },
          { label:'Matrix View', desc:'Family availability grid', color:'border-orange-400', selected:false },
        ].map((v)=>(
          <div key={v.label} className={`bg-white rounded border-l-4 ${v.color} px-1.5 py-1 shadow-sm ${v.selected?'ring-1 ring-purple-400':''}`}>
            <div className={`text-[7px] font-bold ${v.selected?'text-purple-700':'text-gray-800'}`}>{v.label}</div>
            <div className="text-[5px] text-gray-500">{v.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalAddEventScreen() {
  return (
    <div className="flex flex-col" style={{ minHeight: 280 }}>
      <div className="bg-indigo-600 px-2 py-1.5 flex items-center gap-1">
        <div className="text-white text-[8px]">←</div>
        <div className="text-[7px] font-bold text-white">Add Event</div>
      </div>
      <div className="flex-1 p-2 space-y-1.5 bg-white">
        <div><div className="text-[6px] text-gray-400 mb-0.5">TITLE</div><div className="bg-gray-100 rounded px-1.5 py-1 border border-gray-200 text-[6px] text-gray-700">Doctor appointment</div></div>
        <div className="grid grid-cols-2 gap-1">
          <div><div className="text-[6px] text-gray-400 mb-0.5">DATE</div><div className="bg-gray-100 rounded px-1 py-1 text-[6px] text-gray-700 border border-gray-200">Mar 17</div></div>
          <div><div className="text-[6px] text-gray-400 mb-0.5">TIME</div><div className="bg-gray-100 rounded px-1 py-1 text-[6px] text-gray-700 border border-gray-200">4:30 PM</div></div>
        </div>
        <div><div className="text-[6px] text-gray-400 mb-0.5">LOCATION</div><div className="bg-gray-100 rounded px-1.5 py-1 border border-gray-200 text-[6px] text-gray-500">📍 Add location...</div></div>
        <div><div className="text-[6px] text-gray-400 mb-0.5">MEMBERS</div><div className="flex gap-0.5">{['A','S'].map(m=><div key={m} className="w-4 h-4 rounded-full bg-indigo-400 flex items-center justify-center text-[5px] text-white">{m}</div>)}<div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[5px] text-gray-600">+</div></div></div>
        <div><div className="text-[6px] text-gray-400 mb-0.5">VISIBILITY</div><div className="flex gap-0.5"><div className="text-[6px] bg-green-100 text-green-700 rounded px-1 py-0.5 font-medium">Personal</div><div className="text-[6px] bg-blue-500 text-white rounded px-1 py-0.5 font-medium">Family</div></div></div>
        <div><div className="text-[6px] text-gray-400 mb-0.5">ATTACH / LINK</div><div className="flex gap-1 flex-wrap"><div className="text-[6px] bg-gray-100 text-gray-600 rounded px-1 py-0.5">📎 Doc</div><div className="text-[6px] bg-gray-100 text-gray-600 rounded px-1 py-0.5">✅ Task</div><div className="text-[6px] bg-gray-100 text-gray-600 rounded px-1 py-0.5">🛒 List</div><div className="text-[6px] bg-gray-100 text-gray-600 rounded px-1 py-0.5">💰 Expense</div></div></div>
        <div className="bg-indigo-50 border border-indigo-200 rounded p-1.5">
          <div className="flex items-center justify-between mb-1"><div className="text-[6px] font-bold text-indigo-800">🔁 Recurring Event</div><div className="w-6 h-3 bg-gray-300 rounded-full flex items-center pl-0.5"><div className="w-2 h-2 bg-white rounded-full shadow-sm"/></div></div>
          <div className="flex gap-0.5">{['Daily','Weekly','Monthly','Yearly'].map(f=><div key={f} className="text-[5px] px-1 py-0.5 rounded bg-white text-gray-400 border border-gray-200">{f}</div>)}</div>
        </div>
      </div>
      <div className="px-2 pb-2 pt-1 bg-white border-t border-gray-100"><div className="bg-indigo-600 text-white text-[7px] font-bold text-center rounded py-1.5">SAVE EVENT</div></div>
    </div>
  );
}

function CalZoneLegend() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 w-full max-w-sm">
      <p className="text-xs font-bold text-gray-700 mb-2">Calendar Screen — Zone Legend</p>
      <div className="space-y-1">
        {[
          { color:'bg-purple-200', label:'Zone 1 – Header', desc:'Family selector, member avatars, view switcher, share button · Personal/Family toggle (top-right)' },
          { color:'bg-blue-200', label:'Zone 2 – Calendar Grid', desc:'Month/Week/Day grid with event dots and conflict indicators' },
          { color:'bg-green-200', label:'Zone 3 – Event Panel', desc:'Bottom sheet — event list for selected date, history carousel' },
          { color:'bg-indigo-200', label:'Zone 4 – FAB (+)', desc:'Quick create: New Event / Scan Image / Event History / Voice' },
        ].map(z=>(
          <div key={z.label} className="flex items-start gap-2">
            <div className={`w-3 h-3 rounded mt-0.5 flex-shrink-0 ${z.color}`}/>
            <div><span className="text-[10px] font-semibold text-gray-800">{z.label}</span><span className="text-[10px] text-gray-500"> — {z.desc}</span></div>
          </div>
        ))}
      </div>
      {/* Personal / Family toggle explanation */}
      <div className="mt-3 bg-purple-50 border border-purple-200 rounded p-2">
        <p className="text-[10px] font-bold text-purple-800 mb-1">👥 ↔ 👤  Personal / Family Toggle</p>
        <p className="text-[9px] text-purple-700">Top-right icon in Calendar header. Default: <strong>Family</strong> (👥) — shows all members' events. Tap to switch to <strong>Personal</strong> (👤) — shows only your own events. A banner confirms the active mode. This toggle applies across Calendar, Tasks, Lists, and Expenses.</p>
      </div>
    </div>
  );
}

// ── Calendar Flow: Small Phone + Arrow ────────────────────────────
function CalPhone({ children, label, type = 'normal' }: { children: React.ReactNode; label: string; type?: 'normal'|'user'|'system'|'warning'|'success' }) {
  const borderColor = { normal:'border-gray-700', user:'border-blue-600', system:'border-purple-600', warning:'border-red-500', success:'border-green-600' }[type];
  const labelColor  = { normal:'text-gray-700',   user:'text-blue-700',   system:'text-purple-700',  warning:'text-red-600',   success:'text-green-700' }[type];
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className={`relative flex flex-col rounded-[2rem] border-[3px] shadow-xl overflow-hidden w-32 ${borderColor} bg-gray-800`}>
        <div className="bg-gray-800 flex justify-between items-center px-2 py-1"><span className="text-[6px] text-gray-400">9:41</span><div className="w-7 h-1.5 bg-gray-600 rounded-full"/><span className="text-[6px] text-gray-400">●●</span></div>
        <div className="bg-white overflow-hidden flex-1">{children}</div>
        <div className="bg-gray-800 flex justify-center py-1.5"><div className="w-10 h-0.5 bg-gray-500 rounded-full"/></div>
      </div>
      <p className={`text-[10px] font-bold text-center max-w-[128px] leading-tight ${labelColor}`}>{label}</p>
    </div>
  );
}
function CalFlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 px-1 shrink-0 self-center mb-5">
      {label && <span className="text-[9px] text-gray-500 text-center max-w-[64px] leading-tight">{label}</span>}
      <span className="text-gray-300 text-xl font-thin">→</span>
    </div>
  );
}

// ── Calendar Flow Screens (F1–F10) ────────────────────────────────
function CF1_CalendarGrid() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-purple-600 px-2 py-1.5">
        <div className="flex items-center justify-between">
          <div className="text-[6px] text-purple-200">Sharma Family  ▾</div>
          {/* Family/Personal toggle icon */}
          <div className="bg-purple-500 rounded-full px-1 py-0.5 flex items-center gap-0.5">
            <span className="text-[7px]">👥</span>
          </div>
        </div>
        <div className="flex gap-0.5 mt-0.5">{['A','B','C','D'].map(m=><div key={m} className="w-3 h-3 rounded-full bg-purple-300 flex items-center justify-center text-[4px] text-purple-900">{m}</div>)}</div>
      </div>
      <div className="bg-blue-50 px-1.5 pt-1 flex-1"><div className="text-[6px] font-bold text-blue-800">March 2026</div><div className="grid grid-cols-7 gap-0.5 mt-0.5">{['S','M','T','W','T','F','S'].map((d,i)=><div key={i} className="text-[4px] text-center text-gray-400">{d}</div>)}{Array.from({length:28},(_,i)=><div key={i} className={`text-[4px] text-center rounded py-0.5 ${i===16?'bg-blue-600 text-white font-bold':'text-gray-600'}`}>{i+1}{[4,9,15,22].includes(i)&&<div className="w-0.5 h-0.5 rounded-full bg-red-400 mx-auto"/>}</div>)}</div></div>
      <div className="bg-gray-50 px-2 py-1 text-[6px] text-gray-400 border-t">Tap a date to see events →</div>
    </div>
  );
}
function CF1_EventPanel() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-blue-600 px-2 py-1.5"><div className="text-[6px] text-white font-bold">Tuesday, Mar 17</div></div>
      <div className="flex-1 px-1.5 py-1 space-y-1">
        {[{time:'9:00 AM',title:'Team Meeting',cat:'Work',color:'border-blue-400'},{time:'12:00 PM',title:'Lunch — Priya',cat:'Personal',color:'border-green-400'},{time:'2:00 PM',title:'Doctor (Sarah)',cat:'Health ⚠',color:'border-red-400'}].map(e=>(
          <div key={e.title} className={`bg-white rounded border-l-2 ${e.color} px-1 py-0.5 shadow-sm`}><div className="text-[6px] text-gray-500">{e.time}</div><div className="text-[6px] font-bold text-gray-800">{e.title}</div><div className="text-[5px] text-gray-400">{e.cat}</div></div>
        ))}
      </div>
      <div className="bg-gray-50 px-2 py-1 text-[6px] text-gray-400 border-t">Tap event for full detail →</div>
    </div>
  );
}
function CF1_EventDetail() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-red-500 px-2 py-1.5 flex items-center gap-1"><div className="text-white text-[7px]">←</div><div className="text-[6px] text-white font-bold">Event Detail</div></div>
      <div className="flex-1 px-2 py-1.5 space-y-1">
        <div className="text-[8px] font-bold text-gray-900">Doctor Appointment</div>
        <div className="text-[6px] text-gray-500">📅 Tue Mar 17 · 2:00 PM – 3:00 PM</div>
        <div className="text-[6px] text-gray-500">📍 City Clinic, 4th Floor</div>
        <div className="text-[6px] text-gray-500">🏷 Health  ·  🔴 Family</div>
        <div className="flex gap-0.5 mt-1">{['A','S'].map(m=><div key={m} className="w-3.5 h-3.5 rounded-full bg-red-300 flex items-center justify-center text-[4px] text-red-900">{m}</div>)}</div>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-1"><div className="text-[6px] text-yellow-800 font-semibold">⚠ Conflict detected</div><div className="text-[5px] text-yellow-700">Sarah has soccer at 1:30 PM — travel time overlap</div></div>
      </div>
      <div className="flex gap-1 px-2 pb-2"><div className="flex-1 bg-blue-100 text-blue-700 text-[6px] font-bold text-center rounded py-1">EDIT</div><div className="flex-1 bg-red-100 text-red-700 text-[6px] font-bold text-center rounded py-1">DELETE</div><div className="flex-1 bg-gray-100 text-gray-700 text-[6px] font-bold text-center rounded py-1">COPY</div></div>
    </div>
  );
}
function CF2_FABMenu() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-indigo-600 px-2 py-1.5"><div className="text-[6px] text-white font-bold">Create New</div></div>
      <div className="flex-1 px-2 py-2 space-y-1.5">
        {[{icon:'📝',label:'New Event',desc:'Manual entry form',color:'bg-indigo-50 border-indigo-200'},{icon:'📷',label:'Scan Image',desc:'Extract from invitation/flyer',color:'bg-blue-50 border-blue-200'},{icon:'🕐',label:'Event History',desc:'Reuse a previous event',color:'bg-gray-50 border-gray-200'},{icon:'🎤',label:'Voice / AI',desc:'Say it or type it',color:'bg-pink-50 border-pink-200'}].map(o=>(
          <div key={o.label} className={`border rounded-lg px-2 py-1.5 ${o.color} flex items-center gap-1.5`}><span className="text-[10px]">{o.icon}</span><div><div className="text-[6px] font-bold text-gray-800">{o.label}</div><div className="text-[5px] text-gray-500">{o.desc}</div></div></div>
        ))}
      </div>
    </div>
  );
}
function CF2_EventForm() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-indigo-600 px-2 py-1 flex items-center gap-1"><div className="text-white text-[7px]">←</div><div className="text-[6px] text-white font-bold">Add Event</div></div>
      <div className="flex-1 px-1.5 py-1 space-y-1 bg-white">
        {[{label:'TITLE',val:'Birthday Party'},{label:'DATE',val:'Mar 22'},{label:'TIME',val:'6:00 PM'},{label:'LOCATION',val:'Home'}].map(f=>(
          <div key={f.label}><div className="text-[5px] text-gray-400">{f.label}</div><div className="bg-gray-100 rounded px-1 py-0.5 text-[6px] text-gray-700 border border-gray-200">{f.val}</div></div>
        ))}
        <div><div className="text-[5px] text-gray-400">MEMBERS</div><div className="flex gap-0.5">{['A','B','C','D'].map(m=><div key={m} className="w-3.5 h-3.5 rounded-full bg-indigo-400 text-[4px] text-white flex items-center justify-center">{m}</div>)}</div></div>
        <div className="flex gap-0.5"><div className="text-[5px] bg-gray-100 text-gray-600 rounded px-1 py-0.5">✅ Task</div><div className="text-[5px] bg-gray-100 text-gray-600 rounded px-1 py-0.5">🛒 List</div><div className="text-[5px] bg-gray-100 text-gray-600 rounded px-1 py-0.5">💰 Exp</div></div>
      </div>
      <div className="px-1.5 pb-1.5 bg-white border-t border-gray-100"><div className="bg-indigo-600 text-white text-[6px] font-bold text-center rounded py-1">SAVE →</div></div>
    </div>
  );
}
function CF2_ConflictWarning() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-red-500 px-2 py-1.5"><div className="text-[6px] text-white font-bold">⚠ Conflict Detected</div></div>
      <div className="flex-1 px-2 py-2 space-y-2">
        <div className="bg-red-50 border border-red-200 rounded p-1.5"><div className="text-[6px] font-bold text-red-700">Time Overlap</div><div className="text-[5px] text-red-600 mt-0.5">Ajay: Work event ends 6:30 PM. Party at 6:00 PM overlaps by 30 min.</div></div>
        <div className="bg-orange-50 border border-orange-200 rounded p-1.5"><div className="text-[6px] font-bold text-orange-700">Travel Feasibility</div><div className="text-[5px] text-orange-600 mt-0.5">Office → Home: ~45 min travel. Consider 7:00 PM start instead.</div></div>
        <div className="space-y-1 mt-2"><div className="bg-blue-600 text-white text-[6px] font-bold text-center rounded py-1">✓ Accept Suggestion (7:00 PM)</div><div className="bg-gray-100 text-gray-700 text-[6px] font-bold text-center rounded py-1">Save Anyway</div><div className="bg-white border border-gray-200 text-gray-700 text-[6px] font-bold text-center rounded py-1">Reschedule</div></div>
      </div>
    </div>
  );
}
function CF2_EventSaved() {
  return (
    <div style={{minHeight:240}} className="flex flex-col items-center justify-center bg-green-50 px-3">
      <div className="text-4xl mb-2">✅</div>
      <div className="text-[8px] font-bold text-green-700 text-center">Event Saved!</div>
      <div className="text-[6px] text-green-600 text-center mt-1">Birthday Party · Mar 22 · 7:00 PM</div>
      <div className="mt-3 space-y-1 w-full">{['📅 Calendar updated','🔔 Reminders set (4 members)','📱 Family feed updated','✅ Task: Buy cake (linked)','🛒 Packing list created'].map(item=><div key={item} className="text-[5px] text-green-700 flex items-center gap-1"><span>{item}</span></div>)}</div>
    </div>
  );
}
function CF3_AIChat() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-pink-600 px-2 py-1.5"><div className="text-[6px] text-white font-bold">✨ AI Assistant</div></div>
      <div className="flex-1 px-1.5 py-1.5 space-y-1.5 bg-gray-50">
        <div className="flex justify-end"><div className="bg-blue-500 text-white text-[6px] rounded-lg rounded-tr-none px-1.5 py-1 max-w-[80px]">Add dentist for Sarah next Tuesday at 4:30</div></div>
        <div className="flex items-start gap-1"><div className="w-3 h-3 rounded-full bg-pink-400 flex items-center justify-center text-[5px] text-white shrink-0">AI</div><div className="bg-white text-[6px] rounded-lg rounded-tl-none px-1.5 py-1 shadow-sm border border-gray-100 max-w-[90px]">Parsed: Dentist · Sarah · Tue Mar 18 · 4:30 PM. Checking schedule...</div></div>
        <div className="flex items-start gap-1"><div className="w-3 h-3 rounded-full bg-pink-400 flex items-center justify-center text-[5px] text-white shrink-0">AI</div><div className="bg-red-50 border border-red-200 text-[6px] rounded-lg px-1.5 py-1 max-w-[90px]">⚠ Sarah has soccer at 4:00. Suggest 5:30 PM?</div></div>
        <div className="flex justify-end"><div className="bg-blue-500 text-white text-[6px] rounded-lg rounded-tr-none px-1.5 py-1 max-w-[80px]">Yes, use 5:30 PM</div></div>
      </div>
    </div>
  );
}
function CF3_Prefilled() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-pink-600 px-2 py-1 flex items-center justify-between"><div className="text-[6px] text-white font-bold">Event Form</div><div className="text-[5px] bg-pink-400 text-white rounded px-1 py-0.5">✨ AI pre-filled</div></div>
      <div className="flex-1 px-1.5 py-1 space-y-1 bg-white">
        {[{label:'TITLE',val:'Dentist Appointment'},{label:'DATE',val:'Tue Mar 18'},{label:'TIME',val:'5:30 PM'},{label:'MEMBER',val:'Sarah'}].map(f=><div key={f.label}><div className="text-[5px] text-gray-400">{f.label}</div><div className="bg-pink-50 border border-pink-200 rounded px-1 py-0.5 text-[6px] text-pink-800">{f.val} <span className="text-[4px] text-pink-400">✨</span></div></div>)}
        <div className="bg-yellow-50 border border-yellow-200 rounded p-1"><div className="text-[5px] text-yellow-700">⚠ Soccer ends 4:30 — adjusted to 5:30 for travel time</div></div>
      </div>
      <div className="px-1.5 pb-1.5 bg-white"><div className="bg-pink-600 text-white text-[6px] font-bold text-center rounded py-1">CONFIRM & SAVE</div></div>
    </div>
  );
}
function CF3_CalendarUpdated() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-green-600 px-2 py-1.5"><div className="text-[6px] text-white font-bold">Calendar Updated</div></div>
      <div className="flex-1 px-1.5 py-1.5 space-y-1">
        <div className="text-[6px] font-bold text-gray-800">Tuesday Mar 18</div>
        <div className="bg-green-50 border-l-2 border-green-500 rounded px-1 py-0.5"><div className="text-[6px] font-bold text-green-800">Dentist — Sarah</div><div className="text-[5px] text-green-600">5:30 PM · AI scheduled</div></div>
        <div className="mt-2 space-y-0.5"><div className="text-[5px] text-gray-500">🔔 Sarah notified · 15 min reminder set</div><div className="text-[5px] text-gray-500">📱 Family feed updated</div><div className="text-[5px] text-gray-500">🗓 Conflict-free · travel buffer included</div></div>
      </div>
    </div>
  );
}
function CF4_DocUpload() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-blue-700 px-2 py-1.5"><div className="text-[6px] text-white font-bold">Document Vault</div></div>
      <div className="flex-1 px-2 py-2 space-y-2">
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-2 text-center bg-blue-50"><div className="text-[10px]">📄</div><div className="text-[6px] text-blue-600 font-semibold">Insurance Policy.pdf</div><div className="text-[5px] text-blue-400">Uploaded</div></div>
        <div className="bg-white border border-gray-200 rounded p-1.5 space-y-0.5"><div className="text-[6px] font-bold text-gray-700">✨ AI Extracted:</div><div className="text-[5px] text-gray-600">📅 Due date: Mar 31, 2026</div><div className="text-[5px] text-gray-600">💰 Amount: ₹12,000</div><div className="text-[5px] text-gray-600">📌 Policy: Health Insurance</div></div>
        <div className="bg-indigo-600 text-white text-[6px] font-bold text-center rounded py-1">✓ Auto-create calendar event</div>
      </div>
    </div>
  );
}
function CF4_InsurancePrefilled() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-teal-700 px-2 py-1 flex items-center justify-between"><div className="text-[6px] text-white font-bold">Event Form</div><div className="text-[5px] bg-teal-500 text-white rounded px-1 py-0.5">✨ AI pre-filled</div></div>
      <div className="flex-1 px-1.5 py-1 space-y-1 bg-white overflow-hidden">
        {[{label:'TITLE',val:'Insurance Premium Payment'},{label:'DATE',val:'Mar 31, 2026'},{label:'AMOUNT',val:'₹12,000'},{label:'CATEGORY',val:'Finance · Health'}].map(f=><div key={f.label}><div className="text-[5px] text-gray-400">{f.label}</div><div className="bg-teal-50 border border-teal-200 rounded px-1 py-0.5 text-[6px] text-teal-800">{f.val} <span className="text-[4px] text-teal-400">✨</span></div></div>)}
        <div className="bg-indigo-50 border border-indigo-200 rounded p-1.5">
          <div className="flex items-center justify-between mb-1"><div><div className="text-[6px] font-bold text-indigo-800">🔁 Recurring Event</div><div className="text-[5px] text-indigo-600">Repeats yearly</div></div><div className="w-6 h-3 bg-indigo-600 rounded-full flex items-center justify-end pr-0.5"><div className="w-2 h-2 bg-white rounded-full"/></div></div>
          <div className="flex gap-0.5">{['Daily','Weekly','Monthly','Yearly'].map((f,i)=><div key={f} className={`text-[5px] px-1 py-0.5 rounded font-semibold ${i===3?'bg-indigo-600 text-white':'bg-white text-gray-400 border border-gray-200'}`}>{f}</div>)}</div>
        </div>
      </div>
      <div className="px-1.5 pb-1.5 bg-white border-t border-gray-100"><div className="bg-teal-600 text-white text-[6px] font-bold text-center rounded py-1">CONFIRM & SAVE</div></div>
    </div>
  );
}
function CF4_InsuranceSaved() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-green-700 px-2 py-1.5"><div className="text-[6px] text-white font-bold">Recurring Event Saved ✓</div></div>
      <div className="flex-1 px-1.5 py-1.5 space-y-1">
        <div className="bg-indigo-50 border border-indigo-200 rounded p-1.5"><div className="text-[7px] font-bold text-indigo-900">🔁 Insurance Premium Payment</div><div className="text-[5px] text-indigo-700">Mar 31 every year · ₹12,000</div></div>
        {[{icon:'📅',text:'Calendar: Yearly recurring event set'},{icon:'💰',text:'Expense: ₹12,000 linked per occurrence'},{icon:'✅',text:'Auto-task: HIGH PRIORITY, 7 days before'},{icon:'🔔',text:'Reminder: 1 day + 15 min before'},{icon:'📄',text:'Insurance Policy.pdf attached'}].map(item=><div key={item.text} className="text-[5px] text-gray-700 flex items-start gap-1"><span className="shrink-0">{item.icon}</span><span>{item.text}</span></div>)}
      </div>
      <div className="px-1.5 pb-1.5"><div className="bg-green-600 text-white text-[6px] font-bold text-center rounded py-1">✓ Yearly reminder chain active</div></div>
    </div>
  );
}
function CF5_RecurringCalendar() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-purple-600 px-2 py-1.5"><div className="text-[6px] text-white font-bold">Calendar — March 2026</div></div>
      <div className="bg-blue-50 px-1.5 pt-1 flex-1">
        <div className="grid grid-cols-7 gap-0.5 mb-1">{['S','M','T','W','T','F','S'].map((d,i)=><div key={i} className="text-[4px] text-center text-gray-400">{d}</div>)}{Array.from({length:31},(_,i)=><div key={i} className={`text-[4px] text-center rounded py-0.5 ${i===30?'bg-indigo-600 text-white font-bold':'text-gray-600'}`}>{i+1}{i===30&&<div className="text-[3px] text-indigo-200">🔁</div>}</div>)}</div>
        <div className="bg-indigo-50 border-l-2 border-indigo-500 rounded px-1 py-0.5"><div className="text-[6px] font-bold text-indigo-800">🔁 Insurance Premium</div><div className="text-[5px] text-indigo-600">Mar 31 · ₹12,000 · Yearly</div></div>
      </div>
    </div>
  );
}
function CF5_MarkComplete() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-indigo-600 px-2 py-1.5"><div className="text-[6px] text-white font-bold">Insurance Premium</div></div>
      <div className="flex-1 px-2 py-1.5 space-y-1">
        <div className="text-[7px] font-bold text-gray-900">Insurance Premium Payment</div>
        <div className="text-[5px] text-gray-500">📅 Mar 31, 2026 · Recurring yearly</div>
        <div className="text-[5px] text-gray-500">💰 Amount: ₹12,000</div>
        <div className="bg-emerald-50 border border-emerald-200 rounded p-1.5 mt-1">
          <div className="text-[6px] font-bold text-emerald-800 mb-1">Mark as Complete</div>
          <div className="text-[5px] text-emerald-600 mb-1">Completing will auto-log the expense in tracker.</div>
          <div className="bg-emerald-600 text-white text-[6px] font-bold text-center rounded py-0.5">✓ Mark as Paid — ₹12,000</div>
        </div>
      </div>
    </div>
  );
}
function CF5_ExpenseAutoLog() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-700 px-2 py-1.5"><div className="text-[6px] text-white font-bold">💰 Expense Tracker — Auto Updated</div></div>
      <div className="flex-1 px-2 py-1.5 space-y-1.5">
        <div className="bg-emerald-50 border border-emerald-300 rounded p-1.5"><div className="text-[5px] text-emerald-600 font-bold uppercase mb-1">New Entry Auto-Logged</div><div className="text-[7px] font-bold text-gray-900">Health Insurance</div><div className="text-[6px] text-gray-700">₹12,000 · Mar 31, 2026</div><div className="text-[5px] text-gray-400">Source: Calendar event completion</div></div>
        {[{year:'2025',amt:'₹11,000',status:'Paid'},{year:'2026',amt:'₹12,000',status:'Paid ✓',highlight:true}].map(row=><div key={row.year} className={`flex justify-between text-[5px] rounded px-1 py-0.5 ${row.highlight?'bg-emerald-100 text-emerald-800 font-bold':'text-gray-500'}`}><span>Mar 31, {row.year}</span><span>{row.amt}</span><span>{row.status}</span></div>)}
        <div className="flex justify-between text-[5px] rounded px-1 py-0.5 text-gray-400 bg-gray-50"><span>Mar 31, 2027</span><span>₹12,000</span><span>Upcoming 🔁</span></div>
      </div>
    </div>
  );
}
function CF5_NextOccurrence() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-green-700 px-2 py-1.5"><div className="text-[6px] text-white font-bold">Next Cycle Scheduled ✓</div></div>
      <div className="flex-1 px-2 py-1.5 space-y-1.5">
        <div className="text-center py-2"><div className="text-3xl">🔁</div><div className="text-[7px] font-bold text-gray-800 mt-1">2026 Complete</div><div className="text-[6px] text-gray-500">Next occurrence auto-scheduled</div></div>
        {[{label:'2026 event',value:'Marked complete · ₹12,000 logged',color:'bg-green-100 text-green-800'},{label:'2027 event',value:'Auto-created · Mar 31 2027',color:'bg-indigo-100 text-indigo-800'},{label:'Auto-task',value:'Will be created Mar 24 2027',color:'bg-yellow-100 text-yellow-800'}].map(item=><div key={item.label} className={`rounded px-1.5 py-0.5 ${item.color}`}><span className="text-[5px] font-bold">{item.label}: </span><span className="text-[5px]">{item.value}</span></div>)}
      </div>
    </div>
  );
}
function CF6_Upcoming7Days() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-orange-500 px-2 py-1.5"><div className="text-[6px] text-white font-bold">🔔 Upcoming Reminder</div></div>
      <div className="px-2 py-1.5 bg-orange-50 border-b border-orange-200"><div className="text-[6px] font-bold text-orange-800">Insurance Payment due in 7 days</div><div className="text-[5px] text-orange-600">Mar 31, 2027 · ₹12,000 · Auto-task being created...</div></div>
      <div className="flex-1 bg-blue-50 px-1.5 pt-1">
        <div className="text-[6px] font-bold text-blue-900 mb-0.5">March 2027</div>
        <div className="grid grid-cols-7 gap-0.5">{['S','M','T','W','T','F','S'].map((d,i)=><div key={i} className="text-[4px] text-center text-gray-400">{d}</div>)}{Array.from({length:31},(_,i)=><div key={i} className={`text-[4px] text-center rounded py-0.5 relative ${i===23?'bg-orange-500 text-white font-bold':i===30?'bg-indigo-600 text-white font-bold':'text-gray-600'}`}>{i+1}{i===30&&<div className="text-[3px] leading-none">🔁</div>}</div>)}</div>
        <div className="mt-1 text-[5px] text-orange-600">Mar 24 = 7 days before due · Task auto-created</div>
      </div>
    </div>
  );
}
function CF6_PriorityTask() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-red-600 px-2 py-1.5"><div className="text-[6px] text-white font-bold">✅ Tasks — Auto Created</div></div>
      <div className="flex-1 px-2 py-1.5 space-y-1.5">
        <div className="bg-red-50 border-2 border-red-300 rounded p-1.5"><div className="flex items-start justify-between gap-1 mb-1"><div className="text-[6px] font-bold text-red-800">Pay Insurance Premium</div><div className="text-[5px] bg-red-600 text-white rounded px-1 py-0.5 shrink-0 font-bold">HIGH</div></div><div className="text-[5px] text-red-600">Due: Mar 31, 2027 (7 days)</div><div className="text-[5px] text-gray-500 mt-0.5">Auto-created from recurring calendar event</div><div className="flex gap-0.5 mt-1 flex-wrap"><div className="text-[5px] bg-indigo-100 text-indigo-700 rounded px-1 py-0.5">📅 Linked Event</div><div className="text-[5px] bg-emerald-100 text-emerald-700 rounded px-1 py-0.5">💰 Linked Expense</div></div></div>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-1"><div className="text-[5px] text-yellow-700">💡 Completing this task will auto-update Calendar + Expense</div></div>
      </div>
    </div>
  );
}
function CF6_TaskDetail3Way() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-red-600 px-2 py-1 flex items-center gap-1"><div className="text-white text-[7px]">←</div><div className="text-[6px] text-white font-bold">Task Detail</div><div className="ml-auto text-[5px] bg-red-400 text-white rounded px-1 py-0.5 font-bold">HIGH</div></div>
      <div className="flex-1 px-2 py-1.5 space-y-1">
        <div className="text-[8px] font-bold text-gray-900">Pay Insurance Premium</div>
        <div className="text-[5px] text-gray-500">📅 Due: Mar 31, 2027 · 7 days left</div>
        <div className="bg-gray-50 border border-gray-200 rounded p-1.5">
          <div className="text-[5px] font-bold text-gray-700 mb-1">3-Way Connection</div>
          <div className="flex items-center justify-between text-center">
            <div className="bg-red-100 rounded p-1"><div className="text-[7px]">✅</div><div className="text-[4px] text-red-700 font-bold">Task</div></div>
            <div className="text-[8px] text-gray-300">⟷</div>
            <div className="bg-indigo-100 rounded p-1"><div className="text-[7px]">📅</div><div className="text-[4px] text-indigo-700 font-bold">Calendar</div></div>
            <div className="text-[8px] text-gray-300">⟷</div>
            <div className="bg-emerald-100 rounded p-1"><div className="text-[7px]">💰</div><div className="text-[4px] text-emerald-700 font-bold">Expense</div></div>
          </div>
          <div className="text-[4px] text-gray-400 text-center mt-1">Completing any one updates all three</div>
        </div>
        <div className="bg-red-600 text-white text-[6px] font-bold text-center rounded py-1">✓ MARK TASK COMPLETE</div>
      </div>
    </div>
  );
}
function CF6_ChainCompletion() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-green-700 px-2 py-1.5"><div className="text-[6px] text-white font-bold">Chain Reaction Complete ✓</div></div>
      <div className="flex-1 px-2 py-1.5 space-y-1">
        <div className="text-center py-1"><div className="text-2xl">⚡</div><div className="text-[6px] font-bold text-gray-800">Task completed → 3 modules updated</div></div>
        {[{icon:'✅',module:'Task',action:'Marked complete',color:'bg-red-50 border-red-200 text-red-800'},{icon:'📅',module:'Calendar',action:'Event marked complete',color:'bg-indigo-50 border-indigo-200 text-indigo-800'},{icon:'💰',module:'Expense',action:'₹12,000 auto-logged',color:'bg-emerald-50 border-emerald-200 text-emerald-800'},{icon:'🔁',module:'Next Cycle',action:'2028 event auto-scheduled',color:'bg-purple-50 border-purple-200 text-purple-800'}].map(item=><div key={item.module} className={`border rounded px-1.5 py-0.5 ${item.color}`}><span className="text-[5px] font-bold">{item.icon} {item.module}: </span><span className="text-[5px]">{item.action}</span></div>)}
      </div>
    </div>
  );
}
function CF7_TripForm() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-sky-700 px-2 py-1 flex items-center gap-1"><div className="text-white text-[7px]">←</div><div className="text-[6px] text-white font-bold">Add Event</div></div>
      <div className="flex-1 px-1.5 py-1 space-y-1 bg-white overflow-hidden">
        <div><div className="text-[5px] text-gray-400">TITLE</div><div className="bg-sky-50 border border-sky-200 rounded px-1 py-0.5 text-[6px] text-sky-800 font-bold">Family Trip to Goa ✈️</div></div>
        <div className="grid grid-cols-2 gap-1"><div><div className="text-[5px] text-gray-400">FROM</div><div className="bg-gray-100 rounded px-1 py-0.5 text-[6px] text-gray-700">Apr 12</div></div><div><div className="text-[5px] text-gray-400">TO</div><div className="bg-gray-100 rounded px-1 py-0.5 text-[6px] text-gray-700">Apr 16</div></div></div>
        <div><div className="text-[5px] text-gray-400">MEMBERS</div><div className="flex gap-0.5">{['A','P','S','R'].map(m=><div key={m} className="w-4 h-4 rounded-full bg-sky-400 flex items-center justify-center text-[5px] text-white font-bold">{m}</div>)}</div></div>
        <div className="bg-pink-50 border border-pink-200 rounded p-1"><div className="text-[5px] font-bold text-pink-700">✨ AI Detected: Multi-day Trip</div><div className="text-[5px] text-pink-600">Auto-link: packing list, prep tasks, expense budget?</div></div>
      </div>
      <div className="px-1.5 pb-1.5 bg-white border-t border-gray-100"><div className="bg-sky-600 text-white text-[6px] font-bold text-center rounded py-1">SAVE + LINK ALL MODULES</div></div>
    </div>
  );
}
function CF7_PackingList() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-teal-700 px-2 py-1.5"><div className="text-[6px] text-white font-bold">🛒 Packing List — Auto Created</div></div>
      <div className="flex-1 px-1.5 py-1 space-y-0.5">
        <div className="bg-teal-50 border border-teal-200 rounded p-1 mb-1"><div className="text-[6px] font-bold text-teal-800">📦 Goa Trip — Packing List</div><div className="text-[5px] text-teal-600">Apr 12–16 · All members</div></div>
        {[{item:'Passports / IDs',done:true},{item:'Flight tickets',done:true},{item:'Hotel booking conf.',done:false},{item:"Sarah's medications",done:false},{item:'Beach gear & sunscreen',done:false}].map(i=><div key={i.item} className="flex items-center gap-1 px-1 py-0.5 rounded bg-white border border-gray-100"><div className={`w-2.5 h-2.5 rounded border flex-shrink-0 flex items-center justify-center ${i.done?'bg-teal-500 border-teal-500':'border-gray-300'}`}>{i.done&&<span className="text-[5px] text-white">✓</span>}</div><span className={`text-[5px] flex-1 ${i.done?'text-gray-400 line-through':'text-gray-700'}`}>{i.item}</span></div>)}
      </div>
    </div>
  );
}
function CF7_TripTasks() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-purple-700 px-2 py-1.5"><div className="text-[6px] text-white font-bold">✅ Tasks — Trip Prep (Auto)</div></div>
      <div className="flex-1 px-1.5 py-1 space-y-1">
        {[{task:'Book hotel — Priya',priority:'HIGH',color:'border-red-400 bg-red-50'},{task:'Book taxi — Ajay',priority:'MED',color:'border-yellow-400 bg-yellow-50'},{task:'Pack school bag',priority:'MED',color:'border-yellow-400 bg-yellow-50'},{task:'Set home alarm',priority:'LOW',color:'border-gray-300 bg-gray-50'}].map(t=><div key={t.task} className={`border-l-2 rounded px-1.5 py-1 ${t.color}`}><div className="text-[6px] font-bold text-gray-800">{t.task}</div><span className={`text-[4px] font-bold px-0.5 rounded ${t.priority==='HIGH'?'bg-red-200 text-red-700':t.priority==='MED'?'bg-yellow-200 text-yellow-700':'bg-gray-200 text-gray-600'}`}>{t.priority}</span></div>)}
        <div className="bg-indigo-50 border border-indigo-200 rounded px-1.5 py-0.5"><div className="text-[5px] text-indigo-700">💰 Trip budget ₹45,000 allocated in Expense module</div></div>
      </div>
    </div>
  );
}
function CF7_TripExpense() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-700 px-2 py-1.5"><div className="text-[6px] text-white font-bold">💰 Expense — Trip Budget</div></div>
      <div className="flex-1 px-2 py-1.5 space-y-1.5">
        <div className="bg-emerald-50 border border-emerald-200 rounded p-1.5"><div className="text-[6px] font-bold text-emerald-800">Goa Family Trip · Apr 12–16</div><div className="text-[5px] text-emerald-600">Total Budget: ₹45,000</div><div className="w-full bg-gray-200 rounded-full h-1.5 mt-1"><div className="bg-emerald-500 h-1.5 rounded-full" style={{width:'35%'}}/></div><div className="text-[5px] text-gray-500 mt-0.5">₹15,750 spent · ₹29,250 remaining</div></div>
        {[{cat:'Flights',amt:'₹12,000'},{cat:'Hotel',amt:'Pending'},{cat:'Food',amt:'₹3,750'}].map(e=><div key={e.cat} className="flex justify-between items-center text-[5px] border-b border-gray-100 pb-0.5"><span className="text-gray-700">{e.cat}</span><span className="text-gray-700 font-bold">{e.amt}</span></div>)}
      </div>
    </div>
  );
}
// Flow 8 — Screen 1: Availability Matrix → user taps a date column
function CF8_MatrixView() {
  const members=['Ajay','Priya','Sarah','Rahul'];
  const days=['Mon','Tue','Wed','Thu','Sat'];
  // 1=busy(red), 0=free(green)
  const avail=[[1,0,0,0,1],[0,1,0,0,1],[0,0,1,0,1],[1,0,0,0,1]];
  const common=days.map((_,col)=>avail.every(row=>row[col]===0));
  return (
    <div style={{minHeight:240}} className="flex flex-col bg-white">
      <div className="bg-purple-700 px-2 py-1.5 flex items-center justify-between">
        <div className="text-[6px] text-white font-bold">Family Availability Matrix</div>
        <div className="text-[5px] text-purple-200">Week of Mar 17</div>
      </div>
      <div className="flex-1 px-1.5 py-1">
        <div className="text-[5px] text-gray-500 mb-1.5">Tap a <span className="text-purple-700 font-bold">★</span> column to pick a date &amp; compare schedules</div>
        {/* header row */}
        <div className="grid grid-cols-6 gap-0.5 mb-1">
          <div/>
          {days.map((d,i)=>(
            <div key={d} className={`text-[4px] text-center font-bold rounded py-0.5 ${common[i]?'bg-purple-100 text-purple-700':'text-gray-400'}`}>{d}</div>
          ))}
        </div>
        {/* member rows */}
        {members.map((m,mi)=>(
          <div key={m} className="grid grid-cols-6 gap-0.5 mb-0.5 items-center">
            <div className="text-[4px] text-gray-600 font-semibold">{m.slice(0,3)}</div>
            {avail[mi].map((a,di)=>(
              <div key={di} className={`h-4 rounded flex items-center justify-center text-[4px] font-bold ${a===0?'bg-green-100 text-green-700':'bg-red-100 text-red-500'}`}>{a===0?'✓':'✕'}</div>
            ))}
          </div>
        ))}
        {/* ALL row */}
        <div className="grid grid-cols-6 gap-0.5 mt-1 pt-1 border-t border-purple-100">
          <div className="text-[4px] text-purple-700 font-bold self-center">ALL</div>
          {common.map((free,i)=>(
            <div key={i} className={`h-4 rounded flex items-center justify-center text-[6px] font-bold ${free?'bg-purple-600 text-white ring-1 ring-purple-400 ring-offset-0':'bg-gray-100 text-gray-300'}`}>
              {free?'★':'·'}
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-200 flex-shrink-0"/>
          <div className="text-[4px] text-gray-400">Free</div>
          <div className="w-2 h-2 rounded-full bg-red-200 flex-shrink-0 ml-1"/>
          <div className="text-[4px] text-gray-400">Busy</div>
          <div className="ml-1 text-[4px] text-purple-600 font-semibold">★ = All free</div>
        </div>
      </div>
    </div>
  );
}

// Flow 8 — Screen 1: Date confirmed + member avatar selector
function CF8_DateMemberPick() {
  const memberColors=['bg-pink-400','bg-blue-400','bg-orange-400','bg-purple-400','bg-green-500'];
  const names=['Ajay','Priya','Sarah','Rahul','Me'];
  return (
    <div style={{minHeight:240}} className="flex flex-col bg-white">
      <div className="bg-purple-700 px-2 py-1.5 flex items-center gap-1">
        <div className="text-[8px] text-purple-200">←</div>
        <div className="text-[6px] text-white font-bold">Schedule on Thu, Mar 20</div>
      </div>
      <div className="flex-1 px-2 py-2 space-y-2">
        {/* Selected date chip */}
        <div className="flex items-center gap-1 bg-purple-50 border border-purple-200 rounded-lg px-2 py-1">
          <div className="text-[8px]">📅</div>
          <div>
            <div className="text-[6px] font-bold text-purple-800">Thursday, Mar 20</div>
            <div className="text-[4px] text-purple-500">★ All members free on this day</div>
          </div>
        </div>
        {/* Avatar selector */}
        <div>
          <div className="text-[5px] text-gray-500 font-semibold mb-1 uppercase tracking-wide">Select members to compare</div>
          <div className="grid grid-cols-2 gap-1">
            {names.map((n,i)=>(
              <div key={n} className="flex items-center gap-1 bg-green-50 border border-green-200 rounded px-1 py-0.5">
                <div className={`w-4 h-4 rounded-full ${memberColors[i]} flex items-center justify-center text-[5px] text-white font-bold flex-shrink-0`}>{n[0]}</div>
                <div className="text-[5px] text-gray-700 font-medium">{n}</div>
                <div className="ml-auto text-[6px] text-green-600">✓</div>
              </div>
            ))}
          </div>
        </div>
        {/* CTA */}
        <div className="bg-purple-600 text-white text-[6px] font-bold text-center rounded-lg py-1.5">
          COMPARE SCHEDULES →
        </div>
      </div>
    </div>
  );
}

// Flow 8 — Screen 2: Parallel day timeline + AI free-slot suggestion (noon–10pm, 5 members)
function CF8_ParallelDayView() {
  // slots: 0=12pm,1=1pm,2=2pm,3=3pm,4=4pm,5=5pm,6=6pm,7=7pm,8=8pm,9=9pm  → free from slot 6 (6pm) for 4 slots
  const schedule: Record<string, Array<[number,number,'event'|'task']>> = {
    Ajay:  [[1,1,'task'],[3,2,'event']],
    Priya: [[0,1,'event'],[2,1,'task']],
    Sarah: [[1,2,'event'],[4,1,'task']],
    Rahul: [[2,1,'task'],[4,1,'event']],
    Me:    [[0,1,'event'],[3,1,'task']],
  };
  const members=['Ajay','Priya','Sarah','Rahul','Me'];
  const memberColors=['bg-pink-400','bg-blue-400','bg-orange-400','bg-purple-400','bg-green-500'];
  const hours=['12p','1p','2p','3p','4p','5p','6p','7p','8p','9p'];
  const totalSlots=10;
  const freeStart=6; // 6pm
  const freeSpan=4;  // 4 hrs → 10pm
  const slotH=15;
  return (
    <div style={{minHeight:240}} className="flex flex-col bg-white">
      <div className="bg-purple-700 px-2 py-1 flex items-center justify-between">
        <div className="text-[6px] text-white font-bold">Thu, Mar 20 — All Members</div>
        <div className="text-[4px] text-purple-200">12 pm – 10 pm</div>
      </div>
      {/* AI suggestion banner */}
      <div className="bg-violet-50 border-b border-violet-200 px-2 py-1 flex items-start gap-1">
        <div className="text-[8px] flex-shrink-0">✨</div>
        <div>
          <div className="text-[5px] font-bold text-violet-800">AI Suggestion</div>
          <div className="text-[4px] text-violet-600">All 5 members free <span className="font-bold">6:00 – 10:00 PM</span> — tap to schedule</div>
        </div>
      </div>
      {/* Timeline grid */}
      <div className="flex overflow-hidden px-1 pt-1" style={{height: slotH*totalSlots + 14}}>
        {/* time axis */}
        <div className="flex flex-col flex-shrink-0" style={{width:13}}>
          <div style={{height:12}}/>
          {hours.map(h=>(
            <div key={h} style={{height:slotH}} className="flex items-start justify-end pr-0.5">
              <span className="text-[4px] text-gray-400 leading-none">{h}</span>
            </div>
          ))}
        </div>
        {/* member columns */}
        {members.map((m,mi)=>(
          <div key={m} className="flex flex-col flex-1 min-w-0 mx-px">
            {/* avatar header */}
            <div className="flex justify-center items-center" style={{height:12}}>
              <div className={`w-3 h-3 rounded-full ${memberColors[mi]} flex items-center justify-center text-[4px] text-white font-bold`}>{m[0]}</div>
            </div>
            {/* time column */}
            <div className="relative bg-gray-50 rounded border border-gray-100" style={{height:slotH*totalSlots}}>
              {/* free-time highlight 6pm–10pm */}
              <div className="absolute left-0 right-0 bg-green-100 border-l-2 border-green-500"
                style={{top:slotH*freeStart, height:slotH*freeSpan}}/>
              {/* event/task blocks */}
              {schedule[m].map(([start,span,type],bi)=>(
                <div key={bi}
                  className={`absolute left-0.5 right-0.5 rounded flex items-center justify-center ${type==='event'?'bg-purple-300 border border-purple-400':'bg-orange-200 border border-orange-300'}`}
                  style={{top:slotH*start+1, height:slotH*span-2}}>
                  <span className={`text-[3px] font-bold ${type==='event'?'text-purple-800':'text-orange-800'}`}>{type==='event'?'Evt':'Task'}</span>
                </div>
              ))}
              {/* hour lines */}
              {hours.map((_,i)=>(
                <div key={i} className="absolute left-0 right-0 border-t border-gray-100" style={{top:slotH*i}}/>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* legend */}
      <div className="flex items-center gap-2 px-2 py-1 border-t border-gray-100">
        <div className="w-2 h-2 rounded-sm bg-purple-300 flex-shrink-0"/><span className="text-[4px] text-gray-500">Event</span>
        <div className="w-2 h-2 rounded-sm bg-orange-200 flex-shrink-0 ml-1"/><span className="text-[4px] text-gray-500">Task</span>
        <div className="w-2 h-2 rounded-sm bg-green-100 border-l-2 border-green-500 flex-shrink-0 ml-1"/><span className="text-[4px] text-green-600 font-bold">Free slot</span>
      </div>
    </div>
  );
}

// Flow 8 — Screen 3: Tap free slot → pre-filled event creation form
function CF8_EventCreate() {
  const memberColors=['bg-pink-400','bg-blue-400','bg-orange-400','bg-purple-400','bg-green-500'];
  const names=['Ajay','Priya','Sarah','Rahul','Me'];
  return (
    <div style={{minHeight:240}} className="flex flex-col bg-white">
      <div className="bg-purple-700 px-2 py-1.5 flex items-center gap-1">
        <div className="text-[8px] text-purple-200">←</div>
        <div className="text-[6px] text-white font-bold">Add Event</div>
      </div>
      <div className="flex-1 px-2 py-1.5 space-y-1.5 overflow-hidden">
        {/* Title */}
        <div className="border border-gray-200 rounded px-1.5 py-1">
          <div className="text-[4px] text-gray-400 uppercase tracking-wide mb-0.5">Title</div>
          <div className="text-[6px] text-gray-300 italic">Add event title…</div>
        </div>
        {/* Date + Time */}
        <div className="grid grid-cols-2 gap-1">
          <div className="bg-purple-50 border border-purple-200 rounded px-1.5 py-1">
            <div className="text-[4px] text-purple-400 uppercase">Date</div>
            <div className="text-[6px] font-bold text-purple-800">Thu, Mar 20</div>
          </div>
          <div className="bg-green-50 border border-green-300 rounded px-1.5 py-1">
            <div className="text-[4px] text-green-500 uppercase">Time</div>
            <div className="text-[5px] font-bold text-green-700">6:00–10:00 PM</div>
          </div>
        </div>
        {/* AI pre-fill note */}
        <div className="bg-violet-50 border border-violet-200 rounded px-1.5 py-1 flex items-center gap-1">
          <div className="text-[7px]">✨</div>
          <div className="text-[4px] text-violet-700">Time pre-filled from free slot</div>
        </div>
        {/* Members */}
        <div>
          <div className="text-[4px] text-gray-400 uppercase tracking-wide mb-1">Members</div>
          <div className="flex items-center gap-1 flex-wrap">
            {names.map((n,i)=>(
              <div key={n} className={`${memberColors[i]} rounded-full w-5 h-5 flex items-center justify-center text-[5px] text-white font-bold`}>{n[0]}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-2 pb-2">
        <div className="bg-purple-600 text-white text-[6px] font-bold text-center rounded-lg py-1.5">
          SAVE EVENT
        </div>
      </div>
    </div>
  );
}
function CF9_BirthdayForm() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-pink-600 px-2 py-1 flex items-center gap-1"><div className="text-white text-[7px]">←</div><div className="text-[6px] text-white font-bold">Add Event</div></div>
      <div className="flex-1 px-1.5 py-1 space-y-1 bg-white">
        <div><div className="text-[5px] text-gray-400">TITLE</div><div className="bg-pink-50 border border-pink-200 rounded px-1 py-0.5 text-[6px] text-pink-800 font-bold">🎂 Sarah's Birthday Party</div></div>
        <div className="grid grid-cols-2 gap-1"><div><div className="text-[5px] text-gray-400">DATE</div><div className="bg-gray-100 rounded px-1 py-0.5 text-[6px] text-gray-700">Apr 8, 2026</div></div><div><div className="text-[5px] text-gray-400">TIME</div><div className="bg-gray-100 rounded px-1 py-0.5 text-[6px] text-gray-700">4:00 PM</div></div></div>
        <div className="bg-pink-50 border border-pink-200 rounded p-1"><div className="text-[5px] font-bold text-pink-700">✨ AI: Birthday event detected</div><div className="text-[5px] text-pink-600">Auto-create prep tasks + grocery list + expense budget?</div></div>
      </div>
      <div className="px-1.5 pb-1.5 bg-white border-t border-gray-100"><div className="bg-pink-600 text-white text-[6px] font-bold text-center rounded py-1">YES — LINK ALL MODULES</div></div>
    </div>
  );
}
function CF9_ModuleSuggestions() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-pink-700 px-2 py-1.5"><div className="text-[6px] text-white font-bold">✨ AI — Birthday Planner</div></div>
      <div className="flex-1 px-2 py-1 space-y-1">
        <div className="text-[6px] font-bold text-gray-700">Suggested links for Sarah's Birthday:</div>
        {[{icon:'✅',module:'Tasks',items:['Buy birthday cake (Ajay)','Order decorations (Priya)'],color:'border-purple-300 bg-purple-50',text:'text-purple-800'},{icon:'🛒',module:'Grocery List',items:['Cake ingredients','Juice & drinks'],color:'border-teal-300 bg-teal-50',text:'text-teal-800'},{icon:'💰',module:'Expense Budget',items:['₹5,000 allocated','Track per category'],color:'border-emerald-300 bg-emerald-50',text:'text-emerald-800'}].map(s=><div key={s.module} className={`border rounded p-1.5 ${s.color}`}><div className={`text-[6px] font-bold mb-0.5 ${s.text}`}>{s.icon} {s.module}</div>{s.items.map(item=><div key={item} className="text-[5px] text-gray-600 flex items-center gap-0.5"><span className="text-gray-300">→</span><span>{item}</span></div>)}</div>)}
      </div>
    </div>
  );
}
function CF9_BirthdayAllLinked() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-green-700 px-2 py-1.5"><div className="text-[6px] text-white font-bold">🎂 Birthday Party Ready ✓</div></div>
      <div className="flex-1 px-2 py-1.5 space-y-1">
        <div className="bg-pink-50 border border-pink-200 rounded p-1.5"><div className="text-[7px] font-bold text-pink-800">🎂 Sarah's Birthday Party</div><div className="text-[5px] text-pink-600">Apr 8, 4:00 PM · Home · Recurring yearly</div></div>
        {[{icon:'✅',text:'4 tasks created · assigned',color:'text-purple-700'},{icon:'🛒',text:'Grocery list · 8 items',color:'text-teal-700'},{icon:'💰',text:'Budget ₹5,000 · linked',color:'text-emerald-700'},{icon:'🔔',text:'Reminder: 1 week + 1 day',color:'text-yellow-700'},{icon:'🎂',text:"Yearly birthday auto-set",color:'text-pink-700'}].map(item=><div key={item.text} className="flex items-center gap-1"><span className="text-[8px]">{item.icon}</span><span className={`text-[5px] ${item.color} font-medium`}>{item.text}</span></div>)}
      </div>
    </div>
  );
}
function CF10_Dashboard() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-gray-900 px-2 py-1.5"><div className="text-[6px] text-white font-bold">🏠 Family OS — Home</div><div className="text-[5px] text-gray-400">Good morning, Ajay 👋</div></div>
      <div className="flex-1 px-1.5 py-1.5 space-y-1.5 bg-gray-50">
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-1.5"><div className="text-[6px] font-bold text-red-800">⚠ AI Alert — Schedule</div><div className="text-[5px] text-red-600">2 conflicts detected this week</div><div className="text-[5px] bg-red-600 text-white rounded px-1 py-0.5 font-bold inline-block mt-1">Fix →</div></div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-1.5"><div className="text-[6px] font-bold text-blue-800">📅 Today — 3 events</div><div className="text-[5px] text-blue-600">9am Team meeting · 2pm Doctor</div></div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-1.5"><div className="text-[6px] font-bold text-purple-800">✅ 2 tasks due today</div><div className="text-[5px] text-purple-600">Insurance payment · Hotel booking</div></div>
      </div>
    </div>
  );
}
function CF10_ConflictsHighlighted() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-red-600 px-2 py-1.5"><div className="text-[6px] text-white font-bold">📅 Calendar — Conflicts View</div><div className="text-[5px] text-red-200">2 issues highlighted by AI</div></div>
      <div className="flex-1 bg-blue-50 px-1.5 pt-1 space-y-1">
        <div className="bg-white rounded border border-gray-200 p-1"><div className="text-[5px] font-bold text-gray-700">Tue Mar 18</div><div className="bg-red-50 border-l-2 border-red-500 px-1 py-0.5 rounded"><div className="text-[5px] font-bold text-red-700">⚠ CONFLICT — Sarah</div><div className="text-[5px] text-red-600">Soccer 4:00 PM ↔ Doctor 4:30 PM</div></div></div>
        <div className="bg-white rounded border border-gray-200 p-1"><div className="text-[5px] font-bold text-gray-700">Fri Mar 22</div><div className="bg-orange-50 border-l-2 border-orange-500 px-1 py-0.5 rounded"><div className="text-[5px] font-bold text-orange-700">⚠ CONFLICT — Ajay</div><div className="text-[5px] text-orange-600">Work ends 6:30 PM ↔ Trip departs 6:00 PM</div></div></div>
        <div className="bg-red-600 text-white text-[6px] font-bold text-center rounded py-0.5">Let AI resolve both →</div>
      </div>
    </div>
  );
}
function CF10_AIResolution() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-pink-600 px-2 py-1.5"><div className="text-[6px] text-white font-bold">✨ AI — Resolution Suggestions</div></div>
      <div className="flex-1 px-2 py-1.5 space-y-1.5">
        <div className="bg-red-50 border border-red-200 rounded p-1.5"><div className="text-[6px] font-bold text-red-700">Conflict 1: Sarah — Tue</div><div className="text-[5px] font-bold text-green-700">✨ Suggestion: Move Doctor → 5:30 PM</div><div className="flex gap-1 mt-1"><div className="bg-green-600 text-white text-[5px] font-bold rounded px-1 py-0.5">✓ Accept</div><div className="bg-gray-100 text-gray-600 text-[5px] rounded px-1 py-0.5">Edit</div></div></div>
        <div className="bg-orange-50 border border-orange-200 rounded p-1.5"><div className="text-[6px] font-bold text-orange-700">Conflict 2: Ajay — Fri</div><div className="text-[5px] font-bold text-green-700">✨ Suggestion: Move departure → 7:00 PM</div><div className="flex gap-1 mt-1"><div className="bg-green-600 text-white text-[5px] font-bold rounded px-1 py-0.5">✓ Accept</div><div className="bg-gray-100 text-gray-600 text-[5px] rounded px-1 py-0.5">Edit</div></div></div>
      </div>
    </div>
  );
}
function CF10_ConflictsResolved() {
  return (
    <div style={{minHeight:240}} className="flex flex-col items-center justify-start bg-green-50 px-2 py-2">
      <div className="text-3xl mb-1">✅</div>
      <div className="text-[8px] font-bold text-green-800 text-center">All Conflicts Resolved</div>
      <div className="text-[6px] text-green-600 text-center">Calendar auto-updated · All notified</div>
      <div className="mt-2 w-full space-y-0.5">{[{icon:'📅',text:"Sarah's Doctor moved → 5:30 PM"},{icon:'📅',text:"Ajay's trip departure → 7:00 PM"},{icon:'🔔',text:'Sarah notified of new doctor time'},{icon:'📱',text:'Feed: 2 schedule updates posted'},{icon:'✓',text:'Zero conflicts this week'}].map(i=><div key={i.text} className="text-[5px] text-green-700 flex items-center gap-1 bg-white rounded px-1.5 py-0.5 border border-green-100"><span className="text-[7px]">{i.icon}</span><span>{i.text}</span></div>)}</div>
    </div>
  );
}

// ── Calendar: Feature Map (expandable) ───────────────────────────
function CalendarFeatureMap() {
  const [expanded, setExpanded] = useState<string|null>(null);
  const features = [
    { id:'views', title:'Multiple Views', icon:Eye, color:'bg-purple-100 border-purple-300', subs:['Month view — date cells with event color dots (max 3 + overflow badge)','Week view — time-block columns per member OR combined color-coded grid','Day view — hourly slots (6am–midnight), all-day section pinned at top','Availability Matrix — weekly grid (members × days)','Swipe left/right to navigate forward/back in current view'] },
    { id:'metadata', title:'Event Metadata & Attachments', icon:Paperclip, color:'bg-blue-100 border-blue-300', subs:['Title, Date, Start Time, End Time (required)','All-day toggle','Location (text + map pin)','Notes (rich text)','Attachments (PDF, image, invitation) — stored in Document Vault','Repeat rule (None / Daily / Weekly / Monthly / Custom)','Reminder (10 min / 30 min / 1 hr / 1 day / Custom)','Assigned family members (multi-select avatar row)'] },
    { id:'colors', title:'Color Coding & Categorization', icon:Palette, color:'bg-pink-100 border-pink-300', subs:['System categories: School, Work, Health, Travel, Household, Personal','Custom color picker (hex / preset swatches)','Member color: each family member has unique color for week/day views','Category badge on event cards in list/agenda views','Calendar filter: toggle visibility by category or member'] },
    { id:'sync', title:'External Calendar Sync', icon:Cloud, color:'bg-green-100 border-green-300', subs:['Supported: Google Calendar, Outlook, iCloud','Setup: Settings → Connected Accounts → OAuth flow','Synced events shown with source icon badge','Permission model: read-only or read-write per source','Auto-sync every 15 min; manual pull-to-refresh available'] },
    { id:'share', title:'Share Availability as Image', icon:Share2, color:'bg-orange-100 border-orange-300', subs:['Entry: Header toolbar "Share Availability" icon','Step 1: Full-screen month picker — tap dates to toggle available','Step 2: "Create Image" → branded calendar image with Famant logo','Step 3: Preview → Save to Gallery / Share','Share destinations: WhatsApp, Messages, Email, Copy to Clipboard'] },
    { id:'history', title:'Event History (Quick Creation)', icon:History, color:'bg-yellow-100 border-yellow-300', subs:['System tracks last 10–15 unique event types per user','Shown as horizontal scroll carousel in bottom sheet on date tap','Each card: color dot + event title + last used time','Tap card → pre-fills full form (only date/time + members need updating)','History is stored per-user; not shared across family members'] },
    { id:'conflict', title:'Intelligent Conflict Detection', icon:AlertTriangle, color:'bg-red-100 border-red-300', subs:['Triggered: on event Save or on event drag/reschedule','Time overlap for same assigned member','Logistics conflicts (two pickups with same executor)','External sync events overlapping with Famant events','Conflict UI: bottom sheet warning → Save Anyway / Reschedule / Cancel','AI suggestion chip: "Next free slot for [Member] is 5:30 PM"','Conflict visual: orange badge on date, orange bar in week/day view'] },
    { id:'matrix', title:'Family Availability Matrix', icon:Grid3x3, color:'bg-teal-100 border-teal-300', subs:['Access: View switcher → "Matrix" or "Find a Time" in event creation','7-column weekly grid — one row per family member','Cell states: Free (green), Busy (red), Partial/Tentative (amber)','Tap cell → tooltip showing blocking events','Common free row highlighted: "All free: Tue, Thu"'] },
    { id:'filters', title:'Filters & Controls', icon:Filter, color:'bg-indigo-100 border-indigo-300', subs:['Personal / Family toggle (top of screen)','Member avatar filter strip — tap to isolate one member\'s events','Category chip row: School / Work / Health / Travel / Household / All','External source filter: toggle Google / Outlook / iCloud events on/off','Search: full-text across event titles, locations, notes in real-time'] },
    { id:'ai', title:'AI & Intelligent Scheduling', icon:BrainCircuit, color:'bg-violet-100 border-violet-300', subs:['Real-time conflict check while typing time in form (green ✓ / amber ⚠ / red ✗)','Find a Time button → opens Availability Matrix with best slot highlighted','Scan invitation image (OCR + LLM) → auto-fill event form','Natural language quick-add: "Soccer Saturday 4pm at City Ground" → parsed','Pattern detection: 3 consecutive "Gym" on Mondays → suggest recurring event','Post-conflict: AI suggests next 3 common available slots as tappable time chips'] },
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">Feature & Subfeature Structure</h3>
      <p className="text-sm text-gray-500 mb-3">Click to expand and explore features</p>
      <div className="space-y-2">
        {features.map(f=>(
          <div key={f.id}>
            <div className={`border-2 rounded-lg p-3 cursor-pointer flex items-center justify-between ${f.color}`} onClick={()=>setExpanded(expanded===f.id?null:f.id)}>
              <div className="flex items-center gap-2"><f.icon className="w-4 h-4"/><span className="font-semibold text-gray-900 text-sm">{f.title}</span></div>
              {expanded===f.id?<ChevronUp className="w-4 h-4 text-gray-600"/>:<ChevronDown className="w-4 h-4 text-gray-600"/>}
            </div>
            <AnimatePresence>
              {expanded===f.id&&(
                <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="overflow-hidden">
                  <div className="ml-6 mt-2 space-y-1">
                    {f.subs.map((sub,idx)=><motion.div key={idx} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:idx*0.04}} className="text-sm text-gray-700 flex items-start"><span className="text-blue-500 mr-2">→</span><span>{sub}</span></motion.div>)}
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

// ── Calendar: Entry Points Panel ──────────────────────────────────
function CalendarEntryPoints() {
  const entries = [
    { icon:LayoutGrid, color:'bg-purple-100 border-purple-300', iconColor:'text-purple-600', label:'More → Calendar/Reminder', desc:'User taps the "More" tab in bottom navigation, then selects Calendar.', context:'Standard module entry. User is intentionally navigating to plan or review their schedule.' },
    { icon:BrainCircuit, color:'bg-blue-100 border-blue-300', iconColor:'text-blue-600', label:'Dashboard AI Card', desc:'The passive AI layer surfaces a calendar card on the Home dashboard — "You have 3 events this week, 1 conflict detected."', context:'Glanceable entry. User taps the card and is taken directly to the relevant date or conflict view.' },
    { icon:Bell, color:'bg-yellow-100 border-yellow-300', iconColor:'text-yellow-600', label:'Notification Deep-Link', desc:'Push notification fires (15 min, 1 hr, or 1 day before event). User taps → opens directly to that event\'s detail screen.', context:'Action-triggered entry. User arrives at a specific event, not the full calendar view.' },
    { icon:MessageSquare, color:'bg-pink-100 border-pink-300', iconColor:'text-pink-600', label:'AI Chat / Voice', desc:'"Add event tomorrow 5pm" or "What\'s on Sarah\'s schedule this week?" via text or voice in AI tab.', context:'Conversational entry. AI uses A2UI to navigate, prefill, or display calendar data inline in chat.' },
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">Calendar Entry Points</h3>
      <p className="text-sm text-gray-500 mb-4">4 ways a user arrives at the Calendar module</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {entries.map((e,idx)=>(
          <motion.div key={idx} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:idx*0.08}} className={`border-2 rounded-lg p-4 ${e.color}`}>
            <div className="flex items-center gap-2 mb-2"><e.icon className={`w-5 h-5 ${e.iconColor}`}/><span className="font-semibold text-gray-900 text-sm">{e.label}</span></div>
            <p className="text-sm text-gray-700 mb-2">{e.desc}</p>
            <div className="text-xs text-gray-500 bg-white bg-opacity-60 rounded p-2 border border-gray-200"><span className="font-medium">Context: </span>{e.context}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
        <p className="text-sm text-gray-800"><span className="font-semibold text-purple-800">Universal Rule:</span> Regardless of entry point, the calendar always inherits the active <span className="font-medium">family context</span>, the selected <span className="font-medium">member filter</span>, and the <span className="font-medium">personal/family toggle</span> state — so users always see the right view immediately.</p>
      </div>
    </div>
  );
}

// ── Calendar: AI Layer Panel ──────────────────────────────────────
function CalendarAILayer() {
  const layers = [
    { id:'passive', layer:'Layer 1 — Passive AI (Dashboard)', icon:LayoutDashboard, color:'bg-blue-50 border-blue-300', headerColor:'bg-blue-600', desc:'AI surfaces calendar intelligence proactively on the Home dashboard without the user asking.', examples:['"You have 3 events this week — 1 conflict detected"','"Sarah has no free slot Tuesday afternoon (soccer + travel)"','"Budget event due in 2 days: Insurance premium ₹12,000"'], trigger:'Runs automatically on dashboard load based on upcoming events, conflicts, and deadlines.' },
    { id:'interactive', layer:'Layer 2 — Interactive AI (Chat / Voice)', icon:MessageSquare, color:'bg-pink-50 border-pink-300', headerColor:'bg-pink-600', desc:'User directly asks the AI to perform calendar actions through the AI chat tab using text or voice.', examples:['"Add dentist for Sarah next Tuesday at 4:30"','"What is on the family calendar this weekend?"','"Move the school event to Thursday"','"Is anyone free Sunday afternoon?"'], trigger:'Calendar Agent processes intent → uses A2UI to navigate, prefill, and confirm in app.' },
    { id:'inline', layer:'Layer 3 — Inline AI (Inside Calendar Module)', icon:Zap, color:'bg-purple-50 border-purple-300', headerColor:'bg-purple-600', desc:'AI assists the user while they are already inside the Calendar — embedded intelligence within the module.', examples:['Suggest better time slot when form is open (based on family matrix)','Warn: "Sarah has soccer at 4:00 — 4:30 dentist is infeasible"','Scan invitation image → extract event fields into form','Upload insurance doc → auto-create due-date event + payment task'], trigger:'Triggered by form open, image upload, document attachment, or time selection with potential conflict.' },
  ];
  const caps = ['Event creation from voice or text','Conflict detection and resolution','Schedule queries ("What\'s on Sunday?")','Recurring event setup','A2UI: Navigate screens, prefill form fields, highlight conflict zones','Document OCR extraction → calendar event auto-creation','Availability matrix query for best slot suggestions'];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-1"><Bot className="w-6 h-6 text-indigo-600"/><h3 className="text-base font-bold text-gray-900">AI in Calendar — 3-Layer Model</h3></div>
      <p className="text-sm text-gray-500 mb-4">AI operates at three levels: passive intelligence, conversational control, and inline module assistance.</p>
      <div className="space-y-4">
        {layers.map((layer,idx)=>(
          <motion.div key={layer.id} initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:idx*0.12}} className={`border-2 rounded-lg overflow-hidden ${layer.color}`}>
            <div className={`${layer.headerColor} text-white px-4 py-2 flex items-center gap-2`}><layer.icon className="w-4 h-4"/><span className="font-semibold text-sm">{layer.layer}</span></div>
            <div className="p-4">
              <p className="text-sm text-gray-700 mb-3">{layer.desc}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Examples</p><ul className="space-y-1">{layer.examples.map((ex,i)=><li key={i} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-gray-400 mt-0.5">→</span><span>{ex}</span></li>)}</ul></div>
                <div className="bg-white bg-opacity-60 rounded-lg p-3 border border-gray-200 self-start"><p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">When triggered</p><p className="text-sm text-gray-700">{layer.trigger}</p></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.4}} className="mt-5 p-4 bg-indigo-50 border-2 border-indigo-200 rounded-lg">
        <div className="flex items-center gap-2 mb-3"><Bot className="w-4 h-4 text-indigo-600"/><h4 className="font-semibold text-indigo-900 text-sm">Calendar Specialist Agent — Capabilities</h4></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">{caps.map((cap,i)=><div key={i} className="text-sm text-indigo-800 flex items-start gap-2"><span className="text-indigo-400 mt-0.5 flex-shrink-0">✓</span><span>{cap}</span></div>)}</div>
      </motion.div>
    </div>
  );
}

// ── Calendar: Cross-Module Cascade ───────────────────────────────
function CalendarCrossModule() {
  const cascades = [
    { icon:CheckSquare, module:'Tasks & Chores', color:'bg-purple-100 border-purple-300 text-purple-800', dot:'bg-purple-500', examples:['Birthday event → "Buy cake" task assigned to parent','Travel event → "Pack bags", "Book taxi", "Print tickets"','School event → "Submit consent form" todo'] },
    { icon:ShoppingCart, module:'Shared Lists', color:'bg-teal-100 border-teal-300 text-teal-800', dot:'bg-teal-500', examples:['Travel event → Packing list created','Party event → Grocery / supplies list','School reopening event → School supplies list'] },
    { icon:DollarSign, module:'Expenses', color:'bg-emerald-100 border-emerald-300 text-emerald-800', dot:'bg-emerald-500', examples:['Rent due event → Linked expense record created','Insurance event → Expense + reminder task','Event marked complete → Expense auto-logged'] },
    { icon:Activity, module:'Family Feed', color:'bg-orange-100 border-orange-300 text-orange-800', dot:'bg-orange-500', examples:['Event creation appears in household activity stream','Event changes / cancellations broadcast to all members','Shared awareness prevents silent schedule conflicts'] },
    { icon:Bell, module:'Notifications', color:'bg-yellow-100 border-yellow-300 text-yellow-800', dot:'bg-yellow-500', examples:['Push notification sent to all assigned members','Deep-link opens directly to event screen','Reminders: 15 min, 1 hr, 1 day before event','Real-time WebSocket sync across family devices'] },
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">Cross-Module Cascade</h3>
      <p className="text-sm text-gray-500 mb-4">One calendar event save can trigger updates across 5 modules simultaneously</p>
      <div className="flex justify-center mb-4"><div className="bg-indigo-600 text-white rounded-xl px-6 py-3 flex items-center gap-3 shadow-md"><CalendarCheck className="w-6 h-6"/><div><div className="font-bold text-base">Event Saved</div><div className="text-xs text-indigo-200">User saves a new or edited calendar event</div></div></div></div>
      <div className="flex justify-center mb-4"><ArrowDown className="w-5 h-5 text-gray-400"/></div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {cascades.map((c,idx)=>(
          <motion.div key={c.module} initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:idx*0.08}} className={`border-2 rounded-lg p-4 ${c.color}`}>
            <div className="flex items-center gap-2 mb-3"><c.icon className="w-4 h-4"/><h4 className="font-semibold text-sm">{c.module}</h4></div>
            <ul className="space-y-1">{c.examples.map((ex,i)=><li key={i} className="text-xs flex items-start gap-2"><span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`}/><span className="text-gray-700">{ex}</span></li>)}</ul>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600"><span className="font-semibold text-gray-800">Key insight: </span>An event is not just a time slot — it is a coordination object. Tasks answer "what must be done," lists answer "what must be bought," expenses answer "what will it cost," feed answers "who needs to know," and notifications answer "when must they act."</div>
    </div>
  );
}

// ── Calendar: Module Connections ──────────────────────────────────
function CalendarModuleConns() {
  const connections = [
    { icon:CheckSquare, title:'Tasks Module', color:'bg-purple-50 border-purple-200', items:['Create task from event (e.g. "Buy cake" for birthday)','Assign tasks to family members','Link event completion to tasks','Travel event → linked prep tasks (pack, book taxi, print tickets)'] },
    { icon:FolderOpen, title:'Document Vault', color:'bg-blue-50 border-blue-200', items:['Store event attachments (PDFs, invitations, tickets)','Document upload → auto-generate calendar event (insurance due date, invitation scan)','Bi-directional: event references doc, doc triggers event'] },
    { icon:Bell, title:'Notifications', color:'bg-yellow-50 border-yellow-200', items:['Event reminders (15 min, 1 hr, 1 day before)','Assignment alerts to family members','Conflict warnings','Deep-link directly to event screen'] },
    { icon:Sparkles, title:'AI Assistant', color:'bg-pink-50 border-pink-200', items:['Smart scheduling suggestions','Natural language / voice parsing','Image OCR extraction from invitations','A2UI commands: navigate, pre-fill form, highlight conflict','Calendar Agent: creation, conflict detection, recurring events'] },
    { icon:Cloud, title:'External Calendars', color:'bg-green-50 border-green-200', items:['Google Calendar sync','Outlook integration','iCloud sync','Conflict awareness across external sources'] },
    { icon:ShoppingCart, title:'Shared Lists', color:'bg-teal-50 border-teal-200', items:['Travel event → spawn packing list','Party event → grocery / supplies list','School reopening event → school supplies list','Real-time sync across family on linked lists'] },
    { icon:DollarSign, title:'Expenses Module', color:'bg-emerald-50 border-emerald-200', items:['Rent / insurance / subscription events → linked expense record','Event marked complete → auto-log related expense','Vacation event → grouped budget tracking'] },
    { icon:Activity, title:'Family Feed', color:'bg-orange-50 border-orange-200', items:['Event created → appears in household activity stream','Event changed or cancelled → feed update for all members','Reduces silent schedule conflicts in the family'] },
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">Module Connections & Integrations</h3>
      <p className="text-sm text-gray-500 mb-4">How the calendar connects with other Family OS modules</p>
      <div className="space-y-3">
        {connections.map((c,idx)=>(
          <motion.div key={c.title} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:idx*0.06}} className={`border-2 rounded-lg p-4 ${c.color}`}>
            <div className="flex items-center gap-3 mb-2"><c.icon className="w-5 h-5 text-gray-700"/><h4 className="font-semibold text-gray-900">{c.title}</h4><ArrowRightLeft className="w-4 h-4 text-gray-400 ml-auto"/></div>
            <ul className="space-y-1">{c.items.map((item,i)=><li key={i} className="text-sm text-gray-700 flex items-start ml-7"><span className="text-gray-400 mr-2">→</span><span>{item}</span></li>)}</ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Calendar: System Processes ────────────────────────────────────
function CalendarSysProcesses() {
  const processes = [
    { id:'conflict', title:'Conflict Detection Engine', icon:Cpu, color:'bg-red-50 border-red-200', ops:['Triggered: on event Save (before confirmation) or on drag/reschedule','POST /calendar/check-conflict — accepts event payload, returns conflicts per member','Time overlap detection for same assigned member','Logistics conflict: two pickups with same executor at same time','External sync events overlapping with Famant events','Real-time inline check while typing time in form (< 500ms)','Returns: conflict list + AI-suggested next available slots (top 3)'] },
    { id:'notify', title:'Notification System', icon:Bell, color:'bg-yellow-50 border-yellow-200', ops:['Event reminders: 10 min / 30 min / 1 hr / 1 day before (configurable per event)','Assignment alerts: push to all assigned_member_ids on create/update','Conflict warnings included in notification body when conflict flag is set','Reschedule alerts: "Event [Title] moved to [new time]"','Deep-link in push notification → opens directly to event detail screen','Proactive nudges from Home Dashboard AI card'] },
    { id:'sync', title:'Sync System', icon:RefreshCw, color:'bg-blue-50 border-blue-200', ops:['Real-time family sync: WebSocket broadcast via Redis pub/sub on event save','All family devices update calendar instantly without polling','External calendar sync: Google / Outlook / iCloud via webhook receivers','Upsert synced events with source=google/outlook; never overwrite Famant events','Auto-sync external sources every 15 min; manual pull-to-refresh available','Offline-first: local changes queued and synced on reconnect'] },
    { id:'perms', title:'Permissions & Privacy', icon:Shield, color:'bg-green-50 border-green-200', ops:['PostgreSQL Row-Level Security isolates personal vs family events','Personal events: visible only to creator','Family events: visible to all family members (with role check)','Role-based access: admin, member, child (different edit permissions)','External sync permission: read-only or read-write per connected source','AES-256 encryption for stored attachments in Document Vault'] },
    { id:'ai', title:'AI Processing Pipeline', icon:BrainCircuit, color:'bg-violet-50 border-violet-200', ops:['OCR: Google Cloud Vision API extracts text from invitation images / documents','NLP parsing: Gemini 2.0 Flash identifies title, date, time, location from text','Natural language quick-add: "Soccer Saturday 4pm at City Ground" → parsed form','Pattern detection: tracks event type + day-of-week for recurring suggestions','Availability matrix query: GET /calendar/availability-matrix?week=YYYY-WW','Cost-optimized: 85–90% AI cost reduction via caching ($0.38/family/month target)'] },
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">System Processes & Background Behavior</h3>
      <p className="text-sm text-gray-500 mb-4">Automated processes that run in the background</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {processes.map((p,idx)=>(
          <motion.div key={p.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:idx*0.1}} className={`border-2 rounded-lg p-4 ${p.color}`}>
            <div className="flex items-center gap-2 mb-3"><p.icon className="w-5 h-5 text-gray-700"/><h4 className="font-semibold text-gray-900">{p.title}</h4></div>
            <ul className="space-y-1">{p.ops.map((op,i)=><li key={i} className="text-sm text-gray-700 flex items-start"><span className="text-gray-400 mr-2">•</span><span>{op}</span></li>)}</ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Calendar: Screen Flow Diagram (10 flows, tab-based) ───────────
const CAL_FLOWS = [
  { id:'date-tap', label:'Flow 1 — Date Tap & View', color:'bg-blue-600', desc:'User browses calendar → taps a date → sees events → views full event detail', steps:[ {screen:<CF1_CalendarGrid/>,label:'Calendar Main',type:'user'as const},{arrow:'Tap date'},{screen:<CF1_EventPanel/>,label:'Event Panel Opens',type:'system'as const},{arrow:'Tap event'},{screen:<CF1_EventDetail/>,label:'Event Detail View',type:'success'as const} ] },
  { id:'create-event', label:'Flow 2 — FAB Create & Conflict', color:'bg-indigo-600', desc:'User taps FAB → selects creation type → fills form → sees conflict → saves', steps:[ {screen:<CF2_FABMenu/>,label:'Creation Options',type:'user'as const},{arrow:'New Event'},{screen:<CF2_EventForm/>,label:'Event Form',type:'user'as const},{arrow:'Tap Save'},{screen:<CF2_ConflictWarning/>,label:'Conflict Warning',type:'warning'as const},{arrow:'Accept fix'},{screen:<CF2_EventSaved/>,label:'Event Saved + Cascade',type:'success'as const} ] },
  { id:'ai-flow', label:'Flow 3 — AI Chat + Smart Schedule', color:'bg-pink-600', desc:'User speaks to AI → agent parses → conflict detected → AI suggests time → event saved', steps:[ {screen:<CF3_AIChat/>,label:'AI Chat / Voice',type:'user'as const},{arrow:'AI parses + checks'},{screen:<CF3_Prefilled/>,label:'Pre-filled Form (A2UI)',type:'system'as const},{arrow:'User confirms'},{screen:<CF3_CalendarUpdated/>,label:'Calendar Updated',type:'success'as const} ] },
  { id:'doc-event', label:'Flow 4 — Insurance Doc → Recurring', color:'bg-teal-600', desc:'User uploads insurance PDF → AI extracts due date + amount → creates RECURRING yearly event + expense link + auto-task rule', steps:[ {screen:<CF4_DocUpload/>,label:'Upload Insurance PDF',type:'user'as const},{arrow:'AI extracts fields'},{screen:<CF4_InsurancePrefilled/>,label:'Event Pre-filled (AI)',type:'system'as const},{arrow:'Confirm & save'},{screen:<CF4_InsuranceSaved/>,label:'Recurring Event Saved',type:'success'as const} ] },
  { id:'cal-expense', label:'Flow 5 — Calendar ↔ Expense Auto-Update', color:'bg-emerald-600', desc:'Recurring insurance event in calendar → user marks event as paid → expense tracker auto-logs ₹12,000 → next cycle auto-scheduled', steps:[ {screen:<CF5_RecurringCalendar/>,label:'Calendar: Recurring Event',type:'user'as const},{arrow:'Open → mark paid'},{screen:<CF5_MarkComplete/>,label:'Mark as Paid / Complete',type:'user'as const},{arrow:'Confirm'},{screen:<CF5_ExpenseAutoLog/>,label:'Expense Auto-Logged',type:'success'as const},{arrow:'System schedules next'},{screen:<CF5_NextOccurrence/>,label:'Next Year Auto-Scheduled',type:'system'as const} ] },
  { id:'task-chain', label:'Flow 6 — Recurring → Task → 3-Way Chain', color:'bg-red-600', desc:'7 days before insurance due → HIGH PRIORITY task auto-created → task linked to calendar event + expense → completing task updates all 3 modules', steps:[ {screen:<CF6_Upcoming7Days/>,label:'7 Days Before Due — Trigger',type:'system'as const},{arrow:'Auto-creates task'},{screen:<CF6_PriorityTask/>,label:'HIGH PRIORITY Task Created',type:'warning'as const},{arrow:'Open task detail'},{screen:<CF6_TaskDetail3Way/>,label:'Task ↔ Calendar ↔ Expense',type:'normal'as const},{arrow:'Complete task'},{screen:<CF6_ChainCompletion/>,label:'3 Modules Updated Instantly',type:'success'as const} ] },
  { id:'trip', label:'Flow 7 — Trip Event → 4-Module Cascade', color:'bg-sky-600', desc:'User creates a multi-day trip event → AI detects travel category → auto-spawns: packing list, prep tasks, and expense budget tracker — all linked to the event', steps:[ {screen:<CF7_TripForm/>,label:'Trip Event Form',type:'user'as const},{arrow:'AI detects → save'},{screen:<CF7_PackingList/>,label:'Packing List Auto-Created',type:'success'as const},{arrow:'Tasks module'},{screen:<CF7_TripTasks/>,label:'Prep Tasks + Assignments',type:'system'as const},{arrow:'Expense module'},{screen:<CF7_TripExpense/>,label:'Budget Tracker Linked',type:'success'as const} ] },
  { id:'matrix', label:'Flow 8 — Matrix → Conflict-Free Event', color:'bg-purple-600', desc:'User sees all members free on Thursday → selects members to compare → views parallel day timeline → taps the 6–10 PM free slot → event form pre-fills → zero-conflict save', steps:[ {screen:<CF8_DateMemberPick/>,label:'Select Date + Members',type:'user'as const},{arrow:'Tap Compare'},{screen:<CF8_ParallelDayView/>,label:'Parallel Day View + AI Slot',type:'system'as const},{arrow:'Tap free 6–10 PM'},{screen:<CF8_EventCreate/>,label:'Add Event (Pre-filled)',type:'success'as const} ] },
  { id:'birthday', label:'Flow 9 — Birthday → Multi-Module Setup', color:'bg-pink-600', desc:'User creates a birthday party event → AI detects birthday category → offers to auto-create prep tasks, grocery list, expense budget, yearly recurrence, and family reminders', steps:[ {screen:<CF9_BirthdayForm/>,label:'Birthday Party Event Form',type:'user'as const},{arrow:'AI suggests links'},{screen:<CF9_ModuleSuggestions/>,label:'AI Module Suggestions',type:'system'as const},{arrow:'Accept all → save'},{screen:<CF9_BirthdayAllLinked/>,label:'6 Modules Linked Instantly',type:'success'as const} ] },
  { id:'ai-conflict', label:'Flow 10 — AI Dashboard → Conflict Fix', color:'bg-gray-700', desc:'Passive AI on Home dashboard detects 2 schedule conflicts → user taps the alert card → opens calendar with conflicts highlighted → AI proposes smart resolutions → one-tap accept → all notified', steps:[ {screen:<CF10_Dashboard/>,label:'Home Dashboard — AI Alert',type:'user'as const},{arrow:'Tap "Fix →" card'},{screen:<CF10_ConflictsHighlighted/>,label:'Calendar: Conflicts Shown',type:'warning'as const},{arrow:'Let AI resolve'},{screen:<CF10_AIResolution/>,label:'AI Suggests Reschedule',type:'system'as const},{arrow:'Accept both'},{screen:<CF10_ConflictsResolved/>,label:'All Resolved + Notified',type:'success'as const} ] },
];

function CalendarScreenFlows() {
  const [activeFlow, setActiveFlow] = useState('date-tap');
  const current = CAL_FLOWS.find(f=>f.id===activeFlow)!;
  const legend = [{color:'border-blue-600',label:'User Action'},{color:'border-purple-600',label:'System Process'},{color:'border-red-500',label:'Warning / Conflict'},{color:'border-green-600',label:'Success / Output'},{color:'border-gray-700',label:'Neutral Screen'}];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">Screen-by-Screen Flow Diagrams</h3>
      <p className="text-sm text-gray-500 mb-4">10 complete user journeys shown as connected phone screens — select a flow to explore</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {CAL_FLOWS.map(f=>(
          <button key={f.id} onClick={()=>setActiveFlow(f.id)} className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${activeFlow===f.id?`${f.color} text-white shadow-md`:'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{f.label}</button>
        ))}
      </div>
      <div className={`${current.color} text-white text-xs font-medium rounded-lg px-4 py-2 mb-4`}>{current.desc}</div>
      <div className="flex flex-wrap gap-3 mb-4">
        {legend.map(l=><div key={l.label} className="flex items-center gap-1.5"><div className={`w-3 h-3 rounded-sm border-2 ${l.color}`}/><span className="text-[10px] text-gray-600">{l.label}</span></div>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={activeFlow} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="overflow-x-auto pb-4">
          <div className="flex items-start gap-1 min-w-max px-2">
            {current.steps.map((step,idx)=>{
              if('arrow' in step) return <CalFlowArrow key={idx} label={step.arrow}/>;
              return (
                <motion.div key={idx} initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:idx*0.07}}>
                  <CalPhone label={step.label} type={step.type}>{step.screen}</CalPhone>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-3 text-xs text-gray-400 text-right">{current.steps.filter(s=>'screen' in s).length} screens in this flow</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// EXPENSE TRACKING MODULE — Screens, Flows, Panels
// ═══════════════════════════════════════════════════════════════════

// ── Expense: Main Screen ──────────────────────────────────────────
function ExpenseMainScreen() {
  return (
    <div className="flex flex-col h-full" style={{ minHeight: 280 }}>
      <div className="bg-rose-600 text-white px-2 pt-3 pb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[7px] font-bold">Expenses</span>
          <span className="text-[5px]">March 2026</span>
        </div>
        <div className="flex gap-1 mb-1">
          <span className="bg-white text-rose-700 px-1.5 py-0.5 rounded text-[5px] font-semibold">Personal</span>
          <span className="text-white/70 px-1.5 py-0.5 rounded text-[5px]">Family</span>
        </div>
        <div className="text-[5px] text-rose-100">Spent ₹8,240 of ₹15,000</div>
        <div className="mt-1 h-1 bg-rose-800 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full" style={{width:'55%'}}/></div>
      </div>
      <div className="px-1.5 py-1 border-b border-gray-100">
        <div className="text-[5px] font-semibold text-gray-500 mb-0.5">BUDGET</div>
        {[{cat:'Food',pct:72,color:'bg-rose-400'},{cat:'Transport',pct:45,color:'bg-pink-400'},{cat:'Entertainment',pct:88,color:'bg-orange-400'}].map(b=>(
          <div key={b.cat} className="flex items-center gap-1 mb-0.5">
            <span className="text-[4px] w-10 text-gray-600">{b.cat}</span>
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full rounded-full ${b.color}`} style={{width:`${b.pct}%`}}/></div>
            <span className="text-[4px] text-gray-500">{b.pct}%</span>
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-hidden px-1.5 py-1">
        <div className="text-[5px] font-semibold text-gray-500 mb-0.5">RECENT</div>
        {[{emoji:'🛒',desc:'Grocery Store',amt:'₹1,240',who:'Mom'},{emoji:'🚗',desc:'Fuel',amt:'₹800',who:'Dad'},{emoji:'🎬',desc:'Movie Tickets',amt:'₹600',who:'Dad'},{emoji:'💊',desc:'Pharmacy',amt:'₹320',who:'Mom'}].map((tx,i)=>(
          <div key={i} className="flex items-center gap-1 py-0.5 border-b border-gray-50">
            <span className="text-[7px]">{tx.emoji}</span>
            <div className="flex-1 min-w-0"><div className="text-[4px] font-medium text-gray-800 truncate">{tx.desc}</div><div className="text-[4px] text-gray-400">{tx.who}</div></div>
            <span className="text-[5px] font-semibold text-gray-800">{tx.amt}</span>
          </div>
        ))}
      </div>
      <div className="pb-2 flex justify-end px-2"><div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center shadow-md"><span className="text-white text-[10px] font-bold">+</span></div></div>
    </div>
  );
}

function AddExpenseScreen() {
  return (
    <div className="flex flex-col h-full" style={{ minHeight: 280 }}>
      <div className="bg-rose-600 text-white px-2 pt-3 pb-2"><div className="flex items-center gap-1"><span className="text-[6px]">←</span><span className="text-[6px] font-bold">Add Expense</span></div></div>
      <div className="flex-1 px-2 py-1.5 space-y-1.5 overflow-hidden">
        <div className="text-center py-1 bg-rose-50 rounded-lg"><div className="text-[5px] text-gray-400 mb-0.5">AMOUNT</div><div className="text-[14px] font-bold text-rose-600">₹1,240</div></div>
        <div className="border border-gray-200 rounded px-1.5 py-1 bg-gray-50"><div className="text-[4px] text-gray-400">Description</div><div className="text-[5px] text-gray-700">Grocery Store</div></div>
        <div><div className="text-[4px] text-gray-400 mb-0.5">Category</div><div className="flex gap-1 flex-wrap">{['🛒 Food','🚗 Transport','🎬 Fun','💊 Health'].map(c=><span key={c} className={`text-[4px] px-1 py-0.5 rounded ${c.startsWith('🛒')?'bg-rose-500 text-white':'bg-gray-100 text-gray-600'}`}>{c}</span>)}</div></div>
        <div className="border border-gray-200 rounded px-1.5 py-1 bg-gray-50"><div className="text-[4px] text-gray-400">Paid By</div><div className="text-[5px] text-gray-700">👩 Mom</div></div>
        <div className="border border-rose-200 rounded px-1.5 py-1 bg-rose-50"><div className="text-[4px] text-gray-400">Split Among</div><div className="flex gap-1 mt-0.5">{['👨 Dad','👩 Mom','👧 Anvi'].map(m=><span key={m} className="text-[4px] bg-white border border-rose-200 rounded px-0.5 py-0.5">{m}</span>)}</div></div>
        <div className="border border-gray-200 rounded px-1.5 py-1 bg-gray-50"><div className="text-[4px] text-gray-400">Date</div><div className="text-[5px] text-gray-700">18 Mar 2026 · Today</div></div>
        <div className="w-full bg-rose-500 text-white text-center py-1 rounded-lg"><span className="text-[6px] font-semibold">Save Expense</span></div>
      </div>
    </div>
  );
}

function ReceiptConfirmScreen() {
  return (
    <div className="flex flex-col h-full" style={{ minHeight: 280 }}>
      <div className="bg-rose-600 text-white px-2 pt-3 pb-2"><div className="flex items-center gap-1"><span className="text-[6px]">←</span><span className="text-[6px] font-bold">Receipt Scanned</span></div></div>
      <div className="flex-1 px-2 py-1.5 space-y-1.5 overflow-hidden">
        <div className="bg-gray-100 rounded-lg h-10 flex items-center justify-center border border-dashed border-gray-300"><div className="text-center"><div className="text-[7px]">🧾</div><div className="text-[4px] text-gray-500">Receipt Image</div></div></div>
        <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5"><span className="text-[4px]">✓</span><span className="text-[4px] text-emerald-700 font-medium">Auto-extracted via OCR</span></div>
        {[{label:'Merchant',value:'Big Bazaar Supermart'},{label:'Total Amount',value:'₹2,340'},{label:'Date',value:'18 Mar 2026'}].map(f=><div key={f.label} className="border border-rose-200 bg-rose-50 rounded px-1.5 py-1"><div className="text-[4px] text-gray-400">{f.label}</div><div className="text-[5px] font-medium text-gray-800">{f.value}</div></div>)}
        <div className="text-[4px] text-gray-400 italic">Tap any field to edit before saving</div>
        <div className="border border-gray-200 rounded px-1.5 py-1 bg-gray-50"><div className="text-[4px] text-gray-400">Paid By</div><div className="text-[5px] text-gray-700">👩 Mom  ▾</div></div>
        <div className="w-full bg-rose-500 text-white text-center py-1 rounded-lg"><span className="text-[6px] font-semibold">Confirm &amp; Save</span></div>
      </div>
    </div>
  );
}

// ── Expense: Small Phone for Flows ────────────────────────────────
function ExpPhone({ children, label, sublabel }: { children: React.ReactNode; label: string; sublabel?: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0">
      <div className="relative bg-gray-900 rounded-[2rem] p-2 shadow-xl" style={{width:130,height:260}}>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-2 bg-gray-800 rounded-full z-10"/>
        <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden flex flex-col">{children}</div>
      </div>
      <span className="text-[10px] font-semibold text-gray-700 text-center">{label}</span>
      {sublabel && <span className="text-[9px] text-gray-400 text-center">{sublabel}</span>}
    </div>
  );
}
function ExpArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 self-center shrink-0">
      {label && <span className="text-[9px] text-gray-400">{label}</span>}
      <div className="flex items-center"><div className="w-8 h-0.5 bg-rose-300"/><div className="border-t-[4px] border-b-[4px] border-l-[5px] border-transparent border-l-rose-300"/></div>
    </div>
  );
}

// ── Expense: 4 Flow Screens ───────────────────────────────────────
function EFlow1() {
  return (
    <div className="flex flex-wrap gap-3 items-start justify-center">
      <ExpPhone label="Expense Main" sublabel="Transaction timeline">
        <div className="flex flex-col h-full text-[5px]">
          <div className="bg-rose-600 text-white px-2 pt-4 pb-1.5"><div className="text-[6px] font-bold mb-0.5">Expenses</div><div className="text-[5px] text-rose-100">Spent ₹8,240 / ₹15,000</div></div>
          <div className="flex-1 px-1.5 py-1 space-y-0.5">{['🛒 Grocery ₹1,240','🚗 Fuel ₹800','🎬 Movie ₹600'].map(t=><div key={t} className="text-[4px] py-0.5 border-b border-gray-100 text-gray-700">{t}</div>)}</div>
          <div className="pb-2 flex justify-end px-2"><div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center"><span className="text-white text-[9px] font-bold">+</span></div></div>
        </div>
      </ExpPhone>
      <ExpArrow label="Tap +" />
      <ExpPhone label="Add Expense Form" sublabel="Fill amount & details">
        <div className="flex flex-col h-full text-[5px]">
          <div className="bg-rose-600 text-white px-2 pt-4 pb-1.5"><div className="text-[6px] font-bold">Add Expense</div></div>
          <div className="flex-1 px-1.5 py-1 space-y-1">
            <div className="text-center bg-rose-50 rounded py-1"><div className="text-[12px] font-bold text-rose-600">₹320</div></div>
            <div className="border border-gray-200 rounded px-1 py-0.5"><div className="text-[4px] text-gray-400">Category</div><div className="text-[4px]">💊 Health</div></div>
            <div className="border border-gray-200 rounded px-1 py-0.5"><div className="text-[4px] text-gray-400">Paid By</div><div className="text-[4px]">👩 Mom</div></div>
            <div className="border border-rose-200 rounded px-1 py-0.5 bg-rose-50"><div className="text-[4px] text-gray-400">Split</div><div className="text-[4px]">Family (3)</div></div>
          </div>
          <div className="px-1.5 pb-2"><div className="bg-rose-500 text-white text-center py-0.5 rounded text-[5px] font-semibold">Save</div></div>
        </div>
      </ExpPhone>
      <ExpArrow label="Save" />
      <ExpPhone label="Saved + Feed" sublabel="Activity card posted">
        <div className="flex flex-col h-full text-[5px]">
          <div className="bg-rose-600 text-white px-2 pt-4 pb-1.5"><div className="text-[6px] font-bold">Expenses</div></div>
          <div className="flex-1 px-1.5 py-1 space-y-1">
            <div className="bg-emerald-50 border border-emerald-200 rounded px-1 py-0.5 flex items-center gap-1"><span>✓</span><span className="text-[4px] text-emerald-700">Expense saved!</span></div>
            <div className="text-[4px] font-semibold text-gray-500 mt-1">FAMILY FEED</div>
            <div className="bg-purple-50 border border-purple-200 rounded px-1 py-0.5"><div className="text-[4px] text-purple-700">💊 Mom logged Pharmacy ₹320</div></div>
            <div className="text-[4px] text-gray-400">Dashboard widget updated</div>
          </div>
        </div>
      </ExpPhone>
    </div>
  );
}

function EFlow2() {
  return (
    <div className="flex flex-wrap gap-3 items-start justify-center">
      <ExpPhone label="Camera View" sublabel="Point at receipt">
        <div className="flex flex-col h-full text-[5px]">
          <div className="bg-gray-900 text-white px-2 pt-4 pb-1 flex-1 flex flex-col">
            <div className="text-[6px] font-bold mb-1">📷 Scan Receipt</div>
            <div className="flex-1 bg-gray-800 rounded flex items-center justify-center">
              <div className="border-2 border-dashed border-rose-400 w-16 h-20 rounded flex items-center justify-center"><span className="text-[7px]">🧾</span></div>
            </div>
            <div className="text-[4px] text-gray-400 text-center mt-1">Align receipt in frame</div>
          </div>
        </div>
      </ExpPhone>
      <ExpArrow label="OCR" />
      <ExpPhone label="OCR Processing" sublabel="Google Vision API">
        <div className="flex flex-col h-full text-[5px]">
          <div className="bg-rose-600 text-white px-2 pt-4 pb-1.5"><div className="text-[6px] font-bold">Extracting...</div></div>
          <div className="flex-1 flex flex-col items-center justify-center gap-1 px-2">
            <div className="text-[9px]">🔍</div>
            <div className="text-[4px] text-gray-500 text-center">Merchant · Total · Date</div>
            <div className="w-full bg-gray-200 rounded-full h-0.5 overflow-hidden"><div className="bg-rose-400 h-0.5 rounded-full" style={{width:'70%'}}/></div>
          </div>
        </div>
      </ExpPhone>
      <ExpArrow label="Review" />
      <ExpPhone label="Confirm & Save" sublabel="Edit then confirm">
        <div className="flex flex-col h-full text-[5px]">
          <div className="bg-rose-600 text-white px-2 pt-4 pb-1.5"><div className="text-[6px] font-bold">Receipt Scanned</div></div>
          <div className="flex-1 px-1.5 py-1 space-y-1">
            <div className="bg-emerald-50 border border-emerald-200 rounded px-1 py-0.5 text-[4px] text-emerald-700">✓ Auto-extracted</div>
            <div className="border border-rose-200 bg-rose-50 rounded px-1 py-0.5"><div className="text-[4px] text-gray-400">Merchant</div><div className="text-[4px]">Big Bazaar</div></div>
            <div className="border border-rose-200 bg-rose-50 rounded px-1 py-0.5"><div className="text-[4px] text-gray-400">Amount</div><div className="text-[4px]">₹2,340</div></div>
            <div className="border border-rose-200 bg-rose-50 rounded px-1 py-0.5"><div className="text-[4px] text-gray-400">Date</div><div className="text-[4px]">18 Mar 2026</div></div>
          </div>
          <div className="px-1.5 pb-2"><div className="bg-rose-500 text-white text-center py-0.5 rounded text-[5px] font-semibold">Confirm &amp; Save</div></div>
        </div>
      </ExpPhone>
    </div>
  );
}

function EFlow3() {
  return (
    <div className="flex flex-wrap gap-3 items-start justify-center">
      <ExpPhone label="Voice Trigger" sublabel="Speak the command">
        <div className="flex flex-col h-full text-[5px]">
          <div className="bg-rose-600 text-white px-2 pt-4 pb-1.5"><div className="text-[6px] font-bold">AI Assistant</div></div>
          <div className="flex-1 flex flex-col items-center justify-center gap-2 px-2">
            <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center border-2 border-rose-300"><span className="text-[14px]">🎙️</span></div>
            <div className="text-[4px] text-gray-500 text-center">Listening...</div>
            <div className="flex gap-0.5 items-end h-3">{[2,4,3,5,2,4,3].map((h,i)=><div key={i} className="w-0.5 bg-rose-400 rounded-full" style={{height:h*2}}/>)}</div>
            <div className="bg-gray-100 rounded px-1.5 py-0.5 text-center"><div className="text-[4px] text-gray-600 italic">"I bought milk for ₹120"</div></div>
          </div>
        </div>
      </ExpPhone>
      <ExpArrow label="AI parse" />
      <ExpPhone label="AI Confirmation" sublabel="Review parsed details">
        <div className="flex flex-col h-full text-[5px]">
          <div className="bg-rose-600 text-white px-2 pt-4 pb-1.5"><div className="text-[6px] font-bold">Expense Detected</div></div>
          <div className="flex-1 px-1.5 py-1 space-y-1">
            <div className="bg-blue-50 border border-blue-200 rounded px-1 py-0.5"><div className="text-[4px] text-blue-700 font-medium">Finance AI parsed:</div></div>
            {[['Item','Milk'],['Amount','₹120'],['Category','🛒 Food'],['Date','Today']].map(([l,v])=><div key={l} className="flex justify-between border-b border-gray-100 py-0.5"><span className="text-[4px] text-gray-400">{l}</span><span className="text-[4px] font-medium text-gray-700">{v}</span></div>)}
          </div>
          <div className="px-1.5 pb-2 flex gap-1"><div className="flex-1 border border-gray-200 text-center py-0.5 rounded text-[5px] text-gray-600">Edit</div><div className="flex-1 bg-rose-500 text-white text-center py-0.5 rounded text-[5px] font-semibold">Log It</div></div>
        </div>
      </ExpPhone>
      <ExpArrow label="Logged" />
      <ExpPhone label="Logged + Feed" sublabel="No navigation needed">
        <div className="flex flex-col h-full text-[5px]">
          <div className="bg-rose-600 text-white px-2 pt-4 pb-1.5"><div className="text-[6px] font-bold">AI Assistant</div></div>
          <div className="flex-1 px-1.5 py-2 space-y-1.5">
            <div className="bg-emerald-50 border border-emerald-200 rounded px-1 py-0.5"><div className="text-[4px] text-emerald-700">✓ Logged: Milk ₹120 (Food)</div></div>
            <div className="bg-gray-50 border border-gray-200 rounded px-1 py-0.5"><div className="text-[4px] text-gray-600">"Got it! Milk ₹120 logged under Food. Your food spend is now ₹3,840 this month."</div></div>
            <div className="text-[4px] text-gray-400">Family Feed notified · Dashboard updated</div>
          </div>
        </div>
      </ExpPhone>
    </div>
  );
}

function EFlow4() {
  return (
    <div className="flex flex-wrap gap-3 items-start justify-center">
      <ExpPhone label="Home Dashboard" sublabel="Budget nudge card">
        <div className="flex flex-col h-full text-[5px]">
          <div className="bg-gray-800 text-white px-2 pt-4 pb-1.5"><div className="text-[6px] font-bold">Good morning, Dad 👋</div></div>
          <div className="flex-1 px-1.5 py-1 space-y-1">
            <div className="bg-orange-50 border border-orange-300 rounded px-1 py-0.5"><div className="text-[4px] text-orange-700 font-semibold">⚠️ Budget Alert</div><div className="text-[4px] text-orange-600">Entertainment is at 88%. ₹240 remaining.</div></div>
            <div className="bg-rose-50 border border-rose-200 rounded px-1 py-0.5"><div className="text-[4px] text-rose-700">Financials · Spent ₹8,240 / ₹15,000</div><div className="text-[4px] text-rose-500 underline">View Report →</div></div>
          </div>
        </div>
      </ExpPhone>
      <ExpArrow label="View Report" />
      <ExpPhone label="Monthly Report" sublabel="Full category breakdown">
        <div className="flex flex-col h-full text-[5px]">
          <div className="bg-rose-600 text-white px-2 pt-4 pb-1.5"><div className="text-[6px] font-bold">March Report</div><div className="text-[4px] text-rose-100">Total: ₹8,240 / ₹15,000</div></div>
          <div className="flex-1 px-1.5 py-1 space-y-0.5 overflow-hidden">
            {[{cat:'Food',pct:77},{cat:'Transport',pct:45},{cat:'Entertainment',pct:88},{cat:'Health',pct:20}].map(b=>(
              <div key={b.cat} className="text-[4px]">
                <div className="flex justify-between text-gray-600"><span>{b.cat}</span><span>{b.pct}%</span></div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-0.5"><div className={`h-full rounded-full ${b.pct>=80?'bg-orange-400':'bg-rose-400'}`} style={{width:`${b.pct}%`}}/></div>
              </div>
            ))}
            <div className="mt-1 bg-blue-50 rounded px-1 py-0.5 text-[4px] text-blue-700">AI: "You typically spend 20% more on Food in March."</div>
          </div>
        </div>
      </ExpPhone>
      <ExpArrow label="Update" />
      <ExpPhone label="Budget Updated" sublabel="AI updates cap">
        <div className="flex flex-col h-full text-[5px]">
          <div className="bg-rose-600 text-white px-2 pt-4 pb-1.5"><div className="text-[6px] font-bold">Budget Settings</div></div>
          <div className="flex-1 px-1.5 py-1 space-y-1">
            <div className="text-[4px] text-gray-500">Entertainment Budget</div>
            <div className="border border-gray-200 rounded px-1 py-0.5"><div className="text-[4px] text-gray-400">Current</div><div className="text-[5px] font-semibold text-gray-700">₹2,500</div></div>
            <div className="border border-rose-300 rounded px-1 py-0.5 bg-rose-50"><div className="text-[4px] text-gray-400">New Limit</div><div className="text-[5px] font-semibold text-rose-700">₹3,000</div></div>
            <div className="bg-emerald-50 border border-emerald-200 rounded px-1 py-0.5"><div className="text-[4px] text-emerald-700">✓ Budget updated by AI</div></div>
          </div>
        </div>
      </ExpPhone>
    </div>
  );
}

// ── Expense: Feature Map ──────────────────────────────────────────
function ExpenseFeatureMap() {
  const [expanded, setExpanded] = useState<string|null>(null);
  const features = [
    { id:'history', label:'Transaction History', desc:'Fast-log expense timeline with amount, description, category, date, and paid-by. Designed for low friction entry.', subs:['Chronological list view','Category icon per entry','Paid-by & date display','Tap to expand detail','Long-press quick actions'] },
    { id:'category', label:'Category System', desc:'Predefined categories (Food, Transport, Entertainment, etc.) with colour-coded icons. Custom categories can be created.', subs:['Predefined categories: Food, Transport, Entertainment','Colour-coded visual icons','Custom category creation','Per-category budget assignment','Filter timeline by category'] },
    { id:'split', label:'Split Tracking', desc:'Distinct "Paid By" and "Split Among" fields. Supports couples, roommates, and full families with equal or custom splits.', subs:['Paid By vs Split Among fields','Equal / Custom percentage / Custom amount modes','Per-member ledger view','Split badge on transaction cards','Works for couples & full families'] },
    { id:'recurring', label:'Recurring Transactions', desc:'Expenses tied to recurring calendar events (Rent, Insurance, Subscriptions). Event completion triggers auto-log or auto-update.', subs:['Link to recurring calendar event','Auto-log on event completion','Supports: Rent, Insurance, Utilities, Subscriptions','Task completion → expense auto-update','No duplicate manual entry needed'] },
    { id:'ocr', label:'Receipt OCR Auto-Create', desc:'Photograph a bill — Google Vision API extracts merchant, total, and date automatically. One-tap confirmation to save.', subs:['Camera capture or gallery upload','Google Vision API OCR pipeline','Extracts: merchant, total, date','Auto-populated form for review','Receipt image stored in Document Vault'] },
    { id:'budget', label:'Budget Monitoring & Alerts', desc:'Set per-category monthly budget caps. Real-time alerts when approaching (80%) or exceeding (100%) limits. AI nudge cards on home dashboard.', subs:['Per-category budget caps','Overall monthly budget option','Orange alert at 80% threshold','Red overspend alert at 100%','AI nudge card on home dashboard','Real-time push notification'] },
    { id:'layer', label:'Personal vs Family Layer', desc:'Universal toggle switches between Personal (private) and Family (shared) expense views. Role-based visibility for children.', subs:['Personal ↔ Family toggle (universal)','Private personal expenses','Family-shared expense feed','Parent/admin: full detail access','Child role: summary count only','Member avatar filter in header'] },
    { id:'voice', label:'Voice Expense Logging', desc:'Natural language voice input: "I bought milk for ₹120." Finance AI parses item, amount, category, and date instantly.', subs:['Natural language voice input','Finance AI parses: item, amount, category, date','Default date: today if unspecified','Confirmation card before saving','No app navigation required','Waveform visual feedback'] },
    { id:'report', label:'Monthly Report & Insights', desc:'View full monthly breakdown by category and member. AI Finance agent provides spending summaries and trend insights.', subs:['Monthly spending by category','Member-level breakdown','Category trends vs prior months','AI-generated summary text','"View Report" accessible from dashboard','ExpenseChart A2UI component'] },
    { id:'charts', label:'Spending Charts & Data Export', desc:'Visual analytics: pie chart of spending by category and line graph over time. Premium: full CSV/JSON data export.', subs:['Pie chart: spending distribution by category','Line graph: spending trend over weeks and months','Category vs budget comparison bar chart','Weekly and monthly time-range selector','Accessible via "View Report" link on budget bars','Premium: bulk export to CSV or JSON format'] },
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">Feature Map — 10 Features</h3>
      <p className="text-sm text-gray-500 mb-3">Click to expand and explore each feature</p>
      <div className="space-y-2">
        {features.map(f=>(
          <div key={f.id} className={`rounded-lg border transition-colors ${expanded===f.id?'border-rose-300 bg-rose-50':'border-gray-200 bg-gray-50 hover:bg-rose-50/40'}`}>
            <button onClick={()=>setExpanded(expanded===f.id?null:f.id)} className="w-full flex items-center justify-between p-3 text-left">
              <span className="text-sm font-medium text-gray-800">{f.label}</span>
              <motion.div animate={{rotate:expanded===f.id?180:0}} transition={{duration:0.2}}><ChevronDown className="w-4 h-4 text-gray-400"/></motion.div>
            </button>
            <AnimatePresence initial={false}>
              {expanded===f.id&&(
                <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25}} className="overflow-hidden">
                  <div className="px-3 pb-3 space-y-2">
                    <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                    <ul className="space-y-1">{f.subs.map((sf,idx)=><li key={idx} className="flex items-start gap-1.5"><span className="text-rose-400 text-xs mt-0.5">•</span><span className="text-xs text-gray-600">{sf}</span></li>)}</ul>
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

// ── Expense: Entry Points ─────────────────────────────────────────
function ExpenseEntryPoints() {
  const entries = [
    { icon:LayoutGrid, color:'bg-rose-50 border-rose-200', iconColor:'text-rose-600', label:'More → Budgeting Tile', desc:'User navigates to the More/Modules grid screen and taps the "Budgeting" tile — opens the Expense Tracker module directly.' },
    { icon:BarChart2, color:'bg-pink-50 border-pink-200', iconColor:'text-pink-600', label:'Dashboard Financials Widget', desc:'Home screen lower section shows "Spent ₹X of ₹Y this month." Tap "View Report" to enter the full Expense module with monthly breakdown.' },
    { icon:MessageSquare, color:'bg-red-50 border-red-200', iconColor:'text-red-600', label:'AI Chat / Voice Command', desc:'User says or types "Log ₹500 dinner expense" or "How much did we spend on food this week?" Finance AI agent logs or navigates to Expenses.' },
    { icon:Camera, color:'bg-orange-50 border-orange-200', iconColor:'text-orange-600', label:'Camera / Receipt Scan', desc:'Tap the camera icon (FAB or AI widget) → photograph receipt → OCR auto-creates expense → confirmation screen opens inside Expenses module.' },
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">Entry Points — 4 Ways In</h3>
      <p className="text-sm text-gray-500 mb-4">How users arrive at the Expense Tracking module</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {entries.map((e,idx)=>(
          <div key={idx} className={`p-4 rounded-lg border ${e.color}`}>
            <div className="flex items-center gap-2 mb-2"><e.icon className={`w-5 h-5 ${e.iconColor}`}/><span className="text-sm font-semibold text-gray-800">{e.label}</span></div>
            <p className="text-xs text-gray-600 leading-relaxed">{e.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg"><p className="text-xs text-rose-800"><span className="font-semibold">Universal rule:</span> Any notification about a budget alert or expense reminder deep-links directly to the relevant expense record or category breakdown.</p></div>
    </div>
  );
}

// ── Expense: AI Layer ─────────────────────────────────────────────
function ExpenseAILayer() {
  const layers = [
    { icon:Brain, label:'Passive Layer — Dashboard AI', color:'bg-rose-50 border-rose-200', headerColor:'bg-rose-100 text-rose-800', iconColor:'text-rose-600', desc:'AI monitors spending continuously. Proactive nudge cards appear on home dashboard when approaching/exceeding budget caps. ExpenseChart rendered via A2UI component registry.' },
    { icon:MessageCircle, label:'Interactive Layer — Chat & Voice', color:'bg-pink-50 border-pink-200', headerColor:'bg-pink-100 text-pink-800', iconColor:'text-pink-600', desc:'Finance AI agent in the chat/voice interface. Logs expenses via natural language, queries spending history, calculates splits, summarises monthly budgets, and navigates to expense detail via A2UI.' },
    { icon:Zap, label:'Inline Layer — Module AI Button', color:'bg-red-50 border-red-200', headerColor:'bg-red-100 text-red-800', iconColor:'text-red-600', desc:"Inside the Expenses module, an inline AI button enables: auto-categorise selected expense, rewrite description, summarise month's spending, and update budget limit directly in the form." },
  ];
  const caps = ['Natural language expense logging ("I bought milk for ₹120")','Auto-categorisation using purchase context','Budget analysis: current spend vs monthly cap','Split calculation suggestions (equal / custom)','Recurring bill detection and reminders','Receipt OCR extraction via Google Vision API','Proactive overspend nudges on home dashboard','Anomaly detection: flags unusual spending vs. historical patterns','Category auto-recommendation based on transaction description','A2UI: navigate to Expenses screen + highlight items','A2UI: update budget cap directly via ExpenseChart component','MCP tool calls: create, retrieve, update expense records (52 tools)'];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">AI Layer Model — Finance Specialist Agent</h3>
      <p className="text-sm text-gray-500 mb-4">AI operates at three levels inside the Expense module</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {layers.map(l=>(
          <div key={l.label} className={`rounded-lg border overflow-hidden ${l.color}`}>
            <div className={`px-3 py-2 flex items-center gap-2 ${l.headerColor}`}><l.icon className={`w-4 h-4 ${l.iconColor}`}/><span className="text-xs font-semibold">{l.label}</span></div>
            <div className="p-3"><p className="text-xs text-gray-600 leading-relaxed">{l.desc}</p></div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Finance Agent Capabilities</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">{caps.map((cap,idx)=><div key={idx} className="flex items-start gap-1.5"><span className="text-rose-400 text-xs mt-0.5 flex-shrink-0">▸</span><span className="text-xs text-gray-600">{cap}</span></div>)}</div>
      </div>
    </div>
  );
}

// ── Expense: Cross-Module Cascade ─────────────────────────────────
function ExpenseCrossModule() {
  const targets = [
    { module:'Family Feed', desc:'Expense activity card auto-posted — all members see it without opening Expenses', color:'bg-purple-50 border-purple-300 text-purple-800', dot:'bg-purple-400' },
    { module:'Home Dashboard', desc:'"Spent ₹X of ₹Y" widget counter updates; budget nudge card appears if threshold crossed', color:'bg-blue-50 border-blue-300 text-blue-800', dot:'bg-blue-400' },
    { module:'Calendar', desc:'Linked calendar event updated with cost badge; recurring event marks expense as auto-logged', color:'bg-indigo-50 border-indigo-300 text-indigo-800', dot:'bg-indigo-400' },
    { module:'Notifications', desc:'Budget overspend real-time push notification sent to relevant family members', color:'bg-yellow-50 border-yellow-300 text-yellow-800', dot:'bg-yellow-500' },
    { module:'Tasks', desc:'Bill-payment task (if linked) marked as done; recurring task recurrence schedules next cycle', color:'bg-emerald-50 border-emerald-300 text-emerald-800', dot:'bg-emerald-400' },
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">Cross-Module Cascade</h3>
      <p className="text-sm text-gray-500 mb-4">One expense log triggers updates across 5 modules simultaneously</p>
      <div className="flex justify-center mb-3"><div className="px-6 py-3 bg-rose-500 text-white rounded-xl font-semibold text-sm shadow-md">Trigger: "Expense Logged / Updated"</div></div>
      <div className="flex justify-center mb-3"><ArrowDown className="w-6 h-6 text-rose-400"/></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {targets.map(t=><div key={t.module} className={`p-3 rounded-lg border ${t.color}`}><div className="flex items-center gap-2 mb-1"><div className={`w-2 h-2 rounded-full ${t.dot}`}/><span className="text-xs font-semibold">{t.module}</span></div><p className="text-xs leading-relaxed opacity-80">{t.desc}</p></div>)}
      </div>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs text-gray-500"><span className="font-semibold">Document Vault cascade:</span> Uploading an insurance/bill document triggers AI extraction → creates calendar event + escalating-priority task + expense reminder — a 3-module cascade from a single upload.</p></div>
    </div>
  );
}

// ── Expense: Module Connections ───────────────────────────────────
function ExpenseModuleConns() {
  const connections = [
    { module:'Calendar', direction:'Bidirectional', desc:'Recurring events (Rent, Insurance) linked to expenses. Event completion triggers auto-log. Event detail view shows associated cost.', color:'bg-blue-50 border-blue-200', mc:'bg-blue-100 text-blue-700' },
    { module:'Tasks', direction:'Tasks → Expenses', desc:'Completing a bill-payment task (e.g., "Pay rent") triggers the linked recurring expense to auto-log or update.', color:'bg-emerald-50 border-emerald-200', mc:'bg-emerald-100 text-emerald-700' },
    { module:'Family Feed', direction:'Expenses → Feed', desc:'Every logged expense auto-posts an activity card to the shared household feed — keeping all members informed without opening Expenses.', color:'bg-purple-50 border-purple-200', mc:'bg-purple-100 text-purple-700' },
    { module:'Document Vault', direction:'Docs → Expenses', desc:'Uploaded insurance or bill documents trigger AI extraction: due date + payable amount → calendar event + escalating task + expense reminder.', color:'bg-indigo-50 border-indigo-200', mc:'bg-indigo-100 text-indigo-700' },
    { module:'Notifications', direction:'Expenses → Notify', desc:'Budget overspend pushes real-time notification. Recurring bill due reminders sent 1 month and 1 week before due date.', color:'bg-yellow-50 border-yellow-200', mc:'bg-yellow-100 text-yellow-700' },
    { module:'AI Assistant', direction:'Bidirectional', desc:'Finance AI agent handles expense categorisation, logging via chat, budget querying, split calculations, and proactive nudges on home dashboard.', color:'bg-violet-50 border-violet-200', mc:'bg-violet-100 text-violet-700' },
    { module:'Voice Assistant', direction:'Voice → Expenses', desc:'Voice commands log expenses: "I bought milk for ₹120." Voice queries retrieve info: "How much did we spend this month?"', color:'bg-teal-50 border-teal-200', mc:'bg-teal-100 text-teal-700' },
    { module:'Home Dashboard', direction:'Expenses → Dashboard', desc:'Financials widget shows "Spent ₹X of ₹Y budget this month." AI-dynamic zone shows expense nudge cards when approaching/exceeding budget.', color:'bg-rose-50 border-rose-200', mc:'bg-rose-100 text-rose-700' },
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">Module Connections</h3>
      <p className="text-sm text-gray-500 mb-4">How Expense Tracking connects with other Family OS modules</p>
      <div className="grid grid-cols-1 gap-3">
        {connections.map(c=><div key={c.module} className={`p-3 rounded-lg border ${c.color}`}><div className="flex items-center gap-2 mb-1"><ArrowRightLeft className="w-3.5 h-3.5 text-gray-500"/><span className={`text-xs font-semibold px-2 py-0.5 rounded ${c.mc}`}>{c.module}</span><span className="text-xs text-gray-500">{c.direction}</span></div><p className="text-xs text-gray-600 leading-relaxed">{c.desc}</p></div>)}
      </div>
    </div>
  );
}

// ── Expense: System Processes ─────────────────────────────────────
function ExpenseSysProcesses() {
  const processes = [
    { icon:ScanLine, label:'Receipt OCR Pipeline', color:'bg-rose-50 border-rose-200', iconColor:'text-rose-600', desc:'User captures receipt image → Google Vision API extracts merchant, total, date → auto-populated form → user confirms → expense saved with receipt stored.' },
    { icon:Bell, label:'Budget Overspend Warning System', color:'bg-pink-50 border-pink-200', iconColor:'text-pink-600', desc:'Each expense logged → system compares category total vs budget cap. At 80%: amber nudge card on home dashboard. At 100%: real-time push notification. AI can update budget via A2UI.' },
    { icon:RefreshCw, label:'Recurring Expense Auto-Log', color:'bg-red-50 border-red-200', iconColor:'text-red-600', desc:'Calendar events (Rent, Insurance, Utilities) marked as recurring. When event/task is marked complete → linked expense auto-logs or auto-updates. No manual re-entry required.' },
    { icon:Wifi, label:'Real-Time Sync Engine', color:'bg-orange-50 border-orange-200', iconColor:'text-orange-600', desc:'Expense changes propagate via WebSocket to all family members instantly. Offline-first: local cache with sync queue. Data reconciled when connection restores.' },
    { icon:Lock, label:'Permission & Privacy System', color:'bg-amber-50 border-amber-200', iconColor:'text-amber-600', desc:'Personal expenses are private by default. Family expenses visible per role: Parent/Admin sees full detail; Child role sees summary count only. AES-256 encryption at rest, TLS 1.3 in transit. Row-Level Security in PostgreSQL.' },
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">System Processes</h3>
      <p className="text-sm text-gray-500 mb-4">Automated processes running in the background</p>
      <div className="grid grid-cols-1 gap-3">
        {processes.map(p=><div key={p.label} className={`p-3 rounded-lg border ${p.color}`}><div className="flex items-center gap-2 mb-1"><p.icon className={`w-4 h-4 ${p.iconColor}`}/><span className="text-sm font-semibold text-gray-800">{p.label}</span></div><p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p></div>)}
      </div>
    </div>
  );
}

// ── Expense: Screen Zones ─────────────────────────────────────────
function ExpenseScreenZones() {
  const zones = [
    { icon:CreditCard, label:'Header Zone', iconColor:'text-rose-600', color:'bg-rose-50 border-rose-200', desc:'Personal/Family toggle · Month selector · Spent vs Budget summary · Member filter' },
    { icon:List, label:'Transaction Timeline', iconColor:'text-pink-600', color:'bg-pink-50 border-pink-200', desc:'Chronological expense cards · Category icons · Amount · Paid-by tag · Split badge' },
    { icon:TrendingUp, label:'Budget Progress', iconColor:'text-red-600', color:'bg-red-50 border-red-200', desc:'Per-category spending bars · Threshold indicators · Overspend alerts · View Report link' },
    { icon:Plus, label:'FAB / Quick Actions', iconColor:'text-orange-600', color:'bg-orange-50 border-orange-200', desc:'Add Expense · Camera Scan Receipt · Voice Log · Expanded action menu' },
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">Screen Zones — Expense Tracker</h3>
      <p className="text-sm text-gray-500 mb-4">4 interactive zones in the Expense main screen</p>
      <div className="space-y-3">
        {zones.map(z=><div key={z.label} className={`p-3 rounded-lg border ${z.color}`}><div className="flex items-center gap-2 mb-1"><z.icon className={`w-4 h-4 ${z.iconColor}`}/><span className="font-medium text-gray-800 text-sm">{z.label}</span></div><p className="text-xs text-gray-600 leading-relaxed">{z.desc}</p></div>)}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100"><p className="text-xs text-gray-400">Personal ↔ Family toggle applies globally · Role-based visibility enforced</p></div>
    </div>
  );
}

// ── Expense: 4-Flow Screen Diagram ────────────────────────────────
function ExpenseScreenFlows() {
  const [active, setActive] = useState('flow1');
  const flows = [
    { id:'flow1', label:'Flow 1 — Add Expense Manually', component:<EFlow1/> },
    { id:'flow2', label:'Flow 2 — Receipt OCR Scan', component:<EFlow2/> },
    { id:'flow3', label:'Flow 3 — Voice Expense Logging', component:<EFlow3/> },
    { id:'flow4', label:'Flow 4 — Budget Alert & Report', component:<EFlow4/> },
  ];
  const current = flows.find(f=>f.id===active)!;
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-1">Screen Flow Diagram — 4 Key Flows</h3>
      <p className="text-sm text-gray-500 mb-4">Complete user journeys shown as connected phone screens</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {flows.map(f=><button key={f.id} onClick={()=>setActive(f.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${active===f.id?'bg-rose-500 text-white shadow-sm':'bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-700'}`}>{f.label}</button>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} className="overflow-x-auto">
          <div className="min-w-max py-2">{current.component}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── List: Main Screen ─────────────────────────────────────────────
function ListMainScreen() {
  return (
    <div className="h-full flex flex-col" style={{ minHeight: 290 }}>
      <div className="bg-orange-500 px-2 pt-2 pb-1.5">
        <div className="flex gap-0.5 mb-1">
          <div className="text-[6px] bg-white text-orange-700 rounded px-1.5 py-0.5 font-bold">Personal</div>
          <div className="text-[6px] bg-orange-300 text-white rounded px-1.5 py-0.5 font-bold">Family</div>
        </div>
        <div className="flex gap-0.5 overflow-hidden">
          {['Groceries','School','Party','Packing'].map((tab,i)=>(
            <div key={tab} className={`text-[5px] px-1 py-0.5 rounded-full font-semibold whitespace-nowrap ${i===0?'bg-white text-orange-700':'bg-orange-400 text-white'}`}>{tab}</div>
          ))}
        </div>
      </div>
      <div className="bg-white flex-1 px-1.5 py-1 space-y-0.5 overflow-hidden">
        <div className="text-[5px] font-bold text-gray-500 uppercase tracking-wide">Groceries · 6 items</div>
        {[{name:'Milk',store:'Safeway',done:false},{name:'Eggs (dozen)',store:'Costco',done:false},{name:'Bread',store:'',done:true},{name:'Butter',store:'Costco',done:false},{name:'Vegetables',store:'Local',done:false}].map(item=>(
          <div key={item.name} className="flex items-center gap-1 py-0.5">
            <div className={`w-3 h-3 rounded border ${item.done?'bg-orange-400 border-orange-400':'border-gray-300'} flex items-center justify-center flex-shrink-0`}>
              {item.done&&<span className="text-white text-[6px]">✓</span>}
            </div>
            <span className={`text-[6px] flex-1 ${item.done?'line-through text-gray-400':'text-gray-800'}`}>{item.name}</span>
            {item.store&&<span className="text-[4px] bg-blue-100 text-blue-600 rounded px-0.5">{item.store}</span>}
          </div>
        ))}
      </div>
      <div className="bg-gray-50 px-1.5 py-1 border-t border-gray-200">
        <div className="flex items-center gap-1 bg-white rounded border border-gray-200 px-1 py-0.5">
          <span className="text-[5px] text-gray-400 flex-1">Add item…</span>
          <span className="text-[5px] text-blue-500">🏪</span>
        </div>
      </div>
      <div className="relative bg-white h-6 border-t border-gray-100">
        <div className="absolute bottom-1 right-1.5 w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-white text-[8px] font-bold shadow">+</div>
      </div>
    </div>
  );
}

// ── List: Add Item Screen ──────────────────────────────────────────
function AddItemScreen() {
  return (
    <div className="flex flex-col" style={{ minHeight: 290 }}>
      <div className="bg-orange-500 px-2 py-1.5">
        <div className="text-[7px] font-bold text-white">Groceries</div>
        <div className="text-[5px] text-orange-200">Family · 6 items</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-0.5">
        {['Milk','Eggs (dozen)','Butter'].map(i=>(
          <div key={i} className="flex items-center gap-1 py-0.5">
            <div className="w-3 h-3 rounded border border-gray-300 flex-shrink-0"/>
            <span className="text-[6px] text-gray-800">{i}</span>
          </div>
        ))}
        <div className="border-t border-dashed border-orange-200 pt-1 mt-1">
          <div className="bg-orange-50 rounded border border-orange-200 px-1 py-1 space-y-1">
            <div className="text-[6px] font-bold text-orange-700">Adding new item</div>
            <div className="bg-white rounded border border-orange-300 px-1 py-0.5 text-[6px] text-gray-800">Orange juice</div>
            <div className="flex gap-0.5 items-center">
              <div className="text-[5px] text-gray-400">Store:</div>
              {['Costco','Safeway','Local'].map((s,i)=>(
                <div key={s} className={`text-[4px] px-0.5 py-0.5 rounded ${i===0?'bg-blue-500 text-white':'bg-gray-100 text-gray-500'}`}>{s}</div>
              ))}
            </div>
            <div className="bg-orange-500 text-white text-[6px] font-bold text-center rounded py-0.5">ADD</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── List: Kid Request Screen ───────────────────────────────────────
function KidRequestScreen() {
  return (
    <div className="flex flex-col" style={{ minHeight: 290 }}>
      <div className="bg-purple-600 px-2 py-1.5">
        <div className="text-[7px] font-bold text-white">Groceries · Kid View</div>
        <div className="text-[5px] text-purple-200">Sara (request mode)</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-0.5">
        {['Milk','Eggs','Bread'].map(i=>(
          <div key={i} className="flex items-center gap-1 py-0.5">
            <div className="w-3 h-3 rounded border border-gray-200 flex-shrink-0"/>
            <span className="text-[6px] text-gray-600">{i}</span>
            <span className="text-[4px] text-gray-400 ml-auto">view only</span>
          </div>
        ))}
        <div className="mt-2 bg-purple-50 border border-purple-200 rounded p-1 space-y-1">
          <div className="text-[6px] font-bold text-purple-700">Request to add:</div>
          <div className="bg-white rounded border border-purple-300 px-1 py-0.5 text-[6px] text-gray-800">Ice cream 🍦</div>
          <div className="bg-purple-500 text-white text-[6px] font-bold text-center rounded py-0.5">REQUEST ITEM</div>
          <div className="text-[5px] text-purple-500 text-center">Parent will approve/decline</div>
        </div>
      </div>
    </div>
  );
}

// ── List: Small Phone + Arrow (for flows) ─────────────────────────
function LstPhone({ children, label, type='normal' }: { children: React.ReactNode; label: string; type?: 'normal'|'user'|'system'|'warning'|'success' }) {
  const border = { normal:'border-gray-700', user:'border-orange-500', system:'border-purple-600', warning:'border-red-500', success:'border-green-600' }[type];
  const lc = { normal:'text-gray-700', user:'text-orange-700', system:'text-purple-700', warning:'text-red-600', success:'text-green-700' }[type];
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className={`relative flex flex-col rounded-[2rem] border-[3px] shadow-xl overflow-hidden w-32 ${border} bg-gray-800`}>
        <div className="bg-gray-800 flex justify-between items-center px-2 py-1">
          <span className="text-[6px] text-gray-400">9:41</span>
          <div className="w-7 h-1.5 bg-gray-600 rounded-full"/>
          <span className="text-[6px] text-gray-400">●●</span>
        </div>
        <div className="bg-white overflow-hidden flex-1">{children}</div>
        <div className="bg-gray-800 flex justify-center py-1.5">
          <div className="w-10 h-0.5 bg-gray-500 rounded-full"/>
        </div>
      </div>
      <p className={`text-[10px] font-bold text-center max-w-[128px] leading-tight ${lc}`}>{label}</p>
    </div>
  );
}

function LstArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 px-1 shrink-0 self-center mb-5">
      {label&&<span className="text-[9px] text-gray-500 text-center max-w-[64px] leading-tight">{label}</span>}
      <span className="text-gray-300 text-xl font-thin">→</span>
    </div>
  );
}

// ── List Flow Screens ──────────────────────────────────────────────
function LF1_ListMain() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-orange-500 px-2 py-1.5">
        <div className="text-[6px] text-orange-100">Sharma Family</div>
        <div className="flex gap-0.5 mt-0.5">
          {['Groceries','School','Party'].map((t,i)=>(
            <div key={t} className={`text-[5px] px-1 py-0.5 rounded-full ${i===0?'bg-white text-orange-700 font-bold':'bg-orange-400 text-white'}`}>{t}</div>
          ))}
        </div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-0.5">
        {[{n:'Milk',d:false},{n:'Eggs',d:false},{n:'Bread',d:true},{n:'Butter',d:false}].map(i=>(
          <div key={i.n} className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded border ${i.d?'bg-orange-400 border-orange-400':'border-gray-300'} flex-shrink-0`}>{i.d&&<span className="text-[5px] text-white flex items-center justify-center w-full h-full">✓</span>}</div>
            <span className={`text-[6px] ${i.d?'line-through text-gray-400':'text-gray-800'}`}>{i.n}</span>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 px-1.5 py-0.5 border-t border-gray-200 text-[5px] text-gray-400">Add item… 🏪</div>
    </div>
  );
}

function LF1_ItemAdded() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-orange-500 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Groceries</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-0.5">
        {['Milk','Eggs','Bread','Butter','Orange juice'].map((n,i)=>(
          <div key={n} className={`flex items-center gap-1 ${i===4?'bg-orange-50 rounded px-0.5':''}`}>
            <div className="w-3 h-3 rounded border border-gray-300 flex-shrink-0"/>
            <span className={`text-[6px] text-gray-800 ${i===4?'font-bold text-orange-700':''}`}>{n}</span>
            {i===4&&<span className="text-[4px] bg-blue-100 text-blue-600 rounded px-0.5 ml-auto">Costco</span>}
          </div>
        ))}
        <div className="bg-green-50 border border-green-200 rounded p-0.5 mt-1">
          <div className="text-[5px] text-green-700">✓ Synced to 3 family devices</div>
        </div>
      </div>
    </div>
  );
}

function LF1_Checked() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-orange-500 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Groceries · Shopping</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-0.5">
        {[{n:'Milk',d:true},{n:'Eggs',d:true},{n:'Bread',d:true},{n:'Butter',d:false},{n:'Orange juice',d:false}].map(i=>(
          <div key={i.n} className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded border ${i.d?'bg-orange-400 border-orange-400':'border-gray-300'} flex-shrink-0 flex items-center justify-center`}>
              {i.d&&<span className="text-[5px] text-white">✓</span>}
            </div>
            <span className={`text-[6px] ${i.d?'line-through text-gray-400':'text-gray-800 font-medium'}`}>{i.n}</span>
          </div>
        ))}
        <div className="text-[5px] text-gray-500 mt-1">3 of 5 items checked · synced</div>
      </div>
    </div>
  );
}

function LF2_FABMenu() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-gray-100 flex-1 relative">
        <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-xl shadow-2xl p-2 space-y-1">
          <div className="text-[7px] font-bold text-gray-800">Create New List</div>
          {['📝 Blank list','🛒 Groceries template','🧹 Cleaning checklist','🎒 Packing list','📚 School supplies'].map(o=>(
            <div key={o} className="bg-gray-50 rounded px-2 py-1 text-[6px] text-gray-700 border border-gray-200">{o}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LF2_NameList() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-orange-500 px-2 py-1.5">
        <div className="text-[7px] font-bold text-white">New List</div>
      </div>
      <div className="flex-1 p-2 space-y-1.5">
        <div>
          <div className="text-[6px] text-gray-400 mb-0.5">LIST NAME</div>
          <div className="bg-orange-50 rounded px-1.5 py-1 border border-orange-300 text-[6px] text-gray-800">Beach Trip Packing</div>
        </div>
        <div>
          <div className="text-[6px] text-gray-400 mb-0.5">VISIBILITY</div>
          <div className="flex gap-0.5">
            <div className="text-[6px] bg-gray-100 text-gray-500 rounded px-1 py-0.5">Personal</div>
            <div className="text-[6px] bg-orange-500 text-white rounded px-1 py-0.5 font-medium">Family</div>
          </div>
        </div>
        <div>
          <div className="text-[6px] text-gray-400 mb-0.5">PERMISSIONS</div>
          <div className="text-[5px] text-gray-600 space-y-0.5">
            <div>A, B → Editor (full access)</div>
            <div>C → Request mode (kids)</div>
          </div>
        </div>
        <div className="bg-orange-500 text-white text-[7px] font-bold text-center rounded py-1">CREATE LIST</div>
      </div>
    </div>
  );
}

function LF2_ListReady() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-orange-500 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Beach Trip Packing</div>
        <div className="text-[5px] text-orange-200">Family · 0 items</div>
      </div>
      <div className="flex-1 px-2 py-2 flex flex-col items-center justify-center space-y-1">
        <div className="text-[20px]">🎒</div>
        <div className="text-[7px] font-bold text-gray-700">List is empty</div>
        <div className="bg-orange-50 border border-orange-200 rounded p-1 text-[5px] text-orange-700 text-center">✓ Created · Family notified · Ready to use</div>
      </div>
      <div className="bg-gray-50 px-1.5 py-0.5 border-t border-gray-200 text-[5px] text-gray-400">Add item…</div>
    </div>
  );
}

function LF3_KidView() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-purple-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Groceries · Kid View</div>
        <div className="text-[5px] text-purple-200">Sara · Request mode</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-0.5">
        {['Milk','Eggs','Bread'].map(i=>(
          <div key={i} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded border border-gray-200 flex-shrink-0"/>
            <span className="text-[6px] text-gray-600">{i}</span>
          </div>
        ))}
        <div className="border-t border-dashed border-purple-200 pt-1">
          <div className="bg-purple-50 rounded p-1 text-[5px] text-purple-700">You're in request mode.</div>
          <div className="bg-white rounded border border-purple-300 px-1 py-0.5 mt-0.5 text-[6px] text-gray-700">Ice cream 🍦</div>
          <div className="bg-purple-500 text-white text-[6px] font-bold text-center rounded py-0.5 mt-0.5">REQUEST ITEM</div>
        </div>
      </div>
    </div>
  );
}

function LF3_ParentNotified() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-gray-800 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Notification</div>
      </div>
      <div className="flex-1 bg-gray-50 px-1.5 py-2 space-y-1.5">
        <div className="bg-white rounded-xl shadow px-2 py-1.5 border border-gray-200">
          <div className="text-[6px] font-bold text-gray-800">Grocery List Request</div>
          <div className="text-[5px] text-gray-600 mt-0.5">Sara wants to add "Ice cream 🍦" to Groceries</div>
          <div className="flex gap-1 mt-1">
            <div className="bg-green-500 text-white text-[5px] rounded px-1.5 py-0.5 font-bold">Approve</div>
            <div className="bg-red-100 text-red-600 text-[5px] rounded px-1.5 py-0.5 font-bold">Decline</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LF3_Approved() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-green-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Request Approved ✓</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-0.5">
        {['Milk','Eggs','Bread','Ice cream 🍦'].map((i,idx)=>(
          <div key={i} className={`flex items-center gap-1 ${idx===3?'bg-green-50 rounded px-0.5':''}`}>
            <div className="w-3 h-3 rounded border border-gray-300 flex-shrink-0"/>
            <span className={`text-[6px] ${idx===3?'font-bold text-green-700':'text-gray-800'}`}>{i}</span>
            {idx===3&&<span className="text-[4px] text-green-500 ml-auto">✓ approved</span>}
          </div>
        ))}
        <div className="bg-green-50 border border-green-200 rounded p-0.5 mt-1">
          <div className="text-[5px] text-green-700">Sara notified · Item added · All members see it</div>
        </div>
      </div>
    </div>
  );
}

function LF4_SuggestionChip() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-orange-500 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Groceries</div>
      </div>
      <div className="bg-amber-50 border-b border-amber-200 px-1.5 py-1">
        <div className="text-[5px] font-bold text-amber-800">💡 You usually buy these:</div>
        <div className="flex gap-0.5 mt-0.5 flex-wrap">
          {['Milk','Eggs','Bread','Butter','Yogurt'].map(i=>(
            <div key={i} className="text-[4px] bg-white border border-amber-300 text-amber-700 rounded px-1 py-0.5">{i}</div>
          ))}
        </div>
        <div className="flex gap-1 mt-1">
          <div className="text-[5px] bg-orange-500 text-white rounded px-1 py-0.5">Add all</div>
          <div className="text-[5px] bg-white text-gray-500 border border-gray-200 rounded px-1 py-0.5">Dismiss</div>
        </div>
      </div>
      <div className="flex-1 px-1.5 py-1">
        <div className="text-[5px] text-gray-400 text-center mt-2">Tap "Add all" or type below.</div>
      </div>
      <div className="bg-gray-50 px-1.5 py-0.5 border-t border-gray-200 text-[5px] text-gray-400">Add item…</div>
    </div>
  );
}

function LF4_BatchAdded() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-orange-500 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Groceries · 5 items</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-0.5">
        {['Milk','Eggs','Bread','Butter','Yogurt'].map((i,idx)=>(
          <div key={i} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded border border-gray-300 flex-shrink-0"/>
            <span className="text-[6px] text-gray-800">{i}</span>
            {idx<3&&<span className="text-[4px] bg-orange-100 text-orange-600 rounded px-0.5 ml-auto">suggested</span>}
          </div>
        ))}
        <div className="bg-orange-50 border border-orange-200 rounded p-0.5 mt-1">
          <div className="text-[5px] text-orange-700">✓ 5 items added · Synced to family</div>
        </div>
      </div>
    </div>
  );
}

function LF5_TemplatePicker() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-orange-500 px-2 py-1.5">
        <div className="text-[7px] font-bold text-white">New List</div>
      </div>
      <div className="flex-1 p-1.5 space-y-0.5">
        <div className="text-[5px] text-gray-500 font-semibold uppercase mb-1">Choose a template</div>
        {['🛒 Weekly Groceries','🎒 Vacation Packing','🧹 Cleaning Checklist','📚 School Supplies'].map((t,i)=>(
          <div key={t} className={`text-[5px] px-1.5 py-1 rounded border ${i===0?'border-orange-400 bg-orange-50 font-bold text-orange-700':'border-gray-200 bg-white text-gray-700'}`}>{t}</div>
        ))}
        <div className="text-[5px] px-1.5 py-1 rounded border border-dashed border-gray-300 text-gray-400">📋 Blank list</div>
      </div>
    </div>
  );
}

function LF5_TemplateLoaded() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-orange-500 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Groceries</div>
        <div className="text-[5px] text-orange-200">From template · Family</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-0.5">
        {['Milk','Eggs','Bread','Butter','Yogurt','Cheese','Fruit','Vegetables'].map(i=>(
          <div key={i} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded border border-gray-300 flex-shrink-0"/>
            <span className="text-[6px] text-gray-700">{i}</span>
          </div>
        ))}
      </div>
      <div className="bg-cyan-50 border-t border-cyan-200 px-1.5 py-0.5">
        <div className="text-[4px] text-cyan-700 font-medium">✓ 8 items pre-loaded from template</div>
      </div>
    </div>
  );
}

function LF5_ListReady() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-orange-500 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Groceries · 8 items</div>
        <div className="text-[5px] text-orange-200">Family · Ready to customize</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-0.5">
        {['Milk','Eggs','Bread','Butter','Yogurt'].map(i=>(
          <div key={i} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded border border-gray-300 flex-shrink-0"/>
            <span className="text-[6px] text-gray-700">{i}</span>
          </div>
        ))}
        <div className="text-[4px] text-gray-400 pl-4">+ 3 more items…</div>
      </div>
      <div className="bg-green-50 border-t border-green-200 px-1.5 py-0.5">
        <div className="text-[4px] text-green-700">✓ Created · Family notified · Ready to use</div>
      </div>
    </div>
  );
}

const LST_FLOWS = [
  {
    id:'flow1', title:'Flow 1 — Add Item → Check Complete',
    description:'User opens grocery list, adds a new item, then checks off items while shopping.',
    screens:[
      {component:LF1_ListMain, label:'List Main View', type:'user' as const, arrow:'Tap quick add'},
      {component:LF1_ItemAdded, label:'Item Added + Synced', type:'system' as const, arrow:'Tap checkbox'},
      {component:LF1_Checked, label:'Items Checked Off', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow2', title:'Flow 2 — Create & Share New List',
    description:'User creates a new list from template, sets family visibility and permissions.',
    screens:[
      {component:LF2_FABMenu, label:'FAB Options Menu', type:'user' as const, arrow:'Pick template'},
      {component:LF2_NameList, label:'Name + Set Permissions', type:'user' as const, arrow:'Tap Create'},
      {component:LF2_ListReady, label:'List Ready + Notified', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow3', title:'Flow 3 — Kid Request → Parent Approve',
    description:'Child requests an item in request mode; parent receives notification and approves.',
    screens:[
      {component:LF3_KidView, label:'Kid: Request Item', type:'user' as const, arrow:'Parent notified'},
      {component:LF3_ParentNotified, label:'Parent: Approval Prompt', type:'warning' as const, arrow:'Approve'},
      {component:LF3_Approved, label:'Item Approved + Added', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow4', title:'Flow 4 — Smart Suggestion Batch Add',
    description:'AI surfaces frequently-bought items; user adds them all in one tap.',
    screens:[
      {component:LF4_SuggestionChip, label:'AI Suggestion Chip', type:'system' as const, arrow:'Tap "Add all"'},
      {component:LF4_BatchAdded, label:'5 Items Batch-Added', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow5', title:'Flow 5 — Use List Template',
    description:'User creates a list from a pre-made template; items pre-populated instantly.',
    screens:[
      {component:LF5_TemplatePicker, label:'Template Picker', type:'user' as const, arrow:'Select template'},
      {component:LF5_TemplateLoaded, label:'Items Pre-Loaded', type:'system' as const, arrow:'Tap Create'},
      {component:LF5_ListReady, label:'List Ready to Use', type:'success' as const, arrow:null},
    ],
  },
];

// ── List: Feature Map ──────────────────────────────────────────────
function ListFeatureMap() {
  const [expanded, setExpanded] = useState<string|null>(null);
  const features = [
    { id:'realtime-sync', title:'Real-Time Sync Across Devices', icon:RefreshCw, color:'bg-blue-100 border-blue-300', subs:['Changes reflect instantly for all members on shared lists','WebSocket push: one person shops, another edits from home','Conflict handling — edits don\'t overwrite each other','Offline mode: queue changes, sync on reconnect'] },
    { id:'checkbox', title:'Checkbox-Based Item Completion', icon:CheckSquare, color:'bg-green-100 border-green-300', subs:['Each item has a tap-to-complete checkbox','Visually struck-through when checked','Completed items remain visible for reference','Completion state synced in real-time to all users'] },
    { id:'named-collections', title:'Named List Collections', icon:FolderOpen, color:'bg-orange-100 border-orange-300', subs:['Multiple named lists: Groceries, School Supplies, Party Prep','Switch between lists via horizontal tab selector','Personal lists and family-shared lists co-exist','Unlimited lists per household'] },
    { id:'quick-entry', title:'Quick Item Entry', icon:Zap, color:'bg-yellow-100 border-yellow-300', subs:['Sticky quick-add field at the bottom of every list','Type item → press Enter → item added instantly','Minimal friction: no navigation required','Optional store tag on each item'] },
    { id:'reordering', title:'Item Reordering', icon:GripVertical, color:'bg-purple-100 border-purple-300', subs:['Long-press item to enter drag mode','Drag and drop to new position','Order synced in real-time to all members','Useful to organize by priority or store aisle'] },
    { id:'external-share', title:'Share List as External Link', icon:Share2, color:'bg-pink-100 border-pink-300', subs:['Generate unique share link for any list','Non-app users can view list via link (read-only)','Share via WhatsApp, email, copy to clipboard','Link can be revoked at any time'] },
    { id:'permissions', title:'Collaborative Permissions', icon:Shield, color:'bg-red-100 border-red-300', subs:['Owner/Admin: full edit + manage permissions','Editor (adult): add, edit, remove, check items','Viewer: read-only access','Request Mode (kids): request items → parent approves','Parent approval flow: notification → approve/decline → notify child'] },
    { id:'voice', title:'Voice Assistant for Lists', icon:Mic, color:'bg-indigo-100 border-indigo-300', subs:['"Add milk to groceries" → item added instantly','"Check off bread" → item marked complete','"Read my shopping list" → AI reads list aloud','"Create a packing list" → new list created','AI asks clarification if multiple lists match'] },
    { id:'smart-suggestions', title:'Smart Suggestions (History-Based)', icon:Lightbulb, color:'bg-amber-100 border-amber-300', subs:['After 2–3 weeks: surfaces frequently-added items','"You usually buy milk, eggs, bread — add again?"','One-tap re-add all suggested items','Or selectively add individual items','Reduces repetitive typing for regular shoppers'] },
    { id:'multi-store', title:'Multi-Store Item Tagging', icon:Store, color:'bg-teal-100 border-teal-300', subs:['Tag each item with a store: Costco, Safeway, Local, etc.','AI suggests store based on purchase history','Group list view by store for optimized shopping trips','Filter: "Show only Costco items"','Custom store names supported'] },
    { id:'templates', title:'List Templates', icon:LayoutTemplate, color:'bg-cyan-100 border-cyan-300', subs:['Pre-made templates: Weekly Groceries, Vacation Packing, Cleaning Checklist, School Supplies','Start a new list from a template — items pre-populated instantly','Custom templates: save any list as a reusable template','Select template on list creation or from FAB menu'] },
    { id:'quantity-notes', title:'Quantity & Notes on Items', icon:SlidersHorizontal, color:'bg-violet-100 border-violet-300', subs:['Each item can have a quantity field (e.g. "Milk ×2")','Free-text notes field for extra detail','Tap item to open detail sheet and edit quantity/notes','Quantity and notes visible inline on item row'] },
    { id:'archive', title:'Archive Completed Items', icon:Archive, color:'bg-slate-100 border-slate-300', subs:['"Clear completed" hides all checked items from active view','Archived items preserved in history — not deleted','Purchase history available for review and re-adding','Useful after finishing a shopping trip: clean slate for next trip'] },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-orange-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Feature Map — 13 Features</h2>
      </div>
      <div className="space-y-2">
        {features.map(f=>{
          const Icon=f.icon; const open=expanded===f.id;
          return (
            <div key={f.id} className={`rounded-lg border transition-colors ${open?'border-orange-300 bg-orange-50':'border-gray-200 bg-gray-50 hover:bg-orange-50/40'}`}>
              <button onClick={()=>setExpanded(open?null:f.id)} className="w-full flex items-center justify-between p-3 text-left">
                <div className="flex items-center gap-2"><Icon className="w-4 h-4 text-orange-500"/><span className="text-sm font-medium text-gray-800">{f.title}</span></div>
                <motion.div animate={{rotate:open?180:0}} transition={{duration:0.2}}><ChevronDown className="w-4 h-4 text-gray-400"/></motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open&&(
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25}} className="overflow-hidden">
                    <div className="px-3 pb-3">
                      <ul className="space-y-1">
                        {f.subs.map((s,i)=>(
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-orange-400 text-xs mt-0.5">•</span>
                            <span className="text-xs text-gray-600">{s}</span>
                          </li>
                        ))}
                      </ul>
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

// ── List: Entry Points ─────────────────────────────────────────────
function ListEntryPoints() {
  const points = [
    { id:'more-tab', label:'More → Lists Module', icon:LayoutGrid, color:'bg-orange-100 border-orange-300', iconColor:'text-orange-600', desc:'User taps "More" in bottom navigation, selects Lists & Shopping from the modules grid.', ctx:'Standard module entry. User is intentionally navigating to manage shopping or household lists.' },
    { id:'dashboard-card', label:'Dashboard AI Card', icon:BrainCircuit, color:'bg-blue-100 border-blue-300', iconColor:'text-blue-600', desc:'AI surfaces a list card on the Home dashboard — "Groceries: 5 items · 2 added by Mom today."', ctx:'Glanceable entry. User taps the card and lands directly on the relevant list.' },
    { id:'notification', label:'Notification Deep-Link', icon:Bell, color:'bg-yellow-100 border-yellow-300', iconColor:'text-yellow-600', desc:'Push notification fires when someone adds to a shared list, or when a kid requests an item. Tap → opens the list directly.', ctx:'Action-triggered entry. User arrives at a specific list, often to approve a request or review new items.' },
    { id:'ai-chat', label:'AI Chat / Voice', icon:MessageSquare, color:'bg-pink-100 border-pink-300', iconColor:'text-pink-600', desc:'"Add eggs to groceries" or "What\'s on my shopping list?" via text or voice in the AI tab.', ctx:'Conversational entry. AI uses A2UI to navigate, add items, or display list contents inline in chat.' },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-orange-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Entry Points — 4 Ways to Arrive</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {points.map(p=>{
          const Icon=p.icon;
          return (
            <div key={p.id} className={`border-2 rounded-lg p-4 ${p.color}`}>
              <div className="flex items-center gap-2 mb-2"><Icon className={`w-4 h-4 ${p.iconColor}`}/><span className="text-xs font-semibold text-gray-900">{p.label}</span></div>
              <p className="text-xs text-gray-700 mb-2">{p.desc}</p>
              <div className="text-xs text-gray-500 bg-white/60 rounded p-2 border border-gray-200"><span className="font-medium">Context: </span>{p.ctx}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── List: AI Layer ─────────────────────────────────────────────────
function ListAILayer() {
  const layers = [
    { id:'passive', label:'Layer 1 — Passive AI (Dashboard)', icon:LayoutDashboard, color:'bg-blue-50 border-blue-300', hColor:'bg-blue-600', desc:'AI surfaces list intelligence proactively on the Home dashboard without the user asking.', examples:['"Groceries: 5 items · Mom added 2 today"','"School Supplies list has 3 unchecked items due Friday"','"You usually buy milk on Sundays — add to groceries?"','"Sara requested \'Ice cream\' on the grocery list"'], trigger:'Runs automatically on dashboard load based on recent list activity, pending requests, and usage patterns.' },
    { id:'interactive', label:'Layer 2 — Interactive AI (Chat / Voice)', icon:MessageSquare, color:'bg-pink-50 border-pink-300', hColor:'bg-pink-600', desc:'User directly manages lists through the AI chat tab using text or voice.', examples:['"Add milk and eggs to groceries"','"What\'s on my shopping list?"','"Create a packing list for our trip"','"Check off bread from the list"','"Share the grocery list with Dad"'], trigger:'List Agent processes intent → uses A2UI to navigate to list, add/check items, or display list inline in chat.' },
    { id:'inline', label:'Layer 3 — Inline AI (Inside Lists Module)', icon:Zap, color:'bg-orange-50 border-orange-300', hColor:'bg-orange-600', desc:'AI assists the user while they are already inside the Lists module — embedded intelligence.', examples:['Smart suggestion chip: "You usually buy these 5 items — add again?"','Store tag suggestion: "You bought this from Costco last time"','Auto-group by store for optimized shopping trip','AI detects a calendar travel event and prompts list creation','Document uploaded → AI extracts items into a new list'], trigger:'Triggered by opening a frequently-used list, detecting a calendar event, or uploading a document with item data.' },
  ];
  const caps = ['Add and remove items via voice or text','Create new lists from voice or template','Smart suggestions from usage history','Store-tag suggestions from purchase patterns','A2UI: Navigate to list, add items, check items inline','Cross-module: detect calendar event → prompt list creation','Document OCR → extract items into new list','Permission setup: share list and assign roles via voice'];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-orange-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">AI Layer Model — List Specialist Agent</h2>
      </div>
      <div className="space-y-3 mb-5">
        {layers.map(l=>{
          const Icon=l.icon;
          return (
            <div key={l.id} className={`border-2 rounded-lg overflow-hidden ${l.color}`}>
              <div className={`${l.hColor} text-white px-4 py-2 flex items-center gap-2`}><Icon className="w-4 h-4"/><span className="font-semibold text-sm">{l.label}</span></div>
              <div className="p-4">
                <p className="text-xs text-gray-700 mb-3">{l.desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Examples</p>
                    <ul className="space-y-1">{l.examples.map((e,i)=><li key={i} className="text-xs text-gray-700 flex items-start gap-1.5"><span className="text-gray-400 mt-0.5">→</span><span>{e}</span></li>)}</ul>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3 border border-gray-200 self-start">
                    <p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">When triggered</p>
                    <p className="text-xs text-gray-700">{l.trigger}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3"><Bot className="w-4 h-4 text-orange-600"/><h3 className="font-semibold text-orange-900 text-sm">List Specialist Agent — Capabilities</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {caps.map((c,i)=><div key={i} className="text-xs text-orange-800 flex items-start gap-1.5"><span className="text-orange-400 mt-0.5 flex-shrink-0">✓</span><span>{c}</span></div>)}
        </div>
      </div>
    </div>
  );
}

// ── List: Cross-Module Cascade ─────────────────────────────────────
function ListCrossModule() {
  const cascades = [
    { icon:Calendar, module:'Calendar Module', color:'bg-blue-100 border-blue-300 text-blue-800', dot:'bg-blue-500', examples:['Travel event → "Create packing list?" prompt','Party event → grocery / supplies list suggestion','School reopening → school supplies list','List linked to calendar event; accessible from event detail'] },
    { icon:Bell, module:'Notifications', color:'bg-yellow-100 border-yellow-300 text-yellow-800', dot:'bg-yellow-500', examples:['Item added to shared list → push to all members','Kid item request → high-priority parent notification','List shared with you → "Mom shared Party Prep list"','Deep-link opens directly to the list'] },
    { icon:Activity, module:'Family Feed', color:'bg-orange-100 border-orange-300 text-orange-800', dot:'bg-orange-500', examples:['New shared list created → household activity stream','Kid request approved/declined → feed activity','List fully checked → celebratory feed entry','Keeps all members aware of household shopping'] },
    { icon:DollarSign, module:'Expenses Module', color:'bg-green-100 border-green-300 text-green-800', dot:'bg-green-500', examples:['Checked grocery items → tracked spending estimate','Item prices logged → monthly list budget analytics','"Groceries: ₹3,200 this month"','Future: receipt scan → items auto-checked + expenses'] },
    { icon:CheckSquare, module:'Tasks Module', color:'bg-emerald-100 border-emerald-300 text-emerald-800', dot:'bg-emerald-500', examples:['"Buy groceries" task linked to Groceries list','List completion can trigger linked task done','Template task spawns a pre-filled checklist','Task owner and list editor accountability shared'] },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-orange-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Cross-Module Cascade</h2>
      </div>
      <div className="flex justify-center mb-3">
        <div className="bg-orange-600 text-white rounded-xl px-5 py-2.5 flex items-center gap-3 shadow-md">
          <ShoppingCart className="w-5 h-5"/>
          <div><div className="font-bold text-sm">List Created / Item Added</div><div className="text-xs text-orange-200">User creates a list, adds an item, or a list is spawned from a calendar event</div></div>
        </div>
      </div>
      <div className="flex justify-center mb-3"><ArrowDown className="w-4 h-4 text-gray-400"/></div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {cascades.map((c,i)=>{
          const Icon=c.icon;
          return (
            <motion.div key={c.module} initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:i*0.07}} className={`border-2 rounded-lg p-4 ${c.color}`}>
              <div className="flex items-center gap-2 mb-3"><Icon className="w-4 h-4"/><h3 className="font-semibold text-sm">{c.module}</h3></div>
              <ul className="space-y-1">{c.examples.map((e,j)=><li key={j} className="text-xs flex items-start gap-2"><span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`}/><span className="text-gray-700">{e}</span></li>)}</ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── List: Module Connections ───────────────────────────────────────
function ListModuleConns() {
  const conns = [
    { id:'tasks', title:'Tasks Module', icon:CheckSquare, color:'bg-emerald-50 border-emerald-200', items:['"Buy groceries" task linked to Groceries list — check list = complete task','Task templates can spawn pre-filled lists (e.g. "House cleaning" task → cleaning checklist)','Future: mark task done when entire list is checked','Shared accountability: task owner and list editor may differ'] },
    { id:'calendar', title:'Calendar Module', icon:Calendar, color:'bg-blue-50 border-blue-200', items:['Travel event → auto-prompt "Create packing list?"','Party event → grocery / supplies list suggestion','School reopening event → school supplies list','Home maintenance event → purchase checklist','List linked to event; accessible from event detail screen'] },
    { id:'family-feed', title:'Family Feed', icon:Activity, color:'bg-orange-50 border-orange-200', items:['New shared list created → appears in household activity stream','Kid item request approved/declined → feed activity','List completed (all items checked) → celebratory feed entry','Major list updates visible to all members with access'] },
    { id:'notifications', title:'Notifications', icon:Bell, color:'bg-yellow-50 border-yellow-200', items:['Item added to shared list → push to all members','Kid item request → high-priority parent notification','List shared with you → "Mom shared \'Party Prep\' list" alert','Deep-link opens directly to the relevant list or item'] },
    { id:'ai-assistant', title:'AI Assistant', icon:Sparkles, color:'bg-pink-50 border-pink-200', items:['Voice: "Add milk to groceries" → item added','Voice: "Read my shopping list" → AI reads list aloud','Smart suggestions: frequently-bought item surfacing','A2UI: navigate to list, add items, check items inline in chat','List Agent: creation, item management, share, permission setup'] },
    { id:'expenses', title:'Expenses Module', icon:DollarSign, color:'bg-green-50 border-green-200', items:['Checked items from Groceries list → tracked spending estimate','Item prices optionally logged → monthly list budget analytics','"Groceries: ₹3,200 this month based on list history"','Future: receipt scan → items auto-checked + expenses logged'] },
    { id:'documents', title:'Document Vault', icon:FolderOpen, color:'bg-purple-50 border-purple-200', items:['Recipe document → auto-generate ingredients shopping list','Event brochure → supplies list extracted via AI OCR','Lists can reference linked documents as context','Future: scanned receipts → verify vs shopping list'] },
    { id:'voice', title:'Voice Assistant', icon:Mic, color:'bg-indigo-50 border-indigo-200', items:['"Add eggs and butter to the grocery list"','"Remove bread from my list"','"What\'s on my shopping list?"','Hands-free list management while cooking or driving','On-device processing for privacy'] },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-orange-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Module Connections & Integrations</h2>
      </div>
      <div className="space-y-3">
        {conns.map(c=>{
          const Icon=c.icon;
          return (
            <div key={c.id} className={`border-2 rounded-lg p-4 ${c.color}`}>
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2 flex-1"><Icon className="w-4 h-4 text-gray-700"/><h3 className="font-semibold text-gray-900 text-sm">{c.title}</h3></div>
                <ArrowRightLeft className="w-4 h-4 text-gray-400"/>
              </div>
              <ul className="mt-2 space-y-1">
                {c.items.map((it,j)=><li key={j} className="text-xs text-gray-700 flex items-start ml-6"><span className="text-gray-400 mr-2">→</span><span>{it}</span></li>)}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── List: System Processes ─────────────────────────────────────────
function ListSysProcesses() {
  const procs = [
    { id:'sync', title:'Real-Time Sync Engine', icon:RefreshCw, color:'bg-blue-50 border-blue-200', ops:['Item add/check/reorder/remove triggers WebSocket push','All family devices receive update and refresh instantly','Conflict resolution: last-write-wins or collaborative merge','Offline mode: local queue, syncs on reconnect'] },
    { id:'permissions', title:'Permission & Approval System', icon:Shield, color:'bg-red-50 border-red-200', ops:['Permission levels stored per user per list (owner, editor, viewer, request)','Kids\' requested items created with "pending_approval" status','Parent notification triggered on child request','Approval/decline changes item visibility and notifies child'] },
    { id:'suggestions', title:'Smart Suggestion System', icon:Lightbulb, color:'bg-amber-50 border-amber-200', ops:['Tracks item add history per list over time','After 2–3 weeks: identifies frequently-added patterns','Generates suggestion chip on next list open','Dismissed suggestions don\'t resurface until next cycle'] },
    { id:'store-system', title:'Multi-Store Grouping System', icon:Store, color:'bg-teal-50 border-teal-200', ops:['Item model includes optional store_tag field','Predefined stores + custom store names supported','List can be viewed grouped or filtered by store','AI surfaces purchase history to suggest store tags'] },
    { id:'notifications', title:'Notification System', icon:Bell, color:'bg-yellow-50 border-yellow-200', ops:['Real-time item add on shared list → alert to members (optional)','Kid request → high-priority parent notification with Approve/Decline action','All items checked → "Shopping trip complete" notification','Deep-link in notification opens directly to list or specific item'] },
    { id:'archive', title:'Archive & Purchase History', icon:Archive, color:'bg-slate-50 border-slate-200', ops:['Completed items archived on "Clear completed" action','Archived items stored in purchase history — never permanently deleted','History queryable: re-add past items with one tap','Feeds Smart Suggestion engine with historical purchase data','Archive action synced to all family devices in real-time'] },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-orange-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">System Processes & Background Behavior</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {procs.map((p,i)=>{
          const Icon=p.icon;
          return (
            <motion.div key={p.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}} className={`border-2 rounded-lg p-4 ${p.color}`}>
              <div className="flex items-center gap-2 mb-3"><Icon className="w-4 h-4 text-gray-700"/><h3 className="font-semibold text-gray-900 text-sm">{p.title}</h3></div>
              <ul className="space-y-1">{p.ops.map((op,j)=><li key={j} className="text-xs text-gray-700 flex items-start"><span className="text-gray-400 mr-2">•</span><span>{op}</span></li>)}</ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── List: Screen Zones ─────────────────────────────────────────────
function ListScreenZones() {
  const zones = [
    { id:'header', title:'Zone 1 — Header', icon:SlidersHorizontal, color:'bg-orange-100 border-orange-300', items:['Personal / Family toggle (segmented control)','Horizontal member avatar strip (filter by member)','List selector tabs: Groceries / School Supplies / Party Prep / etc.','Search icon (search items within current list)','Settings / manage permissions icon'] },
    { id:'list-items', title:'Zone 2 — List Items', icon:LayoutList, color:'bg-amber-100 border-amber-300', items:['Scrollable checklist of items','Each item: checkbox, name, store tag badge','Completed items: struck-through, lower opacity','Long-press to reorder via drag-and-drop','Swipe left for delete/edit options'] },
    { id:'quick-add', title:'Zone 3 — Quick Add Field', icon:Type, color:'bg-yellow-100 border-yellow-300', items:['Sticky text input at bottom: "Add item…"','Store tag button (Costco / Safeway / Local)','Press Enter or tap Add button to add item instantly','Item syncs to all family devices in real-time'] },
    { id:'fab', title:'Zone 4 — FAB Menu', icon:PlusCircle, color:'bg-red-100 border-red-300', items:['Bottom-right floating action button','Create new list','Share list (external link or family member)','Manage permissions','Use template (Groceries, Cleaning, Packing)'] },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-orange-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">UI Screen Zones — 4 Zones</h2>
      </div>
      <div className="space-y-3">
        {zones.map(z=>{
          const Icon=z.icon;
          return (
            <div key={z.id} className={`border-2 rounded-lg p-4 ${z.color}`}>
              <div className="flex items-center gap-2 mb-2"><Icon className="w-4 h-4"/><h4 className="font-semibold text-gray-900 text-sm">{z.title}</h4></div>
              <ul className="space-y-1">{z.items.map((it,i)=><li key={i} className="text-xs text-gray-700 flex items-start"><span className="text-gray-400 mr-2">•</span><span>{it}</span></li>)}</ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── List: 5-Flow Screen Diagram ────────────────────────────────────
function ListScreenFlows() {
  const [active, setActive] = useState('flow1');
  const current = LST_FLOWS.find(f=>f.id===active)!;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-orange-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">5 Interactive Screen Flows</h2>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {LST_FLOWS.map(f=>(
          <button key={f.id} onClick={()=>setActive(f.id)}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-all ${active===f.id?'bg-orange-500 text-white border-orange-500':'bg-white text-gray-600 border-gray-300 hover:border-orange-400 hover:text-orange-600'}`}>
            {f.title.split(' — ')[0]}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mb-4 text-xs">
        {[['bg-orange-500','User Action'],['bg-purple-500','System Process'],['bg-green-500','Result / Output']].map(([c,l])=>(
          <div key={l} className="flex items-center gap-1.5"><div className={`w-3 h-3 rounded-full ${c}`}/><span className="text-gray-600">{l}</span></div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="font-bold text-orange-900 text-sm">{current.title}</h3>
            <p className="text-xs text-orange-700 mt-0.5">{current.description}</p>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-2 overflow-x-auto pb-2">
            {current.screens.map((s,i)=>(
              <div key={i} className="flex items-center gap-2">
                <LstPhone label={s.label} type={s.type}><s.component/></LstPhone>
                {s.arrow&&<LstArrow label={s.arrow}/>}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Task: Main Screen ─────────────────────────────────────────────
function TaskMainScreen() {
  return (
    <div className="h-full flex flex-col" style={{ minHeight: 290 }}>
      {/* View-switcher icon — sits next to the PhoneShell scan icon at top-right */}
      <div className="absolute top-1 right-[18px] z-10 bg-gray-900/80 rounded-md p-0.5">
        <svg width={9} height={9} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2.5"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="bg-emerald-600 px-2 pt-2 pb-1.5">
        <div className="flex gap-1 mb-1">
          {['A','B','C','D'].map(m=>(
            <div key={m} className="w-4 h-4 rounded-full bg-emerald-300 flex items-center justify-center text-[5px] text-emerald-900 font-bold">{m}</div>
          ))}
        </div>
        <div className="flex gap-0.5">
          {['All','Today','Upcoming','Given'].map((v,i)=>(
            <div key={v} className={`text-[5px] px-1 py-0.5 rounded font-semibold ${i===1?'bg-white text-emerald-700':'bg-emerald-500 text-white'}`}>{v}</div>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 px-1.5 py-1 flex-1 space-y-1">
        <div className="text-[6px] font-bold text-gray-500 uppercase tracking-wide">Today · 3 tasks</div>
        {[
          { title:'Take out trash', a:'Dad', p:'bg-red-400', over:true },
          { title:'Buy milk & eggs', a:'Mom', p:'bg-amber-400', over:false },
          { title:'Help kids with homework', a:'Dad', p:'bg-green-400', over:false },
        ].map(t=>(
          <div key={t.title} className={`bg-white rounded border border-gray-200 px-1 py-0.5 flex items-center gap-1 shadow-sm ${t.over?'border-l-2 border-l-red-400':''}`}>
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${t.p}`}/>
            <div className="flex-1">
              <div className={`text-[6px] font-medium ${t.over?'text-red-600':'text-gray-800'}`}>{t.title}</div>
              <div className="text-[5px] text-gray-400">{t.a}{t.over?' · ⚠ Overdue':''}</div>
            </div>
            <div className={`w-3 h-3 rounded border ${t.over?'border-red-300':'border-gray-300'}`}/>
          </div>
        ))}
        <div className="text-[6px] font-bold text-gray-500 uppercase tracking-wide mt-1.5">Upcoming</div>
        <div className="bg-white rounded border border-gray-200 px-1 py-0.5 flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"/>
          <div className="flex-1">
            <div className="text-[6px] font-medium text-gray-800">Clean garage</div>
            <div className="text-[5px] text-gray-400">Mom · Sat</div>
          </div>
          <div className="w-3 h-3 rounded border border-gray-300"/>
        </div>
      </div>
      <div className="relative bg-white h-7 border-t border-gray-100">
        <div className="absolute bottom-1 right-1.5 w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[9px] font-bold shadow-md">+</div>
      </div>
    </div>
  );
}

// ── Task: Detail Screen ───────────────────────────────────────────
function TaskDetailScreen() {
  return (
    <div className="flex flex-col" style={{ minHeight: 290 }}>
      <div className="bg-emerald-600 px-2 py-1.5 flex items-center gap-1">
        <div className="text-white text-[8px]">←</div>
        <div className="text-[7px] font-bold text-white">Task Detail</div>
      </div>
      <div className="flex-1 p-2 space-y-1.5 bg-white">
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 rounded border-2 border-emerald-400 flex-shrink-0"/>
          <div className="text-[8px] font-bold text-gray-800">Take out trash</div>
        </div>
        <div className="flex gap-1 flex-wrap">
          <div className="text-[5px] bg-red-100 text-red-700 rounded px-1 py-0.5 font-medium">🔴 High</div>
          <div className="text-[5px] bg-orange-100 text-orange-700 rounded px-1 py-0.5">⚠ Overdue</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-[6px] text-gray-400">ASSIGNEE</div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center text-[5px] text-white font-bold">D</div>
            <div className="text-[6px] text-gray-700">Dad</div>
          </div>
        </div>
        <div className="space-y-0.5">
          <div className="text-[6px] text-gray-400">DUE DATE</div>
          <div className="text-[6px] text-red-600 font-medium">Yesterday · 6:00 PM</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-[6px] text-gray-400">RECURRENCE</div>
          <div className="text-[6px] text-gray-700">🔁 Every Monday (rotates: Dad → Mom)</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-[6px] text-gray-400">SUBTASKS</div>
          <div className="space-y-0.5 ml-1">
            {['Collect bins from rooms','Take to street'].map((sub,i)=>(
              <div key={i} className="flex items-center gap-1">
                <div className={`w-2.5 h-2.5 rounded border border-gray-300 ${i===0?'bg-emerald-100 border-emerald-400':''}`}/>
                <div className={`text-[5px] ${i===0?'line-through text-gray-400':'text-gray-700'}`}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded p-1">
          <div className="text-[5px] text-red-700 font-semibold">⚠ This task is overdue.</div>
        </div>
      </div>
      <div className="px-2 pb-2 pt-1 bg-white border-t border-gray-100">
        <div className="bg-emerald-600 text-white text-[7px] font-bold text-center rounded py-1.5">MARK COMPLETE</div>
      </div>
    </div>
  );
}

// ── Task: Add Task Screen — Toggle OFF (personal, one-time) ───────
function AddTaskScreen() {
  return (
    <div className="flex flex-col" style={{ minHeight: 400 }}>
      <div className="bg-emerald-600 px-2 py-1.5 flex items-center gap-1">
        <div className="text-white text-[8px]">←</div>
        <div className="text-[7px] font-bold text-white">Add Task</div>
      </div>
      <div className="flex-1 p-2 space-y-1.5 bg-white">
        {/* Task Title */}
        <div>
          <div className="text-[6px] text-gray-400 mb-0.5">TASK TITLE</div>
          <div className="bg-gray-100 rounded px-1.5 py-1 border border-gray-200">
            <div className="text-[6px] text-gray-700">Buy groceries</div>
          </div>
        </div>
        {/* Priority + Due Date */}
        <div className="grid grid-cols-2 gap-1">
          <div>
            <div className="text-[6px] text-gray-400 mb-0.5">PRIORITY</div>
            <div className="bg-amber-50 rounded px-1 py-1 text-[6px] text-amber-700 border border-amber-200 font-medium">🟡 Medium</div>
          </div>
          <div>
            <div className="text-[6px] text-gray-400 mb-0.5">DUE DATE</div>
            <div className="bg-gray-100 rounded px-1 py-1 text-[6px] text-gray-700 border border-gray-200">Today 6pm</div>
          </div>
        </div>
        {/* Estimated Time */}
        <div>
          <div className="text-[6px] text-gray-400 mb-0.5">EST. TIME TO FINISH</div>
          <div className="flex gap-0.5">
            {['15m','30m','1h','2h','3h+'].map((t,i)=>(
              <div key={t} className={`text-[5px] px-1.5 py-0.5 rounded-full border font-medium ${i===2?'bg-emerald-500 text-white border-emerald-500':'bg-gray-50 text-gray-400 border-gray-200'}`}>{t}</div>
            ))}
          </div>
          <div className="text-[4.5px] text-gray-400 mt-0.5">Used to calculate workload when assigning</div>
        </div>
        {/* Assign To — ON: member avatars + Workload button */}
        <div className="border border-emerald-300 rounded p-1.5 bg-emerald-50 space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-[6px] font-semibold text-emerald-800">👤 Assign to someone</div>
            <div className="w-6 h-3 bg-emerald-500 rounded-full flex items-center justify-end pr-0.5">
              <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            {[{l:'D',name:'Dad',on:true},{l:'M',name:'Mom',on:false},{l:'S',name:'Sarah',on:false}].map(m=>(
              <div key={m.l} className="flex flex-col items-center gap-0.5">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[4.5px] font-bold text-white ${m.on?'bg-emerald-500 ring-1 ring-emerald-400':'bg-gray-300'}`}>{m.l}</div>
                <div className={`text-[4px] ${m.on?'text-emerald-700':'text-gray-400'}`}>{m.name}</div>
              </div>
            ))}
            <div className="w-4 h-4 rounded-full bg-white border border-gray-300 flex items-center justify-center text-[5px] text-gray-400 ml-0.5">+</div>
            <div className="ml-auto flex items-center gap-0.5 bg-white border border-emerald-300 rounded px-1 py-0.5 cursor-pointer">
              <div className="text-[4.5px] text-emerald-700 font-semibold">👁 Workload</div>
            </div>
          </div>
        </div>
        {/* Recurring — OFF */}
        <div className="border border-gray-200 rounded p-1.5 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-[6px] font-semibold text-gray-500">🔁 Recurring Task</div>
            <div className="w-6 h-3 bg-gray-300 rounded-full flex items-center pl-0.5">
              <div className="w-2 h-2 bg-white rounded-full shadow-sm border border-gray-300" />
            </div>
          </div>
          <div className="text-[5px] text-gray-400 mt-0.5">Off — one-time task</div>
        </div>
        {/* AI Suggestion */}
        <div className="bg-violet-50 border border-violet-200 rounded p-1.5">
          <div className="flex items-start gap-1">
            <span className="text-[8px] leading-none mt-0.5">✨</span>
            <div>
              <div className="text-[5.5px] font-bold text-violet-800 mb-0.5">AI Suggestion</div>
              <div className="text-[5px] text-violet-700 leading-tight">
                For <span className="font-semibold">"Buy groceries"</span> — connect with{' '}
                <span className="font-semibold">Shopping List</span> &{' '}
                <span className="font-semibold">Expense</span>.
              </div>
            </div>
          </div>
        </div>
        {/* Connect with Modules */}
        <div>
          <div className="text-[6px] text-gray-400 mb-0.5">CONNECT WITH</div>
          <div className="flex flex-wrap gap-0.5">
            {[
              { label:'List', icon:'📝', active:true },
              { label:'Expense', icon:'💰', active:true },
              { label:'Calendar', icon:'📅', active:false },
              { label:'Docs', icon:'📁', active:false },
            ].map(({label,icon,active})=>(
              <div key={label} className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full border text-[5.5px] font-medium ${active?'bg-violet-100 border-violet-400 text-violet-800':'bg-gray-50 border-gray-200 text-gray-400'}`}>
                <span className="text-[7px] leading-none">{icon}</span>
                {label}
                {active && <span className="text-violet-500 font-bold leading-none">✓</span>}
              </div>
            ))}
          </div>
          <div className="text-[5px] text-gray-400 mt-0.5">Tap to link this task to another module</div>
        </div>
      </div>
      <div className="px-2 pb-2 pt-1 bg-white border-t border-gray-100">
        <div className="bg-emerald-600 text-white text-[7px] font-bold text-center rounded py-1.5">SAVE TASK</div>
      </div>
    </div>
  );
}

// ── Task: Add Task Screen — Toggle ON (assigned + recurring) ──────
function AddTaskScreenExpanded() {
  return (
    <div className="flex flex-col" style={{ minHeight: 400 }}>
      <div className="bg-emerald-600 px-2 py-1.5 flex items-center gap-1">
        <div className="text-white text-[8px]">←</div>
        <div className="text-[7px] font-bold text-white">Add Task</div>
      </div>
      <div className="flex-1 p-2 space-y-1.5 bg-white">
        {/* Task Title */}
        <div>
          <div className="text-[6px] text-gray-400 mb-0.5">TASK TITLE</div>
          <div className="bg-gray-100 rounded px-1.5 py-1 border border-gray-200">
            <div className="text-[6px] text-gray-700">Clean the kitchen</div>
          </div>
        </div>
        {/* Priority + Due Date */}
        <div className="grid grid-cols-2 gap-1">
          <div>
            <div className="text-[6px] text-gray-400 mb-0.5">PRIORITY</div>
            <div className="bg-red-50 rounded px-1 py-1 text-[6px] text-red-700 border border-red-200 font-medium">🔴 High</div>
          </div>
          <div>
            <div className="text-[6px] text-gray-400 mb-0.5">DUE DATE</div>
            <div className="bg-gray-100 rounded px-1 py-1 text-[6px] text-gray-700 border border-gray-200">Today 6pm</div>
          </div>
        </div>
        {/* Estimated Time */}
        <div>
          <div className="text-[6px] text-gray-400 mb-0.5">EST. TIME TO FINISH</div>
          <div className="flex gap-0.5">
            {['15m','30m','1h','2h','3h+'].map((t,i)=>(
              <div key={t} className={`text-[5px] px-1.5 py-0.5 rounded-full border font-medium ${i===3?'bg-emerald-500 text-white border-emerald-500':'bg-gray-50 text-gray-400 border-gray-200'}`}>{t}</div>
            ))}
          </div>
          <div className="text-[4.5px] text-gray-400 mt-0.5">Used to calculate workload when assigning</div>
        </div>
        {/* Assign To — disabled since rotation handles it */}
        <div className="border border-gray-200 rounded p-1.5 bg-gray-50 opacity-60">
          <div className="flex items-center justify-between">
            <div className="text-[6px] font-semibold text-gray-400">👤 Assign to someone</div>
            <div className="w-6 h-3 bg-gray-200 rounded-full flex items-center pl-0.5">
              <div className="w-2 h-2 bg-white rounded-full shadow-sm border border-gray-300" />
            </div>
          </div>
          <div className="text-[5px] text-gray-400 mt-0.5">Handled by rotation below</div>
        </div>
        {/* Recurring — ON + expanded + rotation */}
        <div className="border border-emerald-300 rounded p-1.5 bg-emerald-50 space-y-1.5">
          {/* Recurring header */}
          <div className="flex items-center justify-between">
            <div className="text-[6px] font-semibold text-emerald-800">🔁 Recurring Task</div>
            <div className="w-6 h-3 bg-emerald-500 rounded-full flex items-center justify-end pr-0.5">
              <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
            </div>
          </div>
          {/* Frequency chips */}
          <div className="flex gap-0.5">
            {['Daily','Weekly','Monthly','Custom'].map((f,i)=>(
              <div key={f} className={`text-[5px] px-1 py-0.5 rounded ${i===1?'bg-emerald-500 text-white':'bg-white text-gray-400 border border-gray-200'}`}>{f}</div>
            ))}
          </div>
          {/* Divider */}
          <div className="border-t border-emerald-200"/>
          {/* Rotate with family — sub-option */}
          <div className="flex items-center justify-between">
            <div className="text-[6px] font-semibold text-emerald-800">🔄 Rotate with family</div>
            <div className="w-6 h-3 bg-emerald-500 rounded-full flex items-center justify-end pr-0.5">
              <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
            </div>
          </div>
          <div className="text-[5px] text-emerald-700 leading-tight">Select who takes turns — each time one completes it, the next person gets it.</div>
          {/* Member selector */}
          <div className="flex gap-0.5 items-center">
            {[
              {label:'D', name:'Dad', on:true},
              {label:'M', name:'Mom', on:true},
              {label:'S', name:'Sarah', on:false},
            ].map(m=>(
              <div key={m.label} className="flex flex-col items-center gap-0.5">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[5px] font-bold text-white ${m.on?'bg-emerald-500 ring-1 ring-emerald-400':'bg-gray-300'}`}>{m.label}</div>
                <div className={`text-[4px] ${m.on?'text-emerald-700':'text-gray-400'}`}>{m.name}</div>
              </div>
            ))}
            <div className="w-4 h-4 rounded-full bg-white border border-gray-300 flex items-center justify-center text-[5px] text-gray-400 ml-0.5">+</div>
          </div>
          {/* Rotation order preview */}
          <div className="bg-white border border-emerald-200 rounded px-1.5 py-1">
            <div className="text-[4.5px] text-gray-400 mb-0.5">ROTATION ORDER</div>
            <div className="text-[5px] text-emerald-700 font-semibold">Dad → Mom → Dad → Mom … (loops)</div>
          </div>
        </div>
        {/* AI Suggestion */}
        <div className="bg-violet-50 border border-violet-200 rounded p-1.5">
          <div className="flex items-start gap-1">
            <span className="text-[8px] leading-none mt-0.5">✨</span>
            <div>
              <div className="text-[5.5px] font-bold text-violet-800 mb-0.5">AI Suggestion</div>
              <div className="text-[5px] text-violet-700 leading-tight">
                For <span className="font-semibold">"Clean the kitchen"</span> — connect with{' '}
                <span className="font-semibold">Shopping List</span> &{' '}
                <span className="font-semibold">Calendar</span>.
              </div>
            </div>
          </div>
        </div>
        {/* Connect with Modules */}
        <div>
          <div className="text-[6px] text-gray-400 mb-0.5">CONNECT WITH</div>
          <div className="flex flex-wrap gap-0.5">
            {[
              { label:'List', icon:'📝', active:true },
              { label:'Calendar', icon:'📅', active:true },
              { label:'Expense', icon:'💰', active:false },
              { label:'Docs', icon:'📁', active:false },
            ].map(({label,icon,active})=>(
              <div key={label} className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full border text-[5.5px] font-medium ${active?'bg-violet-100 border-violet-400 text-violet-800':'bg-gray-50 border-gray-200 text-gray-400'}`}>
                <span className="text-[7px] leading-none">{icon}</span>
                {label}
                {active && <span className="text-violet-500 font-bold leading-none">✓</span>}
              </div>
            ))}
          </div>
          <div className="text-[5px] text-gray-400 mt-0.5">Tap to link this task to another module</div>
        </div>
      </div>
      <div className="px-2 pb-2 pt-1 bg-white border-t border-gray-100">
        <div className="bg-emerald-600 text-white text-[7px] font-bold text-center rounded py-1.5">SAVE TASK</div>
      </div>
    </div>
  );
}

// ── Task: Small Phone + Arrow (for flows) ─────────────────────────
function TskPhone({ children, label, type='normal' }: { children: React.ReactNode; label: string; type?: 'normal'|'user'|'system'|'warning'|'success' }) {
  const border = { normal:'border-gray-700', user:'border-emerald-600', system:'border-purple-600', warning:'border-red-500', success:'border-green-600' }[type];
  const lc = { normal:'text-gray-700', user:'text-emerald-700', system:'text-purple-700', warning:'text-red-600', success:'text-green-700' }[type];
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className={`relative flex flex-col rounded-[2rem] border-[3px] shadow-xl overflow-hidden w-32 ${border} bg-gray-800`}>
        <div className="bg-gray-800 flex justify-between items-center px-2 py-1">
          <span className="text-[6px] text-gray-400">9:41</span>
          <div className="w-7 h-1.5 bg-gray-600 rounded-full"/>
          <span className="text-[6px] text-gray-400">●●</span>
        </div>
        <div className="bg-white overflow-hidden flex-1">{children}</div>
        <div className="bg-gray-800 flex justify-center py-1.5">
          <div className="w-10 h-0.5 bg-gray-500 rounded-full"/>
        </div>
      </div>
      <p className={`text-[10px] font-bold text-center max-w-[128px] leading-tight ${lc}`}>{label}</p>
    </div>
  );
}

function TskArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 px-1 shrink-0 self-center mb-5">
      {label&&<span className="text-[9px] text-gray-500 text-center max-w-[64px] leading-tight">{label}</span>}
      <span className="text-gray-300 text-xl font-thin">→</span>
    </div>
  );
}

// ── Task Flow Screens ──────────────────────────────────────────────
function TF1_TaskList() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5">
        <div className="text-[6px] text-emerald-200">Sharma Family</div>
        <div className="flex gap-0.5 mt-0.5">
          {['A','B','C','D'].map(m=><div key={m} className="w-3 h-3 rounded-full bg-emerald-300 flex items-center justify-center text-[4px] text-emerald-900">{m}</div>)}
        </div>
        <div className="flex gap-0.5 mt-0.5">
          {['All','Today','Upcoming','Given'].map((v,i)=>(
            <div key={v} className={`text-[5px] px-1 py-0.5 rounded ${i===1?'bg-white text-emerald-700 font-bold':'bg-emerald-500 text-white'}`}>{v}</div>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 px-1.5 pt-1 flex-1 space-y-1">
        <div className="text-[5px] font-bold text-gray-500 uppercase">Today · 3</div>
        {[{title:'Take out trash',p:'bg-red-400',a:'Dad',over:true},{title:'Buy groceries',p:'bg-amber-400',a:'Mom',over:false}].map(t=>(
          <div key={t.title} className={`bg-white rounded border border-gray-200 px-1 py-0.5 flex items-center gap-1 ${t.over?'border-l-2 border-l-red-400':''}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${t.p}`}/>
            <div className="flex-1">
              <div className={`text-[5px] font-medium ${t.over?'text-red-600':'text-gray-800'}`}>{t.title}</div>
              <div className="text-[4px] text-gray-400">{t.a}{t.over?' · ⚠':''}</div>
            </div>
            <div className="w-3 h-3 rounded border border-gray-300"/>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 px-2 py-1 text-[5px] text-gray-400 border-t">Tap task to see details →</div>
    </div>
  );
}

function TF1_TaskDetail() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Task Detail</div>
        <div className="text-[5px] text-emerald-200">Take out trash</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-1">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded border-2 border-emerald-400"/>
          <div className="text-[6px] font-bold text-gray-800">Take out trash</div>
        </div>
        <div className="flex gap-0.5">
          <div className="text-[5px] bg-red-100 text-red-700 rounded px-1 py-0.5">🔴 High</div>
          <div className="text-[5px] bg-orange-100 text-orange-700 rounded px-1 py-0.5">⚠ Overdue</div>
        </div>
        <div>
          <div className="text-[5px] text-gray-400">Assigned to: Dad</div>
          <div className="text-[5px] text-gray-400">Due: Yesterday</div>
          <div className="text-[5px] text-gray-400">🔁 Rotates weekly</div>
          <div className="text-[5px] text-gray-400">⏱ Est. time: <span className="font-semibold text-gray-600">30 min</span></div>
        </div>
        <div className="bg-gray-50 rounded border border-gray-200 p-1 text-[5px] text-gray-600">Notes: Take bins to curb before 7am</div>
        {/* Actual time taken — shown before completing */}
        <div className="bg-blue-50 border border-blue-200 rounded p-1 space-y-0.5">
          <div className="text-[5px] font-semibold text-blue-800">⏱ How long did it actually take?</div>
          <div className="text-[4px] text-blue-600 leading-tight">Optional · helps improve future estimates</div>
          <div className="flex gap-0.5 flex-wrap mt-0.5">
            {['−1h','On time','＋30m','＋1h','＋2h'].map((t,i)=>(
              <div key={t} className={`text-[4.5px] px-1 py-0.5 rounded-full border font-medium ${i===3?'bg-blue-500 text-white border-blue-500':'bg-white text-gray-500 border-gray-300'}`}>{t}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-1.5 pb-1 bg-white border-t border-gray-100">
        <div className="bg-emerald-600 text-white text-[6px] font-bold text-center rounded py-1">MARK COMPLETE</div>
      </div>
    </div>
  );
}

function TF1_Completed() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-green-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">✓ Task Complete</div>
      </div>
      <div className="flex-1 px-1.5 py-2 flex flex-col items-center justify-center space-y-1">
        <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center text-[14px]">✓</div>
        <div className="text-[7px] font-bold text-green-700 text-center">Done!</div>
        <div className="text-[5px] text-gray-500 text-center">Take out trash marked complete by Dad</div>
        <div className="text-[5px] text-emerald-600 text-center">Next: Mom's turn (rotation applied)</div>
        <div className="bg-blue-50 rounded p-1 text-[5px] text-blue-700 text-center mt-1">
          <span className="font-semibold">Actual time saved: +1h over estimate</span><br/>
          <span className="text-[4px] text-blue-500">Used to improve future time estimates only</span>
        </div>
        <div className="bg-gray-50 rounded p-1 text-[5px] text-gray-500 text-center">Feed updated · Mom notified · History logged</div>
      </div>
    </div>
  );
}

// ── Task Flow 2 (NEW): Conflict Detection while Assigning ─────────
function TF_CX1_AssignForm() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5 flex items-center gap-1">
        <div className="text-white text-[7px]">←</div>
        <div className="text-[6px] text-white font-bold">Assign Task</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="text-[5px] text-gray-400 uppercase tracking-wide">TASK</div>
        <div className="bg-gray-100 rounded px-1.5 py-1 text-[6px] font-semibold text-gray-800">School pickup</div>
        <div className="grid grid-cols-2 gap-1">
          <div>
            <div className="text-[4.5px] text-gray-400 uppercase mb-0.5">DATE</div>
            <div className="bg-gray-100 rounded px-1.5 py-0.5 text-[5px] text-gray-700">Friday, Apr 5</div>
          </div>
          <div>
            <div className="text-[4.5px] text-gray-400 uppercase mb-0.5">TIME</div>
            <div className="bg-gray-100 rounded px-1.5 py-0.5 text-[5px] text-gray-700">3:00 PM</div>
          </div>
        </div>
        <div className="text-[4.5px] text-gray-400 uppercase tracking-wide">ASSIGN TO</div>
        <div className="flex gap-1">
          {[{l:'A',c:'bg-emerald-500 text-white ring-1 ring-emerald-600'},{l:'B',c:'bg-emerald-200 text-emerald-800'},{l:'C',c:'bg-emerald-200 text-emerald-800'},{l:'D',c:'bg-emerald-200 text-emerald-800'}].map(m=>(
            <div key={m.l} className={`w-4 h-4 rounded-full flex items-center justify-center text-[5px] font-bold ${m.c}`}>{m.l}</div>
          ))}
        </div>
        <div className="bg-emerald-600 text-white text-[5.5px] font-bold text-center rounded py-0.5 mt-1">ASSIGN TASK →</div>
      </div>
    </div>
  );
}

function TF_CX2_ConflictAlert() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-red-600 px-2 py-1.5 flex items-center gap-1">
        <div className="text-[6px] text-white font-bold">⚠ Conflict Detected</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-red-50 border border-red-300 rounded p-1">
          <div className="text-[5.5px] font-bold text-red-700">Dad — Friday Apr 5 · 3:00 PM</div>
          <div className="text-[4.5px] text-red-600 mt-0.5">Already has a calendar event:</div>
          <div className="mt-0.5 bg-red-100 rounded px-1 py-0.5">
            <div className="text-[5.5px] font-bold text-red-800">🏥 Doctor Appointment</div>
            <div className="text-[4.5px] text-red-500">3:00 – 4:30 PM · Confirmed</div>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
          <div className="text-[5px] text-amber-700">Dad's load this week: 5 tasks (High)</div>
        </div>
        <div className="text-[5px] text-gray-500 font-semibold">AI Suggestions:</div>
        <div className="space-y-0.5">
          <div className="bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5 text-[5px] text-blue-700">👤 Reassign → Mom (2 tasks, free slot)</div>
          <div className="bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5 text-[5px] text-gray-600">🕐 Keep Dad, change time → 5:00 PM</div>
        </div>
      </div>
    </div>
  );
}

function TF_CX3_Resolved() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Task Assigned ✓</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-emerald-50 rounded border-l-2 border-emerald-500 px-1.5 py-1">
          <div className="text-[6px] font-bold text-emerald-800">School pickup</div>
          <div className="text-[5px] text-gray-500">Mom · Fri Apr 5 · 3:00 PM</div>
          <div className="text-[4.5px] text-blue-600">↻ Reassigned (conflict resolved)</div>
        </div>
        <div className="space-y-0.5">
          {['Reassigned to Mom — no conflict','Mom notified via push','Calendar updated for Mom','Dad\'s Doctor Appt preserved'].map(a=>(
            <div key={a} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"/>
              <div className="text-[5px] text-gray-700">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TF3_VoiceInput() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-pink-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">AI Assistant</div>
      </div>
      <div className="flex-1 bg-white px-2 py-2 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-pink-100 border-2 border-pink-400 flex items-center justify-center mb-1">
            <div className="text-[14px]">🎤</div>
          </div>
          <div className="text-[7px] font-bold text-pink-700 mb-0.5">Listening...</div>
          <div className="text-[5px] text-gray-500 text-center px-2 bg-pink-50 rounded p-1">"Assign kitchen cleaning to Dad every Sunday"</div>
        </div>
        <div className="flex gap-1 mt-2">
          {[1,2,3,4,5].map(i=>(
            <div key={i} className="flex-1 h-3 bg-pink-300 rounded-full"/>
          ))}
        </div>
      </div>
    </div>
  );
}

function TF3_AIParses() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-purple-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Task Agent · Processing</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1.5 space-y-1.5">
        <div className="text-[5px] text-gray-500">Parsed from voice:</div>
        <div className="space-y-1">
          {[{label:'Action',value:'Clean kitchen'},{label:'Assignee',value:'Dad ✓'},{label:'Schedule',value:'Every Sunday'},{label:'Priority',value:'Medium (auto)'}].map(f=>(
            <div key={f.label} className="flex justify-between bg-purple-50 rounded px-1.5 py-0.5">
              <span className="text-[5px] text-gray-500">{f.label}</span>
              <span className="text-[5px] font-bold text-purple-700">{f.value}</span>
            </div>
          ))}
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded p-1 text-[5px] text-emerald-700">Fairness check: Dad has 2 tasks this week — OK</div>
      </div>
    </div>
  );
}

function TF3_Confirmed() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Task Created ✓</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-emerald-50 rounded border-l-2 border-emerald-500 px-1.5 py-1">
          <div className="text-[6px] font-bold text-emerald-800">Kitchen Cleaning</div>
          <div className="text-[5px] text-gray-500">Dad · Every Sunday · Medium</div>
          <div className="text-[5px] text-emerald-600">🔁 Rotation active</div>
        </div>
        <div className="space-y-0.5">
          {['Task created & saved','Dad notified via push','Calendar marked every Sunday','Rotation queue: Dad → Mom → Dad'].map(a=>(
            <div key={a} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>
              <div className="text-[5px] text-gray-700">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TF4_DocUpload() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-gray-700 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Document Vault</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1.5 flex flex-col items-center justify-center space-y-1">
        <div className="w-10 h-12 bg-blue-50 border-2 border-dashed border-blue-300 rounded flex items-center justify-center">
          <div className="text-[18px]">📄</div>
        </div>
        <div className="text-[6px] font-bold text-gray-700">Insurance_Renewal.pdf</div>
        <div className="text-[5px] text-gray-400">Uploading to Document Vault...</div>
        <div className="w-16 h-1 bg-gray-200 rounded-full">
          <div className="w-12 h-1 bg-blue-500 rounded-full"/>
        </div>
      </div>
    </div>
  );
}

function TF4_AIExtract() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-purple-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">AI · Extracting</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1.5 space-y-1">
        <div className="text-[5px] text-gray-500">Extracted from document:</div>
        {[{f:'Action',v:'Pay insurance premium'},{f:'Due Date',v:'March 31, 2026'},{f:'Amount',v:'₹12,000'},{f:'Provider',v:'LIC Insurance'}].map(e=>(
          <div key={e.f} className="bg-purple-50 rounded px-1.5 py-0.5 flex justify-between">
            <span className="text-[5px] text-gray-500">{e.f}</span>
            <span className="text-[5px] font-bold text-purple-700">{e.v}</span>
          </div>
        ))}
        <div className="bg-yellow-50 border border-yellow-200 rounded p-0.5 text-[5px] text-yellow-700">⚡ Auto-creating task + expense record</div>
      </div>
    </div>
  );
}

function TF4_TaskCreated() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Task Auto-Created ✓</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-orange-50 rounded border-l-2 border-orange-500 px-1.5 py-1">
          <div className="text-[6px] font-bold text-orange-800">Pay Insurance Premium</div>
          <div className="text-[5px] text-gray-500">Due: Mar 31 · ₹12,000 · High</div>
          <div className="text-[5px] text-blue-600">📎 LIC doc attached</div>
        </div>
        <div className="space-y-0.5">
          {['Task created with due date','Expense record linked','Document attached to task','Reminder set: 3 days before'].map(a=>(
            <div key={a} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>
              <div className="text-[5px] text-gray-700">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Task Flow 5: Calendar ↔ Task Integration ──────────────────────
function TF_CA1_TaskDue() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5 flex items-center gap-1">
        <div className="text-white text-[7px]">←</div>
        <div className="text-[6px] text-white font-bold">Task Detail</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 rounded border-2 border-emerald-400 flex-shrink-0"/>
          <div className="text-[7px] font-bold text-gray-800">Submit tax returns</div>
        </div>
        <div className="flex gap-0.5">
          <div className="text-[4.5px] bg-red-100 text-red-700 rounded px-1 py-0.5 font-medium">🔴 Urgent</div>
        </div>
        <div>
          <div className="text-[5px] text-gray-400 uppercase mb-0.5">DUE DATE</div>
          <div className="bg-orange-50 border border-orange-200 rounded px-1.5 py-0.5 text-[5.5px] font-bold text-orange-700">Apr 15 · 11:59 PM</div>
        </div>
        <div>
          <div className="text-[5px] text-gray-400 uppercase mb-0.5">ASSIGNEE</div>
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 flex items-center justify-center text-[4.5px] text-white font-bold">D</div>
            <div className="text-[5.5px] text-gray-700">Dad</div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded p-1">
          <div className="text-[5px] text-blue-700">📅 Due date synced → Calendar</div>
          <div className="text-[4.5px] text-blue-500">Appears in Calendar & Agenda views</div>
        </div>
      </div>
    </div>
  );
}

function TF_CA2_CalView() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-blue-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Calendar · April</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="grid grid-cols-7 gap-0.5 text-center mb-0.5">
          {['M','T','W','T','F','S','S'].map((d,i)=><div key={i} className="text-[4px] text-gray-400">{d}</div>)}
          {Array.from({length:21},(_,i)=>i+1).map(d=>(
            <div key={d} className={`text-[4.5px] rounded-full w-3.5 h-3.5 flex items-center justify-center mx-auto font-medium
              ${d===15?'bg-red-500 text-white':d===5?'bg-blue-400 text-white':d===10?'bg-emerald-400 text-white':'text-gray-600'}`}>{d}</div>
          ))}
        </div>
        <div className="space-y-0.5">
          <div className="text-[5px] text-gray-400 font-semibold uppercase tracking-wide">Apr 15 — Task Due</div>
          <div className="bg-red-50 border-l-2 border-red-500 px-1.5 py-0.5 rounded-r">
            <div className="text-[5.5px] font-bold text-red-700">📋 Submit tax returns</div>
            <div className="text-[4.5px] text-red-500">Due 11:59 PM · Dad · Urgent</div>
          </div>
          <div className="bg-blue-50 border-l-2 border-blue-400 px-1.5 py-0.5 rounded-r">
            <div className="text-[5px] text-blue-700">📅 CA Meeting · 3:00 PM</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TF_CA3_DayView() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-blue-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Apr 15 · Day View</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-0.5">
        {[
          {time:'9:00',label:'Team standup',dot:'bg-blue-400',task:false},
          {time:'12:00',label:'Lunch break',dot:'bg-gray-300',task:false},
          {time:'3:00',label:'CA meeting',dot:'bg-purple-400',task:false},
          {time:'23:59',label:'Submit tax returns',dot:'bg-red-500',task:true},
        ].map(e=>(
          <div key={e.time} className="flex items-center gap-1">
            <div className="text-[4px] text-gray-400 w-5 shrink-0">{e.time}</div>
            <div className={`flex-1 rounded px-1 py-0.5 flex items-center gap-0.5 ${e.task?'bg-red-50 border border-red-200':'bg-blue-50'}`}>
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${e.dot}`}/>
              <div className={`text-[5px] flex-1 ${e.task?'text-red-700 font-bold':'text-gray-700'}`}>{e.label}</div>
              {e.task&&<div className="text-[4px] bg-red-100 text-red-600 px-0.5 rounded shrink-0">TASK</div>}
            </div>
          </div>
        ))}
        <div className="mt-0.5 bg-blue-50 border border-blue-200 rounded p-0.5">
          <div className="text-[5px] text-blue-700">✓ Tasks & events unified in day view</div>
        </div>
      </div>
    </div>
  );
}

// ── Task Flow 6: Expense ↔ Task Integration ───────────────────────
function TF_EX1_TaskBudget() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5 flex items-center gap-1">
        <div className="text-white text-[7px]">←</div>
        <div className="text-[6px] text-white font-bold">Task Detail</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 rounded border-2 border-emerald-400 flex-shrink-0"/>
          <div className="text-[7px] font-bold text-gray-800">Buy school supplies</div>
        </div>
        <div className="flex gap-0.5">
          <div className="text-[4.5px] bg-amber-100 text-amber-700 rounded px-1 py-0.5">🟡 Medium</div>
        </div>
        <div>
          <div className="text-[5px] text-gray-400 uppercase mb-0.5">ASSIGNEE</div>
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 flex items-center justify-center text-[4.5px] text-white font-bold">M</div>
            <div className="text-[5.5px] text-gray-700">Mom</div>
          </div>
        </div>
        <div>
          <div className="text-[5px] text-gray-400 uppercase mb-0.5">DUE DATE</div>
          <div className="text-[5.5px] text-gray-700">Apr 10 · 6:00 PM</div>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded p-1">
          <div className="text-[4.5px] text-gray-400 font-semibold uppercase mb-0.5">BUDGET TAG</div>
          <div className="text-[6px] font-bold text-rose-700">₹ 3,500 · Education</div>
          <div className="text-[4.5px] text-gray-400">Expense auto-logs on completion</div>
        </div>
      </div>
    </div>
  );
}

function TF_EX2_MarkDone() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Task Complete ✓</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 rounded border-2 border-emerald-500 bg-emerald-100 flex items-center justify-center text-[7px] text-emerald-600 flex-shrink-0">✓</div>
          <div className="text-[6px] text-gray-400 line-through">Buy school supplies</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded p-1">
          <div className="text-[6px] font-bold text-emerald-800">Task marked complete!</div>
          <div className="text-[5px] text-emerald-700">Budget tagged: ₹3,500 · Education</div>
        </div>
        <div className="text-[5px] text-gray-600 font-semibold">Log actual spend?</div>
        <div className="bg-gray-100 rounded px-1.5 py-0.5 text-[5.5px] text-gray-700 border border-gray-200">₹ 3,200 (actual spend)</div>
        <div className="flex gap-1">
          <div className="flex-1 bg-rose-500 text-white text-[5px] font-bold text-center rounded py-0.5">LOG EXPENSE</div>
          <div className="bg-gray-200 text-gray-600 text-[5px] px-1.5 rounded py-0.5">Skip</div>
        </div>
      </div>
    </div>
  );
}

function TF_EX3_ExpenseLogged() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-rose-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Expense Logged ✓</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-rose-50 rounded border-l-2 border-rose-500 px-1.5 py-1">
          <div className="text-[6px] font-bold text-rose-800">School Supplies</div>
          <div className="text-[5px] text-gray-500">₹3,200 · Education · Mom · Apr 10</div>
          <div className="text-[5px] text-blue-600">🔗 Linked from task</div>
        </div>
        <div className="space-y-0.5">
          {['Expense added to Apr budget','Education category updated','Budget used: ₹3,200 of ₹5,000','Task & expense linked for audit'].map(a=>(
            <div key={a} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0"/>
              <div className="text-[5px] text-gray-700">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Task Flow 7: Overdue Escalation & Smart Reassignment ──────────
function TF7_OverdueNotif() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-red-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">⚠ Overdue Tasks</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="text-[5px] text-gray-400 uppercase font-semibold tracking-wide">2 tasks overdue</div>
        {[
          {title:'Pay electricity bill',days:'3 days overdue',assignee:'Dad',color:'border-l-red-500'},
          {title:'Book dentist appointment',days:'1 day overdue',assignee:'Mom',color:'border-l-orange-400'},
        ].map(t=>(
          <div key={t.title} className={`bg-red-50 border-l-2 ${t.color} rounded-r px-1.5 py-1`}>
            <div className="text-[5.5px] font-bold text-red-800">{t.title}</div>
            <div className="text-[4.5px] text-red-500">{t.days} · {t.assignee}</div>
          </div>
        ))}
        <div className="bg-red-100 border border-red-200 rounded p-1 mt-1">
          <div className="text-[5px] text-red-700 font-semibold">✨ AI: Tap to reassign or reschedule</div>
        </div>
      </div>
    </div>
  );
}

function TF7_AIReassign() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-purple-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">✨ AI · Reassign Suggestion</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="text-[5px] text-gray-500">Pay electricity bill — 3 days overdue</div>
        <div className="text-[5px] text-gray-400 font-semibold uppercase tracking-wide">AI recommends</div>
        {[
          {name:'Mom', load:'2 tasks this week', score:'Best match', dot:'bg-emerald-400', badge:'bg-emerald-100 text-emerald-700'},
          {name:'Sarah', load:'4 tasks this week', score:'Available', dot:'bg-amber-400', badge:'bg-amber-100 text-amber-700'},
          {name:'Dad', load:'7 tasks this week', score:'Overloaded', dot:'bg-red-400', badge:'bg-red-100 text-red-600'},
        ].map(m=>(
          <div key={m.name} className={`flex items-center gap-1 rounded border px-1 py-0.5 ${m.name==='Mom'?'border-emerald-300 bg-emerald-50':'border-gray-200'}`}>
            <div className={`w-3 h-3 rounded-full ${m.dot} flex items-center justify-center text-[4px] text-white font-bold flex-shrink-0`}>{m.name[0]}</div>
            <div className="flex-1">
              <div className="text-[5.5px] font-semibold text-gray-800">{m.name}</div>
              <div className="text-[4.5px] text-gray-400">{m.load}</div>
            </div>
            <div className={`text-[4.5px] px-1 py-0.5 rounded font-medium ${m.badge}`}>{m.score}</div>
          </div>
        ))}
        <div className="text-[4.5px] text-gray-400">+ Set new due date: Today by 8 PM</div>
      </div>
    </div>
  );
}

function TF7_Reassigned() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Reassigned ✓</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-emerald-50 rounded border-l-2 border-emerald-500 px-1.5 py-1">
          <div className="text-[6px] font-bold text-emerald-800">Pay electricity bill</div>
          <div className="text-[5px] text-gray-500">Reassigned → Mom · Due today 8 PM</div>
        </div>
        {['Task reassigned to Mom','Mom notified via push','Dad removed from task','Due date updated to today','Overdue flag cleared'].map(a=>(
          <div key={a} className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"/>
            <div className="text-[5px] text-gray-700">{a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Task Flow 9: Edit Existing Task (Full Form) ───────────────────
function TF9_SimpleTask() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">My Tasks · Today</div>
      </div>
      <div className="flex-1 bg-gray-50 px-1.5 py-1 space-y-1">
        <div className="text-[5px] text-gray-400 font-semibold uppercase tracking-wide">Today · 3 tasks</div>
        {[
          {title:'Buy groceries', tag:'Personal · one-time', p:'bg-amber-400', tap:false},
          {title:'Clean the kitchen', tag:'Personal · one-time', p:'bg-red-400', tap:true},
          {title:'Call electrician', tag:'Personal · one-time', p:'bg-green-400', tap:false},
        ].map(t=>(
          <div key={t.title} className={`bg-white rounded border px-1 py-0.5 flex items-center gap-1 shadow-sm ${t.tap?'border-emerald-400 ring-1 ring-emerald-200':''}`}>
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${t.p}`}/>
            <div className="flex-1">
              <div className="text-[5.5px] font-medium text-gray-800">{t.title}</div>
              <div className="text-[4.5px] text-gray-400">{t.tag}</div>
            </div>
            {t.tap && <div className="text-[4.5px] text-emerald-600 font-bold">Tap →</div>}
          </div>
        ))}
        <div className="text-[5px] text-gray-400 italic mt-1">Tap any task to open & edit</div>
      </div>
    </div>
  );
}

function TF9_EditForm() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5 flex items-center gap-1">
        <div className="text-white text-[7px]">←</div>
        <div className="text-[6px] text-white font-bold">Edit Task</div>
        <div className="ml-auto text-[5px] bg-white text-emerald-700 rounded px-1 py-0.5 font-bold">EDIT</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1 overflow-hidden">
        {/* Title */}
        <div className="bg-gray-100 rounded px-1.5 py-0.5 border border-emerald-300">
          <div className="text-[6px] text-gray-700">Clean the kitchen</div>
        </div>
        {/* Priority + Due */}
        <div className="grid grid-cols-2 gap-0.5">
          <div className="bg-red-50 rounded px-1 py-0.5 text-[5.5px] text-red-700 border border-red-200 font-medium">🔴 High</div>
          <div className="bg-gray-100 rounded px-1 py-0.5 text-[5.5px] text-gray-700 border border-gray-200">Today 6pm</div>
        </div>
        {/* Est. Time */}
        <div>
          <div className="text-[5px] text-gray-400 mb-0.5">EST. TIME TO FINISH</div>
          <div className="flex gap-0.5">
            {['15m','30m','1h','2h','3h+'].map((t,i)=>(
              <div key={t} className={`text-[4.5px] px-1 py-0.5 rounded-full border font-medium ${i===3?'bg-emerald-500 text-white border-emerald-500':'bg-gray-50 text-gray-400 border-gray-200'}`}>{t}</div>
            ))}
          </div>
        </div>
        {/* Assign — disabled by rotation */}
        <div className="border border-gray-200 rounded px-1 py-0.5 bg-gray-50 opacity-60">
          <div className="flex items-center justify-between">
            <div className="text-[5.5px] text-gray-400">👤 Assign to someone</div>
            <div className="w-5 h-2.5 bg-gray-200 rounded-full flex items-center pl-0.5"><div className="w-2 h-2 bg-white rounded-full border border-gray-300"/></div>
          </div>
          <div className="text-[4.5px] text-gray-400">Handled by rotation</div>
        </div>
        {/* Recurring ON with rotation */}
        <div className="border border-emerald-300 rounded p-1 bg-emerald-50 space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-[5.5px] font-semibold text-emerald-800">🔁 Recurring</div>
            <div className="w-5 h-2.5 bg-emerald-500 rounded-full flex items-center justify-end pr-0.5"><div className="w-2 h-2 bg-white rounded-full"/></div>
          </div>
          <div className="flex gap-0.5">
            {['Daily','Weekly','Monthly','Custom'].map((f,i)=>(
              <div key={f} className={`text-[4.5px] px-0.5 py-0.5 rounded ${i===1?'bg-emerald-500 text-white':'bg-white text-gray-400 border border-gray-200'}`}>{f}</div>
            ))}
          </div>
          <div className="border-t border-emerald-200 pt-1">
            <div className="flex items-center justify-between mb-0.5">
              <div className="text-[5.5px] font-semibold text-emerald-800">🔄 Rotate with family</div>
              <div className="w-5 h-2.5 bg-emerald-500 rounded-full flex items-center justify-end pr-0.5"><div className="w-2 h-2 bg-white rounded-full"/></div>
            </div>
            <div className="flex gap-0.5 mb-0.5">
              {[{l:'D',on:true},{l:'M',on:true},{l:'S',on:false}].map(m=>(
                <div key={m.l} className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[4.5px] font-bold text-white ${m.on?'bg-emerald-500':'bg-gray-300'}`}>{m.l}</div>
              ))}
            </div>
            <div className="bg-white rounded px-1 py-0.5 border border-emerald-200">
              <div className="text-[4.5px] text-emerald-700 font-semibold">Dad → Mom → Dad … (loops)</div>
            </div>
          </div>
        </div>
        {/* Save */}
        <div className="bg-emerald-600 text-white text-[6px] font-bold text-center rounded py-1">SAVE CHANGES</div>
      </div>
    </div>
  );
}

function TF9_TaskUpdated() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Task Updated ✓</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-emerald-50 rounded border-l-2 border-emerald-500 px-1.5 py-1">
          <div className="text-[6px] font-bold text-emerald-800">Clean the kitchen</div>
          <div className="text-[5px] text-gray-500">Weekly · Rotation active · Dad first</div>
        </div>
        {[
          'Recurring set to every week',
          'Rotation: Dad → Mom → Dad (loops)',
          'Dad notified — it is his turn first',
          'Calendar marked every week',
          'Task auto-reassigns on each completion',
        ].map(a=>(
          <div key={a} className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"/>
            <div className="text-[5px] text-gray-700">{a}</div>
          </div>
        ))}
        <div className="bg-blue-50 border border-blue-200 rounded p-1 mt-0.5">
          <div className="text-[5px] text-blue-700">📅 Synced to Calendar — appears every week</div>
        </div>
      </div>
    </div>
  );
}

// ── Task Flow 10: Estimate Learning (AI improves time estimates) ──
function TF10_FirstComplete() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-green-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">✓ Task Complete</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-emerald-50 rounded border-l-2 border-emerald-500 px-1.5 py-1">
          <div className="text-[5.5px] font-bold text-emerald-800">Clean the kitchen</div>
          <div className="text-[5px] text-gray-500">Est: 1h · Actual: +1h over → 2h total</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded p-1">
          <div className="text-[5px] font-semibold text-blue-800">📊 Iteration 1 of 3</div>
          <div className="text-[4.5px] text-blue-700 mt-0.5">Actual time logged. Need more data to improve estimate.</div>
          <div className="flex gap-0.5 mt-1">
            {[1,2,3].map(n=>(
              <div key={n} className={`flex-1 h-1 rounded-full ${n===1?'bg-blue-400':'bg-gray-200'}`}/>
            ))}
          </div>
        </div>
        <div className="text-[4.5px] text-gray-400 leading-tight">Actual time is saved privately. It will not affect current workload — only used to tune future estimates.</div>
      </div>
    </div>
  );
}

function TF10_PatternDetected() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-violet-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">✨ Pattern Detected</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-violet-50 border border-violet-200 rounded p-1">
          <div className="text-[5px] font-semibold text-violet-900">After 3 completions of "Clean the kitchen"</div>
          <div className="space-y-0.5 mt-1">
            {[
              {run:'Run 1', est:'1h', actual:'2h'},
              {run:'Run 2', est:'1h', actual:'1h 45m'},
              {run:'Run 3', est:'1h', actual:'1h 50m'},
            ].map(r=>(
              <div key={r.run} className="flex items-center gap-1 text-[4.5px] text-gray-600">
                <div className="w-6 text-violet-600 font-semibold">{r.run}</div>
                <div className="text-gray-400">Est {r.est}</div>
                <div className="text-emerald-600 font-semibold">→ Actual {r.actual}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-violet-100 border border-violet-300 rounded p-1">
          <div className="text-[5px] font-bold text-violet-900">AI detected: avg actual ≈ 1h 50m</div>
          <div className="text-[4.5px] text-violet-700 mt-0.5">Also applies to similar tasks in "Cleaning" category</div>
        </div>
      </div>
    </div>
  );
}

function TF10_ImprovedEstimate() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Add Task</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-gray-100 rounded px-1.5 py-1 border border-gray-200">
          <div className="text-[6px] text-gray-700">Mop the floors</div>
        </div>
        <div>
          <div className="text-[5px] text-gray-400 mb-0.5">EST. TIME TO FINISH</div>
          <div className="flex gap-0.5">
            {['15m','30m','1h','2h','3h+'].map((t,i)=>(
              <div key={t} className={`text-[4.5px] px-1 py-0.5 rounded-full border font-medium ${i===3?'bg-emerald-500 text-white border-emerald-500':'bg-gray-50 text-gray-400 border-gray-200'}`}>{t}</div>
            ))}
          </div>
        </div>
        <div className="bg-violet-50 border border-violet-200 rounded p-1">
          <div className="text-[5px] font-semibold text-violet-800">✨ AI Suggestion</div>
          <div className="text-[4.5px] text-violet-700 mt-0.5">Based on your cleaning tasks, "2h" is pre-selected — similar chores in this category usually take ~1h 50m.</div>
        </div>
        <div className="text-[4.5px] text-gray-400">You can still change the estimate manually.</div>
      </div>
    </div>
  );
}

// ── Task Flow 11: Workload Live Update ────────────────────────────
function TF11_WorkloadBefore() {
  const members = [
    {name:'Dad', hrs:'2.5h', tasks:3, pct:'w-2/5', color:'bg-emerald-400'},
    {name:'Mom', hrs:'4.0h', tasks:5, pct:'w-3/5', color:'bg-blue-400'},
    {name:'Sarah', hrs:'6.5h', tasks:7, pct:'w-full', color:'bg-red-400'},
  ];
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">My Tasks · Today</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-gray-50 border border-gray-200 rounded p-1 space-y-1">
          <div className="text-[5px] font-semibold text-gray-600 uppercase tracking-wide">Weekly Workload</div>
          {members.map(m=>(
            <div key={m.name} className="flex items-center gap-1">
              <div className="text-[5px] text-gray-600 w-7 shrink-0">{m.name}</div>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                <div className={`${m.pct} h-1.5 ${m.color} rounded-full transition-all`}/>
              </div>
              <div className="text-[4.5px] text-gray-500 shrink-0 w-8 text-right">{m.hrs} · {m.tasks}t</div>
            </div>
          ))}
        </div>
        <div className="text-[5px] text-gray-400 font-semibold uppercase">Today · 3 tasks</div>
        {[{title:'Take out trash',p:'bg-red-400',a:'Dad'},{title:'Buy groceries',p:'bg-amber-400',a:'Mom'}].map(t=>(
          <div key={t.title} className="bg-gray-50 rounded border border-gray-200 px-1 py-0.5 flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${t.p}`}/>
            <div className="flex-1 text-[5px] text-gray-700">{t.title}</div>
            <div className="text-[4px] text-gray-400">{t.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TF11_WorkloadAdded() {
  const members = [
    {name:'Dad', hrs:'3.5h', tasks:4, pct:'w-3/5', color:'bg-emerald-400', changed:true},
    {name:'Mom', hrs:'4.0h', tasks:5, pct:'w-3/5', color:'bg-blue-400', changed:false},
    {name:'Sarah', hrs:'6.5h', tasks:7, pct:'w-full', color:'bg-red-400', changed:false},
  ];
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">My Tasks · Today</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-blue-50 border border-blue-300 rounded p-1 space-y-1">
          <div className="text-[5px] font-semibold text-blue-700 uppercase tracking-wide">Workload Updated ↑</div>
          {members.map(m=>(
            <div key={m.name} className="flex items-center gap-1">
              <div className="text-[5px] text-gray-600 w-7 shrink-0">{m.name}</div>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                <div className={`${m.pct} h-1.5 ${m.color} rounded-full`}/>
              </div>
              <div className={`text-[4.5px] shrink-0 w-10 text-right font-medium ${m.changed?'text-blue-600':'text-gray-500'}`}>{m.hrs} · {m.tasks}t {m.changed?'↑':''}</div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded p-1">
          <div className="text-[5px] font-bold text-blue-800">New task added → Dad</div>
          <div className="text-[4.5px] text-blue-700">"Fix leaking tap" · 1h est. added to Dad's workload</div>
        </div>
      </div>
    </div>
  );
}

function TF11_WorkloadReduced() {
  const members = [
    {name:'Dad', hrs:'2.5h', tasks:3, pct:'w-2/5', color:'bg-emerald-400', changed:true},
    {name:'Mom', hrs:'4.0h', tasks:5, pct:'w-3/5', color:'bg-blue-400', changed:false},
    {name:'Sarah', hrs:'6.5h', tasks:7, pct:'w-full', color:'bg-red-400', changed:false},
  ];
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-green-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">✓ Task Complete</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-emerald-50 border border-emerald-300 rounded p-1 space-y-1">
          <div className="text-[5px] font-semibold text-emerald-700 uppercase tracking-wide">Workload Updated ↓</div>
          {members.map(m=>(
            <div key={m.name} className="flex items-center gap-1">
              <div className="text-[5px] text-gray-600 w-7 shrink-0">{m.name}</div>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                <div className={`${m.pct} h-1.5 ${m.color} rounded-full`}/>
              </div>
              <div className={`text-[4.5px] shrink-0 w-10 text-right font-medium ${m.changed?'text-emerald-600':'text-gray-500'}`}>{m.hrs} · {m.tasks}t {m.changed?'↓':''}</div>
            </div>
          ))}
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded p-1">
          <div className="text-[5px] font-bold text-emerald-800">Task completed → workload freed</div>
          <div className="text-[4.5px] text-emerald-700">"Fix leaking tap" done · 1h removed from Dad's total</div>
        </div>
        <div className="text-[4.5px] text-gray-400">Workload recalculates instantly on every completion.</div>
      </div>
    </div>
  );
}

// ── Task Flow 12: Assign with Workload View ───────────────────────
function TF12_AssignOpen() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5 flex items-center gap-1">
        <div className="text-white text-[7px]">←</div>
        <div className="text-[6px] text-white font-bold">Add Task</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-gray-100 rounded px-1.5 py-1 border border-gray-200">
          <div className="text-[6px] text-gray-700">Fix leaking tap</div>
        </div>
        <div className="grid grid-cols-2 gap-0.5">
          <div className="bg-red-50 rounded px-1 py-0.5 text-[5.5px] text-red-700 border border-red-200 font-medium">🔴 High</div>
          <div className="bg-gray-100 rounded px-1 py-0.5 text-[5.5px] text-gray-700 border border-gray-200">Today 6pm</div>
        </div>
        <div>
          <div className="text-[5px] text-gray-400 mb-0.5">EST. TIME TO FINISH</div>
          <div className="flex gap-0.5">
            {['15m','30m','1h','2h','3h+'].map((t,i)=>(
              <div key={t} className={`text-[4.5px] px-1 py-0.5 rounded-full border font-medium ${i===2?'bg-emerald-500 text-white border-emerald-500':'bg-gray-50 text-gray-400 border-gray-200'}`}>{t}</div>
            ))}
          </div>
        </div>
        <div className="border border-emerald-300 rounded p-1.5 bg-emerald-50 space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-[5.5px] font-semibold text-emerald-800">👤 Assign to someone</div>
            <div className="w-5 h-2.5 bg-emerald-500 rounded-full flex items-center justify-end pr-0.5"><div className="w-2 h-2 bg-white rounded-full"/></div>
          </div>
          <div className="flex items-center gap-0.5">
            {[{l:'D',name:'Dad',on:false},{l:'M',name:'Mom',on:false},{l:'S',name:'Sarah',on:false}].map(m=>(
              <div key={m.l} className="flex flex-col items-center gap-0.5">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[4.5px] font-bold text-white ${m.on?'bg-emerald-500 ring-1 ring-emerald-400':'bg-gray-300'}`}>{m.l}</div>
                <div className="text-[4px] text-gray-400">{m.name}</div>
              </div>
            ))}
            <div className="w-4 h-4 rounded-full bg-white border border-gray-300 flex items-center justify-center text-[5px] text-gray-400 ml-0.5">+</div>
            <div className="ml-auto flex items-center gap-0.5 bg-white border border-emerald-400 rounded px-1.5 py-0.5">
              <div className="text-[4.5px] text-emerald-700 font-bold">👁 Workload</div>
            </div>
          </div>
          <div className="text-[4px] text-emerald-600">Tap Workload to see hours before picking someone</div>
        </div>
      </div>
    </div>
  );
}

function TF12_WorkloadPanel() {
  const members = [
    {l:'D', name:'Dad',    hrs:'1.5h', tasks:2, pct:'w-1/4',  color:'bg-emerald-400', status:'Lowest',     badge:'bg-emerald-100 text-emerald-700'},
    {l:'M', name:'Mom',    hrs:'2.0h', tasks:3, pct:'w-2/5',  color:'bg-blue-400',    status:'Available',  badge:'bg-blue-50 text-blue-600'},
    {l:'S', name:'Sarah',  hrs:'3.5h', tasks:4, pct:'w-3/5',  color:'bg-red-400',     status:'Overloaded', badge:'bg-red-50 text-red-600'},
  ];
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-700 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">👁 Workload</div>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="text-[4px] bg-white text-emerald-700 font-bold rounded px-1 py-0.5">Today</div>
          <div className="text-[4px] bg-emerald-600 text-emerald-200 rounded px-1 py-0.5">This Week</div>
          <div className="text-[4px] text-emerald-300 ml-1">Due: Today → day view active</div>
        </div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        {members.map(m=>(
          <div key={m.name} className={`rounded border p-1 space-y-0.5 ${m.status==='Lowest'?'border-emerald-300 bg-emerald-50':m.status==='Overloaded'?'border-red-200 bg-red-50/30':'border-gray-200 bg-white'}`}>
            <div className="flex items-center gap-1">
              <div className={`w-4 h-4 rounded-full ${m.color} flex items-center justify-center text-[4.5px] text-white font-bold flex-shrink-0`}>{m.l}</div>
              <div className="flex-1">
                <div className="text-[5.5px] font-semibold text-gray-800">{m.name}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="flex-1 h-1 bg-gray-100 rounded-full">
                    <div className={`${m.pct} h-1 ${m.color} rounded-full`}/>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[5px] font-bold text-gray-700">{m.hrs}</div>
                <div className="text-[4px] text-gray-400">{m.tasks} tasks</div>
              </div>
              <div className={`text-[4px] px-1 py-0.5 rounded font-bold ${m.badge}`}>{m.status}</div>
            </div>
          </div>
        ))}
        <div className="text-[4.5px] text-gray-400 text-center mt-1">Showing today's load · switch to "This Week" for weekly view</div>
      </div>
    </div>
  );
}

function TF12_AssignConfirmed() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Task Assigned ✓</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-emerald-50 rounded border-l-2 border-emerald-500 px-1.5 py-1">
          <div className="text-[5.5px] font-bold text-emerald-800">Fix leaking tap</div>
          <div className="text-[5px] text-gray-500">Assigned → Dad · Est. 1h · Due today</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded p-1 space-y-0.5">
          <div className="text-[5px] font-semibold text-gray-600 uppercase tracking-wide">Updated Workload</div>
          {[
            {name:'Dad',  hrs:'3.5h', tasks:4, pct:'w-3/5',  color:'bg-emerald-400', changed:true},
            {name:'Mom',  hrs:'4.0h', tasks:5, pct:'w-3/5',  color:'bg-blue-400',    changed:false},
            {name:'Sarah',hrs:'6.5h', tasks:7, pct:'w-full', color:'bg-red-400',     changed:false},
          ].map(m=>(
            <div key={m.name} className="flex items-center gap-1">
              <div className="text-[5px] text-gray-600 w-7 shrink-0">{m.name}</div>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                <div className={`${m.pct} h-1.5 ${m.color} rounded-full`}/>
              </div>
              <div className={`text-[4.5px] shrink-0 w-10 text-right ${m.changed?'text-emerald-700 font-bold':'text-gray-400'}`}>{m.hrs} · {m.tasks}t {m.changed?'↑':''}</div>
            </div>
          ))}
        </div>
        {['Dad notified via push','1h added to Dad\'s weekly workload','Task visible in Dad\'s task list'].map(a=>(
          <div key={a} className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"/>
            <div className="text-[5px] text-gray-700">{a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Task Flow 8: Workload Balance & Fairness Alert ────────────────
function TF9_AssignTap() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5 flex items-center gap-1">
        <div className="text-white text-[7px]">←</div>
        <div className="text-[6px] text-white font-bold">Add Task</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-gray-100 rounded px-1.5 py-1 border border-gray-200">
          <div className="text-[6px] text-gray-700">Fix leaking tap</div>
        </div>
        <div className="text-[5px] text-gray-400 uppercase font-semibold">ASSIGN TO</div>
        <div className="flex gap-1">
          {[
            {name:'Dad',active:false,dot:'bg-gray-300'},
            {name:'Sarah',active:true,dot:'bg-red-400'},
            {name:'Mom',active:false,dot:'bg-gray-300'},
          ].map(m=>(
            <div key={m.name} className="flex flex-col items-center gap-0.5">
              <div className={`w-5 h-5 rounded-full ${m.dot} ${m.active?'ring-2 ring-red-400':''} flex items-center justify-center text-[5px] text-white font-bold`}>{m.name[0]}</div>
              <div className={`text-[4.5px] ${m.active?'text-red-600 font-bold':'text-gray-400'}`}>{m.name}</div>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded p-1">
          <div className="text-[5px] text-amber-700 font-semibold">⚡ Due today → checking Sarah's day workload...</div>
        </div>
      </div>
    </div>
  );
}

function TF9_WorkloadWarning() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-amber-500 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">⚠ Workload Alert</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="flex items-center gap-1 mb-0.5">
          <div className="text-[4px] bg-orange-100 text-orange-700 border border-orange-300 rounded px-1 py-0.5 font-bold">Due: Today</div>
          <div className="text-[4px] text-gray-400">→ using day workload</div>
        </div>
        <div className="bg-amber-50 border border-amber-300 rounded p-1">
          <div className="text-[5.5px] font-bold text-amber-800">Sarah already has 3.5h today</div>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
              <div className="w-full h-1.5 bg-red-400 rounded-full"/>
            </div>
            <div className="text-[4.5px] text-red-600 shrink-0">Overloaded</div>
          </div>
        </div>
        <div className="text-[5px] text-gray-500 font-semibold">✨ AI suggests instead:</div>
        {[
          {name:'Dad',hours:'1.5h today',dot:'bg-emerald-400',highlight:true},
          {name:'Mom',hours:'2.0h today',dot:'bg-blue-400',highlight:false},
        ].map(m=>(
          <div key={m.name} className={`flex items-center gap-1 rounded border px-1 py-0.5 ${m.highlight?'border-emerald-300 bg-emerald-50':'border-gray-200'}`}>
            <div className={`w-3.5 h-3.5 rounded-full ${m.dot} flex items-center justify-center text-[4.5px] text-white font-bold flex-shrink-0`}>{m.name[0]}</div>
            <div className="flex-1">
              <div className="text-[5.5px] font-semibold text-gray-800">{m.name}</div>
            </div>
            <div className={`text-[4.5px] px-1 py-0.5 rounded font-bold ${m.highlight?'bg-emerald-100 text-emerald-700':'bg-gray-100 text-gray-500'}`}>{m.hours}</div>
          </div>
        ))}
        <div className="text-[4px] text-gray-400">Day workload = est. hours of tasks due today</div>
      </div>
    </div>
  );
}

function TF9_BalancedResult() {
  return (
    <div style={{minHeight:240}} className="flex flex-col">
      <div className="bg-emerald-600 px-2 py-1.5">
        <div className="text-[6px] text-white font-bold">Balanced Assignment ✓</div>
      </div>
      <div className="flex-1 bg-white px-1.5 py-1 space-y-1">
        <div className="bg-emerald-50 rounded border-l-2 border-emerald-500 px-1.5 py-1">
          <div className="text-[6px] font-bold text-emerald-800">Fix leaking tap</div>
          <div className="text-[5px] text-gray-500">Assigned → Dad · Due tomorrow</div>
        </div>
        <div className="text-[5px] text-gray-500 font-semibold">Household Workload (hrs)</div>
        {[
          {name:'Dad',pct:'w-2/5',hours:'3.5h',color:'bg-emerald-400'},
          {name:'Mom',pct:'w-3/5',hours:'4.0h',color:'bg-blue-400'},
          {name:'Sarah',pct:'w-full',hours:'6.5h',color:'bg-red-400'},
        ].map(m=>(
          <div key={m.name} className="flex items-center gap-1">
            <div className="text-[5px] text-gray-600 w-6 shrink-0">{m.name}</div>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
              <div className={`${m.pct} h-1.5 ${m.color} rounded-full`}/>
            </div>
            <div className="text-[4.5px] text-gray-400 shrink-0">{m.hours}</div>
          </div>
        ))}
        {["Dad notified via push","Workload recalculated for all members","Sarah's load unchanged","Estimate logged for future tuning"].map(a=>(
          <div key={a} className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"/>
            <div className="text-[5px] text-gray-700">{a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TSK_FLOWS = [
  {
    id:'flow1', title:'Flow 1 — Task List → Detail → Complete',
    description:'User views their task list, opens a task for details, then marks it complete.',
    screens:[
      {component:TF1_TaskList, label:'Task List View', type:'user' as const, arrow:'Tap task'},
      {component:TF1_TaskDetail, label:'Task Detail Panel', type:'normal' as const, arrow:'Tap Complete'},
      {component:TF1_Completed, label:'Completion Screen', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow2', title:'Flow 2 — Conflict Detection on Assignment',
    description:'User tries to assign a task to a family member who has a calendar conflict or heavy workload. AI detects the clash and suggests a resolution.',
    screens:[
      {component:TF_CX1_AssignForm, label:'Assign Task Form', type:'user' as const, arrow:'Tap Assign'},
      {component:TF_CX2_ConflictAlert, label:'Conflict Detected', type:'warning' as const, arrow:'Pick suggestion'},
      {component:TF_CX3_Resolved, label:'Reassigned & Resolved', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow3', title:'Flow 3 — AI Voice Task Assignment',
    description:'User speaks to AI to create and assign a recurring chore.',
    screens:[
      {component:TF3_VoiceInput, label:'Voice Input Captured', type:'user' as const, arrow:'AI processes'},
      {component:TF3_AIParses, label:'Task Agent Parses', type:'system' as const, arrow:'Confirm'},
      {component:TF3_Confirmed, label:'Task Created + Rotation', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow4', title:'Flow 4 — Document → Auto-Task Creation',
    description:'User uploads a document and AI automatically creates a task with due date.',
    screens:[
      {component:TF4_DocUpload, label:'Document Uploaded', type:'user' as const, arrow:'AI extracts'},
      {component:TF4_AIExtract, label:'AI Extraction', type:'system' as const, arrow:'Auto-create'},
      {component:TF4_TaskCreated, label:'Task Auto-Created', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow5', title:'Flow 5 — Calendar ↔ Task Integration',
    description:'Task with a due date automatically syncs to the Calendar module — visible in month view as a badge and in day view alongside events.',
    screens:[
      {component:TF_CA1_TaskDue, label:'Task with Due Date', type:'user' as const, arrow:'Auto-syncs'},
      {component:TF_CA2_CalView, label:'Calendar Month View', type:'system' as const, arrow:'Tap date'},
      {component:TF_CA3_DayView, label:'Day View — Unified', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow6', title:'Flow 6 — Expense ↔ Task Integration',
    description:'A task tagged with a budget amount auto-logs an expense entry when marked complete, keeping the Expenses module in sync without manual entry.',
    screens:[
      {component:TF_EX1_TaskBudget, label:'Task with Budget Tag', type:'user' as const, arrow:'Mark complete'},
      {component:TF_EX2_MarkDone, label:'Completion + Log Prompt', type:'system' as const, arrow:'Log Expense'},
      {component:TF_EX3_ExpenseLogged, label:'Expense Auto-Logged', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow7', title:'Flow 7 — Overdue Task Escalation & Smart Reassignment',
    description:'An overdue task triggers an AI escalation alert. AI analyses workload across family members and recommends the best person to reassign to, with a new due date.',
    screens:[
      {component:TF7_OverdueNotif, label:'Overdue Alert', type:'warning' as const, arrow:'Tap to fix'},
      {component:TF7_AIReassign, label:'AI Reassign Options', type:'system' as const, arrow:'Pick Mom'},
      {component:TF7_Reassigned, label:'Reassigned & Resolved', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow8', title:'Flow 8 — Workload Balance & Smart Assignment',
    description:'User assigns a task to an overloaded member. The system auto-selects day workload (if due today) or weekly workload (if due later) and recommends the member with the lowest hours for that window.',
    screens:[
      {component:TF9_AssignTap, label:'Assign — Overloaded Member', type:'user' as const, arrow:'AI checks load'},
      {component:TF9_WorkloadWarning, label:'Workload Warning + AI Pick', type:'warning' as const, arrow:'Assign to Dad'},
      {component:TF9_BalancedResult, label:'Balanced Assignment', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow9', title:'Flow 9 — Edit Task · Add Rotation After Creation',
    description:'User taps an existing simple task to open it in full edit mode — same form as Add Task. They can turn on recurring, select family members for rotation, and save. The task is updated live without recreating it.',
    screens:[
      {component:TF9_SimpleTask, label:'Task List — Tap to Edit', type:'user' as const, arrow:'Tap task'},
      {component:TF9_EditForm, label:'Edit Task — Full Form', type:'system' as const, arrow:'Save Changes'},
      {component:TF9_TaskUpdated, label:'Task Updated with Rotation', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow10', title:'Flow 10 — AI Learns Task Time Estimates',
    description:'After a user records actual time taken on 3+ completions of similar tasks, the AI detects the pattern and pre-fills smarter estimates for new tasks in that category — no manual tuning needed.',
    screens:[
      {component:TF10_FirstComplete, label:'1st Completion — Time Logged', type:'success' as const, arrow:'2nd & 3rd runs'},
      {component:TF10_PatternDetected, label:'Pattern Detected (3 runs)', type:'system' as const, arrow:'Create similar task'},
      {component:TF10_ImprovedEstimate, label:'AI Pre-fills Smart Estimate', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow11', title:'Flow 11 — Workload Updates Live (Add & Complete)',
    description:'The household workload tracker updates in real time. Adding a task increases the assignee\'s workload hours; completing a task reduces them. Every member can see the current load at a glance.',
    screens:[
      {component:TF11_WorkloadBefore, label:'Workload Before — Baseline', type:'user' as const, arrow:'Add new task'},
      {component:TF11_WorkloadAdded, label:'Task Added — Load Increases', type:'warning' as const, arrow:'Complete task'},
      {component:TF11_WorkloadReduced, label:'Task Done — Load Decreases', type:'success' as const, arrow:null},
    ],
  },
  {
    id:'flow12', title:'Flow 12 — Assign with Workload View',
    description:'User creates a task and toggles "Assign to someone" ON — member avatars and a Workload button appear. Tapping Workload shows each member\'s hours for the relevant window (day if due today, week if due later) so the user can make an informed choice.',
    screens:[
      {component:TF12_AssignOpen, label:'Assign Toggle ON + Workload Btn', type:'user' as const, arrow:'Tap Workload'},
      {component:TF12_WorkloadPanel, label:'Workload Panel — All Members', type:'system' as const, arrow:'Tap Dad'},
      {component:TF12_AssignConfirmed, label:'Assigned + Load Updated', type:'success' as const, arrow:null},
    ],
  },
];

// ── Task: Feature Map ──────────────────────────────────────────────
function TaskFeatureMap() {
  const [expanded, setExpanded] = useState<string|null>(null);
  const features = [
    { id:'inbox', title:'Inbox & Quick Capture', icon:Inbox, color:'bg-blue-100 border-blue-300', subs:['Default "Inbox" for all new tasks','Quick add via FAB button','Voice capture (speech-to-task)','Multi-entry points (AI chat, dashboard, calendar)','"Dump everything here first, organize later" flow'] },
    { id:'assignment', title:'Task Assignment & Delegation', icon:UserCheck, color:'bg-purple-100 border-purple-300', subs:['Assign tasks to family members','Visual assignee indicator (avatar/name)','Clear ownership — who is responsible','Reassign with one tap','Role-based: parent can assign to child'] },
    { id:'priority', title:'Priority Levels & Visual Coding', icon:Flag, color:'bg-red-100 border-red-300', subs:['Low / Medium / High / Urgent — 4 priority levels','Color badges: Red (Urgent), Orange (High), Amber (Medium), Green (Low)','Sort and filter by priority','AI can suggest priority based on due date and context'] },
    { id:'due-dates', title:'Due Dates & Recurring Tasks', icon:CalendarClock, color:'bg-orange-100 border-orange-300', subs:['Due date with optional time','Recurring: daily / weekly / monthly / custom','Natural input ("every Monday", "on 15th monthly")','Tasks with due dates appear in Calendar day view','Overdue highlighting and alerts'] },
    { id:'today-upcoming', title:'Today & Upcoming Views', icon:LayoutList, color:'bg-emerald-100 border-emerald-300', subs:['Today dashboard: tasks due today','Upcoming list: future tasks grouped by due date','Overdue section: past-due tasks highlighted','Someday bucket: tasks with no due date'] },
    { id:'given-to-others', title:'"Given to Others" Visibility', icon:Eye, color:'bg-teal-100 border-teal-300', subs:['Separate view for tasks assigned to others','Shows completion status per assignee','Overdue items flagged for follow-up','Prevents "I thought you were doing it" situations','Accountability without micromanagement'] },
    { id:'rotation', title:'Automated Rotation & Fairness', icon:RotateCcw, color:'bg-yellow-100 border-yellow-300', subs:['Chore rotation between 2+ family members','Auto-assigns to next member on completion','Fairness history: "who did it how many times"','Solves one-person-always-does-everything problem','Custom rotation interval (weekly, bi-weekly)'] },
    { id:'templates', title:'Pre-built Task Templates', icon:FileText, color:'bg-pink-100 border-pink-300', subs:['Kitchen routine checklist','Weekly household reset template','Cleaning checklist','Import and customize templates','Save custom lists as reusable templates'] },
    { id:'voice', title:'Voice Task Delegation', icon:Mic, color:'bg-indigo-100 border-indigo-300', subs:['"Assign kitchen cleaning to Dad every Sunday"','Create tasks by speaking naturally','Mark tasks complete via voice','AI parses name, date, assignee, recurrence from speech','On-device voice processing (privacy-first)'] },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-emerald-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Feature Map — 9 Features</h2>
      </div>
      <div className="space-y-2">
        {features.map(f=>{
          const Icon=f.icon; const open=expanded===f.id;
          return (
            <div key={f.id} className={`rounded-lg border transition-colors ${open?'border-emerald-300 bg-emerald-50':'border-gray-200 bg-gray-50 hover:bg-emerald-50/40'}`}>
              <button onClick={()=>setExpanded(open?null:f.id)} className="w-full flex items-center justify-between p-3 text-left">
                <div className="flex items-center gap-2"><Icon className="w-4 h-4 text-emerald-500"/><span className="text-sm font-medium text-gray-800">{f.title}</span></div>
                <motion.div animate={{rotate:open?180:0}} transition={{duration:0.2}}><ChevronDown className="w-4 h-4 text-gray-400"/></motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open&&(
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25}} className="overflow-hidden">
                    <div className="px-3 pb-3">
                      <ul className="space-y-1">{f.subs.map((s,i)=><li key={i} className="flex items-start gap-1.5"><span className="text-emerald-400 text-xs mt-0.5">•</span><span className="text-xs text-gray-600">{s}</span></li>)}</ul>
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

// ── Task: Entry Points ─────────────────────────────────────────────
function TaskEntryPoints() {
  const points = [
    { id:'more-tab', label:'More → Tasks Module', icon:LayoutGrid, color:'bg-emerald-100 border-emerald-300', iconColor:'text-emerald-600', desc:'User taps the "More" tab in bottom navigation, then selects Tasks & Chores.', ctx:'Standard module entry. User is intentionally navigating to manage or review their task list.' },
    { id:'dashboard-card', label:'Dashboard AI Card', icon:BrainCircuit, color:'bg-blue-100 border-blue-300', iconColor:'text-blue-600', desc:'Passive AI surfaces a task card on the Home dashboard — "3 tasks due today, 1 overdue. Dad has 2 pending chores."', ctx:'Glanceable entry. User taps the card and lands directly on Today view or the overdue task.' },
    { id:'notification', label:'Notification Deep-Link', icon:Bell, color:'bg-yellow-100 border-yellow-300', iconColor:'text-yellow-600', desc:'Push notification fires when a task is due or overdue. User taps → opens directly to that task\'s detail screen.', ctx:'Action-triggered entry. User arrives at a specific task, not the full task list.' },
    { id:'ai-chat', label:'AI Chat / Voice', icon:MessageSquare, color:'bg-pink-100 border-pink-300', iconColor:'text-pink-600', desc:'"What tasks are due today?" or "Assign trash to Dad every Monday" via text or voice in AI tab.', ctx:'Conversational entry. AI uses A2UI to navigate, prefill task form, or show task list inline in chat.' },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-emerald-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Entry Points — 4 Ways to Arrive</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {points.map(p=>{
          const Icon=p.icon;
          return (
            <div key={p.id} className={`border-2 rounded-lg p-4 ${p.color}`}>
              <div className="flex items-center gap-2 mb-2"><Icon className={`w-4 h-4 ${p.iconColor}`}/><span className="text-xs font-semibold text-gray-900">{p.label}</span></div>
              <p className="text-xs text-gray-700 mb-2">{p.desc}</p>
              <div className="text-xs text-gray-500 bg-white/60 rounded p-2 border border-gray-200"><span className="font-medium">Context: </span>{p.ctx}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Task: AI Layer ─────────────────────────────────────────────────
function TaskAILayer() {
  const layers = [
    { id:'passive', label:'Layer 1 — Passive AI (Dashboard)', icon:LayoutDashboard, color:'bg-blue-50 border-blue-300', hColor:'bg-blue-600', desc:'AI surfaces task intelligence proactively on the Home dashboard without the user asking.', examples:['"3 tasks due today — 1 overdue (trash, assigned to Dad)"','"Kitchen cleaning hasn\'t been done in 2 weeks — workload alert"','"Dad has the highest task hours this week — consider reassigning"','"4 recurring chores reset this week across 3 members"'], trigger:'Runs automatically on dashboard load based on due dates, overdue items, hourly workload totals, and assignment data.' },
    { id:'interactive', label:'Layer 2 — Interactive AI (Chat / Voice)', icon:MessageSquare, color:'bg-pink-50 border-pink-300', hColor:'bg-pink-600', desc:'User directly asks the AI to perform task actions through the AI chat tab using text or voice.', examples:['"Assign kitchen cleaning to Dad every Sunday"','"What tasks are pending for Mom this week?"','"Mark the grocery task as done"','"Who hasn\'t done their chores this week?"','"Break down the house renovation task into steps"'], trigger:'Task Agent processes intent → uses A2UI to navigate, prefill task form, and confirm in app.' },
    { id:'inline', label:'Layer 3 — Inline AI (Inside Task Module)', icon:Zap, color:'bg-purple-50 border-purple-300', hColor:'bg-purple-600', desc:'AI assists the user while they are already inside the Task module — embedded intelligence.', examples:['Suggest best assignee based on workload when form is open','Auto-suggest due date from natural language ("this weekend")','Warn: "Mom already has 5 tasks due this week — consider reassigning"','AI "Break into subtasks" button on any task','Upload doc → AI extracts action and due date into task form'], trigger:'Triggered by task form open, assignment selection, document upload, or voice input with detected intent.' },
  ];
  const caps = ['Task creation from voice or natural language text','AI-powered assignment based on hourly workload (lowest total hrs wins)','Schedule queries ("What\'s pending for Sarah today?")','Recurring task setup with natural language intervals','A2UI: Navigate screens, prefill task form fields, highlight overdue','Document OCR extraction → task auto-creation with due date','Workload check and rotation suggestion across household'];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-emerald-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">AI Layer Model — Task Specialist Agent</h2>
      </div>
      <div className="space-y-3 mb-5">
        {layers.map(l=>{
          const Icon=l.icon;
          return (
            <div key={l.id} className={`border-2 rounded-lg overflow-hidden ${l.color}`}>
              <div className={`${l.hColor} text-white px-4 py-2 flex items-center gap-2`}><Icon className="w-4 h-4"/><span className="font-semibold text-sm">{l.label}</span></div>
              <div className="p-4">
                <p className="text-xs text-gray-700 mb-3">{l.desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Examples</p>
                    <ul className="space-y-1">{l.examples.map((e,i)=><li key={i} className="text-xs text-gray-700 flex items-start gap-1.5"><span className="text-gray-400 mt-0.5">→</span><span>{e}</span></li>)}</ul>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3 border border-gray-200 self-start">
                    <p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">When triggered</p>
                    <p className="text-xs text-gray-700">{l.trigger}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3"><Bot className="w-4 h-4 text-emerald-600"/><h3 className="font-semibold text-emerald-900 text-sm">Task Specialist Agent — Capabilities</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {caps.map((c,i)=><div key={i} className="text-xs text-emerald-800 flex items-start gap-1.5"><span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span><span>{c}</span></div>)}
        </div>
      </div>
    </div>
  );
}

// ── Task: Cross-Module Cascade ─────────────────────────────────────
function TaskCrossModule() {
  const cascades = [
    { icon:Calendar, module:'Calendar Module', color:'bg-blue-100 border-blue-300 text-blue-800', dot:'bg-blue-500', examples:['Task with due date → time-block event in Calendar day view','Completing linked task checks it off in both Tasks and Calendar','Calendar event creation can auto-generate prep tasks','Recurring task → recurring calendar marker on due dates'] },
    { icon:Bell, module:'Notifications', color:'bg-yellow-100 border-yellow-300 text-yellow-800', dot:'bg-yellow-500', examples:['Push notification sent to new assignee instantly','Due date reminder fires 1 day, 2 hrs, 30 min before','Overdue task escalation alert if not completed','Deep-link opens directly to task detail screen'] },
    { icon:Activity, module:'Family Feed', color:'bg-orange-100 border-orange-300 text-orange-800', dot:'bg-orange-500', examples:['"Dad assigned kitchen cleaning to Mom" in household feed','Task completed → completion event visible to all members','Overdue task flag visible in feed for awareness','Shared accountability across household without nagging'] },
    { icon:DollarSign, module:'Expenses Module', color:'bg-emerald-100 border-emerald-300 text-emerald-800', dot:'bg-emerald-500', examples:['Payment task (rent, insurance) → linked expense record','Task marked complete → expense auto-logged with date','Bill task with amount → Expenses entry pre-filled','Recurring payment task → recurring expense budget item'] },
    { icon:FolderOpen, module:'Document Vault', color:'bg-purple-100 border-purple-300 text-purple-800', dot:'bg-purple-500', examples:['Document attached to task stored in Document Vault','Insurance doc upload → "Pay premium" task auto-created','Task detail screen shows linked document inline','Bill/invoice → task with extracted due date + amount'] },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-emerald-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Cross-Module Cascade</h2>
      </div>
      <div className="flex justify-center mb-3">
        <div className="bg-emerald-600 text-white rounded-xl px-5 py-2.5 flex items-center gap-3 shadow-md">
          <CheckSquare className="w-5 h-5"/>
          <div><div className="font-bold text-sm">Task Saved</div><div className="text-xs text-emerald-200">User saves a new or edited task (with assignee, due date, and/or linked items)</div></div>
        </div>
      </div>
      <div className="flex justify-center mb-3"><ArrowDown className="w-4 h-4 text-gray-400"/></div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {cascades.map((c,i)=>{
          const Icon=c.icon;
          return (
            <motion.div key={c.module} initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:i*0.07}} className={`border-2 rounded-lg p-4 ${c.color}`}>
              <div className="flex items-center gap-2 mb-3"><Icon className="w-4 h-4"/><h3 className="font-semibold text-sm">{c.module}</h3></div>
              <ul className="space-y-1">{c.examples.map((e,j)=><li key={j} className="text-xs flex items-start gap-2"><span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`}/><span className="text-gray-700">{e}</span></li>)}</ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── Task: Module Connections ───────────────────────────────────────
function TaskModuleConns() {
  const conns = [
    { id:'calendar', title:'Calendar Module', icon:Calendar, color:'bg-blue-50 border-blue-200', items:['Tasks with due dates appear as time-block events in Calendar day view','Completing calendar-linked task checks it off in Tasks module','Calendar event creation can auto-generate prep tasks (e.g. "Pack bags" for travel)','Bi-directional: task due date ↔ calendar event date stay in sync'] },
    { id:'notifications', title:'Notifications', icon:Bell, color:'bg-yellow-50 border-yellow-200', items:['Due date reminders (30 min, 2 hrs, 1 day before)','Task assignment alert when task is delegated to you','Overdue task escalation notification','Deep-link directly to task detail screen'] },
    { id:'ai-assistant', title:'AI Assistant', icon:Sparkles, color:'bg-pink-50 border-pink-200', items:['AI-powered assignment based on hourly workload — picks member with lowest total hours','Voice parsing: "Assign trash to Dad every Monday"','A2UI: navigate to task screen, prefill form, highlight overdue','Task Agent: creation, delegation, completion, recurrence setup'] },
    { id:'documents', title:'Document Vault', icon:FolderOpen, color:'bg-purple-50 border-purple-200', items:['Upload bill/invoice → AI extracts due date → auto-creates payment task','Attach documents to tasks (receipts, forms, manuals)','Insurance doc → "Pay premium" task with deadline','Task detail screen shows linked document inline'] },
    { id:'family-feed', title:'Family Feed', icon:Activity, color:'bg-orange-50 border-orange-200', items:['Task assigned → "Dad assigned kitchen cleaning to Mom" in feed','Task completed → completion event in household activity stream','Overdue task → visibility alert in feed for awareness','Reduces "I didn\'t know it was my turn" friction'] },
    { id:'shared-lists', title:'Shared Lists', icon:ShoppingCart, color:'bg-teal-50 border-teal-200', items:['Task "Buy groceries" can spawn a linked shopping list','Template tasks come with pre-built linked lists','Home maintenance task → purchase checklist','Real-time list sync across family when task is active'] },
    { id:'expenses', title:'Expenses Module', icon:DollarSign, color:'bg-emerald-50 border-emerald-200', items:['Payment tasks (rent, insurance) linked to expense records','Task marked complete → auto-log related expense','Task with amount field triggers Expenses entry creation','Budget tracking for recurring payment tasks'] },
    { id:'voice-assistant', title:'Voice Assistant', icon:Mic, color:'bg-indigo-50 border-indigo-200', items:['"Add a task to clean the garage this weekend"','"Mark the trash task as done"','"Assign dishwashing to kids this week"','On-device voice processing for privacy','Supports hands-free task management while multitasking'] },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-emerald-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Module Connections & Integrations</h2>
      </div>
      <div className="space-y-3">
        {conns.map(c=>{
          const Icon=c.icon;
          return (
            <div key={c.id} className={`border-2 rounded-lg p-4 ${c.color}`}>
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2 flex-1"><Icon className="w-4 h-4 text-gray-700"/><h3 className="font-semibold text-gray-900 text-sm">{c.title}</h3></div>
                <ArrowRightLeft className="w-4 h-4 text-gray-400"/>
              </div>
              <ul className="mt-2 space-y-1">{c.items.map((it,j)=><li key={j} className="text-xs text-gray-700 flex items-start ml-6"><span className="text-gray-400 mr-2">→</span><span>{it}</span></li>)}</ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Task: System Processes ─────────────────────────────────────────
function TaskSysProcesses() {
  const procs = [
    { id:'recurrence', title:'Recurrence Engine', icon:RotateCcw, color:'bg-orange-50 border-orange-200', ops:['Processes recurring task rules on schedule','Auto-creates next task instance on completion','Supports daily / weekly / monthly / custom intervals','Natural language schedule parsing ("every Monday")'] },
    { id:'fairness', title:'Hourly Workload & Rotation Engine', icon:Scale, color:'bg-yellow-50 border-yellow-200', ops:['Tracks estimated hours per task set at creation','Calculates total active workload (hrs) per member for the week','Assigns new tasks to the member with the lowest total hours','Stores optional actual time on completion to improve future estimates'] },
    { id:'notifications', title:'Notification System', icon:Bell, color:'bg-amber-50 border-amber-200', ops:['Daily morning task summary for each family member','Due date reminders (1 day before and on due date)','Task assignment alerts to new assignee','Overdue task escalation notifications','Completion confirmation to task creator','Weekly family task summary (every Sunday)'] },
    { id:'sync', title:'Real-Time Sync System', icon:RefreshCw, color:'bg-blue-50 border-blue-200', ops:['WebSocket sync across all family devices','Task changes broadcast instantly to all members','Offline-first: local state preserved, syncs on reconnect','Conflict resolution for concurrent edits'] },
    { id:'permissions', title:'Permissions & Privacy', icon:Shield, color:'bg-green-50 border-green-200', ops:['Personal tasks (only creator sees)','Family tasks (shared with role-based visibility)','Parent/admin can assign to any member','Child accounts have restricted delegation rights'] },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-emerald-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">System Processes & Background Behavior</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {procs.map((p,i)=>{
          const Icon=p.icon;
          return (
            <motion.div key={p.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}} className={`border-2 rounded-lg p-4 ${p.color}`}>
              <div className="flex items-center gap-2 mb-3"><Icon className="w-4 h-4 text-gray-700"/><h3 className="font-semibold text-gray-900 text-sm">{p.title}</h3></div>
              <ul className="space-y-1">{p.ops.map((op,j)=><li key={j} className="text-xs text-gray-700 flex items-start"><span className="text-gray-400 mr-2">•</span><span>{op}</span></li>)}</ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── Task: Screen Zones ─────────────────────────────────────────────
function TaskScreenZones() {
  const zones = [
    { id:'header', title:'Zone 1 — Header', icon:SlidersHorizontal, color:'bg-emerald-100 border-emerald-300', items:['Personal / Family toggle (segmented control)','Horizontal member avatar strip (filter by member)','View switcher: All / Today / Upcoming / Given to Others','Sort & Filter icon (priority, due date, assignee)'] },
    { id:'task-list', title:'Zone 2 — Task List', icon:LayoutList, color:'bg-blue-100 border-blue-300', items:['Task cards: checkbox, title, priority badge, due date','Status indicator: Not Started / In Progress / Completed','Assignee avatar on each task','Overdue tasks highlighted in red','Section grouping: Today / Upcoming / Someday'] },
    { id:'task-detail', title:'Zone 3 — Task Detail Panel', icon:CheckSquare, color:'bg-purple-100 border-purple-300', items:['Opens on task tap (bottom sheet / slide-in)','Shows notes, attachments, linked items','Edit, reassign, reschedule, duplicate, delete'] },
    { id:'fab', title:'Zone 4 — FAB (+)', icon:PlusCircle, color:'bg-orange-100 border-orange-300', items:['Bottom-right floating action button','Quick Add Task (inline form)','Voice Capture (speech-to-task)','Select from Template'] },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-emerald-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">UI Screen Zones — 4 Zones</h2>
      </div>
      <div className="space-y-3">
        {zones.map(z=>{
          const Icon=z.icon;
          return (
            <div key={z.id} className={`border-2 rounded-lg p-4 ${z.color}`}>
              <div className="flex items-center gap-2 mb-2"><Icon className="w-4 h-4"/><h4 className="font-semibold text-gray-900 text-sm">{z.title}</h4></div>
              <ul className="space-y-1">{z.items.map((it,i)=><li key={i} className="text-xs text-gray-700 flex items-start"><span className="text-gray-400 mr-2">•</span><span>{it}</span></li>)}</ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Task: 4-Flow Screen Diagram ────────────────────────────────────
function TaskScreenFlows() {
  const [active, setActive] = useState('flow1');
  const current = TSK_FLOWS.find(f=>f.id===active)!;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-emerald-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">9 Interactive Screen Flows</h2>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {TSK_FLOWS.map(f=>(
          <button key={f.id} onClick={()=>setActive(f.id)}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-all ${active===f.id?'bg-emerald-600 text-white border-emerald-600':'bg-white text-gray-600 border-gray-300 hover:border-emerald-400 hover:text-emerald-600'}`}>
            {f.title.split(' — ')[0]}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mb-4 text-xs">
        {[['bg-emerald-500','User Action'],['bg-purple-500','System Process'],['bg-green-500','Result / Output']].map(([c,l])=>(
          <div key={l} className="flex items-center gap-1.5"><div className={`w-3 h-3 rounded-full ${c}`}/><span className="text-gray-600">{l}</span></div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <h3 className="font-bold text-emerald-900 text-sm">{current.title}</h3>
            <p className="text-xs text-emerald-700 mt-0.5">{current.description}</p>
          </div>

          {active === 'flow8' && (
            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"/>
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">How Hourly Workload Assignment Works</p>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Task assignment uses an <strong>hourly workload model</strong>. Each task carries an estimated time set at creation. The comparison window — <strong>day or week</strong> — is chosen automatically based on the task's due date.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-orange-50 border border-orange-200 rounded-md px-3 py-2">
                  <p className="text-xs font-bold text-orange-800 mb-1">📅 Due today</p>
                  <p className="text-xs text-orange-700 leading-relaxed">→ Compare each member's <strong>day workload</strong> (hours of tasks due today only)</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-md px-3 py-2">
                  <p className="text-xs font-bold text-blue-800 mb-1">📆 Due later this week</p>
                  <p className="text-xs text-blue-700 leading-relaxed">→ Compare each member's <strong>weekly workload</strong> (all active tasks this week)</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <p className="text-xs font-semibold text-amber-900 mb-1">Example — Due: Today (day workload used)</p>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-amber-100">
                      <th className="text-left px-2 py-1 text-amber-800 font-semibold border border-amber-200">Member</th>
                      <th className="text-center px-2 py-1 text-amber-800 font-semibold border border-amber-200">Tasks Today</th>
                      <th className="text-center px-2 py-1 text-amber-800 font-semibold border border-amber-200">Hours Today</th>
                      <th className="text-center px-2 py-1 text-amber-800 font-semibold border border-amber-200">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {name:'Dad', tasks:2, hours:'1.5h', status:'Lowest — Best pick', highlight:true},
                      {name:'Mom', tasks:3, hours:'2.0h', status:'Available', highlight:false},
                      {name:'Sarah', tasks:4, hours:'3.5h', status:'Overloaded', highlight:false},
                    ].map(r=>(
                      <tr key={r.name} className={r.highlight ? 'bg-emerald-50' : 'bg-white'}>
                        <td className={`px-2 py-1 border border-amber-200 font-medium ${r.highlight?'text-emerald-700':'text-gray-700'}`}>{r.name}</td>
                        <td className="px-2 py-1 border border-amber-200 text-center text-gray-600">{r.tasks}</td>
                        <td className={`px-2 py-1 border border-amber-200 text-center font-bold ${r.highlight?'text-emerald-700':r.hours==='3.5h'?'text-red-500':'text-gray-700'}`}>{r.hours}</td>
                        <td className={`px-2 py-1 border border-amber-200 text-center text-xs ${r.highlight?'text-emerald-700':r.hours==='3.5h'?'text-red-500':'text-gray-500'}`}>{r.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-white border border-amber-200 rounded-md px-3 py-2 space-y-1.5">
                <p className="text-xs font-semibold text-amber-900 mb-1">How the system stays flexible over time:</p>
                <ul className="space-y-1">
                  <li className="text-xs text-amber-800 flex items-start gap-1.5"><span className="text-amber-500 mt-0.5 flex-shrink-0">→</span><span><strong>Estimated time</strong> is the primary factor used for workload calculation — set when the task is created.</span></li>
                  <li className="text-xs text-amber-800 flex items-start gap-1.5"><span className="text-amber-500 mt-0.5 flex-shrink-0">→</span><span>When a task is completed, users can <strong>optionally provide the actual time taken</strong>.</span></li>
                  <li className="text-xs text-amber-800 flex items-start gap-1.5"><span className="text-amber-500 mt-0.5 flex-shrink-0">→</span><span>Actual time data is used <strong>only to improve future estimates</strong> — it does not modify current workload figures.</span></li>
                </ul>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">
                <p className="text-xs text-emerald-800 leading-relaxed"><strong>Why this approach:</strong> Hourly workload is intuitive and transparent — members can see exactly why someone was picked. It avoids the friction of a calculated score that users can't easily interpret, while still allowing the system to improve its estimates organically over time.</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-start justify-center gap-2 overflow-x-auto pb-2">
            {current.screens.map((s,i)=>(
              <div key={i} className="flex items-center gap-2">
                <TskPhone label={s.label} type={s.type}><s.component/></TskPhone>
                {s.arrow&&<TskArrow label={s.arrow}/>}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Vault: Main Screen ────────────────────────────────────────────
function VaultMainScreen() {
  return (
    <div className="h-full flex flex-col" style={{ minHeight: 290 }}>
      <div className="bg-indigo-600 text-white px-2 pt-2 pb-1.5">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[6px] font-bold">Document Vault</span>
          <span className="text-[5px] bg-orange-400 px-1 rounded">⚠ 2 Expiring</span>
        </div>
        <div className="flex gap-1 mb-1">
          <span className="bg-white text-indigo-700 px-1.5 py-0.5 rounded text-[5px] font-semibold">Personal</span>
          <span className="text-white/70 px-1.5 py-0.5 rounded text-[5px]">Family</span>
        </div>
        <div className="bg-indigo-700 rounded px-1.5 py-0.5 flex items-center gap-1">
          <span className="text-[5px]">🔍</span>
          <span className="text-[4px] text-indigo-300">Search documents...</span>
        </div>
      </div>
      <div className="flex gap-1 px-1.5 py-1 overflow-hidden border-b border-gray-100">
        {['All','Insurance','IDs','Bills'].map((c,i)=>(
          <span key={c} className={`text-[4px] px-1 py-0.5 rounded flex-shrink-0 ${i===0?'bg-indigo-500 text-white':'bg-gray-100 text-gray-600'}`}>{c}</span>
        ))}
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-1 overflow-hidden">
        {[
          { emoji:'🏥', name:'Car Insurance', cat:'Insurance', expiry:'Expires Apr 15', warn:true },
          { emoji:'🪪', name:'Passport - Dad', cat:'IDs', expiry:'Valid till 2029', warn:false },
          { emoji:'⚡', name:'Electricity Bill', cat:'Bills', expiry:'Mar 2026', warn:false },
          { emoji:'🏦', name:'Bank Statement', cat:'Bank', expiry:'Feb 2026', warn:false },
        ].map((doc,i)=>(
          <div key={i} className="bg-gray-50 border border-gray-200 rounded p-1 flex items-center gap-1">
            <span className="text-[9px]">{doc.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[5px] font-medium text-gray-800 truncate">{doc.name}</div>
              <div className="text-[4px] text-gray-400">{doc.cat}</div>
            </div>
            {doc.warn
              ? <span className="text-[4px] bg-orange-100 text-orange-600 px-0.5 rounded flex-shrink-0">⚠</span>
              : <span className="text-[4px] text-gray-400 flex-shrink-0">{doc.expiry}</span>}
          </div>
        ))}
      </div>
      <div className="pb-2 flex justify-end px-2">
        <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-[9px] font-bold">+</span>
        </div>
      </div>
    </div>
  );
}

// ── Vault: Upload Options Screen ──────────────────────────────────
function UploadOptionsScreen() {
  return (
    <div className="flex flex-col" style={{ minHeight: 290 }}>
      <div className="bg-indigo-600 text-white px-2 pt-2 pb-1.5">
        <div className="text-[7px] font-bold">Add Document</div>
      </div>
      <div className="flex-1 px-2 py-1.5 space-y-1.5">
        <div className="border-2 border-dashed border-indigo-300 rounded-lg p-2 text-center bg-indigo-50">
          <div className="text-[10px] mb-0.5">📄</div>
          <div className="text-[5px] font-semibold text-indigo-700">Upload PDF / Image</div>
          <div className="text-[4px] text-indigo-500">From device storage</div>
        </div>
        <div className="border border-violet-200 rounded-lg p-2 bg-violet-50">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px]">📷</span>
            <div>
              <div className="text-[5px] font-semibold text-violet-700">Camera Scan (AI OCR)</div>
              <div className="text-[4px] text-violet-500">Receipt · Invitation · Insurance</div>
            </div>
          </div>
        </div>
        <div className="border border-purple-200 rounded-lg p-1.5 bg-purple-50">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px]">🖼</span>
            <div className="text-[5px] font-semibold text-purple-700">Gallery / Files</div>
          </div>
        </div>
        <div className="border border-gray-200 rounded px-1.5 py-1 bg-gray-50">
          <div className="text-[4px] text-gray-400">Category</div>
          <div className="text-[5px] text-gray-700">Insurance ▾</div>
        </div>
        <div className="border border-indigo-200 rounded px-1.5 py-1 bg-indigo-50">
          <div className="text-[4px] text-gray-400">Access: Family</div>
          <div className="flex gap-1 mt-0.5">
            {['View','Edit','Download'].map(p=>(
              <span key={p} className="text-[4px] bg-white border border-indigo-200 rounded px-0.5 py-0.5">{p}</span>
            ))}
          </div>
        </div>
        <div className="w-full bg-indigo-500 text-white text-center py-1 rounded-lg">
          <span className="text-[6px] font-semibold">Upload Document</span>
        </div>
      </div>
    </div>
  );
}

// ── Vault: Document Detail Screen ────────────────────────────────
function DocumentDetailScreen() {
  return (
    <div className="flex flex-col" style={{ minHeight: 290 }}>
      <div className="bg-indigo-600 text-white px-2 pt-2 pb-1.5 flex items-center gap-1">
        <span className="text-[8px]">←</span>
        <span className="text-[7px] font-bold">Car Insurance</span>
      </div>
      <div className="flex-1 px-2 py-1.5 space-y-1 overflow-hidden">
        <div className="bg-gray-100 rounded-lg h-10 flex items-center justify-center border border-dashed border-gray-300">
          <div className="text-center">
            <div className="text-[9px]">📄</div>
            <div className="text-[4px] text-gray-500">Car_Insurance_2026.pdf</div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded px-1 py-0.5">
          <span className="text-[5px]">⚠️</span>
          <span className="text-[4px] text-orange-700 font-medium">Expires Apr 15 · 28 days</span>
        </div>
        <div className="text-[4px] text-gray-400 font-semibold">AI EXTRACTED</div>
        {[['Due Date','April 15, 2026'],['Amount','₹12,000'],['Category','Insurance']].map(([l,v])=>(
          <div key={l} className="border border-indigo-200 rounded px-1 py-0.5 bg-indigo-50">
            <div className="text-[4px] text-gray-400">{l}</div>
            <div className="text-[5px] font-medium text-gray-700">{v}</div>
          </div>
        ))}
        <div className="text-[4px] text-gray-400 font-semibold mt-0.5">LINKED TO</div>
        <div className="bg-blue-50 border border-blue-200 rounded px-1 py-0.5 text-[4px] text-blue-700">📅 Calendar: Pay Insurance Apr 15</div>
        <div className="bg-emerald-50 border border-emerald-200 rounded px-1 py-0.5 text-[4px] text-emerald-700">✓ Task: Pay Insurance Premium</div>
        <div className="flex gap-1">
          <div className="flex-1 bg-indigo-500 text-white text-center py-0.5 rounded text-[5px] font-semibold">View</div>
          <div className="flex-1 border border-gray-200 text-center py-0.5 rounded text-[5px] text-gray-600">Share</div>
        </div>
      </div>
    </div>
  );
}

// ── Vault: Small Phone + Arrow (for flows) ────────────────────────
function DocPhone({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0">
      <div className="relative bg-gray-900 rounded-[2rem] border-[3px] border-indigo-600 shadow-xl overflow-hidden w-32" style={{ height: 260 }}>
        <div className="bg-gray-800 flex justify-between items-center px-2 py-1">
          <span className="text-[6px] text-gray-400">9:41</span>
          <div className="w-7 h-1.5 bg-gray-600 rounded-full"/>
          <span className="text-[6px] text-gray-400">●●</span>
        </div>
        <div className="bg-white overflow-hidden" style={{ height: 'calc(100% - 28px)' }}>{children}</div>
      </div>
      <p className="text-[10px] font-bold text-center text-indigo-700 max-w-[128px] leading-tight">{label}</p>
    </div>
  );
}

function DocArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 px-1 shrink-0 self-center mb-5">
      {label&&<span className="text-[9px] text-gray-500 text-center max-w-[64px] leading-tight">{label}</span>}
      <span className="text-indigo-300 text-xl font-thin">→</span>
    </div>
  );
}

// ── Vault Flow Screens ─────────────────────────────────────────────
function DVF1_Upload() {
  return (
    <div className="flex flex-col" style={{ minHeight: 220 }}>
      <div className="bg-indigo-600 text-white px-2 pt-2 pb-1.5">
        <div className="text-[6px] font-bold">Add Document</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-1">
        <div className="border-2 border-dashed border-indigo-300 rounded bg-indigo-50 p-1 text-center">
          <div className="text-[9px]">📄</div>
          <div className="text-[4px] text-indigo-600">Car_Insurance.pdf</div>
        </div>
        <div className="border border-gray-200 rounded px-1 py-0.5"><div className="text-[4px] text-gray-400">Category</div><div className="text-[4px]">🏥 Insurance</div></div>
        <div className="border border-indigo-200 rounded px-1 py-0.5 bg-indigo-50"><div className="text-[4px] text-gray-400">Access: Family View</div></div>
      </div>
      <div className="px-1.5 pb-2">
        <div className="bg-indigo-500 text-white text-center py-0.5 rounded text-[5px] font-semibold">Upload</div>
      </div>
    </div>
  );
}

function DVF1_Processing() {
  return (
    <div className="flex flex-col" style={{ minHeight: 220 }}>
      <div className="bg-indigo-600 text-white px-2 pt-2 pb-1.5">
        <div className="text-[6px] font-bold">Processing...</div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1 px-2">
        <div className="text-[12px]">🤖</div>
        <div className="text-[4px] text-gray-500 text-center">Extracting due date + amount</div>
        <div className="space-y-0.5 w-full">
          {['✓  Due date: Apr 15','✓  Amount: ₹12,000','⚡ Creating calendar event...','⚡ Creating reminder task...'].map((s,i)=>(
            <div key={i} className={`text-[4px] ${s.startsWith('⚡')?'text-indigo-600':'text-gray-600'}`}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DVF1_AutoCreated() {
  return (
    <div className="flex flex-col" style={{ minHeight: 220 }}>
      <div className="bg-indigo-600 text-white px-2 pt-2 pb-1.5">
        <div className="text-[6px] font-bold">Done ✓</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-1">
        <div className="text-[4px] text-gray-400 font-semibold">AUTO-CREATED</div>
        <div className="bg-blue-50 border border-blue-200 rounded px-1 py-0.5">
          <div className="text-[4px] text-blue-700 font-medium">📅 Calendar Event</div>
          <div className="text-[4px] text-blue-600">Pay Insurance ₹12,000 on Apr 15</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded px-1 py-0.5">
          <div className="text-[4px] text-emerald-700 font-medium">✓ Reminder Task</div>
          <div className="text-[4px] text-emerald-600">Pay Insurance · 1 month prior</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded px-1 py-0.5">
          <div className="text-[4px] text-purple-700">📣 Family Feed updated</div>
        </div>
      </div>
    </div>
  );
}

function DVF2_CameraScan() {
  return (
    <div className="flex flex-col" style={{ minHeight: 220 }}>
      <div className="bg-gray-900 text-white px-2 pt-2 pb-1 flex-1 flex flex-col">
        <div className="text-[6px] font-bold mb-1">📷 Scan</div>
        <div className="flex-1 bg-gray-800 rounded flex items-center justify-center">
          <div className="border-2 border-dashed border-indigo-400 w-16 h-14 rounded flex items-center justify-center">
            <span className="text-[12px]">🧾</span>
          </div>
        </div>
        <div className="text-[4px] text-gray-400 text-center mt-1">Align receipt in frame</div>
      </div>
    </div>
  );
}

function DVF2_OCRExtracted() {
  return (
    <div className="flex flex-col" style={{ minHeight: 220 }}>
      <div className="bg-indigo-600 text-white px-2 pt-2 pb-1.5">
        <div className="text-[6px] font-bold">Receipt Scanned</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-1">
        <div className="bg-emerald-50 border border-emerald-200 rounded px-1 py-0.5 text-[4px] text-emerald-700">✓ OCR complete</div>
        {[['Merchant','Big Bazaar'],['Total','₹2,340'],['Date','18 Mar 2026']].map(([l,v])=>(
          <div key={l} className="border border-indigo-200 bg-indigo-50 rounded px-1 py-0.5">
            <div className="text-[4px] text-gray-400">{l}</div>
            <div className="text-[5px] font-medium text-gray-800">{v}</div>
          </div>
        ))}
        <div className="text-[4px] text-gray-400">Expense will be auto-created</div>
      </div>
      <div className="px-1.5 pb-2">
        <div className="bg-indigo-500 text-white text-center py-0.5 rounded text-[5px] font-semibold">Confirm &amp; Save</div>
      </div>
    </div>
  );
}

function DVF2_ExpenseCreated() {
  return (
    <div className="flex flex-col" style={{ minHeight: 220 }}>
      <div className="bg-indigo-600 text-white px-2 pt-2 pb-1.5">
        <div className="text-[6px] font-bold">Saved ✓</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-1">
        <div className="bg-violet-50 border border-violet-200 rounded px-1 py-0.5">
          <div className="text-[4px] text-violet-700 font-medium">📁 Document Vault</div>
          <div className="text-[4px] text-violet-600">Receipt image stored</div>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded px-1 py-0.5">
          <div className="text-[4px] text-rose-700 font-medium">💳 Expense Created</div>
          <div className="text-[4px] text-rose-600">Big Bazaar ₹2,340 → Food</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded px-1 py-0.5 text-[4px] text-purple-700">📣 Family Feed updated</div>
      </div>
    </div>
  );
}

function DVF3_ScanInvite() {
  return (
    <div className="flex flex-col" style={{ minHeight: 220 }}>
      <div className="bg-gray-900 text-white px-2 pt-2 pb-1 flex-1 flex flex-col">
        <div className="text-[6px] font-bold mb-1">📷 Scan Image (AI)</div>
        <div className="flex-1 bg-gray-700 rounded flex items-center justify-center">
          <div className="border-2 border-dashed border-indigo-400 w-16 h-14 rounded flex items-center justify-center">
            <span className="text-[12px]">💌</span>
          </div>
        </div>
        <div className="text-[4px] text-gray-400 text-center mt-1">Invitation / Brochure</div>
      </div>
    </div>
  );
}

function DVF3_AIExtracted() {
  return (
    <div className="flex flex-col" style={{ minHeight: 220 }}>
      <div className="bg-indigo-600 text-white px-2 pt-2 pb-1.5">
        <div className="text-[6px] font-bold">Event Detected</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-1">
        <div className="bg-blue-50 border border-blue-200 rounded px-1 py-0.5 text-[4px] text-blue-700 font-medium">📅 Gemini AI extracted:</div>
        {[["Event","Riya's Wedding"],['Date','April 20, 2026'],['Time','7:00 PM'],['Venue','Taj Banquet']].map(([l,v])=>(
          <div key={l} className="flex justify-between border-b border-gray-100 py-0.5">
            <span className="text-[4px] text-gray-400">{l}</span>
            <span className="text-[4px] font-medium text-gray-700 truncate max-w-[55px]">{v}</span>
          </div>
        ))}
      </div>
      <div className="px-1.5 pb-2 flex gap-1">
        <div className="flex-1 border border-gray-200 text-center py-0.5 rounded text-[4px] text-gray-600">Edit</div>
        <div className="flex-1 bg-indigo-500 text-white text-center py-0.5 rounded text-[4px] font-semibold">Create Event</div>
      </div>
    </div>
  );
}

function DVF3_CalEventCreated() {
  return (
    <div className="flex flex-col" style={{ minHeight: 220 }}>
      <div className="bg-indigo-600 text-white px-2 pt-2 pb-1.5">
        <div className="text-[6px] font-bold">Event Created ✓</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-1">
        <div className="bg-blue-50 border border-blue-200 rounded px-1 py-0.5">
          <div className="text-[4px] text-blue-700 font-medium">📅 Calendar</div>
          <div className="text-[4px] text-blue-600">Riya's Wedding · Apr 20 7PM</div>
          <div className="text-[4px] text-blue-500">Taj Banquet, Mumbai</div>
        </div>
        <div className="bg-violet-50 border border-violet-200 rounded px-1 py-0.5">
          <div className="text-[4px] text-violet-700">📁 Invitation stored in Vault</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded px-1 py-0.5 text-[4px] text-purple-700">📣 Family notified</div>
      </div>
    </div>
  );
}

function DVF4_VoiceQuestion() {
  return (
    <div className="flex flex-col" style={{ minHeight: 220 }}>
      <div className="bg-indigo-600 text-white px-2 pt-2 pb-1.5">
        <div className="text-[6px] font-bold">AI Assistant</div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-2">
        <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center border-2 border-indigo-300">
          <span className="text-[14px]">🎙️</span>
        </div>
        <div className="text-[4px] text-gray-500">Listening...</div>
        <div className="bg-gray-100 rounded px-1.5 py-0.5 text-center">
          <div className="text-[4px] text-gray-600 italic">"When does my insurance expire?"</div>
        </div>
      </div>
    </div>
  );
}

function DVF4_AIAnswer() {
  return (
    <div className="flex flex-col" style={{ minHeight: 220 }}>
      <div className="bg-indigo-600 text-white px-2 pt-2 pb-1.5">
        <div className="text-[6px] font-bold">AI Assistant</div>
      </div>
      <div className="flex-1 px-1.5 py-1.5 space-y-1">
        <div className="bg-gray-100 rounded px-1.5 py-0.5 text-right">
          <div className="text-[4px] text-gray-600 italic">"When does my insurance expire?"</div>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded px-1.5 py-0.5">
          <div className="text-[4px] text-indigo-800">"Your Car Insurance expires April 15 — in 28 days. Premium: ₹12,000."</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded px-1 py-0.5 flex gap-1">
          <div className="text-[4px] text-gray-600 flex-1">Want me to show the document?</div>
          <span className="text-[4px] text-indigo-500 underline">Open</span>
        </div>
      </div>
    </div>
  );
}

function DVF4_DocOpened() {
  return (
    <div className="flex flex-col" style={{ minHeight: 220 }}>
      <div className="bg-indigo-600 text-white px-2 pt-2 pb-1.5">
        <div className="text-[6px] font-bold">Car Insurance</div>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-1">
        <div className="bg-gray-100 rounded h-8 flex items-center justify-center">
          <span className="text-[9px]">📄</span>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded px-1 py-0.5 text-[4px] text-orange-700">⚠️ Expires Apr 15 · 28 days</div>
        {[['Due Date','Apr 15, 2026'],['Amount','₹12,000']].map(([l,v])=>(
          <div key={l} className="border border-indigo-200 bg-indigo-50 rounded px-1 py-0.5">
            <div className="text-[4px] text-gray-400">{l}</div>
            <div className="text-[4px] font-medium text-gray-800">{v}</div>
          </div>
        ))}
        <div className="text-[4px] text-indigo-500 underline">→ Calendar Event · Task</div>
      </div>
    </div>
  );
}

const DOC_FLOWS = [
  {
    id:'flow1', title:'Flow 1 — Insurance Doc → Auto Calendar + Task',
    description:'User uploads insurance document; AI extracts due date and amount, then auto-creates a calendar event and reminder task.',
    screens:[
      {component:DVF1_Upload, label:'Upload Insurance Doc', arrow:'AI extracts'},
      {component:DVF1_Processing, label:'OCR Processing', arrow:'Created'},
      {component:DVF1_AutoCreated, label:'Auto-Created Items', arrow:null},
    ],
  },
  {
    id:'flow2', title:'Flow 2 — Receipt Scan → Auto Expense',
    description:'User scans a receipt; Google Vision API extracts merchant, total, and date, then auto-creates an expense record.',
    screens:[
      {component:DVF2_CameraScan, label:'Camera Scan', arrow:'OCR extract'},
      {component:DVF2_OCRExtracted, label:'OCR Extracted', arrow:'Saved'},
      {component:DVF2_ExpenseCreated, label:'Expense Auto-Created', arrow:null},
    ],
  },
  {
    id:'flow3', title:'Flow 3 — Invitation Scan → Auto Calendar Event',
    description:'User photographs a physical invitation; Gemini AI extracts event details and auto-creates a calendar event.',
    screens:[
      {component:DVF3_ScanInvite, label:'Scan Invitation', arrow:'AI parse'},
      {component:DVF3_AIExtracted, label:'AI Extracted Event', arrow:'Created'},
      {component:DVF3_CalEventCreated, label:'Calendar Event Created', arrow:null},
    ],
  },
  {
    id:'flow4', title:'Flow 4 — Voice Q&A from Documents',
    description:'User asks a voice question about a document; AI answers from knowledge index and optionally navigates to the doc via A2UI.',
    screens:[
      {component:DVF4_VoiceQuestion, label:'Voice Question', arrow:'AI index'},
      {component:DVF4_AIAnswer, label:'AI Answers Instantly', arrow:'A2UI open'},
      {component:DVF4_DocOpened, label:'Document Opened', arrow:null},
    ],
  },
];

// ── Vault: Feature Map ─────────────────────────────────────────────
function DocFeatureMap() {
  const [expanded, setExpanded] = useState<string|null>(null);
  const features = [
    { id:'secure-storage', label:'Secure Storage', subs:['AES-256 encryption at rest · TLS 1.3 in transit','Google Cloud Storage (EU region) for file hosting','PostgreSQL Row-Level Security (RLS)','Audit log: tracks who accessed which document and when','GDPR compliant — EU data residency','Offline access: local cache synced on reconnect','Supported: PDF, JPG, PNG, DOCX, XLSX'] },
    { id:'category-org', label:'Category Organisation', subs:['Predefined: Medical, Insurance, School, Tax, Legal, IDs, Bills, Bank, Contracts, Other','Custom category creation','Category filter pills in header','Sort by date, category, or expiry','Tags field for flexible keyword labelling'] },
    { id:'expiry-tracking', label:'Document Expiration Tracking', subs:['Expiry date field per document','Orange badge: "Expiring Soon" (≤30 days)','Red badge: "Expired"','Push notifications with configurable lead times (90/30/7 days)','AI nudge cards on home dashboard','"Expiring Soon" section in header badge'] },
    { id:'ocr-extraction', label:'OCR Extraction Pipeline', subs:['Google Vision API (primary OCR)','Gemini 2.0 Flash for AI reasoning (85% of ops)','Receipt: merchant, items, total, date','Invitation: event name, date, time, location','Insurance/bill: due date, payable amount','Extracted knowledge stored separately (not re-parsed each query)'] },
    { id:'auto-actions', label:'AI Auto-Actions', subs:['Insurance upload → calendar event on due date','Insurance upload → task 1 month prior (low → medium → high → urgent)','Receipt scan → expense record auto-created','Invitation scan → calendar event auto-created','Bidirectional: Calendar event attachments upload to Vault','No manual cross-module entry needed'] },
    { id:'voice-qa', label:'Voice Q&A from Documents', subs:['"When does my insurance expire?" → instant answer','"What is my bank account number?" → AI retrieves','"Find insurance documents" → lists all matches','"Show me tax documents from 2024" → filtered results','AI answers from knowledge index (not raw file re-parsing)','Follow-up: "Show me the document" → A2UI opens Vault'] },
    { id:'permissions', label:'Per-Document Permissions', subs:['Three access levels: View / Edit / Download','Set per document, per family member','Personal Vault: always private','Family Vault: shared per uploader\'s choice','Parent/admin: full access','Child role: view-only regardless of setting'] },
    { id:'personal-family', label:'Personal vs Family Vault', subs:['Personal ↔ Family toggle (universal)','Personal: only you can see it','Family: visible per permissions you set','Member avatar filter in header','Document upload activity in Family Feed','Consistent with Tasks, Lists, Calendar, Expenses modules'] },
    { id:'ocr-search', label:'OCR Full-Text Search', subs:['Search by keyword in document content (not just filenames)','Results with highlighted context snippets','Voice-triggered search via AI assistant','Real-time search as you type','Cross-category search (all documents at once)'] },
    { id:'calendar-attachment', label:'Calendar Event Attachment', subs:['Section E in Calendar Full Form: "+ Attachment"','Supports PDF and image formats','Automatic upload to Document Vault on attach','event.attachment_ids[] stores Vault entry references','Accessible from Calendar event detail view'] },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-indigo-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Feature Map — 10 Features</h2>
      </div>
      <div className="space-y-2">
        {features.map(f=>{
          const open=expanded===f.id;
          return (
            <div key={f.id} className={`rounded-lg border transition-colors ${open?'border-indigo-300 bg-indigo-50':'border-gray-200 bg-gray-50 hover:bg-indigo-50/40'}`}>
              <button onClick={()=>setExpanded(open?null:f.id)} className="w-full flex items-center justify-between p-3 text-left">
                <span className="text-sm font-medium text-gray-800">{f.label}</span>
                <motion.div animate={{rotate:open?180:0}} transition={{duration:0.2}}><ChevronDown className="w-4 h-4 text-gray-400"/></motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open&&(
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25}} className="overflow-hidden">
                    <div className="px-3 pb-3">
                      <ul className="space-y-1">{f.subs.map((s,i)=><li key={i} className="flex items-start gap-1.5"><span className="text-indigo-400 text-xs mt-0.5">•</span><span className="text-xs text-gray-600">{s}</span></li>)}</ul>
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

// ── Vault: Entry Points ────────────────────────────────────────────
function DocEntryPoints() {
  const points = [
    { id:'modules-grid', icon:LayoutGrid, label:'More → Documents Tile', desc:'User navigates to the More/Modules grid screen and taps the "Documents" tile — opens the Document Vault with Personal/Family toggle at the top.', color:'bg-indigo-50 border-indigo-200', iconColor:'text-indigo-600' },
    { id:'dashboard-nudge', icon:Bell, label:'Home Dashboard Expiry Nudge', desc:'AI nudge card on home dashboard: "Your Car Insurance expires in 30 days." Tapping the card deep-links directly to the relevant document in the Vault.', color:'bg-violet-50 border-violet-200', iconColor:'text-violet-600' },
    { id:'ai-chat-voice', icon:MessageSquare, label:'AI Chat / Voice Command', desc:'User says "When does my passport expire?" or "Search documents for insurance" — Document AI Agent answers or navigates to Vault via A2UI without manual navigation.', color:'bg-purple-50 border-purple-200', iconColor:'text-purple-600' },
    { id:'calendar-attachment', icon:Paperclip, label:'Calendar Event → Attachment', desc:'In Calendar event creation Full Form, Section E (Attachments) → tapping "+ Attachment" triggers upload to Document Vault. Document accessible from both modules.', color:'bg-blue-50 border-blue-200', iconColor:'text-blue-600' },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-indigo-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Entry Points — 4 Ways to Arrive</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {points.map(p=>{
          const Icon=p.icon;
          return (
            <div key={p.id} className={`p-4 rounded-lg border ${p.color}`}>
              <div className="flex items-center gap-2 mb-2"><Icon className={`w-4 h-4 ${p.iconColor}`}/><span className="text-xs font-semibold text-gray-800">{p.label}</span></div>
              <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Vault: AI Layer ────────────────────────────────────────────────
function DocAILayer() {
  const layers = [
    { id:'passive', icon:Brain, label:'Passive Layer — Dashboard AI', desc:'Document AI Agent monitors expiry dates continuously. Proactive nudge cards appear on home dashboard as documents approach expiry. A2UI can highlight the expiring document in the Vault without user navigation.', color:'bg-indigo-50 border-indigo-200', hColor:'bg-indigo-100 text-indigo-800', iconColor:'text-indigo-600' },
    { id:'interactive', icon:MessageCircle, label:'Interactive Layer — Chat & Voice', desc:'Document AI Agent in chat/voice interface. Answers questions from indexed knowledge ("When does my insurance expire?"), searches documents by keyword, navigates to specific documents via A2UI, and executes document-related MCP tool calls.', color:'bg-violet-50 border-violet-200', hColor:'bg-violet-100 text-violet-800', iconColor:'text-violet-600' },
    { id:'inline', icon:Zap, label:'Inline Layer — Auto-Action on Upload', desc:'On document upload, the AI automatically runs OCR extraction, indexes the extracted knowledge, creates linked Calendar events and Tasks (for insurance/bills), and creates Expense records (for receipts) — without any additional user input.', color:'bg-purple-50 border-purple-200', hColor:'bg-purple-100 text-purple-800', iconColor:'text-purple-600' },
  ];
  const caps = ['OCR extraction: Google Vision API + Gemini 2.0 Flash','Insurance/bill parsing: extract due date + payable amount','Receipt parsing: extract merchant, total, date → expense','Invitation parsing: extract event name, date, time, location → calendar event','Knowledge indexing: store extracted fields for instant voice Q&A','Voice Q&A: answer questions without re-reading raw document','Expiry monitoring: proactive nudges at configurable lead times','A2UI: navigate to Document Vault screen programmatically','A2UI: highlight specific documents (e.g., expiring passports)','MCP tool calls: create, retrieve, update document records','Auto-task creation with dynamic priority escalation','Auto-calendar event creation from document due dates and invitations'];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-indigo-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">AI Layer Model — Document Specialist Agent</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {layers.map(l=>{
          const Icon=l.icon;
          return (
            <div key={l.id} className={`rounded-lg border overflow-hidden ${l.color}`}>
              <div className={`px-3 py-2 flex items-center gap-2 ${l.hColor}`}><Icon className={`w-4 h-4 ${l.iconColor}`}/><span className="text-xs font-semibold">{l.label}</span></div>
              <div className="p-3"><p className="text-xs text-gray-600 leading-relaxed">{l.desc}</p></div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-gray-100 pt-4">
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Document Agent Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
          {caps.map((c,i)=><div key={i} className="flex items-start gap-1.5"><span className="text-indigo-400 text-xs mt-0.5 flex-shrink-0">▸</span><span className="text-xs text-gray-600">{c}</span></div>)}
        </div>
      </div>
    </div>
  );
}

// ── Vault: Cross-Module Cascade ────────────────────────────────────
function DocCrossModule() {
  const groups = [
    {
      trigger:'Insurance / Bill Document Uploaded', color:'bg-indigo-500',
      targets:[
        { module:'Calendar', desc:'Auto-creates event on due date: "Pay Insurance ₹X on DATE"', color:'bg-blue-50 border-blue-300 text-blue-800', dot:'bg-blue-400' },
        { module:'Tasks', desc:'Auto-creates reminder task 1 month before due (low priority → escalates to urgent)', color:'bg-emerald-50 border-emerald-300 text-emerald-800', dot:'bg-emerald-400' },
        { module:'Family Feed', desc:'Document upload activity card posted (visibility per permissions)', color:'bg-purple-50 border-purple-300 text-purple-800', dot:'bg-purple-400' },
        { module:'AI Index', desc:'Due date + amount stored in knowledge index → queryable via voice', color:'bg-violet-50 border-violet-300 text-violet-800', dot:'bg-violet-400' },
        { module:'Notifications', desc:'Expiry reminder scheduled at configurable lead times (90/30/7 days)', color:'bg-yellow-50 border-yellow-300 text-yellow-800', dot:'bg-yellow-500' },
      ],
    },
    {
      trigger:'Receipt / Bill Photo Scanned', color:'bg-rose-500',
      targets:[
        { module:'Expenses', desc:'Expense record auto-created with merchant, total, date pre-filled', color:'bg-rose-50 border-rose-300 text-rose-800', dot:'bg-rose-400' },
        { module:'Family Feed', desc:'Document upload activity card posted to feed', color:'bg-purple-50 border-purple-300 text-purple-800', dot:'bg-purple-400' },
        { module:'AI Index', desc:'Receipt data indexed; retrievable via voice query later', color:'bg-violet-50 border-violet-300 text-violet-800', dot:'bg-violet-400' },
      ],
    },
    {
      trigger:'Invitation / Brochure Scanned', color:'bg-emerald-600',
      targets:[
        { module:'Calendar', desc:'Calendar event auto-created with event name, date, time, location', color:'bg-blue-50 border-blue-300 text-blue-800', dot:'bg-blue-400' },
        { module:'Family Feed', desc:'Document upload activity card posted', color:'bg-purple-50 border-purple-300 text-purple-800', dot:'bg-purple-400' },
        { module:'AI Index', desc:'Event details indexed for future voice retrieval', color:'bg-violet-50 border-violet-300 text-violet-800', dot:'bg-violet-400' },
      ],
    },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-indigo-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Cross-Module Cascade — 3 Trigger Scenarios</h2>
      </div>
      <div className="space-y-6">
        {groups.map(g=>(
          <div key={g.trigger}>
            <div className="flex justify-center mb-3">
              <div className={`px-5 py-2 ${g.color} text-white rounded-xl font-semibold text-xs shadow-md`}>Trigger: "{g.trigger}"</div>
            </div>
            <div className="flex justify-center mb-3"><ArrowDown className="w-4 h-4 text-gray-400"/></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {g.targets.map(t=>(
                <div key={t.module} className={`p-3 rounded-lg border ${t.color}`}>
                  <div className="flex items-center gap-2 mb-1"><div className={`w-2 h-2 rounded-full ${t.dot}`}/><span className="text-xs font-semibold">{t.module}</span></div>
                  <p className="text-xs leading-relaxed opacity-80">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Vault: Module Connections ──────────────────────────────────────
function DocModuleConns() {
  const conns = [
    { id:'calendar', module:'Calendar', direction:'Bidirectional', desc:'Insurance/bill doc upload → auto-creates calendar event on due date. Invitation scan → auto-creates event. Calendar event creation form Section E (Attachments) → file uploaded to Vault; event stores attachment_ids[].', color:'bg-blue-50 border-blue-200', badge:'bg-blue-100 text-blue-700' },
    { id:'tasks', module:'Tasks', direction:'Docs → Tasks', desc:'Insurance/bill upload → auto-creates reminder task one month before due date. Task priority dynamically escalates: low → medium → high → urgent as deadline approaches.', color:'bg-emerald-50 border-emerald-200', badge:'bg-emerald-100 text-emerald-700' },
    { id:'expenses', module:'Expenses', direction:'Docs → Expenses', desc:'Receipt or bill photo scanned → Google Vision API extracts merchant, total, date → expense record auto-created and pre-filled for user confirmation. Receipt image stored in Vault.', color:'bg-rose-50 border-rose-200', badge:'bg-rose-100 text-rose-700' },
    { id:'family-feed', module:'Family Feed', direction:'Docs → Feed', desc:'Document uploads auto-post an activity card to the Family Feed. Visibility controlled by document\'s permission settings.', color:'bg-purple-50 border-purple-200', badge:'bg-purple-100 text-purple-700' },
    { id:'notifications', module:'Notifications', direction:'Docs → Notify', desc:'Configurable lead-time push notifications for document expiry (90/30/7 days before). Sharing notifications. Document upload activity notifications.', color:'bg-yellow-50 border-yellow-200', badge:'bg-yellow-100 text-yellow-700' },
    { id:'ai-assistant', module:'AI Assistant', direction:'Bidirectional', desc:'Document AI Agent indexes extracted knowledge and answers voice/chat queries. AI navigates to Vault via A2UI, highlights expiring documents, and executes document-related MCP tool calls.', color:'bg-violet-50 border-violet-200', badge:'bg-violet-100 text-violet-700' },
    { id:'voice-assistant', module:'Voice Assistant', direction:'Voice → Docs', desc:'"When does my insurance expire?" / "What is my bank account number?" / "Find my passport" — Document AI Agent answers from indexed knowledge, or navigates to the document via A2UI.', color:'bg-teal-50 border-teal-200', badge:'bg-teal-100 text-teal-700' },
    { id:'home-dashboard', module:'Home Dashboard', direction:'Docs → Dashboard', desc:'AI nudge cards on home dashboard: "Your passport expires in 30 days." Tapping the card navigates directly into the Document Vault to the relevant document.', color:'bg-indigo-50 border-indigo-200', badge:'bg-indigo-100 text-indigo-700' },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-indigo-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Module Connections</h2>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {conns.map(c=>(
          <div key={c.id} className={`p-3 rounded-lg border ${c.color}`}>
            <div className="flex items-center gap-2 mb-1">
              <ArrowRightLeft className="w-3.5 h-3.5 text-gray-500"/>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${c.badge}`}>{c.module}</span>
              <span className="text-xs text-gray-500">{c.direction}</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Vault: System Processes ────────────────────────────────────────
function DocSysProcesses() {
  const procs = [
    { id:'ocr-pipeline', icon:ScanLine, label:'OCR Extraction Pipeline', desc:'Image/PDF uploaded → Google Vision API extracts text → Gemini 2.0 Flash parses structured fields (merchant, total, date / event name, time, location / due date, amount) → extracted knowledge stored in structured index separate from raw file.', color:'bg-indigo-50 border-indigo-200', iconColor:'text-indigo-600' },
    { id:'expiry-reminder', icon:Bell, label:'Document Expiration Reminder System', desc:'Each document with an expiry date is monitored. Configurable lead-time notifications fire at 90 / 30 / 7 days before expiry. AI nudge cards appear on home dashboard. Orange badge at ≤30 days; red badge when expired.', color:'bg-violet-50 border-violet-200', iconColor:'text-violet-600' },
    { id:'auto-action', icon:Zap, label:'Auto-Action Engine', desc:'After OCR extraction: insurance/bill → auto-creates calendar event on due date AND reminder task one month prior (priority escalates low → medium → high → urgent). Receipt → expense record auto-created. Invitation → calendar event auto-created.', color:'bg-purple-50 border-purple-200', iconColor:'text-purple-600' },
    { id:'knowledge-index', icon:Brain, label:'AI Knowledge Indexing', desc:'After OCR extraction, structured fields (expiry dates, amounts, account numbers, event details) are stored in a queryable knowledge index. The Document AI Agent reads from this index — not the raw file — enabling instant voice Q&A without re-processing each time.', color:'bg-blue-50 border-blue-200', iconColor:'text-blue-600' },
    { id:'encryption', icon:Lock, label:'Encryption, Storage & Permission System', desc:'AES-256 encryption at rest, TLS 1.3 in transit. Google Cloud Storage (EU region) — GDPR compliant. PostgreSQL Row-Level Security (RLS) enforces multi-tenant isolation. Per-document permissions (View / Edit / Download). RBAC: admin sees all; child = view-only. Audit log records every access. Soft-delete with 30-day retention.', color:'bg-indigo-50 border-indigo-200', iconColor:'text-indigo-500' },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-indigo-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">System Processes</h2>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {procs.map(p=>{
          const Icon=p.icon;
          return (
            <div key={p.id} className={`p-3 rounded-lg border ${p.color}`}>
              <div className="flex items-center gap-2 mb-1"><Icon className={`w-4 h-4 ${p.iconColor}`}/><span className="text-sm font-semibold text-gray-800">{p.label}</span></div>
              <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Vault: Screen Zones ────────────────────────────────────────────
function DocScreenZones() {
  const zones = [
    { id:'header', label:'Header Zone', icon:Search, desc:'Personal/Family toggle · Search bar (OCR full-text) · Category filter pills · Expiring Soon badge', color:'bg-indigo-50 border-indigo-200', iconColor:'text-indigo-600' },
    { id:'doc-grid', label:'Document Grid / List', icon:Grid, desc:'Cards per document: file-type icon, name, category tag, upload date, expiry badge (if set), shared-with avatars', color:'bg-violet-50 border-violet-200', iconColor:'text-violet-600' },
    { id:'doc-detail', label:'Document Detail Panel', icon:FileText, desc:'Bottom sheet or full-screen: metadata, extracted fields, permissions, linked modules (Calendar events, Tasks, Expenses), view/download/share actions', color:'bg-purple-50 border-purple-200', iconColor:'text-purple-600' },
    { id:'fab', label:'FAB / Upload Actions', icon:Plus, desc:'Upload PDF · Camera Scan (OCR) · Voice Search · Select from gallery', color:'bg-blue-50 border-blue-200', iconColor:'text-blue-600' },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-indigo-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Screen Zones — Document Vault</h2>
      </div>
      <div className="space-y-3">
        {zones.map(z=>{
          const Icon=z.icon;
          return (
            <div key={z.id} className={`p-3 rounded-lg border ${z.color}`}>
              <div className="flex items-center gap-2 mb-1"><Icon className={`w-4 h-4 ${z.iconColor}`}/><span className="font-medium text-gray-800 text-sm">{z.label}</span></div>
              <p className="text-xs text-gray-600 leading-relaxed">{z.desc}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">Personal vault = private · Family vault = permission-controlled per document</p>
      </div>
    </div>
  );
}

// ── Vault: 4-Flow Screen Diagram ───────────────────────────────────
function DocScreenFlows() {
  const [active, setActive] = useState('flow1');
  const current = DOC_FLOWS.find(f=>f.id===active)!;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-indigo-500"/>
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">4 Interactive Screen Flows</h2>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {DOC_FLOWS.map(f=>(
          <button key={f.id} onClick={()=>setActive(f.id)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${active===f.id?'bg-indigo-500 text-white shadow-sm':'bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'}`}>
            {f.title.split(' — ')[0]}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
          <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="font-bold text-indigo-900 text-sm">{current.title}</h3>
            <p className="text-xs text-indigo-700 mt-0.5">{current.description}</p>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-2 overflow-x-auto pb-2">
            {current.screens.map((s,i)=>(
              <div key={i} className="flex items-center gap-2">
                <DocPhone label={s.label}><s.component/></DocPhone>
                {s.arrow&&<DocArrow label={s.arrow}/>}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────
export function PhoneLayoutDiagram() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDadSlot, setSelectedDadSlot] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sections = [
    { id: 'section-1',  label: 'Authentication & Onboarding',      badge: 'S1',  color: 'bg-gray-600' },
    { id: 'section-2',  label: 'Dashboard — Home Screen',           badge: 'S2',  color: 'bg-gray-600' },
    { id: 'section-3',  label: 'Member View Flow',                  badge: 'S3',  color: 'bg-pink-500' },
    { id: 'section-4',  label: 'Task Transfer Flow',                badge: 'S4',  color: 'bg-orange-500' },
    { id: 'section-5',  label: 'More Screen (⊞ Grid)',              badge: 'S5',  color: 'bg-indigo-500' },
    { id: 'section-6',  label: 'Notifications & Family Feed',       badge: 'S6',  color: 'bg-yellow-500' },
    { id: 'section-7',  label: 'Profile & Settings',                badge: 'S7',  color: 'bg-purple-500' },
    { id: 'section-8',  label: 'Scan Flow',                         badge: 'S8',  color: 'bg-gray-700' },
    { id: 'section-9',  label: 'Calendar / Reminder Module',        badge: 'S9',  color: 'bg-indigo-600' },
    { id: 'section-10', label: 'Expense Tracking / Budgeting',      badge: 'S10', color: 'bg-rose-600' },
    { id: 'section-11', label: 'Lists & Shopping Module',           badge: 'S11', color: 'bg-orange-600' },
    { id: 'section-12', label: 'Tasks & Chores Module',             badge: 'S12', color: 'bg-emerald-600' },
    { id: 'section-13', label: 'Document Vault',                    badge: 'S13', color: 'bg-indigo-600' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-10">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Phone Layout — Full App Flow</h2>
        <p className="text-sm text-gray-600">
          Login → Family Setup → Dashboard → Member View → Task Transfer
        </p>
      </div>

      {/* ── Section Index ──────────────────────────────────────── */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Jump to Section</p>
        <div className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="flex items-center gap-1.5 bg-white border border-gray-200 hover:border-gray-400 hover:shadow-sm rounded-lg px-2.5 py-1.5 transition-all group"
            >
              <span className={`${s.color} text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none`}>{s.badge}</span>
              <span className="text-[11px] text-gray-700 group-hover:text-gray-900 font-medium">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── SECTION 1: Onboarding ──────────────────────────────── */}
      <div id="section-1">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Section 1 — Authentication &amp; Onboarding</p>

        {/* Row 1: Login → Join/Create */}
        <div className="flex flex-wrap justify-center items-start gap-2 mb-6">
          <PhoneShell label="1. Splash / Login" sublabel="Phone · Google · Apple" highlight showScan={false}>
            <LoginScreen />
          </PhoneShell>
          <Arrow label="Continue →" />
          <PhoneShell label="2. Create or Join?" sublabel="Choose your path" showScan={false}>
            <JoinCreateScreen />
          </PhoneShell>
        </div>

        {/* Branch paths */}
        <div className="flex flex-wrap justify-center items-start gap-10 mt-2">

          {/* PATH A */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1">
              <span className="text-[10px] font-bold text-indigo-700">PATH A — Create Family</span>
            </div>
            <Arrow direction="down" label="taps Create" />
            <PhoneShell label="3a. Create Family" sublabel="Family name" accent="border-indigo-500" showScan={false}>
              <CreateFamilyScreen />
            </PhoneShell>
            <Arrow direction="down" label="Family created" />
            <PhoneShell label="4a. Your Profile" sublabel="Avatar · Nickname" accent="border-teal-500" showScan={false}>
              <ProfileSetupScreen />
            </PhoneShell>
          </div>

          {/* Divider */}
          <div className="flex items-center self-center px-2">
            <div className="flex flex-col items-center gap-1">
              <div className="h-24 border-l-2 border-dashed border-gray-200" />
              <span className="text-[10px] font-bold text-gray-400 bg-white px-2">OR</span>
              <div className="h-24 border-l-2 border-dashed border-gray-200" />
            </div>
          </div>

          {/* PATH B */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
              <span className="text-[10px] font-bold text-blue-700">PATH B — Join Family</span>
            </div>
            <Arrow direction="down" label="taps Join" />
            <PhoneShell label="3b. Join Family" sublabel="Role · QR · Code" accent="border-blue-500" showScan={false}>
              <JoinFamilyScreen />
            </PhoneShell>
            <Arrow direction="down" label="Request sent" />
            <PhoneShell label="4b. Waiting Approval" sublabel="Admin must approve" accent="border-indigo-400" showScan={false}>
              <WaitingApprovalScreen />
            </PhoneShell>
          </div>
        </div>
      </div>

      {/* Converge */}
      <div className="flex justify-center mt-2">
        <div className="flex items-center gap-3">
          <div className="text-gray-300 text-2xl">↘</div>
          <div className="bg-indigo-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow">Both paths → Dashboard</div>
          <div className="text-gray-300 text-2xl">↙</div>
        </div>
      </div>

      {/* ── SECTION 2: Dashboard ──────────────────────────────── */}
      <div id="section-2">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Section 2 — Dashboard (Home Screen)</p>
        <div className="flex justify-center">
          <PhoneShell label="4. Dashboard — Home" sublabel="AI-powered family hub" highlight>
            <DashboardScreen />
          </PhoneShell>
        </div>
        <ZoneLegend />
      </div>

      {/* ── SECTION 3: Member View Flow ──────────────────────── */}
      <div id="section-3" className="border-t-2 border-dashed border-pink-200 pt-6">
        <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">Section 3 — Member View Flow</p>
        <p className="text-xs text-gray-500 mb-5">
          Triggered when user taps a family member avatar in the header strip
        </p>

        {/* Interactive sectograph detail */}
        {selectedSlot && (
          <div className="mb-4">
            <SlotDetailBanner label={selectedSlot} onClose={() => setSelectedSlot(null)} />
          </div>
        )}

        {/* Flow: Dashboard → Member View */}
        <div className="flex flex-wrap justify-center items-start gap-2 mb-6">
          <PhoneShell label="4. Dashboard" sublabel="Tap 'Mom' avatar" accent="border-gray-600">
            <DashboardScreen />
          </PhoneShell>

          <div className="flex flex-col items-center justify-center gap-1 px-2 shrink-0 self-center">
            <span className="text-[9px] text-pink-600 font-bold bg-pink-50 border border-pink-200 px-2 py-0.5 rounded-full">Tap Mom avatar</span>
            <div className="text-gray-400 text-2xl leading-none mt-1">→</div>
          </div>

          <PhoneShell label="5. Mom's View" sublabel="With sectograph + workload" accent="border-pink-500" highlight={false}>
            <MemberViewScreen onSlotClick={setSelectedSlot} />
          </PhoneShell>
        </div>

        {selectedSlot && (
          <p className="text-xs text-center text-indigo-600 font-medium mb-4">
            ☝ You tapped: <strong>{selectedSlot}</strong>
          </p>
        )}

        <MemberViewLegend />

        {/* ── Example 2: Dad ── */}
        <div className="mt-8 pt-6 border-t border-dashed border-orange-300">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center text-[7px] text-white font-bold">D</div>
            <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">Example 2 — Dad's View</p>
          </div>
          <p className="text-xs text-gray-500 mb-5">
            Different emotion, different sectograph — Dad is stressed with a morning conflict and back-to-back schedule
          </p>

          {selectedDadSlot && (
            <div className="mb-4">
              <SlotDetailBanner label={selectedDadSlot} onClose={() => setSelectedDadSlot(null)} />
            </div>
          )}

          <div className="flex flex-wrap justify-center items-start gap-2 mb-4">
            <PhoneShell label="4. Dashboard" sublabel="Tap 'Dad' avatar" accent="border-gray-600">
              <DashboardScreen />
            </PhoneShell>

            <div className="flex flex-col items-center justify-center gap-1 px-2 shrink-0 self-center">
              <span className="text-[9px] text-orange-600 font-bold bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">Tap Dad avatar</span>
              <div className="text-gray-400 text-2xl leading-none mt-1">→</div>
            </div>

            <PhoneShell label="5. Dad's View" sublabel="Stressed · CRITICAL workload" accent="border-orange-500">
              <DadMemberViewScreen onSlotClick={setSelectedDadSlot} />
            </PhoneShell>
          </div>

          {selectedDadSlot && (
            <p className="text-xs text-center text-orange-600 font-medium mb-4">
              ☝ You tapped: <strong>{selectedDadSlot}</strong>
            </p>
          )}
        </div>
      </div>

      {/* ── SECTION 4: Task Transfer Flow ────────────────────── */}
      <div id="section-4" className="border-t-2 border-dashed border-orange-200 pt-6">
        <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Section 4 — Task Transfer Flow</p>
        <p className="text-xs text-gray-500 mb-5">
          User sees Mom is overloaded → taps "ASK" on a task → sends permission request → task moves on approval
        </p>

        <div className="flex flex-wrap justify-center items-start gap-2">
          <PhoneShell label="5. Mom's View" sublabel="Tap 'ASK' on a task" accent="border-pink-500">
            <MemberViewScreen />
          </PhoneShell>

          <Arrow label="tap ASK" />

          <PhoneShell label="6. Transfer Request" sublabel="Bottom sheet · confirm" accent="border-orange-500">
            <TaskTransferRequestScreen />
          </PhoneShell>

          <Arrow label="Mom approves →" />

          <PhoneShell label="7. Task Transferred" sublabel="Confirmed · in your list" accent="border-green-500">
            <TransferConfirmedScreen />
          </PhoneShell>
        </div>

        {/* Transfer flow summary */}
        <div className="mt-6 bg-orange-50 rounded-xl border border-orange-200 p-4 max-w-2xl mx-auto">
          <p className="text-xs font-bold text-gray-700 mb-3">Task Transfer — Step by Step</p>
          <div className="space-y-1.5">
            {[
              { step: '1', text: 'User views Mom\'s schedule — sees she is overloaded (82% workload, conflict at 3 PM)', color: 'bg-pink-500' },
              { step: '2', text: 'User checks sectograph — confirms they are free at 2:00 PM (no conflicts)', color: 'bg-indigo-500' },
              { step: '3', text: 'User taps "ASK" on "Grocery run" task — bottom sheet appears with task details and availability check', color: 'bg-orange-500' },
              { step: '4', text: 'User taps "Send Request" — permission request sent to Mom as a push notification', color: 'bg-orange-600' },
              { step: '5', text: 'Mom sees request on her device — taps Approve with optional message', color: 'bg-amber-500' },
              { step: '6', text: 'Task is moved: removed from Mom\'s list, added to Natasha\'s task list at same time', color: 'bg-green-500' },
              { step: '7', text: 'Mom\'s workload recalculates — sectograph updates — conflict at 3 PM may resolve', color: 'bg-teal-500' },
            ].map(s => (
              <div key={s.step} className="flex items-start gap-2">
                <div className={`w-4 h-4 rounded-full ${s.color} flex items-center justify-center shrink-0 mt-0.5`}>
                  <span className="text-[7px] text-white font-bold">{s.step}</span>
                </div>
                <p className="text-xs text-gray-700">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dad Transfer Flow ── */}
        <div className="mt-8 pt-6 border-t border-dashed border-orange-300">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center text-[7px] text-white font-bold">D</div>
            <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">Example 2 — Dad's Task Transfer</p>
          </div>
          <p className="text-xs text-gray-500 mb-5">
            User sees Dad is at CRITICAL workload → asks to take "Fix leaking pipe" → Dad approves from his device
          </p>

          <div className="flex flex-wrap justify-center items-start gap-2">
            <PhoneShell label="5. Dad's View" sublabel="Tap 'ASK' on pipe fix" accent="border-orange-500">
              <DadMemberViewScreen />
            </PhoneShell>

            <Arrow label="tap ASK" />

            <PhoneShell label="6. Transfer Request" sublabel="Bottom sheet · confirm" accent="border-orange-500">
              <DadTaskTransferRequestScreen />
            </PhoneShell>

            <Arrow label="Dad approves →" />

            <PhoneShell label="7. Task Transferred" sublabel="Confirmed · conflict resolved" accent="border-green-500">
              <DadTransferConfirmedScreen />
            </PhoneShell>
          </div>

          <div className="mt-6 bg-orange-50 rounded-xl border border-orange-200 p-4 max-w-2xl mx-auto">
            <p className="text-xs font-bold text-gray-700 mb-3">Dad's Transfer — What Changed</p>
            <div className="space-y-1.5">
              {[
                { step: '1', text: 'Dad has CRITICAL workload (91%) — 5 tasks + 2 events + conflict at 8:30 AM', color: 'bg-red-500' },
                { step: '2', text: 'Sectograph shows red arc at 8:30 AM — car service collides with budget review', color: 'bg-red-400' },
                { step: '3', text: 'User is free at 4:00 PM — taps "ASK" on "Fix leaking pipe" task', color: 'bg-orange-500' },
                { step: '4', text: 'Permission request sent to Dad — he sees it as a notification during his meeting break', color: 'bg-orange-600' },
                { step: '5', text: 'Dad approves: "Gotcha! I\'ll focus on the meeting 💪" — task moves instantly', color: 'bg-amber-500' },
                { step: '6', text: 'Dad\'s workload drops — sectograph updates — morning conflict still exists but afternoon is freed up', color: 'bg-green-500' },
              ].map(s => (
                <div key={s.step} className="flex items-start gap-2">
                  <div className={`w-4 h-4 rounded-full ${s.color} flex items-center justify-center shrink-0 mt-0.5`}>
                    <span className="text-[7px] text-white font-bold">{s.step}</span>
                  </div>
                  <p className="text-xs text-gray-700">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 5: More Screen ───────────────────────────── */}
      <div id="section-5" className="border-t-2 border-dashed border-indigo-200 pt-6">
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Section 5 — More Screen (⊞ Grid Icon)</p>
        <p className="text-xs text-gray-500 mb-5">
          User taps the grid icon in the bottom nav — all feature modules appear as a browseable category grid
        </p>
        <div className="flex flex-wrap justify-center items-start gap-2">
          <PhoneShell label="Dashboard" sublabel="Tap ⊞ grid icon" accent="border-gray-600">
            <DashboardScreen />
          </PhoneShell>
          <div className="flex flex-col items-center justify-center gap-1 px-2 shrink-0 self-center">
            <span className="text-[9px] font-bold bg-indigo-50 border border-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full">Tap ⊞</span>
            <div className="text-gray-400 text-2xl leading-none mt-1">→</div>
          </div>
          <PhoneShell label="More Screen" sublabel="All 6 feature modules" accent="border-indigo-500" highlight>
            <MoreScreen />
          </PhoneShell>
        </div>
        <div className="mt-5 bg-indigo-50 rounded-xl border border-indigo-200 p-4 max-w-lg mx-auto">
          <p className="text-xs font-bold text-gray-700 mb-2">Module Grid — 6 Tiles</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: '☑️', label: 'Tasks',        sub: 'Personal + Family tasks' },
              { icon: '📝', label: 'List',         sub: 'Shared & personal lists' },
              { icon: '📅', label: 'Reminder',     sub: 'Calendar + events' },
              { icon: '🗂️', label: 'Documents',    sub: 'Family document vault' },
              { icon: '💰', label: 'Budgeting',    sub: 'Expenses + budgets' },
              { icon: '🍽️', label: 'Meal Planner', sub: 'Weekly meal plans' },
            ].map(m => (
              <div key={m.label} className="text-center">
                <span className="text-lg">{m.icon}</span>
                <p className="text-[10px] font-bold text-gray-800">{m.label}</p>
                <p className="text-[9px] text-gray-500">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 6: Notification / Family Feed ────────────── */}
      <div id="section-6" className="border-t-2 border-dashed border-yellow-200 pt-6">
        <p className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-1">Section 6 — Notifications & Family Feed (🔔 Bell Icon)</p>
        <p className="text-xs text-gray-500 mb-5">
          User taps the bell icon — a real-time family activity feed opens showing tasks completed, events added, expenses logged, and AI conflict alerts
        </p>
        <div className="flex flex-wrap justify-center items-start gap-2">
          <PhoneShell label="Dashboard" sublabel="Tap 🔔 bell icon" accent="border-gray-600">
            <DashboardScreen />
          </PhoneShell>
          <div className="flex flex-col items-center justify-center gap-1 px-2 shrink-0 self-center">
            <span className="text-[9px] font-bold bg-yellow-50 border border-yellow-300 text-yellow-700 px-2 py-0.5 rounded-full">Tap 🔔</span>
            <div className="text-gray-400 text-2xl leading-none mt-1">→</div>
          </div>
          <PhoneShell label="Notification Feed" sublabel="Family activity · real-time" accent="border-yellow-400">
            <NotificationFeedScreen />
          </PhoneShell>
        </div>
        <div className="mt-5 bg-yellow-50 rounded-xl border border-yellow-200 p-4 max-w-lg mx-auto">
          <p className="text-xs font-bold text-gray-700 mb-2">Feed Item Types</p>
          <div className="space-y-1">
            {[
              { icon: '✅', label: 'Task completed', color: 'text-green-600' },
              { icon: '📅', label: 'Event added / updated', color: 'text-violet-600' },
              { icon: '📝', label: 'List shared or modified', color: 'text-blue-600' },
              { icon: '💰', label: 'Expense logged', color: 'text-yellow-700' },
              { icon: '⚠️', label: 'AI conflict alert', color: 'text-red-600' },
              { icon: '🔔', label: 'Upcoming event reminder', color: 'text-indigo-600' },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-2">
                <span>{f.icon}</span>
                <span className={`text-xs font-medium ${f.color}`}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 7: Profile & Settings ────────────────────── */}
      <div id="section-7" className="border-t-2 border-dashed border-purple-200 pt-6">
        <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-1">Section 7 — Profile & Settings (👤 Profile Icon)</p>
        <p className="text-xs text-gray-500 mb-5">
          User taps the profile icon — their personal profile, family role, stats, and all app settings are shown
        </p>
        <div className="flex flex-wrap justify-center items-start gap-2">
          <PhoneShell label="Dashboard" sublabel="Tap 👤 profile icon" accent="border-gray-600">
            <DashboardScreen />
          </PhoneShell>
          <div className="flex flex-col items-center justify-center gap-1 px-2 shrink-0 self-center">
            <span className="text-[9px] font-bold bg-purple-50 border border-purple-200 text-purple-700 px-2 py-0.5 rounded-full">Tap 👤</span>
            <div className="text-gray-400 text-2xl leading-none mt-1">→</div>
          </div>
          <PhoneShell label="Profile & Settings" sublabel="Account · Family · Prefs" accent="border-purple-500">
            <ProfileScreen />
          </PhoneShell>
        </div>
        <div className="mt-5 bg-purple-50 rounded-xl border border-purple-200 p-4 max-w-lg mx-auto">
          <p className="text-xs font-bold text-gray-700 mb-2">Profile Screen — Sections</p>
          <div className="space-y-1">
            {[
              { label: 'Profile Card', desc: 'Avatar · Name · Role (Admin/Member) · Task & event counts' },
              { label: 'Account & Security', desc: 'Phone number, password, connected social accounts' },
              { label: 'Family Members', desc: 'View all members, manage roles, send new invites' },
              { label: 'Notification Preferences', desc: 'Per-module notification toggles' },
              { label: 'Privacy Controls', desc: 'Control what each member can see about you' },
              { label: 'Appearance & Theme', desc: 'Light / Dark / System · font size' },
            ].map(s => (
              <div key={s.label} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1" />
                <div><span className="text-[10px] font-semibold text-gray-800">{s.label}</span><span className="text-[10px] text-gray-500"> — {s.desc}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 8: Scan Flow ─────────────────────────────── */}
      <div id="section-8" className="border-t-2 border-dashed border-gray-300 pt-6">
        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Section 8 — Scan Flow (📷 Top-Right Icon)</p>
        <p className="text-xs text-gray-500 mb-5">
          The scan icon appears in the top-right corner of every screen. Tapping it opens the camera to scan documents, receipts, or ID cards — AI then recognises the content and suggests actions
        </p>
        {/* Icon call-out */}
        <div className="flex justify-center mb-5">
          <div className="bg-gray-900 rounded-xl px-4 py-2 flex items-center gap-3 shadow-lg">
            <ScanIconSVG size={20} />
            <div>
              <p className="text-xs font-bold text-white">Scan Icon — always visible</p>
              <p className="text-[10px] text-gray-400">Top-right corner of every screen in the app</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-start gap-2">
          <PhoneShell label="Any Screen" sublabel="Tap scan icon top-right" accent="border-gray-600">
            <DashboardScreen />
          </PhoneShell>
          <Arrow label="tap scan icon" />
          <PhoneShell label="Camera / Scan View" sublabel="Choose: Doc · Receipt · ID" accent="border-gray-700">
            <ScanCameraScreen />
          </PhoneShell>
          <Arrow label="capture →" />
          <PhoneShell label="Scan Result" sublabel="AI detects · choose action" accent="border-green-500">
            <ScanResultScreen />
          </PhoneShell>
        </div>
        <div className="mt-5 bg-gray-50 rounded-xl border border-gray-200 p-4 max-w-2xl mx-auto">
          <p className="text-xs font-bold text-gray-700 mb-3">Scan → AI → Action (3 steps)</p>
          <div className="space-y-1.5">
            {[
              { step: '1', color: 'bg-gray-800', text: 'User taps scan icon (top-right) from any screen — camera opens with corner-bracket viewfinder overlay' },
              { step: '2', color: 'bg-gray-700', text: 'User selects mode: Document / Receipt / ID Card — then captures or picks from gallery' },
              { step: '3', color: 'bg-indigo-500', text: 'AI analyses the scan — detects type (receipt, contract, note, ID) and pre-fills relevant fields' },
              { step: '4', color: 'bg-green-600',  text: 'User chooses action: Add to Expenses (receipt), Save to Vault (document), or Create a Task from content' },
            ].map(s => (
              <div key={s.step} className="flex items-start gap-2">
                <div className={`w-4 h-4 rounded-full ${s.color} flex items-center justify-center shrink-0 mt-0.5`}>
                  <span className="text-[7px] text-white font-bold">{s.step}</span>
                </div>
                <p className="text-xs text-gray-700">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── SECTION 9: More → Calendar/Reminder ──────────────── */}
      <div id="section-9" className="border-t-4 border-indigo-300 pt-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">Section 9</div>
          <p className="text-sm font-bold text-indigo-700 uppercase tracking-widest">Calendar / Reminder Module</p>
        </div>
        <p className="text-xs text-gray-500 mb-6">
          User taps <strong>Calendar/Reminder</strong> in the More screen → enters the full calendar feature set.<br/>
          Everything below is ported from the calendar-map blueprint — phone layouts, 10 screen flows, features, AI layers, module connections, and system processes.
        </p>

        {/* Navigation flow: More → Calendar */}
        <div className="flex flex-wrap justify-center items-start gap-2 mb-8">
          <PhoneShell label="More Screen" sublabel="Tap Calendar/Reminder" accent="border-indigo-500">
            <MoreScreen />
          </PhoneShell>
          <div className="flex flex-col items-center justify-center gap-1 px-2 shrink-0 self-center">
            <span className="text-[9px] font-bold bg-indigo-50 border border-indigo-300 text-indigo-700 px-2 py-0.5 rounded-full">Tap Calendar</span>
            <div className="text-gray-400 text-2xl leading-none mt-1">→</div>
          </div>
          <PhoneShell label="Calendar Main Screen" sublabel="Zone 1–4 layout" accent="border-purple-500" highlight>
            <CalendarMainScreen />
          </PhoneShell>
          <Arrow label="Tap view switcher" />
          <PhoneShell label="Multiple Views" sublabel="Month / Week / Day / Matrix" accent="border-blue-500">
            <CalMultipleViewsScreen />
          </PhoneShell>
        </div>

        {/* FAB → Add Event */}
        <div className="flex justify-center mb-2">
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">Tap FAB (+) button → bottom-right</div>
            <div className="text-gray-400 text-xl">↓</div>
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <PhoneShell label="Add Event Form" sublabel="Quick create or full form" accent="border-indigo-600">
            <CalAddEventScreen />
          </PhoneShell>
        </div>

        {/* Zone Legend */}
        <div className="flex justify-center mb-8">
          <CalZoneLegend />
        </div>

        {/* ── Calendar: Screen Zones Detail ── */}
        <div className="border-t border-dashed border-purple-200 pt-6 mb-6">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Calendar — UI Screen Zones (Detailed)</p>
          <div className="space-y-3">
            {[
              { id:'header', title:'Zone 1 — Header', color:'bg-purple-100 border-purple-300 hover:bg-purple-200', items:['Left: Family selector dropdown (tap to switch family/group)','Member avatar strip — tap avatar to filter by that member','Center: Month/Year label — tap to open date jump picker (full-screen)','Navigation arrows — move forward/back in current view','Right: View switcher icon (Month / Week / Day / Matrix)','Right: Share Availability icon','Today shortcut — snaps back to current date when navigated away'] },
              { id:'grid', title:'Zone 2 — Calendar Grid', color:'bg-blue-100 border-blue-300 hover:bg-blue-200', items:['Month view: date cells with member-colored event dots (max 3 + overflow badge)','Week view: time-block columns per member or combined color-coded grid','Day view: hourly slots with all-day section pinned at top','Today ring highlight (primary color circle on current date)','Conflict badge: orange/red dot overlay on dates with scheduling conflicts','Swipe left/right = navigate forward/back in current view','Long press on date → quick-add form with date pre-filled (inline)'] },
              { id:'panel', title:'Zone 3 — Event Panel', color:'bg-green-100 border-green-300 hover:bg-green-200', items:['Opens as bottom sheet on date tap (smooth slide-up animation)','Shows: date label + "Create new event" CTA button','Event history carousel: horizontal scroll of last 10–15 event types','Each history card: color dot + title + last used time','Existing events for selected date shown below history section','Pull up to expand; pull down to collapse','Tap event card → opens full event detail sheet (Edit / Delete / Share / Duplicate)'] },
              { id:'fab', title:'Zone 4 — FAB (+)', color:'bg-orange-100 border-orange-300 hover:bg-orange-200', items:['Position: bottom-right, above global navigation bar','Tap → bottom sheet with two options: [Scan Image AI] and [Add Event]','Long press → directly opens quick-add form (date pre-filled to today)','Quick-add fields: Title, Date/Time smart shortcuts, Member assign','Full form: accessed via "Add Event" option (all metadata fields)'] },
            ].map(zone=>(
              <div key={zone.id} className={`border-2 rounded-lg p-4 ${zone.color}`}>
                <h4 className="font-semibold text-gray-900 mb-2">{zone.title}</h4>
                <ul className="text-sm text-gray-700 space-y-1">{zone.items.map((item,idx)=><li key={idx} className="flex items-start"><span className="text-gray-400 mr-2">•</span><span>{item}</span></li>)}</ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Calendar: Feature Map ── */}
        <div className="border-t border-dashed border-blue-200 pt-6 mb-6">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Calendar — Feature & Subfeature Map</p>
          <CalendarFeatureMap />
        </div>

        {/* ── Calendar: Entry Points ── */}
        <div className="border-t border-dashed border-purple-200 pt-6 mb-6">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Calendar — Entry Points</p>
          <CalendarEntryPoints />
        </div>

        {/* ── Calendar: AI Layer ── */}
        <div className="border-t border-dashed border-pink-200 pt-6 mb-6">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-3">Calendar — AI 3-Layer Model</p>
          <CalendarAILayer />
        </div>

        {/* ── Calendar: Cross-Module Cascade ── */}
        <div className="border-t border-dashed border-indigo-200 pt-6 mb-6">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Calendar — Cross-Module Cascade</p>
          <CalendarCrossModule />
        </div>

        {/* ── Calendar: Module Connections ── */}
        <div className="border-t border-dashed border-teal-200 pt-6 mb-6">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">Calendar — Module Connections & Integrations</p>
          <CalendarModuleConns />
        </div>

        {/* ── Calendar: System Processes ── */}
        <div className="border-t border-dashed border-violet-200 pt-6 mb-6">
          <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Calendar — System Processes & Background Behavior</p>
          <CalendarSysProcesses />
        </div>

        {/* ── Calendar: 10 Screen Flows ── */}
        <div className="border-t border-dashed border-gray-300 pt-6">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Calendar — 10 Interactive Screen Flow Diagrams</p>
          <CalendarScreenFlows />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── SECTION 10: More → Expense Tracking / Budgeting ─────── */}
      <div id="section-10" className="border-t-4 border-rose-300 pt-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full">Section 10</div>
          <p className="text-sm font-bold text-rose-700 uppercase tracking-widest">Expense Tracking / Budgeting Module</p>
        </div>
        <p className="text-xs text-gray-500 mb-6">
          User taps <strong>Budgeting</strong> in the More screen → enters the full expense tracking feature set.<br/>
          Everything below is ported from the expense-map blueprint — phone layouts, 4 screen flows, features, AI layers, module connections, and system processes.
        </p>

        {/* Navigation flow: More → Expense */}
        <div className="flex flex-wrap justify-center items-start gap-2 mb-8">
          <PhoneShell label="More Screen" sublabel="Tap Budgeting" accent="border-rose-500">
            <MoreScreen />
          </PhoneShell>
          <div className="flex flex-col items-center justify-center gap-1 px-2 shrink-0 self-center">
            <span className="text-[9px] font-bold bg-rose-50 border border-rose-300 text-rose-700 px-2 py-0.5 rounded-full">Tap Budgeting</span>
            <div className="text-gray-400 text-2xl leading-none mt-1">→</div>
          </div>
          <PhoneShell label="Expense Main Screen" sublabel="Budget bars + transaction list" accent="border-rose-500" highlight>
            <ExpenseMainScreen />
          </PhoneShell>
          <Arrow label="Tap FAB (+)" />
          <PhoneShell label="Add Expense Form" sublabel="Amount, category, split" accent="border-pink-500">
            <AddExpenseScreen />
          </PhoneShell>
        </div>

        {/* Receipt OCR flow */}
        <div className="flex justify-center mb-2">
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="text-[10px] text-rose-600 font-semibold bg-rose-50 px-3 py-1 rounded-full border border-rose-200">Tap Camera icon → Receipt OCR scan</div>
            <div className="text-gray-400 text-xl">↓</div>
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <PhoneShell label="Receipt Confirm" sublabel="OCR-extracted fields" accent="border-rose-600">
            <ReceiptConfirmScreen />
          </PhoneShell>
        </div>

        {/* ── Expense: Screen Zones ── */}
        <div className="border-t border-dashed border-rose-200 pt-6 mb-6">
          <p className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3">Expense — UI Screen Zones (Detailed)</p>
          <ExpenseScreenZones />
        </div>

        {/* ── Expense: Feature Map ── */}
        <div className="border-t border-dashed border-pink-200 pt-6 mb-6">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-3">Expense — Feature & Subfeature Map</p>
          <ExpenseFeatureMap />
        </div>

        {/* ── Expense: Entry Points ── */}
        <div className="border-t border-dashed border-purple-200 pt-6 mb-6">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Expense — Entry Points</p>
          <ExpenseEntryPoints />
        </div>

        {/* ── Expense: AI Layer ── */}
        <div className="border-t border-dashed border-pink-200 pt-6 mb-6">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-3">Expense — AI 3-Layer Model</p>
          <ExpenseAILayer />
        </div>

        {/* ── Expense: Cross-Module Cascade ── */}
        <div className="border-t border-dashed border-indigo-200 pt-6 mb-6">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Expense — Cross-Module Cascade</p>
          <ExpenseCrossModule />
        </div>

        {/* ── Expense: Module Connections ── */}
        <div className="border-t border-dashed border-teal-200 pt-6 mb-6">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">Expense — Module Connections & Integrations</p>
          <ExpenseModuleConns />
        </div>

        {/* ── Expense: System Processes ── */}
        <div className="border-t border-dashed border-violet-200 pt-6 mb-6">
          <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Expense — System Processes & Background Behavior</p>
          <ExpenseSysProcesses />
        </div>

        {/* ── Expense: 4 Screen Flows ── */}
        <div className="border-t border-dashed border-gray-300 pt-6">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Expense — 4 Interactive Screen Flow Diagrams</p>
          <ExpenseScreenFlows />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── SECTION 11: More → Lists & Shopping ───────────────── */}
      <div id="section-11" className="border-t-4 border-orange-300 pt-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">Section 11</div>
          <p className="text-sm font-bold text-orange-700 uppercase tracking-widest">Lists & Shopping Module</p>
        </div>
        <p className="text-xs text-gray-500 mb-6">
          User taps <strong>Lists</strong> in the More screen → enters the shared shopping and checklist feature set.<br/>
          Everything below is ported from the list-map blueprint — phone layouts, 5 screen flows, 13 features, AI layers, module connections, and system processes.
        </p>

        {/* Navigation flow: More → List Main */}
        <div className="flex flex-wrap justify-center items-start gap-2 mb-8">
          <PhoneShell label="More Screen" sublabel="Tap Lists" accent="border-orange-500">
            <MoreScreen />
          </PhoneShell>
          <div className="flex flex-col items-center justify-center gap-1 px-2 shrink-0 self-center">
            <span className="text-[9px] font-bold bg-orange-50 border border-orange-300 text-orange-700 px-2 py-0.5 rounded-full">Tap Lists</span>
            <div className="text-gray-400 text-2xl leading-none mt-1">→</div>
          </div>
          <PhoneShell label="List Main Screen" sublabel="Tabs + checklist + quick add" accent="border-orange-500" highlight>
            <ListMainScreen />
          </PhoneShell>
          <Arrow label="Tap quick add field" />
          <PhoneShell label="Add Item Form" sublabel="Type + store tag" accent="border-amber-500">
            <AddItemScreen />
          </PhoneShell>
        </div>

        {/* Kid Request mode */}
        <div className="flex justify-center mb-2">
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="text-[10px] text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full border border-purple-200">Kid opens the same list → sees Request Mode</div>
            <div className="text-gray-400 text-xl">↓</div>
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <PhoneShell label="Kid Request Mode" sublabel="Request → parent approves" accent="border-purple-500">
            <KidRequestScreen />
          </PhoneShell>
        </div>

        {/* ── Lists: Screen Zones ── */}
        <div className="border-t border-dashed border-orange-200 pt-6 mb-6">
          <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">Lists — UI Screen Zones (Detailed)</p>
          <ListScreenZones />
        </div>

        {/* ── Lists: Feature Map ── */}
        <div className="border-t border-dashed border-amber-200 pt-6 mb-6">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">Lists — Feature & Subfeature Map</p>
          <ListFeatureMap />
        </div>

        {/* ── Lists: Entry Points ── */}
        <div className="border-t border-dashed border-purple-200 pt-6 mb-6">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Lists — Entry Points</p>
          <ListEntryPoints />
        </div>

        {/* ── Lists: AI Layer ── */}
        <div className="border-t border-dashed border-pink-200 pt-6 mb-6">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-3">Lists — AI 3-Layer Model</p>
          <ListAILayer />
        </div>

        {/* ── Lists: Cross-Module Cascade ── */}
        <div className="border-t border-dashed border-indigo-200 pt-6 mb-6">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Lists — Cross-Module Cascade</p>
          <ListCrossModule />
        </div>

        {/* ── Lists: Module Connections ── */}
        <div className="border-t border-dashed border-teal-200 pt-6 mb-6">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">Lists — Module Connections & Integrations</p>
          <ListModuleConns />
        </div>

        {/* ── Lists: System Processes ── */}
        <div className="border-t border-dashed border-violet-200 pt-6 mb-6">
          <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Lists — System Processes & Background Behavior</p>
          <ListSysProcesses />
        </div>

        {/* ── Lists: 5 Screen Flows ── */}
        <div className="border-t border-dashed border-gray-300 pt-6">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Lists — 5 Interactive Screen Flow Diagrams</p>
          <ListScreenFlows />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── SECTION 12: More → Tasks & Chores ─────────────────── */}
      <div id="section-12" className="border-t-4 border-emerald-300 pt-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">Section 12</div>
          <p className="text-sm font-bold text-emerald-700 uppercase tracking-widest">Tasks & Chores Module</p>
        </div>
        <p className="text-xs text-gray-500 mb-6">
          User taps <strong>Tasks</strong> in the More screen → enters the full task management and chore rotation feature set.<br/>
          Everything below is ported from the task-map blueprint — phone layouts, 4 screen flows, 9 features, AI layers, module connections, and system processes.
        </p>

        {/* Navigation flow: More → Task Main → Task Detail */}
        <div className="flex flex-wrap justify-center items-start gap-2 mb-8">
          <PhoneShell label="More Screen" sublabel="Tap Tasks" accent="border-emerald-500">
            <MoreScreen />
          </PhoneShell>
          <div className="flex flex-col items-center justify-center gap-1 px-2 shrink-0 self-center">
            <span className="text-[9px] font-bold bg-emerald-50 border border-emerald-300 text-emerald-700 px-2 py-0.5 rounded-full">Tap Tasks</span>
            <div className="text-gray-400 text-2xl leading-none mt-1">→</div>
          </div>
          <PhoneShell label="Task Main Screen" sublabel="Today / Upcoming / Given views" accent="border-emerald-500" highlight>
            <TaskMainScreen />
          </PhoneShell>
          <Arrow label="Tap task item" />
          <PhoneShell label="Task Detail Panel" sublabel="Notes, links, actions" accent="border-teal-500">
            <TaskDetailScreen />
          </PhoneShell>
        </div>

        {/* FAB → Add Task */}
        <div className="flex justify-center mb-2">
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Tap FAB (+) → Quick Add / Voice / Template</div>
            <div className="text-gray-400 text-xl">↓</div>
          </div>
        </div>
        {/* Add Task — two states side by side */}
        <div className="flex flex-wrap justify-center items-start gap-4 mb-6">
          <div className="flex flex-col items-center gap-1">
            <div className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">Toggles OFF — Personal task</div>
            <div className="text-gray-400 text-sm">↓</div>
            <PhoneShell label="Add Task — Personal" sublabel="Assign toggle ON · one-time" accent="border-gray-400">
              <AddTaskScreen />
            </PhoneShell>
          </div>
          <div className="flex flex-col items-center justify-center self-center text-gray-300 text-2xl font-light px-1">vs</div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Toggles ON — Assigned + Recurring</div>
            <div className="text-gray-400 text-sm">↓</div>
            <PhoneShell label="Add Task — Family" sublabel="Assigned · recurring" accent="border-emerald-600">
              <AddTaskScreenExpanded />
            </PhoneShell>
          </div>
        </div>

        {/* ── Tasks: Screen Zones ── */}
        <div className="border-t border-dashed border-emerald-200 pt-6 mb-6">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Tasks — UI Screen Zones (Detailed)</p>
          <TaskScreenZones />
        </div>

        {/* ── Tasks: Feature Map ── */}
        <div className="border-t border-dashed border-teal-200 pt-6 mb-6">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">Tasks — Feature & Subfeature Map</p>
          <TaskFeatureMap />
        </div>

        {/* ── Tasks: Entry Points ── */}
        <div className="border-t border-dashed border-purple-200 pt-6 mb-6">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Tasks — Entry Points</p>
          <TaskEntryPoints />
        </div>

        {/* ── Tasks: AI Layer ── */}
        <div className="border-t border-dashed border-pink-200 pt-6 mb-6">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-3">Tasks — AI 3-Layer Model</p>
          <TaskAILayer />
        </div>

        {/* ── Tasks: Cross-Module Cascade ── */}
        <div className="border-t border-dashed border-indigo-200 pt-6 mb-6">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Tasks — Cross-Module Cascade</p>
          <TaskCrossModule />
        </div>

        {/* ── Tasks: Module Connections ── */}
        <div className="border-t border-dashed border-teal-200 pt-6 mb-6">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">Tasks — Module Connections & Integrations</p>
          <TaskModuleConns />
        </div>

        {/* ── Tasks: System Processes ── */}
        <div className="border-t border-dashed border-violet-200 pt-6 mb-6">
          <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Tasks — System Processes & Background Behavior</p>
          <TaskSysProcesses />
        </div>

        {/* ── Tasks: 4 Screen Flows ── */}
        <div className="border-t border-dashed border-gray-300 pt-6">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Tasks — 4 Interactive Screen Flow Diagrams</p>
          <TaskScreenFlows />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── SECTION 13: More → Document Vault ─────────────────── */}
      <div id="section-13" className="border-t-4 border-indigo-300 pt-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">Section 13</div>
          <p className="text-sm font-bold text-indigo-700 uppercase tracking-widest">Document Vault</p>
        </div>
        <p className="text-xs text-gray-500 mb-6">
          Tap <strong>More → Documents</strong> to open the family document vault.<br />
          Upload receipts, insurance docs, invitations — OCR extracts data and auto-creates linked calendar events, tasks, and expenses.
        </p>

        {/* Navigation flow phones */}
        <div className="flex flex-wrap justify-center items-start gap-2 mb-8">
          <PhoneShell label="More Screen" sublabel="Tap Documents" accent="border-indigo-500">
            <MoreScreen />
          </PhoneShell>
          <DocArrow />
          <PhoneShell label="Document Vault" sublabel="Main Screen" accent="border-indigo-500">
            <VaultMainScreen />
          </PhoneShell>
          <DocArrow />
          <PhoneShell label="Upload Options" sublabel="FAB Menu" accent="border-indigo-500">
            <UploadOptionsScreen />
          </PhoneShell>
          <DocArrow />
          <PhoneShell label="Document Detail" sublabel="OCR Fields" accent="border-indigo-500">
            <DocumentDetailScreen />
          </PhoneShell>
        </div>

        {/* Screen Zones */}
        <div className="border-t border-dashed border-indigo-200 pt-6 mb-6">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Document Vault — UI Screen Zones</p>
          <DocScreenZones />
        </div>

        {/* Feature Map */}
        <div className="border-t border-dashed border-indigo-200 pt-6 mb-6">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Document Vault — Feature Map (10 Features)</p>
          <DocFeatureMap />
        </div>

        {/* Entry Points */}
        <div className="border-t border-dashed border-indigo-200 pt-6 mb-6">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Document Vault — Entry Points</p>
          <DocEntryPoints />
        </div>

        {/* AI Layer */}
        <div className="border-t border-dashed border-indigo-200 pt-6 mb-6">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Document Vault — AI Layer</p>
          <DocAILayer />
        </div>

        {/* Cross-Module Cascade */}
        <div className="border-t border-dashed border-indigo-200 pt-6 mb-6">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Document Vault — Cross-Module Cascade</p>
          <DocCrossModule />
        </div>

        {/* Module Connections */}
        <div className="border-t border-dashed border-indigo-200 pt-6 mb-6">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Document Vault — Module Connections</p>
          <DocModuleConns />
        </div>

        {/* System Processes */}
        <div className="border-t border-dashed border-indigo-200 pt-6 mb-6">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Document Vault — System Processes</p>
          <DocSysProcesses />
        </div>

        {/* Screen Flows */}
        <div className="border-t border-dashed border-gray-300 pt-6">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Document Vault — 4 Interactive Screen Flow Diagrams</p>
          <DocScreenFlows />
        </div>
      </div>

      {/* Universal rule */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100 p-4 max-w-lg mx-auto">
        <p className="text-xs font-bold text-gray-800 mb-2">Universal Rule — Personal vs Family Layer</p>
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-xs text-gray-700"><strong>Personal</strong> — Private, only visible to you</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-xs text-gray-700"><strong>Family</strong> — Shared with permitted members</span>
          </div>
        </div>
        <p className="text-[10px] text-gray-500 mt-2">
          Member View only shows the shared portion of their tasks and financials. Personal items are always hidden — even from admins.
        </p>
      </div>

    </div>
  );
}
