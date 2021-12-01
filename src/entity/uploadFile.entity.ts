import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('uploadFile')
export class UploadFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  originalName: string;
  @Column()
  encoding: string;
  @Column()
  mimeType: string;
  @Column('decimal', { precision: 10, scale: 2 })
  size: number;
  @Column({ comment: 's3에 업로드된 location url' })
  url: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
