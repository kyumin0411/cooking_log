import { Module } from '@nestjs/common';
import { MenuController } from './menus.controller';
import { MenuService } from './menus.service';
import { RecipeModule } from 'src/Recipe/recipe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/entity';

@Module({
  imports: [RecipeModule, TypeOrmModule.forFeature([Menu])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuModule],
})
export class MenuModule {}
