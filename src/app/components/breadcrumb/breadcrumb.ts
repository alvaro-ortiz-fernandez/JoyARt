import { Component, Input } from '@angular/core';
import { Path } from '../../model/path';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports: [ RouterLink ],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {

  @Input() paths!: Path[];
}