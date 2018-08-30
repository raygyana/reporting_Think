import { NgModule } from '@angular/core';
import { InitClickDirective } from './init-click';
import { NgForReadyDirective } from './ngFor-last';
// import { LimitStringDirective } from './limit-string';
import { CommonModule } from '@angular/common';
@NgModule({
      imports: [
            CommonModule
      ],
      declarations: [
            // LimitStringDirective,
            NgForReadyDirective,
            InitClickDirective]
      ,
      exports: [
            // LimitStringDirective,
            NgForReadyDirective,
            InitClickDirective
      ]
})

export class CommonDirectiveModlue {
}
