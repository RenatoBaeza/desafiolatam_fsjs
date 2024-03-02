/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";

const Listado = ({iconA, iconB, iconC}) => {
    return (
        <div className="mb-3">
            <Button variant="outline-primary" className="m-1 rounded-circle"><i className={iconA}></i></Button>
            <Button variant="outline-secondary" className="m-1 rounded-circle"><i className={iconB}></i></Button>
            <Button variant="outline-info" className="m-1 rounded-circle"><i className={iconC}></i></Button>
        </div>
    )
};

export default Listado;