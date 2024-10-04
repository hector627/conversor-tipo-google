// Formato - Frecuencia
function formatSimpleDivision(target, formula){
  if(target){
    const signo = formula >= 0 ? 1 : -1
    if(target.toString().match(/(\d*)(\.?)(\d*)(e(-?|\+?)\d{3,})?/)){
      const regExp = formula.toExponential().match(/(\d*)(\.?)(\d*)(e(-?|\+?)\d+)?/)
      return Number(Number(regExp[1] + regExp[2] + regExp[3]).toFixed(10)) * signo + regExp[4]
    }else return (Number(target[0]) === 0.1 || Number(target[0]) === -0.1) 
        ? formula.toExponential()
        : formula
  }else return ""
}

function formatSimpleProduct(target, formula){
  if(target){
    const targetToString = target.toString(),
      signo = formula >= 0 ? 1 : -1 
    if(targetToString.match(/(\d*)(\.?)(\d*)(e(-?|\+?)\d{2,})/)){
      const regExp = formula.toExponential().match(/(\d*)(\.?)(\d*)(e(-?|\+?)\d+)?/)
      return Number(Number(regExp[1] + regExp[2] + regExp[3]).toFixed(10)) * signo + regExp[4]
    }else return (targetToString.match(/^1{1}0{3,}/)) 
      ? formula.toExponential()
      : formula
  }else return ""
}

function formatComplexDivisionx6(target, formula){
  if(target){
    if(formula && formula !== Infinity){
      const targetToString = target.toString()
      if(targetToString.match(/(\d*)(\.?)(\d*)(e(-?|\+?)\d+)/)) return formula
      else{
        if(target.toString().match(/(\d+)(\.)(\d+)/)){
          const res = formula.toExponential().match(/(\d*)(\.?)(\d+)(e(-|\+)\d+)/)
          const regExp = target.toString().match(/(\d+)(\.)(\d*)/)
          if(regExp[1].length < 3 ){
            return Number(Number(res[1] + res[2] + res[3]).toFixed(10)) + res[4]
          } else return formula.toFixed(7)
        }else {
          return ((Math.sign(target) === 1 && targetToString.length < 3)
            || (Math.sign(target) === -1 && targetToString.length < 4)) 
              ? formula.toExponential() 
              : formula
        } 
      }
    }else return ""
  }else return ""
}

function formatComplexDivisionx9(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{
      const targetToString = target.toString()
      if(formula){
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)) {
          const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/),
            signo = formula >= 0 ? 1 : -1
          if(targetToString.match(/e(-?|\+?)\d+/)){
            if(regExp[1].length < 4) return formula.toExponential()
            else return formula
          }else{
            if(regExp[1].length >= 6){
              return Number(formula.toFixed(10))
            }else{
              const res = formula.toExponential().match(/(\d*)(\.?)(\d*)(e(-?|\+?)\d+)?/)
              return Number(Number(res[1] + res[2] + res[3]).toFixed(10)) * signo + res[4]
            }
          }
        } else return formula.toExponential()
      }
    }
  }else return ""
}

function formatComplexProductx6(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{
      if(formula && formula !== Infinity){
        const targetToString = target.toString()
        if(targetToString.match(/(\d*)(\.)(\d*)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)
            return (regExp[3].match(/[1-9]{4,}/) || regExp[3].match(/0{3,}[1-9]{1,}/)) 
              ? formula
              : formula.toExponential()
          }else return (targetToString.match(/(-?|\+?)?(0+)(\.)(\d*)/) || 
              targetToString.match(/(\d+)(\.)(\d{2,})/)) 
              ? formula
              :  formula.toExponential()
        }else return formula.toExponential()
      }else return ""
    }
  }else return ""
}

function formatComplexProductx9(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{
      if(formula && formula !== Infinity){
        const targetToString = target.toString(),
          signo = formula >= 0 ? 1 : -1
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)
            return (regExp[3].match(/[1-9]{7,}/) || regExp[3].match(/0{6,}[1-9]{1,}/)) 
              ? formula
              : formula.toExponential()
          }else{
           if(targetToString.match(/(0{1})(\.)([1-9]{4,})/) || 
            targetToString.match(/(0{2,})(\d*)(\.)([1-9]{3,})/) || 
            targetToString.match(/(\d+)(\.)([1-9]{5,})/)) {
              return formula
            }else return formula.toExponential()
          }
        }else{
          if(targetToString.match(/(\d*)(e(-?|\+?)\d+)/)){
            const res = formula.toExponential().match(/(\d*)(\.?)(\d*)(e(-?|\+?)\d+)?/)
            return Number(Number(res[1] + res[2] + res[3]).toFixed(10)) * signo + res[4]
          }return formula.toExponential()
        }
      }else return ""
    }
  }else return ""
}

// Formato - Temperatura
function formatLiveResult(formula){
  if(formula && formula !== Infinity){
    if(formula.toString().match(/(\d*)(\.?)(\d*)/)){
      let formulaToString = formula.toString()
      let numberFixed
      const regExp = formulaToString.match(/(\d*)(\.?)(\d*)/)

      if(regExp[1].length === 1) numberFixed = 5
      else if(regExp[1].length === 2) numberFixed = 4
      else numberFixed = 3

      return Number(formula.toFixed(numberFixed))
    }else return formula
  }else return ""
}

function formatValueTemp(target){
  if(target){
    const targetToString = target.toString()
    let signo = target >= 0 ? 1 : -1
  
    if(targetToString.match(/(\d*)(\.)(\d+)/)){
      const parts = targetToString.match(/(\d*)(\.)(\d+)/)
      return Number((Number(parts[1] + parts[2] + parts[3].slice(0, 4))).toFixed(3)) * signo
    }else{
      if((target >= 0 && targetToString.length >= 7) || ((target < 0 && targetToString.length >= 8))){
        const parts = Number(target).toExponential().match(/(\d*)(\.?)(\d*)(e\+\d*)?/)
        const result = Number((Number(parts[1] + parts[2] + parts[3].slice(0, 4))).toFixed(3)) * signo
        return result + parts[4]
      }else return target
    }
  }else return ""
}

function formatResultTemp(target, formula, condicionOne=9, fixed=1, condicionTwo){
  if(target){
    if(formula && formula !== Infinity){
      if(target.toString().match(/(-?|\+?)?(\d*)(\.{1})(\d*)(\d*(e(-?|\+?)\d*))?/)) return Number(formula.toFixed(1))
      else{
        let signo = formula >= 0 ? 1 : -1,
          parts = formula.toExponential().match(/(\d*)(\.?)(\d*)(e(\+?|-?)\d+)?/),
          res = Number((Number(parts[1] + parts[2] + parts[3].slice(0, 4))).toFixed(3)) * signo + parts[4];

        if(!formula.toString().match(/(\d+)(\.?)(\d+)/)) return (formula.toString().length >= condicionTwo) ? res : formula
        else {
          const formulaToString = Number(formula.toFixed(4)).toString()

          if(formulaToString.length > condicionOne) return res
          else{
            const regExp = formulaToString.match(/(\d+)(\.?)(\d+)/)
            if(Math.sign(formula)  === 1){
              if(regExp[1].length >= 3) return Number(formula.toFixed(3))
              else return Number(formula.toFixed(fixed))
            }else if(Math.sign(formula)  === -1){
              return (regExp[1].length === 1) 
                ? Number(formula.toFixed(3))
                : (regExp[1].length === 3) 
                  ? Number(formula.toFixed(1))
                  : (regExp[1].length === 4) 
                    ? formula.toFixed()
                    : (regExp[1].startsWith(0)) 
                      ? Number(formula.toFixed(4))
                      : Number(formula.toFixed(fixed))
            }else return 0
            // return (regExp[1].length >= 3 || regExp[1].length === 1) ? Number(result.toFixed(fixed)) : Number(result.toFixed(2))
          }
        }
      }
    }else return ""
  }else return ""
}

// Formato - Longitud
function formatSimpleProductx100000(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{
      const targetToString = target.toString(),
        signo = formula >= 0 ? 1 : -1
      if(targetToString.match(/(\d+)/)[1].length === 1
        || targetToString.match(/^0[1-9]$/)
        || targetToString.match(/^0{2,}[1-9]*$/)) return formula
      else{
        if(targetToString.match(/(\d*)(\.)(\d*)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const res = formula.toExponential().match(/(\d*)(\.?)(\d*)(e(-?|\+?)\d+)?/)
            return targetToString.match(/(\d+)(\.?)(\d{3,})(e(-?|\+?)\d+)?/)
              ? formula 
              : Number(Number(res[1] + res[2] + res[3]).toFixed(10)) * signo + res[4]
          }else return Number(formula.toFixed(10))
        }else return formula.toExponential()
      }
    }
  }else return ""
}

