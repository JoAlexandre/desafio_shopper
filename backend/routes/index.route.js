import express from "express";
import IndexController from "../controller/index.controller.js";
const app = express.Router()


app.get('/:customer_code/list', IndexController.getAllMeasuresByCustomer)
app.get('/', (req, res) => res.send('API Shooper.com.br is running...'))
app.post('/upload', IndexController.getGeminiAnswerFromImage)
app.patch('/confirm', IndexController.updateMeasure)
app.get('/image/:id', IndexController.getImageByMeasureId)



export default app