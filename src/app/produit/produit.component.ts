import { Component, Input, OnInit } from '@angular/core';
import { IProduit } from '../iproduit';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {
  @Input() produit:IProduit;
  @Input() estEditable:boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
