import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuResolver } from './menu.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  providers: [MenuService, MenuResolver],
})
export class MenuModule {}
