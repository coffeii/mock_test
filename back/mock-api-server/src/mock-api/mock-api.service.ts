import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockApi } from './mock-api.entity';
import { log } from 'console';

@Injectable()
export class MockApiService {
  constructor(
    @InjectRepository(MockApi)
    private mockApiRepository: Repository<MockApi>,
  ) {}

  // 새로운 API 저장
  async create(mockApi: Partial<MockApi>): Promise<MockApi> {
    log("create", mockApi)
    return this.mockApiRepository.save(mockApi);
  }

  // 저장된 모든 API 조회
  async findAll(): Promise<MockApi[]> {
    return this.mockApiRepository.find();
  }

  // 특정 API 조회
  async findById(id: number): Promise<MockApi | null> {
    return this.mockApiRepository.findOneBy({ id });
  }

  // 특정 API 업데이트
  async update(id: number, data: Partial<MockApi>): Promise<void> {
    await this.mockApiRepository.update(id, data);
  }

  // 특정 API 삭제
  async delete(id: number): Promise<void> {
    await this.mockApiRepository.delete(id);
  }

  // 특정 요청과 매칭되는 API 찾기
  async findByRequest(method: string, endpoint: string): Promise<MockApi | null> {
    return this.mockApiRepository.findOneBy({ method, endpoint });
  }
}
