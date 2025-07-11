import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Sale, SaleDocument } from "./sale.schema";

@Injectable()
export class SalesService {
    constructor(
        @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
    ) { }

    async createMany(sales: Sale[]): Promise<Sale[]> {
        return this.saleModel.insertMany(sales);
    }

    async findAll(): Promise<Sale[]> {
        return this.saleModel.find().exec();
    }

    async findByUser(userId: string): Promise<Sale[]> {
        return this.saleModel.find({ userId }).exec()
    }
}
