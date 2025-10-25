// Categorias de receitas
export const CATEGORIAS_RECEITAS = [
  'Salário',
  'Freelancer',
  'Ajuda familiar',
  'Outras Receitas',
  'Reembolsos e Adiantamentos',
  'Transferência de contas'
];

// Categorias de despesas com subcategorias
export const CATEGORIAS_DESPESAS = {
  'Alimentação': ['Supermercado', 'Almoços fora de casa', 'Delivery'],
  'Moradia': ['Aluguel', 'Condomínio', 'Energia', 'Água', 'Internet', 'Gás'],
  'Transporte': ['Combustível', 'Uber/Taxi', 'Manutenção', 'Estacionamento'],
  'Saúde': ['Farmácia', 'Consultas', 'Plano de Saúde', 'Exames'],
  'Educação': ['Cursos', 'Livros', 'Material'],
  'Lazer': ['Streaming', 'Cinema', 'Restaurantes', 'Viagens'],
  'Vestuário': ['Roupas', 'Calçados', 'Acessórios'],
  'Dívidas': ['Dívida Imobiliária', 'Dívida Veículo', 'CDC', 'Cartão de Crédito', 'Empréstimo Pessoal'],
  'Outros': ['Diversos']
};

// Subcategorias (alias para facilitar uso)
export const SUBCATEGORIAS = CATEGORIAS_DESPESAS;

// Contas disponíveis
export const CONTAS = [
  'Dinheiro',
  'Noh (Compartilhado)',
  'Débito - Inter Vinícius',
  'Crédito - Inter Vinícius',
  'Débito - NuBank Brenda',
  'Crédito - NuBank Brenda',
  'Santander'
];

// Tipos de gastos
export const TIPO_FIXO_VARIAVEL = ['Fixo', 'Variável'];
