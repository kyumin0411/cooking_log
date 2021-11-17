import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
  @Column()
  title: string;
  @Column()
  image: string;
  @Column()
  difficulty: number;
  @Column({ default: false })
  bookmark: boolean;
  @Column()
  ingredients: string;
}
