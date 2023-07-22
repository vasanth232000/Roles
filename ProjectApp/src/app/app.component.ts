import { Component,DoCheck } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  isNavbar=false;
  link:any;
  title = 'ProjectApp';
  constructor(public route:ActivatedRoute,public router:Router){}
ngDoCheck(): void {
    this.link=this.router.url;
    if(this.link=="/login"||this.link=="/register"){
      this.isNavbar = false;
    }else{
      this.isNavbar = true;
    }
}
}