import styled from 'styled-components';

const AvatarWrapper = styled.div`
  height: 40px;
  width: 40px;
  background-color: #007bff;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

export function Avatar({ username }: { username: string }) {
  const letter = username.charAt(0).toUpperCase();

  return <AvatarWrapper>{letter}</AvatarWrapper>;
}

export default Avatar;
