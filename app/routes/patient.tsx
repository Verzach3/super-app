import {Outlet} from "@remix-run/react";
import {AppShell, rem} from "@mantine/core";
import React from "react";
import {Header} from "~/components/patient/Header";
import NavBar from "~/components/patient/NavBar";

function Patient() {
  return (
    <AppShell header={{ height: rem("60px")}} navbar={{ width: rem("300px"), breakpoint: "sm"}}>
      <AppShell.Header>
        <Header/>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavBar/>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet/>
      </AppShell.Main>
    </AppShell>
    )
}

export default Patient;