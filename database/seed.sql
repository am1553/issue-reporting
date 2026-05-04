-- Sample data for development. Run after schema.sql.
-- psql -d issue_tracker -f database/seed.sql

INSERT INTO users (username, email, password_hash) VALUES
    ('aryan', 'aryan@example.com', 'placeholder-hash'),
    ('jane',  'jane@example.com',  'placeholder-hash');

INSERT INTO issues (title, description, status, priority, reported_by) VALUES
    ('Login page error on invalid credentials',
     '500 returned instead of 401 when password is wrong',
     'open', 'high', 2),
    ('Unable to upload file larger than 10MB',
     'Multer config rejects files over 10MB without a clear error',
     'in_progress', 'medium', 1),
    ('Typo in footer on About Us page',
     '"Compnay" should be "Company"',
     'resolved', 'low', 2);
