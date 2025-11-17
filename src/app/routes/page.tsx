'use client';

import dynamic from 'next/dynamic';
import { Container, Row, Col, Card } from 'react-bootstrap';

const RoutesMap = dynamic(() => import('@/components/RoutesMap'), { ssr: false });

export default function RoutesPage() {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <h1 className="text-center fw-bold mb-3">Running Routes</h1>
          <p className="text-center text-muted">
            Explore UH Mānoa running routes on Google Maps.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow border-0">
            <Card.Body style={{ padding: 0 }}>
              <RoutesMap />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
