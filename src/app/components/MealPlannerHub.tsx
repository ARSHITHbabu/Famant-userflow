import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChefHat, Search, Link, PenLine, BookOpen, CalendarDays,
  ShoppingCart, Clock, Mic, ChevronDown, ChevronUp,
  ArrowRight, Settings, AlertTriangle, Eye, Users,
  Smartphone, Layers, GitBranch, Network,
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
// SECTION 1 — MEAL PLANNER MAIN SCREEN MOCKUP
// ═══════════════════════════════════════════════════════════════════════════════

function MealPlannerMainScreenMockup() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const slots: Record<string, { name: string; time: string; color: string } | null> = {
    'B-0': { name: 'Oat Bowl', time: '10m', color: 'bg-amber-100' },
    'B-1': null,
    'B-2': { name: 'Pancakes', time: '20m', color: 'bg-amber-100' },
    'B-3': null,
    'B-4': { name: 'Eggs', time: '15m', color: 'bg-amber-100' },
    'B-5': null,
    'B-6': null,
    'L-0': null,
    'L-1': { name: 'Caesar', time: '15m', color: 'bg-green-100' },
    'L-2': null,
    'L-3': { name: 'Wrap', time: '10m', color: 'bg-green-100' },
    'L-4': null,
    'L-5': { name: 'Pasta', time: '25m', color: 'bg-green-100' },
    'L-6': null,
    'D-0': { name: 'Chicken', time: '45m', color: 'bg-indigo-100' },
    'D-1': { name: 'Stir Fry', time: '30m', color: 'bg-indigo-100' },
    'D-2': null,
    'D-3': { name: 'Salmon', time: '35m', color: 'bg-indigo-100' },
    'D-4': null,
    'D-5': { name: 'Pizza', time: '60m', color: 'bg-indigo-100' },
    'D-6': { name: 'Curry', time: '50m', color: 'bg-indigo-100' },
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-1">
        <Smartphone className="w-5 h-5 text-indigo-500" />
        <h2 className="text-xl font-bold text-gray-900">Meal Planner — Main Screen</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Annotated phone mockup of the weekly planner grid. Tap a zone label to understand its purpose.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Phone mockup */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="relative flex flex-col rounded-[2rem] border-[3px] border-indigo-600 shadow-2xl overflow-hidden w-52 bg-gray-800">
            {/* Status bar */}
            <div className="bg-gray-800 flex justify-between items-center px-3 py-1">
              <span className="text-[7px] text-gray-400">9:41</span>
              <div className="w-8 h-2 bg-gray-600 rounded-full" />
              <span className="text-[7px] text-gray-400">▶▶</span>
            </div>
            <div className="bg-white flex-1">
              {/* Header */}
              <div className="bg-indigo-700 px-2 py-1.5 flex items-center justify-between">
                <span className="text-white text-[9px] font-bold">🍽 Meal Planner</span>
                <div className="flex items-center gap-1">
                  <span className="text-[7px] bg-green-400 text-white px-1 rounded-full">Draft</span>
                  <span className="text-[8px] text-indigo-200">⚙</span>
                </div>
              </div>
              {/* Week navigator */}
              <div className="flex items-center justify-between px-2 py-1 bg-indigo-50 border-b border-indigo-100">
                <span className="text-[8px] text-indigo-600">‹</span>
                <span className="text-[8px] font-bold text-indigo-800">Week of Apr 20</span>
                <span className="text-[8px] text-indigo-600">›</span>
              </div>
              {/* Day headers */}
              <div className="grid grid-cols-8 border-b border-gray-200">
                <div className="col-span-1 px-0.5 py-0.5" />
                {days.map((d, i) => (
                  <div key={i} className={`col-span-1 text-center py-0.5 ${i === 0 ? 'bg-indigo-100' : ''}`}>
                    <p className="text-[6px] font-bold text-gray-600">{d}</p>
                    <p className={`text-[7px] font-bold ${i === 0 ? 'text-indigo-700' : 'text-gray-800'}`}>{20 + i}</p>
                  </div>
                ))}
              </div>
              {/* Rows */}
              {[
                { key: 'B', label: 'Bfst', rowColor: 'bg-amber-50' },
                { key: 'L', label: 'Lnch', rowColor: 'bg-green-50' },
                { key: 'D', label: 'Dinr', rowColor: 'bg-indigo-50' },
              ].map((row) => (
                <div key={row.key} className={`grid grid-cols-8 border-b border-gray-100 ${row.rowColor}`}>
                  <div className="col-span-1 flex items-center justify-center py-1">
                    <span className="text-[5px] font-bold text-gray-500 text-center leading-tight">{row.label}</span>
                  </div>
                  {days.map((_, i) => {
                    const slot = slots[`${row.key}-${i}`];
                    return (
                      <div key={i} className="col-span-1 p-0.5">
                        {slot ? (
                          <div className={`rounded p-0.5 ${slot.color}`}>
                            <p className="text-[4px] font-bold text-gray-800 leading-tight truncate">{slot.name}</p>
                            <p className="text-[4px] text-gray-500">{slot.time}</p>
                          </div>
                        ) : (
                          <div className="rounded border border-dashed border-gray-200 flex items-center justify-center" style={{ height: 22 }}>
                            <span className="text-[7px] text-gray-300">+</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
              {/* Snack row (collapsed) */}
              <div className="grid grid-cols-8 border-b border-gray-100 bg-yellow-50">
                <div className="col-span-1 flex items-center justify-center py-1">
                  <span className="text-[5px] font-bold text-gray-400">Snck</span>
                </div>
                {days.map((_, i) => (
                  <div key={i} className="col-span-1 p-0.5">
                    <div className="rounded border border-dashed border-gray-200 flex items-center justify-center" style={{ height: 16 }}>
                      <span className="text-[7px] text-gray-300">+</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Publish button */}
              <div className="px-2 py-1.5">
                <button className="w-full bg-indigo-600 text-white text-[8px] font-bold py-1 rounded-full">
                  ✓ Approve &amp; Share with Family
                </button>
              </div>
              {/* Bottom nav */}
              <div className="bg-white border-t border-gray-100 flex items-center justify-around py-1 px-2">
                <span className="text-[9px]">🏠</span>
                <span className="text-[10px] font-bold text-indigo-600">🍽</span>
                <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
                  <span className="text-[7px] text-white">🤖</span>
                </div>
                <span className="text-[9px]">🔔</span>
                <span className="text-[9px]">👤</span>
              </div>
            </div>
            <div className="bg-gray-800 flex justify-center py-1.5">
              <div className="w-14 h-1 bg-gray-500 rounded-full" />
            </div>
          </div>
          <p className="text-xs font-bold text-indigo-700 text-center">Meal Planner (Weekly View)</p>
        </div>

        {/* Zone annotations */}
        <div className="flex-1 space-y-3">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Screen Zones Annotated</p>
          {[
            { zone: 'Zone 1 — Header Bar', color: 'border-indigo-400 bg-indigo-50', desc: '"🍽 Meal Planner" title · Draft/Published status badge · Settings gear (opens Meal Settings)' },
            { zone: 'Zone 2 — Week Navigator', color: 'border-indigo-300 bg-indigo-50', desc: '← / → arrows to move between weeks · "Week of [date]" label in center' },
            { zone: 'Zone 3 — Day Headers', color: 'border-gray-300 bg-gray-50', desc: 'Mon–Sun abbreviated day names + date numbers · Today column highlighted in indigo' },
            { zone: 'Zone 4 — Meal Slot Grid', color: 'border-amber-300 bg-amber-50', desc: 'Rows: Breakfast, Morning Snack, Lunch, Evening Snack, Dinner, optional Weekend Dessert\nFilled slot: recipe name + cook time + difficulty dot + optional allergy icon\nEmpty slot: dashed "+" tap target → opens recipe picker bottom sheet' },
            { zone: 'Zone 5 — Allergy Alert', color: 'border-red-300 bg-red-50', desc: 'Hard red banner (blocking) if allergen detected · Soft amber inline note for disliked ingredient\nSubstitution hint shown below alert' },
            { zone: 'Zone 6 — Publish CTA', color: 'border-green-400 bg-green-50', desc: '"Approve & Share with Family" button · Changes plan status from Draft → Published\nSends push notification to all family members\nChild role members see plan as read-only after publish' },
            { zone: 'Zone 7 — Bottom Nav', color: 'border-gray-300 bg-gray-50', desc: 'Meal Planner tab active (🍽) · Home · AI Chat (FAB) · Notifications · Profile' },
            { zone: 'Zone 8 — Grocery Shortcut', color: 'border-teal-300 bg-teal-50', desc: 'Cart icon in header top-right → jump directly to Grocery List screen' },
          ].map((z) => (
            <div key={z.zone} className={`border-l-4 rounded-r-lg px-3 py-2 ${z.color}`}>
              <p className="text-xs font-bold text-gray-800">{z.zone}</p>
              <p className="text-[11px] text-gray-600 mt-0.5 whitespace-pre-line">{z.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — UI SCREEN ZONES (ALL MEAL PLANNER SCREENS)
// ═══════════════════════════════════════════════════════════════════════════════

const screenZoneData = [
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
      { name: 'Slot Context Menu', desc: 'Tap filled slot: view detail · replace · mark leftover · remove' },
      { name: 'Bottom Sheet (slot picker)', desc: '"Pick from library" tab · "Search" tab (inline scraper)' },
      { name: 'Allergy Alert Overlay', desc: 'Hard red blocking modal · amber soft warning inline' },
      { name: 'Publish Bar', desc: '"Approve & Share with Family" sticky bar at bottom; disabled if plan is empty' },
      { name: 'Child Role View', desc: 'Published plan shown read-only — no +, no context menu, no publish bar\nRecipe cards are tappable: kids can view full recipe detail and follow Cook Mode' },
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
    ],
  },
  {
    id: 'sz-cook',
    label: 'Cook Mode',
    color: 'bg-orange-100 border-orange-400',
    zones: [
      { name: 'Recipe Header', desc: 'Recipe name · total time · difficulty · serving count adjuster' },
      { name: 'Serving Scaler', desc: '− / + buttons; all ingredient quantities recalculate live' },
      { name: 'Ingredients Summary', desc: 'Scaled ingredient list shown at top for quick reference' },
      { name: 'Step Cards', desc: 'Full-width numbered steps; swipe right to advance; swipe left to go back' },
      { name: 'Timer Widget', desc: 'Auto-detected durations highlighted as tappable pills → countdown starts on tap' },
      { name: 'Screen Wake Lock', desc: 'Device screen stays on throughout cook mode; disables on exit' },
      { name: 'Child Role', desc: 'Kids can open Cook Mode from their read-only published plan view' },
      { name: 'Exit', desc: '"Done Cooking" button returns to Home Dashboard; back swipe returns to Meal Planner' },
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
      'Draft → Published flow: parent creates in Draft (only they see it); publish notifies whole family',
      'Child role (kids): view published plan as read-only; can tap recipe to see full detail and enter Cook Mode',
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
    ],
  },
  {
    id: 'fm-cook',
    title: 'Feature 5 — Dashboard & Cook Mode',
    icon: Clock,
    color: 'bg-orange-100 border-orange-300',
    tag: 'COOK',
    tagColor: 'bg-orange-600 text-white',
    subfeatures: [
      'Dashboard shows time-based meal card for the current meal window (configurable windows in Meal Settings)',
      '"Start Cooking" on meal card → launches Cook Mode full-screen',
      'Serving scaling: adjusting count multiplies all ingredient quantities proportionally',
      'Auto-countdown timers detected via regex on step text ("bake for 20 minutes" → tappable pill)',
      'Screen wake lock active throughout cook mode',
      'Morning notification (default 7:30am): today\'s breakfast and dinner',
      'Cook-start reminder: fires when prep + cook time before configured meal window',
      'Grocery reminder on shopping day if list has unchecked items',
      'Child role (kids): can open Cook Mode from their read-only meal plan view',
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
    id: 'fm-roles',
    title: 'Roles & Permissions in Meal Planner',
    icon: Users,
    color: 'bg-gray-100 border-gray-300',
    tag: 'PERMISSIONS',
    tagColor: 'bg-gray-700 text-white',
    subfeatures: [
      'Admin / Parent: create & edit recipes, assign planner slots, publish plan, generate grocery list, manage dietary profiles',
      'Member (Adult): create & edit own recipes, view and pick from library, view published plan — cannot publish',
      'Child role (kids): browse Recipe Library (read-only), view full Recipe Detail, follow Cook Mode, view published Meal Plan — cannot add, edit, or publish',
      'All roles: check off grocery list items, use Voice Input for grocery commands',
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
    from: 'Meal Planner (Publish)', to: 'Dashboard',
    color: 'border-indigo-400 bg-indigo-50',
    trigger: 'Parent taps "Approve & Share with Family"',
    what: 'Published plan feeds Dashboard time-based meal card for each member; morning notification triggered',
    dataFlow: 'published_plan → dashboard_agent → meal_card render',
  },
  {
    from: 'Meal Planner (Publish)', to: 'Push Notifications',
    color: 'border-indigo-300 bg-indigo-50',
    trigger: 'Plan status changes Draft → Published',
    what: 'Push notification sent to all family members: "This week\'s meal plan is ready 🍽"',
    dataFlow: 'family_member_ids → FCM push',
  },
  {
    from: 'Dashboard', to: 'Cook Mode',
    color: 'border-orange-400 bg-orange-50',
    trigger: 'User taps "Start Cooking" on time-based meal card',
    what: 'Opens Cook Mode full-screen with the recipe for the current meal window',
    dataFlow: 'meal_card(recipe_id) → cook_mode screen',
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
      <div className="bg-indigo-700 px-2 py-1">
        <div className="flex justify-between items-center">
          <p className="text-white text-[7px] font-bold">🍽 Planner</p>
          <span className="text-[5px] bg-yellow-400 text-gray-900 rounded-full px-1">Draft</span>
        </div>
      </div>
      <div className="px-1 py-0.5">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-[6px] text-indigo-600">‹</span>
          <span className="text-[6px] font-bold text-gray-700">Apr 20–26</span>
          <span className="text-[6px] text-indigo-600">›</span>
        </div>
        <div className="grid grid-cols-8 text-center mb-0.5">
          <div />
          {['M','T','W','T','F','S','S'].map((d,i) => (
            <div key={i} className={`text-[5px] font-bold ${i===0?'text-indigo-700':'text-gray-500'}`}>{d}</div>
          ))}
        </div>
        {[
          { row: 'B', color: 'bg-amber-50', fills: [1,0,1,0,1,0,0] },
          { row: 'L', color: 'bg-green-50',  fills: [0,1,0,1,0,1,0] },
          { row: 'D', color: 'bg-indigo-50', fills: [1,1,0,1,0,1,1] },
        ].map(({ row, color, fills }) => (
          <div key={row} className={`grid grid-cols-8 ${color} border-b border-gray-100 mb-0.5`}>
            <div className="flex items-center justify-center"><span className="text-[4px] font-bold text-gray-500">{row}</span></div>
            {fills.map((f, i) => (
              <div key={i} className="p-0.5">
                {f ? (
                  <div className="rounded bg-white border border-gray-200 flex items-center justify-center" style={{height:10}}>
                    <span className="text-[4px] text-gray-600">✓</span>
                  </div>
                ) : (
                  <div className="rounded border border-dashed border-gray-200 flex items-center justify-center" style={{height:10}}>
                    <span className="text-[6px] text-gray-300">+</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        <button className="w-full bg-indigo-600 text-white text-[6px] font-bold rounded-full py-0.5 mt-1">
          Approve &amp; Share
        </button>
        <p className="text-[5px] text-gray-400 text-center mt-0.5">Kids: read-only after publish</p>
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

function CookModePhone() {
  return (
    <div className="flex flex-col" style={{ minHeight: 200 }}>
      <div className="bg-orange-600 px-2 py-1.5">
        <p className="text-white text-[8px] font-bold">👨‍🍳 Cook Mode</p>
      </div>
      <div className="p-1.5">
        <p className="text-[8px] font-bold text-gray-800 mb-0.5">Creamy Chicken Pasta</p>
        <div className="flex gap-1 mb-1.5">
          <span className="text-[5px] bg-orange-100 rounded px-1">⏱ 45m</span>
          <span className="text-[5px] bg-orange-100 rounded px-1">👥 4</span>
        </div>
        <div className="bg-orange-50 rounded p-1 mb-1">
          <p className="text-[6px] font-bold text-gray-700 mb-0.5">Step 2 of 8</p>
          <p className="text-[6px] text-gray-600">Heat olive oil in a large pan over medium heat…</p>
          <div className="mt-1 bg-orange-200 rounded-full px-1 py-0.5 inline-block">
            <span className="text-[5px] font-bold text-orange-800">⏱ 3 min</span>
          </div>
        </div>
        <div className="flex gap-1">
          <button className="flex-1 bg-gray-100 rounded text-[6px] py-0.5">‹ Prev</button>
          <button className="flex-1 bg-orange-600 text-white rounded text-[6px] py-0.5">Next ›</button>
        </div>
        <p className="text-[5px] text-gray-400 text-center mt-1">Screen stays awake · Kids can follow steps</p>
      </div>
    </div>
  );
}

function MealPlannerInteractivePhoneFlow() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const phoneScreens: PhoneScreen[] = [
    {
      id: 'settings',
      label: 'Meal Settings',
      sublabel: 'Configure first',
      accent: 'border-rose-500',
      arrowLabel: 'Set up',
      content: <MealSettingsPhone />,
    },
    {
      id: 'search',
      label: 'Recipe Search',
      sublabel: 'Find recipes',
      accent: 'border-amber-500',
      arrowLabel: 'Add recipe',
      content: <RecipeSearchPhone />,
    },
    {
      id: 'library',
      label: 'Recipe Library',
      sublabel: 'Your collection',
      accent: 'border-green-600',
      arrowLabel: 'Pick for slot',
      content: <RecipeLibraryPhone />,
    },
    {
      id: 'planner',
      label: 'Meal Planner',
      sublabel: 'Plan the week',
      accent: 'border-indigo-500',
      arrowLabel: 'Publish →\nGenerate',
      content: <MealPlannerPhone />,
    },
    {
      id: 'grocery',
      label: 'Grocery List',
      sublabel: 'Shop & check off',
      accent: 'border-teal-500',
      arrowLabel: 'Start cooking',
      content: <GroceryPhone />,
    },
    {
      id: 'cook',
      label: 'Cook Mode',
      sublabel: 'Step-by-step',
      accent: 'border-orange-500',
      content: <CookModePhone />,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-1">
        <Smartphone className="w-5 h-5 text-orange-500" />
        <h2 className="text-xl font-bold text-gray-900">Interactive Screen Flow — Phone Mockups</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Tap any phone to highlight it. The flow reads left to right — each screen is reachable from the previous.
      </p>

      {/* Horizontal scroll flow */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-start gap-0 min-w-max">
          {phoneScreens.map((ps, idx) => (
            <div key={ps.id} className="flex items-start">
              <motion.div
                className="cursor-pointer"
                onClick={() => setActiveId(activeId === ps.id ? null : ps.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                <PhoneShell
                  label={ps.label}
                  sublabel={ps.sublabel}
                  accent={activeId === ps.id ? 'border-indigo-500' : ps.accent}
                >
                  {ps.content}
                </PhoneShell>
              </motion.div>
              {idx < phoneScreens.length - 1 && (
                <FlowArrow label={ps.arrowLabel} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail on tap */}
      <AnimatePresence>
        {activeId && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <p className="text-xs font-bold text-indigo-800 mb-1">
                {phoneScreens.find(p => p.id === activeId)?.label}
              </p>
              <p className="text-xs text-indigo-700">
                {activeId === 'settings' && 'Configure dietary profiles per member, family defaults, and store mappings before using the planner.'}
                {activeId === 'search' && 'Search by dish name or ingredient — backend scraper queries recipe sites. Also supports Import from URL and Manual creation.'}
                {activeId === 'library' && 'All saved recipes in one place. Kids can browse and view full recipe detail in read-only mode.'}
                {activeId === 'planner' && 'Assign recipes to weekly slots. Allergy check fires on every assignment. Publish sends push notification to family. Kids see read-only view.'}
                {activeId === 'grocery' && 'One-tap generation from the weekly plan. Merges duplicates, assigns stores, auto-creates a shopping task. Voice control available.'}
                {activeId === 'cook' && 'Full-screen step-by-step cooking with live serving scaler and auto-timers. Kids can follow Cook Mode from their view of the published plan.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kids access callout */}
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
        <Eye className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-yellow-800">Child Role — What Kids Can Access</p>
          <ul className="text-xs text-yellow-700 mt-1 space-y-0.5">
            <li>• <strong>Recipe Library:</strong> browse all recipes, view full recipe detail — read-only</li>
            <li>• <strong>Meal Planner:</strong> view published weekly plan — read-only, no editing</li>
            <li>• <strong>Cook Mode:</strong> tap any recipe on the published plan to follow step-by-step</li>
            <li>• <strong>Grocery List:</strong> can check off items while shopping</li>
            <li>• <strong>Cannot:</strong> add/edit/delete recipes, assign planner slots, publish a plan, or change dietary profiles</li>
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
    description: 'Entry point on every app open. Shows time-based meal card from the published weekly plan.',
    userAction: 'Sees today\'s meal card ("Dinner: Chicken Pasta — 45 min")\nTaps "Start Cooking" → Cook Mode\nTaps Meal Planner tab in bottom nav\nTaps morning notification to jump to planner',
    systemResponse: 'Dashboard agent fetches published meal_plan for current week\nDetermines current meal window (breakfast/lunch/dinner) based on time\nRenders meal card with recipe name, cook time, "Start Cooking" CTA\nMorning push notification (7:30am): today\'s breakfast + dinner',
    nextScreens: ['Cook Mode (via Start Cooking)', 'Meal Planner (via nav)', 'Meal Settings (via settings icon)'],
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
    description: '7-column grid (Mon–Sun) with meal rows. Parent drafts then publishes. Family sees read-only view; kids can follow recipes from published plan.',
    userAction: 'Navigates weeks (← →)\nTaps + on empty slot → bottom sheet: "Pick from library" or "Search"\nSets servings per slot; marks leftover\nTaps "Approve & Share with Family" to publish',
    systemResponse: 'Allergy check on every assignment:\n→ Hard red blocking alert if allergen found\n→ Soft amber inline warning for disliked ingredient\n→ Substitution hint from pre-authored table\nNew week = Draft (visible only to creating parent)\nPublish: status → Published, push notification to all members',
    nextScreens: ['Grocery List (generate)', 'Cook Mode (via Dashboard)', 'Recipe Search (inline search from slot picker)'],
    childAccess: 'After plan is published: kids see read-only weekly grid. They can tap any recipe to view full detail and launch Cook Mode.',
  },
  {
    id: 'sbs-grocery',
    screen: 'Grocery List & Store Management',
    tag: 'GROCERY',
    tagColor: 'bg-teal-600 text-white',
    description: 'Rule-based generation from the published weekly plan. Automatically creates a shopping task and a shared family list.',
    userAction: 'Taps "Generate grocery list" from planner\nAssigns items to stores (defaults applied automatically)\nChecks off items while shopping (live sync across family)\nVoice: "Add milk" / "Mark eggs as done"',
    systemResponse: 'Collects all planner entries for the week (skips leftover-marked slots)\nMerges duplicates by summing where unit matches\nApplies category taxonomy and store mapping\nCreates shared List entity (source_meal_plan_id set)\nAuto-creates "Grocery shopping — Week N" task due on shopping_day',
    nextScreens: ['Lists module (shared family list)', 'Tasks module (shopping task)'],
    childAccess: 'Kids can check off items on the grocery list.',
  },
  {
    id: 'sbs-cook',
    screen: 'Cook Mode',
    tag: 'COOK',
    tagColor: 'bg-orange-600 text-white',
    description: 'Full-screen step-by-step cooking view launched from the dashboard meal card. Screen stays awake.',
    userAction: 'Taps "Start Cooking" on dashboard meal card\nAdjusts serving count (quantities scale live)\nFollows numbered steps; taps timer pills for countdown\nTaps "Done Cooking" when finished',
    systemResponse: 'Serving scaling multiplies all ingredient quantities proportionally\nAuto-detects timer durations via regex ("bake for 20 minutes" → pill)\nScreen wake lock active\nCook-start reminder: fires at (meal_window_start − prep_time − cook_time)\nRule-based. No AI.',
    nextScreens: ['Home Dashboard', 'Meal Planner'],
    childAccess: 'Kids can enter Cook Mode from their read-only published plan view by tapping any recipe.',
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
            { label: 'Cook Mode', color: 'bg-orange-600 text-white' },
            { label: '+', color: 'text-gray-400 font-bold' },
            { label: 'Voice', color: 'bg-violet-600 text-white' },
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

      <MealPlannerMainScreenMockup />
      <MealPlannerUIScreenZones />
      <MealPlannerFeatureMapSection />
      <MealPlannerCrossModuleConnections />
      <MealPlannerInteractivePhoneFlow />
      <MealPlannerScreenByScreen />
    </div>
  );
}
