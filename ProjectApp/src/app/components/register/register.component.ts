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

constructor(public builder : FormBuilder,public notfy : ToastrService,public service:AuthService,public router:Router){}

register=this.builder.group({
  id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
  name:this.builder.control('',Validators.required),
  password:this.builder.control('',Validators.compose([Validators.required,Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])),
  email:this.builder.control('',Validators.compose([Validators.email,Validators.required])),
  gender:this.builder.control('male'),
  isActive:this.builder.control(false),
  role:this.builder.control('')
})

proceedRegister(){
  if(this.register.valid){
    console.log('reg',this.register.value);
    this.service.proceedRegister(this.register.value).subscribe(result=>{
      this.notfy.success('Please contact admin for enable access','Registered Successfully');
      this.router.navigate(['login']);
    })
  }else{
    this.notfy.warning('Please enter valid data');
  }
}

}


