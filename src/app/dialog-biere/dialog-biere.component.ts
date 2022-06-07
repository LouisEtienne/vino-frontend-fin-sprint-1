import {Component, Inject, OnInit, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApibieroService } from '../Serv/apibiero.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProduit } from '../iproduit';

@Component({
  selector: 'app-dialog-biere',
  templateUrl: './dialog-biere.component.html',
  styleUrls: ['./dialog-biere.component.scss']
})
export class DialogBiereComponent implements OnInit {
    @Input() biere!:IProduit;
    creerBouteilleForm!:FormGroup;
    bouteilles: any;
    getBouteilleId: any;

    constructor(
                    private formBuilder: FormBuilder,
                    public dialogRef: MatDialogRef<DialogBiereComponent>,
                    @Inject(MAT_DIALOG_DATA) biere: IProduit,
                    private bieroServ: ApibieroService
                ) { }

    dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
    nombreEntierRegex = /^\d+$/;
    nombreFlottantRegex = /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/;
    anneeRegex = /^(18|19|20)[\d]{2,2}$/;

    ngOnInit(): void {
        this.bieroServ.getListeBouteilles().subscribe((data: any) => { this.bouteilles = data.data; })
    
        this.creerBouteilleForm = this.formBuilder.group({
            id_bouteille: ['', [Validators.required]],
            date_achat: ['', [Validators.pattern(this.dateRegex)]],
            garde_jusqua: ['', [Validators.pattern(this.dateRegex)]],
            notes: ['', [Validators.pattern(this.nombreEntierRegex)]],
            prix: ['', [Validators.pattern(this.nombreFlottantRegex)]],
            quantite : ['', [Validators.pattern(this.nombreEntierRegex)]],
            millesime : ['', [Validators.pattern(this.anneeRegex)]]
        })
    
    }

    ajouterBouteille():void{
        if (this.creerBouteilleForm.valid) {
            this.creerBouteilleForm.value.id_bouteille = this.getBouteilleId;
            console.log(this.creerBouteilleForm.value)
            let bouteilles:any = this.creerBouteilleForm.value;  
            console.log(bouteilles)
            this.bieroServ.ajouterBouteille(bouteilles).subscribe({
            next:(reponse)=>{
                
                console.log('Vin ajoutee')
                this.dialogRef.close('add');  
            },
            error:(reponse)=>{
                this.dialogRef.close('add');
                
            }
            });
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

  

}
