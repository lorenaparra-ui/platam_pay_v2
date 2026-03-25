import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SignatureReplacementInput {
  @ApiProperty({
    description: "Texto placeholder a reemplazar en la plantilla.",
    example: "NOMBRE COMPLETO",
  })
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty({
    description: "Valor final que reemplaza el placeholder.",
    example: "FREDDY CANDELO",
  })
  @IsString()
  to: string;
}

export class CreateContractFromApprovalInput {
  @ApiProperty({ description: "ID interno del usuario solicitante.", example: 1001 })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: "ID interno de la solicitud de credito.",
    example: 3911,
  })
  @IsNumber()
  applicationId: number;

  @ApiProperty({ description: "ID interno de la persona firmante.", example: 2204 })
  @IsNumber()
  personId: number;

  @ApiProperty({
    description: "status_id tecnico para contratos en estado pendiente.",
    example: 25,
  })
  @IsNumber()
  contractPendingStatusId: number;

  @ApiProperty({
    description: "status_id tecnico para firmante en estado pendiente.",
    example: 16,
  })
  @IsNumber()
  signerPendingStatusId: number;

  @ApiProperty({
    description: "Template ID configurado en proveedor de firma.",
    example: "e59a30f8-bf2a-45ef-bcb7-91d38558c24b",
  })
  @IsString()
  @IsNotEmpty()
  templateId: string;

  @ApiProperty({ description: "Carpeta del proveedor de firma.", example: "platam_pay" })
  @IsString()
  @IsNotEmpty()
  folderPath: string;

  @ApiProperty({ description: "Modo sandbox del proveedor.", example: true })
  @IsBoolean()
  sandbox: boolean;

  @ApiProperty({ description: "Nombre completo del firmante.", example: "FREDDY CANDELO" })
  @IsString()
  signerName: string;

  @ApiProperty({ description: "Correo del firmante.", example: "freddy@platam.co" })
  @IsString()
  signerEmail: string;

  @ApiProperty({ description: "Codigo de pais telefonico.", example: "57" })
  @IsString()
  signerPhoneCountry: string;

  @ApiProperty({ description: "Numero celular del firmante.", example: "3105003975" })
  @IsString()
  signerPhoneNumber: string;

  @ApiPropertyOptional({
    description: "Lista de reemplazos de placeholders para plantilla.",
    type: SignatureReplacementInput,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SignatureReplacementInput)
  replacements?: SignatureReplacementInput[];

  @ApiPropertyOptional({
    description:
      "Mapa dinamico clave-valor para variables de plantilla. Se normaliza automaticamente (tildes, mayusculas/minusculas, espacios y underscores).",
    type: Object,
    example: {
      p_id: "3911",
      NOMBRES: "FREDDY",
      APELLIDOS: "CANDELO",
      "TIPO DE DOCUMENTO": "CC",
      "NÚMERO DE DOCUMENTO": "1111111111",
      "CORREO ELECTRÓNICO": "freddy@platam.co",
      CELULAR: "3105003975",
    },
  })
  @IsOptional()
  @IsObject()
  templateData?: Record<string, string | number | boolean>;
}
