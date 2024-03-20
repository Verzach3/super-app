import {Container, Title, Text, Image, Card, Center, Group, SimpleGrid, Stack} from "@mantine/core";
import {IconCaretRight} from "@tabler/icons-react";
import {motion} from "framer-motion";
import ShortCut from "~/components/patient/ShortCut";
import {Carousel} from "@mantine/carousel";
import {FaUserDoctor} from "react-icons/fa6";
import {json, LoaderFunctionArgs} from "@remix-run/node";
import {checkForRoles} from "~/util/checkForRole";
import {getPatientData} from "~/util/emrAPI.server";
import {useLoaderData} from "@remix-run/react";
import {useEffect, useState} from "react";
import {Patient} from "fhir/r4";
import {createServerClient} from "~/util/supabase.server";

export async function loader({request}: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createServerClient({request, response});
  const authorized = await checkForRoles(["patient", "admin"], supabase);
  if (!authorized) {
    return json({error: "Unauthorized"}, {
      status: 401
    })
  }
  const session = await supabase.auth.getSession();
  const profile = await supabase.from("patient_profiles").select("*").eq("user_id", session?.data.session?.user.id ?? "").single()
  if (!profile.data) {
    return json({error: "User does'nt exist"}, {
      status: 500
    })
  }
  const data = await getPatientData(profile.data.emr_id)
  return json({patient: data}, {
    headers: response.headers
  })
}

function Patient_index() {
  const loaderData = useLoaderData<typeof loader>()
  const [patient, setPatient] = useState<Patient | null>(null)
  useEffect(() => {
    if (Object.hasOwn(loaderData, "error")) {
      return
    }
    if (Object.hasOwn(loaderData, "patient")) {
      // @ts-ignore
      setPatient(loaderData?.patient)
    }
  }, []);
  return (
    <div style={{paddingBottom: "10rem"}}>
      <Image src={"/consultory.avif"} style={{objectFit: "cover", width: "100%", height: "25rem"}}/>
      <div style={{flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", height: "100%"}}>
        <motion.div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            width: "fit-content",
          }}
          whileHover={{
            scale: 1.03,
          }}
        >
          <Card withBorder w={"25rem"} style={{alignSelf: "flex-end", top: "-2.5rem", marginRight: "2rem"}}>
            <Center>
              <Group>
                <Title size={"1.2rem"}>
                  ¿Necesitas una cita para diagnostico?
                </Title>
                Necesitas ayuda?
              </Group>
              <IconCaretRight size={"2rem"}/>
            </Center>
          </Card>
        </motion.div>
        <Container w={"100%"}>
          <Title ta={"left"} mt={"xss"} style={{fontFamily: "Inter"}}>Hola, {patient?.name?.[0].given ?? ""}</Title>
          <Text ta={"left"} size="xl" fw={600} mt={"xl"} mb={"xl"}>Accesos Directos</Text>
        </Container>
        <Container style={{width: "100vw", overflowX: "hidden"}} p={0}>
          <Carousel slideGap={"xs"} withIndicators slideSize={"10%"} align={"start"}
                    withControls={false}>
            <Carousel.Slide>
              <ShortCut image={"/consultory.avif"} title={"Pagar Facturas"}
                        description={"Paga tu factura de manera segura y rápida"}/>
            </Carousel.Slide>
            <Carousel.Slide>
              <ShortCut image={"/consultory.avif"} title={"Pagar Facturas"}
                        description={"Paga tu factura de manera segura y rápida"}/>
            </Carousel.Slide>
            <Carousel.Slide>
              <ShortCut image={"/consultory.avif"} title={"Pagar Facturas"}
                        description={"Paga tu factura de manera segura y rápida"}/>
            </Carousel.Slide>
            <Carousel.Slide>
              <ShortCut image={"/consultory.avif"} title={"Pagar Facturas"}
                        description={"Paga tu factura de manera segura y rápida"}/>
            </Carousel.Slide>
          </Carousel>
        </Container>
        <Container>
          <Stack>
            <Center>
              <Title ta={"center"} order={3} fw={600} mt={"4rem"} mb={"md"}>Recibe Atencion</Title>
            </Center>
            <SimpleGrid cols={2}>
              <Card withBorder py={"lg"}>
                <Center>
                  <FaUserDoctor size={"1.5rem"} style={{marginRight: "0.5rem"}}/>
                  <Title size={"1.2rem"}>¿Necesitas una cita para diagnostico?</Title>
                </Center>
              </Card>
              <Card withBorder py={"lg"}>
                <Center>
                  <FaUserDoctor size={"1.5rem"} style={{marginRight: "0.5rem"}}/>
                  <Title size={"1.2rem"}>¿Necesitas una cita para diagnostico?</Title>
                </Center>
              </Card>
              <Card withBorder py={"lg"}>
                <Center>
                  <FaUserDoctor size={"1.5rem"} style={{marginRight: "0.5rem"}}/>
                  <Title size={"1.2rem"}>¿Necesitas una cita para diagnostico?</Title>
                </Center>
              </Card>
              <Card withBorder py={"lg"}>
                <Center>
                  <FaUserDoctor size={"1.5rem"} style={{marginRight: "0.5rem"}}/>
                  <Title size={"1.2rem"}>¿Necesitas una cita para diagnostico?</Title>
                </Center>
              </Card>
            </SimpleGrid>
          </Stack>
        </Container>
      </div>
    </div>
  )
}

export default Patient_index;