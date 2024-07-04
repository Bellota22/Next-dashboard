import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import { Box, Button, Stack } from '@mantine/core';

export default function SideNav() {
  return (
    <Stack className="h-full px-3 py-4 pt-12 md:px-2">
      <Box className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <Box className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></Box>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
        <Button
          variant='light' 
          radius="xl" 
          color="red" 
          style={{
            height: '36px',
            width: '36px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PowerIcon className="w-6" />
        </Button>
        </form>
      </Box>
    </Stack>
  );
}

