import { Component } from '@angular/core';

@Component({
    template: `
            <div class = "fancy container">
                <left-panel></left-panel>
            </div>
    
    `,
    styles: [` .fancy{ display: flex; justify-content: center; align-items: center; background-color: #f1f1f1; }`]
})
export class UserFancyComponent {

}