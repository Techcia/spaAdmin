import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSidebarModule } from '@fuse/components/index';
import { FuseSharedModule } from '@fuse/shared.module';

import { ContentModule } from 'app/shared/layout/components/content/content.module';
import { FooterModule } from 'app/shared/layout/components/footer/footer.module';
import { NavbarModule } from 'app/shared/layout/components/navbar/navbar.module';
import { QuickPanelModule } from 'app/shared/layout/components/quick-panel/quick-panel.module';
import { ToolbarModule } from 'app/shared/layout/components/toolbar/toolbar.module';

import { VerticalLayout3Component } from 'app/shared/layout/vertical/layout-3/layout-3.component';

@NgModule({
    declarations: [
        VerticalLayout3Component
    ],
    imports     : [
        RouterModule,

        FuseSharedModule,
        FuseSidebarModule,

        ContentModule,
        FooterModule,
        NavbarModule,
        QuickPanelModule,
        ToolbarModule
    ],
    exports     : [
        VerticalLayout3Component
    ]
})
export class VerticalLayout3Module
{
}
