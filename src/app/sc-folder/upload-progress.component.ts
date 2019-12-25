import { Component, Input } from '@angular/core'

@Component({
    selector: 'upload-progress',
    template: '<div></div>'
})

export class UploadProgressComponent {
  @Input()  progress;
}