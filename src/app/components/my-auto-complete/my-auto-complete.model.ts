import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../core';

export class MyAutoCompleteModel {
      public placeholder?: string;
      public minSearchLength?: number;
      public openOnFocus?: boolean;
      public autoHighlight?: boolean;
      public disableInput?: boolean;
      public textNoResults?: string;
      public textSearching?: string;
      public selectOnClick?: boolean;
      public initialValue?: string;
      public inputName?: string;      // name attribute of the input element.
      public url?: string;
      public body?: string | any; // post body
      public modelName: string;
      // api parameters
      public data: any[] | Observable<any[]>;
      public searchFields: string;
      public descriptionField?: string;
      baseComponent: BaseComponent;
      constructor() {
            this.placeholder = 'Search';
            this.minSearchLength = 0;
            this.openOnFocus = true;
            this.autoHighlight = false;
            this.disableInput = false;   // for disabled
            this.textNoResults = 'No results found!';
            this.textSearching = 'Searching...';
            this.selectOnClick = true;
      }
}



// Local data

// Create local data provider by calling CompleterService.local.

// Parameters

// Name	Type	Description	Required
// data	any[] | Observable<any[]>	A JSON array with the data to use or an Observable that emits one	Yes
// searchFields	string	Comma separated list of fields to search on. Fields may contain dots for nested attributes; if empty or null all data will be returned.	Yes
// titleField	string	Name of the field to use as title for the list item.	Yes
// Attributes

// Name	Type	Description
// descriptionField	string	Name of the field to use as description for the list item.
// imageField	string	Name of the field to use as image url for the list item.


