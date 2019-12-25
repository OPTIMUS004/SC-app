import { Component, Input, OnInit, EventEmitter }from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { AuthService } from './shared/auth.service';

@Component({
    selector: 'right-panel',
    templateUrl: './right-panel.component.html',
    styles: [`
                .side-nav{
                    border-bottom: 2px solid tomato;
                    padding-left: 4px;
                    padding-right: 4px;
                    margin-bottom: 7px;
                }
                .entire-collapsible{
                    margin-top:0;
                    border-radius: 0 0 4px 4px;

                }
                .collapsible-title{
                    background-color: #F7F7F7;
                    margin-bottom: 0;
                    border-bottom: 1px solid grey;
                    padding: 2px;
                }
                .collapsible-body{
                    background-color: #eee;
                    margin-top: 0;
                    color: #000;
                    text-align:center;
                }
                .preference{
                    border-radius: 4px 4px 0 0;
                    padding-left: 4px;
                    padding-right: 4px;
                    margin-bottom: 7px;
                }
                .checkbox{ cursor: pointer }
                .content-one{
                    background-color: #bbb;
                    padding-top: 20px;
                }
                a:hover{
                    cursor: pointer;
                }
                .btn, .form-control{
                    border-radius: 0;
                }
    `]
})

export class RightPanelComponent implements OnInit{
    @Input() user;
    close: boolean = false;
    agePreferenceForm: FormGroup
    private youngestSet: FormControl;
    private youngerSet: FormControl;
    private oldSet: FormControl;
    private olderSet: FormControl;
    private employed: FormControl;
    private selfEmployed: FormControl;
    private unemployed: FormControl;
    private ssce: FormControl;
    private nationalDiploma: FormControl;
    private higherDiploma: FormControl;
    private bachelor: FormControl;
    private masters: FormControl;
    private education: FormGroup;
    private employmentStatus: FormGroup;
    private ageRange : FormGroup;


constructor(private auth:AuthService){}

    ngOnInit(){
        this.masters = new FormControl();
        this.bachelor = new FormControl();
        this.higherDiploma = new FormControl();
        this.nationalDiploma = new FormControl();
        this.ssce = new FormControl();
        this.youngerSet = new FormControl();
        this.youngestSet = new FormControl();
        this.olderSet = new FormControl();
        this.oldSet = new FormControl();
        this.employed = new FormControl();
        this.selfEmployed = new FormControl();
        this.unemployed = new FormControl();
        this.ageRange = new FormGroup({
            youngestSet: this.youngestSet,
            youngerSet: this.youngerSet,
            oldSet: this.oldSet,
            olderSet: this.olderSet
        })
        this.employmentStatus = new FormGroup({
            unemployed: this.unemployed,
            employed: this.employed,
            selfEmployed: this.selfEmployed
        })
        this.education = new FormGroup({
            masters: this.masters,
            bachelor: this.bachelor,
            higherDiploma: this.higherDiploma,
            nationalDiploma: this.nationalDiploma,
            ssce: this.ssce
            
        })

        this.agePreferenceForm = new FormGroup({
            ageRange: this.ageRange,
            employmentStatus: this.employmentStatus,
            education: this.education

        })
    }

    closeToggle(formValue){
        this.auth.updateAgePreference(formValue)
        this.close = true;
    }
}