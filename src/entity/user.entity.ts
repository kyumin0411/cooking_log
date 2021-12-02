import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;
  @Column()
  userName: string;
  @Column()
  password: string;
  // @Column()
  // role: string;
}
