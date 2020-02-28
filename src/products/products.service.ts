import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { ProductRO, ProductDTO } from './product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private productToResponseObject(product: ProductEntity): ProductRO {
    const { id, created, name, price, brand, stock, code, active } = product;
    return {
      id,
      created,
      name,
      price,
      brand,
      stock,
      code,
      active,
    };
  }

  private ensureOwnership(product: ProductEntity, userId: string) {
    if (product.savedBy.id !== userId) {
      throw new HttpException(
        'You cannot modify this product',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async showAll(): Promise<ProductRO[]> {
    const products = await this.productRepository.find({
      where: { active: true },
    });
    return products.map(product => this.productToResponseObject(product));
  }

  async showByCode(code: string): Promise<ProductRO> {
    const product = await this.productRepository.findOne({
      where: { code, active: true },
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return this.productToResponseObject(product);
  }

  async create(id: string, data: ProductDTO): Promise<ProductRO> {
    const user = await this.userRepository.findOne({
      where: { id, active: true },
    });

    let product = await this.productRepository.findOne({
      where: { code: data.code },
      relations: ['savedBy'],
    });

    if (product && product.active) {
      throw new HttpException('Code already exists', HttpStatus.BAD_REQUEST);
    }

    if (product && !product.active) {
      await this.productRepository.update(
        { id: product.id },
        { ...data, savedBy: user },
      );

      product = await this.productRepository.findOne({
        where: { code: data.code, active: true },
      });

      return this.productToResponseObject(product);
    }

    product = await this.productRepository.create({ ...data, savedBy: user });
    await this.productRepository.save(product);
    return this.productToResponseObject(product);
  }

  async update(
    id: string,
    code: string,
    data: Partial<ProductDTO>,
  ): Promise<ProductRO> {
    let product = await this.productRepository.findOne({
      where: { code, active: true },
      relations: ['savedBy'],
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(product, id);

    await this.productRepository.update({ id: product.id }, data);
    product = await this.productRepository.findOne({
      where: { code, active: true },
    });

    return this.productToResponseObject(product);
  }

  async delete(id: string, code: string): Promise<any> {
    let product = await this.productRepository.findOne({
      where: { code, active: true },
      relations: ['savedBy'],
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(product, id);

    await this.productRepository.update({ id: product.id }, { active: false });
    return {
      deleted: true,
    };
  }
}
