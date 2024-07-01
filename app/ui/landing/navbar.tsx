'use client';

import { useState, useEffect } from 'react';
import { Box, Burger, Group, Container, Paper, Transition, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import styles from './navbar.module.css';

export default function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      setIsVisible(false);
      if (opened) {
        close();
      }
    } else {
      setIsVisible(true);
    }
    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div className={`${styles.background} ${isVisible ? styles.visible : styles.hidden}`}>
      <Container className={styles.navbarItems}>
        <Link href="#">
          <Box className="text-xl font-bold">PettoCare</Box>
        </Link>
        <Group gap={25} className="hidden md:flex">
          <Text className={styles.navbarRightItems} component={Link} href="/dashboard" passHref>
            Dashboard
          </Text>
          <Text className={styles.navbarRightItems} component={Link} href="#features" passHref>
            Features
          </Text>
          <Text className={styles.navbarRightItems} component={Link} href="#pricing" passHref>
            Pricing
          </Text>
          <Text className={styles.navbarRightItems} component={Link} href="#faqs" passHref>
            FAQS
          </Text>
        </Group>
        <Burger className={styles.burger} color="gray" opened={opened} onClick={toggle} aria-label="Toggle navigation" />
      </Container>

      <Transition transition="pop-top-right" duration={200} mounted={opened}>
        {(transitionStyles) => (
          <Paper style={transitionStyles} className={`md:hidden ${styles.mobileMenu}`}>
            <Link className={`${styles.navbarItemsResponsive} block px-4 py-2 hover:bg-gray-100`} href="/dashboard" passHref>
              Dashboard
            </Link>
            <Link className={`${styles.navbarItemsResponsive} block px-4 py-2 hover:bg-gray-100`} href="#features" passHref>
              Features
            </Link>
            <Link className={`${styles.navbarItemsResponsive} block px-4 py-2 hover:bg-gray-100`} href="#pricing" passHref>
              Pricing
            </Link>
            <Link className={`${styles.navbarItemsResponsive} block px-4 py-2 hover:bg-gray-100`} href="#contact" passHref>
            FAQS
            </Link>
          </Paper>
        )}
      </Transition>
    </div>
  );
}
