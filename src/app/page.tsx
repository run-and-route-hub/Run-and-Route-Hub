import { Col, Container, Row } from 'react-bootstrap';
import { PeopleFill, PersonWalking, MapFill } from 'react-bootstrap-icons';

/** The Home page. */
const Home = () => (
  <main className="py-5">
    <Container id="landing-page">

      {/* Hero Section */}
      <Row className="justify-content-center text-center mb-5">
        <Col lg={8}>
          <PersonWalking size={80} className="mb-3" />
          <h1 className="fw-bold mb-3">Run &amp; Route Hub</h1>
          <p className="lead text-muted mb-0">
            Log your runs, discover community routes, and find running buddies who match your pace,
            availability, and running style all in one place.
          </p>
        </Col>
      </Row>

      {/* Feature Cards */}
      <Row className="g-4">

        {/* Find Running Buddies */}
        <Col md={6} lg={4}>
          <div className="h-100 p-4 bg-white rounded-3 shadow-sm text-center">
            <PeopleFill size={48} className="mb-3" />
            <h2 className="h5 fw-semibold mb-2">Find Running Buddies</h2>
            <p className="text-muted mb-0">
              Match with runners who share your pace, availability, and terrain preferences. Stay
              motivated by running together.
            </p>
          </div>
        </Col>

        {/* Log & Track Runs */}
        <Col md={6} lg={4}>
          <div className="h-100 p-4 bg-white rounded-3 shadow-sm text-center">
            <PersonWalking size={48} className="mb-3" />
            <h2 className="h5 fw-semibold mb-2">Log &amp; Track Your Runs</h2>
            <p className="text-muted mb-0">
              Save your runs with details like name, distance, location, pace, and notes. Build your
              personal training history over time.
            </p>
          </div>
        </Col>

        {/* Discover Community Routes */}
        <Col md={12} lg={4}>
          <div className="h-100 p-4 bg-white rounded-3 shadow-sm text-center">
            <MapFill size={48} className="mb-3" />
            <h2 className="h5 fw-semibold mb-2">Discover Community Routes</h2>
            <p className="text-muted mb-0">
              Explore routes shared by other runners. Find new paths, check distance and elevation,
              and choose runs that fit your goals.
            </p>
          </div>
        </Col>

      </Row>
    </Container>
  </main>
);

export default Home;
