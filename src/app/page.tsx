/* eslint-disable @next/next/no-img-element */
import { Col, Container, Row, Button } from 'react-bootstrap';
import { PeopleFill, Activity, MapFill } from 'react-bootstrap-icons';

const Home = () => (
  <main className="py-5">
    <Container id="landing-page">

      {/* Hero */}
      <Row className="justify-content-center text-center mb-5 hero-section">
        <Col lg={8}>
          <img
            src="/profile/therunhub.png"
            alt="Run & Route Hub logo"
            className="mb-3"
            style={{ maxWidth: '90px', width: '100%', height: 'auto' }}
          />

          <h1 className="fw-bold mb-3">Run &amp; Route Hub</h1>

          <p className="lead mb-3">
            A hub for UH runners and the wider community to log runs, discover new running routes,
            and connect with partners based on pace, availability, and terrain preference.
          </p>

          <p className="mb-4">
            Whether you&apos;re training for a race or just getting active again,
            Run &amp; Route Hub keeps your progress organized and helps you find runners just like you.
          </p>

          <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
            <Button href="/find-run" variant="success">
              Find Run
            </Button>
            <Button href="/findbuddy" variant="success">
              Find Running Buddy
            </Button>
            <Button href="/add" variant="success">
              Add a Run
            </Button>
          </div>
        </Col>
      </Row>

      {/* Features */}
      <Row className="g-4">

        <Col md={6} lg={4}>
          <div className="h-100 p-4 bg-white rounded-3 shadow-sm text-center">
            <PeopleFill size={48} className="mb-3 text-success" />
            <h2 className="h5 fw-semibold mb-2">Find Running Buddies</h2>
            <p className="text-muted mb-0">
              Match with runners based on shared pace, schedule, and terrain preferences.
              Filter by mornings, evenings, hills, flat paths, and more.
            </p>
          </div>
        </Col>

        <Col md={6} lg={4}>
          <div className="h-100 p-4 bg-white rounded-3 shadow-sm text-center">
            <Activity size={48} className="mb-3 text-success" />
            <h2 className="h5 fw-semibold mb-2">Log &amp; Track Your Runs</h2>
            <p className="text-muted mb-0">
              Record run details such as distance, pace, location, and notes.
              Build a personal training history as you progress.
            </p>
          </div>
        </Col>

        <Col md={12} lg={4}>
          <div className="h-100 p-4 bg-white rounded-3 shadow-sm text-center">
            <MapFill size={48} className="mb-3 text-success" />
            <h2 className="h5 fw-semibold mb-2">Discover Community Routes</h2>
            <p className="text-muted mb-0">
              Browse routes created by other runners around campus and Honolulu.
              Find paths that match your goals and explore new running spots.
            </p>
          </div>
        </Col>

      </Row>

    </Container>
  </main>
);

export default Home;
