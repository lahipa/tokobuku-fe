import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
    ${normalize}
    
    /* * {
        -webkit-box-sizing: border-box;
           -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        vertical-align: baseline;
        zoom: 1; 
    } */

    body {
        font-family: normal 14px/20px 'Roboto', sans-serif;
        font-size: 14px;
        font-weight: 400; 
        line-height: 1;
        color: #242424;
    }

    .sliderimg {
        width: 100%;
        height: 630px;
        object-fit: cover
    }
`;
