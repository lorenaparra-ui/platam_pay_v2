import { Injectable } from "@nestjs/common";
import type { SupplierRepositoryPort } from "../../domain/ports/supplier.repository.port";
import { SUPPLIER_REPOSITORY } from "../../domain/ports/supplier.repository.port";
import { Inject } from "@nestjs/common";
import { Supplier } from "../../domain/models/supplier.model";

@Injectable()
export class FindSupplierByBusinessIdUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly repository: SupplierRepositoryPort
  ) {}

  async execute(businessId: number): Promise<Supplier | null> {
    return this.repository.findByBusinessId(businessId);
  }
}
