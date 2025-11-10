import { Col, Container, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col className="d-flex flex-column justify-content-center">
          <h1>Welcome to Run & Route Hub</h1>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
