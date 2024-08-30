import { ReactNode } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

interface ITemplate {
  children: ReactNode
}
function Template({children}:ITemplate) {

  return (
    <div>
      <Header>
			  <h1>Desafio da Shopper.com.br </h1>
      </Header>
      <Box border={'1px solid black'} display={'flex'} height={'80vh'}>
        <Box borderRight={'1px solid black'} width={'200px'}>
          <Box padding={'10px'}>
            <Link to={'/'} style={{textDecoration:'none'}}>Lançar Medidas</Link>
          </Box>
          <Box padding={'10px'} >
            <Link to={'/confirm'} style={{textDecoration:'none'}}>Confirmar Valores</Link>
          </Box>
          <Box padding={'10px'}>
            <Link to={'/list'} style={{textDecoration:'none'}}>Listar Medidas</Link>
          </Box>
        </Box>
        <Main>
          {children}
        </Main>
      </Box>
    </div>
  )
}

export default Template;
