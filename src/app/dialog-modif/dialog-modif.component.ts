import {Component, Inject, OnInit, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApibieroService } from '../Serv/apibiero.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProduit } from '../iproduit';
@Component({
  selector: 'app-dialog-modif',
  templateUrl: './dialog-modif.component.html',
  styleUrls: ['./dialog-modif.component.scss']
})

export class DialogModifComponent implements OnInit {
  @Input() bouteille!:IProduit;
  modifierBouteilleForm!:FormGroup;


    constructor(
                    private formBuilder: FormBuilder,
                    public dialogRef: MatDialogRef<DialogModifComponent>,
                    @Inject(MAT_DIALOG_DATA) public editData: IProduit,
                    private bieroServ: ApibieroService
                ) { }

    ngOnInit(): void {

        this.modifierBouteilleForm = this.formBuilder.group({
            date_achat: ['', Validators.required],
            garde_jusqua: ['', Validators.required],
            notes: ['', Validators.required],
            prix: ['', Validators.required],
            quantite : ['',Validators.required],
            millesime : ['',Validators.required]
        });

        console.log(this.editData)
        if(this.editData){
            this.modifierBouteilleForm.controls['date_achat'].setValue(this.editData.date_achat);
            this.modifierBouteilleForm.controls['garde_jusqua'].setValue(this.editData.garde_jusqua);
            this.modifierBouteilleForm.controls['notes'].setValue(this.editData.notes);
            this.modifierBouteilleForm.controls['prix'].setValue(this.editData.prix);
            this.modifierBouteilleForm.controls['quantite'].setValue(this.editData.quantite);
            this.modifierBouteilleForm.controls['millesime'].setValue(this.editData.millesime);
        }
    
    }

    modifierBiere():void{
        if(this.modifierBouteilleForm.valid){
            let bouteille:IProduit = this.modifierBouteilleForm.value;  
            bouteille.id_bouteille_cellier = this.editData.id_bouteille_cellier;
            this.bieroServ.modifierBouteille(bouteille).subscribe({
            next:(reponse)=>{
                console.log('bouteille modifiée')
                this.dialogRef.close('mod');  
            },
            error:(reponse)=>{
                this.dialogRef.close('mod');
            }
            });
        }
    
    }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

}
