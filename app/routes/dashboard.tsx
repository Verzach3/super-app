import { AppShell } from "@mantine/core";
import { DashNav } from "~/components/dashboard/DashNav";
import { Outlet } from "@remix-run/react";

export default function Dashboard() {
  return (
    <AppShell
    navbar={{
      width: 300,
      breakpoint: "sm",

    }}
    >
      <AppShell.Navbar>
        <DashNav />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
