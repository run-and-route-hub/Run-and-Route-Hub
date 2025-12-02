'use client';

import { signOut } from 'next-auth/react';
import { Button, Col, Row } from 'react-bootstrap';

/** After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => (
  <Col id="signout-page" className="text-center py-3">
    <h2>Do you want to sign out?</h2>
    <Row>
      <Col xs={4} />
      <Col>
        <Button
          style={{
            padding: '0.3rem 0.7rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
          variant="danger"
          onClick={() => signOut({ callbackUrl: '/', redirect: true })}
        >
          Sign Out
        </Button>
      </Col>
      <Col>
        <Button
          style={{
            padding: '0.3rem 0.7rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
          variant="secondary"
          href="/"
        >
          Cancel
        </Button>
      </Col>
      <Col xs={4} />
    </Row>
  </Col>
);

export default SignOut;
