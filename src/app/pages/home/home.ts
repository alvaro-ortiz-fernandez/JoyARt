import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechCard } from '../../components/tech-card/tech-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TechCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  technologies: Tech[] = [
    {
      title: 'Angular',
      description: 'Framework de desarrollo frontend en el que se basa la arquitectura de la aplicación web. Gestiona aspectos como la navegación y la interacción con el usuario.',
      image: 'assets/images/techs/angular.png',
      link: 'https://angular.dev/'
    },
    {
      title: 'Firebase',
      description: 'Plataforma backend en la nube utilizada para la persistencia de datos, autenticación de usuarios y sincronización en tiempo real.',
      image: 'assets/images/techs/firebase.png',
      link: 'https://firebase.google.com/'
    },
    {
      title: 'Model Viewer',
      description: 'Componente web desarrollado por Google para integrar modelos 3D dentro de páginas HTML a través de renderización 3D mediante WebGL.',
      image: 'assets/images/techs/model-viewer.png',
      link: 'https://developers.google.com/ar/develop/webxr/model-viewer?hl=es-419'
    },
    {
      title: 'Bootstrap',
      description: 'Framework CSS empleado para construir una interfaz adaptable, consistente y accesible en distintos dispositivos.',
      image: 'assets/images/techs/bootstrap.png',
      link: 'https://getbootstrap.com/'
    },
    {
      title: 'GitHub',
      description: 'Plataforma de control de versiones utilizada para la gestión del código fuente, documentación del proyecto y colaboración.',
      image: 'assets/images/techs/github.png',
      link: 'https://github.com/alvaro-ortiz-fernandez/JoyARt'
    },
    {
      title: 'Visual Studio Code',
      description: 'Entorno de desarrollo empleado para la implementación del proyecto, con soporte para depuración e integración con Git.',
      image: 'assets/images/techs/vscode.png',
      link: 'https://code.visualstudio.com/'
    }
  ];

  productIds: string[] = [
    '2wKtZNm1xIJl9SKNXTsQ',
    '3m9Uq4KrKHOSc5UAp2iB',
    '45OfmpEOaoGRnYWdFxal',
    '592rph2mGzGe0Tnp8AVi',
    '5Loon7th23BnHmnOrDlq',
    '65I2l0tNsriu8h8H4R8a',
    '71o9Y1Laga3xk12uzSFF',
    '75Q5vLXTNXzALyoCLVkR',
    '8PfvxCtoUmo8Vc22QkOd',
    '8jWTWYd9MRFct53u8SLZ',
    '9jYP5fzDYZhk1LxfmXQO',
    '9xJ3dTV9CJjrBRzWXKpf',
    'ALWupXt18imw1JARcNlu',
    'BXofkF3YVaHWVHXMxIqy',
    'DCeYfQYw4dKbfLcbqfnZ',
    'EM7EfsUUQdUhdYuOn4u7',
    'Ej6W1WwaLDzO6VGd47Cl',
    'FBEo3FXJz8I8GEXe7f0A',
    'GXGwKaPHSf3OzYddzQkw',
    'OLQX18Q7xfuvueeaebzw',
    'PXEkt8JW1Cj4JIcaGhNL',
    'Q16o04k9cwZDXDaa7loe',
    'Q7yLsxjr04UdoVuKQvbK',
    'QQamOasIKs7ctgxogfMI',
    'QVldNhfcM67HuOItuIeT',
    'SxDvBGgcX0WKSJqCswlo',
    'U9xni4Voz7X40EDpBoaI',
    'UEO952TCqA9nh5cRQWeb',
    'Uj7MRJ6hcre0D8tJVqge',
    'UuLXHARoF5wB4NR0vgPu',
    'VJSvrg3S6aL5gpLVz1aG',
    'WEBuJzn1AxeCg3KHHJDw',
    'WRb1sX60xxCqX5DliAsd',
    'ZepQ94k1Yx3odzlhB2U4',
    'ZrUEKAVQDDG96QCKvqVt',
    'bV4F4LXyh7WKaGtEL7NZ',
    'dPEo4Ry3ZI2mSMl2F5gs',
    'fIUnQmwhH3rid8mRpRNv',
    'imJUmZ5IXmfYSBFsfkVX',
    'lEH76RlLC7RPA4gYp6OU',
    'mWRKR33TliIK5R7SHqpx',
    'pIgf25naLw6bfpIwJsEe',
    'pqvM9dEVaxHdEld0JSGE',
    'rjzOPd5hSpb1OZ0HwYqi',
    'rybkGeoa6oY9HzaZYHd3',
    'tElok5H0Y0peuWAE0xzp',
    'u2wvzEy55Q5VHTST2Pfd',
    'ujHWZqnSey1N3jbEryZN',
    'xDMuhjopdf0poijfSzia',
    'zLXEevg3GUr1YyfQ2e8o'
  ];

  getRandomProductId(): string {
    return this.productIds[Math.floor(Math.random() * this.productIds.length)];
  }
}