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

  getBouteillesCellier():Observable<IListeProduit>{
    console.log("getBouteilles");
    return this.http.get<IListeProduit>(this.url);
    /*return [...Array(3)].map(
      (item, index) => {return <IProduit>{nom : "element "+ index, "prix": (10 + index * index), "rabais" : !(index % 3) }}
    );*/
  }

  getBiere(id:number|string):Observable<IProduit>{
    console.log("getBouteille");
    return this.http.get<IProduit>(this.url+id);

    /*return [...Array(3)].map(
      (item, index) => {return <IProduit>{nom : "element "+ index, "prix": (10 + index * index), "rabais" : !(index % 3) }}
    );*/


  }

  modifierBiere(data:IProduit):Observable<any>{
    //delete data.date_ajout; // Pour effacer des propriétés... 

    let httpOption = {
      headers : new HttpHeaders({
        'Content-type' : 'application/json',
        'Authorization' : 'Basic '+ btoa("biero:biero")
      })
    };
    
    return this.http.post<IProduit>(this.url + data.id_bouteille, data, httpOption);
  }

  ajouterBiere(data:IProduit):Observable<any>{
    let httpOption = {
      headers : new HttpHeaders({
        'Content-type' : 'application/json',
        'Authorization' : 'Basic '+ btoa("biero:biero")
      })
    };
    return this.http.put<IProduit>(this.url, data, httpOption);
  }

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
