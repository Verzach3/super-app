import {
  ActionIcon,
  Affix,
  Button,
  Card,
  Group,
  Input,
  Menu,
  rem,
  Table,
  Title,
  Text,
  Modal,
  TextInput, JsonInput
} from "@mantine/core";
import SurveysListItem from "~/components/dashboard/surveys/SurveysListItem";
import {
  IconArrowsLeftRight,
  IconMessageCircle,
  IconPhoto,
  IconPlus,
  IconSearch,
  IconSettings, IconTrash
} from "@tabler/icons-react";
import SurveysAffixBtn from "~/components/dashboard/surveys/SurveysAffixBtn";
import {useDisclosure} from "@mantine/hooks";
import {useAtomValue} from "jotai";
import {useEffect} from "react";
import {json, LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {createServerClient} from "@supabase/auth-helpers-remix";
import {Database} from "~/types/database.types";
import process from "process";
import {checkForRoles} from "~/util/checkForRole";

export const loader = async ({request}: LoaderFunctionArgs) => {
  const response = new Response();
  const supabase = createServerClient<Database>(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_ANON_KEY ?? "",
    {request, response}
  )
  const authorized = await checkForRoles(["patient", "admin"], supabase);
  if (!authorized) {
    return json({error: "Unauthorized", data: {}}, {
      status: 401
    })
  }
  return json({data: (await supabase.from("surveys").select("*")).data, error: ""}, {
    headers: response.headers
  })
}

function DashboardSurveys() {
  const [opened, {open, close}] = useDisclosure(false);
  const {data} = useLoaderData<typeof loader>()
  useEffect(() => {
    console.log(data)
  }, []);
  return (
    <>
      <Modal pb={"xl"} size={"xl"} opened={opened} onClose={close} centered title={"Crear una Encuesta"} styles={{
        title: {
          fontFamily: "Inter",
          fontWeight: 600
        }
      }}>
        <TextInput label={"Nombre de la Encuesta"} placeholder={"Encuesta de satisfaccion"}/>
        <JsonInput
          variant={"filled"}
          style={{
            marginTop: "1rem"
          }} label={"El JSON de la Encuesta"}
          placeholder="{Hello: 'World'}"
          validationError="Invalid JSON"
          formatOnBlur
          autosize
          minRows={4}
        />
        <Affix position={{bottom: 10, right: 10}}>
          <Button style={{marginTop: "1rem"}} color="teal" rightSection={<IconPlus/>}>
            Crear
          </Button>
        </Affix>
      </Modal>
      <Affix position={{bottom: 10, right: 10}}>
        <SurveysAffixBtn/>
      </Affix>
      <div style={{margin: "1rem"}}>
        <Title style={{fontFamily: "Inter"}}>
          Encuestas
        </Title>
        <Group style={{marginBottom: "1rem", marginTop: "1rem"}}>
          <Input style={{flex: 1}}/>
          <Button variant="light" style={{marginLeft: "1rem"}} rightSection={<IconSearch/>}>
            Search
          </Button>
        </Group>

        <Card withBorder>
          <Table>
            <Table.Thead style={{
              backgroundColor: "#f5f5f5",
              borderColor: "#C6C6C6"
            }}>
              <Table.Tr>
                <Table.Th
                >Survey Name</Table.Th>
                <Table.Th>Survey Description</Table.Th>
                <Table.Th>Survey Status</Table.Th>
                <Table.Th>Survey Date</Table.Th>
                <Table.Th>Survey Link</Table.Th>
                <Table.Th>Survey Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {Array.from({length: 100}).map((_, i) => (<SurveysListItem key={i}/>))}
            </Table.Tbody>
          </Table>
        </Card>
      </div>
    </>
  )
}

export default DashboardSurveys;
