import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqBookComponent } from './req-book.component';

describe('ReqBookComponent', () => {
  let component: ReqBookComponent;
  let fixture: ComponentFixture<ReqBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReqBookComponent]
    });
    fixture = TestBed.createComponent(ReqBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
