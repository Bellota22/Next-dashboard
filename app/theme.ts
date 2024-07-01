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
});
