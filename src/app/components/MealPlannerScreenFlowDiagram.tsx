import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ─── Screen data ──────────────────────────────────────────────────────────────

type Screen = {
  id: string;
  label: string;
  tag: string;
  tagColor: string;
  cardColor: string;
  userAction: string;
  systemResponse: string;
  leadsTo: string[];
};

const screens: Record<string, Screen> = {
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard (Home)',
    tag: 'ENTRY',
    tagColor: 'bg-indigo-600 text-white',
    cardColor: 'border-indigo-400 bg-indigo-50',
    userAction: 'Arrives on app open (returning user) or after family setup.\nSees time-based meal card → taps "Start Cooking" or navigates to Meal Planner tab.',
    systemResponse: 'Dashboard AI agent fetches today\'s meal plan entries and renders time-based meal card.\nMorning notification (7:30am default) shows breakfast + dinner for the day.',
    leadsTo: ['Meal Settings', 'Recipe Search', 'Meal Planner', 'Cook Mode (via "Start Cooking")'],
  },
  mealSettings: {
    id: 'mealSettings',
    label: 'Meal Settings',
    tag: 'SETUP (FIRST)',
    tagColor: 'bg-rose-700 text-white',
    cardColor: 'border-rose-300 bg-rose-50',
    userAction: 'Sets per-member: allergies, dislikes, dietary flags.\nSets family defaults: servings, shopping day, preferred stores, category-to-store mapping.\nToggle weekend dessert slot.',
    systemResponse: 'Saves dietary_profile per member (allergies[], dislikes[], flags[]).\nStores family_settings: default_servings, shopping_day, preferred_stores.\nProfile used by allergy check engine on every recipe assignment.',
    leadsTo: ['Recipe Search / Import / Create', 'Meal Planner (Weekly Calendar)'],
  },
  recipeSearch: {
    id: 'recipeSearch',
    label: 'Recipe Search',
    tag: 'PATH A — SCRAPER',
    tagColor: 'bg-amber-600 text-white',
    cardColor: 'border-amber-300 bg-amber-50',
    userAction: 'Types query (e.g. "chicken pasta", "salmon under 30 min").\nApplies filters: cook time / meal type / cuisine / dietary flag.\nTaps a result card to open Recipe Detail.',
    systemResponse: 'ScraperService queries target sites server-side (rotating User-Agent, max 5 pages/min).\nExtracts schema.org/Recipe JSON-LD → HTML fallback.\nAll filtering client-side. No AI.',
    leadsTo: ['Recipe Detail & Review', 'Recipe Library (after save)'],
  },
  recipeImport: {
    id: 'recipeImport',
    label: 'Import from URL',
    tag: 'PATH B — IMPORT',
    tagColor: 'bg-orange-600 text-white',
    cardColor: 'border-orange-300 bg-orange-50',
    userAction: 'Taps "Import from URL" → pastes recipe link.\nReviews pre-filled fields → edits if needed → taps Save.',
    systemResponse: 'Extracts JSON-LD first; falls back to HTML parsing.\nNormalises units; parses ingredients into {name, quantity, unit}.\nSaves with source_url for attribution.',
    leadsTo: ['Recipe Detail & Review', 'Recipe Library (after save)'],
  },
  recipeManual: {
    id: 'recipeManual',
    label: 'Manual Recipe',
    tag: 'PATH C — MANUAL',
    tagColor: 'bg-yellow-700 text-white',
    cardColor: 'border-yellow-300 bg-yellow-50',
    userAction: 'Fills title, description, difficulty, cuisine, meal type, prep & cook times, servings, photo.\nAdds ingredient rows (name + quantity + unit).\nAdds numbered steps; drag to reorder.\nConfirms auto-suggested dietary flags.',
    systemResponse: 'Auto-suggests dietary flags by matching ingredients against family dietary_profile.\nNo external API call. Saves with source: "manual".',
    leadsTo: ['Recipe Library'],
  },
  recipeDetail: {
    id: 'recipeDetail',
    label: 'Recipe Detail & Review',
    tag: 'RECIPES',
    tagColor: 'bg-amber-700 text-white',
    cardColor: 'border-amber-400 bg-amber-50',
    userAction: 'Reviews scraped/imported recipe — title, ingredients, steps, cook time.\nEdits any field if needed.\nTaps "Save to Library".',
    systemResponse: 'Validates required fields (title, ≥1 ingredient, ≥1 step).\nRuns allergy check on ingredients against family dietary_profile.\nSaves recipe to library.',
    leadsTo: ['Recipe Library'],
  },
  recipeLibrary: {
    id: 'recipeLibrary',
    label: 'Recipe Library',
    tag: 'LIBRARY',
    tagColor: 'bg-green-700 text-white',
    cardColor: 'border-green-400 bg-green-50',
    userAction: 'Browses All / Favourites / Breakfast / Lunch / Dinner / Snacks / Desserts tabs.\nSearches full-text on title, ingredients, tags.\nTaps "Plan this again" / "More like this" / Edit / Copy.\nTaps heart to favourite.',
    systemResponse: 'Filters applied client-side on cached library data.\nFavourite toggle is per-user — does not affect other members.\nused_count incremented each time recipe is added to a planner slot.',
    leadsTo: ['Meal Planner — Slot Picker', 'Recipe Detail (edit)'],
  },
  mealPlanner: {
    id: 'mealPlanner',
    label: 'Meal Planner',
    tag: 'PLANNER',
    tagColor: 'bg-indigo-600 text-white',
    cardColor: 'border-indigo-400 bg-indigo-50',
    userAction: 'Navigates weeks (← →).\nTaps empty slot (+) → picks from library or searches inline.\nSets servings per slot; marks leftovers (suppresses from grocery list).\nTaps "Approve & share" to publish.',
    systemResponse: 'Allergy check fires on every recipe selection:\n→ Hard red alert (blocking) if allergen matched\n→ Soft amber warning for disliked ingredient (non-blocking)\nDraft visible only to creating parent.\nPublish: status → Published; push notification to all members.\nChild role: view-only.',
    leadsTo: ['Grocery List Generation', 'Cook Mode (via Dashboard)', 'Recipe Search (inline)'],
  },
  groceryList: {
    id: 'groceryList',
    label: 'Grocery List',
    tag: 'GROCERY',
    tagColor: 'bg-teal-600 text-white',
    cardColor: 'border-teal-400 bg-teal-50',
    userAction: 'Taps "Generate grocery list" from planner.\nAssigns items to stores (defaults from mapping).\nChecks off items while shopping.\nVoice: "Add milk" / "Mark eggs done".',
    systemResponse: 'Collects all meal plan entries for current week.\nMerges duplicate ingredients by summing quantities.\nCategorises into grocery taxonomy.\nAuto-creates Task: "Grocery shopping — Week N" due on shopping day.\nCreates shared List entity (source_meal_plan_id set).',
    leadsTo: ['Shared Lists module', 'Tasks module'],
  },
  cookMode: {
    id: 'cookMode',
    label: 'Cook Mode',
    tag: 'COOK',
    tagColor: 'bg-orange-600 text-white',
    cardColor: 'border-orange-400 bg-orange-50',
    userAction: 'Taps "Start Cooking" on dashboard meal card.\nAdjusts serving count → quantities recalculate live.\nFollows numbered steps; taps timers.\nScreen stays awake (wake lock).',
    systemResponse: 'Serving scaling: multiplies all ingredient quantities proportionally.\nTimer auto-detected via regex on duration patterns.\nCook-start reminder fires if prep + cook = 60 min and dinner window = 17:00.\nAll rule-based. No AI.',
    leadsTo: ['Home Dashboard', 'Meal Planner'],
  },
  voiceInput: {
    id: 'voiceInput',
    label: 'Voice Input',
    tag: 'VOICE',
    tagColor: 'bg-violet-600 text-white',
    cardColor: 'border-violet-400 bg-violet-50',
    userAction: 'Taps mic icon → speaks command.\n"Add milk to grocery list"\n"Mark eggs as done"\n"What\'s for dinner tonight?"',
    systemResponse: 'expo-av on-device speech-to-text — no audio stored or sent to cloud.\nKeyword matching calls same tRPC endpoints as UI.\nexpo-speech reads confirmation aloud.\nMVP: fixed patterns only (no NLP/synonyms).',
    leadsTo: ['Grocery List', 'Meal Planner'],
  },
};

