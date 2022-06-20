import { Injectable } from '@angular/core';
import { IProduit } from '../iproduit';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListeProduit } from '../iliste-produit';

@Injectable({
    providedIn: 'root'
})
export class ApibieroService {

    /** L'adresse URL du webservice  */
    // url:string = "http://127.0.0.1:8000/webservice/php/bouteille/";
    url:string = "https://celliers-backend.courshybride.com/bouteille/";
    
    constructor(private http:HttpClient) { }

    /** GET requête pour afficher les bouteilles du cellier */
    getBouteillesCellier():Observable<IListeProduit>{
        return this.http.get<IListeProduit>(this.url);
    }

    /** POST requête pour modifier la bouteille dans le cellier */
    modifierBouteille(data:IProduit):Observable<any>{
        let httpOption = {
            headers : new HttpHeaders({
                'Content-type': 'application/json',
                // 'Authorization' : 'Basic '+ btoa("biero:biero")
            })
        };
        return this.http.post<IProduit>(this.url + data.id, data, httpOption);
    }

    /** DELETE requête pour supprimer la bouteille dans le cellier */
    effacerBouteille(id_bouteille:number):Observable<any>{
        return this.http.delete<IProduit>(this.url + id_bouteille);
    }

    /** PUT requête pour ajouter la bouteille dans le cellier */
    ajouterBouteille(data:IProduit):Observable<any>{
        let httpOption = {
            headers : new HttpHeaders({
                'Content-type' : 'application/json',
                'Authorization' : 'Basic '+ btoa("biero:biero")
            })
        };
        return this.http.put<IProduit>(this.url+"bouteilles/", data, httpOption);
    }

    /** GET requête pour afficher la gamme de bouteilles importées de la SAQ */
    getListeBouteilles():Observable<IListeProduit>{
        return this.http.get<IListeProduit>(this.url+'bouteilles');
    }

    /** PUT requête pour augmanter la quantité de bouteilles avec le même id dans le cellier */
    getBouteillesCellierQuantiteAjoutee(data:IProduit):Observable<IListeProduit>{
        let httpOption = {
            headers : new HttpHeaders({
                'Content-type' : 'application/json',
                // 'Authorization' : 'Basic '+ btoa("biero:biero")
            })                                                                                                    
        };                                                                                                                  
        return this.http.put<IListeProduit>(this.url+data.id_bouteille_cellier+"/quantite/",httpOption);
    }

    /** PUT requête pour reduire la quantité de bouteilles avec le même id dans le cellier */
    deleteBouteillesCellierQuantiteAjoutee(data:IProduit):Observable<IListeProduit>{
        let httpOption = {
            headers : new HttpHeaders({
                'Content-type' : 'application/json',
                // 'Authorization' : 'Basic '+ btoa("biero:biero")
            })                                                                                               
        };                                                                                                                 
        return this.http.delete<IListeProduit>(this.url+data.id_bouteille_cellier+"/quantite/",httpOption);
    }

    /** GET requête pour afficher la bouteille */
    getBouteille(id:number|string):Observable<IProduit>{
        return this.http.get<IProduit>(this.url+id);
    }

}
