import { Component, Input, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'file-upload',
    template: `
                <div>

                    <input class="file-input" type="file"/>
                </div>
                <upload-progress [progress]="progress" ></upload-progress>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FileUploadComponent,
            multi: true
        }
    ]
})

export class FileUploadComponent implements ControlValueAccessor {
    @Input() progress;
    onChange: Function;

    private file: File | null = null;

    @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
        const file = event && event.item(0);
        this.onChange(file);
        this.file = file;
    }
    constructor( private host: ElementRef<HTMLInputElement> ) {}

    writeValue( value: null ) {
        // clear file input
        this.host.nativeElement.value = '';
        this.file = null;
    }
    registerOnChange( fn: Function ) {
        this.onChange = fn;
    }
    registerOnTouched( fn: Function ) {

    }
}
