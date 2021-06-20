import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LexicaRoutingModule } from './lexica-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';


@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    LexicaRoutingModule
  ]
})
export class LexicaModule { }