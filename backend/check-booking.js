// backend/check-booking.js
const Database = require('better-sqlite3');
const path = require('path');

// Connect to the Booking Database
const dbPath = path.join(__dirname, 'BookingDb', 'bookings.db');
const db = new Database(dbPath);

// Get all bookings
const bookings = db.prepare('SELECT * FROM bookings ORDER BY id DESC').all();

if (bookings.length === 0) {
  console.log('❌ No bookings found.');
} else {
  console.log('\n=============================================');
  console.log(`FOUND ${bookings.length} BOOKINGS`); 
  console.log('=============================================');
  
  // Display as a nice table
  console.table(bookings.map(b => ({
    ID: b.id,
    Customer: b.customer_name,
    Phone: b.customer_phone,
    Date: b.booking_date,
    Time: b.booking_time,
    Service_ID: b.service_id,
    Total: `$${b.total_price}`,
    Status: b.status
  })));
}