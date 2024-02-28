import {Outlet, useOutletContext} from "@remix-run/react";
import {AppShell, rem} from "@mantine/core";
import React from "react";
import {Header} from "~/components/patient/Header";
import NavBar from "~/components/patient/NavBar";
import {Session, SupabaseClient} from "@supabase/auth-helpers-remix";
import {Database} from "~/types/database.types";

function Patient() {
  const {supabase, session} = useOutletContext<{ supabase: SupabaseClient<Database>, session: Session | null }>();
  return (
    <AppShell header={{height: rem("60px")}} navbar={{width: rem("300px"), breakpoint: "sm"}}>
      <AppShell.Header>
        <Header/>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavBar/>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet context={{supabase, session}}/>
      </AppShell.Main>
    </AppShell>
  )
}

export default Patient;