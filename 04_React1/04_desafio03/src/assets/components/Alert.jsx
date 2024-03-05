import "bootstrap/dist/css/bootstrap.min.css";

const Alert = ({ showAlert, CorrectCreation }) => {
    return (
        <>
            {showAlert ? 
                CorrectCreation ? 
                    <p className="m-2 p-2 text-light bg-success rounded">¡Colaborador agregado!</p>
                    : <p className="m-2 p-2 text-light bg-danger rounded">Hay campos incorrectos</p>
                : ""
            }
        </>
    )
};
export default Alert;