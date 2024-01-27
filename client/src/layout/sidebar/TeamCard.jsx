import Jetpack from '../../assets/img/jetpack.png';
import { Card } from 'react-bootstrap';
const TeamCard = () => {
    return (
        <Card className="m-3 p-2 shadow-sm rounded">
            <Card.Body>
                <Card.Img className='mx-auto d-block mb-2' variant="top" src={Jetpack} alt="Pf" style={{ width : "100px" }}/>
                <Card.Text className="text-center">
                Equipo de Prevención de Fraude
                </Card.Text>
                <span className="text-primary d-block text-center">Apuesta Total © 2024</span>
            </Card.Body>
        </Card>
    );
}

export default TeamCard;
