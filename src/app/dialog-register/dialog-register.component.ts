import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../Auth/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../iuser';


@Component({
    selector: 'app-dialog-register',
    templateUrl: './dialog-register.component.html',
    styleUrls: ['./dialog-register.component.scss']
})
    
export class DialogRegisterComponent implements OnInit {
    @Input() user!:IUser;
    registerForm!:FormGroup;
    loggedUser: any;

    constructor(
                    private formBuilder: FormBuilder,
                    public dialogRef: MatDialogRef<DialogRegisterComponent>,
                    private authServ: AuthService

                ) { }

    /** Modèles d'expression régulière */
    courrielRegex = /^\S+$/;
    passwordRegex = /^\S+$/;

    ngOnInit(): void {
        /** Obtenir une nomenclature des bouteilles importées de la SAQ */
        this.authServ.getLoggedUser().subscribe((data: any) => { this.loggedUser = data.data; })

        /** Forme et validation des données saisies */
        this.registerForm = this.formBuilder.group({
            courriel: ['', [Validators.required, Validators.pattern(this.courrielRegex)]],
            password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
            // confirmpassword: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
        })
    }

    /** Fonction pour ajouter une bouteille au cellier */
    registerUser():void{
        if (this.registerForm.valid) {
            let user:IUser = this.registerForm.value;
            this.authServ.register(user).subscribe({
                next:(reponse)=>{
                    this.dialogRef.close("vous êtes inscrit");  
                },
                error:(reponse)=>{
                    this.dialogRef.close("erreur");
                }
            });
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
