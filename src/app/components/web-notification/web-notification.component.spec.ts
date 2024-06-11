import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebNotificationComponent } from './web-notification.component';

describe('WebNotificationComponent', () => {
  let component: WebNotificationComponent;
  let fixture: ComponentFixture<WebNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
