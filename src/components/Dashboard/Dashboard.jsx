import React from 'react';
import CardResumo from './CardResumo';
import { formatarMoeda, formatarData } from '../../utils/formatadores';

export default function Dashboard({
  receitasMesAtual,
  despesasMesAtual,
  saldoAtual,
  patrimonioLiquido,
  totalDividas,
  totalPrestacoes,
  top5DespesasMes,
  ultimas5Transacoes,
  metas
}) {
  const saldoMes = receitasMesAtual - despesasMesAtual;

  // Metas com maior progresso
  const metasDestaque = [...metas]
    .sort((a, b) => b.progresso - a.progresso)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Cards de Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardResumo
          titulo="Receitas do Mês"
          valor={receitasMesAtual}
          icone="💰"
          cor="green"
        />

        <CardResumo
          titulo="Despesas do Mês"
          valor={despesasMesAtual}
          icone="💸"
          cor="red"
        />

        <CardResumo
          titulo="Saldo do Mês"
          valor={saldoMes}
          icone={saldoMes >= 0 ? '📈' : '📉'}
          cor={saldoMes >= 0 ? 'blue' : 'red'}
        />

        <CardResumo
          titulo="Patrimônio Líquido"
          valor={patrimonioLiquido}
          icone="💎"
          cor={patrimonioLiquido >= 0 ? 'purple' : 'red'}
        />
      </div>

      {/* Resumo de Dívidas */}
      {totalDividas > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            💳 Resumo de Dívidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-red-600 font-medium">Total de Dívidas</p>
              <p className="text-2xl font-bold text-red-700 mt-1">
                R$ {formatarMoeda(totalDividas)}
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-sm text-orange-600 font-medium">Prestações Mensais</p>
              <p className="text-2xl font-bold text-orange-700 mt-1">
                R$ {formatarMoeda(totalPrestacoes)}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-yellow-600 font-medium">Impacto no Patrimônio</p>
              <p className="text-2xl font-bold text-yellow-700 mt-1">
                -{formatarMoeda(totalDividas)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Maiores Despesas */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🔥 Top 5 Despesas do Mês
          </h2>
          {top5DespesasMes.length > 0 ? (
            <div className="space-y-3">
              {top5DespesasMes.map((transacao, index) => (
                <div
                  key={transacao.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-400">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">
                        {transacao.categoria}
                      </p>
                      {transacao.subcategoria && (
                        <p className="text-xs text-gray-500">
                          {transacao.subcategoria}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-lg font-bold text-red-600">
                    R$ {formatarMoeda(transacao.valor)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Nenhuma despesa registrada este mês
            </p>
          )}
        </div>

        {/* Últimas Transações */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🕐 Últimas Transações
          </h2>
          {ultimas5Transacoes.length > 0 ? (
            <div className="space-y-3">
              {ultimas5Transacoes.map(transacao => (
                <div
                  key={transacao.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {transacao.tipo === 'receita' ? '💰' : '💸'}
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">
                          {transacao.categoria}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatarData(transacao.competencia)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className={`text-lg font-bold ${
                    transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transacao.tipo === 'receita' ? '+' : '-'}
                    R$ {formatarMoeda(transacao.valor)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Nenhuma transação registrada
            </p>
          )}
        </div>
      </div>

      {/* Progresso de Metas */}
      {metasDestaque.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🎯 Progresso das Metas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metasDestaque.map(meta => (
              <div key={meta.id} className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-800 mb-2">{meta.nome}</p>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>R$ {formatarMoeda(meta.valorAtual)}</span>
                    <span>R$ {formatarMoeda(meta.valorAlvo)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(meta.progresso, 100)}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm font-bold text-green-600 text-center">
                  {meta.progresso.toFixed(1)}% atingido
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
