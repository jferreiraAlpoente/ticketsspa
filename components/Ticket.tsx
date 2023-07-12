import React, { useState, useContext} from 'react';
import AuthContext from '../contexts/AuthContext';
import { TicketType, CommentType } from '../types';
import { Comment } from './Comment';
import { createComment, deleteComment } from '@/lib/api';
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

const DownloadButton = styled(Button)`
  display: block;
  text-align: left;
  margin-bottom: 10px;
`;

const StyledBadge = styled(Badge)`
  margin-left: 10px;
  margin-right: 10px;

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
  flex-grow: 1;
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

const StyledCardText = styled(Card.Text)`
  overflow-wrap: break-word; /* this ensures that long words/lines don't overflow */
`;



function formatText(text: string) {
  return text
    .replace(/\n/g, '<br />')
    .replace(/\t/g, '&emsp;')
    .replace(/ /g, '&nbsp;');
}




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

    const handleCommentDelete = async (commentId: number) => {
    await deleteComment(commentId);
    setComments(comments.filter(comment => comment.id !== commentId));
  }


  const handleFileDownload = (fileRelativeUrl: string, filename: string) => {
    const absoluteFileUrl = `http://localhost:8000${fileRelativeUrl}`; 
    const link = document.createElement('a');
    link.href = absoluteFileUrl;
    link.target = '_blank';  // Add this line
    link.download = filename;
    link.click();
  };


    return (
    <TicketContainer>
      <TicketButton
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        <StyledBadge bg={ticket.status === 'A' ? 'success' : 'danger'}>
          {getStatusLabel(ticket.status)}
        </StyledBadge>
        {ticket.title}
      </TicketButton>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <TicketCard>
            <Card.Body>
              <Row>
                <Col xs={6}>
                <StyledCardText>
                  <div dangerouslySetInnerHTML={{ __html: formatText(ticket.body) }} />
                </StyledCardText>
              {ticket.attachments && ticket.attachments.map((attachment, index) => (
    <DownloadButton key={index} onClick={() => handleFileDownload(attachment.file, attachment.filename)}>
        Download {attachment.filename}
    </DownloadButton>
))}
                </Col >
                    <CommentSection xs={6}>
                    {comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} handleDeleteComment={handleCommentDelete} />
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
