import { Test, TestingModule } from '@nestjs/testing';
import { SearchEntriesController } from './search-entries.controller';

describe('SearchEntries Controller', () => {
  let controller: SearchEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchEntriesController],
    }).compile();

    controller = module.get<SearchEntriesController>(SearchEntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
