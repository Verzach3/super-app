import "@mantine/core/styles.css"
import "@mantine/charts/styles.css"
import "@mantine/carousel/styles.css"
import {cssBundleHref} from "@remix-run/css-bundle";
import type {LinksFunction, MetaFunction} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import {MantineProvider} from "@mantine/core";
import primetheme from 'primereact/resources/themes/lara-light-indigo/theme.css';
import primecore from 'primereact/resources/primereact.min.css';
import primeicons from 'primeicons/primeicons.css';
import primeflex from 'primeflex/primeflex.min.css';


export const meta: MetaFunction = () => {
  return [
    {title: "Super App"},
    {name: "description", content: "Welcome to SuperApp!"},
  ];
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{rel: "stylesheet", href: cssBundleHref}] : []),
  {
    rel: 'stylesheet',
    href: primeflex,
  },
  {
    rel: 'stylesheet',
    href: primetheme,
  },
  {
    rel: 'stylesheet',
    href: primecore,
  },
  {
    rel: 'stylesheet',
    href: primeicons,
  },
];

export default function App() {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={""}/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"/>
      <Meta/>
      <Links/>
    </head>
    <body>
    <MantineProvider>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
    </MantineProvider>
    </body>
    </html>
  );
}
