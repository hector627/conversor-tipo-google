export function injectUnits(){
  const fragment = document.createDocumentFragment(),
    units = [
      "Longitud",
      "Frecuencia",
      "Temperatura"
    ]
// Creando las options para las unidades (selects secundarios)
  units.forEach(unit => {
    const $option = document.createElement("option")
    $option.value = unit
    $option.innerHTML = unit
    fragment.appendChild($option)
  })

  return fragment
}