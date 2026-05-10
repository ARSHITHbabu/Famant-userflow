// CarePointsFeature.tsx — Care Points System · v3.4 · Personal CP per member

import { ArrowRight } from 'lucide-react';

// ─── Shared primitives ────────────────────────────────────────────────────────

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
      <div className={`flex flex-col rounded-[2rem] border-[3px] shadow-xl overflow-hidden w-32 bg-gray-800 ${accent}`}>
        <div className="bg-gray-800 flex justify-between items-center px-2 py-1">
          <span className="text-[6px] text-gray-400">9:41</span>
          <div className="w-6 h-1.5 bg-gray-600 rounded-full" />
          <span className="text-[6px] text-gray-400">●●</span>
        </div>
        <div className="overflow-hidden flex-1">{children}</div>
        <div className="bg-gray-800 flex justify-center py-1">
          <div className="w-10 h-0.5 bg-gray-500 rounded-full" />
        </div>
      </div>
      {label && (
        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-800 max-w-[128px] leading-tight">{label}</p>
          {sublabel && <p className="text-[9px] text-gray-500 max-w-[128px] leading-tight">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 shrink-0 px-1">
      {label && <span className="text-[8px] text-gray-400 text-center max-w-[44px] leading-tight">{label}</span>}
      <ArrowRight className="w-4 h-4 text-gray-300" />
    </div>
  );
}

function Nav({ active }: { active?: 'home' | 'bell' }) {
  return (
    <div className="bg-white border-t border-gray-100 flex items-center justify-around py-1.5 px-2">
      <span className={`text-[9px] ${active === 'home' ? 'text-indigo-600' : 'text-gray-300'}`}>🏠</span>
      <span className="text-[9px] text-gray-300 font-bold">⊞</span>
      <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
        <span className="text-[7px] text-white">🤖</span>
      </div>
      <span className={`text-[9px] ${active === 'bell' ? 'text-indigo-600' : 'text-gray-300'}`}>🔔</span>
      <span className="text-[9px] text-gray-300">👤</span>
    </div>
  );
}

// ─── Screen content functions ─────────────────────────────────────────────────

function S_MeetLiv() {
  return (
    <div className="flex flex-col items-center justify-between bg-indigo-900 px-3" style={{ minHeight: 232 }}>
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <div className="relative flex items-center justify-center" style={{ width: 44, height: 44 }}>
          <div className="absolute w-11 h-11 rounded-full border border-indigo-500 opacity-30" />
          <div className="absolute w-8 h-8 rounded-full border border-indigo-400 opacity-50" />
          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center z-10">
            <span style={{ fontSize: 12 }}>🤖</span>
          </div>
        </div>
        <p className="text-[11px] font-black text-white text-center">Hi, I'm Liv 👋</p>
        <p className="text-[6px] text-indigo-200 text-center leading-relaxed px-1">
          Running a home takes real work. Care Points make that effort visible — personal to you, never a competition.
        </p>
        <div className="bg-indigo-800/60 border border-indigo-700 rounded-lg px-2 py-1 w-full">
          <p className="text-[5.5px] text-indigo-300 text-center italic">CP = Time × Effort · personal to you · nobody compares</p>
        </div>
      </div>
      <div className="w-full pb-3">
        <div className="bg-white rounded-2xl py-1.5 text-center">
          <span className="text-[7px] font-bold text-indigo-800">Got it →</span>
        </div>
        <p className="text-[5px] text-indigo-500 text-center mt-1">1 of 3 · ~8 sec</p>
      </div>
    </div>
  );
}

function S_HomeSetup() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 232 }}>
      <div className="bg-indigo-600 px-2 py-1 flex items-center gap-1">
        <span className="text-[7px]">🤖</span>
        <p className="text-[6.5px] font-bold text-white">Tell me about your home</p>
      </div>
      <div className="flex-1 px-2 pt-1.5 space-y-1">
        {[
          { q: 'Kids at home?', opts: ['👶 Under 3', '🧒 3–12', 'Both', 'None'], sel: 1 },
          { q: 'Pets?', opts: ['🐕 Dog', '🐈 Cat', 'Other', 'None'], sel: 1 },
          { q: 'Home type?', opts: ['🏡 House', '🏢 Apt', '🏘 Town'], sel: 0 },
          { q: 'Transport?', opts: ['🚗 Car', '🚌 Bus', '🚲 Bike', '🔀 Mix'], sel: 0 },
        ].map(({ q, opts, sel }) => (
          <div key={q} className="bg-gray-50 border border-gray-200 rounded-lg px-1.5 py-1">
            <p className="text-[5.5px] font-bold text-gray-600 mb-0.5">{q}</p>
            <div className="flex gap-0.5 flex-wrap">
              {opts.map((o, i) => (
                <span key={o} className={`text-[5px] rounded px-1 py-0.5 ${i === sel ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-500'}`}>{o}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="px-2 pb-2 pt-1">
        <div className="bg-indigo-600 rounded-2xl py-1.5 text-center">
          <span className="text-[7px] font-bold text-white">Next →</span>
        </div>
        <p className="text-[5px] text-gray-400 text-center mt-0.5">2 of 3 · ~5 sec</p>
      </div>
    </div>
  );
}

function S_VibeCheck() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 232 }}>
      <div className="bg-indigo-600 px-2 py-1 flex items-center gap-1">
        <span className="text-[7px]">🤖</span>
        <p className="text-[6.5px] font-bold text-white">Your personal preferences</p>
      </div>
      <div className="mx-2 mt-1.5 bg-indigo-50 border border-indigo-200 rounded px-1.5 py-0.5">
        <p className="text-[5.5px] text-indigo-700">"2 taps per activity — private to you, always"</p>
      </div>
      <div className="flex-1 px-2 pt-1 space-y-1">
        <div className="border-2 border-indigo-400 rounded-lg px-1.5 py-1">
          <p className="text-[6px] font-bold text-gray-800 mb-0.5">🍳 Cooking</p>
          <div className="flex justify-between mb-0.5">
            {['😍','🙂','😐','😣','😩'].map((e, i) => (
              <span key={i} className={`text-[9px] px-0.5 rounded ${i === 2 ? 'bg-indigo-100 ring-1 ring-indigo-400' : ''}`}>{e}</span>
            ))}
          </div>
          <div className="flex gap-1">
            {['💪','👌','😬'].map((e, i) => (
              <span key={i} className={`text-[9px] px-0.5 rounded ${i === 1 ? 'bg-indigo-100 ring-1 ring-indigo-400' : ''}`}>{e}</span>
            ))}
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg px-1.5 py-1 flex items-center gap-1">
          <span className="text-[9px]">🧹</span>
          <div className="flex-1">
            <p className="text-[6px] font-semibold text-gray-700">Cleaning</p>
            <p className="text-[5px] text-green-600">😍 Love it · 💪 Confident ✓</p>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg px-1.5 py-1 opacity-50">
          <p className="text-[6px] text-gray-500">🚗 Driving</p>
          <div className="flex gap-0.5 mt-0.5">
            {['😍','🙂','😐','😣','😩'].map((e, i) => <span key={i} className="text-[8px]">{e}</span>)}
          </div>
        </div>
      </div>
      <div className="px-2 pb-2 pt-0.5">
        <div className="bg-indigo-600 rounded-2xl py-1.5 text-center">
          <span className="text-[7px] font-bold text-white">Let's go! →</span>
        </div>
        <p className="text-[5px] text-gray-400 text-center mt-0.5">3 of 3 · ~10 sec</p>
      </div>
    </div>
  );
}

