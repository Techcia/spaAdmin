import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';
import { ValidateBrService } from 'angular-validate-br';
@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss'],
  animations: fuseAnimations,
  providers: [ValidateBrService]
})
export class CompanyCreateComponent implements OnInit {

  companyForm: FormGroup = this._formBuilder.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    document: ['', [Validators.required, this.validateBrService.cnpj]],
    tradeName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validator: [this.mustMatch('password', 'confirmPassword')]
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
  }

  createCompany() {
    this.loading = true;
    this.companyService.createCompany(this.companyForm.value).pipe(finalize(() => this.loading = false)).subscribe(res => {
      this._snackBar.open("Empresa criada com sucesso", "Fechar", {
        duration: 2000,
      }).afterDismissed().subscribe(res => {
        this.router.navigateByUrl('/company/list');
      });
    })
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}
