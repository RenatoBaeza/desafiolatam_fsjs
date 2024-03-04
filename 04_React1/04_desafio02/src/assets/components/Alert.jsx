import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const Alert = ({ showAlert, CorrectCreation }) => {
    return (
        <>
            {showAlert ? 
                CorrectCreation ? 
                    <p className="m-2 p-2 text-light bg-success rounded">¡Cuenta creada exitosamente!</p>
                    : <p className="m-2 p-2 text-light bg-danger rounded">Hay campos incorrectos</p>
                : ""
            }
        </>
    )
};
export default Alert;
