import React, { useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import UserEditModal from './UserEditModal';
import { deleteUser } from '../../services/api';

const UserCard = ({ user, setUsers }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      await deleteUser(user.id);
      setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
    } catch (err) {
      setError('Failed to delete user. Please try again.');
    }
  };

  return (
    <>
      <Card>
        <Card.Body className="text-center">
          <Image
            src={user.avatar}
            roundedCircle
            width={100}
            height={100}
            className="mb-3"
            alt={`${user.first_name} ${user.last_name}`}
          />
          <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
          <Card.Text>{user.email}</Card.Text>
          <div className="d-flex justify-content-center gap-2">
            <Button variant="primary" onClick={() => setShowEditModal(true)}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
          {error && <div className="text-danger mt-2">{error}</div>}
        </Card.Body>
      </Card>

      <UserEditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        user={user}
        setUsers={setUsers}
      />
    </>
  );
};

export default UserCard;


