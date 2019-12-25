import { Component } from '@angular/core';

@Component({
	selector: 'collapsible-well',
	template: `
			<div>
					<h6 (click)="toggleContent()" class="pointable"><ng-content select="[well-title]"></ng-content></h6>
					<ng-content select="[well-body]" *ngIf="visible" class="body"></ng-content>
			</div>
		`,
	styles: [`
	.pointable{ cursor: pointer; margin-bottom: 0; }
	`]
		})

export class CollapsibleWellComponent {

	visible:boolean = false;
	toggleContent() {
		this.visible = !this.visible;
	}
	reset(){
		this.visible = false;
}
}