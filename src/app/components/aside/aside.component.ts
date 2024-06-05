import { Component, OnInit } from '@angular/core';
import { routes } from '../../helpers/routes';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit {

  routes: Array<any> = routes

  constructor () { }

  ngOnInit() {


  }
}
