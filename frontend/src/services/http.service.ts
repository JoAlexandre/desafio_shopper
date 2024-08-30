import { IBodySendImage, IImageSender, IMeasures, IObjectResponse, IResponseBody, IUpdateMeasures } from "./types.service";

const BASE_URL = "http://localhost:3001";
export async function getGeminiAnswer(bodyRequest: IBodySendImage): Promise<IResponseBody> {
	try {
		const resp = await fetch(`${BASE_URL}/upload`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({  ...bodyRequest }),
		});
		const data  = await getResponse(resp); 
		return data;
	} catch (err) {
		console.dir(err)
		throw err;
	}
}
export async function getMeasures(customer_code: string, measure_type?:string): Promise<IMeasures[]> {
	try {
		let url = `${BASE_URL}/${customer_code}/list`
		if (!!measure_type) {
			url+=`?measure_type=${measure_type}`
		}
		const resp = await fetch(url, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const {measures}  = await getResponseList(resp); 
		return measures;
	} catch (err) {
		throw err;
	}
}
export async function updateMeasure(props:IUpdateMeasures): Promise<IObjectResponse> {
	try {
		const resp = await fetch(`${BASE_URL}/confirm`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(props)
		});
		const  data = await getResponse(resp); 
		return data;
	} catch (err) {
		throw err;
	}
}

async function getResponse(data: Response): Promise<IResponseBody & IObjectResponse> {
	if (data.ok) {
		return await data.json();
	} else {
		const errorData = await data.json();
		throw new Error(errorData?.error_description || data.statusText);
	}
}
async function getResponseList(data: Response): Promise<any> {
	if (data.ok) {
		return await data.json();
	} else {
		const errorData = await data.json();
		throw new Error(errorData?.error_description || data.statusText);
	}
}
