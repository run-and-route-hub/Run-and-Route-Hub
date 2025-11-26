import { Col, Container, Row, Button } from 'react-bootstrap';
import { PeopleFill, PersonWalking, MapFill } from 'react-bootstrap-icons';

/** The Home page. */
const Home = () => (
  <main className="py-5">
    <Container id="landing-page">
      {/* Hero Section */}
      <Row className="justify-content-center mb-5">
        <Col lg={9}>
          <div
            className="p-4 p-md-5 rounded-4 shadow-sm text-center text-md-start"
            style={{
              background: 'linear-gradient(135deg, rgba(62, 99, 62, 0.08), rgba(0, 0, 0, 0))',
            }}
          >
            <Row className="align-items-center g-4">
              <Col md={3} className="text-center">
                <PersonWalking size={80} className="mb-2" />
              </Col>
              <Col md={9}>
                <p className="text-uppercase text-success small fw-semibold mb-2">
                  For runners of all levels
                </p>
                <h1 className="fw-bold mb-3">Run &amp; Route Hub</h1>
                <p className="lead text-muted mb-4">
                  Log your runs, discover community routes, and find running buddies who match your pace,
                  availability, and running style — all in one place.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-2">
                  <Button href="/list" variant="success">
                    Find a Route
                  </Button>
                  <Button href="/findbuddy" variant="outline-success">
                    Find a Running Buddy
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
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
              Match with runners who share your pace, schedule, and terrain preferences so you don&apos;t
              have to train alone.
            </p>
          </div>
        </Col>

        {/* Log & Track Runs */}
        <Col md={6} lg={4}>
          <div className="h-100 p-4 bg-white rounded-3 shadow-sm text-center">
            <PersonWalking size={48} className="mb-3" />
            <h2 className="h5 fw-semibold mb-2">Log &amp; Track Your Runs</h2>
            <p className="text-muted mb-0">
              Save details like name, distance, location, pace, and notes. Build a clear picture of your
              training over time.
            </p>
          </div>
        </Col>

        {/* Discover Community Routes */}
        <Col md={12} lg={4}>
          <div className="h-100 p-4 bg-white rounded-3 shadow-sm text-center">
            <MapFill size={48} className="mb-3" />
            <h2 className="h5 fw-semibold mb-2">Discover Community Routes</h2>
            <p className="text-muted mb-0">
              Explore routes shared by other runners. Find new paths, compare distances, and choose runs
              that match your goals.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
