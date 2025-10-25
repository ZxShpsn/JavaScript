import React from 'react';
import { formatarMoeda } from '../../utils/formatadores';

const cores = {
  green: 'bg-green-100 text-green-600',
  red: 'bg-red-100 text-red-600',
  blue: 'bg-blue-100 text-blue-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
  yellow: 'bg-yellow-100 text-yellow-600'
};

export default function CardResumo({ titulo, valor, icone, cor = 'blue' }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium mb-1">{titulo}</p>
          <p className={`text-2xl font-bold ${valor < 0 ? 'text-red-600' : 'text-' + cor + '-600'}`}>
            R$ {formatarMoeda(Math.abs(valor))}
          </p>
          {valor < 0 && <span className="text-xs text-red-500">(negativo)</span>}
        </div>
        <div className={`p-3 rounded-full ${cores[cor]}`}>
          <span className="text-2xl">{icone}</span>
        </div>
      </div>
    </div>
  );
}
