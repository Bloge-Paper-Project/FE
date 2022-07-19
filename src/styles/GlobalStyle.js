import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    };
    body{
        padding: 0;
        margin: 0;
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #fffdf7;
        /* 글로벌로 우클릭 안 되게 css 넣은 건데 안 됌...
         -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none; */
    };
    button{
        cursor: pointer;
        border: none;
        border-radius: 3px;
    };
    input{
        outline: none;
        padding-left: 10px;
        padding-right: 10px;
        box-sizing : border-box;
        border-width: 0;
        margin: 0;
    }
`;

export default GlobalStyle;
