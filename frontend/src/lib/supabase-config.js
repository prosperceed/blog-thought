
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database


    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_KEY

    
 const supabase = createClient(url, key);

 export default supabase;