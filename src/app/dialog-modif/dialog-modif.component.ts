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


constructor(private formBuilder : FormBuilder, public dialogRef: MatDialogRef<DialogModifComponent>,@Inject(MAT_DIALOG_DATA) public editData: IProduit, private bieroServ :ApibieroService) {
}

ngOnInit(): void {
  this.modifierBiereForm = this.formBuilder.group({
    nom : ['',Validators.required],
    brasserie : ['',Validators.required]
  });

  console.log(this.editData)
  if(this.editData){
    // this.modifierBiereForm.controls['nom'].setValue(this.editData.nom);
    // this.modifierBiereForm.controls['type'].setValue(this.editData.type);
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
