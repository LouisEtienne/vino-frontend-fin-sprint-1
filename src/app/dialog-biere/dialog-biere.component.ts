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

    constructor(private formBuilder : FormBuilder, public dialogRef: MatDialogRef<DialogBiereComponent>,@Inject(MAT_DIALOG_DATA) biere: IProduit, private bieroServ :ApibieroService) {
    }

    ngOnInit(): void {
        this.bieroServ.getListeBouteilles().subscribe((data: any) => { this.bouteilles = data.data; })
    
        this.creerBouteilleForm = this.formBuilder.group({
            millesime : ['',Validators.required],
            quantite : ['',Validators.required],
            date_achat : ['',Validators.required],
            prix : ['',Validators.required],
            garde_jusqua : ['',Validators.required],
            notes : ['',Validators.required]
        })
    
    }

ajouterBouteille():void{
  if(this.creerBouteilleForm.valid){
    console.log(this.creerBouteilleForm.value)
    let bouteilles:any = this.creerBouteilleForm.value;  
    console.log(bouteilles)
    //this.bieroServ.ajouterBiere(bouteilles).subscribe({
    //  next:(reponse)=>{
    //    
    //    console.log('Vin ajoutee')
    //    this.dialogRef.close('add');  
    //  },
    //  error:(reponse)=>{
    //    this.dialogRef.close('add');
    //    
    //  }
    //});
  }
  
}

  onNoClick(): void {
    this.dialogRef.close();
  }

  

}
