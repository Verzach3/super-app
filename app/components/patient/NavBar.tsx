import {useEffect, useRef, useState} from 'react';
import {UnstyledButton, Tooltip, Title, rem, Text} from '@mantine/core';
import {
  IconHome2
  , IconCalendarMonth, IconFileSpreadsheet, IconFirstAidKit, IconFileInvoice, IconLibrary, IconMessages,
} from '@tabler/icons-react';
import classes from '../../styles/patient/NavBar.module.css';
import autoAnimate from "@formkit/auto-animate";

const mainLinksLabel = [
  {icon: IconHome2, label: 'Inicio'},
  {icon: IconCalendarMonth, label: 'Citas'},
  {icon: IconFileSpreadsheet, label: 'Registros'},
  {icon: IconFirstAidKit, label: 'Reciba Atencion'},
  {icon: IconFileInvoice, label: 'Pagar Factura'},
  {icon: IconLibrary, label: 'Recursos Para Pacientes'},
  {icon: IconMessages, label: 'Mensajes'},
];

type MainLinksLabels = typeof mainLinksLabel[number]['label'];

type LinksType = {
  [K in MainLinksLabels]: string[]; // replace 'any' with the type you want
};

const navLinks: LinksType = {
  "Inicio": [
    "Analisis",
    "Medicamentos",
    "Renovar mi receta medica",
    "Pagar Factura",

  ],
  "Citas": [
    "Tus citas"
  ],
  "Registros": [
    "Historias clinicas compartidas",
    "Analisis",
    "Resultados de diagnosticos",
    "Diagnostico por imagenes",
    "Centro de documentos",
    "Alergias",
    "Condiciones de Salud",
    "Vacunaciones",
    "Medicamentos",
    "Renovar mi receta medica",
    "Valores clinicos",
    "Procedimientos"
  ],
  "Reciba Atencion": [
    "Programar una cita",
    "Atencion el mismo dia",
    "Ver ubicaciones",
    "Salud de la mujer"
  ],
  "Pagar Factura": [
    "Pendientes",
    "Historial de pagos",
    "Gestionar Metodos de pago"
  ],
  "Recursos Para Pacientes": [
    "Recursos Masculinos",
    "Recursos Femeninos",
  ],
  "Mensajes": [
    "Mensajes",
    "Notificaciones",
    "Alertas",
    "Recordatorios",
  ],
}


export default function NavBar() {
  const [active, setActive] = useState<MainLinksLabels>('Inicio');
  const [activeLink, setActiveLink] = useState('Settings');
  const parent = useRef(null)
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  const mainLinks = mainLinksLabel.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{duration: 0}}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
      </UnstyledButton>
    </Tooltip>
  ));

  const links = navLinks[active].map((link) => (
    <a
      className={classes.link}
      data-active={activeLink === link || undefined}
      href="#"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            <Text>
              Logo
            </Text>
          </div>
          {mainLinks}
        </div>
        <div className={classes.main} ref={parent}>
          <Title order={4} className={classes.title}>
            {active}
          </Title>
          {links}
        </div>
      </div>
    </nav>
  );
}