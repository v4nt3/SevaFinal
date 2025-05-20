import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL="https://mspnqsevkkyghhdvcesk.supabase.co"
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcG5xc2V2a2t5Z2hoZHZjZXNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNDk5MjcsImV4cCI6MjA2MjcyNTkyN30.6hSzCLgiqs-TJ8AKfdBz06wxfXxcSVWdd0oUtAkd3sY"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
