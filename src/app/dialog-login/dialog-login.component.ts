import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../Auth/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../iuser';

@Component({
    selector: 'app-dialog-login',
    templateUrl: './dialog-login.component.html',
    styleUrls: ['./dialog-login.component.scss']
})
    
export class DialogLoginComponent implements OnInit {
    @Input() user!:IUser;
    loginForm!:FormGroup;
    loggedUser: any;
    // getBouteilleId: any;

    constructor(
                    private formBuilder: FormBuilder,
                    public dialogRef: MatDialogRef<DialogLoginComponent>,
                    private authServ: AuthService
                ) { }

    /** Modèles d'expression régulière */
    courrielRegex = /^\S+$/;
    passwordRegex = /^\S+$/;
   

    ngOnInit(): void {
        /** Obtenir une nomenclature des bouteilles importées de la SAQ */
        this.authServ.getLoggedUser().subscribe((data: any) => { this.loggedUser = data.data; })
        
        /** Forme et validation des données saisies */
        this.loginForm = this.formBuilder.group({
            courriel : ['', [Validators.required, Validators.pattern(this.courrielRegex)]],
            password : ['', [Validators.required, Validators.pattern(this.passwordRegex)]]
        })
    }

    /** Fonction pour ajouter une bouteille au cellier */
    login():void{
        if (this.loginForm.valid) {
            let user:IUser = this.loginForm.value;  
            this.authServ.login(user).subscribe({
                next:(reponse)=>{
                    this.dialogRef.close('logged in');  
                },
                error:(reponse)=>{
                    this.dialogRef.close('erreur');
                }
            });
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
