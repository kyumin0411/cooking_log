import { Menu } from 'src/entity/menu.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne((type) => Menu, (menu) => menu.id)
  menu: Menu;
  @Column()
  description: string;
  @Column()
  image: string;
}
