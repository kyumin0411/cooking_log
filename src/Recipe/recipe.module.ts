import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu, Recipe } from 'src/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Menu])],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeModule, RecipeService],
})
export class RecipeModule {}
