import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Name } from './name.model';

@Injectable({
  providedIn: 'root'
})
export class NameService {
  currentName:Name;
  names:Name[];
  readonly baseURL = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getName(){
    return this.http.get(this.baseURL);
  }

  insertName(name:Name){
    return this.http.post(this.baseURL, name);
  }

  removeName(id:String){
    return this.http.get(this.baseURL+'delete/'+id);
  }

  updateName(name:Name){
    return this.http.post(this.baseURL + 'update',name);
  }
}
