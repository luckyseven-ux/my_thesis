import { useRef } from 'react';

const useDebounce = () => {
  const debounceTimeout = useRef(null);

  const debounce = (func, delay) => {
    return (...args) => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        func(...args);
        debounceTimeout.current = null;
      }, delay);
    };
  };

  return { debounce };
};

export default useDebounce;