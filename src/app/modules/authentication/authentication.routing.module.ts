import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationComponent } from './authentication.component';


const routes: Routes = [
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            { path: '**', redirectTo: 'login' },
            { path: 'login', component: LoginComponent, },
        ]
    },

    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
