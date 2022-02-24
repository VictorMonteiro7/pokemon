import { ContextProvider } from './contexts/Context';
import {MainRoutes} from './routes/MainRoutes';

function App() {
  return (
    <ContextProvider>
    <>
      <h1>Seja bem vindo ao Universo dos Pokemons</h1>
      <MainRoutes />          
      <footer style={{marginTop: '20px'}}>
        <p>&copy;Victor Monteiro - Alguns direitos reservados.</p>
      </footer>
    </>
    </ContextProvider>
  );
}

export default App;
