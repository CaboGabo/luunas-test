import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { ProductEntity } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProductEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
