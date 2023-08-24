import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './Components/main/main.component';
import { View1Component } from './Components/view1/view1.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CardService } from './cards.service';

const appRoutes : Routes = [
  {path: "", component: MainComponent, title: "Deck of Cards"},
  {path: "deck/:deck_id", component: View1Component, title: "Deck of Cards"},
  // {path: "**", redirectTo: "/", pathMatch: "prefix"},

]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    View1Component
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
