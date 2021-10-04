import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowColumTableComponent } from './show-colum-table.component';

describe('ShowColumTableComponent', () => {
  let component: ShowColumTableComponent;
  let fixture: ComponentFixture<ShowColumTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowColumTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowColumTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
