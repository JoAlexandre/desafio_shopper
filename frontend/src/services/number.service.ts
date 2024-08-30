export function getPrettierNumber(value: string){
  return Number(Number(value.replace(/\D/g,'')) * 0.01).toLocaleString('pt-br', {minimumFractionDigits: 2})
  
}