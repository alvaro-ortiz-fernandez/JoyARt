import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Catalog } from './pages/catalog/catalog';

export const routes: Routes = [
  // Página de inicio
  {
    path: '',
    component: Home,
    title: 'JoyARt · Inicio'
  },

  // Página con el listado de productos
  {
    path: 'catalog',
    component: Catalog,
    title: 'JoyARt · Catálogo'
  },

  // Página con el detalle de un producto
  {
    path: 'catalog',
    component: Catalog,
    title: 'JoyARt · Producto'
  },

  // Ruta de fallback por si se accede a una URL inexistente
  {
    path: '**',
    redirectTo: ''
  }
];