import { Injectable } from '@nestjs/common';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
  async getByIdMenu(): Promise<Menu> {
    const menu = new Menu();
    menu.id = 1;
    menu.title = '푸퐁팟커리';

    return menu;
  }
}
