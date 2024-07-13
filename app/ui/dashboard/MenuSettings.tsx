import { Avatar, Box, Button, Menu, rem, Text, useMantineTheme } from '@mantine/core'
import { IconLogout, IconSettings } from '@tabler/icons-react'
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'

interface MenuSettingsProps {
    handleOpenAdmin: () => void;
    handleSignOut: () => void;
}

function MenuSettings({ handleOpenAdmin, handleSignOut }: MenuSettingsProps) {
    const [user, setUser] = useState({ name: '', email: '' });
    const theme = useMantineTheme();

    useEffect(() => {
        const userCookie = getCookie('user');
        if (userCookie) {
        try {
            const parsedUser = JSON.parse(userCookie as string);
            setUser(parsedUser);
        } catch (error) {
            console.error('Failed to parse user cookie:', error);
        }
        }
    }, []);
  

  return (
    <Menu shadow="md">
        <Menu.Target>
            {
            user &&
                <Button
                style={{
                    boxShadow: theme.shadows.xs,
                }}
                w="100%"
                color="primary" 
                leftSection={<Avatar name={`${user.name}`} size="md" variant="outline" color="primary" />}
                variant='light'
                >
                <Text>{user.name}</Text>
                </Button>
            }
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

  )
}

export default MenuSettings