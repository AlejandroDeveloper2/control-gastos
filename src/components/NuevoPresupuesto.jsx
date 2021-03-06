import {useState} from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
    const [mensaje, setMensaje]=useState('');
    //cuando el usuario envia el formulario
    const handleSubmit=e=>{
        e.preventDefault();
        //validar
        if(!presupuesto || presupuesto<0){
            setMensaje('No es un presupuesto valido!');
            return;
        }
        setMensaje('');
        setIsValidPresupuesto(true);


       
    }
    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handleSubmit} className="formulario">
                <div className="campo">
                    <label htmlFor="presupuesto">Definir Presupuesto</label>
                    <input 
                        id="presupuesto"
                        className="nuevo-presupuesto"
                        type="number" 
                        placeholder="Añade tu presupuesto"
                        onChange={(e)=>setPresupuesto(Number(e.target.value))}
                        value={presupuesto}
                    />
                </div>
                <input type="submit" value="Añadir"/>
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
                   
            </form>
        </div>
    );
};

export default NuevoPresupuesto;