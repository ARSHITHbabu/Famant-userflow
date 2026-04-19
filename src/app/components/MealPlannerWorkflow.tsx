import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChefHat, Search, Link, PenLine, BookOpen, CalendarDays,
  ShoppingCart, Clock, Mic, AlertTriangle, ChevronDown, ChevronUp,
} from 'lucide-react';

// ─── Entry points ─────────────────────────────────────────────────────────────

const entryPoints = [
  { label: 'Home dashboard', path: 'Time-based meal card → "Start Cooking" → Cook Mode' },
  { label: 'Recipe tab', path: 'Search bar → scraper results → select → review → save' },
  { label: 'Import from URL', path: 'Paste link → scraper fills form → review → save' },
  { label: 'Create manually', path: 'Blank form → fill in → save to library' },
  { label: 'Meal Planner slot', path: 'Tap empty slot → pick from library → allergy check' },
  { label: 'Grocery cart icon', path: 'Top-right shortcut → jump to grocery list' },
  { label: 'Voice command', path: 'Say command → keyword parser → action executed' },
];

// ─── Screen flow ──────────────────────────────────────────────────────────────

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

const screenFlow: FlowStep[] = [
  {
    id: 'meal-settings',
    screen: 'Meal Settings — Dietary Profile',
    tag: 'SETUP (FIRST)',
    tagColor: 'bg-rose-700 text-white',
    description: 'Must be completed before any other feature. Per-member dietary data gates allergy alerts, recipe filtering, and serving calculations.',
    userAction: 'Parent sets dietary profile for each member: allergies, dislikes, dietary flags\nConfigures family-level defaults: servings, shopping day, preferred stores, category-to-store mapping\nToggle weekend dessert slot on/off',
    systemResponse: 'Saves dietary_profile per member (allergies[], dislikes[], flags[])\nStores family_settings: default_servings, shopping_day, preferred_stores\nCategory-to-store mapping persists across weeks\nProfile is used by allergy check engine on every recipe assignment',
    nextScreens: ['Recipe tab (Search / Import / Create)', 'Meal Planner'],
  },
  {
    id: 'recipe-search',
    screen: 'Recipe Search — Path A (Scraper)',
    tag: 'RECIPES',
    tagColor: 'bg-amber-600 text-white',
    description: 'Primary discovery flow. User searches by dish name or ingredient; backend ScraperService queries pre-configured recipe sites.',
    userAction: 'Types query in search bar (e.g. "chicken pasta", "salmon under 30 min")\nApplies client-side filters: cook time / meal type / cuisine / dietary flag\nTaps a result card → full recipe detail screen',
    systemResponse: 'ScraperService queries target sites server-side (rotating User-Agent, max 5 pages/min)\nExtracts schema.org/Recipe JSON-LD → falls back to HTML parsing (BeautifulSoup-style)\nReturns result cards: title, image, cook time, difficulty, source site\nFiltering applied client-side — no second network call. No AI.',
    nextScreens: ['Recipe Detail & Review', 'Save to Library'],
  },
  {
    id: 'recipe-import',
    screen: 'Import from URL — Path B',
    tag: 'RECIPES',
    tagColor: 'bg-amber-600 text-white',
    description: 'User pastes any recipe URL. Scraper extracts and normalises all fields.',
    userAction: 'Taps "Import from URL" → pastes recipe link\nReviews pre-filled form fields → edits if needed → taps Save',
    systemResponse: 'Extracts JSON-LD (@type: Recipe) first; falls back to HTML parsing\nNormalises: strips HTML entities, standardises units (g/ml/cups/tbsp/tsp)\nSplits ingredient text into structured {name, quantity, unit} — mandatory for grocery list & allergy matching\nSaves to library with source_url preserved for attribution',
    nextScreens: ['Recipe Detail & Review', 'Save to Library'],
  },
  {
    id: 'recipe-manual',
    screen: 'Manual Recipe Creation — Path C',
    tag: 'RECIPES',
    tagColor: 'bg-amber-600 text-white',
    description: 'For original family recipes not found online. A structured form with no external calls.',
    userAction: 'Taps "Create manually" → fills in: title, description, difficulty, cuisine, meal type, prep time, cook time, servings, photo (optional)\nAdds ingredients row by row (name + quantity + unit)\nAdds numbered steps; drag to reorder\nConfirms auto-suggested dietary flags',
    systemResponse: 'Auto-suggests dietary flags by matching entered ingredients against family dietary_profile\nUser confirms flags\nSaves with source: "manual". No GPT, no external API call.',
    nextScreens: ['Recipe Library'],
  },
  {
    id: 'recipe-library',
    screen: 'Recipe Library',
    tag: 'LIBRARY',
    tagColor: 'bg-green-700 text-white',
    description: 'The family\'s personal recipe collection. Starts empty; grows organically from all three creation paths.',
    userAction: 'Browses All / Favourites / Breakfast / Lunch / Dinner / Snacks / Desserts / Cuisine tabs\nSearches full-text on title, ingredients, tags\nToggle grid or list view\nTaps heart to favourite / unfavourite\nTaps recipe card → opens detail; can edit, copy, or "Plan this again"',
    systemResponse: 'Filters applied client-side on cached library data\nFavourite toggle is per-user — does not affect other family members\nCopy recipe duplicates it with source: "manual"\n"More like this" surfaces recipes with matching cuisine or meal_type tag\nused_count incremented each time recipe is added to a planner slot',
    nextScreens: ['Recipe Detail', 'Meal Planner — Slot Picker'],
  },
  {
    id: 'meal-planner',
    screen: 'Meal Planner — Weekly Calendar',
    tag: 'PLANNER',
    tagColor: 'bg-indigo-600 text-white',
    description: '7-column grid (Mon–Sun) with slot rows per day: Breakfast, Morning Snack, Lunch, Evening Snack, Dinner, and optional Weekend Dessert. Parent creates plan in Draft; publishes when ready.',
    userAction: 'Navigates weeks with ← / → arrows\nTaps empty slot (+) → bottom sheet: "Pick from library" or "Search for a recipe"\nSets servings for each slot (defaults to family setting)\nOptionally marks slot as "leftover" → suppresses ingredients from grocery list\nTaps "Approve & share with family" to publish',
    systemResponse: 'Allergy check fires on every recipe selection:\n→ Hard red alert if allergen matched (must acknowledge before slot saves)\n→ Soft amber warning for disliked ingredient (inline, non-blocking)\n→ Substitution hint shown from pre-authored lookup table\nNew week defaults to Draft — visible only to creating parent\nPublish: status → Published, push notification sent to all members\nChild role members: view only; cannot edit published plan',
    nextScreens: ['Grocery List Generation', 'Cook Mode', 'Recipe Search (inline)'],
  },
  {
    id: 'grocery-list',
    screen: 'Grocery List & Store Management',
    tag: 'GROCERY',
    tagColor: 'bg-teal-600 text-white',
    description: 'Rule-based generation from the weekly meal plan. No AI. Auto-creates a grocery shopping task.',
    userAction: 'Taps "Generate grocery list" from weekly planner\nAssigns items to stores (defaults from category-to-store mapping)\nChecks off items while shopping\nVoice: "Add milk to grocery list" / "Mark eggs as done"',
    systemResponse: 'Collects all meal plan entries for current week\nExtracts ingredients[] from each linked recipe (skips leftover-marked slots)\nMerges duplicates by summing quantities where unit matches\nCategorises each ingredient into grocery taxonomy\nCreates List entity in shared Lists module (source_meal_plan_id set)\nAuto-creates Task: "Grocery shopping — Week N", due on preferred shopping day\nCategory-to-store mapping applied by default; user can reassign per item',
    nextScreens: ['Shared Lists module', 'Tasks module'],
  },
  {
    id: 'cook-mode',
    screen: 'Cook Mode',
    tag: 'DASHBOARD',
    tagColor: 'bg-orange-600 text-white',
    description: 'Full-screen step-by-step cooking view. Opened from "Start Cooking" on the time-based dashboard meal card.',
    userAction: 'Taps "Start Cooking" on dashboard meal card\nAdjusts serving count → quantities recalculate live\nFollows numbered steps; taps countdown timers for timed steps\nScreen stays awake throughout (wake lock)',
    systemResponse: 'Dashboard shows correct meal for current time window (configurable in Meal Settings)\nServing scaling: multiplies all ingredient quantities proportionally\nTimer auto-detected via regex on duration patterns ("bake for 20 minutes")\nMorning notification (default 7:30am): today\'s breakfast and dinner\nCook-start reminder: if prep + cook time = 60 min and dinner window = 17:00 → notify at 16:00\nGrocery reminder: on shopping day if list has unchecked items. All rule-based. No AI.',
    nextScreens: ['Home Dashboard', 'Meal Planner'],
  },
  {
    id: 'voice-input',
    screen: 'Voice Input — Grocery & Planner',
    tag: 'VOICE',
    tagColor: 'bg-violet-600 text-white',
    description: 'Hands-free control of grocery lists and basic planner actions. On-device speech-to-text (expo-av) — no audio transmitted to cloud.',
    userAction: 'Taps mic icon → speaks command\n"Add milk to grocery list"\n"Mark eggs as done"\n"Assign Tesco to dairy"\n"What\'s for dinner tonight?"',
    systemResponse: 'expo-av processes speech on-device — no audio stored or sent to any server\nKeyword matching: "add" → creates item; store name → assigns item; "mark"/"check" → checks off\nCalls the same tRPC endpoints used by the UI\nexpo-speech reads confirmation aloud: "Milk added to your grocery list"\nLimitation: fixed keyword patterns only — no NLP, no synonyms in MVP\nFull natural language requires Meal Agent (Phase 2 Premium)',
    nextScreens: ['Grocery List', 'Meal Planner'],
  },
];

