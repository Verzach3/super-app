import type {MetaFunction} from "@remix-run/node";
import SuperAppLoader from "~/components/SuperAppLoader";
import {useNavigate, useNavigation} from "@remix-run/react";
import {useEffect} from "react";

export const meta: MetaFunction = () => {
  return [
    {title: "Super App"},
    {name: "description", content: "Welcome to SuperApp!"},
  ];
};

export default function Index() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(navigation);
    if (navigation.state === "loading" || navigation.state === "idle") {
      navigate("/dashboard");
    }
  }, [navigation, navigate]);
  return (
    <SuperAppLoader/>
  );
}
