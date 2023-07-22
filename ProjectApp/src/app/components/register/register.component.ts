import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
userData:any;
constructor(public builder : FormBuilder,public notfy : ToastrService,public service:AuthService,public router:Router){
  this.checkUserExist();
}

register=this.builder.group({
  id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
  name:this.builder.control('',Validators.required),
  password:this.builder.control('',Validators.compose([Validators.required,Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])),
  email:this.builder.control('',Validators.compose([Validators.email,Validators.required])),
  gender:this.builder.control('male'),
  isActive:this.builder.control(false),
  role:this.builder.control('')
})

checkUserExist(){
 this.service.getAll().subscribe((res)=>{
  this.userData = res;
 })
}

proceedRegister(){
  if(this.register.valid){
    this.userData.map((item:any)=>{
      if(item.id === this.register.value.id){
        this.notfy.error('user already exists');
      }else{
      this.service.proceedRegister(this.register.value).subscribe(result=>{
      this.notfy.success('Please contact admin for enable access','Registered Successfully');
      this.router.navigate(['login']);
    })
      }
    })
  }else{
    this.notfy.warning('Please enter valid data');
  }
}

}


