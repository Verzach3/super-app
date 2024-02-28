import {Session, SupabaseClient} from "@supabase/auth-helpers-remix";
import {Database} from "~/types/database.types";
import {atom} from "jotai";

export const supabaseAtom = atom<{supabase: SupabaseClient<Database>, session: Session | null} | undefined>(undefined);