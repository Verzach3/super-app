import {Container, Title, Text, Button, Image, Card, Center, Group, Grid, SimpleGrid} from "@mantine/core";
import {IconCaretRight} from "@tabler/icons-react";
import {motion} from "framer-motion";
import ShortCut from "~/components/patient/ShortCut";
import {Carousel} from "@mantine/carousel";
import {FaUserDoctor} from "react-icons/fa6";

function Patient_index() {
  return (
    <div style={{overflowX: "hidden", paddingBottom: "10rem"}}>
      <Image src={"/consultory.avif"} style={{objectFit: "cover", width: "100%", height: "25rem"}}/>
      <div style={{flex: 1, display: "flex", flexDirection: "column"}}>
        <motion.div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
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
          <Text ta={"left"} size="xl" fw={600} mt={"xl"} mb={"xl"}>Accesos Directos</Text>
        </Container>
        <div
          style={{
            justifyItems: "center"
          }}
        >
          <Carousel style={{
            width: "90%",
          }} mx={"10rem"} slideGap={"xs"} withIndicators slideSize={"10%"} slidesToScroll={1} align={"start"}
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
        </div>
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