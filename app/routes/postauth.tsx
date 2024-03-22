import {useOutletContext} from "@remix-run/react";
import OutletContext from "~/types/OutletContext";
import {useEffect} from "react";

function Postauth() {
  const {supabase} = useOutletContext<OutletContext>()
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("PostAuth", event)
      if (event === "SIGNED_IN") {
      }
    })
  }, []);
  return null;
}

export default Postauth;