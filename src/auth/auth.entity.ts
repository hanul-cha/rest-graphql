import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuthRole } from './dto/auth-role.dto';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column({ type: String, name: 'user_id' })
  userId: string;

  @Field(() => String)
  @Column({ type: String })
  password: string;

  @Field(() => String)
  @Column({ type: String, default: () => '(이름없음)' })
  name: string;

  @Field(() => String)
  @Column({ type: String, default: null })
  address: string;

  @Field(() => [AuthRole])
  @Column({ type: 'json', default: [AuthRole.ADMIN_GUEST] })
  roles!: AuthRole[] | null;
}
