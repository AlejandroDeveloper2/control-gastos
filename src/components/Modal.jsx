import { useState, useEffect } from 'react';
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje';

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {
    const [mensaje, setMensaje]=useState('');
    const [gasto, setGasto]=useState({
        nombre:'',
        cantidad:0,
        categoria:''
    });
    const [id, setId]=useState('');
    const [fecha, setFecha]=useState('')
    const {nombre, cantidad, categoria}=gasto;
    const handleGasto=e=>{
        setGasto({...gasto, [e.target.name]:e.target.value});
    }
    const handleSubmit=e=>{
        e.preventDefault();
        //validacion
        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios!')
            setTimeout(()=>{
                setMensaje('')
            }, 3000)
            return;
        }
        setMensaje('')

        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }  
    useEffect(()=>{
        if(Object.keys(gastoEditar).length > 0){
            setGasto(gastoEditar);
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[])
    const ocultarModal=()=>{
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(()=>{
            setModal(false)
        }, 500);
    }
        
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn} 
                    alt="Cerrar ventana" 
                    onClick={ocultarModal}
                />
            </div>
            <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar':'cerrar' }`}>
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        id="nombre"
                        name="nombre"
                        type="text" 
                        value={nombre}
                        onChange={handleGasto}
                        placeholder="Añade el nombre del gasto"
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        id="cantidad"
                        name="cantidad"
                        type="number" 
                        value={cantidad}
                        onChange={handleGasto}
                        placeholder="Añade la cantidad del gasto ej: 300"
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select 
                        name="categoria" 
                        id="categoria"
                        value={categoria}
                        onChange={handleGasto}
                    >
                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="casa">Casa</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input 
                    type="submit" 
                    value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
                />
                {mensaje &&  <Mensaje tipo='error'>{mensaje}</Mensaje> }
            </form>
        </div>
    );
};

export default Modal;
