export interface UserType {
  id: number;
  username: string;
  // Add other properties if necessary
}

export interface CommentType {
  id: number;
  text: string;
  user: UserType;
  created_at: string;
  updated_at: string;
}

export type AttachmentType = {
  id: number;
  file: string; 
  filename: string;
};

export interface TicketType {
  id: number;
  title: string;
  body: string;
  status: string;
  thread: number;
  created_at: string;
  updated_at: string;
  date: string;
  code: string;
  files: string; // Replace with correct type if files is not a string
  comments: CommentType[];
  attachments: AttachmentType[];
}

export interface TicketThreadType {
  id: number;
  created_at: string;
  updated_at: string;
  thread_code: string;
  status: string;
  tickets: TicketType[];
}
