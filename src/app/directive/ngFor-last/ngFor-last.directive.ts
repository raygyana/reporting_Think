import {
      Directive, ElementRef, HostListener,
      Input, AfterContentInit, EventEmitter,
      Output
} from '@angular/core';

@Directive({
      selector: '[ready]',
})

export class NgForReadyDirective implements AfterContentInit {
      el: any;
      @Input() ready: boolean;

      @Output() iMReady = new EventEmitter();

      constructor(el: ElementRef) {
            this.el = el.nativeElement;

      }

      ngAfterContentInit() {
            if (this.ready === true) {
                  this.iMReady.emit();
            }

      }

      // @HostListener('mouseenter') onMouseEnter() {
      //       this.el.click();
      // }

      // @HostListener('mouseleave') onMouseLeave() {
      //       this.highlight(null);
      // }

}
