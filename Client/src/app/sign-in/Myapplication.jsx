import React, { useEffect, useState } from 'react';
import { getAllApplications } from '../utils/api';
import { Col, Container, Row, Form } from 'react-bootstrap';

const Myapplication = () => {
    const [applications, setApplications] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await getAllApplications();
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data.data)) {
                    const sortedApplications= data.data.sort((a, b) => a.applicationHeading.localeCompare(b.applicationHeading));
                    setApplications(sortedApplications);
                } else {
                    console.error('Expected an array but got:', data);
                    setApplications([]); // Set notifications to empty array if response is not an array
                }
            } else {
                console.error('Failed to fetch Applications');
            }
        } catch (error) {
            console.error('Error fetching Applications:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filtered notifications based on search query and active status
    const filteredNotifications = notifications.filter((notification) =>
        notification.active && notification.notificationHeading.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Container className="container-1">
                <div className="list-container scrollable-list">
                    <Row>
                        <Col xs={12} sm={8}>
                            <h2 className="mb-4">List of Application</h2>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Form.Group controlId="search" >
                                <Form.Control
                                    type="text"
                                    placeholder="Search by Applications Heading"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="table-header pb-2 pt-2 GuestHeader">
                        <Col xs={12} sm={2} className="text-center">
                            Sl. No.
                        </Col>
                        <Col xs={12} sm={5} className="text-center">
                            Notification Heading
                        </Col>
                        <Col xs={12} sm={5} className="text-center">
                            Notification Message
                        </Col>
                    </Row>

                    {filteredApplications.map((application, index) => (
                        <Row key={index} className="table-row" onMouseEnter={(e) => e.currentTarget.classList.add('hovered')} onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}>
                            <Col xs={12} sm={2} className="text-center">
                                {index + 1}
                            </Col>
                            <Col xs={12} sm={5} className="text-center">
                                {application.applicationHeading}
                            </Col>
                            <Col xs={12} sm={5} className="text-center">
                                {application.applicationMessage}
                            </Col>
                        </Row>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Myapplication;
