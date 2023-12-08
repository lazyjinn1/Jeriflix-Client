import { Card, Container } from 'react-bootstrap';

export const PictureCard = ({ pictureData, onSelect }) => {

    return (
        <Container>
            <Card onClick={onSelect} style={{ cursor: 'pointer' }}>
                <Card.Img variant="top" src={pictureData} />
            </Card>
        </Container >
    );
};
