import { Injectable, NgModule } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ModalErrorComponent } from 'app/shared/layout/components/modal-error/modal-error.component';


@Injectable({
  providedIn: 'root'
})
export class HttpsRequestInterceptorService implements HttpInterceptor {
  constructor(private router: Router, private dialog: MatDialog) { }
  modalOpen: boolean = false;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event
      }),
      catchError((err) => {
        if (err.status == "401" && req.url != environment.apiUrl + "/auth/company") {
          this.openModalError("Sessão expirada", "Por favor, autentique-se novamente", "authentication/login");
        }
        throw err;
      })
    );
  }

  openModalError(title: string, message: string, router?: string) {
    if (!this.modalOpen) {
      this.modalOpen = true;
      const dialogRef = this.dialog.open(ModalErrorComponent, { data: { title: title, message: message } });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (router) {
          this.modalOpen = false;
          this.router.navigateByUrl(router);
        }
      });
    }
  }

}

@NgModule({
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptorService,
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class InterceptorModule { }
