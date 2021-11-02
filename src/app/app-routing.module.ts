import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./features/pages/homepage/homepage.component";
import {LittestingComponent} from "./features/pages/littesting/littesting.component";

const routes: Routes = [

  { path: 'home', component: HomepageComponent },
  { path: 'testing', component: LittestingComponent },
  { path: '**', redirectTo: 'home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
