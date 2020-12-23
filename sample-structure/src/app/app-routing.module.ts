import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Exported Routes for app-module router imports
export const routes: Routes = [

  { path: '', loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule) }, // Layout module lazy loaded

  { path: '', redirectTo: '', pathMatch: 'full' }
  // Redirect to default path on initialize, app routing module will redirect to layout routing module
  // In case of no layout module present, routing to components shall happen directly from here.

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
