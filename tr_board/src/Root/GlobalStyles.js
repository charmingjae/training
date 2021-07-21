import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    @import url(https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css);



    body{
        background-color:#0443ef;
        color:white;
        font-family: 'NanumSquare', sans-serif;
    }
`;
export default globalStyles;
