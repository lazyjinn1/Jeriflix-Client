import { Card, Container } from 'react-bootstrap';
import './picture-card.scss';

export const PictureCard = ({ pictureData, onSelect }) => {

    return (
        // This shows the Profile Pictures that users can change to.
        <Container>
            <Card className = 'pictureChoice' onClick={onSelect} style={{ cursor: 'pointer' }}>
                <Card.Img className = 'pictureChoice' variant="top" src={pictureData} />
            </Card>
        </Container >
    );
};
