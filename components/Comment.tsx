import React from 'react';
import { CommentType } from '../types';
import Avatar from './Avatar';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

type Props = {
  comment: CommentType;
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

export function Comment({ comment }: Props) {
  // Format the date in a more readable way
  const date = new Date(comment.created_at).toLocaleDateString();

 return (
    <CommentContainer>
      <CommentRow>
        <AvatarCol xs={2}>
          <Avatar username={comment.user.username} />
        </AvatarCol>
        <Col xs={10}>
          <CommentText>{comment.text}</CommentText>
          <CommentInfo>Posted by {comment.user.username} on {date}</CommentInfo>
        </Col>
      </CommentRow>
    </CommentContainer>
  );
}

export default Comment;
