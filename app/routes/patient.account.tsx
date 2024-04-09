import {Button, Container, SimpleGrid, Text, TextInput} from "@mantine/core";
import {DatePickerInput} from "@mantine/dates";

function PatientAccount() {
  return (
    <Container mt={"xl"}>
      <Text size={"2rem"} ff={"Inter"} fw={600}>
        Perfil
      </Text>
      <Text ff={"Inter"} fw={400} size={"lg"} mt={"md"}>
        Update your account information. Changes will be reflected across the platform.
      </Text>

      <SimpleGrid cols={{sm: 1, md: 2}}>
      <TextInput label={"Primer Nombre"} mt={"md"}/>
        <TextInput label={"Segundo Nombre"} mt={"md"}/>
        <TextInput label={"Primer Apellido"} mt={"md"}/>
        <TextInput label={"Segundo Apellido"} mt={"md"}/>
        <DatePickerInput label={"Fecha de Nacimiento"} mt={"md"}/>
        <TextInput label={"Genero"} mt={"md"}/>
        <TextInput label={"Correo Electronico"} mt={"md"}/>
        <TextInput label={"Telefono"} mt={"md"}/>
        <TextInput label={"Direccion"} mt={"md"}/>
        <TextInput label={"Ciudad"} mt={"md"}/>
        <TextInput label={"Departamento"} mt={"md"}/>
      </SimpleGrid>

      <Button mt={"xl"}>
        Guardar Cambios
      </Button>
    </Container>
  )
}

export default PatientAccount;