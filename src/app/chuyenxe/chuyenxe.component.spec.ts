import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuyenxeComponent } from './chuyenxe.component';

describe('ChuyenxeComponent', () => {
  let component: ChuyenxeComponent;
  let fixture: ComponentFixture<ChuyenxeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChuyenxeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuyenxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
