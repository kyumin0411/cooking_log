import { Module } from '@nestjs/common';
import { MenuController } from './menus.controller';
import { MenuService } from './menus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu, Recipe } from 'src/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Recipe])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuModule],
})
export class MenuModule {}
