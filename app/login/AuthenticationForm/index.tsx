'use client'
import { useForm } from "@mantine/form";
import { FacebookButton } from "./facebook/index";
import { GoogleButton } from "./google/index";
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { authenticate, registerUser } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { upperFirst, useToggle } from "@mantine/hooks";
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from "@tabler/icons-react";
import { useRouter } from 'next/navigation'

interface AuthenticationFormProps extends React.ComponentPropsWithoutRef<'div'> {}
interface FormValues {
  email: string;
  name: string;
  password: string;
  terms: boolean;
}
export function AuthenticationForm(props: AuthenticationFormProps) {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [type, toggle] = useToggle(['login', 'register']);
  const router = useRouter();
  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();
        formData.append('email', values.email);
        formData.append('password', values.password);

      if (type === 'register') {
        await registerUser(values);
        notifications.show({
          title: 'Success',
          message: 'Account created successfully!',
          color: 'teal',
          icon: <IconCheck />,
        });
        await authenticate(undefined, formData);
      } else {
        await authenticate(undefined, formData);
        notifications.show({
          title: 'Success',
          message: 'Logged in successfully!',
          color: 'teal',
          icon: <IconCheck />,
        });
      }

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


  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      style={{ width: "430px", border: "none" }}
      {...props}
    >
      <Title order={1} >
        Welcome to PettoCare
      </Title>
      <Text c="dimmed" mb={14} style={{ fontSize: "12px", marginTop: "2%" }}>
        Start getting your insights{" "}
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              required
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

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
          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        
        <Button color="primary" size="md" type="submit" style={{ width: "100%" }}>
        {upperFirst(type)}
        </Button>
        </Stack>
      </form>
      <Divider
        c="dimmed"
        label="Or"
        labelPosition="center"
        my="lg"
        style={{ marginTop: "10%" }}
      />

      <Group grow mb="md" mt="md">
        <GoogleButton size="md" radius="10px">
          Google
        </GoogleButton>
        <FacebookButton size="md" radius="10px">
          Facebook
        </FacebookButton>
      </Group>

      <Text c="dimmed" size="sm" ta="center" mt="10%">
        <Anchor content="flex-start" component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
          {type === 'register'
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </Anchor>
      </Text>
    </Paper>
  );
}
