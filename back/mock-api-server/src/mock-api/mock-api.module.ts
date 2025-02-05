import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockApiService } from './mock-api.service';
import { MockApiController } from './mock-api.controller';
import { MockApi } from './mock-api.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MockApi])],
  providers: [MockApiService],
  controllers: [MockApiController],
})
export class MockApiModule {}
