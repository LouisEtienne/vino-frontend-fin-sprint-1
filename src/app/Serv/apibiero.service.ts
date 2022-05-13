import { Injectable } from '@angular/core';
import { IProduit } from '../iproduit';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListeProduit } from '../iliste-produit';

@Injectable({
  providedIn: 'root'
})
export class ApibieroService {
  url:string = "http://127.0.0.1:8000/webservice/php/biere";
  constructor(private http:HttpClient) { }

  getBieres():Observable<IListeProduit>{
    console.log("getBieres");
    return this.http.get<IListeProduit>(this.url);

    /*return [...Array(3)].map(
      (item, index) => {return <IProduit>{nom : "element "+ index, "prix": (10 + index * index), "rabais" : !(index % 3) }}
    );*/


  }
}
