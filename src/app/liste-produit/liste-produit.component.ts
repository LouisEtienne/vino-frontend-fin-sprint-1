import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { IListeProduit } from '../iliste-produit';
import { IProduit } from '../iproduit';
import { ApibieroService } from '../Serv/apibiero.service';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.scss']
})
export class ListeProduitComponent implements OnInit {
  produit:Array<IProduit>;
  estEditable:boolean= false;
  constructor(private authServ:AuthService, private bieroServ:ApibieroService) { 
    console.log("constructeur")
  }

  ngOnInit(): void {
    this.bieroServ.getBieres().subscribe((data:IListeProduit)=>{this.produit = data.data});
    
    console.log(this.produit);
  }

  valideConnecter():boolean{
    if(this.authServ.getConnexion() ==false && this.estEditable == true){
      this.estEditable = false;
    }
    return this.authServ.getConnexion();
  }

}