// Dashboard shows Sarah's personal CP (312 CP), not household total
function S_Dashboard() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 232 }}>
      <div className="px-2 py-1 border-b border-gray-100 flex justify-between items-center">
        <div>
          <p className="text-[5px] text-gray-400">Good morning</p>
          <p className="text-[7.5px] font-black text-gray-900">Sarah 👋</p>
        </div>
        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
          <span className="text-[6px] font-black text-white">F</span>
        </div>
      </div>
      <div className="px-2 pt-1 flex gap-1 items-center">
        {[['S','bg-pink-400'],['V','bg-blue-500'],['A','bg-green-400']].map(([n,c])=>(
          <div key={n} className={`w-4 h-4 rounded-full ${c} flex items-center justify-center shrink-0`}>
            <span className="text-[5px] font-bold text-white">{n}</span>
          </div>
        ))}
      </div>
      {/* CP Card — personal to Sarah */}
      <div className="mx-2 mt-1.5 bg-indigo-50 border-2 border-indigo-400 rounded-xl px-2 py-1.5">
        <div className="flex justify-between items-center mb-0.5">
          <p className="text-[6px] font-bold text-indigo-700">⭐ Your Care Points · This week</p>
          <span className="text-[5px] text-indigo-400 font-semibold">View →</span>
        </div>
        <p className="text-[18px] font-black text-indigo-800 leading-none">312 CP</p>
        <p className="text-[5px] text-green-600 font-medium mt-0.5">↑ +12% vs last week</p>
        <div className="my-1 h-1.5 bg-indigo-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width:'62%', background:'linear-gradient(to right,#86EFAC,#FACC15,#F59E0B)' }} />
        </div>
        <p className="text-[5px] text-indigo-600">17 tasks done · 3 days left</p>
      </div>
      <div className="px-2 mt-1.5 flex-1 space-y-0.5">
        {[
          {n:'School pickup',t:'3:30 PM',cp:'54 CP',bc:'border-indigo-400'},
          {n:'Cook dinner',  t:'6:00 PM',cp:'63 CP',bc:'border-orange-400'},
        ].map(t=>(
          <div key={t.n} className={`bg-white border border-gray-100 border-l-2 ${t.bc} rounded px-1.5 py-0.5 flex justify-between`}>
            <div>
              <p className="text-[6px] font-bold text-gray-800">{t.n}</p>
              <p className="text-[5px] text-gray-400">{t.t}</p>
            </div>
            <span className="text-[5px] text-indigo-500 font-medium self-start mt-0.5">{t.cp}</span>
          </div>
        ))}
      </div>
      <Nav active="home" />
    </div>
  );
}

