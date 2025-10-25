import React, { useState } from 'react';

export default function ModalAddDivida({ onClose, onAdd }) {
  const [motivo, setMotivo] = useState('');
  const [credor, setCredor] = useState('');
  const [valorAtualizado, setValorAtualizado] = useState('');
  const [cet, setCet] = useState('');
  const [prestacaoMensal, setPrestacaoMensal] = useState('');
  const [prestacoesPendentes, setPrestacoesPendentes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!motivo || !credor || !valorAtualizado || !prestacaoMensal) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    onAdd({
      motivo,
      credor,
      valorAtualizado: parseFloat(valorAtualizado),
      cet: cet ? parseFloat(cet) : null,
      prestacaoMensal: parseFloat(prestacaoMensal),
      prestacoesPendentes: prestacoesPendentes ? parseInt(prestacoesPendentes) : null
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Nova Dívida</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Motivo e Credor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo/Origem *
              </label>
              <input
                type="text"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                required
                placeholder="Ex: Financiamento Imóvel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credor *
              </label>
              <input
                type="text"
                value={credor}
                onChange={(e) => setCredor(e.target.value)}
                required
                placeholder="Ex: Banco Itaú"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Valor Atualizado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Atualizado da Dívida (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              value={valorAtualizado}
              onChange={(e) => setValorAtualizado(e.target.value)}
              required
              placeholder="0,00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* CET e Prestação Mensal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CET - Custo Efetivo Total (% ao ano)
              </label>
              <input
                type="number"
                step="0.01"
                value={cet}
                onChange={(e) => setCet(e.target.value)}
                placeholder="Ex: 12.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prestação Mensal (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                value={prestacaoMensal}
                onChange={(e) => setPrestacaoMensal(e.target.value)}
                required
                placeholder="0,00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Prestações Pendentes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prestações Pendentes
            </label>
            <input
              type="number"
              value={prestacoesPendentes}
              onChange={(e) => setPrestacoesPendentes(e.target.value)}
              placeholder="Ex: 36"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Deixe vazio se não souber ou não aplicável
            </p>
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
              className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
            >
              Adicionar Dívida
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