// ─── Flow layout ──────────────────────────────────────────────────────────────

// Each "row" is a level in the flow diagram
const flowLevels: { rowLabel: string; ids: string[]; note?: string }[] = [
  { rowLabel: 'Entry', ids: ['dashboard'] },
  {
    rowLabel: 'Setup & Discovery',
    ids: ['mealSettings', 'recipeSearch', 'recipeImport', 'recipeManual'],
    note: 'Meal Settings must be done first · Recipe has 3 creation paths',
  },
  {
    rowLabel: 'Review & Save',
    ids: ['recipeDetail'],
    note: 'Path A and B pass through Review; Path C goes straight to Library',
  },
  { rowLabel: 'Library', ids: ['recipeLibrary'] },
  {
    rowLabel: 'Planning',
    ids: ['mealPlanner'],
    note: 'Draft → Published flow · Allergy check on every slot assignment',
  },
  {
    rowLabel: 'Output',
    ids: ['groceryList', 'cookMode', 'voiceInput'],
    note: 'All three can run in parallel once plan is published',
  },
];

// Arrows: from screenId → to screenId (visual overlay — kept simple with labels)
type Arrow = { from: string; to: string; label?: string };
const arrows: Arrow[] = [
  { from: 'dashboard', to: 'mealSettings' },
  { from: 'dashboard', to: 'recipeSearch', label: 'Recipe tab' },
  { from: 'dashboard', to: 'recipeImport', label: 'Import URL' },
  { from: 'dashboard', to: 'recipeManual', label: 'Create manual' },
  { from: 'dashboard', to: 'cookMode', label: 'Start Cooking' },
  { from: 'recipeSearch', to: 'recipeDetail' },
  { from: 'recipeImport', to: 'recipeDetail' },
  { from: 'recipeManual', to: 'recipeLibrary' },
  { from: 'recipeDetail', to: 'recipeLibrary', label: 'Save' },
  { from: 'recipeLibrary', to: 'mealPlanner', label: 'Plan slot' },
  { from: 'mealSettings', to: 'mealPlanner', label: 'After setup' },
  { from: 'mealPlanner', to: 'groceryList', label: 'Generate list' },
  { from: 'mealPlanner', to: 'cookMode', label: 'via Dashboard' },
  { from: 'mealPlanner', to: 'voiceInput', label: 'Voice control' },
  { from: 'voiceInput', to: 'groceryList', label: 'Add/Mark' },
];

