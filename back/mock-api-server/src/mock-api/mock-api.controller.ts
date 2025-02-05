import { Controller, Get, Post, Put, Delete, Param, Body, Req, Res, All } from '@nestjs/common';
import { MockApiService } from './mock-api.service';
import { MockApi } from './mock-api.entity';
import { Request, Response } from 'express';

@Controller('mock-api')
export class MockApiController {
  constructor(private readonly mockApiService: MockApiService) {}

  @Post()
  async create(@Body() mockApi: Partial<MockApi>) {
    console.log('Request Body:', mockApi); // 요청 데이터 확인
    return this.mockApiService.create(mockApi);
  }

  @Get()
  async findAll() {
    return this.mockApiService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.mockApiService.findById(+id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<MockApi>) {
    await this.mockApiService.update(+id, data);
    return { message: 'Updated successfully' };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.mockApiService.delete(+id);
    return { message: 'Deleted successfully' };
  }

  // 모든 요청 처리
  @All('*')
  async handleRequest(@Req() req: Request, @Res() res: Response) {
    const { method, originalUrl } = req;
    console.log('Request Method:', method);
    console.log('Request URL:', originalUrl);

    // 요청 URL과 메서드에 맞는 API 찾기
    const mockApi = await this.mockApiService.findByRequest(method, originalUrl);
    if (mockApi) {
      res.json(JSON.parse(mockApi.response)); // 저장된 응답 반환
    } else {
      res.status(404).json({ message: 'API not found' });
    }
  }
}

@Controller('testing') // 기본 경로로 설정
export class TestApiController {
  constructor(private readonly mockApiService: MockApiService) {}

  @All('*')
  async handleRequest(@Req() req: Request, @Res() res: Response) {
    const { method, originalUrl } = req;

    const mockApi = await this.mockApiService.findByRequest(method, originalUrl);
    if (mockApi) {
      res.json(JSON.parse(mockApi.response));
    } else {
      res.status(404).json({ message: 'API not found' });
    }
  }
}
