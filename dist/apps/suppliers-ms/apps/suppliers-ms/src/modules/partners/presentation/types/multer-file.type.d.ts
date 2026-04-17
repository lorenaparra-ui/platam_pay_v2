export type UploadedMultipartFile = Readonly<{
    originalname: string;
    mimetype: string;
    size: number;
    buffer?: Buffer;
}>;
