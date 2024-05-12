import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent, ThemeToggleComponent],
      imports: [TranslateModule.forRoot(), MatToolbarModule, MatIconModule],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should switch language between tr and en', () => {
    translateService.setDefaultLang('en');

    component.switchLanguage('tr');
    expect(translateService.currentLang).toEqual('tr');

    component.switchLanguage('en');
    expect(translateService.currentLang).toEqual('en');
  });
});