// ─── Screen card ──────────────────────────────────────────────────────────────

function ScreenCard({ screen, active, onClick }: { screen: Screen; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      className={`border-2 rounded-xl p-3 text-left w-full transition-shadow ${screen.cardColor} ${
        active ? 'shadow-lg ring-2 ring-offset-1 ring-indigo-400' : 'hover:shadow-md'
      }`}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-gray-900 leading-tight">{screen.label}</p>
          <span className={`inline-block text-[8px] font-bold px-1.5 py-0.5 rounded-full mt-1 ${screen.tagColor}`}>
            {screen.tag}
          </span>
        </div>
        <motion.span
          animate={{ rotate: active ? 90 : 0 }}
          className="text-gray-400 text-xs shrink-0 mt-0.5"
        >
          ▶
        </motion.span>
      </div>
    </motion.button>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────

function DetailPanel({ screen }: { screen: Screen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="bg-white border border-gray-200 rounded-xl shadow-md p-5 space-y-4"
    >
      <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${screen.tagColor}`}>{screen.tag}</span>
        <h3 className="text-base font-bold text-gray-900">{screen.label}</h3>
      </div>

      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
        <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">User Action</p>
        <p className="text-xs text-gray-700 whitespace-pre-line">{screen.userAction}</p>
      </div>

      <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
        <p className="text-[10px] font-bold text-purple-700 uppercase tracking-wider mb-1">System Response</p>
        <p className="text-xs text-gray-700 whitespace-pre-line">{screen.systemResponse}</p>
      </div>

      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
        <p className="text-[10px] font-bold text-green-700 uppercase tracking-wider mb-1">Leads To</p>
        <div className="flex flex-wrap gap-1.5">
          {screen.leadsTo.map((dest) => (
            <span
              key={dest}
              className="text-xs bg-white border border-green-300 text-green-800 px-2 py-0.5 rounded-full font-medium"
            >
              → {dest}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function MealPlannerScreenFlowDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const toggle = (id: string) => setActive(active === id ? null : id);

  const activeScreen = active ? screens[active] : null;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-1">Meal Planner — Screen Flow Diagram</h2>
      <p className="text-sm text-gray-600 mb-6">
        Visual map of every screen and its navigation paths. Click any screen to see user action, system response, and where it leads.
      </p>

      {/* Flow levels */}
      <div className="space-y-1">
        {flowLevels.map((level, levelIdx) => (
          <div key={level.rowLabel}>
            {/* Row */}
            <div className="flex gap-3 items-stretch">
              {/* Level label */}
              <div className="flex items-center justify-end w-28 shrink-0">
                <div className="text-right">
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">{level.rowLabel}</p>
                </div>
              </div>

              {/* Vertical connector from previous row */}
              <div className="flex items-center shrink-0 w-4 justify-center">
                {levelIdx > 0 && (
                  <div className="w-px h-full bg-gray-200" />
                )}
              </div>

              {/* Screen cards */}
              <div
                className={`flex-1 grid gap-3 py-2 ${
                  level.ids.length === 1
                    ? 'grid-cols-1 max-w-xs'
                    : level.ids.length === 2
                    ? 'grid-cols-2'
                    : level.ids.length === 3
                    ? 'grid-cols-3'
                    : 'grid-cols-2 sm:grid-cols-4'
                }`}
              >
                {level.ids.map((id) => (
                  <ScreenCard
                    key={id}
                    screen={screens[id]}
                    active={active === id}
                    onClick={() => toggle(id)}
                  />
                ))}
              </div>
            </div>

            {/* Note below row */}
            {level.note && (
              <div className="flex gap-3 items-start">
                <div className="w-28 shrink-0" />
                <div className="w-4 shrink-0 flex justify-center">
                  <div className="w-px h-3 bg-gray-200" />
                </div>
                <p className="text-[9px] text-gray-400 italic pb-1 pt-0.5">{level.note}</p>
              </div>
            )}

            {/* Downward arrow connector (not after last row) */}
            {levelIdx < flowLevels.length - 1 && (
              <div className="flex gap-3">
                <div className="w-28 shrink-0" />
                <div className="w-4 shrink-0 flex justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-px h-3 bg-gray-300" />
                    <div className="text-gray-300 text-xs leading-none">↓</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail panel for selected screen */}
      <AnimatePresence>
        {activeScreen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-6"
          >
            <DetailPanel screen={activeScreen} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arrow legend */}
      <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
        <p className="text-xs font-bold text-gray-700 mb-3">Navigation Paths</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {arrows.map((a, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[10px] text-gray-600">
              <span className="font-semibold text-gray-800">{screens[a.from]?.label}</span>
              <span className="text-gray-400">→</span>
              <span className="font-semibold text-gray-800">{screens[a.to]?.label}</span>
              {a.label && <span className="text-gray-400 italic">({a.label})</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Complete flow summary */}
      <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
        <p className="text-xs font-bold text-gray-700 mb-3">Complete Flow Summary</p>
        <div className="flex flex-wrap items-center gap-1 text-[10px]">
          {[
            { label: 'Dashboard', color: 'bg-indigo-600 text-white' },
            { label: '→', color: '' },
            { label: 'Meal Settings', color: 'bg-rose-700 text-white' },
            { label: '→', color: '' },
            { label: 'Add Recipes (A/B/C)', color: 'bg-amber-600 text-white' },
            { label: '→', color: '' },
            { label: 'Library', color: 'bg-green-700 text-white' },
            { label: '→', color: '' },
            { label: 'Meal Planner', color: 'bg-indigo-600 text-white' },
            { label: '→', color: '' },
            { label: 'Publish', color: 'bg-indigo-800 text-white' },
            { label: '→', color: '' },
            { label: 'Grocery List', color: 'bg-teal-600 text-white' },
            { label: '+', color: 'text-gray-400 font-bold' },
            { label: 'Cook Mode', color: 'bg-orange-600 text-white' },
            { label: '+', color: 'text-gray-400 font-bold' },
            { label: 'Voice', color: 'bg-violet-600 text-white' },
          ].map((item, i) =>
            item.color && !item.color.startsWith('text-') ? (
              <span key={i} className={`px-2 py-0.5 rounded-full font-bold ${item.color}`}>
                {item.label}
              </span>
            ) : (
              <span key={i} className={`font-bold ${item.color || 'text-gray-400'}`}>
                {item.label}
              </span>
            )
          )}
        </div>
        <p className="text-[9px] text-gray-400 mt-2">
          * Meal Settings must be configured before the allergy check engine can gate recipe assignments.
          No AI or GPT in Phase 1 — all logic is rule-based.
        </p>
      </div>
    </div>
  );
}
