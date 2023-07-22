import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient) { }
  apiurl="http://localhost:3000/user";
  role='http://localhost:3000/role';
  getAll(){
    return this.http.get(this.apiurl);
  }

    getAllRole(){
    return this.http.get(this.role);
  }

  getbyId(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }

  proceedRegister(data:any){
    return this.http.post(this.apiurl,data);
  }

  updatedatabyid(id:any,data:any){
    return this.http.put(this.apiurl+"/"+id,data);
  }

  isLoggedIn(){
    return sessionStorage.getItem("username")!=null;
  }

  getuserRole(){
    return sessionStorage.getItem("username")!=null?sessionStorage.getItem("username")?.toString():'';
  }
}
