import React from 'react';
import { CONTAS } from '../../constants/financeiro';
import { formatarMoeda } from '../../utils/formatadores';

export default function Carteira({ saldoPorConta, saldoAtual }) {
  // Garantir que todas as contas apareçam, mesmo sem transações
  const contasComSaldo = CONTAS.map(conta => ({
    nome: conta,
    saldo: saldoPorConta[conta] || 0,
    isCompartilhada: conta === 'Noh (Compartilhado)'
  }));

  // Ordenar: Noh primeiro, depois por saldo
  const contasOrdenadas = contasComSaldo.sort((a, b) => {
    if (a.isCompartilhada) return -1;
    if (b.isCompartilhada) return 1;
    return b.saldo - a.saldo;
  });

  return (
    <div className="space-y-6">
      {/* Resumo Total */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg p-8">
        <p className="text-sm uppercase tracking-wide opacity-90">
          Saldo Total da Carteira
        </p>
        <p className="text-5xl font-bold mt-2">
          R$ {formatarMoeda(saldoAtual)}
        </p>
      </div>

      {/* Lista de Contas */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          👛 Minhas Contas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contasOrdenadas.map(conta => (
            <div
              key={conta.nome}
              className={`rounded-lg p-5 border-2 transition-shadow hover:shadow-md ${
                conta.isCompartilhada
                  ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-300'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800">
                      {conta.nome}
                    </h3>
                    {conta.isCompartilhada && (
                      <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        ⭐ Principal
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {conta.nome.includes('Débito') && 'Conta corrente'}
                    {conta.nome.includes('Crédito') && 'Cartão de crédito'}
                    {conta.nome === 'Dinheiro' && 'Espécie'}
                    {conta.isCompartilhada && 'Conta compartilhada do casal'}
                    {conta.nome === 'Santander' && 'Conta bancária'}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-1">Saldo</p>
                <p
                  className={`text-2xl font-bold ${
                    conta.saldo >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  R$ {formatarMoeda(Math.abs(conta.saldo))}
                </p>
                {conta.saldo < 0 && (
                  <span className="text-xs text-red-500 font-medium">
                    (saldo negativo)
                  </span>
                )}
              </div>

              {/* Barra visual */}
              {saldoAtual > 0 && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        conta.isCompartilhada
                          ? 'bg-purple-600'
                          : 'bg-blue-500'
                      }`}
                      style={{
                        width: `${Math.max(0, Math.min(100, (Math.abs(conta.saldo) / saldoAtual) * 100))}%`
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {((Math.abs(conta.saldo) / saldoAtual) * 100).toFixed(1)}%
                    do total
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Total de Contas</p>
              <p className="text-xl font-bold text-gray-800 mt-1">
                {CONTAS.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Contas com Saldo</p>
              <p className="text-xl font-bold text-gray-800 mt-1">
                {contasComSaldo.filter(c => c.saldo !== 0).length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Conta Principal</p>
              <p className="text-xl font-bold text-purple-600 mt-1">
                Noh
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
