import { Query, Resolver } from '@nestjs/graphql';
import { Menu } from './menu.entity';
import { MenuService } from './menu.service';

@Resolver(() => Menu)
export class MenuResolver {
  constructor(private menuService: MenuService) {}

  @Query(() => Menu)
  menu(): Promise<Menu[]> {
    return this.menuService.findAll();
  }
}
