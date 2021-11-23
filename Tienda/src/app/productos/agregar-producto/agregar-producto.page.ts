import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../productos.service';
import { TipoProductoService } from 'src/app/tipoProducto/tipo-producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {

  listado : any = []

  constructor(private productoServicio:ProductosService,
              private router : Router,
              private tipoProductoServicio : TipoProductoService) { }

  ngOnInit() {
    //debemos llamar al servicio para obtener los datos de la api
    this.tipoProductoServicio.getTipoProducto().subscribe(
      (respuesta) =>{
        this.listado = respuesta

      },
      (error) => {
        console.log("error al cargar el listado de tipo de productos")
      }
    )
  }

  //metodo para agregar
  agregarProducto(nombre,imagenURL,comentarios,precios,stock){



    this.productoServicio.addProductos(nombre.value,imagenURL.value,comentarios.value,precios.value,stock.value).subscribe(
      (respuesta) => {
        console.log("agrego ? : 0" + respuesta)
        this.router.navigate(['/productos'])
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
