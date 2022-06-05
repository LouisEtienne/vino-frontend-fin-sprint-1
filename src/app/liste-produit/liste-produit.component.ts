import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { IProduit } from '../iproduit';
import { ApibieroService } from '../Serv/apibiero.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogModifComponent } from '../dialog-modif/dialog-modif.component';
import { DialogBiereComponent } from '../dialog-biere/dialog-biere.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.scss']
})
export class ListeProduitComponent implements OnInit {
  biere !: IProduit;
  // dataSource:Array<IProduit>;
  estEditable:boolean= false;
  
  // colonnesTab:string[] = ["image","nom","brasserie","date_ajout", "date_modif", "action"];
  displayedColumns: string[] = ["image","nom","quantite","pays", "type", "millesime", "voir", "action" ];
  dataSource !: MatTableDataSource<IProduit>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(private authServ:AuthService, private bieroServ:ApibieroService, public dialog: MatDialog ) { 
    console.log("constructeur")
  }

  ngOnInit(): void {
    // this.bieroServ.getBieres().subscribe((data:IListeProduit)=>{
    //   this.dataSource = data.data;
    //   console.log(data.data)
    // });
    this.getAllBouteillesCellier();
    this.authServ.setTitre("Mon cellier");
    
  }

  getAllBouteillesCellier(){
    this.bieroServ.getBouteillesCellier()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("erreur")
      }
    })
  }

  effacerBiere(id:number){
    this.bieroServ.effacerBiere(id).subscribe({
      next:(res)=>{
        this.getAllBouteillesCellier();
        alert('biere effacee')
      },
      error:(err)=>{
        alert('biere non effacee')
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editDialog(bouteille:IProduit): void {
    const dialogRef = this.dialog.open(DialogModifComponent, {
      width: '30%',
      data:bouteille
    }).afterClosed().subscribe(res=>{
      this.getAllBouteillesCellier();
    });
    
  }

  openDialog(): void {
    this.getAllBouteillesCellier();
    this.dialog.open(DialogBiereComponent, {
      width: '30%',
      data: this.biere
    }).afterClosed().subscribe(res=>{
      this.getAllBouteillesCellier();
    });
  }


  valideConnecter():boolean{
    if(this.authServ.getConnexion() ==false && this.estEditable == true){
      this.estEditable = false;
    }
    return this.authServ.getConnexion();
  }

}
