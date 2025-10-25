import React, { useState } from 'react';
import { useFinanceiro } from './hooks/useFinanceiro';

// Layout
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';

// Páginas
import Dashboard from './components/Dashboard/Dashboard';
import Transacoes from './components/Transacoes/Transacoes';
import Dividas from './components/Dividas/Dividas';
import Orcamento from './components/Orcamento/Orcamento';
import Carteira from './components/Carteira/Carteira';
import Metas from './components/Metas/Metas';
import Insights from './components/Insights/Insights';

function App() {
  const [abaAtiva, setAbaAtiva] = useState('dashboard');

  // Hook com toda a lógica financeira
  const {
    // Estado bruto
    transacoes,
    dividas,
    orcamentos,
    metas,

    // Cálculos de transações
    receitasMesAtual,
    despesasMesAtual,
    saldoAtual,
    saldoPorConta,
    top5DespesasMes,
    ultimas5Transacoes,
    despesasPorCategoria,

    // Cálculos de dívidas
    totalDividas,
    totalPrestacoes,
    patrimonioLiquido,

    // Insights
    diasDecorridos,
    mediaDiariaGastos,
    taxaPoupanca,
    projecaoFimMes,
    maiorCategoriaGasto,

    // Orçamento
    usoPorCategoria,

    // Funções de transações
    adicionarTransacao,
    removerTransacao,

    // Funções de dívidas
    adicionarDivida,
    removerDivida,

    // Funções de metas
    adicionarMeta,
    atualizarProgressoMeta,
    removerMeta,

    // Funções de orçamento
    definirOrcamento,
    removerOrcamento
  } = useFinanceiro();

  // Renderizar conteúdo baseado na aba ativa
  const renderizarConteudo = () => {
    switch (abaAtiva) {
      case 'dashboard':
        return (
          <Dashboard
            receitasMesAtual={receitasMesAtual}
            despesasMesAtual={despesasMesAtual}
            saldoAtual={saldoAtual}
            patrimonioLiquido={patrimonioLiquido}
            totalDividas={totalDividas}
            totalPrestacoes={totalPrestacoes}
            top5DespesasMes={top5DespesasMes}
            ultimas5Transacoes={ultimas5Transacoes}
            metas={metas}
          />
        );

      case 'transacoes':
        return (
          <Transacoes
            transacoes={transacoes}
            adicionarTransacao={adicionarTransacao}
            removerTransacao={removerTransacao}
            receitasMesAtual={receitasMesAtual}
            despesasMesAtual={despesasMesAtual}
          />
        );

      case 'dividas':
        return (
          <Dividas
            dividas={dividas}
            adicionarDivida={adicionarDivida}
            removerDivida={removerDivida}
            totalDividas={totalDividas}
            totalPrestacoes={totalPrestacoes}
          />
        );

      case 'orcamento':
        return (
          <Orcamento
            orcamentos={orcamentos}
            usoPorCategoria={usoPorCategoria}
            definirOrcamento={definirOrcamento}
            removerOrcamento={removerOrcamento}
          />
        );

      case 'carteira':
        return (
          <Carteira
            saldoPorConta={saldoPorConta}
            saldoAtual={saldoAtual}
          />
        );

      case 'metas':
        return (
          <Metas
            metas={metas}
            adicionarMeta={adicionarMeta}
            atualizarProgressoMeta={atualizarProgressoMeta}
            removerMeta={removerMeta}
          />
        );

      case 'insights':
        return (
          <Insights
            receitasMesAtual={receitasMesAtual}
            despesasMesAtual={despesasMesAtual}
            mediaDiariaGastos={mediaDiariaGastos}
            taxaPoupanca={taxaPoupanca}
            projecaoFimMes={projecaoFimMes}
            maiorCategoriaGasto={maiorCategoriaGasto}
            totalDividas={totalDividas}
            totalPrestacoes={totalPrestacoes}
            diasDecorridos={diasDecorridos}
          />
        );

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header
        saldoAtual={saldoAtual}
        patrimonioLiquido={patrimonioLiquido}
      />

      {/* Navigation */}
      <Navigation
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
      />

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8">
        {renderizarConteudo()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            Central Financeira - Vinícius & Brenda | {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
