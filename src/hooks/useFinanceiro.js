import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  calcularTotalPorTipo,
  calcularSaldo,
  calcularSaldoPorConta,
  calcularTotalDividas,
  calcularTotalPrestacoes,
  agruparPorCategoria,
  calcularDiasDecorridos,
  calcularMediaDiaria,
  calcularTaxaPoupanca,
  projetarGastosFimMes
} from '../utils/calculos';
import { obterMesAtual } from '../utils/formatadores';

export function useFinanceiro() {
  // Estados persistidos no localStorage
  const [transacoes, setTransacoes] = useLocalStorage('transacoes', []);
  const [dividas, setDividas] = useLocalStorage('dividas', []);
  const [orcamentos, setOrcamentos] = useLocalStorage('orcamentos', {});
  const [metas, setMetas] = useLocalStorage('metas', []);

  // Mês atual
  const mesAtual = obterMesAtual();

  // ===== CÁLCULOS DE TRANSAÇÕES =====

  // Receitas do mês atual
  const receitasMesAtual = useMemo(() => {
    return calcularTotalPorTipo(transacoes, 'receita', mesAtual);
  }, [transacoes, mesAtual]);

  // Despesas do mês atual
  const despesasMesAtual = useMemo(() => {
    return calcularTotalPorTipo(transacoes, 'despesa', mesAtual);
  }, [transacoes, mesAtual]);

  // Saldo total
  const saldoAtual = useMemo(() => {
    return calcularSaldo(transacoes);
  }, [transacoes]);

  // Saldo por conta
  const saldoPorConta = useMemo(() => {
    return calcularSaldoPorConta(transacoes);
  }, [transacoes]);

  // Top 5 despesas do mês
  const top5DespesasMes = useMemo(() => {
    const despesasMes = transacoes.filter(
      t => t.tipo === 'despesa' && t.competencia.startsWith(mesAtual)
    );
    return despesasMes
      .sort((a, b) => parseFloat(b.valor) - parseFloat(a.valor))
      .slice(0, 5);
  }, [transacoes, mesAtual]);

  // Últimas 5 transações
  const ultimas5Transacoes = useMemo(() => {
    return [...transacoes].slice(0, 5);
  }, [transacoes]);

  // Despesas por categoria no mês atual
  const despesasPorCategoria = useMemo(() => {
    const despesasMes = transacoes.filter(
      t => t.tipo === 'despesa' && t.competencia.startsWith(mesAtual)
    );
    return agruparPorCategoria(despesasMes);
  }, [transacoes, mesAtual]);

  // ===== CÁLCULOS DE DÍVIDAS =====

  const totalDividas = useMemo(() => {
    return calcularTotalDividas(dividas);
  }, [dividas]);

  const totalPrestacoes = useMemo(() => {
    return calcularTotalPrestacoes(dividas);
  }, [dividas]);

  // Patrimônio líquido
  const patrimonioLiquido = useMemo(() => {
    return saldoAtual - totalDividas;
  }, [saldoAtual, totalDividas]);

  // ===== INSIGHTS =====

  const diasDecorridos = calcularDiasDecorridos();

  const mediaDiariaGastos = useMemo(() => {
    return calcularMediaDiaria(despesasMesAtual, diasDecorridos);
  }, [despesasMesAtual, diasDecorridos]);

  const taxaPoupanca = useMemo(() => {
    return calcularTaxaPoupanca(receitasMesAtual, despesasMesAtual);
  }, [receitasMesAtual, despesasMesAtual]);

  const projecaoFimMes = useMemo(() => {
    return projetarGastosFimMes(despesasMesAtual, diasDecorridos);
  }, [despesasMesAtual, diasDecorridos]);

  const maiorCategoriaGasto = useMemo(() => {
    if (despesasPorCategoria.length === 0) return null;
    return {
      categoria: despesasPorCategoria[0][0],
      valor: despesasPorCategoria[0][1]
    };
  }, [despesasPorCategoria]);

  // ===== FUNÇÕES DE TRANSAÇÕES =====

  const adicionarTransacao = (transacao) => {
    const novaTransacao = {
      ...transacao,
      id: Date.now(),
      data: new Date().toISOString()
    };
    setTransacoes([novaTransacao, ...transacoes]);
  };

  const removerTransacao = (id) => {
    setTransacoes(transacoes.filter(t => t.id !== id));
  };

  const editarTransacao = (id, dadosAtualizados) => {
    setTransacoes(transacoes.map(t =>
      t.id === id ? { ...t, ...dadosAtualizados } : t
    ));
  };

  // ===== FUNÇÕES DE DÍVIDAS =====

  const adicionarDivida = (divida) => {
    const novaDivida = {
      ...divida,
      id: Date.now()
    };
    setDividas([novaDivida, ...dividas]);
  };

  const removerDivida = (id) => {
    setDividas(dividas.filter(d => d.id !== id));
  };

  const editarDivida = (id, dadosAtualizados) => {
    setDividas(dividas.map(d =>
      d.id === id ? { ...d, ...dadosAtualizados } : d
    ));
  };

  // ===== FUNÇÕES DE METAS =====

  const adicionarMeta = (meta) => {
    const novaMeta = {
      ...meta,
      id: Date.now(),
      valorAtual: 0,
      progresso: 0
    };
    setMetas([novaMeta, ...metas]);
  };

  const atualizarProgressoMeta = (id, novoValor) => {
    setMetas(metas.map(m => {
      if (m.id === id) {
        const valorAtual = parseFloat(novoValor);
        const progresso = (valorAtual / m.valorAlvo) * 100;
        return {
          ...m,
          valorAtual,
          progresso: Math.min(progresso, 100) // Limitar a 100%
        };
      }
      return m;
    }));
  };

  const removerMeta = (id) => {
    setMetas(metas.filter(m => m.id !== id));
  };

  // ===== FUNÇÕES DE ORÇAMENTO =====

  const definirOrcamento = (categoria, valor) => {
    setOrcamentos({
      ...orcamentos,
      [categoria]: parseFloat(valor)
    });
  };

  const removerOrcamento = (categoria) => {
    const novosOrcamentos = { ...orcamentos };
    delete novosOrcamentos[categoria];
    setOrcamentos(novosOrcamentos);
  };

  // Calcular uso do orçamento
  const usoPorCategoria = useMemo(() => {
    const uso = {};
    Object.keys(orcamentos).forEach(categoria => {
      const gasto = despesasPorCategoria.find(([cat]) => cat === categoria)?.[1] || 0;
      const orcamento = orcamentos[categoria];
      uso[categoria] = {
        gasto,
        orcamento,
        percentual: (gasto / orcamento) * 100,
        restante: orcamento - gasto
      };
    });
    return uso;
  }, [orcamentos, despesasPorCategoria]);

  // ===== RETORNO DO HOOK =====

  return {
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

    // Utilitários
    mesAtual,

    // Funções de transações
    adicionarTransacao,
    removerTransacao,
    editarTransacao,

    // Funções de dívidas
    adicionarDivida,
    removerDivida,
    editarDivida,

    // Funções de metas
    adicionarMeta,
    atualizarProgressoMeta,
    removerMeta,
    setMetas,

    // Funções de orçamento
    definirOrcamento,
    removerOrcamento,
    setOrcamentos
  };
}
