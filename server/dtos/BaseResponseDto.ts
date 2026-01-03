export default interface BaseResponseDto {
	status: number;
	statusMessage?: string;
	cause?: ErrorDto[];
	data?: any;
}

export interface ErrorDto {
	field: string;
	message: string;
}
