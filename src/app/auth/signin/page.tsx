'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

/** The sign in page. */
const SignIn = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // to inspect whether user got directed to the next page
      callbackUrl: '/',
    });

    if (result?.error) {
      console.error('Sign in failed: ', result.error);
    }
    // pushes user forward after validation
    if (result?.url) window.location.href = result.url;
  };

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Sign In</h1>
            <Card>
              <Card.Body>
                <Form method="post" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <input name="email" type="email" className="form-control" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <input name="password" type="password" className="form-control" />
                  </Form.Group>
                  <Button
                    style={{
                      padding: '0.3rem 0.7rem',
                      borderRadius: '999px',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      backgroundColor: '#3e633e',
                    }}
                    type="submit"
                    className="mt-3"
                  >
                    Sign in
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer>
                Don&apos;t have an account?
                {/* turn into link */}
                <Link href="/auth/signup"> Sign up</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;
