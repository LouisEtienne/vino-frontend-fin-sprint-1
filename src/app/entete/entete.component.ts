import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBouteilleComponent } from '../dialog-bouteille/dialog-bouteille.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { IProduit } from '../iproduit';
import { ApibieroService } from '../Serv/apibiero.service';
import { DialogModifComponent } from '../dialog-modif/dialog-modif.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.scss']
})
export class EnteteComponent implements OnInit {
  estConnecte!:boolean;
  sTitre!:string;
  bouteille!:IProduit;

  constructor(private authServ:AuthService, private bieroServ:ApibieroService, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    //this.estConnecte = this.authServ.getConnexion();
    this.authServ.statut().subscribe(bLogin=>{
      this.estConnecte = bLogin;
    })
    this.authServ.getTitre().subscribe(leTitre =>{
      this.sTitre = leTitre;
    })
  }

  changeConnexion():void{
    // Changer l'état de connexion dans mon service.
    this.authServ.setConnexion(this.estConnecte);
  }

  // openDialog(): void {
  //   this.getAllBieres();
  //   this.dialog.open(DialogBouteilleComponent, {
  //     width: '30%',
  //     data: this.bouteille
  //   }).afterClosed().subscribe(res=>{
  //     this.getAllBieres();
  //   });
  // }

  // getAllBieres(){
  //   this.bieroServ.getBieres()
  //   .subscribe({
  //     next:(res)=>{
  //       this.dataSource = new MatTableDataSource(res.data);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     },
  //     error:(err)=>{
  //       alert("erreur")
  //     }
  //   })
  // }



}
