import {Button, Container, Divider, Group, Menu, SimpleGrid, Stack, Text, Title} from "@mantine/core";
import MedicationCard from "~/components/patient/medications/MedicationCard";
import ResultsFilter from "~/components/patient/ResultsFilter";

function PatientMedications() {


  return (
    <Container mt={"1rem"}>
      <Title style={{fontFamily: "Inter", fontWeight: 800, marginBottom: "3rem", marginTop: "2rem"}}>
        Medicamentos
      </Title>
      <ResultsFilter/>
      <div style={{marginTop: "2rem"}}>
        <Text size={"lg"} fw={600}>Enero 1, 2024</Text>
        <SimpleGrid cols={2}>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
        </SimpleGrid>
      </div>
      <div style={{marginTop: "2rem"}}>
        <Text size={"lg"} fw={600}>Enero 1, 2024</Text>
        <SimpleGrid cols={2}>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
        </SimpleGrid>
      </div>
      <div style={{marginTop: "2rem"}}>
        <Text size={"lg"} fw={600}>Enero 1, 2024</Text>
        <SimpleGrid cols={2}>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
        </SimpleGrid>
      </div>
    </Container>
  )
}

export default PatientMedications;