import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { ListadoEmpresa } from "../models/listado-empresa";

@Injectable({
  providedIn: "root"
})
export class ListadoempresasserviceService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = " https://pavii.ddns.net/api/empresas/";
  }
  get() {
    return this.httpClient.get(this.resourceUrl);
  }
  getById(Id: number) {
    return this.httpClient.get(this.resourceUrl + Id);
  }

  post(obj:ListadoEmpresa) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(Id: number, obj:ListadoEmpresa) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }
  
  delete(Id) {
    return this.httpClient.delete(this.resourceUrl + Id);
  }
}
