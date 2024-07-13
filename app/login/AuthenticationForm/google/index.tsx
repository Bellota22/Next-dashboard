import { Box, Button, ButtonProps } from "@mantine/core";
import GoogleIcon from "./GoogleIcon";
import { GoogleAuth } from "@/app/lib/actions";

export function GoogleButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {

  return (
      <form action={async () =>{
        await GoogleAuth()
      }} >
        <Button w="100%" type="submit" leftSection={<GoogleIcon />} variant="default" {...props} />

      </form>
  );
}