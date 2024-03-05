import React from 'react';
import Table from 'react-bootstrap/Table'
import BaseColaboradores from './BaseColaboradores.js'

const Listado = ({ searchTerm }) => {
    return (
    <div className='my-4'>
        <h4>Listado de colaboradores</h4>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Edad</th>
                <th>Cargo</th>
                <th>Teléfono</th>
                </tr>
            </thead>
            <tbody>
            {BaseColaboradores.filter((colaborador) => 
                    colaborador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    colaborador.cargo.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((colaborador) => (
            <tr key={colaborador.id}>
                <td>{colaborador.id}</td>
                <td>{colaborador.nombre}</td>
                <td>{colaborador.correo}</td>
                <td>{colaborador.edad}</td>
                <td>{colaborador.cargo}</td>
                <td>{colaborador.telefono}</td>
            </tr>
                ))}
            </tbody>
        </Table>
    </div>
    );
};

export default Listado;
