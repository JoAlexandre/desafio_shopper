import GeminiRepository from "../repository/gemini.repository.js"
import ImageRepository from "../repository/image.repository.js"


async function getGeminiAnswerFromImage(body) {
  try {
    const measure_value = await GeminiRepository.getGeminiAnswerFromImage(body.image)
    await ImageRepository.getImageByValues({ ...body, measure_value: parseInt(measure_value) }) 
    return await ImageRepository.createImage({...body, measure_value}) 
  } catch (error) {
    console.dir(error)
    throw error
  }

}
async function getImageByMeasureId(measure_uuid) {
  try {
    return await ImageRepository.getImageByMeasureId(measure_uuid) 
  } catch (error) {
    throw error
  }

}
async function updateMeasure(imageData) {
  try {
    const imageFound = await ImageRepository.getImageByMeasureId(imageData.measure_uuid)
    if (!imageFound) throw new Error(JSON.stringify({ code: 404, error_code: 'MEASURE_NOT_FOUND', error_description: "Leitura do mês não encontrada!" }))
    if (imageFound?.has_confirmed) throw new Error(JSON.stringify({ code: 409, error_code: 'CONFIRMATION_DUPLICATE', error_description: "Leitura já confirmada" }))
    return await ImageRepository.updateMeasure(imageData)
  } catch (error) {
    throw error
  }

}
async function getAllMeasuresByCustomer(customer_code, measure_type) {
  try {
    let measures = []
    if (measure_type) {
      if (!['GAS', 'WATER'].includes(measure_type.toUpperCase())) throw new Error(JSON.stringify({ code: 400, error_code: 'INVALID_TYPE', error_description: "Tipo de medição não permitida!" }))
      measures = await ImageRepository.getAllMeasuresByCustomer(customer_code, measure_type.toUpperCase())
    } else {
      measures = await ImageRepository.getAllMeasuresByCustomer(customer_code)
    }
    if(!measures.length) throw new Error(JSON.stringify({ code: 404, error_code: 'MEASURES_NOT_FOUND', error_description: "Nenhuma leitura encontrada!" }))
    return {customer_code, measures}
  } catch (error) {
    throw error
  }
}

export default { getGeminiAnswerFromImage, getImageByMeasureId, updateMeasure, getAllMeasuresByCustomer}