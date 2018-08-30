import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThinkComponent} from './think.component';

describe('ThinkComponent', () => {
    let component: ThinkComponent;
    let fixture: ComponentFixture<ThinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThinkComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
