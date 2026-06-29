import path from "path";
import { getTicketData } from "./ticket.dao";
import { buildTicketHtml } from "./ticket.template";
import { generatePdf } from "./pdf.service";
import { createTicketRecord } from "./ticket.dao";

export const generateTicket = async (bookingId: string) => {
   const booking = await getTicketData(bookingId);

   if (!booking) {
      throw new Error("Booking not found");
   }

   const html = buildTicketHtml(booking);

   const fileName = `${bookingId}.pdf`;

   const filePath = path.join("tickets", fileName);

   await generatePdf(html, filePath);

   const pdfUrl = `/tickets/${fileName}`;

   return await createTicketRecord(bookingId, pdfUrl);
};
