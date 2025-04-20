import React, { useState, useEffect, useRef } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { createScholorship, deleteScholorshipById, getAllScholorships, getOrganiztions, scholorshipApprovalByOrg, updateScholorshipById } from '../../utils/api';
import { useAdminData, useOrgData } from '../../utils/Cookies';

const ScholorshipDetails = () => {

    const { admin: adminData } = useAdminData();
    const { org: orgData } = useOrgData();

    const [scholorships, setScholorships] = useState([]);
    const [categoryData, setCategoryData] = useState({
        name: '',
        organization: '',
        description: '',
        link: ''
    });


    const [errors, setErrors] = useState({});
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showUpdateAlert, setShowUpdateAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [approvedAmount, setApprovedAmount] = useState('');
    const [selectedApplication, setSelectedApplication] = useState(null);

    const [organizations, setOrganizations] = useState([]);

    const formRef = useRef(null);

    useEffect(() => {
        fetchCategories();
        if (adminData._id) {
            fetchOrgnizations();
        } else {
            // Set default organization when adminData._id is not available
            if (orgData._id) {
                setCategoryData(prevData => ({
                    ...prevData,
                    organization: orgData._id
                }));
            }
        }
    }, [adminData, orgData]);

    const handleApprove = (application) => {
        setSelectedApplication(application);
        setShowApproveModal(true);
    };

    const handleSubmitApproval = async () => {
        if (!approvedAmount || isNaN(approvedAmount)) {
            alert('Please enter a valid amount.');
            return;
        }

        try {
            const response = await scholorshipApprovalByOrg(selectedApplication._id, { approvedAmount });

            if (response.ok) {
                alert("Application approved successfully");
                setShowApproveModal(false);
                setApprovedAmount('');
                fetchCategories();
            } else {
                alert("Failed to approve application");
            }
        } catch (error) {
            console.error('Error approving application:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await getAllScholorships();
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    // const sortedCategories = data.sort((a, b) => a.name.localeCompare(b.name));
                    setScholorships(data);
                } else {
                    setScholorships([]); // Set scholorships to empty array if response is not an array
                }
            } else {
                console.error('Failed to fetch scholorships');
            }
        } catch (error) {
            console.error('Error fetching scholorships:', error);
        }
    };

    const fetchOrgnizations = async () => {
        try {
            console.log("Called By UseEffect and fetching Organizations")

            const response = await getOrganiztions();
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                if (Array.isArray(data)) {
                    // const sortedCategories = data.sort((a, b) => a.orgCode.localeCompare(b.orgCode));
                    setOrganizations(data);
                    console.log(organizations)
                } else {
                    console.error('Expected an array but got:', data);
                    setOrganizations([]); // Set scholorships to empty array if response is not an array
                }
            }

        } catch (error) {
            console.error('Error fetching scholorships:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData({ ...categoryData, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const validateCategory = () => {
        const errors = {};
        if (!categoryData.name) errors.name = 'Scholorship name is required';
        if (!categoryData.description) errors.description = 'Description is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        console.log("Entered")
        e.preventDefault();
        const errors = validateCategory();

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        setErrors({});
        try {
            let response;
            if (isEditMode) {
                response = await updateScholorshipById(categoryId, categoryData);
            } else {
                response = await createScholorship(categoryData);
            }

            const responseData = await response.json();

            if (response.ok) {

                if (isEditMode) {
                    setShowUpdateAlert(true);
                    setShowSuccessAlert(false);
                } else {
                    setShowUpdateAlert(false);
                    setShowSuccessAlert(true);
                }

                setCategoryData({
                    name: '',
                    description: '',
                    link: '',
                    organization: ''
                });
                setCategoryId(null);
                fetchCategories(); // Fetch scholorships again to update the list after adding/updating a name
                setIsEditMode(false);
            } else {
                console.error('Error:', responseData);
                setShowErrorAlert(true);
                setErrors({ server: responseData.message });
            }
        } catch (err) {
            console.error('Error in try block:', err);
            setShowErrorAlert(true);
            setErrors({ server: `An error occurred. Please try again. ${err.message}` });
        }
    };

    const handleEdit = (name) => {
        setCategoryData({
            name: name.name,
            description: name.description,
            link: name.link,
            organization: name.organization
        });
        setIsEditMode(true);
        setCategoryId(name._id);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
    };

    const handleDelete = async (name) => {
        try {
            const response = await deleteScholorshipById(name._id);
            if (response.ok) {
                alert("Scholorship Deleted Successfully");
                fetchCategories();
            } else {
                console.error('Failed to delete name');
            }
        } catch (error) {
            console.error('Error deleting name:', error);
        }
    };

    // Filtered scholorships based on search query
    // const filteredCategories = scholorships.filter((name) =>
    //     name.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    return (
        <div>

            <Container className="container-1">
                <div className="list-container scrollable-list">
                    <Row>
                        <Col xs={12} sm={8}>
                            <h2 className="mb-4">List of Recycle Request</h2>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Form.Group controlId="search" >
                                <Form.Control
                                    type="text"
                                    placeholder="Search by Item"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="table-header pb-2 pt-2 GuestHeader">
                        <Col xs={12} sm={1} className="text-center">
                            Sl. No.
                        </Col>
                        <Col xs={12} sm={2} className="text-center">
                        Email
                        </Col>
                        <Col xs={12} sm={1} className="text-center">
                        ItemName
                        </Col>
                        <Col xs={12} sm={1} className="text-center">
                        ExpectedPrice
                        </Col>
                        <Col xs={12} sm={1} className="text-center">
                        Date
                        </Col>
                        <Col xs={12} sm={2} className="text-center">
                        Facility
                        </Col>
                        <Col xs={12} sm={1} className="text-center">
                        Fullname
                        </Col>
                        <Col xs={12} sm={1} className="text-center">
                            Phone
                        </Col>
                        <Col xs={12} sm={1} className="text-center">
                            Status
                        </Col>
                        <Col xs={12} sm={1} className="text-center">
                            Actions
                        </Col>
                    </Row>

                    {scholorships.map((name, index) => (
                        <Row key={index} className="table-row" onMouseEnter={(e) => e.currentTarget.classList.add('hovered')} onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}>
                            <Col xs={12} sm={1} className="text-center">
                                {index + 1}
                            </Col>
                            <Col xs={12} sm={2} className="text-center">
                                {name.userEmail}
                            </Col>
                            <Col xs={12} sm={1} className="text-center">
                                {name.recycleItem}
                            </Col>
                            <Col xs={12} sm={1} className="text-center">
                                {name.recycleItemPrice}
                            </Col>
                            <Col xs={12} sm={1} className="text-center">
                                {name.pickupDate}
                            </Col>
                            <Col xs={12} sm={2} className="text-center">
                                {name.facility}
                            </Col>
                            <Col xs={12} sm={1} className="text-center">
                                {name.fullName}
                            </Col>
                            <Col xs={12} sm={1} className="text-center">
                                {name.phone}
                            </Col>
                            <Col xs={12} sm={1} className="text-center">
                                {name.remark}
                            </Col>
                            <Col xs={6} sm={1} className="text-center">
                                <Button variant="primary" type="button" className="mt-2 signup-button" onClick={() => handleApprove(name)}>
                                    <MdEdit />
                                </Button>
                            </Col>
                            
                        </Row>
                    ))}
                </div>
            </Container>


            <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Estimated Amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="approvedAmount">
                            <Form.Label>Estimated Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Estimated amount"
                                value={approvedAmount}
                                onChange={(e) => setApprovedAmount(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowApproveModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSubmitApproval}>Submit</Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
}

export default ScholorshipDetails
