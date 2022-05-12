import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.scss']
})
export class ListeProduitComponent implements OnInit {
  produit:Array<any>
  constructor() { 
    console.log("constructeur")
  }

  ngOnInit(): void {
    this.produit = [...Array(10)].map(
      (item, index) => {return {nom : "element "+ index, "prix": (10 + index * index), "rabais" : !(index % 3) }}
    );
    console.log(this.produit);
  }

}
