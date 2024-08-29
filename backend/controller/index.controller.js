import isBase64 from "is-base64";
import IndexService from "../service/index.service.js";

async function getGeminiAnswerFromImage(req, res, next) {
	const { body } = req;
	try {
		if (!body.image || !body.customer_code || !body.measure_datetime || !body.measure_type)
				throw new Error(JSON.stringify({ code: 400, error_code: 'INVALID_DATA', error_description: "Image, Custumer_code, measure_datetime ou measure_type não informadas" }))
		if (!isBase64(body.image)) throw new Error ("A imagem fornecida não é do tipo base64!")
		res.send(await IndexService.getGeminiAnswerFromImage(body));
		delete body.image
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify({body})}`);
	} catch (error) {
		const {error_code, error_description, code} = JSON.parse(error.message)
		res.status(code).json({ error_code, error_description })
		next(error)
	}
}

async function getImageByMeasureId(req, res, next) {
	const { params } = req;
	try {
		if(!params.id) throw new Error(JSON.stringify({ code: 400, error_code: 'INVALID_DATA', error_description: "measure_id não informado corretamente!" }))
		res.send(await IndexService.getImageByMeasureId(params.id));
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${params.id}`);
	} catch (error) {
		const {error_code, error_description, code} = JSON.parse(error.message)
		res.status(code).json({ error_code, error_description })
		next(error)
	}
	
}
async function updateMeasure(req, res, next) {
	const { body } = req;
	try {
		if(!body.measure_uuid || body.confirmed_value == null ) throw new Error(JSON.stringify({ code: 400, error_code: 'INVALID_DATA', error_description: "measure_uuid ou confirmed_value não informado corretamente!" }))
		
		await IndexService.updateMeasure(body)
		res.status(200).json({ success: true });
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify(body)}`);
	} catch (error) {
		const {error_code, error_description, code} = JSON.parse(error.message)
		res.status(code).json({ error_code, error_description })
		next(error)
	}
	
}
async function getAllMeasuresByCustomer(req, res, next) {
	const { params, query } = req;
	try {
		res.status(200).json(await IndexService.getAllMeasuresByCustomer(params.customer_code, query.measure_type));
		global.logger.info(`${req.method.toUpperCase()} ${req.originalUrl} - ${JSON.stringify({params, query})}`);
	} catch (error) {
		const {error_code, error_description, code} = JSON.parse(error.message)
		res.status(code).json({ error_code, error_description })
		next(error)
	}
	
}

export default { getGeminiAnswerFromImage, getImageByMeasureId, updateMeasure, getAllMeasuresByCustomer };
