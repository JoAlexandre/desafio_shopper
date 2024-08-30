import { Container } from "@mui/material";
import { ReactNode } from "react";

interface IHeader{
  children: ReactNode
}
export default function Header({children}:IHeader) {
  return (
    <Container  maxWidth="sm" style={{textAlign:'center'}}>
      {children}
    </Container>
  )
}