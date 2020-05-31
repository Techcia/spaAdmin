import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { ResolveCompanyListService } from './services/resolves/resolve-company-list.service';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { ResolveCompanyEditService } from './services/resolves/resolve-company-edit.service';
import { CompanyCreateComponent } from './components/company-create/company-create.component';


const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: CompanyListComponent,
        resolve: {
          data: ResolveCompanyListService
        }
      },
      {
        path: 'edit/:id',
        component: CompanyEditComponent,
        resolve: {
          data: ResolveCompanyEditService
        }
      },
      {
        path: 'create',
        component: CompanyCreateComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
