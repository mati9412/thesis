import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTubesComponent } from './test-tubes.component';

describe('TestTubesComponent', () => {
  let component: TestTubesComponent;
  let fixture: ComponentFixture<TestTubesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTubesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
