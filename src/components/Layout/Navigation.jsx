import React from 'react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'transacoes', label: 'Transações', icon: '💸' },
  { id: 'dividas', label: 'Dívidas', icon: '💳' },
  { id: 'orcamento', label: 'Orçamento', icon: '📈' },
  { id: 'carteira', label: 'Carteira', icon: '👛' },
  { id: 'metas', label: 'Metas', icon: '🎯' },
  { id: 'insights', label: 'Insights', icon: '💡' }
];

export default function Navigation({ abaAtiva, setAbaAtiva }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto gap-1 py-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setAbaAtiva(item.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap
                transition-all duration-200
                ${abaAtiva === item.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
