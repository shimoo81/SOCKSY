import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jkmdxdajqrgwgytecpgi.supabase.co/rest/v1/";
const supabaseKey = "sb_publishable__JiVQ4_oQDkGs6n8R74CmQ_h5PCyKqc";

export const supabase = createClient(supabaseUrl, supabaseKey);
