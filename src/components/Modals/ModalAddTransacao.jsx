import React, { useState } from 'react';
import {
  CATEGORIAS_RECEITAS,
  CATEGORIAS_DESPESAS,
  SUBCATEGORIAS,
  CONTAS
} from '../../constants/financeiro';
import { obterDataAtual } from '../../utils/formatadores';

export default function ModalAddTransacao({ onClose, onAdd }) {
  const [tipo, setTipo] = useState('despesa');
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [valor, setValor] = useState('');
  const [competencia, setCompetencia] = useState(obterDataAtual());
  const [conta, setConta] = useState('Noh (Compartilhado)');
  const [observacao, setObservacao] = useState('');
  const [tipoFixoVariavel, setTipoFixoVariavel] = useState('Variável');

  const categoriasDisponiveis = tipo === 'receita'
    ? CATEGORIAS_RECEITAS
    : Object.keys(CATEGORIAS_DESPESAS);

  const subcategoriasDisponiveis = SUBCATEGORIAS[categoria] || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoria || !valor) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    onAdd({
      tipo,
      categoria,
      subcategoria: subcategoria || null,
      valor: parseFloat(valor),
      competencia,
      conta,
      observacao: observacao || null,
      tipoFixoVariavel
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Nova Transação</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setTipo('receita');
                  setCategoria('');
                }}
                className={`p-4 rounded-lg border-2 font-medium transition ${
                  tipo === 'receita'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                💰 Receita
              </button>
              <button
                type="button"
                onClick={() => {
                  setTipo('despesa');
                  setCategoria('');
                }}
                className={`p-4 rounded-lg border-2 font-medium transition ${
                  tipo === 'despesa'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                💸 Despesa
              </button>
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria *
            </label>
            <select
              value={categoria}
              onChange={(e) => {
                setCategoria(e.target.value);
                setSubcategoria('');
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Selecione...</option>
              {categoriasDisponiveis.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Subcategoria (se houver) */}
          {subcategoriasDisponiveis.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategoria
              </label>
              <select
                value={subcategoria}
                onChange={(e) => setSubcategoria(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Selecione...</option>
                {subcategoriasDisponiveis.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          )}

          {/* Valor e Data */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
                placeholder="0,00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data *
              </label>
              <input
                type="date"
                value={competencia}
                onChange={(e) => setCompetencia(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conta e Tipo Fixo/Variável */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conta *
              </label>
              <select
                value={conta}
                onChange={(e) => setConta(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {CONTAS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>
              <select
                value={tipoFixoVariavel}
                onChange={(e) => setTipoFixoVariavel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Fixo">Fixo</option>
                <option value="Variável">Variável</option>
              </select>
            </div>
          </div>

          {/* Observação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observação
            </label>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Detalhes adicionais..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Botões */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
            >
              Adicionar Transação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
