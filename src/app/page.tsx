import { Col, Container, Row, Button } from 'react-bootstrap';
import { PeopleFill, Activity, MapFill } from 'react-bootstrap-icons';

const Home = () => (
  <main className="py-5">
    <Container id="landing-page">

      <Row className="justify-content-center text-center mb-5">
        <Col lg={8}>
          <img
            src="/profile/therunhub.png"
            alt="Run & Route Hub logo"
            className="mb-3"
            style={{ maxWidth: '180px', width: '100%', height: 'auto' }}
          />
          <h1 className="fw-bold mb-3">Run &amp; Route Hub</h1>
          <p className="lead text-muted mb-3">
            A hub for UH runners and the wider community to log runs, discover routes, and connect
            with running buddies who match their pace, availability, and running style.
          </p>
          <p className="text-muted mb-4">
            Whether you&apos;re training for a race, starting your first 5K, or just staying active,
            Run &amp; Route Hub keeps your running life organized and makes it easier to find people
            to run with.
          </p>

          <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
            <Button href="/list" variant="success">
              Find a Route
            </Button>
            <Button href="/findbuddy" variant="outline-success">
              Find a Running Buddy
            </Button>
            <Button href="/add" variant="outline-secondary">
              Add a Run
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="g-4">

        <Col md={6} lg={4}>
          <div className="h-100 p-4 bg-white rounded-3 shadow-sm text-center">
            <PeopleFill size={48} className="mb-3" />
            <h2 className="h5 fw-semibold mb-2">Find Running Buddies</h2>
            <p className="text-muted mb-0">
              Match with runners who share your pace, schedule, and terrain preferences, so you&apos;re
              not training alone. Filter by pace, time of day, and even hills vs. flat routes.
            </p>
          </div>
        </Col>

        <Col md={6} lg={4}>
          <div className="h-100 p-4 bg-white rounded-3 shadow-sm text-center">
            <Activity size={48} className="mb-3" />
            <h2 className="h5 fw-semibold mb-2">Log &amp; Track Your Runs</h2>
            <p className="text-muted mb-0">
              Save each run with details like name, distance, location, pace, terrain, and notes.
              Over time, your Run &amp; Route Hub becomes a personal training diary you can look back on.
            </p>
          </div>
        </Col>

        <Col md={12} lg={4}>
          <div className="h-100 p-4 bg-white rounded-3 shadow-sm text-center">
            <MapFill size={48} className="mb-3" />
            <h2 className="h5 fw-semibold mb-2">Discover Community Routes</h2>
            <p className="text-muted mb-0">
              Explore routes created by other runners. Discover new paths around campus and beyond,
              compare distances and terrain, and choose runs that match your goals and comfort level.
            </p>
          </div>
        </Col>

      </Row>

    </Container>
  </main>
);

export default Home;
