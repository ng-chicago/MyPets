import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dogs', loadChildren: './dogs/dogs.module#DogsModule' },
  { path: 'cats', loadChildren: './cats/cats.module#CatsModule' },
  { path: 'allOthers', loadChildren: './allOthers/allOthers.module#AllOthersModule' },
  { path: '404', loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule' },
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class AppRoutingModule { }
