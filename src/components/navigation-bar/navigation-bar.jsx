import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut, movies}) => {

    // Function to get a random movie ID
    const getRandomMovieId = () => {
        if (movies && movies.length) {
            const randomMovie = Math.floor(Math.random() * movies.length);
            console.log(randomMovie);
            return movies[randomMovie].ID;
            
        }
        return null;
    }

    const randomMovie = getRandomMovieId(); 

    return (
        // Navigation bar on top of every page
        <Navbar bg = 'light' expand = 'lg' fixed = 'top' className = 'mb-5 navbar'>
            <Container>
                <Navbar.Brand as = {Link} to = '/'>
                    Jeriflix
                </Navbar.Brand>

                <Navbar.Toggle aria-controls = 'basic-navbar-nav ' />
                
                {/* Shows what it looks like when the screen is too small. */}
                <Navbar.Collapse id = 'basic-navbar-nav'>
                    <Nav className = 'me-auto '>
                        {!user && (
                            <>
                                <Nav.Link as = {Link} to ='/login'>
                                    Login
                                </Nav.Link>
                                <Nav.Link as = {Link} to ='/signup'>
                                    Sign Up
                                </Nav.Link>
                            </>
                        )}
                        {  user && (
                                <>
                                    <Nav.Link as = {Link} to = '/'>
                                        Home
                                    </Nav.Link>
                                    <Nav.Link as = {Link} to ='/profile'>
                                        Profile
                                    </Nav.Link>
                                    <Nav.Link as = {Link} to = {`/movies/${randomMovie}`}>Feeling Lucky?</Nav.Link>

                                    <Nav.Link as = {Link} to = '/' onClick = {onLoggedOut}>Logout</Nav.Link>
                                </>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}