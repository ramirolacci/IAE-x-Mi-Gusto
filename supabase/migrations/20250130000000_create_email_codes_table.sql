/*
  # Create email codes table

  1. New Tables
    - `email_codes`
      - `id` (uuid, primary key)
      - `codigo` (text, unique) - The unique code
      - `used` (boolean) - Whether the code has been used
      - `used_at` (timestamptz) - When the code was used
      - `email` (text) - Email that received the code
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `email_codes` table
    - Add policy for public read/write access (needed for email sending)
*/

CREATE TABLE IF NOT EXISTS email_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo text UNIQUE NOT NULL,
  used boolean DEFAULT false,
  used_at timestamptz,
  email text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_codes ENABLE ROW LEVEL SECURITY;

-- Allow public access to read unused codes and update them
CREATE POLICY "Public can read unused codes"
  ON email_codes
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can update codes"
  ON email_codes
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_codes_codigo ON email_codes(codigo);
CREATE INDEX IF NOT EXISTS idx_email_codes_used ON email_codes(used);

-- Insert 400 codes (example codes - puedes generar los tuyos propios)
DO $$
DECLARE
  i INTEGER;
  codigo_generado TEXT;
BEGIN
  FOR i IN 1..400 LOOP
    -- Generar código único: IAE seguido de número de 6 dígitos con ceros a la izquierda
    codigo_generado := 'IAE' || LPAD(i::TEXT, 6, '0');
    
    INSERT INTO email_codes (codigo)
    VALUES (codigo_generado)
    ON CONFLICT (codigo) DO NOTHING;
  END LOOP;
END $$;

