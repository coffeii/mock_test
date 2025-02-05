import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MockApi {
  @PrimaryGeneratedColumn()
  id: number; // 고유 식별자

  @Column({ nullable: false })
  endpoint: string; // API 경로 (예: /test-api)

  @Column()
  method: string; // HTTP 메서드 (예: GET, POST 등)

  @Column('text')
  response: string; // 응답 데이터 (JSON 문자열)

  @Column({ nullable: true })
  description?: string; // API 설명 (선택 항목)

  @Column({ default: new Date().toISOString() })
  createdAt: string; // 생성 시간
}
