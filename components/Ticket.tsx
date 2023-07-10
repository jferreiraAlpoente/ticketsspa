import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { TicketType, CommentType } from '../types';
import { Comment } from './Comment';
import { createComment } from '@/lib/api';
import { Form, Button } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import styled from 'styled-components';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';


type Props = {
  ticket: TicketType;
};

const TicketContainer = styled.div`
  display: block;
  width: 100%;
  padding-bottom: 5px;
`;

const TicketButton = styled(Button)`
  display: block;
  width: 100%;
  text-align: left;
`;

const StyledBadge = styled(Badge)`
  margin-left: 10px;
`;

const TicketCard = styled(Card)`
  margin-top: 10px;
  max-height: 500px;
  overflow-y: auto;
  padding-right: 10px; 
/* Webkit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #add8e6; /* Light blue */
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #87cefa; /* Slightly darker light blue */
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #add8e6 #f1f1f1; /* Light blue and light gray */
`;


const CommentForm = styled.form`
  margin-top: 10px;
`;

const CommentSection = styled(Col)`
  border-left: 1px solid #ddd;
  padding: 15px;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
  margin-top: 15px;
`;

const Input = styled(Form.Control)`
  flex: 1;
`;

const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #007bff;
  cursor: pointer;
`;





export function Ticket({ ticket }: Props) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<CommentType[]>(ticket.comments || []);
  const { userId } = useContext(AuthContext);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'A':
        return 'Open';
      case 'F':
        return 'Closed';
      default:
        return 'Unknown';
    }
  };

  const [newComment, setNewComment] = useState(''); 

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  }

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newComment.trim() !== '') {
      const addedComment = await createComment(ticket.id, newComment, userId);
      setComments([...comments, addedComment]);
      setNewComment('');
    }
  }

    return (
    <TicketContainer>
      <TicketButton
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        {ticket.title}
        <StyledBadge bg={ticket.status === 'A' ? 'success' : 'danger'}>
          {getStatusLabel(ticket.status)}
        </StyledBadge>
      </TicketButton>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <TicketCard>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Text>
                    <strong>Created At:</strong> {ticket.created_at}
                    <br />
                    <strong>Status:</strong> {getStatusLabel(ticket.status)}
                    <br />
                    <strong>Code:</strong> {ticket.code}
                    <br />
                    <strong>Body:</strong> {ticket.body}
                    <br />
                  </Card.Text>
                </Col>
                    <CommentSection>
                    {comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                    <Form onSubmit={handleCommentSubmit}>
                        <InputGroup>
                        <Input 
                            type="text" 
                            placeholder="Write a comment..." 
                            value={newComment}
                            onChange={handleCommentChange} 
                        />
                        <Icon icon={faPaperPlane} onClick={handleCommentSubmit} />
                        </InputGroup>
                    </Form>
                    </CommentSection>
              </Row>
            </Card.Body>
          </TicketCard>
        </div>
      </Collapse>
    </TicketContainer>
  );
}
