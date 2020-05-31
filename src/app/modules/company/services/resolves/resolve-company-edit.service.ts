import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyService } from '../company.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveCompanyEditService implements Resolve<any> {

  constructor(private companyService: CompanyService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.companyService.getCompanyByIDResolve(route.params.id)
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }
}