import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;
  @PrimaryGeneratedColumn()
  seq: number;
  @Column()
  userName: string;
  @Column()
  password: string;
  // @Column()
  // role: string;
}
