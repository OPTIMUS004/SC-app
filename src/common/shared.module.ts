import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleModalComponent } from './simple-modal.component';
import { LikesComponent } from 'src/app/sc-folder/likes.component';
import { favoriteComponent } from 'src/app/sc-folder/Favorite.component';
import { UnauthorizedUserComponent } from 'src/app/errors/unauthorized-user.component';
import { CollapsibleWellComponent } from './collapsible-well.component';
import { ModalTriggerDirective } from './modal-trigger.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        
        SimpleModalComponent,
        LikesComponent,
        favoriteComponent,
        UnauthorizedUserComponent,
        CollapsibleWellComponent,
        ModalTriggerDirective
    ],
    exports: [
        SimpleModalComponent,
        LikesComponent,
        favoriteComponent,
        UnauthorizedUserComponent,
        CollapsibleWellComponent,
        ModalTriggerDirective
    ]
})

export class SharedModule{}