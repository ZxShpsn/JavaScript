import React, { useState } from 'react';
import { formatarMoeda } from '../../utils/formatadores';
import ModalAddMeta from '../Modals/ModalAddMeta';

export default function Metas({
  metas,
  adicionarMeta,
  atualizarProgressoMeta,
  removerMeta
}) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [novoValor, setNovoValor] = useState('');

  const handleAtualizarProgresso = (id) => {
    if (!novoValor) {
      alert('Digite um valor');
      return;
    }

    atualizarProgressoMeta(id, parseFloat(novoValor));
    setEditandoId(null);
    setNovoValor('');
  };

  const handleRemover = (id) => {
    if (confirm('Tem certeza que deseja remover esta meta?')) {
      removerMeta(id);
    }
  };

  const metasConcluidas = metas.filter(m => m.progresso >= 100);
  const metasEmAndamento = metas.filter(m => m.progresso < 100);

  return (
    <div className="space-y-6">
      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Total de Metas</p>
          <p className="text-3xl font-bold text-blue-700 mt-1">
            {metas.length}
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6 border-2 border-yellow-200">
          <p className="text-sm text-yellow-600 font-medium">Em Andamento</p>
          <p className="text-3xl font-bold text-yellow-700 mt-1">
            {metasEmAndamento.length}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
          <p className="text-sm text-green-600 font-medium">Concluídas</p>
          <p className="text-3xl font-bold text-green-700 mt-1">
            {metasConcluidas.length}
          </p>
        </div>
      </div>

      {/* Metas em Andamento */}
      {metasEmAndamento.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              🎯 Metas em Andamento
            </h2>
            <button
              onClick={() => setMostrarModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Nova Meta
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {metasEmAndamento.map(meta => (
              <div
                key={meta.id}
                className="border-2 border-gray-200 rounded-lg p-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">
                      {meta.nome}
                    </h3>
                    {meta.descricao && (
                      <p className="text-sm text-gray-600 mt-1">
                        {meta.descricao}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemover(meta.id)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition ml-2"
                    title="Remover meta"
                  >
                    🗑️
                  </button>
                </div>

                {/* Valores */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Alcançado</p>
                    <p className="text-lg font-bold text-blue-600">
                      R$ {formatarMoeda(meta.valorAtual)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Meta</p>
                    <p className="text-lg font-bold text-green-600">
                      R$ {formatarMoeda(meta.valorAlvo)}
                    </p>
                  </div>
                </div>

                {/* Barra de progresso */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progresso</span>
                    <span className="font-bold">{meta.progresso.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(meta.progresso, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Atualizar progresso */}
                {editandoId === meta.id ? (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.01"
                      value={novoValor}
                      onChange={(e) => setNovoValor(e.target.value)}
                      placeholder="Novo valor alcançado"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      autoFocus
                    />
                    <button
                      onClick={() => handleAtualizarProgresso(meta.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => {
                        setEditandoId(null);
                        setNovoValor('');
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition text-sm font-medium"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditandoId(meta.id);
                      setNovoValor(meta.valorAtual.toString());
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition text-sm"
                  >
                    Atualizar Progresso
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metas Concluídas */}
      {metasConcluidas.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            ✅ Metas Concluídas
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {metasConcluidas.map(meta => (
              <div
                key={meta.id}
                className="border-2 border-green-200 bg-green-50 rounded-lg p-5"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">
                      {meta.nome}
                    </h3>
                    {meta.descricao && (
                      <p className="text-sm text-gray-600 mt-1">
                        {meta.descricao}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemover(meta.id)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition ml-2"
                    title="Remover meta"
                  >
                    🗑️
                  </button>
                </div>

                <div className="bg-white rounded-lg p-4 mb-3">
                  <p className="text-sm text-gray-600">Valor Alcançado</p>
                  <p className="text-2xl font-bold text-green-600">
                    R$ {formatarMoeda(meta.valorAtual)}
                  </p>
                </div>

                <div className="text-center">
                  <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full font-bold">
                    🎉 Meta Atingida!
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estado vazio */}
      {metas.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">
              Nenhuma meta criada ainda
            </p>
            <button
              onClick={() => setMostrarModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition inline-flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Criar Primeira Meta
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {mostrarModal && (
        <ModalAddMeta
          onClose={() => setMostrarModal(false)}
          onAdd={adicionarMeta}
        />
      )}
    </div>
  );
}
