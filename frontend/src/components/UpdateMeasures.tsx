import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { ReactHTML, useCallback, useEffect, useState } from "react";
import { getMeasures, updateMeasure } from "../services/http.service";
import { IMeasures, IObjectResponse, IUpdateMeasures } from "../services/types.service";
import { getPrettierDate } from "../services/date.service";


export default function UpdateMeasures() {
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<IObjectResponse | null>(null)
  const [filter, setFilters] = useState<IUpdateMeasures>({ measure_uuid: '', confirmed_value: '' })
  const [measures, setMeasures] = useState<IMeasures[]>([])
  const updateMeasures = useCallback(async () => {
    try {
      const data = await updateMeasure(filter)
      setSuccess(data)
    } catch (error: any) {
      console.log(error)
      setError(error.message)
    }
  },[filter])

  function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault()
    setMeasures([])
    setError('')
    setSuccess(null)
    updateMeasures()
  }
  return (
    <>
      <h3>Confirmar Medidas (/confirm)</h3>
      <form onSubmit={onSubmitHandler}>
        <Box display={'flex'} flexDirection={'column'} marginBlock={'20px'}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <TextField
              label='Measure UUID'
              value={filter?.measure_uuid}
              style={{marginBottom:'15px', width:'350px'}}
              onChange={(evt) => {
                setFilters((last) => ({
                  ...last,
                  measure_uuid: evt.target.value ,
                }));
              }}
            />
            <TextField
              label='Value'
              value={filter?.confirmed_value}
              style={{marginBottom:'15px', width:'150px'}}
              onChange={(evt) => {
                setFilters((last) => ({
                  ...last,
                  confirmed_value: evt.target.value.replace(/\D/g,'') ,
                }));
              }}
            />
          </Box>
          
          <Button variant="contained" type="submit">Confirmar</Button>
        </Box>
      </form>
      {!!success
        &&
        <Box marginBlock={'10px'} padding={'20px'} style={{ backgroundColor: '#24ff2450' }}><pre>{JSON.stringify(success, null, 2)}</pre></Box>}
      {!!error
        &&
        <Box marginBlock={'10px'} padding={'20px'} style={{ backgroundColor: '#ff242450' }}><pre>{error}</pre></Box>}
    </>
  )
}