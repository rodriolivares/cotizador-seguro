import { useState, createContext } from "react"
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from "../helpers"

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {
   const [datos, setDatos] = useState({
      marca: '',
      year: '',
      plan: ''
   })
   const [error, setError] = useState('')
   const [resultado, setResultado] = useState(0)
   const [cargando, setCargando] = useState(null);
   const handleChangeDatos = e => {
      setDatos({
         ...datos,
         [e.target.name]: e.target.value
      });
   }
   const cotizarSeguro = () => {
      setCargando(true)
      let resultado = 2000
      const diferencia = obtenerDiferenciaYear(datos.year)
      resultado -= ((diferencia * 3) * resultado) / 100
      resultado *= calcularMarca(datos.marca)
      resultado *= calcularPlan(datos.plan)
      resultado = formatearDinero(resultado);
      setTimeout(() => {
         setResultado(resultado);
         setCargando(false)
      }, 3000);
   }
   return(
      <CotizadorContext.Provider
         value={{
            datos,
            handleChangeDatos,
            error, 
            setError,
            cotizarSeguro,
            resultado,
            cargando, 
            setCargando
         }}
      >
         {children}
      </CotizadorContext.Provider>
   )
}
export {
   CotizadorProvider
}
export default CotizadorContext