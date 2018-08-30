/**
 * A single tab page. It renders the passed template
 * via the @Input properties by using the ngTemplateOutlet
 * and ngTemplateOutletContext directives.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-tab',
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
      <ng-container *ngIf="template"
        [ngTemplateOutlet]="template"
        [ngTemplateOutletContext]="{ person: dataContext }"
      >
      </ng-container>
    </div>
  `
})
export class TabComponent {
  @Input('tabId') tabId: string;
  @Input('tabTitle') title: string;
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template;
  @Input() dataContext;
  @Input() disabled = false;

  ngOnInit() {
    console.log('TabComponent', 'ngOnInit', this.tabId);
    if (this.tabId === undefined) {
      throw new Error('Tabs must have a "tabId" attribute.');
    }
  }



}
