import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../productos.service';
import { TipoProductoService } from 'src/app/tipoProducto/tipo-producto.service';
declare var require: any

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {

  listado : any = []
  private archivo: File = null

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
  capturarImagen(event){
    //capturamos la imagen en una variable
    this.archivo =<File>event.target.files[0]

  }

  //metodo para agregar
  agregarProducto(nombre,comentarios,precios,stock,combo,check){

    const axios = require('axios')

    const STRAPI_BASE_URL = 'http://localhost:1337'

    const datos = new FormData()
    datos.append('files', this.archivo)
    datos.append('ref', 'Producto')
    datos.append('refId', localStorage.getItem("ultimoID"))
    datos.append('field', 'imagen')

    axios.post(`${STRAPI_BASE_URL}/upload`, datos)


    this.productoServicio.addProductos(nombre.value,comentarios.value,precios.value,stock.value,combo.value,check.checked).subscribe(
      (respuesta) => {
        console.log("agrego ? : 0" + respuesta)
        this.listado = respuesta
        this.router.navigate(['/productos'])
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
