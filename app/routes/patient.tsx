import {Outlet, useOutletContext} from "@remix-run/react";
import {AppShell, rem} from "@mantine/core";
import React from "react";
import {Header} from "~/components/patient/Header";
import NavBar from "~/components/patient/NavBar";
import {Session, SupabaseClient} from "@supabase/auth-helpers-remix";
import {Database} from "~/types/database.types";
import {useDisclosure} from "@mantine/hooks";

function Patient() {
  const {supabase, session} = useOutletContext<{ supabase: SupabaseClient<Database>, session: Session | null }>();
  const [mobileOpened, {toggle: toggleMobile}] = useDisclosure();
  const [desktopOpened, {toggle: toggleDesktop}] = useDisclosure(true);
  return (
    <AppShell header={{height: rem("60px")}} navbar={{
      width: rem("300px"),
      breakpoint: "sm",
      collapsed: {mobile: !mobileOpened, desktop: !desktopOpened},
    }}>
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