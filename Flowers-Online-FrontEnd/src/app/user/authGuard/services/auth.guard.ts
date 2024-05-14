import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthServiceService) { }
  canActivate()
  {
    if(this.authService.getToken()!=null)
      return true;
    this.router.navigate(['/login']);
    return false;
  }
  
}


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthServiceService) { }
  canActivate()
  {
    if(this.authService.getToken()==null )
      return true;
    this.router.navigate(['/shop/dashboard']);
    return false;
  }
}
