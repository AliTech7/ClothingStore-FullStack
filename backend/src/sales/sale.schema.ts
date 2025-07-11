import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SaleDocument = Sale & Document;

@Schema({ timestamps: true })
export class Sale {
    @Prop({ required: true })
    id!: string;

    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    price!: number;

    @Prop({ required: true })
    image!: string;

    @Prop({ required: true })
    quantity!: number;

    @Prop({ required: true })
    userId!: string;

}

export const SaleSchema = SchemaFactory.createForClass(Sale);
