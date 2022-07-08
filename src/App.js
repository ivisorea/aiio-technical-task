import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppState from './AppContext/appContext';
import { NotFound } from './components/NotFound';
import { Products } from './components/Products';

function App() {
  return (
    <>
    <AppState>
        <Routes>
          <Route path='/' element={<Products/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
    </AppState>
    </>
    
  );
}

export default App;
