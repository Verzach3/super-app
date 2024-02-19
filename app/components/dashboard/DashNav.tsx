import {useEffect, useState} from 'react';
import {Group, Code, Text} from '@mantine/core';
import {
  IconSettings,
  IconLogout, IconPuzzle, IconCheckbox, IconPlugConnected, IconLayoutDashboard, IconReport,
} from '@tabler/icons-react';
import classes from '../../styles/dashboard/DashNav.module.css';
import {UserButton} from "~/components/dashboard/UserButton";
import {Link, useLocation } from "@remix-run/react";

const data = [
  {link: '/dashboard', label: 'Inicio', icon: IconLayoutDashboard},
  {link: '/dashboard/surveys', label: 'Encuestas', icon: IconCheckbox},
  {link: '/dashboard/surveys/results', label: 'Resultados', icon: IconReport},
  {link: '/dashboard/integrations', label: 'Integraciones', icon: IconPlugConnected},
  {link: '/dashboard/modules', label: 'Modulos', icon: IconPuzzle},
  {link: '/dashboard/settings', label: 'Ajustes', icon: IconSettings},
];

export function DashNav() {
  const navigation = useLocation();
  const [active, setActive] = useState("Encuestas");
  useEffect(() => {
    const current = navigation.pathname.split("/").pop();
    console.log(current)
    data.forEach((item) => {
      if (item.link.split("/").pop() === current) {
        setActive(item.label);
        return
      }
    });
    if (navigation.pathname === "/dashboard") {
      setActive("Inicio");
    }
  }, [navigation]);

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}

    >
      <item.icon className={classes.linkIcon} stroke={1.5}/>
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">

          <Text style={{fontFamily: "Inter"}} fw={900}>
            SuperApp
          </Text>
          <Code fw={700}>v0.0.1</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <UserButton/>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5}/>
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}