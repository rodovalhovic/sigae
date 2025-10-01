import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanosMelhoriaComponent } from './planos-melhoria.component';

describe('PlanosMelhoriaComponent', () => {
  let component: PlanosMelhoriaComponent;
  let fixture: ComponentFixture<PlanosMelhoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanosMelhoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanosMelhoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
