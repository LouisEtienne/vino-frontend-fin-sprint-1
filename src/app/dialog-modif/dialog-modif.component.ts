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
  @Input() biere!:IProduit;
  modifierBiereForm!:FormGroup;


    constructor(
                    private formBuilder: FormBuilder,
                    public dialogRef: MatDialogRef<DialogModifComponent>,
                    @Inject(MAT_DIALOG_DATA) public editData: IProduit,
                    private bieroServ: ApibieroService
                ) { }

    ngOnInit(): void {

        this.modifierBiereForm = this.formBuilder.group({
            date_achat: ['', Validators.required],
            garde_jusqua: ['', Validators.required],
            notes: ['', Validators.required],
            prix: ['', Validators.required],
            quantite : ['',Validators.required],
            millesime : ['',Validators.required]
        });

        //console.log(this.editData)
        if(this.editData){
            this.modifierBiereForm.controls['date_achat'].setValue(this.editData.date_achat);
            this.modifierBiereForm.controls['garde_jusqua'].setValue(this.editData.garde_jusqua);
            this.modifierBiereForm.controls['notes'].setValue(this.editData.notes);
            this.modifierBiereForm.controls['prix'].setValue(this.editData.prix);
            this.modifierBiereForm.controls['quantite'].setValue(this.editData.quantite);
            this.modifierBiereForm.controls['millesime'].setValue(this.editData.millesime);
        }
    
    }

    modifierBiere():void{
    if(this.modifierBiereForm.valid){
        let biere:IProduit = this.modifierBiereForm.value;  
        biere.id_bouteille = this.editData.id_bouteille;
        this.bieroServ.modifierBiere(biere).subscribe({
        next:(reponse)=>{
            console.log('biere modifiée')
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
