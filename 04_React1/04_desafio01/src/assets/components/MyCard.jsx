/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Tags from "./Tags";

const MyCard = ({ url, nombre, descripcion, raza, bgcolor }) => {
    return (
    <Card style={{ width: '18rem' }} className="m-2">
        <Card.Img variant="top" src={url} className="img-fluid"/>
        <Card.Body>
            <Card.Title>{nombre}</Card.Title>
            <Card.Text>{descripcion}</Card.Text>
            <Tags text={raza} bgcolor={bgcolor}/>
        </Card.Body>
    </Card>
    );
};
export default MyCard;