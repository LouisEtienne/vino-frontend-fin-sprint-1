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
  creerBiereForm!:FormGroup;


constructor(private formBuilder : FormBuilder, public dialogRef: MatDialogRef<DialogBiereComponent>,@Inject(MAT_DIALOG_DATA) biere: IProduit, private bieroServ :ApibieroService) {
  console.log("constructeur")
}

ngOnInit(): void {


      this.bieroServ.getListeBouteille().subscribe((data:any)=>{this.biere = data.data; 
        console.log(data);

          this.creerBiereForm = this.formBuilder.group({
            // nom_bouteille : ['',Validators.required],
            id_bouteille : ['',Validators.required],
            millesime : ['',Validators.required],
            quantite : ['',Validators.required],
            date_achat : ['',Validators.required],
            prix : ['',Validators.required],
            garde_jusqua : ['',Validators.required],
            notes : ['',Validators.required]
          })
      })

}

ajouterBouteille():void{
  if(this.creerBiereForm.valid){
    console.log(this.creerBiereForm.value)
    let biere:IProduit = this.creerBiereForm.value;  
    console.log(biere)
    this.bieroServ.ajouterBouteille(biere).subscribe({
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
