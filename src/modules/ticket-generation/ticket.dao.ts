import prisma from "../../config/prisma";

export const getTicketData = async (bookingId: string) => {
   return prisma.bookings.findUnique({
      where: {
         id: bookingId,
      },
      include: {
         user: true,
         booking_passengers: true,
         trip: {
            include: {
               bus: true,
            },
         },
         pickup_location: true,
         dropoff_location: true,
         booking_seats: {
            include: {
               seat_inventory: {
                  include: {
                     bus_seat: true,
                  },
               },
            },
         },
      },
   });
};

export const createTicketRecord = async (bookingId: string, pdfUrl: string) => {
   return prisma.tickets.create({
      data: {
         bookingId,
         pdfUrl,
      },
   });
};
