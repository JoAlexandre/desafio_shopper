import { Op } from "sequelize";
import Image from "../models/image.model.js";
import db from "./db.js";
async function createImage(image) {
	try {
		const { measure_uuid, measure_value, image_url } = await Image.create(image, {
			returning: "*",
			raw: true,
		});
		return {
			image_url,
			measure_value,
			measure_uuid,
		};
	} catch (error) {
		throw error;
	}
}
async function getImageByMeasureId(measure_uuid) {
	try {
		const image = await Image.findByPk(measure_uuid);
		return image;
	} catch (error) {
		throw error;
	}
}
async function getImageByValues(imageParams) {
	const month = new Date(imageParams.measure_datetime).getMonth() + 1;

	try {
		const [[results]] = await db.query(`select 
      count(*) from public."Images"
      where extract( month from "createdAt") = ${month}
      and measure_value = '${imageParams.measure_value}'
      and measure_type = '${imageParams.measure_type}'
      and customer_code = '${imageParams.customer_code}'
      `);
		const { count } = results;
		if (count > 0)
			throw new Error(
				JSON.stringify({
					code: 409,
					error_code: "DOUBLE_REPORT",
					error_description: "Leitura do mês já realizada",
				})
			);
	} catch (error) {
		throw error;
	}
}

async function updateMeasure(imageData) {
	try {
		const image = await Image.update(
			{ measure_uuid: imageData.measure_uuid, has_confirmed: true },
			{
				where: {
					measure_uuid: imageData.measure_uuid,
				},
				raw: true,
			}
		);
		if (!image) return image;
	} catch (error) {
		throw error;
	}
}

async function getAllMeasuresByCustomer(customer_code, measure_type) {
	try {
		const images = Image.findAll({
			where: {
				customer_code, measure_type: {
					[Op.like]: `%${measure_type || ''}%` 
				}
			},
			attributes:['measure_uuid','measure_datetime','measure_type','has_confirmed','image_url'],
			raw: true
		})
		return images
	} catch (error) {
		throw error
	}
}
export default {
	createImage,
	getImageByMeasureId,
	getImageByValues,
	updateMeasure,
	getAllMeasuresByCustomer
};
