import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Pagination, 
  Spinner, 
  Alert, 
  Form, 
  Button,
  InputGroup
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import UserCard from './UserCard';
import { getUsers } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getUsers(currentPage);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch users. Please try again.');
        if (err.response?.status === 401) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.first_name.toLowerCase().includes(searchLower) ||
      user.last_name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <Container className="mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Users List</h2>
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </div>

      <InputGroup className="mb-4">
        <InputGroup.Text>
          <FiSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {filteredUsers.length === 0 ? (
            <Card className="text-center p-4">
              <Card.Body>No users found</Card.Body>
            </Card>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredUsers.map((user) => (
                <Col key={user.id}>
                  <UserCard user={user} setUsers={setUsers} />
                </Col>
              ))}
            </Row>
          )}

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev 
                  disabled={currentPage === 1} 
                  onClick={() => handlePageChange(currentPage - 1)} 
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next 
                  disabled={currentPage === totalPages} 
                  onClick={() => handlePageChange(currentPage + 1)} 
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default UsersList;


