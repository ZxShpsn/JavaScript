import { useState, useEffect } from 'react';

// Hook customizado para gerenciar estado com localStorage
export function useLocalStorage(key, initialValue) {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Tentar obter do localStorage
      const item = window.localStorage.getItem(key);
      // Parsear JSON armazenado ou retornar valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao carregar ${key} do localStorage:`, error);
      return initialValue;
    }
  });

  // Função para atualizar o valor
  const setValue = (value) => {
    try {
      // Permitir que value seja uma função para ter a mesma API do useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Salvar no estado
      setStoredValue(valueToStore);

      // Salvar no localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}
