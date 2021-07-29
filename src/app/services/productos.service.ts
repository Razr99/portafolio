import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando: boolean = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise( (resolve: any, reject) => {
      this.http.get('https://angular-html-9727c-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( ( resp: any) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
  }

  public getProducto(id: String) {
    return this.http.get(`https://angular-html-9727c-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }

  public buscarProducto(termino: string) {

    if (this.productos.length == 0) {
      //Cargar productos
      this.cargarProductos().then(() => {
        //Ejecutat despues de tener los productos
        //Aplicar el filtro
        this.filtrarProductos(termino);
      });
    } else {
      //Aplicar el filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    //console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLowerCase();

      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 ) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
