import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

//****
import { LoginService } from './login.service';

declare var require: any


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router , private alertController: AlertController, private log: LoginService) { }

  ngOnInit() {
  }





  //metodo que recibe la informacion del form
  login(form){

    const axios = require('axios')

    //console.log(form.value)  //primera opcion 

    var usuario = form.value["usuario"];
    var contrasenia = form.value["contrasenia"];

    axios.post('http://localhost:1337/auth/local',{

    identifier:usuario,
    password:contrasenia
  
    }).then(response=>{
      
      //enviar al home , redireccionar
      this.router.navigate(['/productos']);
      
      console.log('Funciona OK')}
    
    ).catch(error=>{this.alertLog()})
  
    //  await alert.present();
  
      //queda a la espera del cierre de la ventana
//      const { role } = await alert.onDidDismiss();




    }

  
  async alertLog(){



  const alert = await this.alertController.create({
    cssClass: 'updateProductoError',
    header: 'No se pudo iniciar sesión',
    subHeader: 'Credenciales inválidas.',
    message: 'Por favor intentelo nuevamente',
    buttons: ['OK']
    }
  );

    await alert.present()
    
  }    

}
