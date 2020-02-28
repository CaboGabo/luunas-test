import {
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  Body,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ValidationPipe } from '../shared/validation.pipe';
import { User } from 'src/users/user.decorator';
import { ProductDTO } from './product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('products')
  showAllProducts() {
    return this.productsService.showAll();
  }

  @Get('products/:code')
  showByCode(@Param('code') code: string) {
    return this.productsService.showByCode(code);
  }

  @Post('products')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  create(@User('id') id: string, @Body() data: ProductDTO) {
    return this.productsService.create(id, data);
  }

  @Put('products/:code')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  update(
    @Param('code') code: string,
    @User('id') id: string,
    @Body() data: Partial<ProductDTO>,
  ) {
    return this.productsService.update(id, code, data);
  }

  @Delete('products/:code')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  delete(@Param('code') code: string, @User('id') id: string) {
    return this.productsService.delete(id, code);
  }
}
