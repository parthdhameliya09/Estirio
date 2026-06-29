export const buildTicketHtml = (booking: any) => {
   const seats = booking.booking_seats
      .map((seat: any) => seat.seat_inventory.bus_seat.seatNumber)
      .join(", ");

   return `
<!DOCTYPE html>

<html>

<head>

<style>

body{
  font-family: Arial;
  padding:20px;
}

.container{
 border:1px solid #ddd;
 padding:20px;
}

.title{
 font-size:28px;
 font-weight:bold;
}

</style>

</head>

<body>

<div class="container">

<h1 class="title">
Bus Ticket
</h1>

<hr/>

<p>
Booking ID:
${booking.id}
</p>

<p>
Passenger:
${booking.user.firstName}
${booking.user.lastName}
</p>

<p>
Trip Code:
${booking.trip.tripCode}
</p>

<p>
From:
${booking.pickup_location.name}
</p>

<p>
To:
${booking.dropoff_location.name}
</p>

<p>
Seats:
${seats}
</p>

<p>
Amount:
₹${booking.totalAmount}
</p>

</div>

</body>

</html>
`;
};