function formatComplexProductx12(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{
      const targetToString = target.toString(),
        signo = formula >= 0 ? 1 : -1
      if(formula){
        if(targetToString.match(/(\d*)(\.)(\d*)(e(-?|\+?)\d+)?/)){
          const res = formula.toExponential().match(/(\d*)(\.?)(\d*)(e(-?|\+?)\d+)?/)
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            return (targetToString.match(/(\d*)(\.)(\d{9,})(e(-?|\+?)\d+)/))
              ? formula
              : Number(Number(res[1] + res[2] + res[3]).toFixed(10)) * signo + res[4]
          }else return (targetToString.match(/(0)(\.)(\d{7,})/)
                  || targetToString.match(/((0{2,})(\.)(\d{6,})|(0{3,})(\.)(\d{5,}))/)
                  || targetToString.match(/[1-9]*(\.)(([1-9]{8})|(0{7}[1-9]))/))
              ? formula
              : Number(Number(res[1] + res[2] + res[3]).toFixed(10)) * signo + res[4]
        }else return formula.toExponential()
      }
    }
  }else return ""
}

function formatSimpleDivisionx1609x1760(target, formula){
  if(target){
    if (Number(target[0]) === 0) return 0
    else{
      if(formula && formula !== Infinity){
        const targetToString = target.toString()
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            return targetToString.match(/((\d*)(\.)(\d+)(e(-?|\+?)0*([2-9][4-9]|[3-9]\d|[1-9]\d{2})\d*))/)
              ? formula.toExponential()
              : Number(formula.toFixed(7))
            }else return parseFloat(target[0]) > 0.16094
            ? formula
            : formula.toExponential(5)
        }else return Number(formula.toFixed(8))
      }else return ""
    }
  }else return ""
}

function formatSimpleProductxLong(target, formula, min){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{
      if(formula && formula !== Infinity){
        const targetToString = target.toString(),
        signo = formula >= 0 ? 1 : -1
        let numberFixed = 1
        if(targetToString.match(/(0*)(\.?)(\d+)/)){
          const regExp = targetToString.match(/(0*)(\.?)(\d+)/)
          
          if(regExp[3].length > 1) numberFixed = regExp[3].length + 2
          else numberFixed = 3
          
          return Number(formula.toFixed(numberFixed))
        }
        if(Number(target[0]) >= min && Number(target[0]) < 1001){
          const res = formula.toExponential().match(/(\d+)(\.)(\d*)(e(-?|\+?)\d+)/)
          return Number(Number(res[1] + res[2] + res[3]).toFixed(3)) * signo + res[4]
        }
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            return targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d{2,})/)
              ? formula.toExponential()
              : formula.toFixed()
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d*)/)
            
            if(regExp[3].length === 1) numberFixed = 2
            else if(regExp[3].length === 2) numberFixed = 3
            else numberFixed = regExp[3].length+1
            
            return Number(formula.toFixed(numberFixed))
          }
        }else{
          const regExp = targetToString.match(/(\d+)/)
          
          if(regExp[1].length === 1) numberFixed = 2
          else if(regExp[1].length === 2) numberFixed = 1
          else numberFixed = 0
          
          return Number(formula.toFixed(numberFixed))
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx39370(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            return targetToString.match(/(\d*)(\.)(\d{6,})(e(-?|\+?)\d{1})/)
              ? Number(formula.toFixed(1))
              : formula.toExponential()
          }else{
            const res = targetToString.match(/(\d*)(\.)(\d{2,})/)
            return res 
              ? formula.toFixed(res[3].length) 
              : Number(formula.toFixed(1))
          }
        }else{
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            return targetToString.match(/(1|2)(e(-?|\+?)1)/)
              ? formula.toFixed()
              : formula.toExponential(4)
          }
          else return Number(target[0]) > 25 
            ? formula.toExponential(4)
            : Number(formula.toFixed(1))
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx1852(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 23
              ? formula.toExponential()
              : Number(formula.toFixed(6))
          }else {
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            return regExp[3] < 19
              ? formula.toExponential(4)
              : Number(formula.toFixed(9))
          }
        }else{
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[4]) > 23
              ? formula.toExponential()
              : Number(formula.toFixed(7))
          }else {
            const regExp = targetToString.match(/(\d+)/)

            if(regExp[1].length === 1) numberFixed = 9
            else if(regExp[1].length === 2) numberFixed = 8
            else numberFixed = 5

            return Number(formula.toFixed(numberFixed))
          }
        }
      }
    }
  }else return ""
}

function formatSimpleDivisionLong(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            return targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(0*(2[3-9]|[3-9][0-9]|[1-9]\d{2}))\d*)/)
              ? formula.toExponential()
              : formula
          }else return targetToString.match(/0\.1/)
              ? formula.toExponential()
              : formula
        }else return formula
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx100(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula){
        const targetToString = target.toString()
        let numberFixed 
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            return targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(0*([1-9][8-9]|[2-9]\d|[1-9]\d{2}))\d*)/)
            ? formula.toExponential()
            : formula
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
              
            if(regExp[3].length < 3) numberFixed = 0
            else if(regExp[3].length === 3) numberFixed = 1
            else numberFixed = regExp[3].length - 2

            return Number(formula.toFixed(numberFixed))
          }
        }else return formula
      }
    }
  }else return ""
}

function formatSimpleProductx1094x3281(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString()
        let numberFixed 
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            return targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d{2,})/)
              ? formula.toExponential()
              : Number(formula.toFixed(3))
          }else return Number(formula.toFixed(6))
        }else{
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            return targetToString.match(/(\d+)(e(-?|\+?)\d{2,})/)
              ? formula.toExponential()
              : Number(formula.toFixed(3))
          }else{
            const regExp = targetToString.match(/(\d+)/)
            if(regExp[1].length === 1) numberFixed = 5
            else if(regExp[1].length === 2) numberFixed = 4
            else numberFixed = 3
            return Number(formula.toFixed(numberFixed))
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx3937(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d{2,})/)){
              return Number((targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/))[6]) > 18
                ? formula.toExponential()
                : Number(formula.toFixed(3))
            }else{
              const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)/)
              numberFixed = regExp[3].length + 1
              return Number(formula.toFixed(numberFixed))
            }
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(regExp[3].length > 1) numberFixed = regExp[3].length + 3
            else numberFixed = 4
            return Number(formula.toFixed(numberFixed))
          }
        }else{
          const regExp = targetToString.match(/(\d+)(e(-?|\+?)\d+)?/)
          if(regExp[1].length === 1) numberFixed = 4
          else if(regExp[1].length === 2) numberFixed = 3
          else numberFixed = 2
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            return targetToString.match(/(\d+)(e(-?|\+?)\d{2,})/)
              ? formula.toExponential()
              : Number(formula.toFixed(3))
          }else return Number(formula.toFixed(numberFixed))
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx100000(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let signo = formula >= 0 ? 1 : -1
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 24
              ? formula.toExponential()
              : formula
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            const res = formula.toExponential().match(/(\d*)(\.?)(\d+)(e(-?|\+?)\d+)/)
            return Number(regExp[1]) > 9
              ? formula
              : Number(res[1] + res[2] + res[3]) * signo + res[4]
          }
        }else{
          if(targetToString.match(/(e(-?|\+?)(\d+))/)){
            return targetToString.match(/(\d*)(e(-?|\+?)(\d+))/)[4] < 23
              ? formula
              : formula.toExponential()
          }else{
            const regExp = targetToString.match(/(\d+)/)
            return regExp[1] > 10
              ? formula
              : formula.toExponential() 
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx100(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 21
              ? formula.toExponential()
              : formula
          }else return Number(formula.toFixed(10))
        }else return formula
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx3x10x12x36(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 18
              ? formula.toExponential()
              : formula
          }else {
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            const regExp2 = formula.toString().match(/(\d*)(\.)(\d+)/)
            if(regExp && regExp2){
              return Number(regExp2[3].length) > Number(regExp[3].length)
                ? formula.toFixed(Number(regExp[3].length))
                : formula
            }else return ""
          }
        }else{
          if(targetToString.match(/(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[4]) > 18
              ? formula.toExponential()
              : formula
          }else return formula
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx10000x63360x254000(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString()
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 1
              ? formula.toExponential()
              : formula
          }else {
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[3]) > 1) numberFixed = Number(regExp[3].length) - 1
            else numberFixed = 0
            return Number(formula.toFixed(numberFixed))
          }
        }else {
          if(targetToString.match(/(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[4]) > 1
              ? formula.toExponential()
              : formula
          }else{
            const regExp = targetToString.match(/(\d+)/)
            return Number(regExp[1]) > 99
              ? formula.toExponential()
              : formula
          }
        }
      }else return ""
    }
  }else return ""
}

