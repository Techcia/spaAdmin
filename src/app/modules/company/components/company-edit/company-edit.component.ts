import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';
import { ValidateBrService } from 'angular-validate-br';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss'],
  animations: fuseAnimations,
})
export class CompanyEditComponent implements OnInit {

  companyForm: FormGroup = this._formBuilder.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    document: ['', [Validators.required, this.validateBrService.cnpj]],
    tradeName: ['', [Validators.required]],
  });
  loading: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private companyService: CompanyService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private validateBrService: ValidateBrService

  ) {
  }

  ngOnInit() {
    let company = this.companyService.company;
    this.companyForm.setValue({
      id: company.id,
      name: company.name,
      email: company.email,
      document: company.document,
      tradeName: company.tradeName
    })
  }

  editCompany() {
    this.loading = true;
    this.companyService.editCompany(this.companyForm.value).pipe(finalize(() => this.loading = false)).subscribe(res => {
      this._snackBar.open("Empresa editado com sucesso", "Fechar", {
        duration: 2000,
      }).afterDismissed().subscribe(res => {
        this.router.navigateByUrl('/company/list');
      });
    })
  }

}
