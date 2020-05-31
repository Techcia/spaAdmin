import { NgModule } from '@angular/core';

import { VerticalLayout1Module } from 'app/shared/layout/vertical/layout-1/layout-1.module';
import { VerticalLayout2Module } from 'app/shared/layout/vertical/layout-2/layout-2.module';
import { VerticalLayout3Module } from 'app/shared/layout/vertical/layout-3/layout-3.module';

import { HorizontalLayout1Module } from 'app/shared/layout/horizontal/layout-1/layout-1.module';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,
        HorizontalLayout1Module,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,
        HorizontalLayout1Module,
        ModalErrorComponent
    ],
    declarations: [ModalErrorComponent],
    entryComponents: [ModalErrorComponent]
})
export class LayoutModule
{
}
