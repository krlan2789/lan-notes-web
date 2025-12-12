export default interface BaseResponseDto {
    statusCode: number;
    statusMessage?: string;
    errors?: ErrorDto[];
    data?: any;
}

export interface ErrorDto {
    field: string;
    message: string;
}