import Context from './Context';

const ContextProvider = ({ children }) => {
  const context = {
    
  };
  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
};

export default ContextProvider;