import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router , private alertController: AlertController) { }

  ngOnInit() {
  }


  //metodo que recibe la informacion del form
  async login(form){

    //console.log(form.value)  //primera opcion 

    var usuario = form.value["usuario"];
    var contrasenia = form.value["contrasenia"];

    if(usuario == "admin" && contrasenia =="123"){

      localStorage.setItem("datosUsuario", usuario);

      //ALERTA -----------------------------------

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'ACCEPTADO',
        message: 'Bienvenido de vuelta agente :'+usuario,
        buttons: ['OK']
      });
  
      await alert.present();
  
      //queda a la espera del cierre de la ventana
      const { role } = await alert.onDidDismiss();




      //enviar al home , redireccionar
      this.router.navigate(['/productos'])

    }

  }

}
