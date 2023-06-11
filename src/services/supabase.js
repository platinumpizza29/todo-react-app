import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pdqgimbztwvmxmkbbppv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkcWdpbWJ6dHd2bXhta2JicHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYzMzc1MjQsImV4cCI6MjAwMTkxMzUyNH0.SZ9FGHYGrvZrFAeLC3idGqw_uspdF0GwgiYzG2jegv0";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
