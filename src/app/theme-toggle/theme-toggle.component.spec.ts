import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../services/theme/theme.service';
import { ThemeToggleComponent } from './theme-toggle.component';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    themeServiceSpy = jasmine.createSpyObj('ThemeService', ['isDarkMode']);
    themeServiceSpy.isDarkMode.and.returnValue(true);

    await TestBed.configureTestingModule({
      declarations: [ThemeToggleComponent],
      imports: [MatIconModule],
      providers: [{ provide: ThemeService, useValue: themeServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dark mode correctly', () => {
    expect(component.isDarkMode).toBeTrue();
  });
});
