import { Container, Navbar } from "react-bootstrap";

export default function NavigationBar() {
    return <Navbar className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src="/quicknote.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Quick Note
            </Navbar.Brand>
        </Container>
    </Navbar>
}