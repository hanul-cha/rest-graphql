import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMenuInput } from './dto/create-menu.dto';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private MenusRepository: Repository<Menu>,
  ) {}

  async findAll(): Promise<Menu[]> {
    return this.MenusRepository.find();
  }

  createMenu(createMenuInput: createMenuInput): Promise<Menu> {
    const newMenu = this.MenusRepository.create(createMenuInput);

    return this.MenusRepository.save(newMenu);
  }
}
