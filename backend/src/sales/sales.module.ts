import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale, SaleSchema } from "./sale.schema";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }])
  ],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}
