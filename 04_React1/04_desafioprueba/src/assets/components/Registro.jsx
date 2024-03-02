/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import Formulario from "./Formulario";
import SocialButton from "./SocialButton";

const Registro = ({iconA, iconB, iconC}) => {
    return (
        <>
            <SocialButton iconA={iconA} iconB={iconB} iconC={iconC}/>
            <Formulario/>
        </>
    )
};

export default Registro;