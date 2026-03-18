import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateSupplierUseCase } from "../application/use-cases/create-supplier.use-case";
import { FindSupplierByBusinessIdUseCase } from "../application/use-cases/find-supplier-by-business-id.use-case";
import { CreatePurchaseOrderUseCase } from "../application/use-cases/create-purchase-order.use-case";
import { CreateSupplierRequestDto } from "../application/dto/create-supplier-request.dto";
import { CreatePurchaseOrderRequestDto } from "../application/dto/create-purchase-order-request.dto";

@ApiTags("suppliers")
@Controller("suppliers")
export class SuppliersController {
  constructor(
    private readonly createSupplierUseCase: CreateSupplierUseCase,
    private readonly findSupplierByBusinessIdUseCase: FindSupplierByBusinessIdUseCase,
    private readonly createPurchaseOrderUseCase: CreatePurchaseOrderUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: "Crear supplier (1:1 con business)" })
  @ApiResponse({ status: 201 })
  async create(@Body() dto: CreateSupplierRequestDto) {
    return this.createSupplierUseCase.execute({
      businessId: dto.businessId,
      bankAccount: dto.bankAccount ?? null,
    });
  }

  @Get("by-business/:businessId")
  @ApiOperation({ summary: "Obtener supplier por business_id" })
  async findByBusinessId(@Param("businessId") businessId: string) {
    const id = Number(businessId);
    return this.findSupplierByBusinessIdUseCase.execute(id);
  }

  @Post("purchase-orders")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Crear orden de compra" })
  async createPurchaseOrder(@Body() dto: CreatePurchaseOrderRequestDto) {
    return this.createPurchaseOrderUseCase.execute({
      userId: dto.userId,
      supplierId: dto.supplierId,
      amount: dto.amount,
      documentUrl: dto.documentUrl ?? null,
    });
  }
}
