import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ListeProduitComponent } from './liste-produit/liste-produit.component';
import { ProduitComponent } from './produit/produit.component';
import { EnteteComponent } from './entete/entete.component';
import { NonTrouveComponent } from './non-trouve/non-trouve.component';
import { DetailsProduitComponent } from './details-produit/details-produit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ListeProduitComponent,
    ProduitComponent,
    EnteteComponent,
    NonTrouveComponent,
    DetailsProduitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
