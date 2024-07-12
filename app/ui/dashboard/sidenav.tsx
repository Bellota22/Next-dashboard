'use client'
import NavLinks from '@/app/ui/dashboard/nav-links';
import { Avatar, Box, Button, Checkbox, Flex, Menu, Modal, Paper, PasswordInput, rem, Stack, Switch, Text, TextInput, Title, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { authenticate, handleServerSignOut, registerEmployees, registerUser, updateEmployeeState } from '@/app/lib/actions';
import {
  IconSettings,
  IconLogout,
  IconCheck,
  IconX,
} from '@tabler/icons-react';
import { upperFirst, useDisclosure, useToggle } from '@mantine/hooks';
import { Employee, Products } from '@/app/lib/definitions';
import { set } from 'zod';
import { notifications } from '@mantine/notifications';
import { useForm } from "@mantine/form";
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';
import { DeleteEmployee } from './buttons';

interface SideNavProps {
  employees: Employee[];
}

export default function SideNav({ employees: initialEmployees  }: SideNavProps) {

  const userCookie =  getCookie('user')
  let user = { name: 'User', email: ''};
  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (error) {
      console.error('Failed to parse user cookie:', error);
    }
  }
  const [products, setProducts] = useState<Products[]>([]);
  const [type, toggle] = useToggle(['login', 'register']);
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(true);
  const [createUserView, setCreateUserView] = useState(false);
  const form = useForm<Employee>({
    initialValues: {
      id: '',
      user_id: '',
      email: '',
      name: '',
      password: '',
      status: true,
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
      setCreateUserView(false);
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
  const router = useRouter();

  const handleOpenAdmin = () => {
    setCreateUserView(false);
    open();
  }

  const handleSwitchChange = async (id: string) => {
    // Encuentra el empleado y actualiza su estado
    const updatedEmployees = employees.map((employee) =>
      employee.id === id ? { ...employee, status: !employee.status } : employee
    );

    // Actualiza el estado local
    setEmployees(updatedEmployees);

    // Encuentra el nuevo estado del empleado para la actualización en la base de datos
    const updatedEmployee = updatedEmployees.find((employee) => employee.id === id);

    if (updatedEmployee) {
      try {
        await updateEmployeeState(id, updatedEmployee.status);
      } catch (error) {
        console.error('Failed to update employee state:', error);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await handleServerSignOut();
      setCookie('user', '');

      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };


  return (
    <Stack className="h-full px-3 py-4 pt-12 md:px-2">
      <Box className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <Box className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></Box>
        <Menu shadow="md" width={200} >
          <Menu.Target>
              <Button
                color="primary" 
                leftSection={<Avatar name={`${user.name}`} size="md" variant="outline" color="primary" />}
                variant='light'
              >
                <Text>{user.name}</Text>
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
          title={createUserView ? 'Crear usuario' : 'Mis usuarios'}
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
          {
            employees.map((employee: Employee, index: number) => (
              <Box p={10} key={employee.id || index}>
                <Flex align="center" justify="space-between" gap={10}>
                  <Avatar name={employee.name} size="md" variant="outline" color="primary" />
                  <Text>{employee.name}</Text>
                  <Flex gap={10}>
                    <Switch
                      className="flex items-center justify-end"
                      checked={employee.status} // Asegúrate de que cada empleado tenga su propio estado
                      onChange={() => handleSwitchChange(employee.id)}
                      color="green"
                      size="sm"
                      thumbIcon={
                        employee.status ? (
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
                    <Box onClick={close}>

                      <DeleteEmployee  id={employee.id} /> {/* Usar el id del empleado */}
                    </Box>
                  </Flex>
                </Flex>
              </Box>
                ))
              }     
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