function S_Toast() {
  return (
    <div className="flex flex-col bg-white relative" style={{ minHeight: 232 }}>
      <div className="px-2 py-1 border-b border-gray-100 flex justify-between items-center opacity-40">
        <p className="text-[7.5px] font-black text-gray-900">Sarah 👋</p>
        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
          <span className="text-[6px] font-black text-white">F</span>
        </div>
      </div>
      <div className="mx-2 mt-2 opacity-30">
        <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl px-2 py-1.5">
          <p className="text-[6px] font-bold text-indigo-700">⭐ Your Care Points</p>
          <p className="text-[16px] font-black text-indigo-800 leading-none">348 CP</p>
          <div className="mt-1 h-1.5 bg-indigo-200 rounded-full" />
        </div>
      </div>
      <div className="flex-1 opacity-30 px-2 pt-1.5 space-y-0.5">
        {['School pickup','Cook dinner'].map(n=>(
          <div key={n} className="bg-gray-100 rounded px-1.5 py-0.5">
            <p className="text-[6px] text-gray-500">{n}</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-12 left-2 right-2 bg-gray-900 rounded-xl px-2 py-1.5 shadow-2xl flex items-center gap-2 border border-gray-700">
        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
          <span className="text-[7px] text-white font-bold">✓</span>
        </div>
        <div>
          <p className="text-[6.5px] font-bold text-white">Clean kitchen — Done!</p>
          <p className="text-[6px] font-bold text-green-400">+36 CP earned</p>
        </div>
      </div>
      <Nav active="home" />
    </div>
  );
}

// My Week tab — Sarah's personal breakdown
function S_MyWeek() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 232 }}>
      <div className="px-2 py-1 border-b border-gray-100 flex items-center gap-1">
        <span className="text-[6px] text-gray-400">←</span>
        <p className="text-[7px] font-bold text-gray-900">Care Points</p>
      </div>
      <div className="flex border-b border-gray-100">
        {['My Week','Household','History'].map((t,i)=>(
          <div key={t} className={`flex-1 py-1 text-center ${i===0?'border-b-2 border-indigo-600':''}`}>
            <p className={`text-[6px] ${i===0?'font-bold text-indigo-600':'text-gray-400'}`}>{t}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 px-2 pt-1.5 space-y-1.5">
        <div className="flex items-center gap-2">
          <div>
            <p className="text-[5px] text-gray-400 uppercase tracking-wider">Your week</p>
            <p className="text-[20px] font-black text-indigo-700 leading-none">312</p>
            <p className="text-[5px] font-bold text-indigo-400">Care Points</p>
          </div>
          <div className="flex-1 space-y-0.5">
            <p className="text-[5.5px] text-gray-500">🗂 <strong>17</strong> tasks done</p>
            <p className="text-[5.5px] text-gray-500">📅 <strong>3</strong> days left</p>
          </div>
        </div>
        <div className="space-y-0.5">
          {[
            {cat:'🚗 Errands',  cp:120, pct:'92%', bg:'bg-amber-400'},
            {cat:'🍳 Cooking',  cp: 63, pct:'48%', bg:'bg-orange-400'},
            {cat:'🧹 Cleaning', cp: 72, pct:'55%', bg:'bg-blue-400'},
            {cat:'🧒 Childcare',cp: 54, pct:'41%', bg:'bg-green-400'},
          ].map(c=>(
            <div key={c.cat} className="flex items-center gap-1">
              <span className="text-[5px] w-14 text-gray-600 shrink-0">{c.cat}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${c.bg}`} style={{width:c.pct}} />
              </div>
              <span className="text-[5px] text-gray-500 shrink-0 w-5 text-right">{c.cp}</span>
            </div>
          ))}
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-1.5 py-1 flex gap-1">
          <span className="text-[9px] shrink-0">🤖</span>
          <p className="text-[5.5px] text-indigo-700 leading-snug italic">"You had a full week. Want help lightening next week?"</p>
        </div>
      </div>
      <Nav active="home" />
    </div>
  );
}

// Household tab — category totals only, no individual CP or names shown
function S_Household() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 232 }}>
      <div className="px-2 py-1 border-b border-gray-100 flex items-center gap-1">
        <span className="text-[6px] text-gray-400">←</span>
        <p className="text-[7px] font-bold text-gray-900">Care Points</p>
      </div>
      <div className="flex border-b border-gray-100">
        {['My Week','Household','History'].map((t,i)=>(
          <div key={t} className={`flex-1 py-1 text-center ${i===1?'border-b-2 border-indigo-600':''}`}>
            <p className={`text-[6px] ${i===1?'font-bold text-indigo-600':'text-gray-400'}`}>{t}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 px-2 pt-1.5 space-y-1.5">
        <div>
          <p className="text-[5px] text-gray-400 uppercase tracking-wider">This week · everyone</p>
          <p className="text-[20px] font-black text-gray-900 leading-none">1,240</p>
          <p className="text-[5px] text-gray-400 font-bold">Care Points · 42 tasks</p>
        </div>
        <div className="space-y-0.5">
          {[
            {cat:'🧒 Childcare',pct:'31%',bar:'85%',bg:'bg-green-400'},
            {cat:'🍳 Cooking',  pct:'23%',bar:'63%',bg:'bg-orange-400'},
            {cat:'🚗 Errands',  pct:'20%',bar:'55%',bg:'bg-amber-400'},
            {cat:'🧹 Cleaning', pct:'18%',bar:'49%',bg:'bg-blue-400'},
            {cat:'📋 Admin',    pct:'8%', bar:'22%',bg:'bg-purple-400'},
          ].map(c=>(
            <div key={c.cat} className="flex items-center gap-1">
              <span className="text-[5px] w-14 text-gray-600 shrink-0">{c.cat}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${c.bg}`} style={{width:c.bar}} />
              </div>
              <span className="text-[5px] text-gray-500 shrink-0 w-4 text-right">{c.pct}</span>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded px-1.5 py-0.5">
          <p className="text-[5px] text-gray-400 italic">No individual names shown · tap My Week for your own</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-1.5 py-1 flex gap-1">
          <span className="text-[9px] shrink-0">🤖</span>
          <p className="text-[5.5px] text-indigo-700 italic">"Great teamwork — 1,240 CP across 42 tasks!"</p>
        </div>
      </div>
      <Nav active="home" />
    </div>
  );
}

function S_LowEnergyPrivate() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 232 }}>
      <div className="px-2 py-1 border-b border-gray-100 flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
          <span className="text-[7px] text-white">🤖</span>
        </div>
        <div>
          <p className="text-[6.5px] font-bold text-gray-900">Liv</p>
          <p className="text-[5px] text-green-500 font-medium">Private · only you see this</p>
        </div>
      </div>
      <div className="flex-1 px-2 pt-1.5 space-y-1">
        <div className="flex justify-end">
          <div className="bg-gray-100 rounded-xl rounded-br-sm px-1.5 py-1">
            <p className="text-[6px] text-gray-600">Mood: 😩 Low energy</p>
          </div>
        </div>
        <div className="bg-indigo-600 rounded-xl rounded-tl-sm px-2 py-1.5">
          <p className="text-[6.5px] font-bold text-white mb-1">Take it easy today 🌿</p>
          <p className="text-[5.5px] text-indigo-100 mb-0.5">These 2 can wait until tomorrow:</p>
          <div className="bg-indigo-700/50 rounded px-1.5 py-0.5 mb-1 space-y-0.5">
            <p className="text-[5.5px] text-white">• Laundry</p>
            <p className="text-[5.5px] text-white">• Grocery run</p>
          </div>
          <p className="text-[5.5px] text-yellow-300 font-medium mb-1">⚠️ Keep: School pickup 3:30 PM</p>
          <p className="text-[5.5px] text-indigo-100">Want me to open these to the family?</p>
        </div>
        <div className="flex gap-1">
          <div className="flex-1 bg-indigo-600 rounded-lg py-1 text-center">
            <p className="text-[6px] font-bold text-white">Yes, open to family</p>
          </div>
          <div className="flex-1 border border-gray-200 rounded-lg py-1 text-center">
            <p className="text-[6px] text-gray-400">I'll manage</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
          <p className="text-[5px] text-amber-700">🔒 Mood never shared with anyone</p>
        </div>
      </div>
    </div>
  );
}

