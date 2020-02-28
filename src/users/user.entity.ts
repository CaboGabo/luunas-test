import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRO } from './user.dto';
import { ProductEntity } from 'src/products/product.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column('text')
  password: string;

  @Column({
    default: true,
  })
  active: boolean;

  @OneToMany(
    type => ProductEntity,
    product => product.savedBy,
  )
  products: ProductEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(): UserRO {
    const { id, created, email, firstname, lastname, active } = this;
    return {
      id,
      created,
      email,
      firstname,
      lastname,
      active,
    };
  }
}
