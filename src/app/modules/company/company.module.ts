import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyCreateComponent } from './components/company-create/company-create.component';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyService } from './services/company.service';
import { ResolveCompanyEditService } from './services/resolves/resolve-company-edit.service';
import { ResolveCompanyListService } from './services/resolves/resolve-company-list.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AngularValidateBrLibModule } from 'angular-validate-br';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [CompanyComponent, CompanyCreateComponent, CompanyEditComponent, CompanyListComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,
    MatDialogModule,
    NgxMaskModule.forRoot(options),
    AngularValidateBrLibModule
  ],
  providers: [
    CompanyService,
    ResolveCompanyEditService,
    ResolveCompanyListService
  ]
})
export class CompanyModule { }
