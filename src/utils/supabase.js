import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://yyfnzfoprbgcinoqbmef.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5Zm56Zm9wcmJnY2lub3FibWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzMTUxNjMsImV4cCI6MjAzOTg5MTE2M30.kbhPCW4SIpLVHTgFu1Oclkrq0CWh00Q8ZBti8v5MDmM';

export const supabase = createClient(supabaseUrl, supabaseKey);
