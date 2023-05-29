import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsFinderComponent } from './tests-finder.component';

describe('TestsFinderComponent', () => {
  let component: TestsFinderComponent;
  let fixture: ComponentFixture<TestsFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestsFinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestsFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
