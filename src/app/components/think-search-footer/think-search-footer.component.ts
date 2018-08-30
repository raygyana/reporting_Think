import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SavedSearchModel } from '../think-search-header/saved-search.model';
import { ModalModelOptions } from '../modals/modals.model';
import { ProjectUtils } from '../../pages/shared/project-utils';
import { BaseComponent } from '../../core/base/base.component';
import { SessionObject } from '../../pages/shared/session-object';
declare var $;

@Component({
    selector: 'app-think-search-footer',
    templateUrl: './think-search-footer.component.html',
    styleUrls: ['./think-search-footer.component.css']
})
export class ThinkSearchFooterComponent implements OnInit {
    mmOptionsSaveSearch: ModalModelOptions;
    @Input() form: any;
    @Input() baseComponent: BaseComponent;
    @Output() onSubmit = new EventEmitter<string>();
    @Output() onSaveSearch = new EventEmitter<string>();
    @Output() onReset = new EventEmitter<string>();
    @Output() extraSearch = new EventEmitter<string>();

    @Input() extraButton: string;


    sessionValue: SessionObject;
    saveDiasabledState = false;
    // @Input() limit: any;
    searchModel: any;
    @Input() validState: boolean;
    @Input() showLimit = true;

    validStateHtml: boolean

    // record: any;
    constructor() {
        this.doInitialSetup();
        console.log(this.mmOptionsSaveSearch);
        // limit=session

    }

    ngOnInit() {
        // console.log(this.baseComponent);
        this.searchModel = this.baseComponent.getSearchModel();
        this.sessionValue = SessionObject.getSessionObject();

        this.baseComponent.catchOnChangeOfSearchModel$.subscribe(
            data => {
                console.log('HRER************************************', data);
                this.searchModel = this.baseComponent.getSearchModel();
            });

        // setTimeout(() => {
        //     this.checkFormValidity();
        // }, 300);

    }

    //  ngOnChanges() {
    //   this.checkFormValidity();

    //  console.log(this.validState);

    //    }

    doInitialSetup() {
        this.mmOptionsSaveSearch = new ModalModelOptions();
        this.mmOptionsSaveSearch.id = 'searchFooter';
        this.mmOptionsSaveSearch.captionHeading = 'Save Search';
        this.mmOptionsSaveSearch.bodyMessage = 'Save As';
        this.mmOptionsSaveSearch.button1 = 'Cancel';
        this.mmOptionsSaveSearch.button2 = 'Save';
        this.mmOptionsSaveSearch.showInput = true;

    }

    // isformEmpty() {
    //     console.log(this.form.value);
    //     this.saveDiasabledState = true;
    //     Object.keys(this.form.value)
    //         .forEach((item) => {
    //             if (this.form.value[item]) {
    //                 this.saveDiasabledState = false;
    //                 return;
    //             }

    //         })
    // }



    onSave() {
        if (!this.baseComponent.isSearchModelEmpty()) {
            $('#searchFooter').modal('show');
            ProjectUtils.getFutureElement('saveAs', 100, 100)
                .subscribe((element) => {
                    element.setAttribute('maxlength', 20);
                })
        }


    }

    doOnSubmit() {
        // console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF  ', this.form.valid);
        if ((!ProjectUtils.isEmpty(this.form)) && (this.form.valid)) {
            // console.log('Submit');
            this.onSubmit.emit('');
        }
    }

    doOnSaveSearch(whichLabel: string) {
        // console.log(whichLabel);
        this.onSaveSearch.emit(whichLabel);
    }

    doOnReset() {

        console.log(typeof this.sessionValue.limit);
        //    this.searchModel = this.baseComponent.getSearchModel();
        this.searchModel.limit = parseInt(this.sessionValue.limit, 10);
        // this.sessionValue.limit;
        // console.log(this.form);
        setTimeout(() => {
            this.onReset.emit('');
            //    this.checkFormValidity();
        }, 100);

    }

    resetLimit() {
        this.searchModel = this.baseComponent.getSearchModel();
    }
    // checkFormValidity() {
    //     const f = document.forms['form'];
    //     this.validStateHtml = !f.checkValidity()
    // }
    onextraSearch() {
        this.extraSearch.emit();
    }

}