function S_LowEnergyFeed() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 232 }}>
      <div className="px-2 py-1 border-b border-gray-100 flex justify-between items-center">
        <p className="text-[7px] font-bold text-gray-900">Family Feed</p>
        <span className="text-[6px] text-gray-400">🔔</span>
      </div>
      <div className="flex-1 px-2 pt-1.5 space-y-1">
        <div className="flex items-start gap-1">
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[5px] font-bold text-white">V</span>
          </div>
          <p className="text-[5.5px] text-gray-500"><span className="font-bold text-gray-700">Vinayak</span> completed "Drop-off" · +66 CP</p>
        </div>
        <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl px-2 py-1.5">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
              <span className="text-[5px] text-white">🤖</span>
            </div>
            <p className="text-[6px] font-bold text-indigo-700">Liv · just now</p>
          </div>
          <p className="text-[6px] font-semibold text-gray-800 mb-1">A few tasks are open today — anyone free?</p>
          {[['🧺','Laundry'],['🛒','Grocery run']].map(([e,n])=>(
            <div key={n} className="flex items-center gap-1 bg-white border border-indigo-100 rounded px-1.5 py-0.5 mb-0.5">
              <span className="text-[7px]">{e}</span>
              <p className="text-[5.5px] text-gray-700 flex-1">{n}</p>
              <span className="text-[5px] bg-indigo-100 text-indigo-600 rounded px-0.5">Take on →</span>
            </div>
          ))}
          <p className="text-[4.5px] text-gray-400 italic mt-0.5">Liv never reveals why tasks are open · you earn your own CP</p>
        </div>
        <div className="flex items-start gap-1">
          <div className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[5px] font-bold text-white">A</span>
          </div>
          <p className="text-[5.5px] text-gray-500"><span className="font-bold text-gray-700">Amy</span> picked up "Laundry" · CP based on Amy's preferences</p>
        </div>
      </div>
      <Nav active="bell" />
    </div>
  );
}

function S_CareModePrivate() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 232 }}>
      <div className="px-2 py-1 border-b border-gray-100 flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
          <span className="text-[7px] text-white">🤖</span>
        </div>
        <div>
          <p className="text-[6.5px] font-bold text-gray-900">Liv</p>
          <p className="text-[5px] font-medium" style={{color:'#ef4444'}}>Care Mode · Private</p>
        </div>
      </div>
      <div className="flex-1 px-2 pt-1.5 space-y-1">
        <div className="flex justify-end">
          <div className="bg-gray-100 rounded-xl rounded-br-sm px-1.5 py-1">
            <p className="text-[6px] text-gray-600">Mood: 🤒 Unwell</p>
          </div>
        </div>
        <div className="bg-indigo-600 rounded-xl rounded-tl-sm px-2 py-1.5">
          <p className="text-[6.5px] font-bold text-white mb-1">I hope you feel better 🤍</p>
          <p className="text-[5.5px] text-indigo-100 leading-snug">I'll redistribute your tasks so you can rest. How long do you need?</p>
        </div>
        <div className="space-y-0.5">
          {[['Just today', true],['A couple of days', false],['Not sure yet', false]].map(([o,sel])=>(
            <div key={o as string} className={`border rounded-lg px-2 py-1 ${sel ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200'}`}>
              <p className={`text-[6.5px] ${sel ? 'font-bold text-indigo-700' : 'text-gray-500'}`}>{o as string}</p>
            </div>
          ))}
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded px-1.5 py-0.5">
          <p className="text-[5px] text-rose-700">🔒 Status never shown to others · Liv checks in each morning</p>
        </div>
      </div>
    </div>
  );
}

function S_CareModeFeed() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 232 }}>
      <div className="px-2 py-1 border-b border-gray-100 flex justify-between items-center">
        <p className="text-[7px] font-bold text-gray-900">Family Feed</p>
        <span className="text-[6px] text-gray-400">🔔</span>
      </div>
      <div className="flex-1 px-2 pt-1.5 space-y-1">
        <div className="bg-rose-50 border-2 border-rose-300 rounded-xl px-2 py-1.5">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
              <span className="text-[5px] text-white">🤖</span>
            </div>
            <p className="text-[6px] font-bold text-rose-700">Liv · just now</p>
          </div>
          <p className="text-[6px] font-semibold text-gray-800 mb-1">Someone needs cover today — can you help?</p>
          <div className="space-y-0.5 mb-1">
            <div className="flex items-center gap-1 bg-white border border-red-200 rounded px-1.5 py-0.5">
              <span className="text-[6px]">⚠️</span>
              <div className="flex-1">
                <p className="text-[5.5px] font-bold text-gray-800">School pickup — 3:30 PM</p>
                <p className="text-[4.5px] text-red-600 font-medium">Time-sensitive</p>
              </div>
              <span className="text-[5px] bg-red-100 text-red-600 rounded px-0.5">Take</span>
            </div>
            {[['🍳','Cook dinner'],['🗑️','Take out trash']].map(([e,n])=>(
              <div key={n} className="flex items-center gap-1 bg-white border border-gray-100 rounded px-1.5 py-0.5">
                <span className="text-[6px]">{e}</span>
                <p className="text-[5.5px] text-gray-700 flex-1">{n}</p>
                <span className="text-[5px] bg-indigo-100 text-indigo-600 rounded px-0.5">Take</span>
              </div>
            ))}
          </div>
          <p className="text-[4.5px] text-gray-400 italic">No reason given · you earn your own CP when you help</p>
        </div>
        <div className="flex items-start gap-1">
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[5px] font-bold text-white">V</span>
          </div>
          <p className="text-[5.5px] text-gray-500"><span className="font-bold text-gray-700">Vinayak</span> picked up "School pickup" · +54 CP</p>
        </div>
      </div>
      <Nav active="bell" />
    </div>
  );
}

