import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';//enrrutar
import { ProductosService } from '../productos.service';//servicio
import { Producto } from './producto.model';



@Component({
  selector: 'app-detalle-productos',
  templateUrl: './detalle-productos.page.html',
  styleUrls: ['./detalle-productos.page.scss'],
})
export class DetalleProductosPage implements OnInit {

  private datos : any = [];
  private idproducto;
  private  url;

  //el activatedRoute más claro es solo una variable creada por nosotros,puede tener cualquier nombre
  //creamos una variable para capturar la URL activa
  constructor(private activatedRouter : ActivatedRoute , private productoServicio: ProductosService ,
    private router: Router) { }

  ngOnInit() {

    //vamos a buscar el producto por el ID que viene en la URL
    this.activatedRouter.paramMap.subscribe(paramMap=>{
      //vamos a capturar el id que esta en la URL
      //REVISAR SI REALMENTE ES pID o productoId
      //SE CAMBIO TEMPORALMENTE A LO SEGUNDO
      const valor = paramMap.get('pID')
      console.log("id del producto : "+ valor)
      //llamamos al servicio y le pasamos el id
      //AQUI LO GUARDABAMOS COMO DATOS NO COMO PRODUCTOS COMO SE MUESTRA EN EL VIDEO DEL PROFE
      this.idproducto = valor;
      this.productoServicio.getProductosById(valor).subscribe(
        (respuesta : any) =>{
          this.datos = respuesta
          this.url = respuesta.imagen.url
           console.log(respuesta)},
        (error) => { console.log(error)}
      )
      
    })
  }

  //agregamos el metodo para eliminar
  //cambiamos dato por producto
  eliminar(){
    this.productoServicio.deleteProductos(this.datos.id).subscribe(
      (respuesta : any) =>{
        this.datos = respuesta
         console.log(respuesta)
         this.router.navigate(['productos'])
        },
      (error) => { console.log(error)}
    )
    //redireccionar a la pagina de productos
    
  }
  
  editarProducto(){
    this.router.navigate(['actualizar-producto/'+ this.idproducto])
  }



}
