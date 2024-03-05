import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
}

html {
    scroll-behavior: smooth;
    font-size: 62.5%;
}
`;
