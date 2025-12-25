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
}