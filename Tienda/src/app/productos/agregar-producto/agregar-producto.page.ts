import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {

  constructor(private productoServicio:ProductosService, private router : Router) { }

  ngOnInit() {
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
