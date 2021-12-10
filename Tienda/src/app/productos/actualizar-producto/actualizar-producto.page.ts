import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router'
import { ProductosService} from '../productos.service'


//OJO
import { TipoProductoService } from 'src/app/tipoProducto/tipo-producto.service';


@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.page.html',
  styleUrls: ['./actualizar-producto.page.scss'],
})
export class ActualizarProductoPage implements OnInit {

  //en el actualizar tenemos una variable producto, los routing para capturar el id por url y redireccionar
  //y ademas tenemos el servicio para llamar al metodo por id
  private datos : any = [];
  private idproducto;

  private listadoCategorias : any =[];
  
  constructor(private activatedRouter : ActivatedRoute ,private router: Router, private productoServicio: ProductosService, private tipoProductoServicio: TipoProductoService ) { }

  ngOnInit() {

        //vamos a buscar el producto por el ID que viene en la URL
        this.activatedRouter.paramMap.subscribe(paramMap=>{
          const valor = paramMap.get('pID')
          this.idproducto = valor; //guardamos este id para luego modificar
          this.productoServicio.getProductosById(valor).subscribe(
            (respuesta : any) =>{
              this.datos = respuesta
               console.log(respuesta)},
            (error) => { console.log(error)}
          )
          
        }),

        this.tipoProductoServicio.getTipoProducto().subscribe(
          (respuesta) =>{
            this.listadoCategorias = respuesta
    
          },
          (error) => {
            console.log("error al cargar el listado de tipo de productos")
          }
        )
        
  }


                
  //ACTUALIZAR PRODUCTO
  //revisar si es comentario o comentarios
  actualizarProducto(nombre,comentarios,precios,stock,Genero,check){
    
    //llamar al servicio y enviar los datos capturados
    this.productoServicio.updateProductos(this.idproducto,nombre.value,comentarios.value,precios.value,stock.value,Genero.value,check.checked).subscribe(
          (respuesta) =>{
            //accion en caso de actualizar
            this.router.navigate(['/productos'])

          },
          (error) => {
             console.log(error)
          }
        )

 }


}
