import { Button, ButtonProps } from "@mantine/core";
import GoogleIcon from "./GoogleIcon";
import { signIn } from "next-auth/react";

export function GoogleButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {

  return <Button onClick={() => signIn('google')}leftSection={<GoogleIcon />} variant="default" {...props} />;
}