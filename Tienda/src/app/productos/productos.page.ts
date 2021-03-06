import { Component, OnInit } from '@angular/core';
//importamos la clase del servicio
import {ProductosService} from './productos.service';
import {Router} from '@angular/router';//enrutar 

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  private url;
  private productos : any = []
  usuario = localStorage.getItem("datosUsuario")


  //el constructor utiliza el servicio y este servicio ahora es parte del html
  constructor(private servicioProductos: ProductosService , private router : Router) { }

  ngOnInit() {
    //recuperar todos los productos
    this.servicioProductos.getProductos().subscribe(
      (respuesta : any) =>{
         this.productos = respuesta
         this.url = respuesta.imagen[0].url
         localStorage.setItem("ultimoID", this.productos[this.productos.length-1].id + 1)
         console.log(respuesta)},
      (error) => { console.log(error)}
    )
  }

  ionViewWillEnter(){
    this.servicioProductos.getProductos().subscribe(
      (respuesta) =>{
        this.productos = respuesta
        localStorage.setItem("ultimoID", this.productos[this.productos.length-1].id + 1)
        console.log(respuesta)},
      (error) => { console.log(error)}
    )
  }

  //metodo que redirecciona a la pagina de agregar
  redireccionarAgregar(){
    console.log('funciona');
    this.router.navigate(['/agregar-producto']);

  }

    //metodo que redirecciona a la pagina de agregar
    redireccionarLogin(){
      console.log('funciona');
      this.router.navigate(['/login']);
  
    }
  

}
