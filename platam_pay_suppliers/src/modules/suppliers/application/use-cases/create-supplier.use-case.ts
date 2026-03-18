import { Inject, Injectable } from "@nestjs/common";
import type {
  CreateSupplierPayload,
  SupplierRepositoryPort,
} from "../../domain/ports/supplier.repository.port";
import { SUPPLIER_REPOSITORY } from "../../domain/ports/supplier.repository.port";
import { Supplier } from "../../domain/models/supplier.model";

@Injectable()
export class CreateSupplierUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly repository: SupplierRepositoryPort
  ) {}

  async execute(payload: CreateSupplierPayload): Promise<Supplier> {
    return this.repository.create(payload);
  }
}
