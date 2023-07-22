import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
isAdmin=false;
constructor(public router:Router,public service:AuthService){}

logout(){
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("userrole");
  this.router.navigate(['/login']);
}

ngOnInit(): void {
    if(this.service.getuserRole() == 'admin'){
      this.isAdmin = true;
    }
}
}
