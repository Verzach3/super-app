import {Title, Text, Anchor, Paper, Group, TextInput, Center, rem, Box, Button, Container} from "@mantine/core";
import {IconArrowLeft} from "@tabler/icons-react";
import classes from "~/styles/routes/auth.module.css";
import {useOutletContext} from "@remix-run/react";
import {Session, SupabaseClient} from "@supabase/auth-helpers-remix";
import {Database} from "~/types/database.types";
import {useState} from "react";

function Auth() {
  const [email, setEmail] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const {supabase, session} = useOutletContext<{ supabase: SupabaseClient<Database>, session: Session | null }>();

  async function sendLink() {
    setDisabled(true);
    await supabase.auth.signInWithOtp({
      email: email,
      options: {emailRedirectTo: "http://localhost:3000/auth/callback"}
    });
  }

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
    }}>
      <Center style={{
        height: "100%"
      }}>
        <Container>
          <Title className={classes.title} ta="center">
            Bienvenido, Identificate
          </Title>
          <Text c="dimmed" fz="sm" ta="center">
            Ingrese su correo para recibir un link de inicio de sesión
          </Text>

          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <TextInput label="Tu correo" placeholder="yo@gmail.com" required value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
            <Group justify="space-between" mt="lg" className={classes.controls}>
              <Anchor href={"https://wellfitclinic.com"} c="dimmed" size="sm" className={classes.control}>
                <Center inline>
                  <IconArrowLeft style={{width: rem(12), height: rem(12)}} stroke={1.5}/>
                  <Box ml={5}>Volver a la pagina principal</Box>
                </Center>
              </Anchor>
              <Button disabled={disabled} className={classes.control} onClick={sendLink}>Enviar Enlace</Button>
            </Group>
          </Paper>
        </Container>
      </Center>
    </div>
  )
}

export default Auth;