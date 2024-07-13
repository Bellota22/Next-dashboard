'use client'
import { Avatar, Box, Button, Flex, Modal, Paper, PasswordInput, rem, Stack, Switch, Text, TextInput, Title, useMantineTheme } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import { DeleteEmployee } from './buttons'
import { upperFirst, useDisclosure, useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form'
import { Employee } from '@/app/lib/definitions'
import { registerEmployees, updateEmployeeState } from '@/app/lib/actions'
import { notifications } from '@mantine/notifications';

interface ModalProps {
    employees: Employee[];
    createUserView: boolean;
    setCreateUserView: (value: boolean) => void;
    opened: boolean;
    open: () => void;
    close: () => void;
  }

function ModalAdmin({employees: initialEmployees, createUserView, setCreateUserView, opened, open, close}: ModalProps) {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const theme = useMantineTheme();
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
      
      const handleSwitchChange = async (id: string) => {

    
        const updatedEmployees = employees.map((employee) =>
          employee.id === id ? { ...employee, status: !employee.status } : employee
        );
    
        setEmployees(updatedEmployees);
    
        const updatedEmployee = updatedEmployees.find((employee) => employee.id === id);
    
        if (updatedEmployee) {
          try {
            await updateEmployeeState(id, updatedEmployee.status);
          } catch (error) {
            console.error('Failed to update employee state:', error);
          }
        }
      };
  return (
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
  )
}

export default ModalAdmin