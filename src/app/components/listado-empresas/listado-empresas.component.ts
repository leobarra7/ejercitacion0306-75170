import { Component, OnInit } from '@angular/core';
import {ListadoempresasserviceService} from '../../services/listadoempresasservice';
import {ListadoEmpresas} from '../../models/listado-empresas';

@Component({
  selector: 'app-listado-empresas',
  templateUrl: './listado-empresas.component.html',
  styleUrls: ['./listado-empresas.component.css']
})
export class ListadoEmpresasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}