import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme, TextInput, Popover, Card, Stack,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown, IconSearch, IconMessage, IconMessage2, IconMessages, IconUserCircle,
} from '@tabler/icons-react';
import classes from '../../styles/patient/Header.module.css';

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export function Header() {
  const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] = useDisclosure(false);
  const [linksOpened, {toggle: toggleLinks}] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{width: rem(22), height: rem(22)}} color={theme.colors.blue[6]}/>
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Text style={{fontFamily: "Inter"}} fw={800}>
            SuperApp
          </Text>
          <Group h="100%" gap={0} visibleFrom="sm" style={{width: "30rem"}}>
            <TextInput variant={"filled"} rightSection={<IconSearch/>} style={{flex: 1}} radius={100}/>
          </Group>

          <Group visibleFrom="sm">
            <Popover width={300}>
              <Popover.Target>
                <Button
                  variant="default"
                  radius={100}
                  leftSection={<IconMessages/>}
                  rightSection={<IconChevronDown/>}
                >
                  Messages
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Card m={0} p={0}>
                  <Center>
                    <ThemeIcon radius={100} size={"lg"}>
                      <IconMessage2/>
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="md" fw={700} style={{fontFamily: "Inter"}}>
                        Doctor
                      </Text>
                      <Text size="sm" c="dimmed">
                        Hola, como estas?
                      </Text>
                    </Stack>
                  </Center>
                </Card>
              </Popover.Dropdown>
            </Popover>
            <Button
              variant="default"
              radius={100}
              leftSection={<IconUserCircle/>}
              rightSection={<IconChevronDown/>}
            >
              Mi Cuenta
            </Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm"/>
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm"/>

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{width: rem(16), height: rem(16)}}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm"/>

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
}
