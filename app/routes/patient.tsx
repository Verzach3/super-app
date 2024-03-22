import {Outlet, useLoaderData, useOutletContext} from "@remix-run/react";
import {AppShell, Modal, rem} from "@mantine/core";
import React, {useCallback, useEffect} from "react";
import {Header} from "~/components/patient/Header";
import NavBar from "~/components/patient/NavBar";
import {Session, SupabaseClient} from "@supabase/auth-helpers-remix";
import {Database} from "~/types/database.types";
import {useDisclosure} from "@mantine/hooks";
import {json, LoaderFunctionArgs} from "@remix-run/node";
import {createServerClient} from "~/util/supabase.server";
import {checkForRoles} from "~/util/checkForRole";
import "survey-core/i18n/spanish.js";
import svyUi from "survey-react-ui";
import svyCore from "survey-core";
import {onboardQuestions} from "~/util/onboardQuestions";

const {Survey} = svyUi;

export async function loader({request}: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createServerClient({request, response});
  const authorized = await checkForRoles(["client", "admin"], supabase);
  if (!authorized) {
    return json({error: "Unauthorized", status: 401}, {
      status: 401
    })
  }
  const session = await supabase.auth.getSession();
  const profile = await supabase.from("patient_profiles").select("*").eq("user_id", session?.data.session?.user.id ?? "").single()
  if (!profile.data) {
    return json({error: "User does'nt exist", status: 418}, {
      status: 418
    })
  }

  return json({ status: 200})
}

function Patient() {
  const loaderData = useLoaderData<typeof loader>()
  const {supabase, session} = useOutletContext<{ supabase: SupabaseClient<Database>, session: Session | null }>();
  const [mobileOpened, {toggle: toggleMobile}] = useDisclosure();
  const [desktopOpened, {toggle: toggleDesktop}] = useDisclosure(true);
  const model = new svyCore.Model(onboardQuestions);
  model.locale = "es";
  const [onboardOpened, {open, close}] = useDisclosure();
  useEffect(() => {
    if ("error" in loaderData) {
      if (loaderData.status === 418) {
        open()
      }
    }
  }, []);

  const surveyComplete = useCallback((sender: typeof model) => {
    console.log(sender.data)
  }, []);

  model.onComplete.add(surveyComplete);

  return (
    <>
      <Modal opened={onboardOpened} onClose={() => {
      }} size={"xl"} withCloseButton={false} styles={{body: {padding: 0}}}>
        <Survey model={model}/>
      </Modal>
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
    </>
  )
}

export default Patient;