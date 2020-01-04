import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'favorite',
    template: `<div (click)="onClick()">
                    <div [style.color]="iconColor" class="pointable"><b>+</b>Add as Fancy</div>
                </div>`,
    styles: [`
                .pointable{cursor: pointer}
            `]
})

export class favoriteComponent {
    @Input() set liked(val) {
        this.iconColor = val ? 'tomato' : 'white';
    }
    @Output() like = new EventEmitter();

    iconColor: string;

    onClick() {
        this.like.emit({});
    }
}
