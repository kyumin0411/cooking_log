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
      host: 'ls-539e41793572116e6b776d35ec616dca81943964.cy0ilphxuzkd.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'dbmasteruser',
      password: 'cookinglog123',
      database: 'dbmaster',
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