// ─── Feature summary cards ────────────────────────────────────────────────────

const features = [
  {
    id: 'dietary',
    title: 'Meal Settings & Dietary Profile',
    icon: AlertTriangle,
    color: 'bg-rose-100 border-rose-300',
    subfeatures: [
      'Per-member: name, role, allergies[], dislikes[], dietary flags (vegetarian / vegan / gluten-free / dairy-free)',
      'Family: default servings, shopping day, preferred stores, category-to-store mapping',
      'Weekend dessert slot toggle — adds dessert row to Sat & Sun',
      'Allergy check: hard red alert (blocking) vs soft amber warning (non-blocking)',
      'Substitution hints from pre-authored lookup table (dairy milk → oat milk)',
      'Pure rule-based string matching. Zero AI.',
    ],
  },
  {
    id: 'recipes',
    title: 'Feature 1 — Recipes',
    icon: ChefHat,
    color: 'bg-amber-100 border-amber-300',
    subfeatures: [
      'Path A — Scraper Search: query by dish name or ingredient; JSON-LD + HTML fallback extraction',
      'Path B — Import from URL: paste any recipe link; structured {name, quantity, unit} normalisation',
      'Path C — Manual Creation: blank form; drag-to-reorder steps; auto-suggested dietary flags',
      'Edit any recipe post-save (allergy check re-runs if ingredients change)',
      'Favourites: per-user heart toggle; dedicated library filter tab',
      'All filtering client-side. No second network call. No AI.',
    ],
  },
  {
    id: 'library',
    title: 'Feature 2 — Recipe Library',
    icon: BookOpen,
    color: 'bg-green-100 border-green-300',
    subfeatures: [
      'Default view: all saved recipes, newest first',
      'Sort: Newest / Most Used / A–Z / Shortest cook time',
      'Filter tabs: All / Favourites / Breakfast / Lunch / Dinner / Snacks / Desserts / Cuisine',
      'Full-text search on title, ingredients, tags',
      'Grid or list view toggle',
      '"Plan this again" / "More like this" / Copy recipe shortcuts',
      'Cold start: onboarding prompts user to add ≥3 recipes before planning',
    ],
  },
  {
    id: 'planner',
    title: 'Feature 3 — Meal Planner',
    icon: CalendarDays,
    color: 'bg-indigo-100 border-indigo-300',
    subfeatures: [
      '7-column weekly grid: Breakfast / Morning Snack / Lunch / Evening Snack / Dinner / Dessert (optional)',
      'Each meal card: name, cook time, difficulty, allergy note, three-dot context menu',
      'Empty slots show "+" → bottom sheet: Pick from library or Search via scraper inline',
      'Servings override per slot; leftover toggle suppresses grocery ingredients',
      'Draft → Published flow: parent creates in Draft; publish sends push notification to family',
      'Child role: view-only on published plan',
    ],
  },
  {
    id: 'grocery',
    title: 'Feature 4 — Grocery List & Store Management',
    icon: ShoppingCart,
    color: 'bg-teal-100 border-teal-300',
    subfeatures: [
      'One-tap generation from weekly planner — no AI',
      'Merges duplicate ingredients (200g + 300g chicken → 500g chicken)',
      'Categorises into taxonomy: Produce / Meat & Fish / Dairy / Bakery / Pantry / Frozen / Beverages / Household',
      'Category-to-store default mapping set once; persists across weeks',
      'Auto-creates "Grocery shopping — Week N" task due on preferred shopping day',
      'Shared via Lists module (source_meal_plan_id linked)',
    ],
  },
  {
    id: 'dashboard-cook',
    title: 'Feature 5 — Dashboard & Cook Mode',
    icon: Clock,
    color: 'bg-orange-100 border-orange-300',
    subfeatures: [
      'Home shows correct meal for current time window (configurable time windows)',
      'Cook Mode: full-screen step-by-step; serving scaling; auto-countdown timers via regex',
      'Screen wake lock during cook mode',
      'Morning summary notification (default 7:30am): breakfast and dinner',
      'Cook-start reminder: prep + cook time window before meal time',
      'Grocery reminder on preferred shopping day. All rule-based. No AI.',
    ],
  },
  {
    id: 'voice',
    title: 'Feature 6 — Voice Input',
    icon: Mic,
    color: 'bg-violet-100 border-violet-300',
    subfeatures: [
      'On-device speech-to-text via expo-av — no audio sent to cloud, no audio stored',
      'Commands: add item, assign store, mark done, query today\'s meal',
      'Keyword matching only — calls same tRPC endpoints as UI',
      'expo-speech reads confirmation aloud (on-device, free)',
      'MVP limitation: fixed patterns, no synonym handling (capsicum ≠ bell pepper)',
      'Full NLP voice → Phase 2 Premium (Gemini 2.0 Flash Meal Agent)',
    ],
  },
];

