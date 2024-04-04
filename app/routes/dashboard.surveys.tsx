import {ActionIcon, Affix, Button, Group, Input, Modal, Title,} from "@mantine/core";
import SurveysListItem from "~/components/dashboard/surveys/SurveysListItem";
import {IconPlus, IconSearch} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {ActionFunctionArgs, json, LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {createServerClient} from "@supabase/auth-helpers-remix";
import {Database} from "~/types/database.types";
import process from "process";
import {checkForRoles} from "~/util/checkForRole";
import AsignSurvey from "~/components/dashboard/surveys/AsignSurvey";
import {CardTable} from "~/components/dashboard/surveys/CardTable";
import {CreateSurveyModal} from "~/components/dashboard/surveys/CreateSurveyModal";

export const loader = async ({request}: LoaderFunctionArgs) => {
  const response = new Response();
  const supabase = createServerClient<Database>(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_ANON_KEY ?? "",
    {request, response}
  );
  const authorized = await checkForRoles(["patient", "admin"], supabase);
  if (!authorized) {
    return json(
      {error: "Unauthorized", data: null},
      {
        status: 401,
      }
    );
  }
  const patients = (await supabase.from("patient_profiles").select("*").limit(20)).data
  const surveys = (await supabase.from("surveys").select("*")).data
  return json(
    {
      data: {patients, surveys}, error: null
    },
    {
      headers: response.headers,
    }
  );
};

export async function action({request}: ActionFunctionArgs) {
  const response = new Response();
  const supabase = createServerClient<Database>(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_ANON_KEY ?? "",
    {request, response}
  );
  const authorized = await checkForRoles(["patient", "admin"], supabase);
  if (!authorized) {
    return json(
      {error: "Unauthorized", data: null},
      {
        status: 401,
      }
    );
  }
  return json(
    {data: "Success", error: null},
    {
      headers: response.headers,
    }
  );

}

function DashboardSurveys() {
  const [createOpened, {open: openCreate, close: closeCreate}] = useDisclosure(false);
  const [asignOpened, {open: openAsign, close: closeAsign}] = useDisclosure(true);
  const [asignSearch, setAsignSearch] = useState<string>("")
  const loaderData = useLoaderData<typeof loader>();
  useEffect(() => {
    console.log(loaderData);
  }, [loaderData]);

  useEffect(() => {

  }, [asignSearch]);

  if (loaderData.error) {
    return <div>{loaderData.error}</div>;
  }

  return (
    <>
      <CreateSurveyModal opened={createOpened} onClose={closeCreate}/>
      <Modal opened={asignOpened} onClose={closeAsign} withCloseButton={false}>
        <AsignSurvey data={loaderData.data?.patients ?? []} setSearch={setAsignSearch} search={asignSearch}/>
      </Modal>
      <Affix position={{bottom: 10, right: 10}}>
        {!(!asignOpened || !createOpened) && (
          <ActionIcon size={"xl"} radius={100} onClick={openCreate}>
            <IconPlus size={25}/>
          </ActionIcon>
        )}
      </Affix>
      <div style={{margin: "1rem"}}>
        <Title style={{fontFamily: "Inter"}}>Encuestas</Title>
        <Group style={{marginBottom: "1rem", marginTop: "1rem"}}>
          <Input style={{flex: 1}}/>
          <Button
            variant="light"
            style={{marginLeft: "1rem"}}
            rightSection={<IconSearch/>}
          >
            Search
          </Button>
        </Group>

        <CardTable loaderData={loaderData} callbackfn={(survey) => (
          <SurveysListItem key={survey.id} survey={survey}/>
        )}/>
      </div>
    </>
  );
}

export default DashboardSurveys;
