import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: infoPagina = {};
  cargada: boolean = false;

  constructor( private http: HttpClient ) {
    //console.log('Servicio de info página');

    //Leer archivo JSON
    this.http.get('assets/data/data-pagina.json')
      .subscribe((resp: infoPagina) => {

        this.cargada = true;
        this.info = resp;
        console.log(resp);
      });
  }
}
