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
  @Column({ type: String })
  name: string;

  @Field(() => String)
  @Column({ type: String, default: null })
  address: string;

  @Column({
    type: 'json',
    default: null,
  })
  roles?: AuthRole[] | null;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    readonly: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: number;

  @Column({
    type: 'timestamp',
    name: 'update_at',
    readonly: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: number;
}
