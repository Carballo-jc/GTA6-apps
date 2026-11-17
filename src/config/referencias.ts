// Precios de referencia en pesos argentinos. Editá estos valores para actualizarlos.
export interface Referencia {
  singular: string;
  plural: string;
  precio: number;
}

export const REFERENCIAS: Referencia[] = [
  { singular: 'milanesa napolitana', plural: 'milanesas napolitanas', precio: 12000 },
  { singular: 'asado para 4', plural: 'asados para 4', precio: 60000 },
  { singular: 'viaje en colectivo', plural: 'viajes en colectivo', precio: 700 },
];

export const DIAS_LABORALES_POR_SEMANA = 5;
export const SEMANAS_POR_MES = 4.33;
export const PRECIOS_USD = { estandar: 70, premium: 100 };
