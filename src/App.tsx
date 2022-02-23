import { ContextProvider } from './contexts/Context';
import {MainRoutes} from './routes/MainRoutes';

function App() {
  return (
    <ContextProvider>
    <>
      <h1>Seja bem vindo ao Universo dos Pokemons</h1>
      <MainRoutes />          
      <footer style={{position: 'fixed', bottom: '0', left: '0'}}>
        <p>&copy;Victor Monteiro - Alguns direitos reservados.</p>
      </footer>
    </>
    </ContextProvider>
  );
}

export default App;