function formatComplexDivisionx7(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let signo = formula >= 0 ? 1 : -1
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            return targetToString.match(/(\d*)(\.)(0{0,4}[1-9]+|[1-9]{5,})(e(-?|\+?)\d+)/) 
              ? formula
              : formula.toExponential()
          }else{
            if(targetToString.match(/^(0?)(\.)([1-9])$/)
            || targetToString.match((/^([1-9]+)(\.)([1-9]{1,2}0*|0[1-9])$/))){
              const res = formula.toExponential().match(/(\d*)(\.?)(\d+)(e(-?|\+?)\d+)/)
              return Number(res[1] + res[2] + res[3]) * signo + res[4]
            }else return formula
          }
        }else return formula.toExponential()
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionxhundredsOfThousands(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return (Number(regExp[6]) === 1)
              ? formula.toExponential(4)
              : (Number(regExp[6]) > 25)
                ? formula.toExponential()
                : Number(formula.toFixed(9))
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            return targetToString.match(/(0*[1-9]{3,})(\.)(\d+)/)
              ? formula
              : formula.toExponential(regExp[3].length + 3)
          }
        }else{
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)
            return (Number(regExp[4]) === 1)
              ? formula.toExponential(4)
              : (Number(regExp[4]) > 25)
                ? formula.toExponential()
                : Number(formula.toFixed(9))
          }else{
            const regExp = targetToString.match(/(\d+)/)
            return Number(regExp[1]) > 16
              ? Number(formula.toFixed(9))
              : formula.toExponential(4)
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx9144x3048(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return regExp[6] > 21
              ? formula.toExponential()
              : Number(formula.toFixed(5))
          }else return Number(formula.toFixed(7))
        }else{
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)
            return regExp[4] > 21
              ? formula.toExponential()
              : Number(formula.toFixed(5))
          }else return Number(formula.toFixed(7))
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx254(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return regExp[6] > 20
              ? formula.toExponential()
              : Number(formula.toFixed(4))
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            return Number(formula.toFixed(regExp[3].length + 5))
          }
        }else{
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)\d+)/)
            return regExp[4] > 20
              ? formula.toExponential()
              : Number(formula.toFixed(4))
          }else return Number(formula.toFixed(6))
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx10(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 20
              ? formula.toExponential()
              : formula
          }else return Number(formula.toFixed(8))
        }else{
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[4]) > 20
              ? formula.toExponential()
              : formula
          }else return formula
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx914x304(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 22
              ? formula.toExponential()
              : Number(formula.toFixed(6))
            }else return Number(formula.toFixed(8))
          }else{
            if(targetToString.match(/(e(-?|\+?)\d+)/)){
              const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)
              return Number(regExp[6]) > 22
                ? formula.toExponential()
                : Number(formula.toFixed(6))
            }else return Number(formula.toFixed(8))
          }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx25(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 22
              ? formula.toExponential()
              : Number(formula.toFixed(5))
            }else return Number(formula.toFixed(7))
          }else{
            if(targetToString.match(/(e(-?|\+?)\d+)/)){
              const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)
              return Number(regExp[6]) > 22
                ? formula.toExponential()
                : Number(formula.toFixed(5))
            }else return Number(formula.toFixed(7))
          }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx25400(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 24
              ? formula.toExponential()
              : Number(formula.toFixed(8))
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            return Number(regExp[1]) > 2
              ? Number(formula.toFixed(9))
              : formula.toExponential(regExp[1].length + 3)
          }
        }else{
          if(targetToString.match(/(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[4]) > 24
              ? formula.toExponential()
              : Number(formula.toFixed(8))
          }else{
            const regExp = targetToString.match(/(\d+)/)
            return Number(regExp[1]) > 2
              ? Number(formula.toFixed(9))
              : formula.toExponential(3)
          }
        }
      }else return ""
    }
  }else return ""
}

function formatComplexDivisionx12(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
          let value = Number(regExp[1]+regExp[2]+regExp[3])
          numberFixed = Number(value.toString().length) + 1
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp2 = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp2[6]) < 8
              ? formula.toExponential(numberFixed)
              : Number(regExp2[6]) > 31
                ? formula.toExponential()
                : formula
          }else{
            return Number(regExp[1].length) > 8
              ? formula
              : formula.toExponential(numberFixed)
          }
        }else{
          if(targetToString.match(/(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[4]) < 9 || Number(regExp[4]) > 31
              ? formula.toExponential()
              : formula
          }else{
            const regExp = targetToString.match(/(\d+)/)
            if(Number(regExp[1].length) < 4){
              numberFixed = 4
            }else{
              numberFixed = Number(regExp[1].length) + 1
            }
            return Number(regExp[1].length) > 8
              ? formula
              : formula.toExponential(numberFixed)
          }
        }
      }else return ""
    }
  }else return ""
}

function formatComplexDivisionx8(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) < 5
              ? formula.toExponential(3)
              : Number(regExp[6]) > 28
                ? formula.toExponential()
                : Number(formula.toFixed(12))
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[0].length) === 3){
              numberFixed = Number(regExp[0].length)
            }else{
              numberFixed = Number(regExp[0].length) + 1
            }
            return Number(regExp[1].length) < 6
              ? formula.toExponential(numberFixed)
              : formula
          }
        }else{
          if(targetToString.match(/(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[4]) < 5
              ? formula.toExponential(3)
              : Number(regExp[6]) > 28
                ? formula.toExponential()
                : Number(formula.toFixed(12))
          }else{
            const regExp = targetToString.match(/(\d+)/)
            return Number(regExp[1].length) > 5
              ? Number(formula.toFixed(12))
              : formula.toExponential(4)
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx1609x1760(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) === 1
              ? Number(formula.toFixed(4))
              : Number(regExp[6]) > 16
                ? formula.toExponential()
                : Number(formula.toFixed(3))
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[1].length) >= 1) numberFixed = 5
            if(Number(regExp[3].length) >= 1) numberFixed = Number(regExp[3].length) + 4
            if(Number(regExp[1]) === 0) numberFixed = 6
            return Number(formula.toFixed(numberFixed))
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[4]) === 1
              ? Number(formula.toFixed(4))
              : Number(regExp[4]) > 19
                ? formula.toExponential()
                : Number(formula.toFixed(3))
          }else{
            const regExp = targetToString.match(/(\d+)/)
            if(Number(regExp[1].length) === 1) numberFixed = 5
            else if(Number(regExp[1].length) === 2) numberFixed = 4
            else numberFixed = 3
            return Number(formula.toFixed(numberFixed))
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx160900x185200(target, formula, nautica){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)) {
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            if(regExp[3].match(/((0{1,}[1-9]+|0*[1-9]+0*[1-9]+)\d*)/)
              && Number(regExp[3].length) > Number(regExp[6])){
              if(Number(regExp[3].length) > 1){
                numberFixed = Number(regExp[3].length) - (Number(regExp[6]) + 1)
              }else numberFixed = 0

              return Number(formula.toFixed(numberFixed))
            }else{
              if(!nautica){
                if(Number(regExp[6]) < 3) numberFixed = 2
                else if(Number(regExp[6]) === 3) numberFixed = 4
                else if(Number(regExp[6]) === 4) numberFixed = 5
                else if(Number(regExp[6]) === 5) numberFixed = 6
                else if(Number(regExp[6]) > 5 && Number(regExp[6]) < 18) numberFixed = 7
                else numberFixed = 16
  
              return formula.toExponential(numberFixed)
              }else return formula.toExponential()
            }
          }
          else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[1]) === 0) numberFixed = 1
            if(Number(regExp[1]) !== 0) numberFixed = 0
            if(Number(regExp[3]) >= 2) numberFixed = regExp[3].length - 1
            return Number(formula.toFixed(numberFixed))
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)) return formula.toExponential()
          else{
            const regExp = targetToString.match(/(\d+)/)
            return Number(regExp[1]) > 6
              ? formula.toExponential()
              : formula.toFixed()
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx1151x3281(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            if(Number(regExp[6]) === 1) numberFixed = 5
            else numberFixed = 4
            return Number(regExp[6]) > 20
              ? formula.toExponential()
              : Number(formula.toFixed(numberFixed))
          }else return Number(formula.toFixed(6))
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)
            const regExp2 = formula.toString().match(/(\d*)(\.?)(\d*)/)
            if(Number(regExp2[1].length) === 1) numberFixed = 5
            else if(Number(regExp2[1].length) === 2) numberFixed = 4
            else numberFixed = 3
            return Number(regExp[4]) > 20
              ? formula.toExponential()
              : Number(formula.toFixed(numberFixed))
          }else {
            const regExp = targetToString.match(/(\d+)/)
            if(Number(regExp[1]) === 1) numberFixed = 6
            else if(Number(regExp[1].length === 1)) numberFixed = 5
            else if(Number(regExp[1].length === 2)) numberFixed = 4
            else numberFixed = 3
            return Number(formula.toFixed(numberFixed))
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx9144x3048(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString()
        let numberFixed 
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 17
              ? formula.toExponential()
              : Number(formula.toFixed(2))
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[3].length) >= 1) numberFixed = Number(regExp[3].length) + 2
            return formula.toFixed(numberFixed)
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            return Number(regExp[4]) > 18
            ? formula.toExponential()
            : formula
          }else{
            const regExp = targetToString.match(/(\d+)/);
            if(Number(regExp[1].length) > 2) numberFixed = 1
            else numberFixed = 2
            return formula.toFixed(numberFixed)
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx914(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 16
              ? formula.toExponential()
              : formula
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[3].length) >= 1) numberFixed = Number(regExp[3].length) + 1
            return formula.toFixed(numberFixed)
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            return Number(regExp[4]) > 17
            ? formula.toExponential()
            : formula
          }else{
            const regExp = targetToString.match(/(\d+)/);
            if(Number(regExp[1].length) > 2) numberFixed = 0
            else numberFixed = 1
            return formula.toFixed(numberFixed)
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx914400(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString()
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            if(Number(regExp[6]) < 3) numberFixed = 3
            else if(Number(regExp[6]) === 3) numberFixed = 4
            else if(Number(regExp[6]) > 3 && Number(regExp[6]) < 16) numberFixed = 5
            else numberFixed = 16
            return Number(regExp[3]) > 100 || regExp[3].match(/^(0+[1-9]+)$/)
              ? formula
              : formula.toExponential(numberFixed)
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            return Number(regExp[3]) > 10 || regExp[1].match(/(0*[1-9]*)/)
              ? formula.toFixed()
              : formula.toExponential()
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)) return formula.toExponential()
          else{
            const regExp = targetToString.match(/(\d+)/);
            return (Number(regExp[1]) > 1)
              ? formula.toExponential()
              : formula 
          }
        }
      }else return ""
    }
  }else return ""
}

