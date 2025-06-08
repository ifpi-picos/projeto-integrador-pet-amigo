import { createClient } from '@supabase/supabase-js'

// Pegue a URL e a Chave Pública do painel do seu projeto Supabase
const supabaseUrl = 'https://bpcusshibcfxbzawgtfb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwY3Vzc2hpYmNmeGJ6YXdndGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDk3NjYsImV4cCI6MjA2NDk4NTc2Nn0.9HjFDyBIkKT3ZQFqYS-AJ90iRsS4LH2H_k8QoUstw10';

// Cria e exporta o cliente Supabase para ser usado em todo o seu app
export const supabase = createClient(supabaseUrl, supabaseKey);