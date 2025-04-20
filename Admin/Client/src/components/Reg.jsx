import React from 'react'

const Reg = () => {
  return (
    <div>
      <Container className="container-2">
            <div className="form form-2">
                <h2 className="text-center mb-4">Sign Up</h2>
                {showSuccessAlert && (
                    <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                        Sign-up successful!
                    </Alert>
                )}

{signupErrors.server && (
                        <div className="alert alert-danger">
                            {signupErrors.server}
                        </div>
                    )}
                
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="firstName" className="pb-4">
                                <Form.Control
                                    className="large-input"
                                    type="text"
                                    name = "firstName"
                                     value= {signupData.firstName}
                                    onChange = {handleChange}
                                    minLength="3"
                                    isInvalid={!!signupErrors.firstName}
                                    placeholder="First Name"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {signupErrors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="lastName" className='pb-4'>
                                <Form.Control
                                    className="large-input"
                                    type="text"
                                   name = "lastName"
                                   value = {signupData.lastName}
                                    isInvalid={!!signupErrors.lastName}
                                    placeholder="Last Name"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {signupErrors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="email" className="pb-4">
                        <Form.Control
                            className="large-input"
                            type="email"
                           
                            isInvalid={!!signupErrors.email}
                            placeholder="Email"
                        />
                        <Form.Control.Feedback type="invalid">
                            {signupErrors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="address" className="pb-4">
                        <Form.Control
                            className="large-input"
                            type="text"
                            name="address"
                            value={signupData.address}
                            onChange={handleChange}
                            isInvalid={!!signupErrors.address}
                            placeholder="Address"
                        />
                        <Form.Control.Feedback type="invalid">
                            {signupErrors.address}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="dateOfBirth" className="pb-4">
                                <Row>
                                    <Col xs={4} className="d-flex align-items-center">
                                        <Form.Label>Birth Date</Form.Label>
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Control
                                            type="date"
                                            name="dateOfBirth"
                                            value={signupData.dateOfBirth}
                                            onChange={handleChange}
                                            isInvalid={!!signupErrors.dateOfBirth}
                                            className="large-input"
                                            placeholder='Date of Birth'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {signupErrors.dateOfBirth}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="gender" className="pb-4">
                                <Form.Control
                                    className="large-input"
                                    as="select"
                                    name="gender"
                                    value={signupData.gender}
                                    onChange={handleChange}
                                    isInvalid={!!signupErrors.gender}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {signupErrors.gender}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="password" className="pb-4">
                                <Form.Control
                                    className="large-input"
                                    type="password"
                                    name="password"
                                    value={signupData.password}
                                    onChange={handleChange}
                                    isInvalid={!!signupErrors.password}
                                    placeholder="Password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {signupErrors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="confirmPassword" className="pb-4">
                                <Form.Control
                                    className="large-input"
                                    type="password"
                                    name="confirmPassword"
                                    value={signupData.confirmPassword}
                                    onChange={handleChange}
                                    isInvalid={!!signupErrors.confirmPassword}
                                    placeholder="Confirm Password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {signupErrors.confirmPassword}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                   
                    <Button variant="primary" type="submit" className="mt-2 signup-button">
                        Sign Up
                    </Button>
                </Form>
            </div>
        </Container>
    </div>
  )
}

export default Reg
