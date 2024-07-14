'use client'
import NavLinks from '@/app/ui/dashboard/nav-links';
import { Avatar, Box, Button, Checkbox, Flex, Menu, Modal, Paper, PasswordInput, rem, Stack, Switch, Text, TextInput, Title, useMantineTheme } from '@mantine/core';
import React, { Suspense, useEffect, useState } from 'react';
import { authenticate, handleServerSignOut, registerEmployees, registerUser, updateEmployeeState } from '@/app/lib/actions';
import {
  IconSettings,
  IconLogout,
  IconCheck,
  IconX,
  IconMenu2,
} from '@tabler/icons-react';
import { upperFirst, useDisclosure, useToggle } from '@mantine/hooks';
import { Employee, Products } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';
import { DeleteEmployee } from './buttons';
import ModalAdmin from './ModalAdmin';
import MenuSettings from './MenuSettings';


interface SideNavProps {
  employees: Employee[];
}

export default function SideNav({employees}: SideNavProps) {
  
  const [opened, { open, close }] = useDisclosure(false);
  const [createUserView, setCreateUserView] = useState(false);
  const router = useRouter();

  const handleOpenAdmin = () => {
    setCreateUserView(false);
    open();
  }

  const handleSignOut = async () => {
    try {
      await handleServerSignOut();
      setCookie('user', '');

      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  const [menuOpen, setMenuOpen] = useState(true);
  const [showText, setShowText] = useState(true);


  return (
    <Stack className={`h-full px-3 py-4 pt-12 md:px-2 transition-all duration-300 ${menuOpen ? 'w-48' : 'w-16'}`}>
      <Box className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <button
          className="absolute top-4 left-4 z-50 p-1 rounded-md bg-gray-50"
          onClick={() => {
            setMenuOpen(prev => !prev);
            setShowText(prev => !prev);
          }}
        >
          <IconMenu2 />
        </button>
        <NavLinks showText={showText} />
        <Box className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></Box>
        <MenuSettings
          handleOpenAdmin={handleOpenAdmin}
          handleSignOut={handleSignOut}
        />
        <ModalAdmin 
          employees={employees}
          createUserView={createUserView}
          setCreateUserView={setCreateUserView}
          close={close}
          open={open}
          opened={opened}
           />
      </Box>
    </Stack>
  );
}

