import { useState } from 'react';
import { PhoneLayoutDiagram } from './components/PhoneLayoutDiagram';
import { ScreenFlowDiagram } from './components/ScreenFlowDiagram';
import { FeatureMap } from './components/FeatureMap';
import { ScreenZones } from './components/ScreenZones';
import { UserActions } from './components/UserActions';
import { ResultingActions } from './components/ResultingActions';
import { SystemProcesses } from './components/SystemProcesses';
import { ModuleConnections } from './components/ModuleConnections';
import { MealPlannerHub, MealPlannerScreenFlowDiagram, MealPlannerWorkflow } from './components/MealPlannerFeature';
import { CarePointsOverview, CarePointsPhoneLayouts } from './components/CarePointsFeature';
import { SettingsOverview, SettingsRoleScreens, SettingsFlows, SettingsCarePointsFlow, SettingsAnalyticsFlow, SettingsLanguageLocalizationFlow, SettingsMemberStatusFlow } from './components/SettingsFeature';

export default function App() {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Onboarding & App Entry Flow — Famant
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Login → Join / Create Family → Dashboard · Phone Layout + Screen Flow Diagrams
              </p>
            </div>
            {/* Section jump nav */}
            <nav className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-gray-400 font-medium mr-1">Jump to:</span>
              <a
                href="#onboarding-top"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                ↑ Top
              </a>
              <a
                href="#section-7-settings"
                onClick={(e) => { e.preventDefault(); document.getElementById('section-7-settings')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-violet-100 text-violet-700 hover:bg-violet-200 transition-colors cursor-pointer"
              >
                S7 · Settings
              </a>
              <a
                href="#section-7b-localization"
                onClick={(e) => { e.preventDefault(); document.getElementById('section-7b-localization')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-violet-100 text-violet-700 hover:bg-violet-200 transition-colors cursor-pointer"
              >
                S7B · Localization
              </a>
              <a
                href="#section-7c-status"
                onClick={(e) => { e.preventDefault(); document.getElementById('section-7c-status')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors cursor-pointer"
              >
                S7C · Status
              </a>
              <a
                href="#section-14"
                onClick={(e) => { e.preventDefault(); document.getElementById('section-14')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors cursor-pointer"
              >
                S14 · Meal Planner
              </a>
              <a
                href="#section-15"
                onClick={(e) => { e.preventDefault(); document.getElementById('section-15')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors cursor-pointer"
              >
                S15 · Care Points
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="font-semibold text-blue-900 mb-2">How to Read This Diagram</h2>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• The flow starts at the Login screen (phone number or social login)</li>
            <li>• After login the user chooses: Create a Family OR Join a Family</li>
            <li>• Both paths converge at the same Dashboard (Home) screen</li>
            <li>• The Dashboard phone mockup matches the actual Famant UI design</li>
            <li>• Scroll down for the detailed screen-by-screen flow and feature breakdown</li>
          </ul>
        </div>

        {/* Main 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <UserActions onSelectFlow={setSelectedFlow} selectedFlow={selectedFlow} />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <ScreenZones onSelectZone={setSelectedFlow} selectedZone={selectedFlow} />
            <FeatureMap onSelectFeature={setSelectedFeature} selectedFeature={selectedFeature} />
          </div>
          <div className="lg:col-span-1">
            <ResultingActions selectedFlow={selectedFlow} />
          </div>
        </div>

        {/* System + Connections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SystemProcesses />
          <ModuleConnections />
        </div>

        {/* Phone diagrams section */}
        <div className="border-t-2 border-dashed border-indigo-200 pt-2">
          <p className="text-xs text-indigo-400 uppercase tracking-widest font-semibold mb-6">
            Mobile Phone Layout & Screen Flow Diagrams
          </p>
        </div>

        <PhoneLayoutDiagram />
        <ScreenFlowDiagram />

        {/* Section 7 — Profile & Settings */}
        <div id="section-7-settings" className="border-t-2 border-dashed border-violet-200 pt-2">
          <p className="text-xs text-violet-400 uppercase tracking-widest font-semibold mb-6">
            Section 7 · Profile &amp; Settings — Role-Based UI · 3 Roles · 17 Flows · Care Points · Analytics
          </p>
        </div>
        <SettingsOverview />
        <SettingsRoleScreens />
        <SettingsFlows />
        <SettingsCarePointsFlow />
        <SettingsAnalyticsFlow />

        {/* Section 7B — Language & Localization */}
        <div id="section-7b-localization" className="border-t-2 border-dashed border-violet-200 pt-2">
          <p className="text-xs text-violet-400 uppercase tracking-widest font-semibold mb-6">
            Section 7B · Language &amp; Localization — Language · Country · Region → Auto Currency &amp; Time Zone
          </p>
        </div>
        <SettingsLanguageLocalizationFlow />

        {/* Section 7C — Household Member Current Status */}
        <div id="section-7c-status" className="border-t-2 border-dashed border-amber-200 pt-2">
          <p className="text-xs text-amber-500 uppercase tracking-widest font-semibold mb-6">
            Section 7C · Household Member Current Status — 🟢 Full · 🟡 Reduced (custom %) · 🔴 On Rest
          </p>
        </div>
        <SettingsMemberStatusFlow />

        {/* Section 14 — Meal Planner Workflow */}
        <div id="section-14" className="border-t-2 border-dashed border-green-200 pt-2">
          <p className="text-xs text-green-500 uppercase tracking-widest font-semibold mb-6">
            Section 14 · Meal Planner Feature Workflow
          </p>
        </div>
        <MealPlannerHub />
        <MealPlannerScreenFlowDiagram />
        <MealPlannerWorkflow />

        {/* Section 15 — Care Points System */}
        <div id="section-15" className="border-t-2 border-dashed border-indigo-300 pt-2">
          <p className="text-xs text-indigo-500 uppercase tracking-widest font-semibold mb-6">
            Section 15 · Care Points — Household Effort Visibility System
          </p>
        </div>
        <CarePointsOverview />
        <CarePointsPhoneLayouts />
      </div>
    </div>
  );
}
