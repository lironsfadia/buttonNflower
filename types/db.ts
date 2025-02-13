import { Database } from './supabase';

export type Report = Database['public']['Tables']['reports']['Row'];
export type Plant = Database['public']['Tables']['plants']['Row'];
export type User = Database['public']['Tables']['profiles']['Row'];

