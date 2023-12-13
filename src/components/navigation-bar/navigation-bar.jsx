import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut, movies, searchTerm, setSearchTerm, filteredMovies }) => {
    // function for setting the search term to be searched in 'filteredMovies' below
    const handleSearchMovie = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearchReset = () => {
        setSearchTerm('');
    }

    // Function to get a random movie ID
    let getRandomMovieId = () => {
        if (movies && movies.length) {
            const randomIndex = Math.floor(Math.random() * movies.length);
            return movies[randomIndex].ID;
        }
        return;
    }

    const randomMovie = getRandomMovieId();

    return (
        <Navbar bg='light' expand='lg' className='navbar'>
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    <h1>Jeriflix</h1>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='basic-navbar-nav' />

                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        {!user && (
                            <>
                                <Nav.Link as={Link} to='/login'>
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to='/signup'>
                                    Sign Up
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <Nav>
                                
                                <Nav.Link as={Link} to='/profile'>
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick = {getRandomMovieId()} as = {Link} to={`/movies/${randomMovie}`}>Feeling Lucky?</Nav.Link>
                                <Nav.Link as={Link} to='/' onClick={onLoggedOut}>Logout</Nav.Link>
                            </Nav>
                        )}
                    </Nav>

                    {user && (
                        <Nav className='ml-auto'>
                            <Form>
                                <Form.Group>
                                    <Form.Control
                                        value={searchTerm}
                                        type="text"
                                        placeholder="Search movies, genres, or directors..."
                                        onChange={handleSearchMovie}
                                        style={{ width: '300px', padding: '5px', fontSize: '1rem' }}
                                    />
                                </Form.Group>
                                
                            </Form>
                            <Nav.Link as={Link} to='/'>
                                <p>{filteredMovies.length} results found...</p>
                            </Nav.Link>
                            <Button className='ml-2 mb-3' onClick={handleSearchReset}>Reset</Button>
                            
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}