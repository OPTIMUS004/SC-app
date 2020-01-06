import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../sc-folder/services/auth.service';

@Component({
selector: 'left-panel',
template: `
<div class ="col-sm-2 content-three">
<div class="fancy">
    <h5>Your Fancies</h5>
    <likes [@fadeInOut]></likes>
</div>

<div>Contact your Chaperone
    <form (ngSubmit)="msgChap()">
        <button type="submit" class="btn btn-primary">Share Fancy with Chaperone</button>
    </form>
</div>
</div>
`,
styles: [`
`],
animations: [trigger ('fadeInOut', [
    state('void', style({opacity: 0
    })),
    transition('void<=>*', animate(2000))
]
)]
})

export class LeftPanelComponent {

    constructor( private auth: AuthService) {}
    msgChap() {

        alert('Fancy noted')

    }
}
