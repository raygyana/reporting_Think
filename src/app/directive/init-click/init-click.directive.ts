import { Directive, ElementRef, HostListener, Input, AfterContentInit } from '@angular/core';

@Directive({
      selector: '[init-click]',
})

export class InitClickDirective implements AfterContentInit {
      el: any;
      @Input() initClick: boolean;

      constructor(el: ElementRef) {
            this.el = el.nativeElement;
      }

      ngAfterContentInit() {
            if (this.initClick) {
                  setTimeout(() => {
                        this.el.click();
                  }, 500);
            }
      }

      // @HostListener('mouseenter') onMouseEnter() {
      //       this.el.click();
      // }

      // @HostListener('mouseleave') onMouseLeave() {
      //       this.highlight(null);
      // }

}
