const connections = [
  {
    from: 'Dashboard',
    to: 'Calendar / Reminders',
    how: 'Tapping an upcoming event card → Calendar module filtered to that date',
    color: 'border-purple-400 bg-purple-50',
  },
  {
    from: 'Dashboard',
    to: 'Tasks',
    how: 'Tapping an AI task card → Task module with that task highlighted',
    color: 'border-blue-400 bg-blue-50',
  },
  {
    from: 'Dashboard',
    to: 'Expenses',
    how: '"View Detailed Report" → Expense module on monthly report',
    color: 'border-rose-400 bg-rose-50',
  },
  {
    from: 'Dashboard',
    to: 'Lists',
    how: '"Groceries to buy" card → Shared Lists module on that list',
    color: 'border-orange-400 bg-orange-50',
  },
  {
    from: 'Dashboard',
    to: 'Document Vault',
    how: 'Passport expiry reminder → Document Vault showing that document',
    color: 'border-indigo-400 bg-indigo-50',
  },
  {
    from: 'Dashboard',
    to: 'AI Chat',
    how: 'Center FAB button → AI Chat screen with full assistant',
    color: 'border-gray-400 bg-gray-50',
  },
  {
    from: 'Member Avatar',
    to: 'Individual Member View',
    how: 'Tapping an avatar → member snapshot with their shared state',
    color: 'border-green-400 bg-green-50',
  },
];

export function ModuleConnections() {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Module Connections from Dashboard</h2>
      <p className="text-sm text-gray-600 mb-4">How the Dashboard links out to every feature module</p>
      <div className="space-y-2">
        {connections.map((c, i) => (
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
  );
}
