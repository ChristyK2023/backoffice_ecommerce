import { TestBed } from '@angular/core/testing';

import { WebNotificationService } from './web-notification.service';

describe('WebNotificationService', () => {
  let service: WebNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
