import { Body, Controller, Get, Post, Query, UnauthorizedException } from "@nestjs/common";
import { SalesService } from "./sales.service";
import { Sale } from "./sale.schema";

@Controller("sales")
export class SalesController {
    constructor(private readonly salesService: SalesService) { }

    @Post()
    async create(@Body() sales: Sale[]) {
        const created = await this.salesService.createMany(sales)
        return {
            message: "Sales saved successfully!",
            count: created.length,
        }
    }

    @Get()
    async getAll(
        @Query("admin_token") token?: string,
        @Query("userId") userId?: string
    ): Promise<Sale[]> {

        if (token && token === process.env.ADMIN_TOKEN) {
            return this.salesService.findAll()
        }

        if (userId) {
            return this.salesService.findByUser(userId)
        }

        throw new UnauthorizedException("Invalid token or userId missing.")
    }
}
