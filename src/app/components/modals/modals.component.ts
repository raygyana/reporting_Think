import { Component, AfterViewInit, OnInit, Output, Input, EventEmitter, ViewChild, OnChanges, AfterViewChecked } from '@angular/core';
import { ModalModelOptions } from './modals.model';
import { ProjectUtils } from '../../pages/shared/project-utils';
declare var $;

@Component({
    selector: 'app-modals',
    templateUrl: './modals.component.html',
    styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit, AfterViewChecked {
    modalModel: any = {};
    @Output() onModalSubmit = new EventEmitter<string>();
    @Input() mmOptions: ModalModelOptions;

    @ViewChild('saveAs') saveAs: any;

    constructor() {
        //    console.log(this.mmOptions);
    }


    ngOnInit() {
        //      console.log('ModalsComponent', 'ngOnInit', this.mmOptions);

        if (this.mmOptions !== undefined) {

            if (this.mmOptions === undefined) {
                throw new Error('Modal must have a "mmOptions" attribute.');
            }
            if (!this.mmOptions.id) {
                throw new Error('Modal must have a "id" attribute.');
            }
            if (!this.mmOptions.captionHeading) {
                throw new Error('Modal must have a "Heading Caption" attribute.');
            }
            if (!this.mmOptions.bodyMessage) {
                throw new Error('Modal must have a "Message Body" attribute.');
            }

        } else {
            this.mmOptions = new ModalModelOptions();
            this.mmOptions.captionHeading = 'Save Search123';
        }

        this.mmOptions.button2 = this.mmOptions.button2 || 'Ok'
    }

    ngAfterViewChecked() {
        if (this.saveAs) {
            this.saveAs.nativeElement.focus();
        }
    }


    doOnSubmit() {
        if (this.mmOptions.showInput) {
            //    console.log(this.modalModel.saveAs);
            if (!ProjectUtils.isEmpty(this.modalModel.saveAs)) {
                //       console.log(`#${this.mmOptions.id}`);

                $(`#${this.mmOptions.id}`).modal('hide');
                this.onModalSubmit.emit(this.modalModel.saveAs);
                this.modalModel.saveAs = '';
            }
        } else {
            $(`#${this.mmOptions.id}`).modal('hide');
            this.onModalSubmit.emit('submit');
        }
    }
    keyDownFunction(event: any) {
        if (event.keyCode === 13) {
            this.doOnSubmit();
        }
    }
}
