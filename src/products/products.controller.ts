import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
//Build API follow comoon rules when add new item resource on server use Post Request
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  //add new product
  //manage incoming post request
  //inject service to use it
  //readonly never replace productservice with new value
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  //function body and return type
  //data comes from using @Body
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    //where does the data come from (title,desc,price) and we get it from the incoming request @Post() should have data
    //attached to it
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    //returning object
    return { id: generatedId };
  }

  //Get all of our Data
  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }
  //Get a single product by id
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }
  //Patch merges changes
  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return null;
  }
  //Delete product
  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
