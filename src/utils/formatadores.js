// Formatar valor monetário em reais
export const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// Formatar data completa
export const formatarData = (data) => {
  return new Date(data).toLocaleDateString('pt-BR');
};

// Formatar data com mês e ano por extenso
export const formatarDataMesAno = (data) => {
  return new Date(data).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long'
  });
};

// Formatar porcentagem
export const formatarPorcentagem = (valor) => {
  return `${valor.toFixed(1)}%`;
};

// Obter mês/ano atual no formato YYYY-MM
export const obterMesAtual = () => {
  return new Date().toISOString().slice(0, 7);
};

// Obter data atual no formato YYYY-MM-DD
export const obterDataAtual = () => {
  return new Date().toISOString().slice(0, 10);
};
