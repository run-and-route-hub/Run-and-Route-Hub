import { Col, Container, Row } from 'react-bootstrap';
import { PeopleFill, PersonWalking } from 'react-bootstrap-icons';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Container>
        <Row className="align-middle text-center">
          <Col xs={4}>
            <PeopleFill size={100} />
            <h1>Purpose</h1>
            <h5>
              The Run and Route Hub allows users to make an account and log/add their runs, find runs posted by other
              other users and find running buddies in their area.
            </h5>
          </Col>
          <Col xs={4}>
            <h1>Welcome to the Run and Route Hub!</h1>
          </Col>
          <Col xs={4}>
            <PersonWalking size={100} />
            <h1>Run Details</h1>
            <h5>For each run, you can save details like name, distance, location, and more</h5>
          </Col>
        </Row>
      </Container>
    </Container>
  </main>
);

export default Home;
