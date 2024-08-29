import {
	Box,
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getGeminiAnswer } from "../services/http.service";
import { LoadingButton } from "@mui/lab";
import { IBodySendImage, IErrorValidation, IResponseBody } from "../services/types.service";
import { styled } from "@mui/material/styles";

import { CheckCircle, CloudUpload, Send } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

function GeminiAsk() {
	const [data, setData] = useState<IBodySendImage>({
		image: "",
		customer_code: "",
		measure_datetime: "",
		measure_type: "GAS",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [errorList, setErrors] = useState<IErrorValidation>({});
	const [response, setResponse] = useState<IResponseBody | null>(null)

	function validadeForm(): boolean {
		let errorList: IErrorValidation = {};
		if (!data.image) {
			errorList["image"] = "Imagem não selecionada!";
		}
		if (!data.customer_code) {
			errorList["customer_code"] = "Código do cliente não informado!";
		}
		if (!data.measure_type) {
			errorList["measure_type"] = "Tipo de medida não informada";
		}
		if (!data.measure_datetime) {
			errorList["measure_datetime"] = "Data da aferição não informada";
		}
		if (Object.getOwnPropertyNames(errorList).length) {
			setErrors(errorList);
			return false;
		}

		return true;
	}

	async function getAnswer(evt: React.FormEvent) {
		evt.preventDefault();
		setErrors({});
		setResponse(null)
		if (!validadeForm()) {
			return;
		}
		try {
			setLoading(true);
			const response = await getGeminiAnswer(data);
			setResponse(response)
		} catch (error: any) {
			setErrors({ pergunta: error.message });
		} finally {
			setLoading(false);
		}
	}

	function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files && e.target.files[0];
		const mimeType = file?.type;

		if (!file) return setData((last) => ({ ...last, image: "" }));
		let reader = new FileReader();

		reader.onloadend = function () {
			const image = String(reader.result).replace(
				`data:${mimeType};base64,`,
				""
			);
			setData((last) => ({ ...last, image }));
		};
		reader.readAsDataURL(file!);
	}
	useEffect(() => {
		setErrors({});
	}, [data]);

	return (
		<Container maxWidth="sm">
			<h1>Desafio da Shopper.com.br </h1>
			<form onSubmit={getAnswer}>
				<Box
					width={"100%"}
					display={"flex"}
					flexDirection={"column"}
					justifyContent={"space-between"}
					flexWrap={"wrap"}
				>
					<TextField
						label="Customer Code"
						variant="outlined"
						size="small"
						style={{ marginBottom: "25px" }}
						onChange={(e) =>
							setData((last) => ({ ...last, customer_code: e.target.value }))
						}
						fullWidth
						error={!!errorList["customer_code"]}
						helperText={errorList["customer_code"]}
					/>
					<Box display={"flex"} justifyContent={"space-between"}>
						<TextField
							label="Measure Datetime"
							variant="outlined"
							size="small"
							style={{ marginBottom: "25px", width: "80%" }}
							value={data.measure_datetime}
							onChange={(e) =>
								setData((last) => ({
									...last,
									measure_datetime: e.target.value,
								}))
							}
							error={!!errorList["measure_datetime"]}
							helperText={errorList["measure_datetime"]}
						/>
						<Button
							variant="contained"
							color="primary"
							size="small"
							style={{ marginBottom: "25px" }}
							onClick={() =>
								setData((last) => ({
									...last,
									measure_datetime: new Date().toISOString(),
								}))
							}
						>
							Agora
						</Button>
					</Box>
					<FormControl fullWidth style={{ marginBottom: "25px" }}>
						<InputLabel id="demo-simple-select-label">Measure Type</InputLabel>
						<Select
							value={data.measure_type}
							label="Measure Type"
							onChange={(evt) => {
								setData((last) => ({
									...last,
									measure_type: evt.target.value as "WATER" | "GAS",
								}));
							}}
							size="small"
						>
							<MenuItem value={"GAS"}>GÁS</MenuItem>
							<MenuItem value={"WATER"}>WATER</MenuItem>
						</Select>
					</FormControl>
					<Button
						component="label"
						role={undefined}
						variant="contained"
						tabIndex={-1}
						endIcon={<CloudUpload />}
						style={{ marginBottom: "15px" }}
						fullWidth
					>
						Selecionar Imagem
						<VisuallyHiddenInput type="file" onChange={onChangeFile} />
					</Button>
					<LoadingButton
						fullWidth
						loading={loading}
						variant="contained"
						tabIndex={-1}
						endIcon={<Send />}
						style={{ marginBottom: "15px" }}
						type="submit"
					>
						Enviar
					</LoadingButton>
				</Box>
				{errorList?.pergunta && (
					<div
						style={{
							backgroundColor: "rgb(253, 236, 234)",
							borderRadius: "4px",
							padding: "16px",
							marginBlock: "16px",
						}}
					>
						{errorList["pergunta"]}
					</div>
				)}
				{!!errorList["image"] && (
					<div
						style={{
							textAlign: "center",
							backgroundColor: "#ff9393",
							padding: "10px",
							color: "white",
						}}
					>
						Nenhuma Imagem selecionada
					</div>
				)}
				{!!data.image && (
					<div style={{ textAlign: "center" }}>
						Imagem selecionada <CheckCircle />
					</div>
				)}
				<h4 style={{ textAlign: "center" }}>Resposta da IA</h4>
				{response && <pre>{JSON.stringify(response, null, 2)}</pre>}
				{/* <textarea
					className={`${data.resposta.length ? "anim-typewriter" : ""}`}
					style={{ width: "100%", resize: "none" }}
					rows={20}
					disabled
					value={data.resposta}
				></textarea> */}
			</form>
		</Container>
	);
}

export default GeminiAsk;
