import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { ReactHTML, useCallback, useEffect, useState } from "react";
import { getMeasures } from "../services/http.service";
import { IMeasures } from "../services/types.service";
import { getPrettierDate } from "../services/date.service";

interface IFilters{
  measure_type: string, customer_code: string
}

export default function ListMeasures() {
  const [error, setError] = useState<string>('')
  const [filter, setFilters] = useState<IFilters>({ customer_code: 'default', measure_type: '' })
  const [measures, setMeasures] = useState<IMeasures[]>([])
  const getListMeasures = useCallback(async () => {
    try {
      const data = await getMeasures(filter.customer_code, filter.measure_type)
      console.log(data)
      setMeasures(data)
    } catch (error:any) {
      setError(error.message)
    }
  },[filter])

  function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault()
    setMeasures([])
    getListMeasures()
  }
  return (
    <>
      <h3>Listar Medidas (/customer_code/list?measure_type=WATER)</h3>
      <form onSubmit={onSubmitHandler}>
        <Box display={'flex'} justifyContent={'space-between'} marginBlock={'20px'}>
          <TextField
            label='Customer Code'
            value={filter?.customer_code}
            onChange={(evt) => {
              setFilters((last) => ({
                ...last,
                customer_code: evt.target.value ,
              }));
            }}
          />
          
          <FormControl style={{minWidth:'150px'}}>
            <InputLabel id="demo-simple-select-label">Measure Type</InputLabel>
            <Select
              // value={data.measure_type}
              label="Measure Type"
              onChange={(evt) => {
                setFilters((last) => ({
                  ...last,
                  measure_type: evt.target.value as string,
                }));
              }}
            >
              <MenuItem value={""}></MenuItem>
              <MenuItem value={"GAS"}>GÁS</MenuItem>
              <MenuItem value={"WATER"}>WATER</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">Pesquisar</Button>
        </Box>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Measure Uuid</TableCell>
              <TableCell>Datetime</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Has Confirmed</TableCell>
              <TableCell>Image Url</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {measures.map(i => {
              return (
                <TableRow key={i.measure_uuid}>
                  <TableCell>{i.measure_uuid}</TableCell>
                  <TableCell>{getPrettierDate(i.measure_datetime)}</TableCell>
                  <TableCell>{i.measure_type}</TableCell>
                  <TableCell>{i.has_confirmed ? 'Sim' : "Não"}</TableCell>
                  <TableCell>
                    <a href={i.image_url} target="_blank">Link</a>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {!!error
        &&
        <Box marginBlock={'10px'} padding={'20px'} style={{backgroundColor:'#ff242450'}}>Nenhuma Leitura Encontrada para o usuario especificado: '{filter?.customer_code || 'default'}'</Box>}
    </>
  )
}