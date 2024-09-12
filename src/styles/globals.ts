import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Noto Sans', sans-serif;  /* Noto Sans 적용 */
    }

    body {
        background-color: #f5f5f5;
        color: #333;
        line-height: 1.6;
        font-family: 'Noto Sans', sans-serif;  /* Noto Sans 적용 */
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    ul {
        list-style: none;
    }

    button {
        cursor: pointer;
        border: none;
        background: none;
        font-family: 'Noto Sans', sans-serif;  /* Noto Sans 적용 */
    }

    input {
        border: none;
        background: none;
        outline: none;
        font-family: 'Noto Sans', sans-serif;  /* Noto Sans 적용 */
    }
`;
