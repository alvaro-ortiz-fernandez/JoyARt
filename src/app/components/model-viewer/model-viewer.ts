import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
  selector: 'app-model-viewer',
  imports: [],
  templateUrl: './model-viewer.html',
  styleUrl: './model-viewer.scss',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ModelViewer {

  @Input() cssClass!: string;

  modelId!: number;
  
  constructor() {
    this.modelId = Math.floor(Math.random() * 16) + 1;
  }
}