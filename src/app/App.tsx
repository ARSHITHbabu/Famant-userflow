import { useState } from 'react';
import { PhoneLayoutDiagram } from './components/PhoneLayoutDiagram';
import { ScreenFlowDiagram } from './components/ScreenFlowDiagram';
import { FeatureMap } from './components/FeatureMap';
import { ScreenZones } from './components/ScreenZones';
import { UserActions } from './components/UserActions';
import { ResultingActions } from './components/ResultingActions';
import { SystemProcesses } from './components/SystemProcesses';
import { ModuleConnections } from './components/ModuleConnections';

export default function App() {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Onboarding & App Entry Flow — Famant
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Login → Join / Create Family → Dashboard · Phone Layout + Screen Flow Diagrams
          </p>
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
      </div>
    </div>
  );
}