function formatComplexProductx8(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[3].length > 5)
              ? formula
              : formula.toExponential()
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[3].length) <= 2) numberFixed = 3
            if(Number(regExp[3].length) === 3) numberFixed = 4
            if(Number(regExp[3].length) === 4) numberFixed = 5
            return Number(regExp[3].length) > 4
              || regExp[1].match(/(0{3,})/)
              || regExp[1].match(/(0{4,}\d+)/)
              ? formula.toFixed()
              : formula.toExponential(numberFixed)
          }
        }else return formula.toExponential()
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx2025(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 23
              ? formula.toExponential()
              : Number(formula.toFixed(7))
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            return Number(regExp[0]) === 0.1 || Number(regExp[0]) === 0.2
              ? formula.toExponential(4)
              : Number(formula.toFixed(9))
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            return Number(regExp[4]) > 23
              ? formula.toExponential()
              : Number(formula.toFixed(7))
          }else {
            const regExp = targetToString.match(/(\d+)/)
            if(Number(regExp[1].length) === 1) numberFixed = 9
            else numberFixed = 7
            return Number(formula.toFixed(numberFixed))
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx3281(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            if(Number(regExp[6]) < 5) numberFixed = 7
            else if(Number(regExp[6]) >= 5 && Number(regExp[6]) < 8) numberFixed = 3
            else numberFixed = 0
            return Number(regExp[6]) > 23
              ? formula.toExponential()
              : Number(formula.toFixed(numberFixed))
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            return Number(regExp[0]) === 0.1 || Number(regExp[0]) === 0.2
              ? formula.toExponential(4)
              : Number(formula.toFixed(9))
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            if(Number(regExp[4]) < 6) numberFixed = 7
            else if(Number(regExp[4]) === 6) numberFixed = 1
            else numberFixed = 0
            return Number(regExp[4]) > 23
              ? formula.toExponential()
              : Number(formula.toFixed(numberFixed))
          }else {
            const regExp = targetToString.match(/(\d+)/)
            if(Number(regExp[1].length) === 1) numberFixed = 9
            else numberFixed = 7
            return Number(formula.toFixed(numberFixed))
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx304(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 17
              ? formula.toExponential()
              : formula
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/);
            numberFixed = Number(regExp[3].length) + 1
            return formula.toFixed(numberFixed);
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            return Number(regExp[4]) > 17
              ? formula.toExponential()
              : formula
          }else return Number(formula.toFixed(1))
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx304000(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            if(Number(regExp[6].length) < 1){console.log("object");}
            return (regExp[3].match(/0+[1-9]+\d*/)
            || regExp[3].match(/[1-9]+0*[1-9]+\d*/))
            && Number(regExp[6].length) < 2
              ? formula
              : formula.toExponential()
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if (Number(regExp[3].length >= 3)) numberFixed = Number(regExp[3].length) - 2
            else numberFixed = 0
            return Number(formula.toFixed(numberFixed))
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            return (Number(regExp[4]) < 18)
             ? formula.toExponential(4)
             : formula.toExponential(16)
          }else{
            const regExp = targetToString.match(/(\d+)/);
            if(Number(regExp[1].length) >= 4) numberFixed = regExp[1].length
            else numberFixed = 3
            return Number(regExp[1]) < 4
              ? formula
              : formula.toExponential(numberFixed)
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx5280x6076(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            if(Number(regExp[6]) === 0) numberFixed = 9
            else if(Number(regExp[6]) === 1) numberFixed = 8
            else numberFixed = 7
            return Number(regExp[6]) > 23
              ? formula.toExponential()
              : Number(formula.toFixed(numberFixed))
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(targetToString.match(/^(0*)(\.)(\d+)$/)){
              if(regExp[1] === "") numberFixed = Number(regExp[0].length) + 2
              else if(Number(regExp[1]) === 0) numberFixed = Number(regExp[0].length) + 1
              return formula.toExponential(numberFixed)
            }else{
              if(Number(regExp[3].length) > 1) numberFixed = Number(regExp[0].length) + 6
              else numberFixed = 9
              return Number(formula.toFixed(numberFixed))
            }
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            if(Number(regExp[4]) === 0) numberFixed = 9
            else if(Number(regExp[4]) === 1) numberFixed = 8
            else numberFixed = 7
            return Number(regExp[4]) > 23
              ? formula.toExponential()
              : Number(formula.toFixed(numberFixed))
          }else {
            const regExp = targetToString.match(/(\d+)/);
            if(Number(regExp[1]) < 5) numberFixed = 9
            else if(Number(regExp[1].length) === 3) numberFixed = 7
            else numberFixed = 8
            return Number(formula.toFixed(numberFixed))
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx3(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            if(Number(regExp[6]) === 1) numberFixed = 5
            else numberFixed = 4
            return Number(regExp[6]) > 20
              ? formula.toExponential()
              : formula.toFixed(numberFixed)
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(targetToString.match(/^([3-9])(\.)(\d?)$/)) numberFixed = 5
            else if(targetToString.match(/^(0?)(\.)([4-9])$/)
            || targetToString.match(/^(1|2)(\.)(\d?)$/)) numberFixed = 6
            else if(targetToString.match(/^(0?)(\.)([1-2])$/)) numberFixed = 7
            else numberFixed = Number(regExp[0].length) + 3
            return Number(formula.toFixed(numberFixed))
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            if(Number(regExp[4]) === 1) numberFixed = 5
            else if(Number(regExp[4]) === 2) numberFixed = 4
            else numberFixed = 3
            return Number(regExp[4]) > 20
              ? formula.toExponential()
              : Number(formula.toFixed(numberFixed))
          }else{
            const regExp = targetToString.match(/(\d+)/);
            if(Number(regExp[1]) < 3) numberFixed = 6
            else if(targetToString.match(/^([1-2]\d|[4-9])$/)) numberFixed = 5
            else if(targetToString.match(/^(([2-4]\d)|(1)\d{2}|(2\d{2,}))$/)) numberFixed = 4
            else numberFixed = 3
            return Number(formula.toFixed(numberFixed))
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx39370(target, formula){
    if(target){
      if(Number(target[0]) === 0) return 0
      else{        
        if(formula && formula !== Infinity){
          const targetToString = target.toString() 
          let numberFixed
          if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
            if(targetToString.match(/(e(-?|\+?)\d+)/)){
              const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
              if(regExp[6].match(/(25|26|32)/)) numberFixed = 3
              else numberFixed = 16
              return Number(regExp[6]) > 24
                ? formula.toExponential(numberFixed)
                : Number(regExp[6]) < 8
                  ? Number(formula.toFixed(7))
                  : Number(formula.toFixed())
            }else{
              const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
              if(Number(regExp[3].length) > 1) numberFixed = Number(regExp[0].length)
              else numberFixed = 3
              return Number(regExp[1]) > 3
                ? Number(formula.toFixed(8))
                : formula.toExponential(numberFixed)
            }
          }else{
            if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
              const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
              return Number(regExp[4]) > 24
                ? formula.toExponential()
                : Number(regExp[4]) < 8
                  ? Number(formula.toFixed(6))
                  : Number(formula.toFixed())
            }else{
              const regExp = targetToString.match(/(\d+)/);
              return Number(regExp[1]) > 3
                ? Number(formula.toFixed(8))
                : formula.toExponential(2)
            }
          }
        }else return ""
      }
    }else return ""
}

function formatSimpleDivisionx39(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            if(regExp[6].match(/(22|23|29)/)) numberFixed = 3
            return Number(regExp[6]) > 21
              ? formula.toExponential(numberFixed)
              : Number(regExp[6]) < 3
                ? Number(formula.toFixed(4))
                : Number(regExp[6]) === 3
                  ? Number(formula.toFixed(2))
                  : Number(regExp[6]) === 4
                    ? Number(formula.toFixed(1))
                    : formula.toFixed()
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[3]) > 1) numberFixed = Number(regExp[3].length) + 4
            else numberFixed = 5
            return formula.toFixed(numberFixed)
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            return Number(regExp[4]) > 21
            ? formula.toExponential(numberFixed)
            : Number(regExp[4]) < 3
              ? Number(formula.toFixed(4))
              : Number(regExp[4]) === 3
                ? Number(formula.toFixed(2))
                : Number(formula.toFixed())
          }else return formula.toFixed(4)
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx2(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 19
              ? formula.toExponential()
              : formula
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[3].length) > 1) numberFixed = Number(regExp[3].length) + 2
            else numberFixed = 3
            return Number(formula.toFixed(numberFixed))
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            return Number(regExp[4]) > 19
              ? formula.toExponential()
              : formula
          }else return formula.toFixed(2)
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx25(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 18
              ? formula.toExponential()
              : formula
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[3].length) > 1) numberFixed = Number(regExp[3].length) + 1
            else numberFixed = 2
            return Number(formula.toFixed(numberFixed))
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            return Number(regExp[4]) > 18
              ? formula.toExponential()
              : formula
          }else return formula.toFixed(1)
        }
      }else return ""
    }
  }else return ""
}

