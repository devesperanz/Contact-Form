import React, { useContext } from 'react';
import './App.css';
import { Context } from './context/context';
import { FormContextProvider } from './context/formContext';
import Nav from './component/nav';
import Home from './pages/home';

function App() {
  return (
    <Context>
      <FormContextProvider>
        <div className='app'>
          <Nav />
          <Home />
        </div>
      </FormContextProvider>
    </Context>
  );
}

export default App;
