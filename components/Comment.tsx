import React from 'react';
import { useState } from 'react';
import { CommentType } from '../types';
import Avatar from './Avatar';
import styled from 'styled-components';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { deleteComment } from '../lib/api'; 

type Props = {
  comment: CommentType;
  handleDeleteComment: (id: number) => void;
};

const CommentContainer = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 1em 0;
`;

const CommentText = styled.p`
  margin: 0;
`;

const CommentInfo = styled.div`
  font-size: 0.8em;
  color: #666;
`;

const CommentRow = styled(Row)`
  align-items: center; // This aligns the items vertically centered
`;

const AvatarCol = styled(Col)`
  display: flex;
  justify-content: center; // This centers the Avatar horizontally
`;

const DeleteButton = styled.button`
  background-color: #f44336; // This is red color
  color: white;
  text-align: center;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e57373; // This is light red color
  }
`;

export function Comment({ comment, handleDeleteComment }: Props) {
  const { username } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  // Format the date in a more readable way
  const date = new Date(comment.created_at).toLocaleDateString();

  const handleDelete = () => {
    handleDeleteComment(comment.id);
    setShow(false);
    
  };

 return (
    <CommentContainer>
      <Modal show={show} onHide={() => setShow(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShow(false)}>
      Close
    </Button>
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  </Modal.Footer>
</Modal>

      <CommentRow>
        <AvatarCol xs={2}>
          <Avatar username={comment.user.username} />
        </AvatarCol>
        <Col xs={10}>
          <CommentText>{comment.text}</CommentText>
          <CommentInfo>Posted by {comment.user.username} on {date}</CommentInfo>
          {username === comment.user.username && <Button variant="danger" size="sm" onClick={() => setShow(true)}>Delete</Button>}
        </Col>
      </CommentRow>
    </CommentContainer>
  );
} 

export default Comment;
