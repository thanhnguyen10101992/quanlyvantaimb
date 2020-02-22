import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlythuchiComponent } from './quanlythuchi.component';

describe('QuanlythuchiComponent', () => {
  let component: QuanlythuchiComponent;
  let fixture: ComponentFixture<QuanlythuchiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlythuchiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlythuchiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
