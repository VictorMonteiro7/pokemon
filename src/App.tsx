import { ContextProvider } from './contexts/Context';
import {MainRoutes} from './routes/MainRoutes';

function App() {
  return (
    <ContextProvider>
    <>
      <MainRoutes />          
      <footer style={{marginTop: '20px'}}>
        <p>&copy;Victor Monteiro - 2022</p>
      </footer>
    </>
    </ContextProvider>
  );
}

export default App;
