import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column()
  name: string;

  @Column('double')
  price: number;

  @Column()
  brand: string;

  @Column('integer')
  stock: number;

  @Column({
    type: 'char',
    length: 6,
    unique: true,
  })
  code: string;

  @Column({
    default: true,
  })
  active: boolean;

  @ManyToOne(
    type => UserEntity,
    user => user.products,
  )
  savedBy: UserEntity;
}
