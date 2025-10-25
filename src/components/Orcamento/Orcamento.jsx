import React, { useState } from 'react';
import { CATEGORIAS_DESPESAS } from '../../constants/financeiro';
import { formatarMoeda } from '../../utils/formatadores';

export default function Orcamento({
  orcamentos,
  usoPorCategoria,
  definirOrcamento,
  removerOrcamento
}) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [valorOrcamento, setValorOrcamento] = useState('');

  const categorias = Object.keys(CATEGORIAS_DESPESAS);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoriaSelecionada || !valorOrcamento) {
      alert('Preencha todos os campos');
      return;
    }

    definirOrcamento(categoriaSelecionada, parseFloat(valorOrcamento));
    setCategoriaSelecionada('');
    setValorOrcamento('');
    setMostrarForm(false);
  };

  const handleRemover = (categoria) => {
    if (confirm(`Remover orçamento de ${categoria}?`)) {
      removerOrcamento(categoria);
    }
  };

  const getCorBarraProgresso = (percentual) => {
    if (percentual < 70) return 'bg-green-500';
    if (percentual < 90) return 'bg-yellow-500';
    if (percentual < 100) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getCorTexto = (percentual) => {
    if (percentual < 70) return 'text-green-600';
    if (percentual < 90) return 'text-yellow-600';
    if (percentual < 100) return 'text-orange-600';
    return 'text-red-600';
  };

  const totalOrcamento = Object.values(orcamentos).reduce((sum, val) => sum + val, 0);
  const totalGasto = Object.keys(usoPorCategoria).reduce(
    (sum, cat) => sum + usoPorCategoria[cat].gasto,
    0
  );

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Orçamento Total</p>
          <p className="text-3xl font-bold text-blue-700 mt-1">
            R$ {formatarMoeda(totalOrcamento)}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
          <p className="text-sm text-purple-600 font-medium">Gasto Total</p>
          <p className="text-3xl font-bold text-purple-700 mt-1">
            R$ {formatarMoeda(totalGasto)}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
          <p className="text-sm text-green-600 font-medium">Disponível</p>
          <p className="text-3xl font-bold text-green-700 mt-1">
            R$ {formatarMoeda(Math.max(0, totalOrcamento - totalGasto))}
          </p>
        </div>
      </div>

      {/* Orçamentos por Categoria */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            📈 Orçamento por Categoria
          </h2>
          <button
            onClick={() => setMostrarForm(!mostrarForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition flex items-center gap-2"
          >
            <span className="text-xl">{mostrarForm ? '−' : '+'}</span>
            {mostrarForm ? 'Cancelar' : 'Definir Orçamento'}
          </button>
        </div>

        {/* Formulário */}
        {mostrarForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 rounded-lg p-6 mb-6 border-2 border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={categoriaSelecionada}
                  onChange={(e) => setCategoriaSelecionada(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor do Orçamento (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={valorOrcamento}
                  onChange={(e) => setValorOrcamento(e.target.value)}
                  required
                  placeholder="0,00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
            >
              Definir Orçamento
            </button>
          </form>
        )}

        {/* Lista de Orçamentos */}
        {Object.keys(usoPorCategoria).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(usoPorCategoria).map(([categoria, dados]) => {
              const percentual = dados.percentual;
              const ultrapassou = percentual > 100;

              return (
                <div
                  key={categoria}
                  className="border-2 border-gray-200 rounded-lg p-5"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {categoria}
                      </h3>
                      <p className="text-sm text-gray-600">
                        R$ {formatarMoeda(dados.gasto)} de R${' '}
                        {formatarMoeda(dados.orcamento)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemover(categoria)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition"
                      title="Remover orçamento"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* Barra de progresso */}
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-4 transition-all duration-300 ${getCorBarraProgresso(
                          percentual
                        )}`}
                        style={{ width: `${Math.min(percentual, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-bold ${getCorTexto(percentual)}`}>
                      {percentual.toFixed(1)}% utilizado
                    </span>
                    {ultrapassou ? (
                      <span className="text-sm font-bold text-red-600">
                        ⚠️ Ultrapassou em R${' '}
                        {formatarMoeda(Math.abs(dados.restante))}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-600">
                        Restam R$ {formatarMoeda(dados.restante)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum orçamento definido
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Clique em "Definir Orçamento" para começar
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
