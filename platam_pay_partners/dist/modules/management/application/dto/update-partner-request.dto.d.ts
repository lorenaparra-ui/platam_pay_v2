import { CreatePartnerRequestDto } from "./create-partner-request.dto";
declare const UpdatePartnerRequestDto_base: import("@nestjs/common").Type<Partial<Omit<CreatePartnerRequestDto, "categories" | "defaultCategoryIndex">>>;
export declare class UpdatePartnerRequestDto extends UpdatePartnerRequestDto_base {
}
export {};
