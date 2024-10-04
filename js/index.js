import { formulas } from "./modules/formulas.js";
import { injectUnits } from "./modules/units.js";

const d = document,
  $select_unit = d.querySelector(".select-unit"),
  $select_values = d.querySelectorAll(".select-value"),
  $input_one = d.getElementById("input-one"),
  $input_two = d.getElementById("input-two"),
  $formula = d.querySelector(".formula-value"),
  fragment = d.createDocumentFragment(),
  validFormat = /^(((-\+)|\+|-{0,2})?\d*\.?\d+((e(-?|\+?)\d+))?)/g,
  notAllowedChars = /\s|,/g;

// "Inyectando" las unidades
$select_unit.appendChild(injectUnits())

// Valores por defecto:
// Obtener los datos
function getData(map, select){
  let unit_selected = select[select.selectedIndex].value
  for(let [key, value] of map){
    if(key === unit_selected){
      return value
    }
  }
}

// Llenando "subSelects"
function fillSelects(){
  const { measures, default_index, default_value } = getData(formulas(), $select_unit)
  // Obteniendo las unidades
  for(let [key, ] of measures){
    const $option = d.createElement("option")
    $option.value = key 
    $option.innerHTML = key 
    fragment.appendChild($option)
  }
  // Clonando el fragmento
  const clone = fragment.cloneNode(true)

  $select_values[0].appendChild(fragment)
  $select_values[1].appendChild(clone)
  // Definiendo índices por defecto para ambos selects
  $select_values[0].selectedIndex = default_index.select_one 
  $select_values[1].selectedIndex = default_index.select_two
  $input_one.value = default_value.value //<- Asignando valor por defecto a input para calculos posteriores
}

fillSelects()

// Obteniendo valores iniciales
function getIndex(){
  const { default_index } = getData(formulas(), $select_unit)
  return default_index
}

let index = getIndex(),
  getState = {
    "select-one": {
      currentIndex: index.select_one,
      prevIndex: null
    },
    "select-two": {
      currentIndex: index.select_two,
      prevIndex: null
    },
  }

// Cambiando dinámicamente los índices de los selects (formulas)
function compareIndex(target){
  if(target === $select_unit){
    // Reiniciando el estado de los selects
    getState["select-one"].currentIndex = getIndex().select_one
    getState["select-one"].prevIndex = null
    getState["select-two"].currentIndex = getIndex().select_two
    getState["select-two"].prevIndex = null
  }
  if(target === $select_values[0] || target === $select_values[1]){
    const currentSelect = target.id
    const otherSelect = currentSelect === "select-one" ? "select-two" : "select-one"
    // Almacenando el estado anterior de currentSelect
    getState[currentSelect].prevIndex = getState[currentSelect].currentIndex
    // Actualizando el estado actual de currentSelect
    getState[currentSelect].currentIndex = target.selectedIndex
    
    if(getState[currentSelect].currentIndex === getState[otherSelect].currentIndex
      && getState[otherSelect].prevIndex !== getState[currentSelect].currentIndex
    ){
      getState[otherSelect].prevIndex = getState[otherSelect].currentIndex //<- Almacenando el estado anterior de otherSelect
      getState[otherSelect].currentIndex = getState[currentSelect].prevIndex //<- Actualizando el estado anterior de otherSelect
      d.getElementById(otherSelect).selectedIndex = getState[otherSelect].currentIndex //<- Cambiando el indice de otherSelect
    }
  }
}

// Configurando el formato válido para los inputs
function formatInputValue(target){
  let value = target.value
  // Elimando espacios en blancos y comas
  if(value.includes(" ") || value.includes(",")) {
    value = value.replace(notAllowedChars, "")
  }
  if(value.match(validFormat)){
    // Añadiendo multiplicación de signos
    if(value.match(validFormat)[0].startsWith("--")){
      value = Number(value.match(validFormat)[0].slice(1)) * -1
    }
    if(value.toString().match(validFormat)[0].startsWith("-+")){
      value = Number(value.match(validFormat)[0].slice(1)) * 1
    }
    // Evitando que se ingresen caracteres no deseados al inicio
    if(value.toString().startsWith(".") 
      || value.toString().startsWith("+.")
      || value.toString().startsWith("-.")){
      value = (value.match(validFormat)[0])
    }
    return value.toString().match(validFormat)
  }else{
    return ""
  }
}

// Obteniendo propiedades de las formulas complejas (notación científica)
function getComplexFormula(formula){
  return formula.operation + formula.result + formula.unit
}

// Escribiendo valores
function fillInputs(target_input = $input_one){
  // Obteniendo formulas y títulos (instrucciones) de estas
  const { measures } = getData(formulas(formatInputValue(target_input)), $select_unit)
  const { formula_title } = getData(getData(measures, $select_values[0]), $select_values[1])
  // Agregando resultado al input contrario donde se escriba
  if(target_input === $input_two){
    const { formula_value } = getData(getData(measures, $select_values[1]), $select_values[0])
    $select_values[0].previousElementSibling.value = formula_value
  }else{
    const { formula_value } = getData(getData(measures, $select_values[0]), $select_values[1])
    $select_values[1].previousElementSibling.value = formula_value
  }
  // Escribiendo formula (simples o complejas según la propiedad pertenecientes al objeto obtenido) 
  $formula.innerHTML = formula_title?.single ?? getComplexFormula(formula_title.complex) 
}

// Escribiendo valores por defecto (antes de enventos)
fillInputs()

function handleKeyup(e){
  const currenInput = e.target
  const otherInput = (currenInput === $input_one) ? $input_two : $input_one
  // Limpiando input opuesto
  if(!(formatInputValue(currenInput)) || formatInputValue(currenInput)[0] === "" ){
    fillInputs(currenInput)
    otherInput.value = ""
  }else{
  // Escribiendo valores si el input tiene un formato valido
    if(formatInputValue(currenInput) &&
      e.key !== 'ArrowUp' && 
      e.key !== 'ArrowRight' && 
      e.key !== "ArrowDown" && 
      e.key !== "ArrowLeft"){
        otherInput.value = ""
        fillInputs(currenInput)
    }
  }
}

// Eventos
d.addEventListener("click", (e)=>{
  if(e.target.matches("div > input")){
    e.target.select()
  }
})

d.addEventListener("change", (e)=>{
  if(e.target === $select_unit){
    // Vaciando options de selects secundarios
    $select_values[0].innerHTML = ""
    $select_values[1].innerHTML = ""
    // Llenando selects secundarios con nuevas options
    fillSelects()
    // Evitando repetición de índices
    compareIndex(e.target)
    // Llenando selects secundarios con nuevas formulas
    fillInputs()
  }
  if(e.target.matches("input + select")){
    // Evitando repetición de índices
    compareIndex(e.target)
    // Limpiando inputs si el input previo al select objetivo no tiene valor
    if(!e.target.previousElementSibling.value){
      $input_one.value = ""
      $input_two.value = ""
    }else{
      fillInputs()
    }
  }
})

d.addEventListener("keyup", (e)=>{
  if(e.target === $input_one || e.target === $input_two){
    handleKeyup(e)
  }
})