import { Component, OnInit } from '@angular/core';
import {ListadoempresasserviceService} from '../../services/listadoempresasservice.service';
import {ListadoEmpresa, ListadoEmpresas} from '../../models/listado-empresa';
import { ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: 'app-listado-empresas',
  templateUrl: './listado-empresas.component.html',
  styleUrls: ['./listado-empresas.component.css']
})
export class ListadoEmpresasComponent implements OnInit {
  Items: ListadoEmpresa[] = [];
  Titulo = "Listado Empresas"
  submitted = false;
  TituloAccionBM = {
    A:"(Alta)",
    B:"(Eliminar)",
    M:"(Editar)",
    L:"(Listado)"
  };
  AccionBM = "L"; //INICIALMENTE INICIA EN EL LISTADO DE EMPRESAS 
  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados..."
  };
  FormRegEmp: FormGroup;
  constructor(
    public formbuilder: FormBuilder,
    private listadoEmpresasService: ListadoempresasserviceService,
    private modalDialogServiceEmp: ModalDialogService
  ) { }

  ngOnInit() {
    this.GetEmpresasListado();
    this.FormRegEmp = this.formbuilder.group({
      CantidadEmpleados: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],
      FechaFundacion: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}"
          )
        ]
      ],
      IdEmpresa: [0],
      RazonSocial: [null]
    });
  }

  GetEmpresasListado() {
    this.listadoEmpresasService.get()
    .subscribe((res:ListadoEmpresa[]) => {
      this.Items = res;
    });
  }

  Alta() {
    this.AccionBM = "A";
    this.FormRegEmp.reset(this.FormRegEmp.value);
    this.submitted = false;
    //this.FormReg.markAsPristine();
    this.FormRegEmp.markAsUntouched();
  }

   // Obtengo un registro especifico según el Id
  BuscarPorId(Dto, AccionBM) {
    window.scroll(0, 0); // ir al incio del scroll
    this.listadoEmpresasService.getById(Dto.IdEmpresa).subscribe((res: any) => {
      this.FormRegEmp.patchValue(res);
      //formatear fecha de ISO 8061 a string dd/MM/yyyy
      var arrFecha = res.FechaFundacion.substr(0, 10).split("-");
      this.FormRegEmp.controls.FechaFundacion.patchValue(
        arrFecha[2] + "/" + arrFecha[1] + "/" + arrFecha[0]
      );
      this.AccionBM = AccionBM;
    });
  }

  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
     if (this.FormRegEmp.invalid) {
      return;
    }
    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormRegEmp.value };

    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    var arrFecha = itemCopy.FechaFundacion.substr(0, 10).split("/");
    if (arrFecha.length == 3)
      itemCopy.FechaFundacion = 
          new Date(
            arrFecha[2],
            arrFecha[1] - 1,
            arrFecha[0]
          ).toISOString();

    // agregar post
    if (itemCopy.IdEmpresa == 0 || itemCopy.IdEmpresa == null) {
      this.listadoEmpresasService.post(itemCopy).subscribe((res: any) =>{
        this.Volver();
        this.modalDialogServiceEmp.Alert('Registro agregado correctamente');
      });
    } else {
      // modificar put
      this.listadoEmpresasService
        .put(itemCopy.IdEmpresa, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          this.modalDialogServiceEmp.Alert('Registro modificado correctamente.');
        });
    }
  }
   // comienza la modificacion, luego la confirma con el metodo Grabar
  Editar(Dto) {
    this.submitted = false;
    this.FormRegEmp.markAsPristine();
    this.FormRegEmp.markAsUntouched();
    this.BuscarPorId(Dto, "M");
  }

  // Volver desde Agregar/Modificar
  Volver() {
    this.AccionBM = "L";
  }

  // representa la baja logica 
  Eliminar(Dto) {
   this.modalDialogServiceEmp.Confirm(
      "Esta seguro de eliminar este registro?",
      undefined,
      undefined,
      undefined,
      () =>
        this.listadoEmpresasService  
          .delete(Dto.IdEmpresa)
          .subscribe((res: any) => 
            this.Buscar()
          ),
      null
    );
  }
// Buscar segun los filtros, establecidos en FormReg
  Buscar() {
    this.listadoEmpresasService
      .get()
      .subscribe((res: any) => {
      });
  }
}