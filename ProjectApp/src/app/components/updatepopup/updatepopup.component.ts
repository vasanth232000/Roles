import { Component,OnInit,Inject } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {
  rolelist:any;
  editdata:any;
constructor(public builder : FormBuilder,public notfy : ToastrService,public service:AuthService,public router:Router, @Inject(MAT_DIALOG_DATA) public data:any,public dialog:MatDialogRef<UpdatepopupComponent>){}
  ngOnInit(): void {
    this.service.getAllRole().subscribe(res=>{
      this.rolelist = res;
    })

    if(this.data.usercode != null && this.data.usercode != ""){
      this.service.getbyId(this.data.usercode).subscribe((res)=>{
        this.editdata = res;
        this.register.setValue({id:this.editdata.id,name:this.editdata.name,password:this.editdata.password,email:this.editdata.email,gender:this.editdata.gender,isActive:this.editdata.isActive,role:this.editdata.role});
      })
  }
  }

register=this.builder.group({
    id:this.builder.control(''),
  name:this.builder.control(''),
  password:this.builder.control(''),
  email:this.builder.control(''),
  gender:this.builder.control('male'),
  isActive:this.builder.control(false),
  role:this.builder.control('',Validators.required)
})

updatePopup(){
if(this.register.valid){
  this.service.updatedatabyid(this.data.usercode,this.register.value).subscribe((res)=>{
    this.notfy.success('Role Assigned Successfully')
    this.dialog.close();
  })
}else{
this.notfy.warning('Please Select Role')
}
}
}
