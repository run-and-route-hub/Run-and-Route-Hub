import { Col, Container, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 custom-navbar">
    <Container>
      <Row className="align-middle text-center">
        <Col className="d-flex flex-column justify-content-center">
          Department of Information and Computer Sciences
          <br />
          University of Hawaii
          <br />
          Honolulu, HI 96822
          <br />
          <a href="http://ics-software-engineering.github.io/nextjs-application-template">Template Home Page</a>
        </Col>
        <Col className="d-flex flex-column justify-content-center">
          <a href="https://run-and-route-hub.github.io/">About Us</a>
        </Col>
      </Row>
      <Col className="d-flex flex-column justify-content-center text-center">&copy; 2024 Run and Route Hub</Col>
    </Container>
  </footer>
);

export default Footer;
