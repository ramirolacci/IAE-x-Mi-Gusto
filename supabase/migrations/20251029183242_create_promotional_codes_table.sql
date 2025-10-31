/*
  # Create promotional codes table

  1. New Tables
    - `promotional_codes`
      - `id` (uuid, primary key)
      - `codigo_promocional` (text, unique) - The promotional code
      - `dni` (text) - The DNI associated with the code
      - `created_at` (timestamp)
      - `used` (boolean) - Whether the code has been used
  
  2. Security
    - Enable RLS on `promotional_codes` table
    - Add policy for public read access (needed for validation)
*/

CREATE TABLE IF NOT EXISTS promotional_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo_promocional text UNIQUE NOT NULL,
  dni text NOT NULL,
  created_at timestamptz DEFAULT now(),
  used boolean DEFAULT false
);

ALTER TABLE promotional_codes ENABLE ROW LEVEL SECURITY;

-- Allow public read access for validation purposes
CREATE POLICY "Public can read promotional codes for validation"
  ON promotional_codes
  FOR SELECT
  TO anon
  USING (true);

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_promotional_codes_codigo ON promotional_codes(codigo_promocional);
CREATE INDEX IF NOT EXISTS idx_promotional_codes_dni ON promotional_codes(dni);