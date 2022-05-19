import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApibieroService } from '../Serv/apibiero.service';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.scss']
})
export class DetailsProduitComponent implements OnInit {
  
  constructor(private route:ActivatedRoute, private apibiero:ApibieroService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      console.log(params['id']);
      this.apibiero.getBiere(params['id']).subscribe(biere=>{
        console.log(biere);
      })
      // Faire une requête avec le apibieroServ
    })
  }

}
