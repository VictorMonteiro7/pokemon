import {useRoutes} from 'react-router-dom';
import { Home } from '../pages/Home';
import { Pokemon } from '../pages/Pokemon';

export const MainRoutes = () =>{
  return useRoutes(
    [
      {path: '/', element: <Home />},
      {path: '/pokemon/:id', element: <Pokemon />},
      {path: '*', element: <h1>Página não encontrada</h1>}
    ]    
  )
}