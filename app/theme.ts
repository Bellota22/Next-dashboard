import { createTheme, MantineColorsTuple, rem } from '@mantine/core';

const primary: MantineColorsTuple = [
  '#e3fbff',
  '#d6f0f7',
  '#b1dde8',
  '#89cada',
  '#68bbce',
  '#52b0c7',
  '#43abc5',
  '#3296ae',
  '#21869d',
  '#00748a'
];


export const theme = createTheme({
  fontSizes: {
    xs: rem(10),
    sm: rem(11),
    md: rem(14),
    lg: rem(16),
    xl: rem(20),
  },
  colors: {
    primary,
  },
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    sm: '0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.12), 0 20px 40px rgba(0, 0, 0, 0.24)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.14), 0 40px 80px rgba(0, 0, 0, 0.28)',
  },
});
