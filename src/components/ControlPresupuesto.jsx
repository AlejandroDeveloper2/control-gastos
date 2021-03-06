import {formatearCantidad} from '../helpers'
import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto}) => {
    const [disponible, setDisponible]=useState(0);
    const [gastado, setGastado]=useState(0);
    const [porcentaje, setPorcentaje]=useState(0);
    const [colorPath, setColorPath]=useState('');

    
    useEffect(() => {
        const totalGastado=gastos.reduce((total, gasto)=>Number(gasto.cantidad)+ total, 0);
        setGastado(totalGastado);
        const totalDisponible=presupuesto-totalGastado;
        setDisponible(totalDisponible);

        //calcular el porcentaje
        let porcentajeGastado=(((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2);
        
        setTimeout(() =>{
            setPorcentaje(porcentajeGastado);
            //definir el color de la grafica dependiendo del porcentaje
            if(porcentajeGastado <=50){
                setColorPath('#3B82F6')
            }else if(porcentajeGastado > 50 && porcentajeGastado <= 75 ){
                setColorPath('#D9C218')
            }else if(porcentajeGastado > 75){
                setColorPath('#8D510C')
            }
            },1500)
        
    }, [gastos])
    
    const handleResetApp=()=>{
        const resultado=confirm('¿Deseas reiniciar presupuesto y gastos?')
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false);
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor:colorPath,
                        trailColor:'#F5F5F5',
                        textColor:colorPath
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}

                />             
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>  
                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo':''}`}>
                    <span>Disponible:</span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                </p>
            </div>
            
        </div>
    );
};

export default ControlPresupuesto;