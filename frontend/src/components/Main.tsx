import { Container } from "@mui/material";
import { ReactNode } from "react";

interface IMain{
  children: ReactNode
}
export default function Main({children}:IMain) {
  return (
    <Container  maxWidth="sm">
      {children}
    </Container>
  )
}