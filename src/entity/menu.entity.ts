import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/entity/user.entity';
@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne((type) => User, (user) => user.userId)
  user: User;
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
