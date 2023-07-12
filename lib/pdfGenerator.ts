import { jsPDF } from "jspdf";
import { TicketType, CommentType } from "../types"

// Define the function that generates PDF content from a ticket
const generatePdfContent = (ticket: TicketType): string => {
  let content = '';
  
  // Add ticket title
  content += `Ticket ID: ${ticket.id}\nTitle: ${ticket.title}\n\n`;
  
  // Add ticket body
  content += `${ticket.body}\n\n`;

  // Add ticket comments
  content += 'Comments:\n';
  ticket.comments.forEach((comment: CommentType, index: number) => {
    content += `Comment ${index+1}: ${comment.text}\n`;
  });

  return content;
}

// Define the function that prints tickets to a PDF
export const printToPdf = (tickets: TicketType[]): void => {
  const doc = new jsPDF();

  tickets.forEach((ticket, index) => {
    const content = generatePdfContent(ticket);

    // Add a new page for each ticket after the first
    if (index !== 0) doc.addPage();

    doc.text(content, 10, 10);
  });

  doc.save("tickets.pdf");
}
