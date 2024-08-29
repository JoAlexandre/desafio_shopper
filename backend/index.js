import express from "express";
import winston from "winston";
import indexRoute from "./routes/index.route.js";
import db from "./repository/db.js";
const app = express();
const PORT = process.env.PORT
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

//logger
const { combine, timestamp, label, printf } = winston.format;

function getCurrentDate() {
	return new Date().toLocaleString("pt-br");
}
const myFormat = printf(({ level, message, label, timestamp }) => {
	const json = {
		localTimeStamp: getCurrentDate(),
		timestamp,
		level,
		label,
		message,
	};
	return JSON.stringify(json);
});

global.logger = winston.createLogger({
	level: "silly",
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "gemini-api.log" }),
	],
	format: combine(label({ label: "gemini-api" }), timestamp(), myFormat),
});

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTONS");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

app.use("/", indexRoute);

app.use((error, req, res, next) => {
	global.logger.error(
		`${req.method.toUpperCase()} ${req.originalUrl} - ${error}`
	);
	res.end()
});

app.listen(PORT, async() => {
	await db.sync(/* {force: true} */);
	console.log(`Shopper API is running on ${PORT}...`);
});
