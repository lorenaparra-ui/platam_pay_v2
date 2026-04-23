/** Subconjunto de campos usados del archivo subido (sin depender del namespace Express). */
export type UploadedMultipartFile = Readonly<{
  originalname: string;
  mimetype: string;
  size: number;
  buffer?: Buffer;
}>;
