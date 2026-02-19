// Conversions réutilisables pour la vérification des débits
export function m3hToMs(debitM3h, diametreMm) {
  const section = Math.PI * Math.pow((diametreMm / 1000) / 2, 2); // m²
  return debitM3h / 3600 / section;
}

export function msToM3h(vitesseMs, diametreMm) {
  const section = Math.PI * Math.pow((diametreMm / 1000) / 2, 2); // m²
  return vitesseMs * section * 3600;
}

export function paToMmce(pa) {
  return pa / 9.81;
}

export function mmceToPa(mmce) {
  return mmce * 9.81;
}
