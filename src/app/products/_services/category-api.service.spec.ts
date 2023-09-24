import { TestBed } from '@angular/core/testing';
import { CategoryApiService } from './category-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CategoryApiService', () => {
  let service: CategoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(CategoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
