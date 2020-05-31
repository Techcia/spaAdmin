import { Injectable } from '@angular/core';
import { CompanyService } from '../company.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolveCompanyListService implements Resolve<any> {

  constructor(private companyService: CompanyService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.companyService.getCompaniesResolve()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }
}
