import { Component, Input, ViewChild, ElementRef, Inject, ContentChild } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Component({
	selector: 'simple-modal',
	template: `
			<div id="{{elementId}}" #modalcontainer class="modal fade" tabindex="-1">
				<div class="modal-dialog">

					<div class="modal-content">
						<div class="modal-header bg-dark">
							<img src="/assets/images/SCavatar.png" />
							<button type="button" class="close text-light" data-dismiss="modal">
								<span>&times;</span>
							</button>

						</div>
						<div class="modal-body" >
							<ng-content></ng-content>
						</div>
						<div class="modal-footer bg-dark"></div>
					</div>
				</div>
			</div>
	`,
	styles: [` .modal-header{ border-radius: 0; }
				.modal-footer{ border-radius: 0; }
				.modal{
					margin-top: 150px;
				}
			`]
	})

export class SimpleModalComponent {

	@Input() elementId: string;
	@Input() closeOnBodyClick: string;
	@ContentChild('modalcontainer', {static: true}) containerEl: ElementRef;


	constructor(@Inject(JQ_TOKEN) private $: any) {}

	closeModal() {
		if (this.closeOnBodyClick === 'false') {
		this.$(this.containerEl.nativeElement).modal('hide');
		}
	}
}
