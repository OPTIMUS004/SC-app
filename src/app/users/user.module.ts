import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserDashboardComponent} from './user-dashboard.component';
import { RightPanelComponent } from './right-panel.component';
import { SharedModule } from 'src/common/shared.module';
import { LeftPanelComponent } from './left-panel.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(userRoutes),
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        UserDashboardComponent,
        RightPanelComponent,
        LeftPanelComponent
    ],
    providers: [],

    exports: [

    ]
})

export class UserModule { }
