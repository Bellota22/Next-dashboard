import { Box, Text } from "@mantine/core";
import { Metadata } from 'next';
import Slider from "./Slider/Slider";
import { AuthenticationForm } from "./AuthenticationForm";
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Box className={styles.sliderContainer}>
          <Slider />
        </Box>
        <Box className={styles.formContainer}>
          <AuthenticationForm />
        </Box>
      </div>
    </main>
  );
}
