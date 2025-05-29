import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.resolver';

@Module({
  controllers: [CategoriesController]
})
export class CategoriesModule {}