function formatComplexProductx7(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            if(Number(regExp[3].length) > 6) numberFixed = Number(regExp[3].length) - 6
            else numberFixed = 0
            return regExp[3].match(/((0{3,}[1-9]+|0*[1-9]+0*[1-9]+)\d*)/)
              && Number(regExp[3].length) >= 4
              ? formula.toFixed(numberFixed)
              : formula.toExponential()
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[3].length) > 5) numberFixed = Number(regExp[3].length) - 5
            else numberFixed = 0
            return Number(regExp[3].length) >= 3
              ? Number(formula.toFixed(numberFixed))
              : Number(regExp[1].length) > 1
                ? formula.toExponential(Number(regExp[1].length) + 2)
                : formula.toExponential(Number(regExp[3].length) + 2)
          }
        }else return formula.toExponential()
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx63360x72910(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            if(Number(regExp[6]) === 1) numberFixed = 9
            else numberFixed = 8
            return Number(regExp[6]) > 24
              ? formula.toExponential()
              : formula.toFixed(numberFixed)
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[1]) < 7){
              if(Number(regExp[3].length) > 1) numberFixed = Number(regExp[3].length) + 3 
              else numberFixed = 4
              return formula.toExponential(numberFixed)
            }else{
              if(Number(regExp[3].length) > 1) numberFixed = Number(regExp[3].length) + 7
              else numberFixed = 9
              return Number(formula.toFixed(numberFixed))
            }
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            if(Number(regExp[4]) === 1) numberFixed = 9
            else if(Number(regExp[4]) === 2) numberFixed = 8
            else numberFixed = 7
            return Number(regExp[4]) > 24
              ? formula.toExponential()
              : formula.toFixed(numberFixed)
          }else{
            const regExp = targetToString.match(/(\d+)/);
            return Number(regExp[1]) < 7
              ? formula.toExponential(4)
              : Number(formula.toFixed(8))
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleDivisionx12x36(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            if(Number(regExp[6]) === 1) numberFixed = 6
            else numberFixed = 5
            return Number(regExp[6]) > 21
              ? formula.toExponential()
              : Number(formula.toFixed(numberFixed))
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[3].length) > 1) numberFixed = Number(regExp[3].length) + 6
            else numberFixed = 7
            return Number(formula.toFixed(numberFixed))
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            if(Number(regExp[4]) === 1) numberFixed = 6
            else if(Number(regExp[4]) === 2) numberFixed = 5
            else numberFixed = 4
            return Number(regExp[4]) > 21
            ? formula.toExponential()
            : Number(formula.toFixed(numberFixed))
          }else{
            const regExp = targetToString.match(/(\d+)/);
            if(Number(regExp[1].length) === 1) numberFixed = 7
            else if(Number(regExp[1].length) === 2) numberFixed = 6
            else numberFixed = 5
            return Number(formula.toFixed(numberFixed))
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx1dot852(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 19
              ? formula.toExponential()
              : formula
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[3].length) > 1) numberFixed = Number(regExp[3].length) + 3
            else numberFixed = 4;
            return Number(formula.toFixed(numberFixed))
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            return Number(regExp[4]) > 19
              ? formula.toExponential()
              : (Number(regExp[4]) === 2)
                ? Number(formula.toFixed(1))
                : formula
          }else return Number(formula.toFixed(3))
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx1852(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 16
              ? formula.toExponential()
              : formula
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[3].length) > 1) numberFixed = Number(regExp[3].length)
            else numberFixed = 1
          return Number(formula.toFixed(numberFixed))
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            return Number(regExp[4]) > 2
              ? formula.toExponential()
              : formula
          }else return formula
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx1dot151(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            return Number(regExp[6]) > 19
              ? formula.toExponential()
              : (Number(regExp[6]) === 1)
                ? formula.toFixed(4)
                : (regExp[6].match(/(11|15)/))
                  ? formula.toFixed(2)
                  : Number(formula.toFixed(3))
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[1]) === 0 || regExp[1] === ""){
              if(Number(regExp[1].length) > 1) numberFixed = Number(regExp[1].length) + 5
              else numberFixed = 6
            }else{
              if(regExp[1].match(/^(0+)(\d+)/) || Number(regExp[3].length) > 1) {
                numberFixed = Number(regExp[0].length) + 2
              }else numberFixed = 5
            }
            return Number(formula.toFixed(numberFixed))
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            return Number(regExp[4]) > 19
            ? formula.toExponential()
            : (Number(regExp[4]) === 1)
              ? formula.toFixed(4)
              : (Number(regExp[4]) === 2)
                ? formula.toFixed(3)
                : (Number(regExp[4] > 15))
                  ? Number(formula.toFixed())
                  : Number(formula.toFixed(2))
          }else{
            const regExp = targetToString.match(/(\d+)/);
            if(Number(regExp[1].length) === 1) numberFixed = 5
            else if(Number(regExp[1].length) === 2) numberFixed = 4
            else numberFixed = 3
            return formula.toFixed(numberFixed)
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx2025x6076(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            if(Number(regExp[6]) === 1) numberFixed = 1
            else numberFixed = 0;
            return Number(regExp[6]) > 16
              ? formula.toExponential()
              : formula.toFixed(numberFixed)
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[1]) === 0 || Number(regExp[1]) === ""){
              if(Number(regExp[1].length) > 1) numberFixed = Number(regExp[1].length) + 2
              else numberFixed = 3 
            }else{
              if(regExp[1].match(/(0+)/) || Number(regExp[3].length) > 1) {
                numberFixed = Number(regExp[0].length) - 1
              }else numberFixed = 2
            }
            return formula.toFixed(numberFixed)
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            if(Number(regExp[4]) >= 2 && Number(regExp[4]) < 17) numberFixed = Number(regExp[4])
            else numberFixed = 16
            return Number(regExp[4]) === 1
              ? Number(formula.toFixed(1))
              : Number(regExp[4]) === 2
                ? Number(formula.toFixed())
                : formula.toExponential(numberFixed)
          }else{
            const regExp = targetToString.match(/(\d+)/);
            if(Number(regExp[1]) < 5) numberFixed = 2
            else if(Number(regExp[1]) >= 5 && Number(regExp[1]) < 43) numberFixed = 1
            else numberFixed = 0

            return Number(formula.toFixed(numberFixed))
          }
        }
      }else return ""
    }
  }else return ""
}

