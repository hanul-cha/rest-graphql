import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateMenuInput } from './dto/create-menu.dto'
import { Menu } from './menu.entity'
import { MenuService } from './menu.service'

@Resolver(() => Menu)
export class MenuResolver {
  constructor(private menuService: MenuService) {}

  @Query(() => [Menu])
  menu(): Promise<Menu[]> {
    return this.menuService.findAll()
  }

  @Mutation(() => Menu)
  createMenu(
    @Args('createMenuInput') createMenuInput: CreateMenuInput,
  ): Promise<Menu> {
    return this.menuService.createMenu(createMenuInput)
  }
}
