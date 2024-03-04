import superagent from "superagent"
import * as process from "process";
import {json, LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData, useRevalidator} from "@remix-run/react";
import {Patient} from "fhir/r4";
import {Button, Card, Center, Container, Group, SimpleGrid, Stack, Text, ThemeIcon, Title} from "@mantine/core";
import getAxiosClientServer from "~/util/getAxiosClient.server";
import {getToken} from "~/util/tokenUtil.server";
import {useEffect} from "react";
import {IconUser} from "@tabler/icons-react";
import {createServerClient} from "@supabase/auth-helpers-remix";
import {checkForRoles} from "~/util/checkForRole";

export const loader = async ({request}: LoaderFunctionArgs) => {
  const response = new Response();
  const supabaseClient = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    request,
    response
  });
  const hasRole = await checkForRoles(["admin"], supabaseClient);
  if (!hasRole) {
    console.log("Unauthorized")
    return json(null, {
      status: 401,
      headers: response.headers
    })
  }
  try {
    const axiosres = await getAxiosClientServer().get("https://emr.wellfitclinic.com/apis/default/fhir/Patient", {
      headers: {
        Authorization: `Bearer ${await getToken() ?? ""}`
      }
    },)
    return json(axiosres.data, {headers: response.headers});
  } catch (e) {
    console.log("Error fetching patients", e);
    return json(null, {
      status: 500,
      headers: response.headers
    })
  }

}

function DashboardPatients() {
  const data = useLoaderData<typeof loader>()
  const revalidator = useRevalidator();
  useEffect(() => {
    console.log(data)
    if (data === null) {
      revalidator.revalidate();
    }
  }, [data]);
  return (
    <Container>
      <Title style={{marginTop: "2rem"}}>
        Pacientes
      </Title>
      <SimpleGrid cols={2}>
        {
          data && data?.entry?.map(({resource}: { resource: Patient }) => {
            return (
              <Card withBorder m={"md"} key={resource.id}>
                <Group>
                  <Text fw={700}>
                    Id:
                  </Text>
                  <Text>
                    {resource.id}
                  </Text>
                </Group>
                <Group gap={0}>
                  <ThemeIcon size={"xl"} mr={"1rem"}>
                    <IconUser/>
                  </ThemeIcon>
                  <Group>
                    <Stack gap={0}>
                      <Group>
                        <Text fw={700}>
                          Nombre:
                        </Text>
                        <Text>
                          {resource.name?.[0].given?.[0]} {resource.name?.[0].family}
                        </Text>
                      </Group>
                      <Group>
                        <Text fw={700}>
                          Nacimiento:
                        </Text>
                        <Text>
                          {resource.birthDate}
                        </Text>
                      </Group>
                    </Stack>
                  </Group>
                </Group>
                <Card.Section>
                  <Container>
                    <Button>
                      Ver
                    </Button>
                  </Container>
                </Card.Section>
              </Card>
            )
          })
        }
      </SimpleGrid>
    </Container>
  )
}

export default DashboardPatients;