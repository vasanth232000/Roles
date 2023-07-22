import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const notfy = inject(ToastrService);
if(auth.isLoggedIn()){
  if(route.url.length>0){
    let menu = route.url[0].path;
    if(menu == 'user'){
      if(auth.getuserRole() == 'admin'){
        return true;
      }else{
        notfy.warning("You don't have access");
        router.navigate(['']);
        return false;
      }
    }else{
      return true;
    }
  }
  else{
  return true;
  }
}else{
  router.navigate(['/login']);
return false;
}

};