// ─── Module connections ────────────────────────────────────────────────────────

const moduleLinks = [
  { from: 'Meal Planner', to: 'Grocery List', how: '"Generate grocery list" → auto-builds list from all recipe ingredients for the week', color: 'border-teal-400 bg-teal-50' },
  { from: 'Grocery List', to: 'Tasks module', how: 'Auto-creates "Grocery shopping — Week N" task due on preferred shopping day', color: 'border-blue-400 bg-blue-50' },
  { from: 'Grocery List', to: 'Lists module', how: 'Creates a List entity with source_meal_plan_id — visible in Shared Lists', color: 'border-green-400 bg-green-50' },
  { from: 'Meal Planner', to: 'Home Dashboard', how: 'Published plan feeds time-based meal card on dashboard home screen', color: 'border-indigo-400 bg-indigo-50' },
  { from: 'Dashboard', to: 'Cook Mode', how: '"Start Cooking" button on meal card → full-screen step-by-step cook mode', color: 'border-orange-400 bg-orange-50' },
  { from: 'Recipe (edit)', to: 'Meal Planner', how: 'If ingredients change, allergy check re-runs on all slots using that recipe', color: 'border-rose-400 bg-rose-50' },
  { from: 'Voice Input', to: 'Grocery List', how: '"Add milk" / "Mark eggs done" → calls same tRPC endpoints as UI', color: 'border-violet-400 bg-violet-50' },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function FeatureCards() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Feature Breakdown</h3>
      <p className="text-sm text-gray-600 mb-4">Click to expand each feature</p>
      <div className="space-y-2">
        {features.map((f) => (
          <div key={f.id}>
            <motion.div
              className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${f.color}`}
              onClick={() => toggle(f.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <f.icon className="w-4 h-4" />
                  <span className="font-semibold text-gray-900 text-sm">{f.title}</span>
                </div>
                {expanded === f.id ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
              </div>
            </motion.div>
            <AnimatePresence>
              {expanded === f.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="ml-6 mt-2 mb-1 space-y-1">
                    {f.subfeatures.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="text-sm text-gray-700 flex items-start"
                      >
                        <span className="text-green-600 mr-2 shrink-0">→</span>
                        <span>{s}</span>
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

function ScreenFlow() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Screen-by-Screen Flow</h3>
      <p className="text-sm text-gray-600 mb-4">Click any screen to see user action, system response, and where it leads.</p>
      <div className="space-y-3">
        {screenFlow.map((step, idx) => {
          const isActive = active === step.id;
          return (
            <div key={step.id}>
              <motion.div
                className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-colors ${
                  isActive ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-gray-50 hover:bg-green-50/30'
                }`}
                onClick={() => setActive(isActive ? null : step.id)}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-800 text-white text-[9px] font-bold shrink-0">
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
                  <motion.span animate={{ rotate: isActive ? 90 : 0 }} className="text-gray-400 text-sm shrink-0 ml-2">▶</motion.span>
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
                    <div className="ml-4 mt-1 mb-2 border-l-2 border-green-200 pl-4 space-y-3">
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">User Action</p>
                        <p className="text-xs text-gray-700 whitespace-pre-line">{step.userAction}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                        <p className="text-[10px] font-bold text-purple-700 uppercase tracking-wider mb-1">System Response</p>
                        <p className="text-xs text-gray-700 whitespace-pre-line">{step.systemResponse}</p>
                      </div>
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

              {idx < screenFlow.length - 1 && (
                <div className="flex items-center gap-2 px-4 py-1">
                  <div className="w-6 flex justify-center">
                    <div className="text-gray-300 text-base">↓</div>
                  </div>
                  {step.id === 'recipe-search' && (
                    <span className="text-[9px] text-gray-400 italic">Path A / B / C all converge at the Recipe Library</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Flow summary pill bar */}
      <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
        <p className="text-xs font-bold text-gray-700 mb-3">Complete Flow Summary</p>
        <div className="flex flex-wrap items-center gap-1 text-[10px]">
          {[
            { label: 'Meal Settings', color: 'bg-rose-700 text-white' },
            { label: '→', color: '' },
            { label: 'Add Recipes (A/B/C)', color: 'bg-amber-600 text-white' },
            { label: '→', color: '' },
            { label: 'Library', color: 'bg-green-700 text-white' },
            { label: '→', color: '' },
            { label: 'Plan Week', color: 'bg-indigo-600 text-white' },
            { label: '→', color: '' },
            { label: 'Publish', color: 'bg-indigo-800 text-white' },
            { label: '→', color: '' },
            { label: 'Grocery List', color: 'bg-teal-600 text-white' },
            { label: '+', color: 'text-gray-400 font-bold' },
            { label: 'Cook Mode', color: 'bg-orange-600 text-white' },
            { label: '+', color: 'text-gray-400 font-bold' },
            { label: 'Voice', color: 'bg-violet-600 text-white' },
          ].map((item, i) => (
            item.color && !item.color.startsWith('text-') ? (
              <span key={i} className={`px-2 py-0.5 rounded-full font-bold ${item.color}`}>{item.label}</span>
            ) : (
              <span key={i} className={`font-bold ${item.color || 'text-gray-400'}`}>{item.label}</span>
            )
          ))}
        </div>
        <p className="text-[9px] text-gray-400 mt-2">
          * No AI or GPT in Phase 1. All discovery via web scraper. All filtering, allergy checks, and grocery generation are rule-based.
        </p>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function MealPlannerWorkflow() {
  return (
    <div className="space-y-8">
      {/* Section header */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-green-700 text-white font-bold text-sm shrink-0">14</div>
          <h2 className="text-2xl font-bold text-green-900">Meal Planner — Feature Workflow</h2>
        </div>
        <p className="text-sm text-green-800 mb-4">
          Eliminates daily food decision fatigue for families. Recipe discovery via web scraper. All planning, allergy checks, grocery generation, and notifications are rule-based.
          <strong className="ml-1">Zero AI or GPT in Phase 1.</strong>
        </p>

        {/* Entry points */}
        <div>
          <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">Entry Points into the Flow</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {entryPoints.map((ep, i) => (
              <div key={i} className="flex items-start gap-2 bg-white rounded-lg border border-green-200 px-3 py-2">
                <span className="text-green-600 font-bold text-xs shrink-0 mt-0.5">{i + 1}.</span>
                <div>
                  <p className="text-xs font-semibold text-gray-800">{ep.label}</p>
                  <p className="text-[11px] text-gray-500">{ep.path}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recipe creation paths legend */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Search, label: 'Path A — Scraper Search', desc: 'Search by dish / ingredient; backend queries recipe sites', color: 'bg-amber-50 border-amber-300 text-amber-800' },
          { icon: Link, label: 'Path B — Import from URL', desc: 'Paste any recipe link; scraper extracts & normalises', color: 'bg-orange-50 border-orange-300 text-orange-800' },
          { icon: PenLine, label: 'Path C — Manual Creation', desc: 'Blank form; entirely user-authored; no external calls', color: 'bg-yellow-50 border-yellow-300 text-yellow-800' },
        ].map(({ icon: Icon, label, desc, color }) => (
          <div key={label} className={`border rounded-lg p-4 ${color}`}>
            <div className="flex items-center gap-2 mb-1">
              <Icon className="w-4 h-4" />
              <span className="text-sm font-bold">{label}</span>
            </div>
            <p className="text-xs opacity-80">{desc}</p>
          </div>
        ))}
      </div>

      {/* Two-column: screen flow + feature breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScreenFlow />
        <FeatureCards />
      </div>

      {/* Module connections */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Module Connections — Meal Planner</h3>
        <p className="text-sm text-gray-600 mb-4">How Meal Planner integrates with the rest of HomeOS</p>
        <div className="space-y-2">
          {moduleLinks.map((c, i) => (
            <div key={i} className={`border-l-4 rounded-r-lg p-3 ${c.color}`}>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold text-gray-700">{c.from}</span>
                <span className="text-gray-400">→</span>
                <span className="text-xs font-bold text-gray-900">{c.to}</span>
              </div>
              <p className="text-xs text-gray-600">{c.how}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & AI callout */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
        <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Phase 1 Principles</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Zero AI / GPT', desc: 'No feature in Phase 1 uses AI. All logic is rule-based.' },
            { label: 'On-device Voice', desc: 'expo-av; no audio sent to cloud; transcript discarded after use.' },
            { label: 'GDPR Compliant', desc: 'Dietary/allergy data = Article 9 sensitive; explicit consent required.' },
            { label: 'Scraper Respect', desc: 'Max 5 pages/min; rotating User-Agent; only public URLs transmitted.' },
          ].map((p) => (
            <div key={p.label} className="bg-white border border-gray-200 rounded-lg px-3 py-2">
              <p className="text-xs font-bold text-gray-800 mb-0.5">{p.label}</p>
              <p className="text-[11px] text-gray-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
