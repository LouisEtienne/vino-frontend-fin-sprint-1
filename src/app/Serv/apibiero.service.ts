import { Injectable } from '@angular/core';
import { IProduit } from '../iproduit';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListeProduit } from '../iliste-produit';

@Injectable({
  providedIn: 'root'
})
export class ApibieroService {
  url:string = "http://127.0.0.1:8000/webservice/php/bouteille/";
  constructor(private http:HttpClient) { }

  //Louis
  getBouteillesCellier():Observable<IListeProduit>{
    console.log("getBouteilles");
    return this.http.get<IListeProduit>(this.url);
    /*return [...Array(3)].map(
      (item, index) => {return <IProduit>{nom : "element "+ index, "prix": (10 + index * index), "rabais" : !(index % 3) }}
    );*/
  }

  //Dmitriy











// PRochainmeent
  getBiere(id:number|string):Observable<IProduit>{
    console.log("getBouteille");
    return this.http.get<IProduit>(this.url+id);

    /*return [...Array(3)].map(
      (item, index) => {return <IProduit>{nom : "element "+ index, "prix": (10 + index * index), "rabais" : !(index % 3) }}
    );*/


  }













//Dmitriy
  modifierBouteille(data:IProduit):Observable<any>{
    let httpOption = {
      headers : new HttpHeaders({
          'Content-type': 'application/json',
          'Authorization' : 'Basic '+ btoa("biero:biero")
      })
    };
    //console.log(data.id_bouteille_cellier);
    
    return this.http.post<IProduit>(this.url + data.id, data, httpOption);
  }













  //Vsvolod
  ajouterBouteille(data:IProduit):Observable<any>{
    let httpOption = {
      headers : new HttpHeaders({
        'Content-type' : 'application/json',
        'Authorization' : 'Basic '+ btoa("biero:biero")
      })
    };
    return this.http.put<IProduit>(this.url, data, httpOption);
  }

  getListeBouteilles():Observable<IListeProduit>{
    console.log(this.http.get<IListeProduit>(this.url+'bouteilles'));
    return this.http.get<IListeProduit>(this.url+'bouteilles');
    /*return [...Array(3)].map(
      (item, index) => {return <IProduit>{nom : "element "+ index, "prix": (10 + index * index), "rabais" : !(index % 3) }}
    );*/
  }









  //ajouterQuantiteBouteilleCellier (Fonction à developper pour Louis)










  //boireQuantiteBouteilleCellier (Fonction à developper pour Bita)



















  effacerBiere(id:number):Observable<any>{
    
    let httpOption = {
      headers : new HttpHeaders({
        'Content-type' : 'application/json',
        'Authorization' : 'Basic '+ btoa("biero:biero")
      })
    };
    
    return this.http.delete<IProduit>(this.url + id, httpOption);
  }
}
