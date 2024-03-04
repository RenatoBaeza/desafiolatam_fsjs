/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import Formulario from "./Formulario";
import SocialButton from "./SocialButton";

const Registro = ({iconA, iconB, iconC, setShowAlert, setCorrectCreation}) => {
    return (
        <>
            <SocialButton iconA={iconA} iconB={iconB} iconC={iconC} />
            <Formulario setShowAlert={setShowAlert} setCorrectCreation={setCorrectCreation} />
        </>
    )
};

export default Registro;