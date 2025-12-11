-- Insert 1 test operator
INSERT INTO operator_data (username, password, station_number, printed_tickets)
VALUES ('operator1', 'milan2026', 3, 0);

-- Insert 100 test students
INSERT INTO student_database (email, password, full_name, registration_number, program, department, batch, phone_number, personal_email)
SELECT
  'student' || n || '@srmist.edu.in' as email,
  'password123' as password,
  'Test Student ' || n as full_name,
  'RA' || LPAD(n::text, 13, '0') as registration_number,
  CASE (n % 3)
    WHEN 0 THEN 'B.Tech'
    WHEN 1 THEN 'M.Tech'
    ELSE 'MBA'
  END as program,
  CASE (n % 5)
    WHEN 0 THEN 'Computer Science'
    WHEN 1 THEN 'Electronics'
    WHEN 2 THEN 'Mechanical'
    WHEN 3 THEN 'Civil'
    ELSE 'Information Technology'
  END as department,
  '2024' as batch,
  '+91' || (9000000000 + n)::text as phone_number,
  'student' || n || '@gmail.com' as personal_email
FROM generate_series(1, 100) as n;

-- Insert 100 test tickets (one per student)
INSERT INTO ticket_confirmations (
  name,
  registration_number,
  email,
  batch,
  event_name,
  event_date,
  ticket_price,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  payment_status,
  booking_reference,
  qr_code_data
)
SELECT
  'Test Student ' || n as name,
  'RA' || LPAD(n::text, 13, '0') as registration_number,
  'student' || n || '@srmist.edu.in' as email,
  '2024' as batch,
  CASE (n % 2)
    WHEN 0 THEN 'Thaman Live in Concert'
    ELSE 'Thriple Live Performance'
  END as event_name,
  CASE (n % 2)
    WHEN 0 THEN '2026-02-15 19:00:00+05:30'
    ELSE '2026-02-16 19:00:00+05:30'
  END as event_date,
  CASE (n % 2)
    WHEN 0 THEN 1500.00
    ELSE 1200.00
  END as ticket_price,
  'order_test_' || LPAD(n::text, 10, '0') as razorpay_order_id,
  'pay_test_' || LPAD(n::text, 10, '0') as razorpay_payment_id,
  'sig_test_' || LPAD(n::text, 10, '0') as razorpay_signature,
  'completed' as payment_status,
  'MILAN26-TEST-' || LPAD(n::text, 6, '0') as booking_reference,
  jsonb_build_object(
    'name', 'Test Student ' || n,
    'registration_number', 'RA' || LPAD(n::text, 13, '0'),
    'email', 'student' || n || '@srmist.edu.in',
    'event_name', CASE (n % 2) WHEN 0 THEN 'Thaman Live in Concert' ELSE 'Thriple Live Performance' END,
    'booking_reference', 'MILAN26-TEST-' || LPAD(n::text, 6, '0'),
    'ticket_price', CASE (n % 2) WHEN 0 THEN 1500.00 ELSE 1200.00 END,
    'payment_id', 'pay_test_' || LPAD(n::text, 10, '0')
  ) as qr_code_data
FROM generate_series(1, 100) as n;

-- Insert 90 RSVP confirmations (90 out of 100 students completed RSVP)
INSERT INTO rsvp_confirmations (
  full_name,
  registration_number,
  email,
  ticket_reference,
  event_name,
  rsvp_status
)
SELECT
  'Test Student ' || n as full_name,
  'RA' || LPAD(n::text, 13, '0') as registration_number,
  'student' || n || '@srmist.edu.in' as email,
  'MILAN26-TEST-' || LPAD(n::text, 6, '0') as ticket_reference,
  CASE (n % 2)
    WHEN 0 THEN 'Thaman Live in Concert'
    ELSE 'Thriple Live Performance'
  END as event_name,
  'ready' as rsvp_status
FROM generate_series(1, 90) as n;