function formatSimpleProductx72910(target, formula){
  if(target){
    if(Number(target[0]) === 0) return 0
    else{        
      if(formula && formula !== Infinity){
        const targetToString = target.toString() 
        let numberFixed
        if(targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)\d+)?/)){
          if(targetToString.match(/(e(-?|\+?)\d+)/)){
            const regExp = targetToString.match(/(\d*)(\.)(\d+)(e(-?|\+?)(\d+))/)
            if(Number(regExp[6]) >= 3 && Number(regExp[6]) < 17) numberFixed = Number(regExp[6]) + 1
            else numberFixed = 2
            return Number(regExp[6]) > 1
              ? formula.toExponential(numberFixed)
              : formula.toFixed()
          }else{
            const regExp = targetToString.match(/(\d*)(\.)(\d+)/)
            if(Number(regExp[1]) === 0 || Number(regExp[1]) === ""){
              if(Number(regExp[1].length) > 1) numberFixed = Number(regExp[1].length) + 1
              else numberFixed = 2
            }else{
              if(regExp[1].match(/(0+)/) || Number(regExp[3].length) > 1) {
                numberFixed = Number(regExp[0].length) - 2
              }else numberFixed = 1
            }
            return formula.toFixed(numberFixed)
          }
        }else{
          if(targetToString.match(/(\d+)(e(-?|\+?)(\d+))/)){
            const regExp = targetToString.match(/(\d+)(e(-?|\+?)(\d+))/);
            if(Number(regExp[4]) >= 3 && Number(regExp[4]) < 17) numberFixed = Number(regExp[4])
            else numberFixed = 3
            return Number(regExp[4]) > 1
              ? formula.toExponential(numberFixed)
              : formula.toFixed()
          }else{
            const regExp = targetToString.match(/(\d+)/);
            return Number(regExp[1]) === 1
              ? formula.toFixed(1)
              : Number(regExp[1]) < 14
                ? formula.toFixed()
                : formula.toExponential(3)
          }
        }
      }else return ""
    }
  }else return ""
}

