import { User } from './user.entity'
import { getDataSourceToken } from '@nestjs/typeorm'
import { SourceToken } from 'src/utils/sourceToken'
import { DataSource, Repository } from 'typeorm'

export class UserRepository extends Repository<User> {
  testWithUser() {
    return this.find({
      where: {
        name: '차한울',
      },
    })
  }
}
export const userProvider = [
  {
    provide: SourceToken.User,
    useFactory: (dataSource: DataSource) => {
      const repository = dataSource.getRepository(User)
      return new UserRepository(
        repository.target,
        repository.manager,
        repository.queryRunner,
      )
    },
    inject: [getDataSourceToken()],
  },
]

//TODO
// 추상화 해서 전체로 뿌릴수 있을듯하다 데코레이터로 받아서 루프 돌려 등록해 보자
// 참고 링크: https://kscodebase.tistory.com/524
