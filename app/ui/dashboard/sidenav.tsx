'use client'
import NavLinks from '@/app/ui/dashboard/nav-links';
import { Avatar, Box, Button, Checkbox, Flex, Menu, Modal, Paper, PasswordInput, rem, Stack, Switch, Text, TextInput, Title, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { authenticate, handleSignOut, registerEmployees, registerUser } from '@/app/lib/actions';
import {
  IconSettings,
  IconLogout,
  IconCheck,
  IconX,
} from '@tabler/icons-react';
import { upperFirst, useDisclosure, useToggle } from '@mantine/hooks';
import { Employee, Products } from '@/app/lib/definitions';
import { DeleteCustomer } from '../customers/buttons';
import { set } from 'zod';
import { notifications } from '@mantine/notifications';
import { useForm } from "@mantine/form";
import { useFormState } from 'react-dom';

interface AuthenticationFormProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function SideNav() {

  const [products, setProducts] = useState<Products[]>([]);
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>(
    Object.fromEntries(products.map((product: Products) => [product.id, product.status]))
  );
  const [type, toggle] = useToggle(['login', 'register']);
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const user_id = '410544b2-4001-4271-9855-fec4b6a6442a';

  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(true);
  const [createUserView, setCreateUserView] = useState(false);
  const form = useForm<Employee>({
    initialValues: {
      id: '',
      user_id: user_id,
      email: '',
      name: '',
      password: '',
      created_date: new Date(),
      updated_date: new Date(),
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    
    },
  });

  const handleSubmit = async (values: Employee) => {
    try {
      const formData = new FormData();
        formData.append('email', values.email);
        formData.append('password', values.password);
        const newEmployee = await registerEmployees(values);
        notifications.show({
          title: 'Success',
          message: 'Account created successfully!',
          color: 'teal',
          icon: <IconCheck />,
        })
        console.log('newEmployee:::', newEmployee);
    } catch (error: any) {
      const errorMsg = 'An error occurred during authentication.';
      notifications.show({
        title: 'Error',
        message: errorMsg,
        color: 'red',
        icon: <IconX />,
      });
      console.error('Authentication error:', error);
    }
  };

  const handleOpenAdmin = () => {
    setCreateUserView(false);
    open();
  }
  return (
    <Stack className="h-full px-3 py-4 pt-12 md:px-2">
      <Box className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <Box className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></Box>
        <Menu shadow="md" width={200} >
          <Menu.Target>
              <Button
                color="primary" 
                leftSection={<Avatar name={"Gabriel Villanueva"} size="md" variant="outline" color="primary" />}
                variant='light'
              >
                <Text>Gabriel Villanueva</Text>
                </Button>
              
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item onClick={handleOpenAdmin} leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
              Admin
            </Menu.Item>
            <Menu.Item onClick={handleSignOut} leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
              Cerrar sesión
            </Menu.Item>

          </Menu.Dropdown>
        </Menu>
        <Modal
          opened={opened}
          
          onClose={close} 
          title={createUserView ? 'Crear usuario' : 'Usuarios de Patitas Felices'}
          transitionProps={{ transition: 'rotate-left' }}
          >
          {createUserView ? (
        <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>   
          <TextInput
            label="Name"
            required
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            radius="md"
          />
          <TextInput
            required
            bgr={errorMessage ? 'red' : 'transparent'}
            label="Email"
            placeholder="jhon@gmail.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />
          <Flex  mt="10px" justify="flex-end" w="100%" gap="10px">
            <Button onClick={() => setCreateUserView(false)} color="gray.4" >
            <Title order={6}> Cancelar </Title>
            </Button>
            <Button color="primary.3" type="submit" >
            <Title order={6}> Registrar </Title>

            </Button>
          </Flex>
        </Stack>
      </form>
      ) : (
        <>
          <Paper withBorder>
            <Box p={10}>
              <Flex align="center" justify="space-between" gap={10}>
                <Avatar name={"Patitas felices"} size="md" variant="outline" color="primary" />
                <Text>Patitas felices</Text>
                <Flex gap={10}>
                  <Switch
                    className="flex items-center justify-end"
                    checked={checked}
                    onChange={(event) => setChecked(event.currentTarget.checked)}
                    color="green"
                    size="sm"
                    thumbIcon={
                      checked ? (
                        <IconCheck
                          style={{ width: rem(12), height: rem(12) }}
                          color={theme.colors.green[6]}
                          stroke={3}
                        />
                      ) : (
                        <IconX
                          style={{ width: rem(12), height: rem(12) }}
                          color={theme.colors.red[6]}
                          stroke={3}
                        />
                      )
                    }
                  />
                  <DeleteCustomer />
                </Flex>
              </Flex>
            </Box>
          </Paper>
          <Flex mt="10px" justify="flex-end" w="100%">

            <Button onClick={() => setCreateUserView(true)} color="primary.3" >
              <Title order={6}> Create user </Title>
            </Button>
          </Flex>
        </>
      )}
        </Modal>
      </Box>
    </Stack>
  );
}