export const formulas = (target_input) => {
  return new Map (
    [
      ["Frecuencia", {
        measures: new Map (
          [
            ["Hercio", new Map (
              [
                ["Kilohercio",
                  {
                    formula_value: `${formatSimpleDivision(target_input, (target_input / 1000))}`,
                    formula_title: {
                      single: `Divide el valor de frecuencia entre 1000`
                    }
                  }
                ],
                ["Megahercio", {
                    formula_value: formatComplexDivisionx6(target_input, target_input / (1 * Math.pow(10,+6))),
                    formula_title: {
                      single: `Divide el valor de frecuencia entre 1e+6`
                    }
                  }
                ],
                ["Gigahercio", {
                    formula_value: formatComplexDivisionx9(target_input, target_input / (1 * Math.pow(10,+9))),
                    formula_title: {
                      single: `Divide el valor de frecuencia entre 1e+9`
                    }
                  }
                ]
              ]
            )],
            ["Kilohercio", new Map ( 
              [
                ["Hercio", {
                    formula_value: `${formatSimpleProduct(target_input, target_input * 1000)}`,
                    formula_title: {
                      single: `Multiplicar el valor de frecuencia por 1000`
                    }
                  }
                ],
                ["Megahercio", {
                    formula_value: `${formatSimpleDivision(target_input, (target_input / 1000))}`,
                    formula_title: {
                      single: `Divide el valor de frecuencia entre 1000`
                    }
                  }
                ],
                ["Gigahercio", {
                    formula_value: formatComplexDivisionx6(target_input, target_input / (1 * Math.pow(10, +6))),
                    formula_title: {
                      single: `Divide el valor de frecuencia entre 1e+6`
                    }
                  }
                ]
              ]
            )],
            ["Megahercio", new Map (
              [
                ["Hercio", {
                    formula_value: formatComplexProductx6(target_input, target_input * (1 * Math.pow(10, +6))),
                    formula_title: {
                      single: `Multiplicar el valor de frecuencia por 1e+6`
                    }
                  }
                ],
                ["Kilohercio", {
                    formula_value: `${formatSimpleProduct(target_input, target_input * 1000)}`,
                    formula_title: {
                      single: `Multiplicar el valor de frecuencia por 1000`
                    }
                  }
                ],
                ["Gigahercio", {
                    formula_value: `${formatSimpleDivision(target_input, (target_input / 1000))}`,
                    formula_title: {
                      single: `Divide el valor de frecuencia por 1000`
                    }
                  }
                ]
              ]
            )],
            ["Gigahercio", new Map (
              [
                ["Hercio", {
                    formula_value: formatComplexProductx9(target_input, target_input * (1 * Math.pow(10, +9))),
                    formula_title: {
                      single: `Multiplicar el valor de frecuencia por 1e+9`
                    }
                  }
                ],
                ["Kilohercio", {
                    formula_value: formatComplexDivisionx6(target_input, target_input * (1 * Math.pow(10, +6))),
                    formula_title: {
                      single: `Multiplicar el valor de frecuencia por 1e+6`
                    }
                  }
                ],
                ["Megahercio", {
                    formula_value: `${formatSimpleProduct(target_input, target_input * 1000)}`,
                    formula_title: {
                      single: `Multiplicar el valor de frecuencia por 1000`
                    }
                  }
                ]
              ]
            )
            ]
          ]
        ),
        default_value: {
          value: 1
        },
        default_index: {
          select_one: 0,
          select_two: 1
        }
      }],
      ["Longitud", {
        measures: new Map (
          [
            ["Kilómetro", new Map(
              [
                ["Metro", {
                  formula_value: `${formatSimpleProduct(target_input, target_input * 1000)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1000"
                  }
                }],
                ["Centímetro", {
                  formula_value: `${formatSimpleProductx100000(target_input, target_input * 100000)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 100000"
                  }
                }],
                ["Milímetro", {
                  formula_value: `${formatComplexProductx6(target_input, target_input * (1 * Math.pow(10,+6)))}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1e+6"
                  }
                }],
                ["Micrómetro", {
                  formula_value: `${formatComplexProductx9(target_input, target_input * (1 * Math.pow(10,+9)))}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1e+9"
                  }
                }],
                ["Nanómetro", {
                  formula_value: `${formatComplexProductx12(target_input, target_input * (1 * Math.pow(10,+12)))}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 1e+12"
                  }
                }],
                ["Milla", {
                  formula_value: `${formatSimpleDivisionx1609x1760(target_input, target_input / 1.609344)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 1.609"
                  }
                }],
                ["Yarda", {
                  formula_value: `${formatSimpleProductxLong(target_input, Number(target_input) * 1093.6132983377, 915)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 1094"
                  }
                }],
                ["Pie", {
                  formula_value: `${formatSimpleProductxLong(target_input, Number(target_input) * 3280.84, 305)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 3281"
                  }
                }],
                ["Pulgada", {
                  formula_value: `${formatSimpleProductx39370(target_input, target_input * 39370.0787401575)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 39370"
                  }
                }],
                ["Milla náutica", {
                  formula_value: `${formatSimpleDivisionx1852(target_input, target_input / 1.852)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1.852"
                  }
                }]
              ]
            )],
            ["Metro", new Map(
              [
                ["Kilómetro", {
                  formula_value: `${formatSimpleDivisionLong(target_input, target_input / 1000)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1000"
                  }
                }],
                ["Centímetro", {
                  formula_value: `${formatSimpleProductx100(target_input, target_input * 100)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 100"
                  }
                }],
                ["Milímetro", {
                  formula_value: `${formatSimpleProduct(target_input, target_input * 1000)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1000"
                  }
                }],
                ["Micrómetro", {
                  formula_value: `${formatComplexProductx6(target_input, target_input * (1 * Math.pow(10,+6)))}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1e+6"
                  }
                }],
                ["Nanómetro", {
                  formula_value: `${formatComplexProductx9(target_input, target_input * (1 * Math.pow(10,+9)))}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 1e+9"
                  }
                }],
                ["Milla", {
                  formula_value: `${formatSimpleDivisionx1609x1760(target_input, target_input / 1.609344)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 1609"
                  }
                }],
                ["Yarda", {
                  formula_value: `${formatSimpleProductx1094x3281(target_input, target_input * 1.0936132983377)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 1.094"
                  }
                }],
                ["Pie", {
                  formula_value: `${formatSimpleProductx1094x3281(target_input, target_input * 3.280839895)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 3.281"
                  }
                }],
                ["Pulgada", {
                  formula_value: `${formatSimpleProductx3937(target_input, target_input * 39.37007874)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 39.37"
                  }
                }],
                ["Milla náutica", {
                  formula_value: `${formatSimpleDivisionx1852(target_input, target_input / 1852)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1852"
                  }
                }]
              ]
            )],
            ["Centímetro", new Map(
              [
                ["Kilómetro", {
                  formula_value: `${formatSimpleDivisionx100000(target_input, target_input / 100000)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 100000"
                  }
                }],
                ["Metro", {
                  formula_value: `${formatSimpleDivisionx100(target_input, target_input / 100)}`,
                  formula_title: {
                    single: "Divide el valor de longitud por 100"
                  }
                }],
                ["Milímetro", {
                  formula_value: `${formatSimpleProductx3x10x12x36(target_input, target_input * 10)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 10"
                  }
                }],
                ["Micrómetro", {
                  formula_value: `${formatSimpleProductx10000x63360x254000(target_input, target_input * 10000)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 10000"
                  }
                }],
                ["Nanómetro", {
                  formula_value: `${formatComplexDivisionx7(target_input, target_input * (1 * Math.pow(10,+7)))}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1e+7"
                  }
                }],
                ["Milla", {
                  formula_value: `${formatSimpleDivisionxhundredsOfThousands(target_input, target_input / 160934.4)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 160900"
                  }
                }],
                ["Yarda", {
                  formula_value: `${formatSimpleDivisionx9144x3048(target_input, target_input / 91.44)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 91.44"
                  }
                }],
                ["Pie", {
                  formula_value: `${formatSimpleDivisionx9144x3048(target_input, target_input / 30.48)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 30.48"
                  }
                }],
                ["Pulgada", {
                  formula_value: `${formatSimpleDivisionx254(target_input, target_input / 2.54)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 2.54"
                  }
                }],
                ["Milla náutica", {
                  formula_value: `${formatSimpleDivisionxhundredsOfThousands(target_input, target_input / 185200)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 185200"
                  }
                }]
              ]
            )],
            ["Milímetro", new Map(
              [
                ["Kilómetro", {
                  formula_value: `${formatComplexDivisionx6(target_input, target_input / (1 * Math.pow(10,+6)))}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1e+6"
                  }
                }],
                ["Metro", {
                  formula_value: `${formatSimpleDivisionLong(target_input, target_input / 1000)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1000"
                  }
                }],
                ["Centímetro", {
                  formula_value: `${formatSimpleDivisionx10(target_input, target_input / 10)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 10"
                  }
                }],
                ["Micrómetro", {
                  formula_value: `${formatSimpleProduct(target_input, target_input * 1000)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1000"
                  }
                }],
                ["Nanómetro", {
                  formula_value: `${formatComplexDivisionx6(target_input, target_input * (1 * Math.pow(10,+6)))}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1e+6"
                  }
                }],
                ["Milla", {
                  formula_value: `${formatComplexDivisionx6(target_input, target_input / (1.609 * Math.pow(10,+6)))}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 1.609e+6"
                  }
                }],
                ["Yarda", {
                  formula_value: `${formatSimpleDivisionx914x304(target_input, target_input / 914.4)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 914.4"
                  }
                }],
                ["Pie", {
                  formula_value: `${formatSimpleDivisionx914x304(target_input, target_input / 304.8)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 304.8"
                  }
                }],
                ["Pulgada", {
                  formula_value: `${formatSimpleDivisionx25(target_input, target_input / 25.4)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 25.4"
                  }
                }],
                ["Milla náutica", {
                  formula_value: `${formatComplexDivisionx6(target_input, target_input / (1.852 * Math.pow(10,+6)))}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1.852e+6"
                  }
                }]
              ]
            )],
            ["Micrómetro", new Map(
              [
                ["Kilómetro", {
                  formula_value: `${formatComplexDivisionx9(target_input, target_input / (1 * Math.pow(10,+9)))}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1e+9"
                  }
                }],
                ["Metro", {
                  formula_value: `${formatComplexDivisionx6(target_input, target_input / (1 * Math.pow(10,+6)))}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1e+6"
                  }
                }],
                ["Centímetro", {
                  formula_value: `${(target_input / 10000).toExponential()}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 10000"
                  }
                }],
                ["Milímetro", {
                  formula_value: `${formatSimpleDivisionLong(target_input, target_input / 1000)}`,
                  formula_title: {
                    single: "Divide el valor de longitud por 1000"
                  }
                }],
                ["Nanómetro", {
                  formula_value: `${formatSimpleProduct(target_input, target_input * 1000)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1000"
                  }
                }],
                ["Milla", {
                  formula_value: `${formatComplexDivisionx9(target_input, target_input / (1.609 * Math.pow(10,+9)))}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 1.609e+9"
                  }
                }],
                ["Yarda", {
                  formula_value: `${formatSimpleDivisionxhundredsOfThousands(target_input, target_input / 914400)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 914400"
                  }
                }],
                ["Pie", {
                  formula_value: `${formatSimpleDivisionxhundredsOfThousands(target_input, target_input / 304800)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 304800"
                  }
                }],
                ["Pulgada", {
                  formula_value: `${formatSimpleDivisionx25400(target_input, target_input / 25400)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 25400"
                  }
                }],
                ["Milla náutica", {
                  formula_value: `${formatComplexDivisionx9(target_input, target_input / (1.852 * Math.pow(10,+9)))}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1.852e+9"
                  }
                }]
              ]
            )],
            ["Nanómetro", new Map(
              [
                ["Kilómetro", {
                  formula_value: `${formatComplexDivisionx12(target_input, target_input / (1 * Math.pow(10,+12)))}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1e+12"
                  }
                }],
                ["Metro", {
                  formula_value: `${formatComplexDivisionx9(target_input, target_input / (1 * Math.pow(10,+9)))}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1e+9"
                  }
                }],
                ["Centímetro", {
                  formula_value: `${formatComplexDivisionx7(target_input, target_input / (1 * Math.pow(10,+7)))}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1e+7"
                  }
                }],
                ["Milímetro", {
                  formula_value: `${formatComplexDivisionx6(target_input, target_input / (1 * Math.pow(10,+6)))}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1e+6"
                  }
                }],
                ["Micrómetro", {
                  formula_value: `${formatSimpleDivisionLong(target_input, target_input / 1000)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1000"
                  }
                }],
                ["Milla", {
                  formula_value: `${formatComplexDivisionx12(target_input, target_input / (1.609344 * Math.pow(10,+12)))}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 1.609e+12"
                  }
                }],
                ["Yarda", {
                  formula_value: `${formatComplexDivisionx8(target_input, target_input / (9.144 * Math.pow(10,+8)))}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 9.144e+8"
                  }
                }],
                ["Pie", {
                  formula_value: `${formatComplexDivisionx8(target_input, target_input / (3.048 * Math.pow(10,+8)))}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 3.048e+8"
                  }
                }],
                ["Pulgada", {
                  formula_value: `${formatComplexDivisionx7(target_input, target_input / (2.54 * Math.pow(10,+7)))}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 2.54e+7"
                  }
                }],
                ["Milla náutica", {
                  formula_value: `${formatComplexDivisionx12(target_input, target_input / (1.852 * Math.pow(10,+12)))}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1.852e+12"
                  }
                }]
              ]
            )],
            ["Milla", new Map(
              [
                ["Kilómetro", {
                  formula_value: `${formatSimpleProductx1609x1760(target_input, target_input * 1.609344)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 1.609"
                  }
                }],
                ["Metro", {
                  formula_value: `${formatSimpleProductx1609x1760(target_input, target_input * 1.609344)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 1609"
                  }
                }],
                ["Centímetro", {
                  formula_value: `${formatSimpleProductx160900x185200(target_input, target_input * 160934.4)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 160900"
                  }
                }],
                ["Milímetro", {
                  formula_value: `${formatComplexProductx6(target_input, target_input * (1.609 * Math.pow(10,+6)))}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 1.609e+6"
                  }
                }],
                ["Micrómetro", {
                  formula_value: `${formatComplexProductx9(target_input, target_input * (1.609 * Math.pow(10,+9)))}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 1.609e+9"
                  }
                }],
                ["Nanómetro", {
                  formula_value: `${formatComplexProductx12(target_input, target_input * (1.609 * Math.pow(10,+12)))}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 1.609e+12"
                  }
                }],
                ["Yarda", {
                  formula_value: `${formatSimpleProductx1609x1760(target_input, target_input * 1760)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1760"
                  }
                }],
                ["Pie", {
                  formula_value: `${formatSimpleProductx1609x1760(target_input * 5280)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 5280"
                  }
                }],
                ["Pulgada", {
                  formula_value: `${formatSimpleProductx10000x63360x254000(target_input, target_input * 63360)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 63360"
                  }
                }],
                ["Milla náutica", {
                  formula_value: `${formatSimpleDivisionx1151x3281(target_input, target_input / 1.15078)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 1.151"
                  }
                }]
              ]
            )],
            ["Yarda", new Map(
              [
                ["Kilómetro", {
                  formula_value: `${formatSimpleDivisionx1609x1760(target_input, target_input / 1094)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 1094"
                  }
                }],
                ["Metro", {
                  formula_value: `${formatSimpleDivisionx1609x1760(target_input, target_input / 1.094)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 1.094"
                  }
                }],
                ["Centímetro", {
                  formula_value: `${formatSimpleProductx9144x3048(target_input, target_input * 91.44)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 91.44"
                  }
                }],
                ["Milímetro", {
                  formula_value: `${formatSimpleProductx914(target_input, target_input * 914.4)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 914.4"
                  }
                }],
                ["Micrómetro", {
                  formula_value: `${formatSimpleProductx914400(target_input, target_input * 914400)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 914400"
                  }
                }],
                ["Nanómetro", {
                  formula_value: `${formatComplexProductx8(target_input, target_input * (9.144 * Math.pow(10,+8)))}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 9.144e+8"
                  }
                }],
                ["Milla", {
                  formula_value: `${formatSimpleDivisionx1609x1760(target_input, target_input / 1760)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 1760"
                  }
                }],
                ["Pie", {
                  formula_value: `${formatSimpleProductx3x10x12x36(target_input, target_input * 3)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 3"
                  }
                }],
                ["Pulgada", {
                  formula_value: `${formatSimpleProductx3x10x12x36(target_input, target_input * 36)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 36"
                  }
                }],
                ["Milla náutica", {
                  formula_value: `${formatSimpleDivisionx2025(target_input, target_input /  2025.3718285214)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 2025"
                  }
                }]
              ]
            )],
            ["Pie", new Map(
              [
                ["Kilómetro", {
                  formula_value: `${formatSimpleDivisionx3281(target_input, target_input / 3280.83989)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 3281"
                  }
                }],
                ["Metro", {
                  formula_value: `${formatSimpleDivisionx1151x3281(target_input, target_input / 3.280839895)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 3.281"
                  }
                }],
                ["Centímetro", {
                  formula_value: `${formatSimpleProductx9144x3048(target_input, target_input * 30.48)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 30.48"
                  }
                }],
                ["Milímetro", {
                  formula_value: `${formatSimpleProductx304(target_input, target_input * 304.8)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 304.8"
                  }
                }],
                ["Micrómetro", {
                  formula_value: `${formatSimpleProductx304000(target_input, target_input * 304800)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 304800"
                  }
                }],
                ["Nanómetro", {
                  formula_value: `${formatComplexProductx8(target_input, target_input * (3.048 * Math.pow(10,+8)))}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 3.048e+8"
                  }
                }],
                ["Milla", {
                  formula_value: `${formatSimpleDivisionx5280x6076(target_input, target_input / 5280)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 5280"
                  }
                }],
                ["Yarda", {
                  formula_value: `${formatSimpleDivisionx3(target_input, target_input / 3)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 3"
                  }
                }],
                ["Pulgada", {
                  formula_value: `${formatSimpleProductx3x10x12x36(target_input, target_input * 12)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 12"
                  }
                }],
                ["Milla náutica", {
                  formula_value: `${formatSimpleDivisionx5280x6076(target_input, target_input / 6076.11548556429)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 6076"
                  }
                }]
              ]
            )],
            ["Pulgada", new Map(
              [
                ["Kilómetro", {
                  formula_value: `${formatSimpleDivisionx39370(target_input, target_input / 39370.078740157)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 39370"
                  }
                }],
                ["Metro", {
                  formula_value: `${formatSimpleDivisionx39(target_input, target_input / 39.37)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 39.37"
                  }
                }],
                ["Centímetro", {
                  formula_value: `${formatSimpleProductx2(target_input, target_input * 2.54)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 2.54"
                  }
                }],
                ["Milímetro", {
                  formula_value: `${formatSimpleProductx25(target_input,target_input * 25.4)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 25.4"
                  }
                }],
                ["Micrómetro", {
                  formula_value: `${formatSimpleProductx10000x63360x254000(target_input, target_input * 25400)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 25400"
                  }
                }],
                ["Nanómetro", {
                  formula_value: `${formatComplexProductx7(target_input, target_input * (2.54 * Math.pow(10,+7)))}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 2.54e+7"
                  }
                }],
                ["Milla", {
                  formula_value: `${formatSimpleDivisionx63360x72910(target_input, target_input / 63360)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 63360"
                  }
                }],
                ["Yarda", {
                  formula_value: `${formatSimpleDivisionx12x36(target_input, target_input / 36)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 36"
                  }
                }],
                ["Pie", {
                  formula_value: `${formatSimpleDivisionx12x36(target_input, target_input / 12)}`,
                  formula_title: {
                    single: "Divide el valor de longitud entre 12"
                  }
                }],
                ["Milla náutica", {
                  formula_value: `${formatSimpleDivisionx63360x72910(target_input, target_input / 72913.385826772)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, divide el valor de longitud entre 72910"
                  }
                }]
              ]
            )],
            ["Milla náutica", new Map(
              [
                ["Kilómetro", {
                  formula_value: `${formatSimpleProductx1dot852(target_input, target_input * 1.852)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1.852"
                  }
                }],
                ["Metro", {
                  formula_value: `${formatSimpleProductx1852(target_input, target_input * 1852)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1852"
                  }
                }],
                ["Centímetro", {
                  formula_value: `${formatSimpleProductx160900x185200(target_input, target_input * 185200, true)}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 185200"
                  }
                }],
                ["Milímetro", {
                  formula_value: `${formatComplexProductx6(target_input, target_input * (1.852 * Math.pow(10,+6)))}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1.852e+6"
                  }
                }],
                ["Micrómetro", {
                  formula_value: `${formatComplexProductx9(target_input, target_input * (1.852 * Math.pow(10,+9)))}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1.852e+9"
                  }
                }],
                ["Nanómetro", {
                  formula_value: `${formatComplexProductx12(target_input, target_input * (1.852 * Math.pow(10,+12)))}`,
                  formula_title: {
                    single: "Multiplicar el valor de longitud por 1.852e+12"
                  }
                }],
                ["Milla", {
                  formula_value: `${formatSimpleProductx1dot151(target_input, target_input * 1.1507794479326334)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 1.151"
                  }
                }],
                ["Yarda", {
                  formula_value: `${formatSimpleProductx2025x6076(target_input, target_input * 2025.371806)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 2025"
                  }
                }],
                ["Pie", {
                  formula_value: `${formatSimpleProductx2025x6076(target_input, target_input * 6076.11548556429)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 6076"
                  }
                }],
                ["Pulgada", {
                  formula_value: `${formatSimpleProductx72910(target_input, target_input * 72913.385826772)}`,
                  formula_title: {
                    single: "Para obtener un resultado aproximado, multiplica el valor de longitud por 72910"
                  }
                }]
              ]
            )]
          ]
        ),
        default_value: {
          value: 1
        },
        default_index: {
          select_one: 1,
          select_two: 2
        }
      }],
      ["Temperatura", {
        measures: new Map (
          [
            ["Grado Celcius", new Map(
              [
                ["Grado Farenheith", {
                  formula_value: `${Number(((target_input * 9 / 5) + 32).toFixed(4))}`,
                  formula_title: {
                    complex: {
                      operation: `(${formatValueTemp(target_input)} <b>°C</b> × 9/5) + 32 = `, 
                      result: `${formatResultTemp(target_input, (Number(target_input) * 9 / 5) + 32, 8, 1, 6)} `,
                      unit: `<b>°F</b>`
                    }
                  }
                }],
                ["Kelvin", {
                  formula_value: `${Number((Number(target_input) + 273.15).toFixed(4))}`,
                  formula_title: {
                    complex: {
                      operation: `${formatValueTemp(target_input)} <b>°C</b> + 273.15 = `,
                      result: `${formatResultTemp(target_input, Number(target_input) + 273.15, 8, 2)} `,
                      unit: `<b>K</b>`
                    }
                  },
                }]
              ]
            )],
            ["Grado Farenheith", new Map(
              [
                ["Grado Celcius", {
                  formula_value: `${formatLiveResult(((target_input) - 32) * 5 / 9)}`,
                  formula_title: {
                    complex: {
                      operation: `(${formatValueTemp(target_input)} <b>°F</b> − 32) × 5/9 = `,
                      result: `${formatResultTemp(target_input, formatLiveResult(((target_input) - 32) * 5 / 9), 10, 2)} `,
                      unit: `<b>°C</b>`
                    }
                  }
                }],
                ["Kelvin", {
                  formula_value: `${Number(((target_input - 32) * 5 / 9 + 273.15).toFixed(3))}`,
                  formula_title: {
                    complex: {
                      operation: `(${formatValueTemp(target_input)} <b>°F</b> − 32) × 5/9 + 273.15 = `,
                      result: `${formatResultTemp(target_input, ((Number(target_input) - 32) * 5 / 9) + 273.15, 10, 3)} `,
                      unit: `<b>K</b>`
                    }
                  }
                }]
              ]
            )],
            ["Kelvin", new Map(
              [
                ["Grado Celcius", {
                  formula_value: `${Number(((target_input) - 273.15).toFixed(4))}`,
                  formula_title: {
                    complex: {
                      operation: `${formatValueTemp(target_input)} <b>K</b> − 273.15 = `,
                      result: `${formatResultTemp(target_input, Number(target_input) - 273.15, 9, 2)} `,
                      unit: `<b>°C</b>`
                    }
                  }
                }],
                ["Grado Farenheith", {
                  formula_value: `${Number(((target_input - 273.15) * 9 / 5 + 32).toFixed(4))}`,
                  formula_title: {
                    complex: {
                      operation: `(${formatValueTemp(target_input)} <b>K</b> − 273.15) × 9/5 + 32 = `,
                      result: `${formatResultTemp(target_input, (Number(target_input) - 273.15) * 9 / 5 + 32 , 9, 2)} `,
                      unit: `<b>°F</b>`
                    }
                  }
                }]
              ]
            )]
          ]
        ),
        default_value: {
          value: 0
        },
        default_index: {
          select_one: 0,
          select_two: 1
        }
      }]
    ]
  );
}