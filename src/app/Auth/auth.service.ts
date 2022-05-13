import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  etatConnexion:boolean = false;

  constructor() { }

  setConnexion(etatConnexion:boolean):void {
    this.etatConnexion = etatConnexion;
    console.log(this.etatConnexion);
  }

  getConnexion():boolean {
    return this.etatConnexion;
  }

}
