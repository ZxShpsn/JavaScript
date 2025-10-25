# 💰 Central Financeira

Aplicação web completa para gerenciamento financeiro pessoal de casal, desenvolvida com React + Vite + Tailwind CSS.

## 👥 Usuários

**Vinícius & Brenda** - Casal que compartilha finanças
**Banco Principal**: Noh (Compartilhado)

## ✨ Funcionalidades

### 📊 Dashboard
- Visão geral financeira (receitas, despesas, saldo)
- Patrimônio líquido (saldo - dívidas)
- Resumo de dívidas
- Top 5 maiores despesas do mês
- Últimas 5 transações
- Progresso de metas

### 💸 Transações
- Adicionar receitas e despesas
- Categorização completa com subcategorias
- Suporte para múltiplas contas
- Filtros por mês, tipo e categoria
- Marcação de gastos fixos/variáveis
- Observações personalizadas

### 💳 Dívidas
- Registro detalhado de dívidas
- Cálculo automático de endividamento total
- Acompanhamento de prestações
- CET (Custo Efetivo Total)
- Alertas para dívidas com juros altos

### 📈 Orçamento
- Definir orçamento por categoria
- Comparação realizado vs orçamento
- Indicadores visuais (verde, amarelo, vermelho)
- Alertas de orçamento ultrapassado

### 👛 Carteira
- Saldo por conta
- Destaque para conta compartilhada (Noh)
- Total da carteira
- Visualização percentual por conta

### 🎯 Metas
- Criar metas financeiras
- Atualizar progresso manualmente
- Visualização de % atingido
- Status de metas concluídas

### 💡 Insights
- Média de gastos diários
- Taxa de poupança
- Maior categoria de gasto
- Projeção fim do mês
- Recomendações personalizadas
- Análise de padrões

## 🛠️ Tecnologias

- **React 18** - Framework JavaScript
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **LocalStorage** - Armazenamento de dados

## 🚀 Como Executar

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

### Desenvolvimento

A aplicação estará disponível em `http://localhost:5173/`

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Layout/          # Header e Navigation
│   ├── Dashboard/       # Dashboard e cards de resumo
│   ├── Transacoes/      # Gestão de transações
│   ├── Dividas/         # Controle de dívidas
│   ├── Orcamento/       # Orçamento por categoria
│   ├── Carteira/        # Saldo por conta
│   ├── Metas/           # Metas financeiras
│   ├── Insights/        # Análises e recomendações
│   └── Modals/          # Modais de adição de dados
├── hooks/
│   ├── useLocalStorage.js    # Hook de localStorage
│   └── useFinanceiro.js      # Lógica de negócio principal
├── utils/
│   ├── calculos.js           # Funções de cálculo
│   └── formatadores.js       # Formatação de valores
├── constants/
│   └── financeiro.js         # Categorias e contas
├── App.jsx                   # Componente principal
├── main.jsx                  # Entry point
└── index.css                 # Estilos globais
```

## 💾 Armazenamento de Dados

Todos os dados são armazenados localmente no navegador usando **localStorage**:

- `transacoes` - Lista de todas as transações
- `dividas` - Lista de dívidas
- `orcamentos` - Orçamentos por categoria
- `metas` - Metas financeiras

**⚠️ Importante**: Os dados são armazenados apenas no navegador. Para fazer backup, use a funcionalidade de exportação (futura implementação).

## 🎨 Categorias

### Receitas
- Salário
- Freelancer
- Ajuda familiar
- Outras Receitas
- Reembolsos e Adiantamentos
- Transferência de contas

### Despesas
- **Alimentação**: Supermercado, Almoços fora de casa, Delivery
- **Moradia**: Aluguel, Condomínio, Energia, Água, Internet, Gás
- **Transporte**: Combustível, Uber/Taxi, Manutenção, Estacionamento
- **Saúde**: Farmácia, Consultas, Plano de Saúde, Exames
- **Educação**: Cursos, Livros, Material
- **Lazer**: Streaming, Cinema, Restaurantes, Viagens
- **Vestuário**: Roupas, Calçados, Acessórios
- **Dívidas**: Dívida Imobiliária, Dívida Veículo, CDC, Cartão de Crédito, Empréstimo Pessoal
- **Outros**: Diversos

## 🏦 Contas Disponíveis

- Dinheiro
- **Noh (Compartilhado)** ⭐ - Conta principal do casal
- Débito - Inter Vinícius
- Crédito - Inter Vinícius
- Débito - NuBank Brenda
- Crédito - NuBank Brenda
- Santander

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona perfeitamente em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🔮 Próximas Implementações

- [ ] Gráficos de gastos (Chart.js/Recharts)
- [ ] Exportar/Importar dados (JSON)
- [ ] Notificações (react-hot-toast)
- [ ] Filtros avançados
- [ ] Relatórios mensais
- [ ] PWA (Progressive Web App)
- [ ] Backup em nuvem
- [ ] Modo escuro

## 📄 Licença

Este projeto é de uso pessoal para Vinícius e Brenda.

---

**Desenvolvido com ❤️ por Claude Code**
