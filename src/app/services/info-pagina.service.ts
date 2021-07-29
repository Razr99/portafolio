import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: infoPagina = {};
  cargada: boolean = false;
  equipo: any[] = [];

  constructor( private http: HttpClient ) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    //Leer archivo JSON
    this.http.get('assets/data/data-pagina.json')
      .subscribe((resp: infoPagina) => {

        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-9727c-default-rtdb.firebaseio.com/equipo.json')
      .subscribe( (resp: any) => {
        this.equipo = resp;
        //console.log(resp);
      });
  }
}