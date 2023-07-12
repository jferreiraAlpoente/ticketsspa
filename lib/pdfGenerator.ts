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
  const pageWidth = doc.internal.pageSize.width;
  const marginLeft = 20;  // adjust to your needs
  const marginRight = 20;  // adjust to your needs
  const maxWidth = pageWidth - marginLeft - marginRight;
  const pageHeight= doc.internal.pageSize.height;
  const lineHeight = 10; // line height for the text
  const bottomMargin = 10;  // adjust to your needs
  const maxLineWidth = pageWidth - marginLeft - marginRight;
  
  let yPos = 20; // initial Y position to start writing content
  tickets.forEach((ticket, index) => {
    const content = generatePdfContent(ticket);

    if (index !== 0) {
      doc.addPage();
      yPos = 20; // reset the Y position for the new page
    }

    const lines = doc.splitTextToSize(content, maxLineWidth);
    for(let i = 0; i < lines.length; i++) {
      if(yPos >= pageHeight - bottomMargin) {
        doc.addPage();
        yPos = 20; // reset the Y position for the new page
      }
      doc.text(lines[i], marginLeft, yPos);
      yPos += lineHeight;
    }
  });

  doc.save("tickets.pdf");
}
