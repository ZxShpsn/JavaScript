// Calcular total de transações por tipo e mês
export const calcularTotalPorTipo = (transacoes, tipo, mes = null) => {
  return transacoes
    .filter(t => {
      const matchTipo = t.tipo === tipo;
      const matchMes = mes ? t.competencia.startsWith(mes) : true;
      return matchTipo && matchMes;
    })
    .reduce((sum, t) => sum + parseFloat(t.valor), 0);
};

// Calcular saldo total
export const calcularSaldo = (transacoes) => {
  return transacoes.reduce((sum, t) => {
    return sum + (t.tipo === 'receita' ? parseFloat(t.valor) : -parseFloat(t.valor));
  }, 0);
};

// Calcular saldo por conta
export const calcularSaldoPorConta = (transacoes) => {
  const saldos = {};

  transacoes.forEach(t => {
    if (!saldos[t.conta]) {
      saldos[t.conta] = 0;
    }
    saldos[t.conta] += t.tipo === 'receita' ? parseFloat(t.valor) : -parseFloat(t.valor);
  });

  return saldos;
};

// Calcular taxa de poupança
export const calcularTaxaPoupanca = (receitas, despesas) => {
  if (receitas === 0) return 0;
  return ((receitas - despesas) / receitas) * 100;
};

// Calcular média diária de gastos
export const calcularMediaDiaria = (totalDespesas, diasDecorridos) => {
  if (diasDecorridos === 0) return 0;
  return totalDespesas / diasDecorridos;
};

// Agrupar transações por categoria
export const agruparPorCategoria = (transacoes, tipo = null) => {
  const agrupado = {};

  transacoes
    .filter(t => tipo ? t.tipo === tipo : true)
    .forEach(t => {
      agrupado[t.categoria] = (agrupado[t.categoria] || 0) + parseFloat(t.valor);
    });

  return Object.entries(agrupado).sort((a, b) => b[1] - a[1]);
};

// Calcular patrimônio líquido
export const calcularPatrimonioLiquido = (saldo, totalDividas) => {
  return saldo - totalDividas;
};

// Calcular total de dívidas
export const calcularTotalDividas = (dividas) => {
  return dividas.reduce((sum, d) => sum + parseFloat(d.valorAtualizado || 0), 0);
};

// Calcular total de prestações mensais
export const calcularTotalPrestacoes = (dividas) => {
  return dividas.reduce((sum, d) => sum + parseFloat(d.prestacaoMensal || 0), 0);
};

// Calcular dias decorridos no mês
export const calcularDiasDecorridos = () => {
  const hoje = new Date();
  return hoje.getDate();
};

// Calcular dias restantes no mês
export const calcularDiasRestantes = () => {
  const hoje = new Date();
  const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
  return ultimoDia.getDate() - hoje.getDate();
};

// Projetar gastos até o fim do mês
export const projetarGastosFimMes = (gastoAtual, diasDecorridos) => {
  const diasNoMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const mediaDiaria = gastoAtual / diasDecorridos;
  return mediaDiaria * diasNoMes;
};
