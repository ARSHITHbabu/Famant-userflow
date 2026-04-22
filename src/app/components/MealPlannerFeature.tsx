import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChefHat, Search, BookOpen, CalendarDays,
  ShoppingCart, Clock, Mic, ChevronDown, ChevronUp,
  ArrowRight, Settings, Eye, Users,
  Smartphone, Layers, GitBranch, Network,
  DollarSign, Link, PenLine, AlertTriangle,
} from 'lucide-react';

// ─── Reusable phone shell ──────────────────────────────────────────────────────

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
      <div
        className={`relative flex flex-col rounded-[2rem] border-[3px] shadow-xl overflow-hidden w-32 bg-gray-800 ${accent}`}
      >
        {/* Status bar */}
        <div className="bg-gray-800 flex justify-between items-center px-2 py-1">
          <span className="text-[6px] text-gray-400">9:41</span>
          <div className="w-6 h-1.5 bg-gray-600 rounded-full" />
          <span className="text-[6px] text-gray-400">●●</span>
        </div>
        <div className="bg-white overflow-hidden flex-1">{children}</div>
        {/* Home indicator */}
        <div className="bg-gray-800 flex justify-center py-1">
          <div className="w-10 h-0.5 bg-gray-500 rounded-full" />
        </div>
      </div>
      {label && (
        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-800 max-w-[128px] leading-tight">{label}</p>
          {sublabel && <p className="text-[9px] text-gray-500 max-w-[128px]">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 px-1 shrink-0">
      {label && <span className="text-[8px] text-gray-500 font-medium text-center max-w-[56px] leading-tight">{label}</span>}
      <ArrowRight className="w-5 h-5 text-gray-300" />
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — UI SCREEN ZONES (ALL MEAL PLANNER SCREENS)
// ═══════════════════════════════════════════════════════════════════════════════

const screenZoneData = [
  {
    id: 'sz-dashboard',
    label: 'Dashboard — "What Are We Eating Today?" Widget',
    color: 'bg-indigo-100 border-indigo-400',
    zones: [
      { name: 'Widget Header', desc: '"What are we eating today?" title with fork-knife icon and ">" arrow linking to full Meal Planner screen' },
      { name: 'Meal Rows', desc: 'One row per meal slot for today: food emoji + recipe name + meal type label (Breakfast / Lunch / Dinner / Snack)\nRows listed in time order; greyed-out once their time window has passed' },
      { name: 'Time-based Disappear Logic', desc: 'Each row auto-fades once its meal window ends (e.g. Breakfast row greyed at 11am, removed next morning)\nWidget itself hides at end of day; reappears at midnight with next day\'s meals' },
      { name: 'NOT in Calendar', desc: 'Meal plan entries are NEVER written to the Calendar module. They appear only in this Dashboard widget and the Meal Planner screen. Calendar remains for events, appointments, and tasks only.' },
      { name: 'Tap Behaviour', desc: 'Tapping the widget header → opens Meal Planner screen\nTapping a specific meal row → opens that recipe\'s detail page' },
    ],
  },
  {
    id: 'sz-settings',
    label: 'Meal Settings',
    color: 'bg-rose-100 border-rose-400',
    zones: [
      { name: 'Member List', desc: 'Scrollable list of all family members; tap to expand dietary profile' },
      { name: 'Dietary Profile Per Member', desc: 'Allergies (multi-select tags), dislikes (free text chips), dietary flags: vegetarian / vegan / gluten-free / dairy-free' },
      { name: 'Family Defaults', desc: 'Default servings slider, shopping day picker, preferred stores (multi-select)' },
      { name: 'Category-to-Store Mapping', desc: 'Drag-and-drop assignment of grocery categories (Produce → Store A, Meat → Store B)' },
      { name: 'Weekend Dessert Toggle', desc: 'Switch adds Dessert row to Saturday and Sunday columns in planner grid' },
    ],
  },
  {
    id: 'sz-recipe-search',
    label: 'Recipe Search',
    color: 'bg-amber-100 border-amber-400',
    zones: [
      { name: 'Search Bar', desc: 'Full-width search input with keyboard auto-open; placeholder: "Search by dish or ingredient"' },
      { name: 'Filter Bar', desc: 'Horizontal scrollable chips: All, Quick (<30m), Vegetarian, Gluten-Free, Cuisine tags' },
      { name: 'Results Grid', desc: 'Card: recipe image + title + source site + cook time + difficulty dot; tap opens Recipe Detail' },
      { name: 'Import URL Button', desc: '"Import from URL" shortcut in header top-right' },
      { name: 'Create Manual Button', desc: '"+ Create" FAB bottom-right' },
      { name: 'Empty State', desc: 'Illustration + "No results — try a different query" message' },
    ],
  },
  {
    id: 'sz-recipe-detail',
    label: 'Recipe Detail & Review',
    color: 'bg-amber-100 border-amber-400',
    zones: [
      { name: 'Hero Image', desc: 'Recipe photo full-width at top; placeholder illustration if none' },
      { name: 'Meta Bar', desc: 'Cook time · Prep time · Difficulty · Servings · Cuisine · Meal type' },
      { name: 'Allergy Flag Banner', desc: 'Auto-generated from ingredient ↔ family profile matching; amber or red' },
      { name: 'Dietary Tags', desc: 'Auto-suggested flags user must confirm before saving' },
      { name: 'Ingredients List', desc: 'Structured rows: quantity + unit + ingredient name; editable before save' },
      { name: 'Steps List', desc: 'Numbered steps; draggable to reorder; long-tap to edit' },
      { name: 'Save CTA', desc: '"Save to Library" primary button; "Discard" text link' },
    ],
  },
  {
    id: 'sz-library',
    label: 'Recipe Library',
    color: 'bg-green-100 border-green-400',
    zones: [
      { name: 'Tab Bar', desc: 'All · Favourites · Breakfast · Lunch · Dinner · Snacks · Desserts · Cuisine' },
      { name: 'Sort / View', desc: 'Sort picker (Newest / Most Used / A–Z / Shortest) · Grid / List view toggle' },
      { name: 'Search Bar', desc: 'Full-text search on title, ingredients, tags — no network call' },
      { name: 'Recipe Cards', desc: 'Grid: image + name + cook time + difficulty + ♥ favourite toggle\nList: compact row with same fields' },
      { name: 'Context Menu (3-dot)', desc: '"Plan this again" · "More like this" · Edit · Copy · Delete' },
      { name: 'Cold Start State', desc: 'Prompts user to add ≥3 recipes before Meal Planner tab is unlocked' },
      { name: 'Child Role View', desc: 'Kids can browse the full library and view recipe detail — read-only, no edit or delete' },
    ],
  },
  {
    id: 'sz-planner',
    label: 'Meal Planner — Weekly Calendar',
    color: 'bg-indigo-100 border-indigo-400',
    zones: [
      { name: 'Header', desc: 'Screen title · Draft/Published badge · Settings shortcut · Grocery cart shortcut' },
      { name: 'Week Navigator', desc: '← Previous / Next → arrows · "Week of [date]" label' },
      { name: 'Day Headers', desc: 'Mon–Sun + date; today highlighted' },
      { name: 'Meal Slot Grid', desc: 'Rows: Breakfast · Morning Snack · Lunch · Evening Snack · Dinner · Dessert (Sat/Sun optional)\nFilled: recipe name + time + difficulty · Empty: dashed + tap target' },
      { name: 'Slot Context Menu', desc: 'Tap filled slot: view detail · replace · mark leftover · set repeating · remove' },
      { name: 'Bottom Sheet (slot picker)', desc: '"Pick from library" tab · "Search" tab (inline scraper)' },
      { name: 'Repeating Meal Toggle', desc: 'Per-slot toggle: "Repeat weekly" — when ON, slot auto-fills the same recipe every week until manually changed or turned off\nRepeating slots are visually marked with a ↺ icon' },
      { name: 'Allergy Alert Overlay', desc: 'Hard red blocking modal · amber soft warning inline' },
      { name: 'Approval Toggle (Adults)', desc: 'Admin/Parent can enable "Require approval from family" toggle per week\nWhen enabled: adult Member role family members see an "Approve" / "Suggest change" action on the published plan\nPlan is considered family-confirmed once all Adults approve\nKids excluded from approval — view-only only' },
      { name: 'Publish Bar', desc: '"Approve & Share with Family" sticky bar at bottom; disabled if plan is empty\nIf approval required: shows approval status per adult member' },
      { name: 'Not in Calendar', desc: 'Meal plans do NOT appear in the Calendar module. Dashboard widget only.' },
      { name: 'Child Role View', desc: 'Published plan shown read-only — no +, no context menu, no publish bar\nRecipe cards are tappable: kids can view full recipe detail' },
    ],
  },
  {
    id: 'sz-grocery',
    label: 'Grocery List',
    color: 'bg-teal-100 border-teal-400',
    zones: [
      { name: 'Header', desc: '"Grocery — Week N" title · Store filter chip row' },
      { name: 'Category Sections', desc: 'Collapsible sections: Produce · Meat & Fish · Dairy · Bakery · Pantry · Frozen · Beverages · Household' },
      { name: 'Item Rows', desc: 'Checkbox · quantity + unit · ingredient name · store badge\nLong-tap: reassign store · edit quantity · delete' },
      { name: 'Voice Mic Button', desc: 'Floating mic FAB — "Add milk to grocery list" / "Mark eggs as done"' },
      { name: 'Add Item Manually', desc: '"+ Add item" at bottom of each category section' },
      { name: 'Progress Bar', desc: 'X of Y items checked — shown at top below header' },
      { name: 'Sharing', desc: 'Shared automatically in Lists module; family members see live updates' },
      { name: 'Expense — Scan Receipt (OCR)', desc: '"Scan receipt" button in header or bottom bar\nCamera opens → OCR reads store name, items, quantities, total amount\nExtracted line items matched against grocery list; unmatched items flagged\nUser confirms and saves to Expense Tracker module as "Grocery — Week N"' },
      { name: 'Expense — Manual Entry', desc: '"Add expense" option: user types store name + total amount (or per-item breakdown)\nSaved to Expense Tracker with category: Grocery and source_meal_plan_id linked' },
    ],
  },
];

function MealPlannerUIScreenZones() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-1">
        <Layers className="w-5 h-5 text-green-600" />
        <h2 className="text-xl font-bold text-gray-900">UI Screen Zones — Meal Planner</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Every zone in every Meal Planner screen. Click a screen to see its zone breakdown.
      </p>
      <div className="space-y-2">
        {screenZoneData.map((s) => {
          const isOpen = selected === s.id;
          return (
            <div key={s.id}>
              <motion.div
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${s.color} ${isOpen ? 'ring-2 ring-offset-1 ring-indigo-400' : ''}`}
                onClick={() => setSelected(isOpen ? null : s.id)}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-900 text-sm">{s.label}</p>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-gray-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-600 shrink-0" />}
                </div>
              </motion.div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 mt-1 mb-2 space-y-1">
                      {s.zones.map((z, i) => (
                        <motion.div
                          key={z.name}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="flex items-start gap-2 bg-white border border-gray-100 rounded-lg px-3 py-1.5"
                        >
                          <span className="text-indigo-400 shrink-0 mt-0.5">•</span>
                          <div>
                            <span className="text-xs font-bold text-gray-800">{z.name}</span>
                            <span className="text-xs text-gray-500"> — {z.desc}</span>
                          </div>
                        </motion.div>
                      ))}
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

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — FEATURE MAP
// ═══════════════════════════════════════════════════════════════════════════════

const featureMapData = [
  {
    id: 'fm-settings',
    title: 'Meal Settings & Dietary Profile',
    icon: Settings,
    color: 'bg-rose-100 border-rose-300',
    tag: 'PREREQUISITE',
    tagColor: 'bg-rose-700 text-white',
    subfeatures: [
      'Per-member dietary profile: allergies[], dislikes[], dietary flags (vegetarian / vegan / gluten-free / dairy-free)',
      'Family defaults: servings count, preferred shopping day, preferred stores',
      'Category-to-store mapping (Produce → Tesco, Meat → Butcher) — persists across weeks',
      'Weekend dessert slot toggle — adds Dessert row to Sat & Sun planner columns',
      'Must be configured before allergy check engine can gate recipe assignments',
      'Admin and parent roles can edit; Member Adults can edit their own profile',
    ],
  },
  {
    id: 'fm-recipes',
    title: 'Feature 1 — Recipes (3 Paths)',
    icon: ChefHat,
    color: 'bg-amber-100 border-amber-300',
    tag: 'RECIPES',
    tagColor: 'bg-amber-600 text-white',
    subfeatures: [
      'Path A — Scraper Search: query by dish / ingredient; backend ScraperService (JSON-LD + HTML fallback); max 5 pages/min; rotating User-Agent',
      'Path B — Import from URL: paste any recipe link; structured {name, quantity, unit} normalisation; source_url preserved for attribution',
      'Path C — Manual Creation: blank form; drag-to-reorder steps; auto-suggested dietary flags matched against family profile',
      'All three paths converge at Recipe Detail & Review before saving to Library',
      'Edit any saved recipe — allergy check re-runs on all planner slots using that recipe',
      'All filtering and flag detection is client-side. Zero AI or GPT in Phase 1.',
    ],
  },
  {
    id: 'fm-library',
    title: 'Feature 2 — Recipe Library',
    icon: BookOpen,
    color: 'bg-green-100 border-green-300',
    tag: 'LIBRARY',
    tagColor: 'bg-green-700 text-white',
    subfeatures: [
      'Default view: all saved recipes, newest first',
      'Sort: Newest / Most Used / A–Z / Shortest cook time',
      'Filter tabs: All · Favourites · Breakfast · Lunch · Dinner · Snacks · Desserts · Cuisine',
      'Full-text search on title, ingredients, and tags — no network call',
      'Grid or list view toggle',
      '"Plan this again" / "More like this" / Copy recipe shortcuts on each card',
      'Favourites toggle is per-user — does not affect other family members',
      'Child role (kids): can browse and view full recipe detail — read-only, no edit/delete',
      'Cold start: onboarding prompts ≥3 recipes added before Meal Planner unlocks',
    ],
  },
  {
    id: 'fm-planner',
    title: 'Feature 3 — Meal Planner (Weekly Grid)',
    icon: CalendarDays,
    color: 'bg-indigo-100 border-indigo-300',
    tag: 'PLANNER',
    tagColor: 'bg-indigo-600 text-white',
    subfeatures: [
      '7-column weekly grid: Mon–Sun · Rows: Breakfast / Morning Snack / Lunch / Evening Snack / Dinner / optional Weekend Dessert',
      'Each slot: recipe name · cook time · difficulty dot · allergy note icon',
      'Tap empty (+) → bottom sheet: "Pick from library" or "Search inline" via scraper',
      'Servings override per slot (defaults to family setting)',
      'Leftover toggle per slot — suppresses those ingredients from grocery list generation',
      'Allergy check on every assignment: hard red blocking alert OR soft amber non-blocking warning',
      'Substitution hints from pre-authored lookup table (dairy milk → oat milk)',
      'Repeating meal toggle per slot: ↺ icon marks it; auto-fills same recipe every week until changed',
      'Draft → Published flow: parent creates in Draft (only they see it); publish notifies whole family',
      'Approval toggle (optional, per week): admin/parent can require adult members to approve the plan; approval status shown per member; kids excluded',
      'Meal plan does NOT appear in the Calendar module — visible only in Dashboard widget and Meal Planner screen',
      'Child role (kids): view published plan as read-only; can tap recipe to see full detail',
    ],
  },
  {
    id: 'fm-grocery',
    title: 'Feature 4 — Grocery List & Store Management',
    icon: ShoppingCart,
    color: 'bg-teal-100 border-teal-300',
    tag: 'GROCERY',
    tagColor: 'bg-teal-600 text-white',
    subfeatures: [
      'One-tap generation from weekly planner — extracts all recipe ingredients',
      'Skips ingredients from leftover-marked slots',
      'Merges duplicates by summing quantities where unit matches (200g + 300g chicken → 500g)',
      'Auto-categorisation: Produce / Meat & Fish / Dairy / Bakery / Pantry / Frozen / Beverages / Household',
      'Category-to-store mapping applied by default; user can reassign per item',
      'Auto-creates "Grocery shopping — Week N" task (due on preferred shopping day) in Tasks module',
      'Creates shared List entity in Lists module (source_meal_plan_id linked) — visible to whole family',
      'Live check-off sync: any family member can check items while shopping',
      'Expense: "Scan receipt" (OCR) — camera reads store receipt; extracted amounts auto-saved to Expense Tracker as "Grocery — Week N"',
      'Expense: "Add manually" — type store + total/per-item; saved with source_meal_plan_id and category: Grocery',
    ],
  },
  {
    id: 'fm-dashboard',
    title: 'Feature 5 — Dashboard Meal Widget',
    icon: Clock,
    color: 'bg-orange-100 border-orange-300',
    tag: 'DASHBOARD',
    tagColor: 'bg-orange-600 text-white',
    subfeatures: [
      '"What are we eating today?" widget shows today\'s meals in time order (Breakfast / Lunch / Dinner / Snack)',
      'Each row greys out once its meal window ends; widget resets at midnight with next day\'s meals',
      'Tapping widget header → Meal Planner screen; tapping a meal row → recipe detail page',
      'Morning notification (default 7:30am): today\'s meals summary sent to all family members',
      'Grocery reminder on shopping day if list has unchecked items',
      'Meal plan is NOT written to Calendar module — widget display only',
      'All logic rule-based. No AI.',
    ],
  },
  {
    id: 'fm-voice',
    title: 'Feature 6 — Voice Input',
    icon: Mic,
    color: 'bg-violet-100 border-violet-300',
    tag: 'VOICE',
    tagColor: 'bg-violet-600 text-white',
    subfeatures: [
      'On-device speech-to-text via expo-av — no audio transmitted to cloud; transcript discarded after use',
      'Commands: "Add milk to grocery list" · "Mark eggs as done" · "Assign Tesco to dairy" · "What\'s for dinner tonight?"',
      'Keyword matching only — calls same tRPC endpoints as UI actions',
      'expo-speech reads confirmation aloud: "Milk added to your grocery list" (on-device, free)',
      'MVP limitation: fixed patterns only — no NLP, no synonym handling (capsicum ≠ bell pepper)',
      'Full natural language → Phase 2 Premium (Gemini 2.0 Flash Meal Agent)',
      'GDPR: no audio stored; dietary data requires explicit Article 9 consent',
    ],
  },
  {
    id: 'fm-expense',
    title: 'Feature 7 — Expense Integration (Grocery → Expense Tracker)',
    icon: DollarSign, Link, PenLine, AlertTriangle,
    color: 'bg-emerald-100 border-emerald-300',
    tag: 'EXPENSE',
    tagColor: 'bg-emerald-700 text-white',
    subfeatures: [
      'Accessible from Grocery List screen via "Add expense" or "Scan receipt" actions',
      'OCR Receipt Scan: camera opens → reads store name, line items, quantities, total; matched against grocery list; unmatched items flagged for review',
      'Manual Entry: user types store name + total amount or per-item breakdown; no camera needed',
      'Saved expense includes: amount, store name, date, category: Grocery, source_meal_plan_id, week number',
      'Expense saved to Expense Tracker module — visible in family spending overview and member spending breakdown',
      'Enables weekly/monthly food budget tracking: how much was spent on groceries per meal plan',
      'Multiple receipts per week supported (e.g. Tesco + Butcher both scanned)',
      'All family members can add grocery expenses; visible to Admin in Expense Tracker',
    ],
  },
  {
    id: 'fm-roles',
    title: 'Roles & Permissions in Meal Planner',
    icon: Users,
    color: 'bg-gray-100 border-gray-300',
    tag: 'PERMISSIONS',
    tagColor: 'bg-gray-700 text-white',
    subfeatures: [
      'Admin / Parent: create & edit recipes, assign planner slots, publish plan, set approval requirement, generate grocery list, manage dietary profiles',
      'Member (Adult): create & edit own recipes, view and pick from library, view published plan, approve/suggest changes on plan when approval is required — cannot publish',
      'Child role (kids): browse Recipe Library (read-only), view full Recipe Detail, view published Meal Plan, check off grocery items — cannot add, edit, approve, or publish',
      'All roles: check off grocery list items; use Voice Input for grocery commands',
      'Approval flow (when enabled): admin sends plan for approval → adult members tap Approve or Suggest Change → admin sees status per member → confirms final plan',
      'Personal layer: private recipes not shared with family unless explicitly marked shared',
    ],
  },
];

function MealPlannerFeatureMapSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const toggle = (id: string) => {
    setExpanded(expanded === id ? null : id);
    setSelected(id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-1">
        <GitBranch className="w-5 h-5 text-amber-600" />
        <h2 className="text-xl font-bold text-gray-900">Feature Map — Meal Planner</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">All features, sub-features, and role permissions. Click to expand.</p>
      <div className="space-y-2">
        {featureMapData.map((f) => {
          const isOpen = expanded === f.id;
          return (
            <div key={f.id}>
              <motion.div
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${f.color} ${selected === f.id ? 'ring-2 ring-offset-1 ring-indigo-500' : ''}`}
                onClick={() => toggle(f.id)}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <f.icon className="w-4 h-4 shrink-0" />
                    <span className="font-semibold text-gray-900 text-sm">{f.title}</span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${f.tagColor}`}>{f.tag}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-gray-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-600 shrink-0" />}
                </div>
              </motion.div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-6 mt-2 mb-1 space-y-1">
                      {f.subfeatures.map((sub, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="text-sm text-gray-700 flex items-start"
                        >
                          <span className="text-green-600 mr-2 shrink-0 mt-0.5">→</span>
                          <span>{sub}</span>
                        </motion.div>
                      ))}
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

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — CROSS MODULE CONNECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

const crossModuleData = [
  {
    from: 'Meal Planner', to: 'Grocery List',
    color: 'border-teal-400 bg-teal-50',
    trigger: '"Generate grocery list" button tapped',
    what: 'Extracts all recipe ingredients for the week; merges duplicates; creates List entity with source_meal_plan_id',
    dataFlow: 'meal_plan_id → recipe_ids → ingredients[] → merged_list',
  },
  {
    from: 'Grocery List', to: 'Tasks Module',
    color: 'border-blue-400 bg-blue-50',
    trigger: 'Grocery list generated',
    what: 'Auto-creates Task: "Grocery shopping — Week N", due on preferred shopping day from Meal Settings',
    dataFlow: 'list_id + shopping_day → task_entity',
  },
  {
    from: 'Grocery List', to: 'Lists Module',
    color: 'border-green-400 bg-green-50',
    trigger: 'Grocery list generated',
    what: 'Creates a shared family List visible to all members; live check-off sync in real-time',
    dataFlow: 'list_entity(source_meal_plan_id) → shared_lists collection',
  },
  {
    from: 'Meal Planner (Publish)', to: 'Dashboard Widget',
    color: 'border-indigo-400 bg-indigo-50',
    trigger: 'Parent taps "Approve & Share with Family"',
    what: '"What are we eating today?" widget on Dashboard shows today\'s meals in order. Each row auto-greys once its meal window passes; widget resets at midnight. Meal plan does NOT appear in Calendar module.',
    dataFlow: 'published_plan → time_window_check → widget rows (greyed as time passes)',
  },
  {
    from: 'Meal Planner (Publish)', to: 'Push Notifications',
    color: 'border-indigo-300 bg-indigo-50',
    trigger: 'Plan status changes Draft → Published',
    what: 'Push notification sent to all family members: "This week\'s meal plan is ready 🍽"',
    dataFlow: 'family_member_ids → FCM push',
  },
  {
    from: 'Dashboard Widget', to: 'Recipe Detail',
    color: 'border-orange-400 bg-orange-50',
    trigger: 'User taps a meal row in "What are we eating today?" widget',
    what: 'Opens the recipe detail page for that meal — ingredients, steps, and meta info. Cooking approach is up to the individual.',
    dataFlow: 'meal_row(recipe_id) → recipe_detail screen',
  },
  {
    from: 'Recipe (edit)', to: 'Meal Planner',
    color: 'border-rose-400 bg-rose-50',
    trigger: 'User saves edits to a recipe that is already assigned in one or more planner slots',
    what: 'Allergy check engine re-runs on every slot using that recipe; alerts shown if new conflicts',
    dataFlow: 'recipe_id → find planner slots → re-run allergy_check()',
  },
  {
    from: 'Voice Input', to: 'Grocery List',
    color: 'border-violet-400 bg-violet-50',
    trigger: '"Add [item]" / "Mark [item] as done" voice command',
    what: 'Keyword parser calls same tRPC endpoints as UI; expo-speech reads confirmation aloud',
    dataFlow: 'speech → keyword_match → tRPC mutation → list update',
  },
  {
    from: 'Voice Input', to: 'Meal Planner',
    color: 'border-violet-300 bg-violet-50',
    trigger: '"What\'s for dinner tonight?" voice command',
    what: 'Returns the current day\'s dinner slot recipe name via expo-speech read-aloud',
    dataFlow: 'speech → keyword_match → tRPC query → speech output',
  },
  {
    from: 'Meal Settings', to: 'Allergy Check Engine',
    color: 'border-rose-300 bg-rose-50',
    trigger: 'Any recipe is assigned to a planner slot',
    what: 'dietary_profile (allergies[], dislikes[]) used as input for every slot assignment; no AI — pure string matching',
    dataFlow: 'dietary_profile[] + recipe.ingredients[] → string_match → alert level',
  },
  {
    from: 'Meal Settings', to: 'Grocery List',
    color: 'border-teal-300 bg-teal-50',
    trigger: 'Grocery list generated',
    what: 'category_to_store_mapping and shopping_day from Meal Settings applied automatically to new grocery list',
    dataFlow: 'family_settings → list_generation defaults',
  },
  {
    from: 'Grocery List', to: 'Expense Tracker Module',
    color: 'border-emerald-400 bg-emerald-50',
    trigger: 'User taps "Scan receipt" (OCR) or "Add expense" (manual)',
    what: 'OCR reads store receipt and saves extracted line items + total to Expense Tracker. Manual entry saves typed amount. Both tagged with source_meal_plan_id, category: Grocery, week number.',
    dataFlow: 'receipt_image → OCR → line_items[] + total → expense_entity(meal_plan_id)',
  },
  {
    from: 'Expense Tracker Module', to: 'Family Spending Overview',
    color: 'border-emerald-300 bg-emerald-50',
    trigger: 'Expense saved from Grocery List',
    what: 'Expense visible in Expense Tracker: weekly food spend, per-store breakdown, budget vs actual. Admin can see all family grocery expenses; members see their own.',
    dataFlow: 'expense_entities(category=Grocery) → budget_tracker → spending_dashboard',
  },
  {
    from: 'Meal Planner', to: 'Calendar Module',
    color: 'border-red-300 bg-red-50',
    trigger: 'N/A — intentionally NOT connected',
    what: 'Meal plan entries are NEVER written to Calendar. Calendar is reserved for events, appointments, and task deadlines only. Meals appear exclusively in the Dashboard widget and Meal Planner screen.',
    dataFlow: 'No data flow. Explicit design decision.',
  },
];

function MealPlannerCrossModuleConnections() {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-1">
        <Network className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Cross-Module Connections</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Every integration point between Meal Planner and the rest of Famant — trigger, data transferred, and destination.
      </p>
      <div className="space-y-2">
        {crossModuleData.map((c, i) => (
          <div key={i} className={`border-l-4 rounded-r-xl p-3 ${c.color}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-gray-800">{c.from}</span>
              <ArrowRight className="w-3 h-3 text-gray-400 shrink-0" />
              <span className="text-xs font-bold text-gray-900">{c.to}</span>
            </div>
            <p className="text-[11px] text-gray-700 mb-0.5"><span className="font-semibold">Trigger:</span> {c.trigger}</p>
            <p className="text-[11px] text-gray-700 mb-0.5"><span className="font-semibold">What happens:</span> {c.what}</p>
            <p className="text-[10px] text-gray-400 font-mono">{c.dataFlow}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — INTERACTIVE PHONE FLOW DIAGRAM
// ═══════════════════════════════════════════════════════════════════════════════

type PhoneScreen = {
  id: string;
  label: string;
  sublabel: string;
  accent: string;
  arrowLabel?: string;
  content: React.ReactNode;
};

function MealSettingsDetailPhone() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 380 }}>
      {/* Header */}
      <div className="bg-rose-600 px-2 py-1.5 flex items-center justify-between">
        <span className="text-white text-[7px]">←</span>
        <span className="text-white text-[7px] font-bold">Meal Settings</span>
        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <span className="text-rose-600 text-[8px] font-black leading-none">✓</span>
            </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-hidden px-1.5 py-1 space-y-1.5">

        {/* Block 1: Dietary Profile */}
        <div className="bg-rose-50 border border-rose-100 rounded-lg p-1.5">
          <p className="text-[5.5px] font-bold text-rose-700 uppercase tracking-wide mb-1">Dietary Profile</p>
          {/* Diet type */}
          <p className="text-[5px] font-semibold text-gray-500 mb-0.5">Diet Type</p>
          <div className="flex flex-wrap gap-0.5 mb-1">
            {['Omnivore','Vegetarian','Pescatarian','Vegan'].map((d,i) => (
              <span key={d} className={`text-[4px] rounded-full px-1 py-0.5 border ${i===0?'bg-orange-400 text-white border-orange-400':'bg-white text-gray-500 border-gray-200'}`}>{d}</span>
            ))}
          </div>
          {/* Allergies */}
          <p className="text-[5px] font-semibold text-gray-500 mb-0.5">Allergies</p>
          <div className="flex flex-wrap gap-0.5 mb-1">
            {[{l:'🥜 Nuts',on:true},{l:'🌾 Gluten',on:true},{l:'🫘 Soy',on:false}].map(a => (
              <span key={a.l} className={`text-[4px] rounded-full px-1 py-0.5 border ${a.on?'bg-red-100 text-red-700 border-red-200':'bg-white text-gray-400 border-gray-200'}`}>{a.l}</span>
            ))}
          </div>
          {/* Intolerance */}
          <p className="text-[5px] font-semibold text-gray-500 mb-0.5">Intolerance</p>
          <div className="flex flex-wrap gap-0.5 mb-1">
            {[{l:'🥛 Lactose',on:true},{l:'FODMAP',on:false}].map(a => (
              <span key={a.l} className={`text-[4px] rounded-full px-1 py-0.5 border ${a.on?'bg-yellow-100 text-yellow-700 border-yellow-200':'bg-white text-gray-400 border-gray-200'}`}>{a.l}</span>
            ))}
          </div>
          {/* Dislikes */}
          <p className="text-[5px] font-semibold text-gray-500 mb-0.5">Dislikes</p>
          <div className="flex items-center gap-1">
            <div className="flex-1 bg-white border border-gray-200 rounded-full px-1 py-0.5 flex items-center gap-0.5">
              <span className="text-[4px] text-gray-400">🔍 Search…</span>
            </div>
            <div className="w-3.5 h-3.5 bg-rose-500 rounded-full flex items-center justify-center shrink-0">
              <span className="text-white text-[8px] leading-none">+</span>
            </div>
          </div>
        </div>

        {/* Block 2: Weekday Schedule */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-1.5">
          <p className="text-[5.5px] font-bold text-blue-700 uppercase tracking-wide mb-1">Weekdays Mon–Fri</p>
          <p className="text-[4px] text-blue-500 mb-0.5">Select at least one</p>
          <div className="flex flex-wrap gap-0.5">
            {[{l:'Breakfast',on:true},{l:'Lunch',on:true},{l:'Dinner',on:true},{l:'Snack',on:false},{l:'Eve Snack',on:false}].map(m => (
              <span key={m.l} className={`text-[4px] rounded-full px-1 py-0.5 border ${m.on?'bg-blue-500 text-white border-blue-500':'bg-white text-gray-400 border-gray-200'}`}>{m.l}</span>
            ))}
          </div>
        </div>

        {/* Block 3: Weekend Schedule */}
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-1.5">
          <p className="text-[5.5px] font-bold text-purple-700 uppercase tracking-wide mb-1">Weekends Sat–Sun</p>
          <p className="text-[4px] text-purple-400 mb-0.5">Select at least one</p>
          <div className="flex flex-wrap gap-0.5">
            {[{l:'Breakfast',on:true},{l:'Lunch',on:false},{l:'Dinner',on:true},{l:'Snack',on:true},{l:'Eve Snack',on:false}].map(m => (
              <span key={m.l} className={`text-[4px] rounded-full px-1 py-0.5 border ${m.on?'bg-purple-500 text-white border-purple-500':'bg-white text-gray-400 border-gray-200'}`}>{m.l}</span>
            ))}
          </div>
        </div>

        {/* Block 4: Servings */}
        <div className="bg-green-50 border border-green-100 rounded-lg p-1.5">
          <p className="text-[5.5px] font-bold text-green-700 uppercase tracking-wide mb-1">No. of Servings</p>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-white border border-gray-200 rounded flex items-center justify-center">
              <span className="text-[9px] text-gray-500 leading-none">−</span>
            </div>
            <div className="flex-1 bg-white border border-green-200 rounded text-center py-0.5">
              <span className="text-[8px] font-bold text-gray-800">4</span>
            </div>
            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
              <span className="text-[9px] text-white leading-none font-bold">+</span>
            </div>
          </div>
        </div>

        {/* Block 5: Meal Plan Options */}
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-1.5">
          <p className="text-[5.5px] font-bold text-amber-700 uppercase tracking-wide mb-1">Meal Plan Options</p>
          <div className="flex items-center justify-between">
            <span className="text-[5px] text-gray-700">🍰 Dessert Suggestions</span>
            <div className="w-7 h-3.5 bg-orange-400 rounded-full flex items-center justify-end px-0.5">
              <div className="w-2.5 h-2.5 bg-white rounded-full shadow" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function MealSettingsPhone() {
  return (
    <div className="flex flex-col" style={{ minHeight: 200 }}>
      <div className="bg-rose-700 px-2 py-1.5">
        <p className="text-white text-[8px] font-bold">⚙ Meal Settings</p>
      </div>
      <div className="p-1.5 space-y-1 flex-1">
        {['Alice', 'Bob', 'Lily (kid)'].map((m, i) => (
          <div key={i} className="bg-rose-50 rounded p-1">
            <p className="text-[7px] font-bold text-gray-800">{m}</p>
            <div className="flex gap-0.5 mt-0.5 flex-wrap">
              {i === 0 && <span className="text-[5px] bg-red-200 rounded px-0.5">🥜 Nuts</span>}
              {i === 1 && <span className="text-[5px] bg-blue-200 rounded px-0.5">🥛 Dairy-free</span>}
              {i === 2 && <span className="text-[5px] bg-green-200 rounded px-0.5">👁 View only</span>}
            </div>
          </div>
        ))}
        <div className="bg-gray-100 rounded p-1 mt-1">
          <p className="text-[6px] text-gray-600">Shopping day: <strong>Saturday</strong></p>
          <p className="text-[6px] text-gray-600">Servings: <strong>4</strong></p>
        </div>
      </div>
    </div>
  );
}

function RecipeSearchPhone() {
  return (
    <div className="flex flex-col" style={{ minHeight: 200 }}>
      <div className="bg-amber-600 px-2 py-1.5">
        <p className="text-white text-[8px] font-bold">🔍 Recipe Search</p>
      </div>
      <div className="p-1.5">
        <div className="bg-gray-100 rounded-full px-2 py-1 flex items-center gap-1 mb-1.5">
          <Search className="w-2 h-2 text-gray-400" />
          <span className="text-[7px] text-gray-400">chicken pasta…</span>
        </div>
        <div className="flex gap-1 mb-1.5">
          {['All', '<30m', 'Veg'].map(t => (
            <span key={t} className="text-[5px] bg-amber-100 border border-amber-300 rounded-full px-1">{t}</span>
          ))}
        </div>
        {['Creamy Chicken Pasta', 'Lemon Garlic Salmon', 'Veggie Stir Fry'].map((r, i) => (
          <div key={i} className="flex items-center gap-1 bg-white border border-gray-100 rounded p-1 mb-1">
            <div className="w-5 h-5 bg-amber-100 rounded shrink-0" />
            <div>
              <p className="text-[6px] font-bold text-gray-800">{r}</p>
              <p className="text-[5px] text-gray-400">{25 + i * 10}m · {['Easy', 'Med', 'Easy'][i]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecipeLibraryPhone() {
  return (
    <div className="flex flex-col" style={{ minHeight: 200 }}>
      <div className="bg-green-700 px-2 py-1.5">
        <p className="text-white text-[8px] font-bold">📚 Recipe Library</p>
      </div>
      <div className="p-1.5">
        <div className="flex gap-0.5 mb-1.5 overflow-hidden">
          {['All', 'Fav', 'Lunch', 'Dinner'].map((t, i) => (
            <span key={t} className={`text-[5px] rounded-full px-1 py-0.5 whitespace-nowrap ${i === 0 ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'}`}>{t}</span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1">
          {['Pasta', 'Salmon', 'Stir Fry', 'Curry'].map((r, i) => (
            <div key={i} className="bg-green-50 border border-green-100 rounded p-1">
              <div className="w-full h-4 bg-green-200 rounded mb-0.5" />
              <p className="text-[6px] font-bold text-gray-800">{r}</p>
              <div className="flex items-center justify-between">
                <p className="text-[5px] text-gray-400">{25 + i * 10}m</p>
                <span className="text-[7px]">{i < 2 ? '♥' : '♡'}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[5px] text-gray-400 mt-1 text-center">Kids: view-only · no edit</p>
      </div>
    </div>
  );
}

function MealPlannerPhone() {
  return (
    <div className="flex flex-col" style={{ minHeight: 200 }}>
      {/* App header */}
      <div className="bg-white px-2 py-1 border-b border-gray-100 flex justify-between items-center">
        <span className="text-[6px]">🏠</span>
        <p className="text-[7px] font-bold text-gray-800">Family meals</p>
        <div className="flex gap-1">
          <span className="text-[6px]">🛒</span>
          <span className="text-[6px]">⋯</span>
        </div>
      </div>
      {/* Week nav */}
      <div className="bg-gray-50 px-2 py-0.5 flex justify-between items-center border-b border-gray-100">
        <span className="text-[6px] text-gray-500">‹</span>
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center">
            <span className="text-[6px] font-bold text-gray-700">This week</span>
            <span className="text-[4px] bg-yellow-400 text-gray-800 rounded px-0.5">Draft</span>
          </div>
          <span className="text-[5px] text-gray-400">4/20–4/26</span>
        </div>
        <span className="text-[6px] text-gray-500">›</span>
      </div>
      {/* Day section */}
      <div className="px-1.5 py-1 flex-1 overflow-hidden">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span className="text-[6px] font-bold text-gray-800">Monday 4/20</span>
          </div>
          <span className="text-[5px] text-gray-400">⋯</span>
        </div>
        {/* Meal cards */}
        {[
          { type: 'Breakfast', emoji: '🥣', name: 'Overnight Oats', time: '8:00 am', diff: 'Easy', active: false },
          { type: 'Lunch', emoji: '🥗', name: 'Greek Salad', time: '12:30 pm', diff: 'Easy', active: true },
          { type: 'Dinner', emoji: '🍝', name: 'Pasta Bolognese', time: '7:00 pm', diff: 'Medium', active: false },
        ].map((meal) => (
          <div key={meal.type} className={`rounded-lg border mb-0.5 bg-white px-1 py-0.5 ${meal.active ? 'border-teal-400' : 'border-gray-200'}`}>
            <div className="flex items-center gap-1">
              <span className="text-[8px]">{meal.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-0.5">
                  <span className="text-[5px] font-bold text-teal-600 uppercase">{meal.type}</span>
                </div>
                <p className="text-[6px] font-semibold text-gray-800 truncate">{meal.name}</p>
                <div className="flex items-center gap-1">
                  <span className="text-[5px] text-gray-400">⏱ {meal.time}</span>
                  <span className="text-[5px] text-gray-400">🍴 {meal.diff}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Next day preview */}
        <div className="flex items-center gap-1 mt-1 opacity-50">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          <span className="text-[6px] text-gray-500 font-bold">Tuesday 4/21</span>
        </div>
        {/* Approve button */}
        <button className="w-full bg-violet-600 text-white text-[5px] font-bold rounded-full py-0.5 mt-1">
          ✓ Approve &amp; share with family
        </button>
      </div>
    </div>
  );
}

function GroceryPhone() {
  return (
    <div className="flex flex-col" style={{ minHeight: 200 }}>
      <div className="bg-teal-700 px-2 py-1.5">
        <p className="text-white text-[8px] font-bold">🛒 Grocery — Wk 17</p>
      </div>
      <div className="p-1.5 space-y-1">
        <div className="bg-gray-100 rounded px-1 py-0.5">
          <p className="text-[6px] font-bold text-gray-600">PRODUCE</p>
          {['Spinach 200g', 'Tomatoes 4x'].map((item, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded border ${i===0?'bg-teal-500 border-teal-500':'border-gray-300'}`} />
              <span className="text-[6px] text-gray-700">{item}</span>
              <span className="text-[5px] text-gray-400 ml-auto">Tesco</span>
            </div>
          ))}
        </div>
        <div className="bg-gray-100 rounded px-1 py-0.5">
          <p className="text-[6px] font-bold text-gray-600">MEAT</p>
          {['Chicken 500g'].map((item, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded border border-gray-300" />
              <span className="text-[6px] text-gray-700">{item}</span>
              <span className="text-[5px] text-gray-400 ml-auto">Butcher</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-violet-50 rounded p-1">
          <Mic className="w-2 h-2 text-violet-500" />
          <span className="text-[6px] text-violet-700">"Add milk…"</span>
        </div>
      </div>
    </div>
  );
}

function WeeklyPlannerPhone() {
  const days = [
    { day: 'Wednesday', date: '4/22', today: true },
    { day: 'Thursday',  date: '4/23', today: false },
    { day: 'Friday',    date: '4/24', today: false },
  ];
  const slots = [
    { emoji: '🌙', label: 'Evening snack' },
    { emoji: '🍎', label: 'Snack' },
    { emoji: '🥞', label: 'Breakfast' },
  ];
  return (
    <div className="flex flex-col bg-gray-50" style={{ minHeight: 380 }}>
      {/* App header */}
      <div className="bg-gray-100 px-2 py-1.5 flex items-center justify-between border-b border-gray-200">
        <span className="text-[9px]">🏠</span>
        <span className="text-[7px] font-bold text-gray-800">Family meals</span>
        <span className="text-[9px] text-gray-500">⋮</span>
      </div>
      {/* Week navigator */}
      <div className="bg-white px-2 py-1 flex items-center justify-between border-b border-gray-200">
        <span className="text-[8px] text-gray-500">‹</span>
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center">
            <span className="text-[6px] font-semibold text-gray-700">This week</span>
            <span className="text-[4.5px] bg-blue-100 text-blue-600 font-bold rounded px-0.5">Draft</span>
          </div>
          <span className="text-[4.5px] text-gray-400">4/20 - 4/26</span>
        </div>
        <span className="text-[8px] text-gray-500">›</span>
      </div>
      {/* Days */}
      <div className="flex-1 px-1.5 py-1 space-y-1.5 overflow-hidden">
        {days.map(d => (
          <div key={d.day}>
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${d.today ? 'bg-teal-400' : 'bg-gray-300'}`} />
                <span className="text-[5.5px] font-bold text-gray-800">{d.day}</span>
                <span className="text-[5px] text-gray-400">{d.date}</span>
              </div>
              <span className="text-[7px] text-gray-400">···</span>
            </div>
            <div className="space-y-0.5">
              {slots.map(s => (
                <div key={s.label} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1">
                  <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                    <span className="text-[5px] text-gray-400">+</span>
                  </div>
                  <span className="text-[8px] leading-none">{s.emoji}</span>
                  <span className="text-[5.5px] text-gray-400">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Flow 2 phone screens ───────────────────────────────────────────────────────

function F2S1_PlannerEmpty() {
  const days = [
    { day: 'Wednesday', date: '4/22', today: true },
    { day: 'Thursday',  date: '4/23', today: false },
  ];
  const slots = [
    { emoji: '🌙', label: 'Evening snack' },
    { emoji: '🍎', label: 'Snack' },
    { emoji: '🥞', label: 'Breakfast' },
  ];
  return (
    <div className="flex flex-col bg-gray-50" style={{ minHeight: 380 }}>
      <div className="bg-gray-100 px-2 py-1.5 flex items-center justify-between border-b border-gray-200">
        <span className="text-[9px]">🏠</span>
        <span className="text-[7px] font-bold text-gray-800">Family meals</span>
        <span className="text-[9px] text-gray-500">⋮</span>
      </div>
      <div className="bg-white px-2 py-1 flex items-center justify-between border-b border-gray-200">
        <span className="text-[8px] text-gray-500">‹</span>
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center">
            <span className="text-[6px] font-semibold text-gray-700">This week</span>
            <span className="text-[4.5px] bg-blue-100 text-blue-600 font-bold rounded px-0.5">Draft</span>
          </div>
          <span className="text-[4.5px] text-gray-400">4/20 - 4/26</span>
        </div>
        <span className="text-[8px] text-gray-500">›</span>
      </div>
      <div className="flex-1 px-1.5 py-1 space-y-1.5 overflow-hidden">
        {days.map(d => (
          <div key={d.day}>
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${d.today ? 'bg-teal-400' : 'bg-gray-300'}`} />
                <span className="text-[5.5px] font-bold text-gray-800">{d.day}</span>
                <span className="text-[5px] text-gray-400">{d.date}</span>
              </div>
              <span className={`text-[7px] ${d.today ? 'text-teal-500 font-bold' : 'text-gray-400'}`}>···</span>
            </div>
            <div className="space-y-0.5">
              {slots.map(s => (
                <div key={s.label} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1">
                  <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                    <span className="text-[5px] text-gray-400">+</span>
                  </div>
                  <span className="text-[8px] leading-none">{s.emoji}</span>
                  <span className="text-[5.5px] text-gray-400">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function F2S2_MealTypeDropdown() {
  const meals = [
    { emoji: '🥚', label: 'Add breakfast' },
    { emoji: '🥗', label: 'Add lunch' },
    { emoji: '🍽️', label: 'Add dinner' },
    { emoji: '🍎', label: 'Add snack' },
    { emoji: '🌙', label: 'Add evening snack' },
  ];
  return (
    <div className="flex flex-col bg-gray-50 relative" style={{ minHeight: 380 }}>
      {/* Dimmed planner behind */}
      <div className="bg-gray-100 px-2 py-1.5 flex items-center justify-between border-b border-gray-200 opacity-40">
        <span className="text-[9px]">🏠</span>
        <span className="text-[7px] font-bold text-gray-800">Family meals</span>
        <span className="text-[9px] text-gray-500">⋮</span>
      </div>
      <div className="flex-1 opacity-30 px-1.5 py-1">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          <span className="text-[5.5px] font-bold text-gray-800">Wednesday</span>
          <span className="text-[5px] text-gray-400">4/22</span>
        </div>
        {['Evening snack','Snack','Breakfast'].map(s => (
          <div key={s} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1 mb-0.5">
            <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
              <span className="text-[5px] text-gray-400">+</span>
            </div>
            <span className="text-[5.5px] text-gray-400">{s}</span>
          </div>
        ))}
      </div>
      {/* Dropdown card */}
      <div className="absolute top-14 left-8 right-1 bg-white rounded-xl shadow-lg border border-gray-100 p-1.5 z-10">
        {meals.map((m, i) => (
          <div key={m.label} className={`flex items-center gap-1.5 px-1.5 py-1 rounded-lg ${i === 2 ? 'bg-teal-50' : ''}`}>
            <span className="text-[10px] leading-none">{m.emoji}</span>
            <span className={`text-[5.5px] font-medium ${i === 2 ? 'text-teal-700 font-bold' : 'text-gray-700'}`}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function F2S3_AddDinnerSheet() {
  return (
    <div className="flex flex-col bg-gray-50 relative" style={{ minHeight: 380 }}>
      {/* Dimmed planner */}
      <div className="bg-gray-100 px-2 py-1.5 flex items-center justify-between border-b border-gray-200 opacity-30">
        <span className="text-[9px]">🏠</span>
        <span className="text-[7px] font-bold text-gray-800">Family meals</span>
      </div>
      <div className="flex-1 opacity-20 px-1.5 py-1">
        {['Evening snack','Snack','Breakfast'].map(s => (
          <div key={s} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1 mb-0.5">
            <span className="text-[5.5px] text-gray-400">{s}</span>
          </div>
        ))}
      </div>
      {/* Bottom sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl border-t border-gray-100 px-2 pt-1.5 pb-2">
        {/* Handle */}
        <div className="flex justify-center mb-1.5">
          <div className="w-6 h-0.5 bg-gray-300 rounded-full" />
        </div>
        {/* Title */}
        <div className="flex items-center gap-1 mb-1.5 pb-1.5 border-b border-gray-100">
          <span className="text-[11px]">🍝</span>
          <span className="text-[6.5px] font-bold text-gray-900">Add dinner</span>
        </div>
        <div className="pt-0.5 space-y-1">
          {[
            { icon: '🔗', bg: 'bg-blue-50',   label: 'Import by URL or Search', sub: 'Paste a URL or search from Google' },
            { icon: '📖', bg: 'bg-green-50',  label: 'Recipe Library',          sub: 'Pick from your saved recipes' },
            { icon: '✏️', bg: 'bg-indigo-50', label: 'Custom Manually',         sub: 'Type the meal name and details' },
          ].map(o => (
            <div key={o.label} className="flex items-center gap-1.5">
              <div className={`w-4 h-4 rounded-lg ${o.bg} flex items-center justify-center shrink-0`}>
                <span className="text-[8px]">{o.icon}</span>
              </div>
              <div>
                <p className="text-[5.5px] font-semibold text-gray-800">{o.label}</p>
                <p className="text-[4px] text-gray-400">{o.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function F2S4_PlannerFilled() {
  return (
    <div className="flex flex-col bg-gray-50" style={{ minHeight: 380 }}>
      <div className="bg-gray-100 px-2 py-1.5 flex items-center justify-between border-b border-gray-200">
        <span className="text-[9px]">🏠</span>
        <span className="text-[7px] font-bold text-gray-800">Family meals</span>
        <span className="text-[9px] text-gray-500">⋮</span>
      </div>
      <div className="bg-white px-2 py-1 flex items-center justify-between border-b border-gray-200">
        <span className="text-[8px] text-gray-500">‹</span>
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center">
            <span className="text-[6px] font-semibold text-gray-700">This week</span>
            <span className="text-[4.5px] bg-blue-100 text-blue-600 font-bold rounded px-0.5">Draft</span>
          </div>
          <span className="text-[4.5px] text-gray-400">4/20 - 4/26</span>
        </div>
        <span className="text-[8px] text-gray-500">›</span>
      </div>
      <div className="flex-1 px-1.5 py-1 overflow-hidden">
        {/* Wednesday — with filled dinner */}
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-[5.5px] font-bold text-gray-800">Wednesday</span>
            <span className="text-[5px] text-gray-400">4/22</span>
          </div>
          <span className="text-[7px] text-gray-400">···</span>
        </div>
        <div className="space-y-0.5 mb-1.5">
          {/* Filled dinner slot */}
          <div className="border border-teal-300 rounded-lg bg-teal-50 flex items-center gap-1 px-1 py-1">
            <span className="text-[8px] leading-none">🍝</span>
            <div className="flex-1 min-w-0">
              <p className="text-[4.5px] font-bold text-teal-700 uppercase">Dinner</p>
              <p className="text-[5px] font-semibold text-gray-800 truncate">Chicken Sandwich</p>
            </div>
          </div>
          {/* Empty slots */}
          {[{emoji:'🌙',label:'Evening snack'},{emoji:'🍎',label:'Snack'}].map(s => (
            <div key={s.label} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1">
              <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                <span className="text-[5px] text-gray-400">+</span>
              </div>
              <span className="text-[8px] leading-none">{s.emoji}</span>
              <span className="text-[5.5px] text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
        {/* Thursday */}
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span className="text-[5.5px] font-bold text-gray-700">Thursday</span>
            <span className="text-[5px] text-gray-400">4/23</span>
          </div>
          <span className="text-[7px] text-gray-400">···</span>
        </div>
        <div className="space-y-0.5">
          {[{emoji:'🌙',label:'Evening snack'},{emoji:'🍎',label:'Snack'},{emoji:'🥞',label:'Breakfast'}].map(s => (
            <div key={s.label} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1">
              <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                <span className="text-[5px] text-gray-400">+</span>
              </div>
              <span className="text-[8px] leading-none">{s.emoji}</span>
              <span className="text-[5.5px] text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function F2S5_GoogleSearch() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 380 }}>
      {/* Header */}
      <div className="px-2 py-1.5 flex items-center justify-between border-b border-gray-100">
        <span className="text-[5.5px] text-teal-600 font-semibold">Cancel</span>
        <span className="text-[6.5px] font-bold text-gray-900">Add recipe</span>
        <span className="text-[5.5px] text-white">Save</span>
      </div>
      {/* Tab pills */}
      <div className="flex items-center gap-0.5 px-1.5 py-1 border-b border-gray-100">
        {[
          { l: 'Search',  active: true  },
          { l: 'Import',  active: false },
          { l: 'Create',  active: false },
          { l: '✦ Help', active: false },
        ].map(t => (
          <span key={t.l} className={`text-[4px] px-1.5 py-0.5 rounded-full whitespace-nowrap ${t.active ? 'bg-teal-100 text-teal-700 font-bold' : 'bg-gray-100 text-gray-500'}`}>{t.l}</span>
        ))}
      </div>
      {/* Body */}
      <div className="flex-1 px-2 py-2 space-y-2">
        <p className="text-[4.5px] text-gray-500 leading-tight">Not sure what you're making? Search with Google to find a recipe and add it.</p>
        {/* Google search box */}
        <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-1.5 py-1.5">
          <span className="text-[9px] leading-none font-bold">
            <span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span>
          </span>
          <span className="text-[5.5px] text-gray-700 font-medium flex-1">Chicken sandwich</span>
          <span className="text-[5px] text-teal-500">|</span>
        </div>
        {/* Search button */}
        <div className="bg-teal-600 rounded-lg py-1.5 text-center">
          <span className="text-[6px] font-bold text-white">Search</span>
        </div>
      </div>
    </div>
  );
}

function F2S6_RecipeForm() {
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 380 }}>
      {/* Header */}
      <div className="px-2 py-1.5 flex items-center justify-between border-b border-gray-100">
        <span className="text-[5px] text-teal-600 font-semibold">Cancel</span>
        <span className="text-[6px] font-bold text-gray-900">Add recipe</span>
        <span className="text-[5px] text-teal-600 font-semibold">Save</span>
      </div>
      {/* Recipe title + photo */}
      <div className="px-2 pt-1.5 pb-1 flex items-start justify-between border-b border-gray-100">
        <div className="flex-1">
          <p className="text-[7px] font-bold text-gray-900 leading-tight">Chicken sandwiches</p>
          <p className="text-[4.5px] text-gray-400 mt-0.5">Photo</p>
        </div>
        <div className="w-8 h-8 bg-amber-100 rounded-lg overflow-hidden shrink-0 ml-1">
          <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
            <span className="text-[10px]">🥪</span>
          </div>
        </div>
      </div>
      {/* Fields */}
      <div className="flex-1 px-2 py-1 space-y-0.5 overflow-hidden">
        {[
          { label: 'Recipe Box',      value: '🧑 Recipe box',          edit: true  },
          { label: 'Category',        value: 'Other',                   edit: true  },
          { label: 'Servings',        value: '10',                      edit: false },
          { label: 'Prep Time',       value: '– hr  15 min',            edit: false },
          { label: 'Cook Time',       value: '– hr  0 min',             edit: false },
          { label: 'Main Ingredient', value: '–',                       edit: false },
          { label: 'Cuisine',         value: 'Western',                 edit: false },
          { label: 'Reference',       value: 'recipetineats.com/chi…',  edit: false },
        ].map(f => (
          <div key={f.label} className="flex items-center justify-between bg-gray-50 rounded px-1 py-0.5">
            <span className="text-[4.5px] text-gray-500 shrink-0">{f.label}</span>
            <div className="flex items-center gap-0.5">
              <span className="text-[4.5px] text-gray-800 font-medium">{f.value}</span>
              {f.edit && <span className="text-[4px] text-teal-500 font-semibold">Edit</span>}
            </div>
          </div>
        ))}
        {/* Star rating */}
        <div className="flex items-center justify-between bg-gray-50 rounded px-1 py-0.5">
          <span className="text-[4.5px] text-gray-500">Star rating</span>
          <span className="text-[7px] text-gray-300">★★★★★</span>
        </div>
      </div>
    </div>
  );
}

// ── Flow 3 phone screens ───────────────────────────────────────────────────────

function F3S1_PlannerSnackTap() {
  return (
    <div className="flex flex-col bg-gray-50" style={{ minHeight: 380 }}>
      <div className="bg-gray-100 px-2 py-1.5 flex items-center justify-between border-b border-gray-200">
        <span className="text-[9px]">🏠</span>
        <span className="text-[7px] font-bold text-gray-800">Family meals</span>
        <span className="text-[9px] text-gray-500">⋮</span>
      </div>
      <div className="bg-white px-2 py-1 flex items-center justify-between border-b border-gray-200">
        <span className="text-[8px] text-gray-500">‹</span>
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center">
            <span className="text-[6px] font-semibold text-gray-700">This week</span>
            <span className="text-[4.5px] bg-blue-100 text-blue-600 font-bold rounded px-0.5">Draft</span>
          </div>
          <span className="text-[4.5px] text-gray-400">4/20 - 4/26</span>
        </div>
        <span className="text-[8px] text-gray-500">›</span>
      </div>
      <div className="flex-1 px-1.5 py-1 overflow-hidden">
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-[5.5px] font-bold text-gray-800">Wednesday</span>
            <span className="text-[5px] text-gray-400">4/22</span>
          </div>
          <span className="text-[7px] text-gray-400">···</span>
        </div>
        <div className="space-y-0.5 mb-1.5">
          {/* Snack slot — highlighted as tapped */}
          <div className="border-2 border-teal-400 rounded-lg bg-teal-50 flex items-center gap-1 px-1 py-1 ring-2 ring-teal-200">
            <div className="w-3 h-3 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
              <span className="text-[5px] text-white font-bold">+</span>
            </div>
            <span className="text-[8px] leading-none">🍎</span>
            <span className="text-[5.5px] font-semibold text-teal-700">Snack</span>
            <span className="text-[4px] text-teal-400 ml-auto">tap</span>
          </div>
          {/* Other empty slots */}
          {[{emoji:'🌙',label:'Evening snack'},{emoji:'🥞',label:'Breakfast'}].map(s => (
            <div key={s.label} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1">
              <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                <span className="text-[5px] text-gray-400">+</span>
              </div>
              <span className="text-[8px] leading-none">{s.emoji}</span>
              <span className="text-[5.5px] text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span className="text-[5.5px] font-bold text-gray-700">Thursday</span>
            <span className="text-[5px] text-gray-400">4/23</span>
          </div>
          <span className="text-[7px] text-gray-400">···</span>
        </div>
        <div className="space-y-0.5">
          {[{emoji:'🌙',label:'Evening snack'},{emoji:'🍎',label:'Snack'},{emoji:'🥞',label:'Breakfast'}].map(s => (
            <div key={s.label} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1">
              <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                <span className="text-[5px] text-gray-400">+</span>
              </div>
              <span className="text-[8px] leading-none">{s.emoji}</span>
              <span className="text-[5.5px] text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function F3S2_MealTypeSnack() {
  const meals = [
    { emoji: '🥚', label: 'Add breakfast' },
    { emoji: '🥗', label: 'Add lunch' },
    { emoji: '🍽️', label: 'Add dinner' },
    { emoji: '🍎', label: 'Add snack' },
    { emoji: '🌙', label: 'Add evening snack' },
  ];
  return (
    <div className="flex flex-col bg-gray-50 relative" style={{ minHeight: 380 }}>
      <div className="bg-gray-100 px-2 py-1.5 flex items-center justify-between border-b border-gray-200 opacity-40">
        <span className="text-[9px]">🏠</span>
        <span className="text-[7px] font-bold text-gray-800">Family meals</span>
        <span className="text-[9px] text-gray-500">⋮</span>
      </div>
      <div className="flex-1 opacity-30 px-1.5 py-1">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          <span className="text-[5.5px] font-bold text-gray-800">Wednesday</span>
          <span className="text-[5px] text-gray-400">4/22</span>
        </div>
        {['Evening snack','Snack','Breakfast'].map(s => (
          <div key={s} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1 mb-0.5">
            <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
              <span className="text-[5px] text-gray-400">+</span>
            </div>
            <span className="text-[5.5px] text-gray-400">{s}</span>
          </div>
        ))}
      </div>
      <div className="absolute top-14 left-8 right-1 bg-white rounded-xl shadow-lg border border-gray-100 p-1.5 z-10">
        {meals.map((m, i) => (
          <div key={m.label} className={`flex items-center gap-1.5 px-1.5 py-1 rounded-lg ${i === 3 ? 'bg-teal-50' : ''}`}>
            <span className="text-[10px] leading-none">{m.emoji}</span>
            <span className={`text-[5.5px] font-medium ${i === 3 ? 'text-teal-700 font-bold' : 'text-gray-700'}`}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function F3S3_AddSnackSheet() {
  return (
    <div className="flex flex-col bg-gray-50 relative" style={{ minHeight: 380 }}>
      <div className="bg-gray-100 px-2 py-1.5 flex items-center justify-between border-b border-gray-200 opacity-30">
        <span className="text-[9px]">🏠</span>
        <span className="text-[7px] font-bold text-gray-800">Family meals</span>
      </div>
      <div className="flex-1 opacity-20 px-1.5 py-1">
        {['Evening snack','Snack','Breakfast'].map(s => (
          <div key={s} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1 mb-0.5">
            <span className="text-[5.5px] text-gray-400">{s}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl border-t border-gray-100 px-2 pt-1.5 pb-2">
        <div className="flex justify-center mb-1.5">
          <div className="w-6 h-0.5 bg-gray-300 rounded-full" />
        </div>
        <div className="flex items-center gap-1 mb-1.5 pb-1.5 border-b border-gray-100">
          <span className="text-[11px]">🍎</span>
          <span className="text-[6.5px] font-bold text-gray-900">Add snack</span>
        </div>
        <div className="pt-0.5 space-y-1">
          {[
            { icon: '🔗', bg: 'bg-blue-50',   label: 'Import by URL or Search', sub: 'Paste a URL or search from Google', highlight: false },
            { icon: '📖', bg: 'bg-green-50',  label: 'Recipe Library',          sub: 'Pick from your saved recipes',      highlight: false },
            { icon: '✏️', bg: 'bg-indigo-50', label: 'Custom Manually',         sub: 'Type the meal name and details',    highlight: true  },
          ].map(o => (
            <div key={o.label} className={`flex items-center gap-1.5 rounded-lg p-0.5 ${o.highlight ? 'bg-indigo-50 ring-1 ring-indigo-300' : ''}`}>
              <div className={`w-4 h-4 rounded-lg ${o.bg} flex items-center justify-center shrink-0`}>
                <span className="text-[8px]">{o.icon}</span>
              </div>
              <div>
                <p className={`text-[5.5px] font-semibold ${o.highlight ? 'text-indigo-700' : 'text-gray-800'}`}>{o.label}</p>
                <p className="text-[4px] text-gray-400">{o.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function F3S4_CustomRecipeForm() {
  return (
    <div className="flex flex-col bg-gray-100" style={{ minHeight: 380 }}>
      {/* Header */}
      <div className="bg-gray-100 px-2 py-1.5 flex items-center justify-between">
        <span className="text-[8px] text-gray-600">←</span>
        <span className="text-[6.5px] font-bold text-gray-900">New recipe</span>
        <span className="text-[5.5px] text-teal-600 font-semibold">Save</span>
      </div>
      {/* Fields */}
      <div className="flex-1 px-1.5 space-y-1 overflow-hidden">
        <div className="bg-white rounded-lg px-2 py-1.5">
          <span className="text-[5.5px] font-semibold text-gray-800">Apple peanut snack</span>
        </div>
        {/* Allergy micro badge */}
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-[4.5px] bg-red-100 text-red-600 border border-red-200 rounded-full px-1.5 py-0.5 font-semibold">⚠️ Nuts — Bob</span>
          <span className="text-[4px] text-gray-400">allergy detected</span>
        </div>
        <div className="flex gap-1">
          <div className="flex-1 bg-white rounded-lg px-1.5 py-1.5 flex items-center gap-0.5">
            <span className="text-[7px]">🌐</span>
            <span className="text-[5px] text-gray-400">Cuisine</span>
          </div>
          <div className="flex-1 bg-white rounded-lg px-1.5 py-1.5 flex items-center justify-between">
            <span className="text-[4.5px] text-gray-400">Difficulty</span>
            <span className="text-[5px] font-medium text-gray-700">Easy ▾</span>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="bg-white rounded-lg px-1.5 py-1.5 flex-1">
            <p className="text-[4px] text-gray-400">Servings</p>
            <p className="text-[6px] font-bold text-gray-800">4</p>
          </div>
          <div className="bg-white rounded-lg px-1.5 py-1.5 flex-1">
            <span className="text-[5px] text-gray-400">Prep (…</span>
          </div>
          <div className="bg-white rounded-lg px-1.5 py-1.5 flex-1">
            <span className="text-[5px] text-gray-400">Cook (…</span>
          </div>
        </div>
        {/* Ingredients */}
        <div className="bg-white rounded-lg px-1.5 py-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-0.5">
              <span className="text-[8px]">🧺</span>
              <span className="text-[5.5px] font-bold text-gray-800">Ingredients</span>
            </div>
            <span className="text-[9px] text-teal-600">⊕</span>
          </div>
          <div className="bg-gray-50 rounded-lg py-1.5 flex flex-col items-center justify-center gap-0.5">
            <span className="text-[9px] text-gray-400">⊕</span>
            <span className="text-[4.5px] text-gray-400">Tap to add ingredients</span>
          </div>
        </div>
        {/* Instructions */}
        <div className="bg-white rounded-lg px-1.5 py-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-0.5">
              <span className="text-[8px]">📋</span>
              <span className="text-[5.5px] font-bold text-gray-800">Instructions</span>
            </div>
            <span className="text-[9px] text-teal-600">⊕</span>
          </div>
          {[1, 2].map(n => (
            <div key={n} className="flex items-start gap-1 mb-0.5 bg-gray-50 rounded-lg px-1 py-0.5">
              <span className="text-[4.5px] text-white bg-teal-600 rounded-full w-3 h-3 flex items-center justify-center shrink-0 mt-0.5">{n}</span>
              <div className="flex-1">
                <p className="text-[4.5px] text-gray-400">Describe this step…</p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className="text-[4px] text-gray-400">⏱</span>
                  <span className="text-[4px] bg-white border border-gray-200 rounded px-1 text-gray-500">min</span>
                </div>
              </div>
              <span className="text-[7px] text-red-400">×</span>
            </div>
          ))}
        </div>
        {/* Tags */}
        <div className="bg-white rounded-lg px-1.5 py-1 flex items-center gap-0.5">
          <span className="text-[8px]">🏷️</span>
          <span className="text-[5.5px] font-bold text-gray-800">Tags</span>
        </div>
      </div>
    </div>
  );
}

function F3S_AllergyAlert() {
  return (
    <div className="flex flex-col bg-gray-50 relative" style={{ minHeight: 380 }}>
      {/* Dimmed recipe form behind */}
      <div className="opacity-25 px-2 py-1.5 bg-gray-100 flex items-center justify-between border-b border-gray-200">
        <span className="text-[8px] text-gray-600">←</span>
        <span className="text-[6.5px] font-bold text-gray-900">New recipe</span>
        <span className="text-[5.5px] text-teal-600">Save</span>
      </div>
      <div className="flex-1 opacity-20 px-1.5 py-1 space-y-1">
        <div className="bg-white rounded-lg px-2 py-1.5">
          <span className="text-[5.5px] font-semibold text-gray-800">Apple peanut snack</span>
        </div>
        <div className="bg-white rounded-lg px-2 py-1.5 h-4" />
        <div className="bg-white rounded-lg px-2 py-1.5 h-4" />
      </div>

      {/* Alert modal */}
      <div className="absolute inset-0 flex items-center justify-center px-3">
        <div className="bg-white rounded-2xl shadow-2xl border border-red-100 w-full overflow-hidden">
          {/* Red top bar */}
          <div className="bg-red-500 px-3 py-2 flex items-center gap-1.5">
            <span className="text-[14px] leading-none">⚠️</span>
            <span className="text-[7px] font-extrabold text-white tracking-wide uppercase">Allergy Alert</span>
          </div>
          {/* Body */}
          <div className="px-3 py-2.5">
            <p className="text-[6px] font-bold text-gray-900 mb-1">Peanut allergy detected</p>
            <div className="bg-red-50 border border-red-200 rounded-lg px-2 py-1.5 flex items-start gap-1.5 mb-2">
              <span className="text-[10px] leading-none shrink-0">👤</span>
              <div>
                <p className="text-[5.5px] font-semibold text-red-700">Bob is allergic to Peanuts</p>
                <p className="text-[4.5px] text-red-500 mt-0.5">"Apple peanut snack" contains peanuts which conflicts with Bob's dietary profile.</p>
              </div>
            </div>
            <p className="text-[4.5px] text-gray-500 mb-2">Do you still want to add this meal?</p>
            {/* Buttons */}
            <div className="flex gap-1">
              <div className="flex-1 border border-gray-300 rounded-lg py-1 text-center">
                <span className="text-[5.5px] font-semibold text-gray-600">Go Back</span>
              </div>
              <div className="flex-1 bg-red-500 rounded-lg py-1 text-center">
                <span className="text-[5.5px] font-bold text-white">Add Anyway</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function F3S5_PlannerWithSnack() {
  return (
    <div className="flex flex-col bg-gray-50" style={{ minHeight: 380 }}>
      <div className="bg-gray-100 px-2 py-1.5 flex items-center justify-between border-b border-gray-200">
        <span className="text-[9px]">🏠</span>
        <span className="text-[7px] font-bold text-gray-800">Family meals</span>
        <span className="text-[9px] text-gray-500">⋮</span>
      </div>
      <div className="bg-white px-2 py-1 flex items-center justify-between border-b border-gray-200">
        <span className="text-[8px] text-gray-500">‹</span>
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center">
            <span className="text-[6px] font-semibold text-gray-700">This week</span>
            <span className="text-[4.5px] bg-blue-100 text-blue-600 font-bold rounded px-0.5">Draft</span>
          </div>
          <span className="text-[4.5px] text-gray-400">4/20 - 4/26</span>
        </div>
        <span className="text-[8px] text-gray-500">›</span>
      </div>
      <div className="flex-1 px-1.5 py-1 overflow-hidden">
        {/* Wednesday — with filled snack */}
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-[5.5px] font-bold text-gray-800">Wednesday</span>
            <span className="text-[5px] text-gray-400">4/22</span>
          </div>
          <span className="text-[7px] text-gray-400">···</span>
        </div>
        <div className="space-y-0.5 mb-1.5">
          {/* Filled snack slot */}
          <div className="border border-teal-300 rounded-lg bg-teal-50 flex items-center gap-1 px-1 py-1">
            <span className="text-[8px] leading-none">🍎</span>
            <div className="flex-1 min-w-0">
              <p className="text-[4.5px] font-bold text-teal-700 uppercase">Snack</p>
              <p className="text-[5px] font-semibold text-gray-800 truncate">Apple peanut snack</p>
            </div>
          </div>
          {/* Empty slots */}
          {[{emoji:'🌙',label:'Evening snack'},{emoji:'🥞',label:'Breakfast'}].map(s => (
            <div key={s.label} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1">
              <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                <span className="text-[5px] text-gray-400">+</span>
              </div>
              <span className="text-[8px] leading-none">{s.emoji}</span>
              <span className="text-[5.5px] text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
        {/* Thursday */}
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span className="text-[5.5px] font-bold text-gray-700">Thursday</span>
            <span className="text-[5px] text-gray-400">4/23</span>
          </div>
          <span className="text-[7px] text-gray-400">···</span>
        </div>
        <div className="space-y-0.5">
          {[{emoji:'🌙',label:'Evening snack'},{emoji:'🍎',label:'Snack'},{emoji:'🥞',label:'Breakfast'}].map(s => (
            <div key={s.label} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1">
              <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                <span className="text-[5px] text-gray-400">+</span>
              </div>
              <span className="text-[8px] leading-none">{s.emoji}</span>
              <span className="text-[5.5px] text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Flow 4 phone screens ───────────────────────────────────────────────────────

function F4S2_AddSnackSheetLibrary() {
  return (
    <div className="flex flex-col bg-gray-50 relative" style={{ minHeight: 380 }}>
      <div className="bg-gray-100 px-2 py-1.5 flex items-center justify-between border-b border-gray-200 opacity-30">
        <span className="text-[9px]">🏠</span>
        <span className="text-[7px] font-bold text-gray-800">Family meals</span>
      </div>
      <div className="flex-1 opacity-20 px-1.5 py-1">
        {['Evening snack','Snack','Breakfast'].map(s => (
          <div key={s} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1 mb-0.5">
            <span className="text-[5.5px] text-gray-400">{s}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl border-t border-gray-100 px-2 pt-1.5 pb-2">
        <div className="flex justify-center mb-1.5">
          <div className="w-6 h-0.5 bg-gray-300 rounded-full" />
        </div>
        <div className="flex items-center gap-1 mb-1.5 pb-1.5 border-b border-gray-100">
          <span className="text-[11px]">🍎</span>
          <span className="text-[6.5px] font-bold text-gray-900">Add snack</span>
        </div>
        <div className="pt-0.5 space-y-1">
          {[
            { icon: '🔗', bg: 'bg-blue-50',   label: 'Import by URL or Search', sub: 'Paste a URL or search from Google', highlight: false },
            { icon: '📖', bg: 'bg-green-50',  label: 'Recipe Library',          sub: 'Pick from your saved recipes',      highlight: true  },
            { icon: '✏️', bg: 'bg-indigo-50', label: 'Custom Manually',         sub: 'Type the meal name and details',    highlight: false },
          ].map(o => (
            <div key={o.label} className={`flex items-center gap-1.5 rounded-lg p-0.5 ${o.highlight ? 'bg-green-50 ring-1 ring-green-300' : ''}`}>
              <div className={`w-4 h-4 rounded-lg ${o.bg} flex items-center justify-center shrink-0`}>
                <span className="text-[8px]">{o.icon}</span>
              </div>
              <div>
                <p className={`text-[5.5px] font-semibold ${o.highlight ? 'text-green-700' : 'text-gray-800'}`}>{o.label}</p>
                <p className="text-[4px] text-gray-400">{o.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function F4S3_RecipeLibraryPicker() {
  const recipes = [
    { emoji: '🥗', name: 'Fruit Salad',       tag: 'Snack',    selected: true  },
    { emoji: '🫙', name: 'Yogurt Parfait',     tag: 'Snack',    selected: false },
    { emoji: '🥜', name: 'Trail Mix',          tag: 'Snack',    selected: false },
    { emoji: '🍌', name: 'Banana Smoothie',    tag: 'Snack',    selected: false },
    { emoji: '🧀', name: 'Cheese & Crackers',  tag: 'Snack',    selected: false },
  ];
  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 380 }}>
      {/* Header */}
      <div className="bg-white px-2 py-1.5 flex items-center justify-between border-b border-gray-100">
        <span className="text-[8px] text-gray-600">←</span>
        <span className="text-[6.5px] font-bold text-gray-900">Recipe Library</span>
        <span className="text-[5px] text-teal-600 font-semibold">Add</span>
      </div>
      {/* Search bar */}
      <div className="px-2 py-1 border-b border-gray-100">
        <div className="bg-gray-100 rounded-full px-2 py-0.5 flex items-center gap-1">
          <span className="text-[7px] text-gray-400">🔍</span>
          <span className="text-[5px] text-gray-400">Search recipes…</span>
        </div>
      </div>
      {/* Filter chips */}
      <div className="flex gap-0.5 px-2 py-1 border-b border-gray-100">
        {['All','Snack','Breakfast','Lunch'].map((t,i) => (
          <span key={t} className={`text-[4px] rounded-full px-1.5 py-0.5 whitespace-nowrap ${i===1?'bg-teal-500 text-white':'bg-gray-100 text-gray-500'}`}>{t}</span>
        ))}
      </div>
      {/* Recipe list */}
      <div className="flex-1 px-2 py-1 space-y-0.5 overflow-hidden relative">
        {recipes.map(r => (
          <div key={r.name} className={`flex items-center gap-1.5 rounded-xl px-1.5 py-1 border ${r.selected ? 'bg-teal-50 border-teal-300 ring-1 ring-teal-300' : 'bg-white border-gray-100'}`}>
            <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${r.selected ? 'bg-teal-100' : 'bg-gray-50'}`}>
              <span className="text-[10px] leading-none">{r.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[5.5px] font-semibold truncate ${r.selected ? 'text-teal-800' : 'text-gray-800'}`}>{r.name}</p>
              <span className="text-[4px] bg-gray-100 text-gray-500 rounded-full px-1">{r.tag}</span>
            </div>
            {r.selected && <span className="text-[8px] text-teal-500 shrink-0">✓</span>}
          </div>
        ))}
        {/* FAB */}
        <div className="absolute bottom-1 right-1 w-6 h-6 bg-teal-600 rounded-full shadow-lg flex items-center justify-center">
          <span className="text-white text-[12px] font-bold leading-none">+</span>
        </div>
      </div>
    </div>
  );
}

function F4S4_PlannerWithLibrarySnack() {
  return (
    <div className="flex flex-col bg-gray-50" style={{ minHeight: 380 }}>
      <div className="bg-gray-100 px-2 py-1.5 flex items-center justify-between border-b border-gray-200">
        <span className="text-[9px]">🏠</span>
        <span className="text-[7px] font-bold text-gray-800">Family meals</span>
        <span className="text-[9px] text-gray-500">⋮</span>
      </div>
      <div className="bg-white px-2 py-1 flex items-center justify-between border-b border-gray-200">
        <span className="text-[8px] text-gray-500">‹</span>
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center">
            <span className="text-[6px] font-semibold text-gray-700">This week</span>
            <span className="text-[4.5px] bg-blue-100 text-blue-600 font-bold rounded px-0.5">Draft</span>
          </div>
          <span className="text-[4.5px] text-gray-400">4/20 - 4/26</span>
        </div>
        <span className="text-[8px] text-gray-500">›</span>
      </div>
      <div className="flex-1 px-1.5 py-1 overflow-hidden">
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-[5.5px] font-bold text-gray-800">Wednesday</span>
            <span className="text-[5px] text-gray-400">4/22</span>
          </div>
          <span className="text-[7px] text-gray-400">···</span>
        </div>
        <div className="space-y-0.5 mb-1.5">
          {/* Filled snack slot from library */}
          <div className="border border-teal-300 rounded-lg bg-teal-50 flex items-center gap-1 px-1 py-1">
            <span className="text-[8px] leading-none">🥗</span>
            <div className="flex-1 min-w-0">
              <p className="text-[4.5px] font-bold text-teal-700 uppercase">Snack</p>
              <p className="text-[5px] font-semibold text-gray-800 truncate">Fruit Salad</p>
            </div>
            <span className="text-[4px] bg-green-100 text-green-600 rounded-full px-0.5 shrink-0">Library</span>
          </div>
          {[{emoji:'🌙',label:'Evening snack'},{emoji:'🥞',label:'Breakfast'}].map(s => (
            <div key={s.label} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1">
              <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                <span className="text-[5px] text-gray-400">+</span>
              </div>
              <span className="text-[8px] leading-none">{s.emoji}</span>
              <span className="text-[5.5px] text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span className="text-[5.5px] font-bold text-gray-700">Thursday</span>
            <span className="text-[5px] text-gray-400">4/23</span>
          </div>
          <span className="text-[7px] text-gray-400">···</span>
        </div>
        <div className="space-y-0.5">
          {[{emoji:'🌙',label:'Evening snack'},{emoji:'🍎',label:'Snack'},{emoji:'🥞',label:'Breakfast'}].map(s => (
            <div key={s.label} className="border border-dashed border-gray-300 rounded-lg bg-white flex items-center gap-1 px-1 py-1">
              <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                <span className="text-[5px] text-gray-400">+</span>
              </div>
              <span className="text-[8px] leading-none">{s.emoji}</span>
              <span className="text-[5.5px] text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Flow 5 phone screens ───────────────────────────────────────────────────────

function F5S3_RecipeLibraryFABMenu() {
  const recipes = [
    { emoji: '🥗', name: 'Fruit Salad',      time: '5 min',  diff: 'Easy'   },
    { emoji: '🫙', name: 'Yogurt Parfait',    time: '10 min', diff: 'Easy'   },
    { emoji: '🥜', name: 'Trail Mix',         time: '5 min',  diff: 'Easy'   },
    { emoji: '🍌', name: 'Banana Smoothie',   time: '8 min',  diff: 'Easy'   },
    { emoji: '🧀', name: 'Cheese & Crackers', time: '5 min',  diff: 'Easy'   },
  ];
  return (
    <div className="flex flex-col bg-white relative" style={{ minHeight: 380 }}>
      {/* Header */}
      <div className="bg-white px-2 py-1.5 flex items-center justify-between border-b border-gray-100">
        <span className="text-[8px] text-gray-600">←</span>
        <span className="text-[6.5px] font-bold text-gray-900">Recipe Library</span>
        <span className="text-[9px] text-gray-500">🔍</span>
      </div>
      {/* Filter chips */}
      <div className="flex gap-0.5 px-2 py-1 border-b border-gray-100">
        {['All','Favorites','Family fav','Quick'].map((t,i) => (
          <span key={t} className={`text-[4px] rounded-full px-1.5 py-0.5 whitespace-nowrap border ${i===0?'bg-teal-500 text-white border-teal-500':'bg-white text-gray-500 border-gray-200'}`}>{i===0&&<span className="mr-0.5">✓</span>}{t}</span>
        ))}
      </div>
      {/* Dimmed recipe list */}
      <div className="flex-1 px-2 py-1 space-y-0.5 overflow-hidden opacity-30">
        {recipes.map(r => (
          <div key={r.name} className="flex items-center gap-1.5 rounded-xl px-1.5 py-1 border border-gray-100 bg-white">
            <div className="w-5 h-5 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
              <span className="text-[10px] leading-none">{r.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[5.5px] font-semibold text-gray-800 truncate">{r.name}</p>
              <div className="flex items-center gap-1">
                <span className="text-[4px] text-gray-400">⏱ {r.time}</span>
                <span className="text-[4px] text-teal-500">{r.diff}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-[8px] text-gray-300">♡</span>
              <span className="text-[8px] text-teal-400">⊕</span>
            </div>
          </div>
        ))}
      </div>
      {/* FAB menu overlay */}
      <div className="absolute bottom-2 left-2 right-2 space-y-1.5 z-10">
        {[
          { icon: '✏️', bg: 'bg-teal-50',   label: 'Create manually',              iconBg: 'bg-teal-100'   },
          { icon: '🔗', bg: 'bg-indigo-50', label: 'Import from URL or Search',     iconBg: 'bg-indigo-100' },
        ].map(o => (
          <div key={o.label} className={`flex items-center gap-2 ${o.bg} rounded-2xl px-3 py-2 shadow-lg`}>
            <div className={`w-5 h-5 ${o.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
              <span className="text-[9px]">{o.icon}</span>
            </div>
            <span className="text-[6px] font-semibold text-gray-800">{o.label}</span>
          </div>
        ))}
        {/* FAB button itself */}
        <div className="flex justify-end">
          <div className="w-6 h-6 bg-teal-600 rounded-full shadow-lg flex items-center justify-center">
            <span className="text-white text-[12px] font-bold leading-none">+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function F5S5_RecipeLibraryWithToast() {
  const recipes = [
    { emoji: '🥗', name: 'Fruit Salad',             time: '5 min',  diff: 'Easy',   isNew: false },
    { emoji: '🫙', name: 'Yogurt Parfait',           time: '10 min', diff: 'Easy',   isNew: false },
    { emoji: '🍎', name: 'Apple peanut snack',       time: '5 min',  diff: 'Easy',   isNew: true  },
    { emoji: '🥜', name: 'Trail Mix',                time: '5 min',  diff: 'Easy',   isNew: false },
    { emoji: '🍌', name: 'Banana Smoothie',          time: '8 min',  diff: 'Easy',   isNew: false },
  ];
  return (
    <div className="flex flex-col bg-white relative" style={{ minHeight: 380 }}>
      {/* Header */}
      <div className="bg-white px-2 py-1.5 flex items-center justify-between border-b border-gray-100">
        <span className="text-[8px] text-gray-600">←</span>
        <span className="text-[6.5px] font-bold text-gray-900">Recipe Library</span>
        <span className="text-[9px] text-gray-500">🔍</span>
      </div>
      {/* Filter chips */}
      <div className="flex gap-0.5 px-2 py-1 border-b border-gray-100">
        {['All','Favorites','Family fav','Quick'].map((t,i) => (
          <span key={t} className={`text-[4px] rounded-full px-1.5 py-0.5 whitespace-nowrap border ${i===0?'bg-teal-500 text-white border-teal-500':'bg-white text-gray-500 border-gray-200'}`}>{t}</span>
        ))}
      </div>
      {/* Recipe list */}
      <div className="flex-1 px-2 py-1 space-y-0.5 overflow-hidden">
        {recipes.map(r => (
          <div key={r.name} className={`flex items-center gap-1.5 rounded-xl px-1.5 py-1 border ${r.isNew ? 'border-teal-200 bg-teal-50' : 'border-gray-100 bg-white'}`}>
            <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${r.isNew ? 'bg-teal-100' : 'bg-gray-50'}`}>
              <span className="text-[10px] leading-none">{r.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-0.5">
                <p className="text-[5.5px] font-semibold text-gray-800 truncate">{r.name}</p>
                {r.isNew && <span className="text-[3.5px] bg-teal-500 text-white rounded-full px-0.5 shrink-0">NEW</span>}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[4px] text-gray-400">⏱ {r.time}</span>
                <span className="text-[4px] text-teal-500">{r.diff}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-[8px] text-gray-300">♡</span>
              <span className="text-[8px] text-teal-400">⊕</span>
            </div>
          </div>
        ))}
      </div>
      {/* Toast notification */}
      <div className="absolute bottom-2 left-2 right-2 bg-gray-900 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 shadow-lg">
        <span className="text-[10px]">✅</span>
        <div>
          <p className="text-[5.5px] font-semibold text-white">"Apple peanut snack" added</p>
          <p className="text-[4px] text-gray-400">New recipe saved to your library</p>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────

function MealPlannerInteractivePhoneFlow() {
  const [activeFlow, setActiveFlow] = useState(0);

  const flows = [
    {
      label: 'Flow 1',
      title: 'Flow 1 — More Screen → Meal Settings → Weekly Planner',
      subtitle: 'Tap Meal Planner tile → configure dietary profile, schedules & servings → tap ✓ to save → view weekly planner.',
    },
    {
      label: 'Flow 2',
      title: 'Flow 2 — Adding Meals to the Weekly Planner',
      subtitle: 'Tap ··· on a day → select meal type → tap Import/Search → search Google → fill recipe form → tap Save → meal slot fills in.',
    },
    {
      label: 'Flow 3',
      title: 'Flow 3 — Adding a Snack via Custom Recipe',
      subtitle: 'Tap + on Snack slot → Custom Manually → fill recipe form (⚠️ Nuts — Bob badge shown inline) → tap Save → snack slot fills in.',
    },
    {
      label: 'Flow 4',
      title: 'Flow 4 — Adding a Snack from Recipe Library',
      subtitle: 'Tap + on Snack slot → Recipe Library → browse & select a saved recipe → tap Add to Meal Plan → snack slot fills in.',
    },
    {
      label: 'Flow 5',
      title: 'Flow 5 — Adding More Recipes via FAB in Recipe Library',
      subtitle: 'Tap + on Snack slot → Recipe Library → tap + FAB → Create manually → fill recipe form → Save → library shows new recipe with toast confirmation.',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
        <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest">
          {flows.length} Interactive Screen Flow{flows.length !== 1 ? 's' : ''}
        </h2>
      </div>

      {/* Flow tabs */}
      <div className="flex items-center gap-2 mb-4">
        {flows.map((f, i) => (
          <button
            key={i}
            onClick={() => setActiveFlow(i)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
              activeFlow === i
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Active flow description card */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 mb-6">
        <p className="text-sm font-bold text-gray-900">{flows[activeFlow].title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{flows[activeFlow].subtitle}</p>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex items-start gap-2 min-w-max">

          {/* ── Flow 2 phones ── */}
          {activeFlow === 1 && <>
            <PhoneShell label="Screen 1" sublabel="Weekly Planner — tap ···" accent="border-teal-500">
              <F2S1_PlannerEmpty />
            </PhoneShell>
            <FlowArrow label="Tap ··· on day" />
            <PhoneShell label="Screen 2" sublabel="Select meal type" accent="border-indigo-500">
              <F2S2_MealTypeDropdown />
            </PhoneShell>
            <FlowArrow label="Tap Add dinner" />
            <PhoneShell label="Screen 3" sublabel="Choose how to add" accent="border-rose-500">
              <F2S3_AddDinnerSheet />
            </PhoneShell>
            <FlowArrow label="Import / Search" />
            <PhoneShell label="Screen 4" sublabel="Search from Google" accent="border-blue-500">
              <F2S5_GoogleSearch />
            </PhoneShell>
            <FlowArrow label="Select result" />
            <PhoneShell label="Screen 5" sublabel="Recipe form" accent="border-amber-500">
              <F2S6_RecipeForm />
            </PhoneShell>
            <FlowArrow label="Tap Save" />
            <PhoneShell label="Screen 6" sublabel="Meal slot filled" accent="border-green-500">
              <F2S4_PlannerFilled />
            </PhoneShell>
          </>}

          {/* ── Flow 3 phones ── */}
          {activeFlow === 2 && <>
            <PhoneShell label="Screen 1" sublabel="Tap Snack slot" accent="border-teal-500">
              <F3S1_PlannerSnackTap />
            </PhoneShell>
            <FlowArrow label="Tap + on Snack" />
            <PhoneShell label="Screen 2" sublabel="Custom Manually" accent="border-rose-500">
              <F3S3_AddSnackSheet />
            </PhoneShell>
            <FlowArrow label="Tap Custom Manually" />
            <PhoneShell label="Screen 3" sublabel="New recipe form" accent="border-teal-600">
              <F3S4_CustomRecipeForm />
            </PhoneShell>
            <FlowArrow label="Tap Save" />
            <PhoneShell label="Screen 4" sublabel="Snack slot filled" accent="border-green-500">
              <F3S5_PlannerWithSnack />
            </PhoneShell>
          </>}

          {/* ── Flow 4 phones ── */}
          {activeFlow === 3 && <>
            <PhoneShell label="Screen 1" sublabel="Tap Snack slot" accent="border-teal-500">
              <F3S1_PlannerSnackTap />
            </PhoneShell>
            <FlowArrow label="Tap + on Snack" />
            <PhoneShell label="Screen 2" sublabel="Recipe Library" accent="border-green-500">
              <F4S2_AddSnackSheetLibrary />
            </PhoneShell>
            <FlowArrow label="Tap Recipe Library" />
            <PhoneShell label="Screen 3" sublabel="Pick a recipe" accent="border-teal-600">
              <F4S3_RecipeLibraryPicker />
            </PhoneShell>
            <FlowArrow label="Add to Meal Plan" />
            <PhoneShell label="Screen 4" sublabel="Snack slot filled" accent="border-green-500">
              <F4S4_PlannerWithLibrarySnack />
            </PhoneShell>
          </>}

          {/* ── Flow 5 phones ── */}
          {activeFlow === 4 && <>
            <PhoneShell label="Screen 1" sublabel="Tap Snack slot" accent="border-teal-500">
              <F3S1_PlannerSnackTap />
            </PhoneShell>
            <FlowArrow label="Tap + on Snack" />
            <PhoneShell label="Screen 2" sublabel="Recipe Library" accent="border-green-500">
              <F4S2_AddSnackSheetLibrary />
            </PhoneShell>
            <FlowArrow label="Tap Recipe Library" />
            <PhoneShell label="Screen 3" sublabel="Tap + FAB" accent="border-teal-600">
              <F5S3_RecipeLibraryFABMenu />
            </PhoneShell>
            <FlowArrow label="Create manually" />
            <PhoneShell label="Screen 4" sublabel="New recipe form" accent="border-amber-500">
              <F3S4_CustomRecipeForm />
            </PhoneShell>
            <FlowArrow label="Tap Save" />
            <PhoneShell label="Screen 5" sublabel="Recipe added to library" accent="border-green-500">
              <F5S5_RecipeLibraryWithToast />
            </PhoneShell>
          </>}

          {/* ── Flow 1 phones ── */}
          {activeFlow === 0 && <>
          <PhoneShell label="More Screen" sublabel="Tap Meal Planner" accent="border-orange-500">
            <div className="flex flex-col bg-white" style={{ minHeight: 380 }}>
              {/* Header */}
              <div className="bg-white px-2 pt-2 pb-1.5 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[7px]">🏠</div>
                    <span className="text-[7px] font-bold text-gray-800">Thaikaattu Family</span>
                    <span className="text-[6px] text-gray-400">▾</span>
                  </div>
                </div>
              </div>
              {/* Categories grid */}
              <div className="flex-1 bg-white px-2 py-2">
                <div className="text-[5px] font-bold text-gray-400 uppercase tracking-widest mb-2">Categories</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { icon: '☑️', label: 'Tasks',        color: 'bg-indigo-50  border-indigo-100',  highlight: false },
                    { icon: '📝', label: 'List',          color: 'bg-blue-50    border-blue-100',    highlight: false },
                    { icon: '📅', label: 'Reminder',      color: 'bg-purple-50  border-purple-100',  highlight: false },
                    { icon: '🗂️', label: 'Documents',     color: 'bg-yellow-50  border-yellow-100',  highlight: false },
                    { icon: '💰', label: 'Budgeting',     color: 'bg-green-50   border-green-100',   highlight: false },
                    { icon: '🍽️', label: 'Meal Planner',  color: 'bg-orange-100 border-orange-400',  highlight: true  },
                  ].map(t => (
                    <div key={t.label} className={`border rounded-2xl p-2.5 flex flex-col items-start gap-1.5 shadow-sm ${t.color} ${t.highlight ? 'ring-2 ring-orange-400' : ''}`}>
                      <span className="text-[14px] leading-none">{t.icon}</span>
                      <span className="text-[7px] font-bold text-gray-800">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Bottom nav */}
              <div className="bg-white border-t border-gray-100 flex items-center justify-around py-1.5 px-2">
                {[
                  { icon: '🏠', label: 'Home',    active: false },
                  { icon: '⊞',  label: 'More',    active: true  },
                  { icon: '🤖', label: 'AI',      active: false },
                  { icon: '🔔', label: 'Alerts',  active: false },
                  { icon: '👤', label: 'Profile', active: false },
                ].map((n, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <span className={`text-[9px] ${n.active ? 'text-orange-500' : 'text-gray-400'}`}>{n.icon}</span>
                    <span className={`text-[4.5px] ${n.active ? 'text-orange-500 font-bold' : 'text-gray-400'}`}>{n.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </PhoneShell>

          <FlowArrow label="Tap Meal Planner" />

          <PhoneShell label="Meal Settings" sublabel="Diet · Schedule · Servings" accent="border-rose-500">
            <MealSettingsDetailPhone />
          </PhoneShell>

          <FlowArrow label="Tap ✓ Save" />

          <PhoneShell label="Weekly Planner" sublabel="Add meals to slots" accent="border-teal-500">
            <WeeklyPlannerPhone />
          </PhoneShell>
          </>}

        </div>
      </div>

      {/* Kids access callout */}
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
        <Eye className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-yellow-800">Child Role — What Kids Can Access</p>
          <ul className="text-xs text-yellow-700 mt-1 space-y-0.5">
            <li>• <strong>Recipe Library:</strong> browse all recipes, view full recipe detail — read-only</li>
            <li>• <strong>Meal Planner:</strong> view published weekly plan — read-only; tap a recipe to view its detail</li>
            <li>• <strong>Grocery List:</strong> can check off items while shopping</li>
            <li>• <strong>Cannot:</strong> add/edit/delete recipes, assign planner slots, publish a plan, approve, or change dietary profiles</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — SCREEN BY SCREEN FLOW
// ═══════════════════════════════════════════════════════════════════════════════

type FlowStep = {
  id: string;
  screen: string;
  tag: string;
  tagColor: string;
  description: string;
  userAction: string;
  systemResponse: string;
  nextScreens: string[];
  childAccess?: string;
};

const screenByScreenFlow: FlowStep[] = [
  {
    id: 'sbs-dashboard',
    screen: 'Dashboard (Home)',
    tag: 'ENTRY',
    tagColor: 'bg-indigo-600 text-white',
    description: 'Entry point on every app open. Shows "What are we eating today?" widget listing all meals for the day; rows grey out as each meal window passes.',
    userAction: 'Sees "What are we eating today?" widget with today\'s meals listed (Breakfast / Lunch / Dinner / Snack)\nTaps widget header → Meal Planner screen\nTaps a specific meal row → Recipe Detail page\nTaps morning notification to jump to today\'s plan',
    systemResponse: 'Fetches published meal_plan for the current week\nBuilds widget rows from today\'s plan slots in time order\nEach row greys out once its meal window ends (e.g. Breakfast greyed at 11am)\nWidget resets at midnight with next day\'s meals\nMorning push notification (7:30am): today\'s meals summary\nMeal plan is NOT written to Calendar module — widget only',
    nextScreens: ['Recipe Detail (tap meal row)', 'Meal Planner (tap widget header or nav tab)', 'Meal Settings (settings icon)'],
  },
  {
    id: 'sbs-settings',
    screen: 'Meal Settings — Dietary Profile',
    tag: 'SETUP (FIRST)',
    tagColor: 'bg-rose-700 text-white',
    description: 'Must be completed before any other Meal Planner feature. Dietary data drives allergy alerts, filtering, and grocery defaults.',
    userAction: 'Parent sets per-member: allergies, dislikes, dietary flags\nSets family defaults: servings, shopping day, preferred stores\nMaps grocery categories to preferred stores\nOptionally toggles weekend dessert slot',
    systemResponse: 'Saves dietary_profile per member (allergies[], dislikes[], flags[])\nStores family_settings: default_servings, shopping_day, preferred_stores, category_store_map\nWeekend dessert toggle adds Dessert row to Sat & Sun columns in planner\nProfile used by allergy check engine on every slot assignment',
    nextScreens: ['Recipe Search', 'Meal Planner (Weekly Calendar)'],
    childAccess: 'Kids cannot view or edit Meal Settings.',
  },
  {
    id: 'sbs-recipe-search',
    screen: 'Recipe Search — Path A (Scraper)',
    tag: 'RECIPES',
    tagColor: 'bg-amber-600 text-white',
    description: 'Primary recipe discovery. Backend ScraperService queries pre-configured sites; all filtering is client-side. No AI.',
    userAction: 'Types query ("chicken pasta", "salmon under 30 min")\nApplies filter chips: cook time / meal type / cuisine / dietary flag\nTaps result card → Recipe Detail',
    systemResponse: 'ScraperService queries sites server-side (rotating User-Agent, max 5 pages/min)\nExtracts schema.org/Recipe JSON-LD; falls back to HTML parsing\nReturns: title, image, cook time, difficulty, source site\nClient-side filtering — no second network call',
    nextScreens: ['Recipe Detail & Review'],
  },
  {
    id: 'sbs-recipe-import',
    screen: 'Import from URL — Path B',
    tag: 'RECIPES',
    tagColor: 'bg-amber-600 text-white',
    description: 'User pastes any recipe URL. Scraper extracts and normalises all fields into structured form.',
    userAction: 'Taps "Import from URL"\nPastes recipe link\nReviews pre-filled fields → edits if needed → taps Save',
    systemResponse: 'Extracts JSON-LD first; HTML fallback\nNormalises: strips HTML entities, standardises units (g/ml/cups/tbsp/tsp)\nParses ingredients into {name, quantity, unit}\nSaves with source_url preserved for attribution',
    nextScreens: ['Recipe Detail & Review'],
  },
  {
    id: 'sbs-recipe-manual',
    screen: 'Manual Recipe Creation — Path C',
    tag: 'RECIPES',
    tagColor: 'bg-amber-600 text-white',
    description: 'For original family recipes. Entirely user-authored blank form — no external calls.',
    userAction: 'Fills title, description, difficulty, cuisine, meal type, prep & cook times, servings, optional photo\nAdds ingredient rows (name + quantity + unit)\nAdds numbered steps; drag to reorder\nConfirms auto-suggested dietary flags',
    systemResponse: 'Auto-suggests dietary flags by matching ingredients against family dietary_profile\nUser must confirm flags before save\nSaves with source: "manual". Zero external API calls.',
    nextScreens: ['Recipe Library (saved directly, no Review step)'],
  },
  {
    id: 'sbs-recipe-detail',
    screen: 'Recipe Detail & Review',
    tag: 'RECIPES',
    tagColor: 'bg-amber-700 text-white',
    description: 'Final review screen before a scraped or imported recipe is saved to the library. User can edit any field.',
    userAction: 'Reviews all extracted fields (title, ingredients, steps, times)\nEdits anything that was extracted incorrectly\nConfirms or changes auto-suggested dietary flags\nTaps "Save to Library"',
    systemResponse: 'Validates: title required, ≥1 ingredient, ≥1 step\nRuns allergy check against family dietary_profile\nSaves recipe to library\nRedirects to Recipe Library',
    nextScreens: ['Recipe Library'],
    childAccess: 'Kids can view Recipe Detail (read-only) from the Library or published plan.',
  },
  {
    id: 'sbs-library',
    screen: 'Recipe Library',
    tag: 'LIBRARY',
    tagColor: 'bg-green-700 text-white',
    description: 'The family\'s personal recipe collection. Browsable, searchable, filterable. Entry point to adding recipes to the planner.',
    userAction: 'Browses / searches / filters recipes\nTaps ♥ to favourite\nTaps 3-dot → "Plan this again" / "More like this" / Edit / Copy\nTaps recipe card → Recipe Detail\nFrom Meal Planner slot picker: taps recipe to assign',
    systemResponse: 'Filtering and search all client-side (no network call)\nFavourite is per-user, not shared\nused_count incremented on each slot assignment\n"More like this" surfaces matching cuisine / meal_type\nCold start: gate on <3 recipes in library',
    nextScreens: ['Recipe Detail (view or edit)', 'Meal Planner (assign to slot)'],
    childAccess: 'Kids can browse the full library and view any recipe detail — read-only. No edit, copy, or delete.',
  },
  {
    id: 'sbs-planner',
    screen: 'Meal Planner — Weekly Calendar',
    tag: 'PLANNER',
    tagColor: 'bg-indigo-600 text-white',
    description: '7-column grid (Mon–Sun) with meal rows. Supports repeating slots, adult approval toggle, and draft→publish flow. NOT connected to Calendar.',
    userAction: 'Navigates weeks (← →)\nTaps + on empty slot → bottom sheet: "Pick from library" or "Search"\nSets servings per slot; marks leftover; toggles ↺ Repeat Weekly per slot\nOptionally enables "Require family approval" toggle for this week\nTaps "Approve & Share with Family" to publish',
    systemResponse: 'Allergy check on every assignment:\n→ Hard red blocking alert if allergen found\n→ Soft amber inline warning for disliked ingredient\n→ Substitution hint from pre-authored table\nRepeating slot: auto-fills same recipe next week; ↺ icon shown; user can override any week\nNew week = Draft (visible only to creating parent)\nPublish: status → Published; push notification to all members\nIf approval enabled: adult Members see Approve / Suggest Change action; admin sees per-member approval status\nMeal plan NOT written to Calendar — Dashboard widget only',
    nextScreens: ['Grocery List (generate)', 'Recipe Detail (tap any slot)', 'Recipe Search (inline from slot picker)', 'Approval flow (adult Members)'],
    childAccess: 'After plan is published: kids see read-only weekly grid. They can tap any recipe to view full recipe detail. Kids are excluded from approval flow.',
  },
  {
    id: 'sbs-grocery',
    screen: 'Grocery List & Store Management',
    tag: 'GROCERY',
    tagColor: 'bg-teal-600 text-white',
    description: 'Rule-based generation from the published weekly plan. Creates a shared list, a shopping task, and bridges to Expense Tracker via OCR or manual entry.',
    userAction: 'Taps "Generate grocery list" from planner\nAssigns items to stores (defaults applied automatically)\nChecks off items while shopping (live sync across family)\nVoice: "Add milk" / "Mark eggs as done"\nAfter shopping: taps "Scan receipt" → camera OCR reads bill → confirms and saves to Expense Tracker\nOR taps "Add expense" → manually types store + total → saves to Expense Tracker',
    systemResponse: 'Collects all planner entries for the week (skips leftover-marked slots)\nMerges duplicates by summing where unit matches\nApplies category taxonomy and store mapping\nCreates shared List entity (source_meal_plan_id set) → synced to Lists module\nAuto-creates "Grocery shopping — Week N" task due on shopping_day → synced to Tasks module\nOCR path: camera image → text extraction → line items parsed → matched against grocery list → expense_entity saved\nManual path: amount + store → expense_entity saved with category: Grocery and source_meal_plan_id\nExpense visible in Expense Tracker module for family budget tracking',
    nextScreens: ['Lists module (shared family list)', 'Tasks module (shopping task)', 'Expense Tracker module (receipt scan or manual entry)'],
    childAccess: 'Kids can check off items on the grocery list.',
  },
  {
    id: 'sbs-voice',
    screen: 'Voice Input — Grocery & Planner',
    tag: 'VOICE',
    tagColor: 'bg-violet-600 text-white',
    description: 'Hands-free control. On-device speech-to-text via expo-av — no audio leaves the device.',
    userAction: 'Taps mic icon (grocery list FAB or planner header)\nSpeaks: "Add milk to grocery list" · "Mark eggs as done" · "Assign Tesco to dairy" · "What\'s for dinner?"',
    systemResponse: 'expo-av processes on-device — no audio stored or transmitted\nKeyword matching: add / mark / assign / query\nCalls same tRPC endpoints as UI buttons\nexpo-speech reads confirmation aloud (on-device)\nMVP: fixed patterns only; full NLP in Phase 2',
    nextScreens: ['Grocery List (add/mark actions)', 'Meal Planner (query only)'],
    childAccess: 'Kids can use Voice Input for grocery check-off commands.',
  },
  {
    id: 'sbs-expense',
    screen: 'Expense Integration — Grocery Receipt',
    tag: 'EXPENSE',
    tagColor: 'bg-emerald-700 text-white',
    description: 'Post-shopping flow to log grocery spend. Accessed from Grocery List screen via "Scan receipt" or "Add expense". Saves to Expense Tracker module.',
    userAction: 'Path 1 — OCR Scan:\nTaps "Scan receipt" on Grocery List screen\nCamera opens → points at paper or digital receipt\nReviews extracted items + total\nConfirms and saves\n\nPath 2 — Manual Entry:\nTaps "Add expense"\nTypes store name + total amount (optional per-item breakdown)\nSaves',
    systemResponse: 'OCR path: image → text extraction → line items parsed into {name, qty, price}\nMatches extracted items against grocery list; flags unmatched items\nCreates expense_entity: {amount, store, date, category: Grocery, source_meal_plan_id, week_number}\nManual path: same expense_entity structure, no image processing\nExpense synced to Expense Tracker module\nVisible in: family spending overview, per-member breakdown, weekly food budget widget\nMultiple receipts per week supported (e.g. Tesco + Butcher saved separately)',
    nextScreens: ['Expense Tracker module (view + budget)', 'Grocery List (return after save)'],
    childAccess: 'All adult family members can scan receipts or add manual expenses from the Grocery List.',
  },
];

function MealPlannerScreenByScreen() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-1">
        <CalendarDays className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-900">Screen-by-Screen Flow — Meal Planner</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Every screen in order. Click to expand user action, system response, child access notes, and where it leads.
      </p>

      <div className="space-y-3">
        {screenByScreenFlow.map((step, idx) => {
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
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-gray-900">{step.screen}</span>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${step.tagColor}`}>{step.tag}</span>
                        {step.childAccess && (
                          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-400 text-yellow-900">KIDS ✓</span>
                        )}
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
                      {step.childAccess && (
                        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                          <p className="text-[10px] font-bold text-yellow-700 uppercase tracking-wider mb-1">Child Role Access</p>
                          <p className="text-xs text-gray-700">{step.childAccess}</p>
                        </div>
                      )}
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

              {idx < screenByScreenFlow.length - 1 && (
                <div className="flex items-center gap-2 px-4 py-1">
                  <div className="w-6 flex justify-center">
                    <div className="text-gray-300 text-base">↓</div>
                  </div>
                  {step.id === 'sbs-recipe-search' && (
                    <span className="text-[9px] text-gray-400 italic">Path A, B, C all converge at Recipe Library (Path C skips Review)</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary pill bar */}
      <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
        <p className="text-xs font-bold text-gray-700 mb-3">Complete Flow Summary</p>
        <div className="flex flex-wrap items-center gap-1 text-[10px]">
          {[
            { label: 'Dashboard', color: 'bg-indigo-600 text-white' },
            { label: '→', color: '' },
            { label: 'Meal Settings', color: 'bg-rose-700 text-white' },
            { label: '→', color: '' },
            { label: 'Recipes (A/B/C)', color: 'bg-amber-600 text-white' },
            { label: '→', color: '' },
            { label: 'Library', color: 'bg-green-700 text-white' },
            { label: '→', color: '' },
            { label: 'Planner', color: 'bg-indigo-600 text-white' },
            { label: '→', color: '' },
            { label: 'Publish', color: 'bg-indigo-800 text-white' },
            { label: '→', color: '' },
            { label: 'Grocery', color: 'bg-teal-600 text-white' },
            { label: '+', color: 'text-gray-400 font-bold' },
            { label: 'Voice', color: 'bg-violet-600 text-white' },
            { label: '+', color: 'text-gray-400 font-bold' },
            { label: 'Expense Tracker', color: 'bg-emerald-700 text-white' },
          ].map((item, i) =>
            item.color && !item.color.startsWith('text-') ? (
              <span key={i} className={`px-2 py-0.5 rounded-full font-bold ${item.color}`}>{item.label}</span>
            ) : (
              <span key={i} className={`font-bold ${item.color || 'text-gray-400'}`}>{item.label}</span>
            )
          )}
        </div>
        <p className="text-[9px] text-gray-400 mt-2">
          * Screens tagged <strong>KIDS ✓</strong> are accessible to child-role users in read-only mode.
          No AI or GPT in Phase 1 — all logic is rule-based string matching.
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MASTER EXPORT — MealPlannerHub
// ═══════════════════════════════════════════════════════════════════════════════

export function MealPlannerHub() {
  return (
    <div className="space-y-8">
      {/* Section divider */}
      <div className="border-t-2 border-dashed border-green-300 pt-2">
        <p className="text-xs text-green-600 uppercase tracking-widest font-semibold mb-1">
          Meal Planner · Complete Screen Flow Documentation
        </p>
        <p className="text-sm text-gray-500">
          Main screen mockup · UI screen zones · Feature map · Cross-module connections · Interactive phone flow · Screen-by-screen flow
        </p>
      </div>

      <MealPlannerUIScreenZones />
      <MealPlannerFeatureMapSection />
      <MealPlannerCrossModuleConnections />
      <MealPlannerInteractivePhoneFlow />
      <MealPlannerScreenByScreen />
    </div>
  );
}
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
    leadsTo: ['Meal Settings', 'Recipe Search', 'Meal Planner', 'Recipe Detail (tap meal row in widget)'],
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
    leadsTo: ['Grocery List Generation', 'Recipe Detail (tap any slot)', 'Recipe Search (inline)'],
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
    ids: ['groceryList', 'voiceInput'],
    note: 'Both available once plan is published',
  },
];

// Arrows: from screenId → to screenId (visual overlay — kept simple with labels)
type Arrow = { from: string; to: string; label?: string };
const arrows: Arrow[] = [
  { from: 'dashboard', to: 'mealSettings' },
  { from: 'dashboard', to: 'recipeSearch', label: 'Recipe tab' },
  { from: 'dashboard', to: 'recipeImport', label: 'Import URL' },
  { from: 'dashboard', to: 'recipeManual', label: 'Create manual' },
  { from: 'recipeSearch', to: 'recipeDetail' },
  { from: 'recipeImport', to: 'recipeDetail' },
  { from: 'recipeManual', to: 'recipeLibrary' },
  { from: 'recipeDetail', to: 'recipeLibrary', label: 'Save' },
  { from: 'recipeLibrary', to: 'mealPlanner', label: 'Plan slot' },
  { from: 'mealSettings', to: 'mealPlanner', label: 'After setup' },
  { from: 'mealPlanner', to: 'groceryList', label: 'Generate list' },
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

// ─── Entry points ─────────────────────────────────────────────────────────────

const entryPoints = [
  { label: 'Home dashboard', path: 'Meal widget → tap meal row → Recipe Detail' },
  { label: 'Recipe tab', path: 'Search bar → scraper results → select → review → save' },
  { label: 'Import from URL', path: 'Paste link → scraper fills form → review → save' },
  { label: 'Create manually', path: 'Blank form → fill in → save to library' },
  { label: 'Meal Planner slot', path: 'Tap empty slot → pick from library → allergy check' },
  { label: 'Grocery cart icon', path: 'Top-right shortcut → jump to grocery list' },
  { label: 'Voice command', path: 'Say command → keyword parser → action executed' },
];

// ─── Screen flow ──────────────────────────────────────────────────────────────

type WorkflowStep = {
  id: string;
  screen: string;
  tag: string;
  tagColor: string;
  description: string;
  userAction: string;
  systemResponse: string;
  nextScreens: string[];
};

const screenFlow: WorkflowStep[] = [
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
    nextScreens: ['Grocery List Generation', 'Recipe Detail (tap any slot)', 'Recipe Search (inline)'],
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
    id: 'dashboard-widget',
    title: 'Feature 5 — Dashboard Meal Widget',
    icon: Clock,
    color: 'bg-orange-100 border-orange-300',
    subfeatures: [
      '"What are we eating today?" widget shows today\'s meals in time order',
      'Each meal row greys out once its time window passes; resets at midnight',
      'Tapping a meal row opens the recipe detail page',
      'Morning summary notification (default 7:30am): today\'s meals',
      'Grocery reminder on preferred shopping day. All rule-based. No AI.',
      'Meal plan NOT shown in Calendar module — widget only',
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
  { from: 'Dashboard Widget', to: 'Recipe Detail', how: 'Tapping a meal row opens the recipe detail page — cooking approach is up to the individual', color: 'border-orange-400 bg-orange-50' },
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