// Admin panel — v3.4: shows personal baseline only, personal sliders
function S_AdminPanel() {
  return (
    <div className="flex flex-col bg-gray-50" style={{ minHeight: 232 }}>
      <div className="bg-white px-2 py-1 border-b border-gray-100 flex items-center gap-1">
        <span className="text-[6px] text-gray-400">←</span>
        <p className="text-[6.5px] font-bold text-gray-900">Settings → Care Points</p>
      </div>
      <div className="flex-1 px-2 pt-1.5 space-y-1.5">
        {/* Personal baseline — NOT household average */}
        <div className="bg-white border border-gray-200 rounded-xl px-2 py-1.5 shadow-sm">
          <p className="text-[6px] font-bold text-gray-700 mb-1">📊 Your Baseline</p>
          {[['Daily baseline','235 CP'],['7-day avg','~220 CP'],['Source','AI + profile']].map(([k,v])=>(
            <div key={k} className="flex justify-between">
              <span className="text-[5px] text-gray-500">{k}</span>
              <span className="text-[5px] font-bold text-gray-800">{v}</span>
            </div>
          ))}
          <p className="text-[4.5px] text-gray-400 mt-0.5 italic">Only you see your baseline · not visible to others</p>
        </div>
        {/* Your effort sliders — personal */}
        <div className="bg-white border border-gray-200 rounded-xl px-2 py-1.5 shadow-sm">
          <p className="text-[6px] font-bold text-gray-700 mb-0.5">Your Effort Sliders</p>
          <p className="text-[5px] font-bold text-orange-600 mb-0.5">🍳 Cooking · your ceiling ×1.4</p>
          {[
            {n:'Cook dinner', t:'45m', s:1, cp:63,  src:'Profile'},
            {n:'Pack lunches', t:'15m', s:0, cp:15,  src:'AI'},
          ].map(task=>(
            <div key={task.n} className="flex items-center gap-1 bg-gray-50 rounded px-1 py-0.5 mb-0.5">
              <div className="flex-1 min-w-0">
                <p className="text-[5.5px] font-bold text-gray-800 truncate">{task.n}</p>
                <p className="text-[4.5px] text-gray-400">{task.t}</p>
              </div>
              <div className="flex gap-0.5 shrink-0">
                {[0,1,2,3,4,5].map(i=>(
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i<=task.s
                    ?['bg-green-300','bg-green-400','bg-yellow-400','bg-amber-400','bg-orange-400','bg-red-400'][task.s]
                    :'bg-gray-200'}`} />
                ))}
              </div>
              <span className="text-[5px] font-bold text-gray-700 shrink-0">{task.cp}</span>
              <span className={`text-[4.5px] px-0.5 rounded shrink-0 ${task.src==='AI'?'bg-blue-100 text-blue-600':'bg-indigo-100 text-indigo-600'}`}>{task.src}</span>
            </div>
          ))}
          <p className="text-[4.5px] text-amber-700 bg-amber-50 px-1 py-0.5 rounded mt-0.5">Slider changes are personal · no family vote needed</p>
        </div>
        {/* Member capacity */}
        <div className="bg-white border border-gray-200 rounded-xl px-2 py-1.5 shadow-sm">
          <p className="text-[6px] font-bold text-gray-700 mb-0.5">Member Capacity</p>
          {[
            {n:'Sarah',   s:'🟢 Full',        c:'text-green-600'},
            {n:'Vinayak', s:'🟡 Reduced 80%', c:'text-yellow-600'},
          ].map(m=>(
            <div key={m.n} className="flex justify-between items-center py-0.5">
              <p className="text-[5.5px] font-bold text-gray-800">{m.n}</p>
              <p className={`text-[5.5px] font-medium ${m.c}`}>{m.s}</p>
            </div>
          ))}
          <p className="text-[4.5px] text-gray-400 mt-0.5">Set by member or admin · persists until changed</p>
        </div>
      </div>
    </div>
  );
}

// ⑦ Dashboard with Liv's smart preference nudge card
function S_DashboardWithNudge() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 232 }}>
      <div className="px-2 py-1 border-b border-gray-100 flex justify-between items-center">
        <div>
          <p className="text-[5px] text-gray-400">Good morning</p>
          <p className="text-[7.5px] font-black text-gray-900">Sarah 👋</p>
        </div>
        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
          <span className="text-[6px] font-black text-white">F</span>
        </div>
      </div>
      {/* CP card — dimmed to highlight nudge */}
      <div className="mx-2 mt-1 bg-indigo-50 border border-indigo-200 rounded-xl px-2 py-1 opacity-60">
        <p className="text-[6px] font-bold text-indigo-700">⭐ Your Care Points</p>
        <p className="text-[14px] font-black text-indigo-800 leading-none">312 CP</p>
      </div>
      {/* 💡 Smart trigger nudge card */}
      <div className="mx-2 mt-1.5 bg-purple-50 border-2 border-purple-400 rounded-xl px-2 py-1.5">
        <div className="flex items-start gap-1 mb-1">
          <span className="text-[9px] shrink-0">💡</span>
          <p className="text-[5.5px] font-bold text-purple-800 leading-snug">You've been getting through driving tasks faster lately.</p>
        </div>
        <p className="text-[5.5px] text-purple-700 mb-1.5">Want to update how you feel about it?</p>
        <div className="flex gap-1">
          <div className="flex-1 bg-purple-600 rounded-lg py-1 text-center">
            <p className="text-[5px] font-bold text-white">Update preferences →</p>
          </div>
          <div className="border border-purple-200 rounded-lg py-1 px-1.5 text-center">
            <p className="text-[5px] text-purple-400">Not now</p>
          </div>
        </div>
        <p className="text-[4.5px] text-purple-400 mt-0.5 italic">Only you see this · Liv noticed the pattern</p>
      </div>
      <div className="px-2 mt-1 flex-1 space-y-0.5">
        <div className="bg-white border border-gray-100 border-l-2 border-l-indigo-400 rounded px-1.5 py-0.5">
          <p className="text-[6px] font-bold text-gray-800">School pickup</p>
          <p className="text-[5px] text-gray-400">3:30 PM</p>
        </div>
      </div>
      <Nav active="home" />
    </div>
  );
}

// ⑦ Preference recalibration screen — pre-filled activity cards with timestamps
function S_PrefRecalib() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 232 }}>
      <div className="bg-purple-600 px-2 py-1 flex items-center gap-1">
        <span className="text-[6px] text-white">←</span>
        <p className="text-[6.5px] font-bold text-white">Update Preferences</p>
      </div>
      <div className="mx-2 mt-1 bg-purple-50 border border-purple-200 rounded px-1.5 py-0.5">
        <p className="text-[5.5px] text-purple-700 flex gap-0.5"><span>🤖</span>"Update anything that feels different now"</p>
      </div>
      <div className="flex-1 px-2 pt-1 space-y-1 overflow-hidden">
        {/* Card — unchanged, showing last-updated timestamp */}
        <div className="border border-gray-200 rounded-lg px-1.5 py-1">
          <div className="flex justify-between items-start mb-0.5">
            <p className="text-[6px] font-bold text-gray-800">🚗 Driving</p>
            <span className="text-[4.5px] text-gray-400">8 months ago</span>
          </div>
          <p className="text-[5px] text-green-600">😍 Love it · 💪 Confident — tap to change</p>
        </div>
        {/* Card — active / being edited */}
        <div className="border-2 border-purple-400 bg-purple-50 rounded-lg px-1.5 py-1">
          <div className="flex justify-between items-start mb-0.5">
            <p className="text-[6px] font-bold text-purple-800">🚗 Driving · <span className="text-[5px]">editing</span></p>
          </div>
          <div className="flex justify-between mb-0.5">
            {['😍','🙂','😐','😣','😩'].map((e, i) => (
              <span key={i} className={`text-[9px] px-0.5 rounded ${i === 1 ? 'bg-purple-200 ring-1 ring-purple-400' : ''}`}>{e}</span>
            ))}
          </div>
          <div className="flex gap-1">
            {['💪','👌','😬'].map((e, i) => (
              <span key={i} className={`text-[9px] px-0.5 rounded ${i === 1 ? 'bg-purple-200 ring-1 ring-purple-400' : ''}`}>{e}</span>
            ))}
          </div>
        </div>
        {/* Card — not yet touched */}
        <div className="border border-gray-200 rounded-lg px-1.5 py-1 opacity-60">
          <div className="flex justify-between items-start mb-0.5">
            <p className="text-[6px] font-bold text-gray-800">🍳 Cooking</p>
            <span className="text-[4.5px] text-gray-400">3 months ago</span>
          </div>
          <p className="text-[5px] text-gray-500">😐 Neutral · 😬 Tiring</p>
        </div>
      </div>
      <div className="px-2 pb-1.5 pt-0.5">
        <div className="bg-purple-600 rounded-2xl py-1.5 text-center">
          <span className="text-[7px] font-bold text-white">Save changes →</span>
        </div>
        <p className="text-[5px] text-gray-400 text-center mt-0.5">Past CP unchanged · applies going forward</p>
      </div>
    </div>
  );
}

// ⑦ Saved confirmation screen
function S_PrefSaved() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 232 }}>
      <div className="bg-purple-600 px-2 py-1 flex items-center gap-1">
        <span className="text-[6px] text-white">←</span>
        <p className="text-[6.5px] font-bold text-white">Update Preferences</p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-3 px-3">
        <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-400 flex items-center justify-center">
          <span className="text-xl">✓</span>
        </div>
        <div className="text-center space-y-1">
          <p className="text-[9px] font-black text-gray-900">Saved.</p>
          <p className="text-[6.5px] font-semibold text-gray-700">Liv will use this going forward.</p>
          <p className="text-[5.5px] text-gray-400">Your past Care Points are not changed.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg px-2 py-1.5 w-full">
          <p className="text-[5.5px] text-green-700 text-center">🔒 No one else is notified about this change</p>
        </div>
        <div className="w-full bg-purple-600 rounded-2xl py-1.5 text-center">
          <span className="text-[7px] font-bold text-white">Done →</span>
        </div>
      </div>
    </div>
  );
}

// ─── Row component ────────────────────────────────────────────────────────────

function FlowRow({
  number,
  title,
  description,
  color,
  children,
}: {
  number: string;
  title: string;
  description: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${color}`}>
        <span className="text-lg font-black text-white opacity-80">{number}</span>
        <div>
          <p className="font-bold text-white text-sm">{title}</p>
          <p className="text-xs text-white/70">{description}</p>
        </div>
      </div>
      <div className="overflow-x-auto pb-2">
        <div className="flex items-start gap-2 min-w-max px-1">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Overview components ──────────────────────────────────────────────────────

function EffortLegend() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <p className="text-sm font-bold text-gray-900">The Formula</p>
        <span className="font-mono font-bold text-indigo-700 text-sm bg-indigo-50 px-2 py-0.5 rounded">CP = Time (min) × Effort Multiplier</span>
        <p className="text-xs text-gray-500">Effort is personal — auto-set by Liv from <em>your</em> preference profile</p>
      </div>
      {/* Same task, different CP example */}
      <div className="mb-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
        <p className="text-xs font-bold text-amber-800 mb-1">Same task, different CP — that's intentional</p>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-amber-700">
          <span>Sarah cooks dinner · 45 min · Loves it (slider 1, ×1.4) → <strong>63 CP</strong></span>
          <span>Vinayak cooks dinner · 45 min · Dislikes it (slider 4, ×2.6) → <strong>117 CP</strong></span>
        </div>
        <p className="text-[10px] text-amber-600 mt-1">Preferences stay private — neither sees the other's slider</p>
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {[
          {e:'🍃', l:'Effortless', m:'×1.0', eg:'30m → 30 CP',  bg:'bg-green-50',  border:'border-green-200',  text:'text-green-700'},
          {e:'🌱', l:'Light',      m:'×1.4', eg:'30m → 42 CP',  bg:'bg-green-50',  border:'border-green-300',  text:'text-green-800'},
          {e:'🌤', l:'Moderate',   m:'×1.8', eg:'30m → 54 CP',  bg:'bg-yellow-50', border:'border-yellow-300', text:'text-yellow-800'},
          {e:'⚡', l:'Standard',   m:'×2.2', eg:'30m → 66 CP',  bg:'bg-amber-50',  border:'border-amber-300',  text:'text-amber-800'},
          {e:'🔥', l:'Demanding',  m:'×2.6', eg:'30m → 78 CP',  bg:'bg-orange-50', border:'border-orange-300', text:'text-orange-800'},
          {e:'💪', l:'Intense',    m:'×3.0', eg:'30m → 90 CP',  bg:'bg-red-50',    border:'border-red-300',    text:'text-red-800'},
        ].map(s=>(
          <div key={s.l} className={`border rounded-xl p-2 text-center ${s.bg} ${s.border}`}>
            <p className="text-xl mb-0.5">{s.e}</p>
            <p className={`text-[9px] font-bold ${s.text}`}>{s.l}</p>
            <p className={`font-mono text-[9px] font-bold ${s.text}`}>{s.m}</p>
            <p className="text-[8px] text-gray-500 mt-0.5">{s.eg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivacyCallout() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3">
        <p className="text-xs font-bold text-indigo-800 mb-2">🪞 The golden rule</p>
        <p className="text-sm font-bold text-indigo-700 italic">"A mirror, not a referee"</p>
        <p className="text-xs text-indigo-600 mt-1">FAMANT shows effort distribution honestly. It never enforces, shames, or ranks. What you do with the information is your choice.</p>
        <div className="mt-2 space-y-1">
          {[
            ['🔒', 'Your effort slider → visible only to you'],
            ['🔒', 'Household baseline → internal to Liv, never shown'],
            ['🔒', 'Preference updates → private, even from admins'],
            ['🔒', 'Your mood → never shared with anyone'],
          ].map(([icon, text]) => (
            <p key={text} className="text-[11px] text-indigo-700 flex gap-1"><span>{icon}</span>{text}</p>
          ))}
        </div>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-xl p-3">
        <p className="text-xs font-bold text-red-800 mb-2">🚫 Liv will never</p>
        <div className="space-y-0.5">
          {[
            'Compare two members\' CP to each other',
            'Use words like "unfair", "behind", or "lazy"',
            'Show one member\'s mood to another',
            'Show you another member\'s effort slider',
            'Show the household baseline to any user',
            'Tell anyone when you update your preferences',
            'Send more than 1 CP insight per week',
            'Frame CP as a score, game, or leaderboard',
          ].map(r=>(
            <p key={r} className="text-[11px] text-red-700 flex gap-1"><span className="shrink-0">✕</span>{r}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export function CarePointsOverview() {
  return (
    <div className="space-y-4">
      <EffortLegend />
      <PrivacyCallout />
    </div>
  );
}

export function CarePointsPhoneLayouts() {
  return (
    <div className="space-y-8">

      {/* ① Onboarding */}
      <FlowRow
        number="①"
        title="Onboarding — 3 screens before the dashboard"
        description="Under 25 seconds · builds Liv's personal preference profile so effort sliders are auto-assigned"
        color="bg-indigo-600"
      >
        <PhoneShell label="Screen 1 — Meet Liv" sublabel="~8 sec" accent="border-indigo-500">
          <S_MeetLiv />
        </PhoneShell>
        <Arrow label="Got it →" />
        <PhoneShell label="Screen 2 — Home setup" sublabel="~5 sec" accent="border-blue-500">
          <S_HomeSetup />
        </PhoneShell>
        <Arrow label="Next →" />
        <PhoneShell label="Screen 3 — Your preferences" sublabel="~10 sec · private" accent="border-purple-500">
          <S_VibeCheck />
        </PhoneShell>
        <Arrow label="Let's go!" />
        <PhoneShell label="Dashboard" sublabel="Liv knows your profile" accent="border-green-500">
          <S_Dashboard />
        </PhoneShell>
      </FlowRow>

      {/* ② Dashboard + toast */}
      <FlowRow
        number="②"
        title="Dashboard — your CP card + task completion"
        description="Your personal CP always visible on home · nobody else sees your number"
        color="bg-violet-600"
      >
        <PhoneShell label="Dashboard — your CP" sublabel="Personal to you only" accent="border-violet-500">
          <S_Dashboard />
        </PhoneShell>
        <Arrow label="Complete a task" />
        <PhoneShell label="Task completion toast" sublabel="+CP fades after 2 sec" accent="border-green-500">
          <S_Toast />
        </PhoneShell>
        <Arrow label="Tap 'View →'" />
        <PhoneShell label="CP Insights — My Week" sublabel="Your breakdown" accent="border-indigo-500">
          <S_MyWeek />
        </PhoneShell>
      </FlowRow>

      {/* ③ CP Insights */}
      <FlowRow
        number="③"
        title="CP Insights — 3 tabs"
        description="My Week = your personal CP · Our Household = category totals only, no names · History = your trend"
        color="bg-blue-600"
      >
        <PhoneShell label="My Week" sublabel="Personal CP + categories" accent="border-blue-500">
          <S_MyWeek />
        </PhoneShell>
        <Arrow label="Tap tab" />
        <PhoneShell label="Our Household" sublabel="No individual names or sliders" accent="border-indigo-500">
          <S_Household />
        </PhoneShell>
      </FlowRow>

      {/* ④ Low energy */}
      <FlowRow
        number="④"
        title="Low energy day — Liv privately helps"
        description="Member reports 😩 Low energy · Liv acts privately · feed shows no mood, no reason"
        color="bg-orange-500"
      >
        <PhoneShell label="Mood check-in" sublabel="😩 Low energy selected" accent="border-orange-500">
          <div className="flex flex-col bg-white" style={{minHeight:232}}>
            <div className="px-2 py-1.5 border-b border-gray-100">
              <p className="text-[7px] font-bold text-gray-900">Good morning, Sarah ☀️</p>
            </div>
            <div className="flex-1 px-2 pt-2">
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-2 py-1.5">
                <p className="text-[6.5px] font-semibold text-gray-800 mb-1.5">How are you feeling today?</p>
                <div className="space-y-0.5">
                  {[
                    {e:'💪',l:'Energized', c:'border-gray-200'},
                    {e:'😊',l:'Good',      c:'border-gray-200'},
                    {e:'😐',l:'So-so',     c:'border-gray-200'},
                    {e:'😩',l:'Low energy',c:'border-orange-400 bg-orange-50', bold:true},
                    {e:'🤒',l:'Unwell',    c:'border-gray-200'},
                  ].map(m=>(
                    <div key={m.l} className={`border rounded-lg px-1.5 py-0.5 flex items-center gap-1.5 ${m.c}`}>
                      <span className="text-[9px]">{m.e}</span>
                      <p className={`text-[6px] ${m.bold?'font-bold text-orange-700':'text-gray-600'}`}>{m.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PhoneShell>
        <Arrow label="Liv reacts privately" />
        <PhoneShell label="Liv — private message" sublabel="Only you see this" accent="border-indigo-500">
          <S_LowEnergyPrivate />
        </PhoneShell>
        <Arrow label="'Yes, open to family'" />
        <PhoneShell label="Family Feed" sublabel="No mood revealed" accent="border-green-500">
          <S_LowEnergyFeed />
        </PhoneShell>
      </FlowRow>

      {/* ⑤ Care Mode */}
      <FlowRow
        number="⑤"
        title="Care Mode — member reports unwell"
        description="Liv redistributes all tasks privately · family sees open tasks · no reason given · helper earns their own CP"
        color="bg-rose-600"
      >
        <PhoneShell label="Liv — Care Mode check-in" sublabel="Private · 🤒 Unwell" accent="border-rose-500">
          <S_CareModePrivate />
        </PhoneShell>
        <Arrow label="Tasks go to feed" />
        <PhoneShell label="Family Feed" sublabel="Tasks open · no reason" accent="border-red-400">
          <S_CareModeFeed />
        </PhoneShell>
      </FlowRow>

      {/* ⑥ Admin */}
      <FlowRow
        number="⑥"
        title="Admin panel — Settings → Care Points"
        description="Your personal baseline · your effort sliders · member capacity · no household totals shown"
        color="bg-teal-600"
      >
        <PhoneShell label="Admin panel" sublabel="Personal view · v3.4" accent="border-teal-500">
          <S_AdminPanel />
        </PhoneShell>
        <div className="flex flex-col justify-center gap-3 px-4 max-w-xs">
          <div className="bg-white border border-gray-200 rounded-xl p-3">
            <p className="text-xs font-bold text-gray-800 mb-1">What's in Settings → Care Points</p>
            {[
              ['📊', 'Your personal daily baseline (only you see this)'],
              ['🎚️', 'Your effort sliders per task (0–5) — personal, no vote'],
              ['🏷️', 'Source badge: AI inferred / Profile / Manual'],
              ['🟢', 'Set member capacity: Full / Reduced / Rest'],
              ['🤖', 'Recalibrate your sliders with Liv'],
            ].map(([i,t])=>(
              <p key={t} className="text-[11px] text-gray-600 flex gap-1.5 mb-0.5"><span>{i}</span>{t}</p>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-xs font-bold text-amber-800 mb-1">Consensus only for shared data</p>
            <p className="text-[11px] text-amber-700">Task <strong>time estimates</strong> and <strong>category assignments</strong> are shared — changes need family agreement.</p>
            <p className="text-[11px] text-amber-700 mt-1">Your <strong>effort slider</strong> is personal — change it anytime, no vote needed.</p>
          </div>
        </div>
      </FlowRow>

      {/* ⑦ Preference Recalibration */}
      <FlowRow
        number="⑦"
        title="Preference Recalibration — update your effort profile anytime"
        description="Triggered by Liv's smart nudge · or go to Profile → My Preferences · past CP is never changed"
        color="bg-purple-600"
      >
        <PhoneShell label="Liv nudge on dashboard" sublabel="Smart trigger · only you see" accent="border-purple-500">
          <S_DashboardWithNudge />
        </PhoneShell>
        <Arrow label="Tap 'Update preferences'" />
        <PhoneShell label="Recalibration screen" sublabel="Pre-filled · change what's shifted" accent="border-violet-500">
          <S_PrefRecalib />
        </PhoneShell>
        <Arrow label="Save changes" />
        <PhoneShell label="Saved ✓" sublabel="Applies going forward only" accent="border-green-500">
          <S_PrefSaved />
        </PhoneShell>
        <div className="flex flex-col justify-center gap-3 px-4 max-w-xs">
          <div className="bg-white border border-gray-200 rounded-xl p-3">
            <p className="text-xs font-bold text-gray-800 mb-1">3 types of smart nudge</p>
            {[
              ['⚡', 'Efficiency: finishing driving tasks faster lately'],
              ['📈', 'Frequency: cooking more often than usual'],
              ['📅', 'Periodic: 6-month check-in from Liv'],
            ].map(([i,t])=>(
              <p key={t} className="text-[11px] text-gray-600 flex gap-1.5 mb-0.5"><span>{i}</span>{t}</p>
            ))}
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
            <p className="text-xs font-bold text-purple-800 mb-1">Recalibration rules</p>
            <div className="space-y-1">
              {[
                'Past CP is immutable — never recalculated',
                'Changes apply to future tasks only',
                'No one else is notified',
                'Also accessible: Profile → My Preferences',
              ].map(r=>(
                <p key={r} className="text-[10px] text-purple-700 flex gap-1"><span className="shrink-0">·</span>{r}</p>
              ))}
            </div>
          </div>
        </div>
      </FlowRow>

    </div>
  );
}
