import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApibieroService } from '../Serv/apibiero.service';
import { IProduit } from '../iproduit';
import { Router } from '@angular/router';


@Component({
    selector: 'app-dialog-delete',
    templateUrl: './dialog-delete.component.html',
    styleUrls: ['./dialog-delete.component.scss']
})

export class DialogDeleteComponent implements OnInit {
    
    bouteille!:IProduit

    constructor(
        public dialogRef: MatDialogRef<DialogDeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public editData: IProduit,
        private bieroServ: ApibieroService,
        private router : Router,
    ) {}
    
    ngOnInit(): void {

    }

    /** Supprime toutes les données de bouteille de la cellier */
    effacerBouteille():void{
            let id_bouteille = this.editData.id_bouteille;
            console.log(id_bouteille)
            this.bieroServ.effacerBouteille(id_bouteille).subscribe({
            next:(reponse)=>{
                this.dialogRef.close('del'); 
                // this.bieroServ.
                // this.router.navigateByUrl("./liste");

                alert('bouteille supprimée')
            },
            error:(reponse)=>{
                // this.router.navigateByUrl("/liste");
                alert('arranger backend svp')

                this.dialogRef.close('del');
            }
            });
        }
}