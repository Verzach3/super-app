import {Card, Container, Group, Progress, Stack, Text, Title} from "@mantine/core";
import {createServerClient} from "~/util/supabase.server";
import {json, LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {useEffect} from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createServerClient({request, response});
  const surveys = await supabase.from("surveys_asigns").select("surveys (*), answer_id, id")
  console.log(surveys)
  return json({surveys: surveys.data}, {
    headers: response.headers
  })
}

function PatientSurveys() {
  const loaderData = useLoaderData<typeof loader>()

  useEffect(() => {
    console.log(loaderData)
  }, []);
  return (
    <Container mt={"1rem"}>
      <Title style={{fontFamily: "Inter", fontWeight: 800, marginBottom: "3rem", marginTop: "2rem"}}>
        Encuestas
      </Title>

      {loaderData.surveys?.map((survey) => {
        if (!survey.surveys) return null
        return (
          <Card withBorder shadow={"lg"} key={survey.id} mt={"md"}>
            <Group justify={"space-between"} gap={0}>
              <Stack gap={0}>
                <Text fw={"bold"} size={"lg"} ff={"Inter"}>
                  {survey.surveys.name}
                </Text>
                <Text lineClamp={1} ff={"Inter"} fw={400}>
                  {survey.surveys.description}
                </Text>
              </Stack>
              <Stack gap={0}>
                <Progress value={100} color={survey.answer_id !== null ? "green" : "orange"}/>
                <Text>
                  {survey.answer_id ? "Completada" : "No Completada"}
                </Text>
              </Stack>
            </Group>
          </Card>
        )
      })}
    </Container>
  )
}

export default PatientSurveys;