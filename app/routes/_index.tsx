import type {MetaFunction} from "@remix-run/node";
import {Center, Loader, Stack, Title} from "@mantine/core";

export const meta: MetaFunction = () => {
  return [
    {title: "Super App"},
    {name: "description", content: "Welcome to SuperApp!"},
  ];
};

export default function Index() {
  return (
   null
  );
}
