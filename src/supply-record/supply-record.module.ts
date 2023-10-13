import { Module } from '@nestjs/common';
import { SupplyRecordService } from './supply-record.service';
import { DatabaseModule } from '../database/database.module';
import { SupplyRecord } from './supply-record.entity';

@Module({
  imports: [DatabaseModule],
  providers: [SupplyRecordService, {
    provide: 'SupplyRecordRepository',
    useValue: SupplyRecord
  }],
  exports: [SupplyRecordService]
})
export class SupplyRecordModule { }