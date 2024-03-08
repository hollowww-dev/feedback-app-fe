import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    font-size: 62.5%;
}

body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.bodyBackground};
    color: ${({ theme }) => theme.paragraph};
    font-family: "Jost", sans-serif;
    font-size: 1.3rem;
    line-height: 1.9rem;
    font-weight: 600;

    @media (min-width: 768px) {
        font-size: 1.5rem;
        line-height: 2.2rem;
        font-weight: 400;
    }

    @media (min-width: 1280) {
        font-size: 1.6rem;
        line-height: 2.3rem;
    }
}


h1, h2, h3, h4 {
    color: ${({ theme }) => theme.headline};
}
h1 {
    font-size: 2.4rem;
    line-height: 3.5rem;
    letter-spacing: -.033rem;
}
h2 {
    font-size: 2rem;
    line-height: 2.9rem;
    letter-spacing: -.025rem;
}
h3 {
    font-size: 1.8rem;
    line-height: 2.6rem;
    letter-spacing: -.025rem;
}
h4 {
    font-size: 1.4rem;
    line-height: 2rem;
    letter-spacing: -.02rem;
}

a, a:visited {
    color: ${({ theme }) => theme.secondary};
}

button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
}
`;
