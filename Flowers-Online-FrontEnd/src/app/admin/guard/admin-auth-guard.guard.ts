import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class adminAuthGuardGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate()
  {
    if(localStorage.getItem('userName')==null){
      
      return true;
      
    }
    this.router.navigate(['/admin/dashboard'])
    return false
  }
}


@Injectable({
  providedIn: 'root'
})
export class adminAfterLoginGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate()
  {
    if(localStorage.getItem('userName')!=null){
      return true;
    }
    this.router.navigate(['/admin/login'])
    return false;
  }
  
}