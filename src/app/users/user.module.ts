import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { userRoutes } from './user.routes'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DetailsPageComponent} from './details-page.component';
import { RightPanelComponent } from './right-panel.component';
import { SharedModule } from 'src/common/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(userRoutes),
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        DetailsPageComponent,
        RightPanelComponent
    ],
    providers: [],

    exports: [
        
    ]
})

export class UserModule { }