import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu, Recipe } from 'src/entity';
import { MenuModule } from 'src/Menu/menus.module';
import { RecipeModule } from 'src/Recipe/recipe.module';

@Module({
  imports: [
    MenuModule,
    RecipeModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'alticast#',
      database: 'CookingLog',
      entities: [Menu, Recipe],
      migrations: ['migrations/*{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
