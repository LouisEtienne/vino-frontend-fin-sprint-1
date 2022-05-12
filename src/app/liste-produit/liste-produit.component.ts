import { Component, OnInit } from '@angular/core';
import { IProduit } from '../iproduit';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.scss']
})
export class ListeProduitComponent implements OnInit {
  produit:Array<IProduit>;
  estEditable:boolean= false;
  constructor() { 
    console.log("constructeur")
  }

  ngOnInit(): void {
    this.produit = [...Array(3)].map(
      (item, index) => {return <IProduit>{nom : "element "+ index, "prix": (10 + index * index), "rabais" : !(index % 3) }}
    );
    console.log(this.produit);
  }

}
