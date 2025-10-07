import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarPessoasComponent } from './adicionar-pessoas.component';

describe('AdicionarPessoasComponent', () => {
  let component: AdicionarPessoasComponent;
  let fixture: ComponentFixture<AdicionarPessoasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarPessoasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
