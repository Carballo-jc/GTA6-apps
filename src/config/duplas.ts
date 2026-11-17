export const TITULOS_DUPLA: string[] = [
  'Los fugitivos del asado',
  'Bonnie y Clyde del Wi-Fi',
  'Los reyes del autoservicio',
  'La dupla dinámica del colectivo',
  'Cómplices de la milanesa',
  'Los intocables del fernet',
  'El golpe perfecto de las 3 AM',
  'Socios del último mate',
  'Los cerebros del delivery',
  'Los piratas del ascensor',
];

export const DELITOS_DUPLA: string[] = [
  'Robar un carrito del súper y usarlo de auto',
  'Colarse juntos en un cumpleaños que no era el suyo',
  'Pedir un helado de 1 kilo y no compartirlo con nadie',
  'Hacer una picada con lo que había en la heladera del vecino',
  'Escaparse de pagar la cuenta mientras el otro distrae al mozo',
  'Cantar a los gritos en un auto prestado',
  'Hackear el Netflix de la tía',
  'Armar una fuga en moto sin casco por el barrio',
  'Contrabandear alfajores en la mochila',
  'Dejar en visto al grupo de la familia a coro',
];

export function veredicto(porcentaje: number): string {
  if (porcentaje >= 85) return 'Cómplices de por vida';
  if (porcentaje >= 60) return 'Se la banca cualquiera de los dos';
  if (porcentaje >= 35) return 'Se traicionan por un alfajor';
  return 'Mejor cada uno por su lado';
}
