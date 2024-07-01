import { Button, ButtonProps } from "@mantine/core";
import { IconBrandFacebook } from "@tabler/icons-react";


type FacebookButtonProps = ButtonProps;

export function FacebookButton(props: FacebookButtonProps) {
  return (
    <Button
      leftSection={<IconBrandFacebook />}
      variant="default"
      {...props}
    />
  );
}
