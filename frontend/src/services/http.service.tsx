import { IBodySendImage, IImageSender, IResponseBody } from "./types.service";

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

async function getResponse(data: Response): Promise<IResponseBody> {
	if (data.ok) {
		return await data.json();
	} else {
		const errorData = await data.json();
		throw new Error(errorData?.error_description || data.statusText);
	}

}
