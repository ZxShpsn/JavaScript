import React from 'react';
import { formatarMoeda, formatarPorcentagem } from '../../utils/formatadores';
import { calcularDiasRestantes } from '../../utils/calculos';

export default function Insights({
  receitasMesAtual,
  despesasMesAtual,
  mediaDiariaGastos,
  taxaPoupanca,
  projecaoFimMes,
  maiorCategoriaGasto,
  totalDividas,
  totalPrestacoes,
  diasDecorridos
}) {
  const diasRestantes = calcularDiasRestantes();
  const saldoMes = receitasMesAtual - despesasMesAtual;

  // Gerar recomendações inteligentes
  const recomendacoes = [];

  // Recomendação 1: Taxa de poupança
  if (taxaPoupanca < 10) {
    recomendacoes.push({
      tipo: 'alerta',
      titulo: 'Taxa de Poupança Baixa',
      mensagem: `Sua taxa de poupança está em ${formatarPorcentagem(taxaPoupanca)}. Tente aumentar para pelo menos 20% das suas receitas.`,
      icone: '⚠️'
    });
  } else if (taxaPoupanca >= 20) {
    recomendacoes.push({
      tipo: 'sucesso',
      titulo: 'Excelente Taxa de Poupança!',
      mensagem: `Parabéns! Você está poupando ${formatarPorcentagem(taxaPoupanca)} das suas receitas.`,
      icone: '🎉'
    });
  }

  // Recomendação 2: Projeção de gastos
  if (projecaoFimMes > receitasMesAtual) {
    const deficit = projecaoFimMes - receitasMesAtual;
    recomendacoes.push({
      tipo: 'alerta',
      titulo: 'Atenção: Risco de Déficit',
      mensagem: `Com base nos seus gastos atuais, você pode ter um déficit de R$ ${formatarMoeda(deficit)} até o fim do mês.`,
      icone: '🚨'
    });
  }

  // Recomendação 3: Dívidas
  if (totalDividas > 0) {
    const percentualPrestacoes = receitasMesAtual > 0
      ? (totalPrestacoes / receitasMesAtual) * 100
      : 0;

    if (percentualPrestacoes > 30) {
      recomendacoes.push({
        tipo: 'alerta',
        titulo: 'Alto Comprometimento com Dívidas',
        mensagem: `${formatarPorcentagem(percentualPrestacoes)} da sua renda está comprometida com prestações. Tente reduzir para menos de 30%.`,
        icone: '💳'
      });
    }
  }

  // Recomendação 4: Maior categoria
  if (maiorCategoriaGasto) {
    const percentual = receitasMesAtual > 0
      ? (maiorCategoriaGasto.valor / receitasMesAtual) * 100
      : 0;

    if (percentual > 40) {
      recomendacoes.push({
        tipo: 'info',
        titulo: 'Categoria de Maior Gasto',
        mensagem: `${maiorCategoriaGasto.categoria} representa ${formatarPorcentagem(percentual)} dos seus gastos. Avalie se há oportunidade de otimização.`,
        icone: '💡'
      });
    }
  }

  // Recomendação 5: Saldo positivo
  if (saldoMes > 0 && taxaPoupanca > 15) {
    recomendacoes.push({
      tipo: 'sucesso',
      titulo: 'Ótimo Desempenho!',
      mensagem: `Você tem um saldo positivo de R$ ${formatarMoeda(saldoMes)} este mês. Continue assim!`,
      icone: '✨'
    });
  }

  return (
    <div className="space-y-6">
      {/* Cards de Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Média Diária */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">📅</span>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Média de Gastos Diários
              </p>
            </div>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            R$ {formatarMoeda(mediaDiariaGastos)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Baseado em {diasDecorridos} dias
          </p>
        </div>

        {/* Taxa de Poupança */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">💰</span>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Taxa de Poupança
              </p>
            </div>
          </div>
          <p className={`text-2xl font-bold ${
            taxaPoupanca >= 20 ? 'text-green-600' :
            taxaPoupanca >= 10 ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {formatarPorcentagem(taxaPoupanca)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {taxaPoupanca >= 20 ? 'Excelente!' :
             taxaPoupanca >= 10 ? 'Bom' :
             'Atenção!'}
          </p>
        </div>

        {/* Projeção Fim do Mês */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">📊</span>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Projeção Fim do Mês
              </p>
            </div>
          </div>
          <p className={`text-2xl font-bold ${
            projecaoFimMes > receitasMesAtual ? 'text-red-600' : 'text-blue-600'
          }`}>
            R$ {formatarMoeda(projecaoFimMes)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {diasRestantes} dias restantes
          </p>
        </div>

        {/* Maior Categoria */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🏆</span>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Maior Categoria
              </p>
            </div>
          </div>
          {maiorCategoriaGasto ? (
            <>
              <p className="text-lg font-bold text-orange-600 truncate">
                {maiorCategoriaGasto.categoria}
              </p>
              <p className="text-xl font-bold text-gray-700 mt-1">
                R$ {formatarMoeda(maiorCategoriaGasto.valor)}
              </p>
            </>
          ) : (
            <p className="text-gray-400">Sem gastos</p>
          )}
        </div>
      </div>

      {/* Análise Mensal */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          📈 Análise Mensal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gráfico de Receitas vs Despesas */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-gray-700 mb-4">
              Receitas vs Despesas
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-green-600 font-medium">Receitas</span>
                  <span className="font-bold">R$ {formatarMoeda(receitasMesAtual)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-red-600 font-medium">Despesas</span>
                  <span className="font-bold">R$ {formatarMoeda(despesasMesAtual)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full"
                    style={{
                      width: `${receitasMesAtual > 0
                        ? Math.min((despesasMesAtual / receitasMesAtual) * 100, 100)
                        : 0
                      }%`
                    }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-300">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-700">Saldo</span>
                  <span className={`text-xl font-bold ${
                    saldoMes >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {saldoMes >= 0 ? '+' : '-'}R$ {formatarMoeda(Math.abs(saldoMes))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Velocidade de Gastos */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-gray-700 mb-4">
              Velocidade de Gastos
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Média por dia</p>
                <p className="text-3xl font-bold text-purple-600 my-2">
                  R$ {formatarMoeda(mediaDiariaGastos)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-300">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Dias decorridos</p>
                  <p className="text-xl font-bold text-blue-600">
                    {diasDecorridos}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Dias restantes</p>
                  <p className="text-xl font-bold text-orange-600">
                    {diasRestantes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recomendações */}
      {recomendacoes.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            💡 Recomendações Personalizadas
          </h2>

          <div className="space-y-4">
            {recomendacoes.map((rec, index) => (
              <div
                key={index}
                className={`rounded-lg p-5 border-2 ${
                  rec.tipo === 'alerta'
                    ? 'bg-red-50 border-red-200'
                    : rec.tipo === 'sucesso'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{rec.icone}</span>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${
                      rec.tipo === 'alerta'
                        ? 'text-red-700'
                        : rec.tipo === 'sucesso'
                        ? 'text-green-700'
                        : 'text-blue-700'
                    }`}>
                      {rec.titulo}
                    </h3>
                    <p className="text-gray-700 mt-1">{rec.mensagem}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
