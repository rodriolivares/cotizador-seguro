import useCotizador from "../hooks/useCotizador"
import { MARCAS, PLANES, YEARS } from '../constants'
import { useCallback, useMemo, useRef } from "react"

const Resultado = () => {
   const { resultado, datos } = useCotizador()
   const { marca, plan, year } = datos

   
   const [nombreMarca] = useMemo( () =>
      MARCAS.filter( m => m.id === Number(marca)),
      [resultado]
   )
   const [nombrePlan] = useCallback(
      PLANES.filter( p => p.id === Number(plan) ),
      [resultado]
   )
   const yearRef = useRef(year)
    
   if(resultado === 0) return null
   return (
      <div className="bg-grey-300 text-center mt-5 p-5 shadow">
         <h2 className="text-gray-600 font-black text-3xl">Resumen</h2>
         <p className="my-2">
            <span className="font-bold">Marca: </span>
            {nombreMarca.nombre}
         </p>
         <p className="my-2">
            <span className="font-bold">Plan: </span>
            {nombrePlan.nombre}
         </p>
         <p className="my-2">
            <span className="font-bold">Año: </span>
            {yearRef.current}
         </p>
         <p className="my-2 text-2xl">
            <span className="font-bold">Total de la Cotización: </span>
            {resultado}
         </p>
      </div>
   )
}

export default Resultado