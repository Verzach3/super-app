import {Container, Title, Text, Image, Card, Center, Group, SimpleGrid} from "@mantine/core";
import {IconCaretRight} from "@tabler/icons-react";
import {motion} from "framer-motion";
import ShortCut from "~/components/patient/ShortCut";
import {Carousel} from "@mantine/carousel";
import {FaUserDoctor} from "react-icons/fa6";
import {LoaderFunctionArgs} from "@remix-run/node";
import {createServerClient} from "@supabase/auth-helpers-remix";
import {Database} from "~/types/database.types";
import * as process from "process";

export async function loader({request}: LoaderFunctionArgs) {
  const response = new Response();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code) {
    const supabase = createServerClient<Database>(
      process.env.SUPABASE_URL ?? "",
      process.env.SUPABASE_ANON_KEY ?? "",
      {request, response}
    )
  }
  return null
}

function Patient_index() {
  return (
    <div style={{overflowX: "hidden", paddingBottom: "10rem"}}>
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
          <Title ta={"left"} mt={"xss"} style={{fontFamily: "Inter"}}>Hola, [Patient Name]</Title>
          <Text ta={"left"} size="xl" fw={600} mt={"xl"} mb={"xl"}>Accesoss Directos</Text>
        </Container>
        <Center inline>

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
        </Center>
        <Center>

          <Container mx={"2rem"} w={"90rem"} style={{justifySelf: "center"}}>
            <Text ta={"left"} size="xl" fw={600} mt={"xl"} mb={"xl"}>Recibe Atencion</Text>
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
          </Container>
        </Center>
      </div>
    </div>
  )
}

export default Patient_index;