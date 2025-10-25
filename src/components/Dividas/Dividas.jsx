import React, { useState } from 'react';
import { formatarMoeda } from '../../utils/formatadores';
import ModalAddDivida from '../Modals/ModalAddDivida';

export default function Dividas({
  dividas,
  adicionarDivida,
  removerDivida,
  totalDividas,
  totalPrestacoes
}) {
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleRemover = (id) => {
    if (confirm('Tem certeza que deseja remover esta dívida?')) {
      removerDivida(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Resumo de Dívidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
          <p className="text-sm text-red-600 font-medium">Total de Dívidas</p>
          <p className="text-3xl font-bold text-red-700 mt-1">
            R$ {formatarMoeda(totalDividas)}
          </p>
        </div>
        <div className="bg-orange-50 rounded-lg p-6 border-2 border-orange-200">
          <p className="text-sm text-orange-600 font-medium">
            Prestações Mensais
          </p>
          <p className="text-3xl font-bold text-orange-700 mt-1">
            R$ {formatarMoeda(totalPrestacoes)}
          </p>
        </div>
      </div>

      {/* Lista de Dívidas */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            💳 Controle de Dívidas
          </h2>
          <button
            onClick={() => setMostrarModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Nova Dívida
          </button>
        </div>

        {dividas.length > 0 ? (
          <div className="space-y-4">
            {dividas.map(divida => {
              const mesesRestantes = divida.prestacoesPendentes || 0;
              const tempoEstimado = mesesRestantes > 0
                ? `${mesesRestantes} ${mesesRestantes === 1 ? 'mês' : 'meses'}`
                : 'N/A';

              return (
                <div
                  key={divida.id}
                  className="border-2 border-gray-200 rounded-lg p-5 hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    {/* Informações principais */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {divida.motivo}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Credor: {divida.credor}
                          </p>
                        </div>
                      </div>

                      {/* Grid de informações */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="bg-red-50 rounded-lg p-3">
                          <p className="text-xs text-red-600 font-medium">
                            Valor Total
                          </p>
                          <p className="text-lg font-bold text-red-700 mt-1">
                            R$ {formatarMoeda(divida.valorAtualizado)}
                          </p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-3">
                          <p className="text-xs text-orange-600 font-medium">
                            Prestação
                          </p>
                          <p className="text-lg font-bold text-orange-700 mt-1">
                            R$ {formatarMoeda(divida.prestacaoMensal)}
                          </p>
                        </div>

                        {divida.cet !== null && (
                          <div className="bg-yellow-50 rounded-lg p-3">
                            <p className="text-xs text-yellow-600 font-medium">
                              CET (a.a.)
                            </p>
                            <p className="text-lg font-bold text-yellow-700 mt-1">
                              {divida.cet.toFixed(2)}%
                            </p>
                            {divida.cet > 20 && (
                              <span className="text-xs text-red-600 font-bold">
                                ⚠️ Alto!
                              </span>
                            )}
                          </div>
                        )}

                        {divida.prestacoesPendentes !== null && (
                          <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-xs text-blue-600 font-medium">
                              Tempo Restante
                            </p>
                            <p className="text-lg font-bold text-blue-700 mt-1">
                              {tempoEstimado}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Botão de remover */}
                    <button
                      onClick={() => handleRemover(divida.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition"
                      title="Remover dívida"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma dívida registrada</p>
            <p className="text-gray-400 text-sm mt-2">
              Clique em "Nova Dívida" para adicionar
            </p>
          </div>
        )}

        {dividas.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {dividas.length} dívida(s) registrada(s)
              </p>
              {totalDividas > 0 && (
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    Impacto mensal no orçamento
                  </p>
                  <p className="text-lg font-bold text-red-600">
                    R$ {formatarMoeda(totalPrestacoes)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {mostrarModal && (
        <ModalAddDivida
          onClose={() => setMostrarModal(false)}
          onAdd={adicionarDivida}
        />
      )}
    </div>
  );
}
