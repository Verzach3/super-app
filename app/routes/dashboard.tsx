import {AppShell} from "@mantine/core";
import {DashNav} from "~/components/dashboard/DashNav";
import {Outlet, useOutletContext} from "@remix-run/react";
import {Session, SupabaseClient} from "@supabase/auth-helpers-remix";
import {Database} from "~/types/database.types";
import {useEffect} from "react";
import OutletContext from "~/types/OutletContext";

export default function Dashboard() {
  const {supabase, session} = useOutletContext<OutletContext>();
  useEffect(() => {
    void checkSession()
  }, []);

  async function checkSession() {
    const ses = await supabase.auth.getSession()
    console.log(ses)
  }

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
    >
      <AppShell.Navbar>
        <DashNav/>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet context={{supabase, session}}/>
      </AppShell.Main>
    </AppShell>
  );
}
