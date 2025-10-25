import React from 'react';
import { formatarMoeda } from '../../utils/formatadores';

export default function Header({ saldoAtual, patrimonioLiquido }) {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo e Título */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-2">
              💰 Central Financeira
            </h1>
            <p className="text-purple-100 text-sm mt-1">
              Vinícius & Brenda
            </p>
          </div>

          {/* Resumo Rápido */}
          <div className="flex gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-xs text-purple-100 uppercase tracking-wide">Saldo Total</p>
              <p className="text-2xl font-bold mt-1">
                R$ {formatarMoeda(saldoAtual)}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-xs text-purple-100 uppercase tracking-wide">Patrimônio Líquido</p>
              <p className={`text-2xl font-bold mt-1 ${
                patrimonioLiquido >= 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                R$ {formatarMoeda(patrimonioLiquido)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
