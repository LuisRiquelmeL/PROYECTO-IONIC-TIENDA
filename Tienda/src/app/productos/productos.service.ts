import { Injectable } from '@angular/core';
//IMPORTAMOS PARA PODER TRABAJAR CON LA API
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  constructor( private http: HttpClient) { }

  //buscar todos los productos
  getProductos(){
    //retornamos una lista de productos
    return this.http.get('http://localhost:1337/Productos')
    
  }

  //buscar los producttos por id
  //nosotros inventados la variable , en este caso productoID
  getProductosById(productoId : string){ 
    return this.http.get('http://localhost:1337/Productos/' + productoId )
    
  }

  //agregar productos
  //nomb , imgURL son parametros que creamos nosotros, totalmente distinto a lo otro
  //agregamos un producto nuevo a la lista
  //el id corresponde al ultimo elemento registrado +1
  addProductos(nombre : string, comentarios : string, precios : number, stock : number, categorias : string, check : boolean ){

    var datos = {
      "nombre" : nombre,
      "comentarios" : comentarios,
      "precios" : precios,
      "stock" : stock,
      "categorias" : categorias,
      "check" : check
      
    }
    return this.http.post('http://localhost:1337/Productos/', datos )
    
    
  


  }



  //eliminar productos
  deleteProductos(productoId: string){
    //se crea un arreglo nuevo eliminando el registro que tiene el id que estoy buscando
    //se busca un elemento por id y este elemento se quita de la lista
    //luego se sobreescribe la variable productos
    return this.http.delete('http://localhost:1337/Productos/' + productoId )
    

  }
  

  //actualizar productos
  updateProductos(productoId: string, nombre : string,comentarios : string, precios : number, stock : number, Genero : string, check : boolean){

    var datos = {
      "nombre" : nombre,
      "comentarios" : comentarios,
      "precios" : precios,
      "stock" : stock,
      "categorias" : Genero,
      "check" : check
    }

    return this.http.put('http://localhost:1337/Productos/'+ productoId, datos)
  }
}
