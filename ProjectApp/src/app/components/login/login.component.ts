import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
userdata:any;
hide=true;
constructor(public builder : FormBuilder,public notfy : ToastrService,public service:AuthService,public router:Router){
  sessionStorage.clear();
}

login=this.builder.group({
  username:this.builder.control('',Validators.required),
  password:this.builder.control('',Validators.required)
})
proceedLogin(){
if(this.login.valid){
  this.service.getbyId(this.login.value.username).subscribe((res)=>{
    this.userdata = res;
    if(this.userdata.password===this.login.value.password){
      if(this.userdata.isActive){
        sessionStorage.setItem("username",this.userdata.id);
        sessionStorage.setItem("userrole",this.userdata.role);
        this.router.navigate(['']);
        this.notfy.success("Login Successfull");
      }else{
         this.notfy.error("Inactive User,Please Contact Admin");
      }
    }else{
      this.notfy.error("Invalid Credentials");
    }
  })
}
}
}
