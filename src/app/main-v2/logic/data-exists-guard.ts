import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {MemberInfoHolderService} from "../app-services/member-info-holder.service";

@Injectable()
export class DataExistsGuard implements CanActivate {

  constructor(private memberService: MemberInfoHolderService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.memberService.members.length === 0) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
