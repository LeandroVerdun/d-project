import {Link} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import "../../css/error.css";
import error404Image from '../img/404.png';

const NoFound= () =>{
    return <>
   <div className="body">
    <h1 className="text-center mt-3 mb-3 pulsating">ERROR 404!</h1>
    <div className="text-center responsive-container" >
    <img src={error404Image} alt="Error 404 Not Found" />
    <Button variant="dark"><Link to={"/"} style={{color:"white"}}>GO TO HOME </Link></Button>
    </div>
    </div>
    </>
}

export default NoFound