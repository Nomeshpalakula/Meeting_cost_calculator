CREATE DATABASE meeting_cost;

\c meeting_cost

CREATE TABLE IF NOT EXISTS meetings (
  id SERIAL PRIMARY KEY,
  agenda TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  total_cost DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS participants (
  id SERIAL PRIMARY KEY,
  meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  hourly_rate DECIMAL(10,2) NOT NULL
);