export interface IErrorValidation {
	[field: string]: string;
}
export interface IResponseBody {
	image_url: string;
	measure_value: number;
	measure_uuid: string;
}

export interface IBodySendImage {
	image: string;
	customer_code: string;
	measure_datetime: string;
	measure_type: "WATER" | "GAS";
}

export interface IImageSender {
	data: string;
	mimeType: string;
}
