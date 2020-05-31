import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
import { ModalErrorComponent } from 'app/shared/layout/components/modal-error/modal-error.component';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  url: string = environment.apiUrl + "/companies";
  companies: any[];
  company: any;
  onCompanyChanged: BehaviorSubject<any>;
  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.onCompanyChanged = new BehaviorSubject({});
  }

  getCompanies(): Observable<any> {
    return this.http.get<any>(this.url).pipe(catchError(err => {
      this.errorRequest();
      throw err
    }));
  }

  getCompanyById(id: number): Observable<any> {
    return this.http.get<any>(this.url + "/" + id);
  }

  createCompany(company: any){
    return this.http.post(this.url, company).pipe(catchError(err => {
      this.errorRequest();
      throw err
    }))
   }

  editCompany(company: any) {
    return this.http.put(this.url + "/" + company.id, company).pipe(catchError(err => {
      this.errorRequest();
      throw err
    }))
  }

  deleteCompany(id: number) {
    return this.http.delete(this.url + "/" + id).pipe(catchError(err => {
      this.errorRequest();
      throw err
    }))
  }

  getCompaniesResolve() {
    return new Promise((resolve, reject) => {
      this.getCompanies().pipe(debounceTime(150),
        catchError(err => {
          this.errorRequest();
          throw err
        }))
        .subscribe((response: any) => {
          this.companies = response;
          this.onCompanyChanged.next(response);
          resolve(response.content);
        }, reject);
    });
  }

  getCompanyByIDResolve(id: number) {
    return new Promise((resolve, reject) => {
      this.getCompanyById(id).pipe(debounceTime(150),
        catchError(err => {
          this.errorRequest();
          throw err
        }))
        .subscribe((response: any) => {
          this.company = response;
          this.onCompanyChanged.next(response);
          resolve(response.content);
        }, reject);
    });
  }

  

  errorRequest() {
    const dialogRef = this.dialog.open(ModalErrorComponent, { data: { title: "Erro ao realizar requisição", message: 'Houve um problema de comunicação com o nosso sistema!' } });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
}
