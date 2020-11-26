import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'notebooks',
        loadChildren: () => import('../notebooks/notebooks.module').then( m => m.NotebooksPageModule)
      },
      {
        path: 'notebooks/:id',
        loadChildren: () => import('../notes/notes.module').then( m => m.NotesPageModule)
      },
      {
        path: 'favourites',
        loadChildren: () => import('../favourites/favourites.module').then( m => m.FavouritesPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/notebooks',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
