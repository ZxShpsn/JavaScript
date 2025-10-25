import React, { useState, useMemo } from 'react';
import { formatarMoeda, formatarData } from '../../utils/formatadores';
import ModalAddTransacao from '../Modals/ModalAddTransacao';

export default function Transacoes({
  transacoes,
  adicionarTransacao,
  removerTransacao,
  receitasMesAtual,
  despesasMesAtual
}) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroMes, setFiltroMes] = useState('');

  // Filtrar transações
  const transacoesFiltradas = useMemo(() => {
    return transacoes.filter(t => {
      const matchTipo = filtroTipo === 'todos' || t.tipo === filtroTipo;
      const matchMes = !filtroMes || t.competencia.startsWith(filtroMes);
      return matchTipo && matchMes;
    });
  }, [transacoes, filtroTipo, filtroMes]);

  const handleRemover = (id) => {
    if (confirm('Tem certeza que deseja remover esta transação?')) {
      removerTransacao(id);
    }
  };

  const saldoMes = receitasMesAtual - despesasMesAtual;

  return (
    <div className="space-y-6">
      {/* Resumo do Mês */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
          <p className="text-sm text-green-600 font-medium">Receitas do Mês</p>
          <p className="text-2xl font-bold text-green-700 mt-1">
            R$ {formatarMoeda(receitasMesAtual)}
          </p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
          <p className="text-sm text-red-600 font-medium">Despesas do Mês</p>
          <p className="text-2xl font-bold text-red-700 mt-1">
            R$ {formatarMoeda(despesasMesAtual)}
          </p>
        </div>
        <div className={`${saldoMes >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'} rounded-lg p-4 border-2`}>
          <p className={`text-sm ${saldoMes >= 0 ? 'text-blue-600' : 'text-orange-600'} font-medium`}>
            Saldo do Mês
          </p>
          <p className={`text-2xl font-bold ${saldoMes >= 0 ? 'text-blue-700' : 'text-orange-700'} mt-1`}>
            R$ {formatarMoeda(Math.abs(saldoMes))}
            {saldoMes < 0 && <span className="text-sm ml-2">(déficit)</span>}
          </p>
        </div>
      </div>

      {/* Cabeçalho com Filtros e Botão */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            💸 Transações
          </h2>
          <button
            onClick={() => setMostrarModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Nova Transação
          </button>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtrar por tipo
            </label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="todos">Todos</option>
              <option value="receita">Receitas</option>
              <option value="despesa">Despesas</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtrar por mês
            </label>
            <input
              type="month"
              value={filtroMes}
              onChange={(e) => setFiltroMes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Lista de Transações */}
        <div className="space-y-3">
          {transacoesFiltradas.length > 0 ? (
            transacoesFiltradas.map(transacao => (
              <div
                key={transacao.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition gap-3"
              >
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-2xl">
                    {transacao.tipo === 'receita' ? '💰' : '💸'}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-gray-800">
                        {transacao.categoria}
                      </p>
                      {transacao.subcategoria && (
                        <>
                          <span className="text-gray-400">•</span>
                          <p className="text-sm text-gray-600">
                            {transacao.subcategoria}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 flex-wrap">
                      <span>{formatarData(transacao.competencia)}</span>
                      <span>•</span>
                      <span>{transacao.conta}</span>
                      {transacao.tipoFixoVariavel && (
                        <>
                          <span>•</span>
                          <span className={`px-2 py-0.5 rounded ${
                            transacao.tipoFixoVariavel === 'Fixo'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {transacao.tipoFixoVariavel}
                          </span>
                        </>
                      )}
                    </div>
                    {transacao.observacao && (
                      <p className="text-sm text-gray-600 mt-1 italic">
                        {transacao.observacao}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  <p className={`text-xl font-bold ${
                    transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transacao.tipo === 'receita' ? '+' : '-'}
                    R$ {formatarMoeda(transacao.valor)}
                  </p>
                  <button
                    onClick={() => handleRemover(transacao.id)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition"
                    title="Remover transação"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nenhuma transação encontrada
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Clique em "Nova Transação" para adicionar
              </p>
            </div>
          )}
        </div>

        {transacoesFiltradas.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Mostrando {transacoesFiltradas.length} transação(ões)
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {mostrarModal && (
        <ModalAddTransacao
          onClose={() => setMostrarModal(false)}
          onAdd={adicionarTransacao}
        />
      )}
    </div>
  );
}
