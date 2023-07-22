import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  userlist:any;
  dataSource:any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;



constructor(public service:AuthService,public dialog:MatDialog){
  this.Loaduser();
}
Loaduser(){
  this.service.getAll().subscribe((res)=>{
    this.userlist = res;
    this.dataSource = new MatTableDataSource(this.userlist);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}
displayedColumns: string[] = ['username','name','email','role','status','action'];

updateUser(id:any){
const popup = this.dialog.open(UpdatepopupComponent,{
  enterAnimationDuration:'1000ms',
  exitAnimationDuration:'500ms',
  width:'50%',
  data:{
    usercode:id
  }
})

popup.afterClosed().subscribe((res)=>{
this.Loaduser();
})
}
}
