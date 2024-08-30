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
export interface IMeasures {
	measure_uuid: string,
	measure_datetime: string,
	measure_type: string,
	has_confirmed: boolean,
	image_url: string,
}

export interface IImageSender {
	data: string;
	mimeType: string;
}
export interface IObjectResponse {
	[field: string]: string | number | boolean;
}


export interface IUpdateMeasures{
  confirmed_value: string, measure_uuid: string
}