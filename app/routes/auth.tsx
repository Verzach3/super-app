import {
  Title,
  Text,
  Anchor,
  Paper,
  TextInput,
  Button,
  PasswordInput, Checkbox, Image, Box, LoadingOverlay
} from "@mantine/core";
import classes from "~/styles/routes/auth.module.css";
import {useNavigate, useOutletContext} from "@remix-run/react";
import {Session, SupabaseClient} from "@supabase/auth-helpers-remix";
import {Database} from "~/types/database.types";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";

function Auth() {
  const navigate = useNavigate();
  const [register, setRegister] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const {supabase, session} = useOutletContext<{ supabase: SupabaseClient<Database>, session: Session | null }>();
  const loginForm = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalido'),
    }
  })

  const registerForm = useForm({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
    },
    validate: {
      name: (value) => (value.length > 0 ? null : 'El nombre no puede estar vacio'),
      lastName: (value) => (value.length > 0 ? null : 'El apellido no puede estar vacio'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalido'),
    }
  })

  async function sendLink() {
    setDisabled(true);
    await supabase.auth.signInWithOtp({
      email: email,
      options: {emailRedirectTo: "http://localhost:3000/auth/callback"}
    });
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        navigate("/dashboard");
      }
    })
  }, []);

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Box pos="relative">
          <LoadingOverlay visible={disabled} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>
          <Image src={"/wellfit-bottom-text.svg"} h={200} fit={"contain"}/>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Bienvenido a WellFit
          </Title>

          {!register &&
              <>

                  <form onSubmit={loginForm.onSubmit(values => console.log(values))}>
                      <TextInput label="Correo Electronico"
                                 placeholder="hola@gmail.com" size="md" {...loginForm.getInputProps("email")}/>
                      <Button fullWidth mt="xl" size="md" type={"submit"}>
                          Iniciar Sesion
                      </Button>
                  </form>

                  <Text ta="center" mt="md">
                      Ya tienes cuenta?{' '}
                      <Anchor<'a'> href="#" fw={700} onClick={(event) => {
                        event.preventDefault()
                        setRegister((prev) => !prev)
                      }}>
                          Registrate
                      </Anchor>
                  </Text>
              </>}
          {register &&
              <>
                  <form onSubmit={(values) => console.log(values)}>
                      <TextInput required type={"text"}
                                 label="Primer Nombre"
                                 placeholder="Tu nombre" size="md"
                                 {...registerForm.getInputProps("name")}/>
                      <TextInput required type={"text"}
                                 label="Primer Apellido"
                                 placeholder="Tu apellido" size="md"
                                 mt="md"  {...registerForm.getInputProps("lastName")}/>
                      <TextInput required type={"email"}
                                 label="Correo Electronico"
                                 placeholder="hola@gmail.com" size="md"
                                 mt="md" {...registerForm.getInputProps("email")}/>
                      <Button fullWidth mt="xl" size="md" type={"submit"}>
                          Registrarme
                      </Button>
                  </form>

                  <Text ta="center" mt="md">
                      Ya tienes cuenta?{' '}
                      <Anchor<'a'> href="#" fw={700} onClick={(event) => {
                        event.preventDefault()
                        setRegister((prev) => !prev)
                      }}>
                          Inicia Sesion
                      </Anchor>
                  </Text>
              </>
          }
        </Box>
      </Paper>
    </div>
  )
}


export default Auth;
