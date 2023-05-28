import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
    box-sizing:border-box;
}

body{
    background:${({theme})=>theme.background};
    color:${({theme})=>theme.textColor};
    margin:0;
    padding:0;
    transition: all 0.25s linear;
}
.App{
    display:grid;
    min-height:100vh;
    grid-auto-flow:row;
    grid-template-row: auto 1fr auto;
    gap:3rem;
    padding:2rem;
    align-items:center;
    text-align:center;
}
.type-box{
    max-width: 1000px;
    height:140px;
    margin-right:auto;
    margin-left:auto;
    margin-top : 1.5rem;
    overflow:hidden;

}
.information{
    font-size : 1.2rem;
    opacity : 40%;
}
.words{
    display:flex;
    flex-wrap:wrap;
    font-size: 1.8rem;
    color : ${({theme})=> theme.typeBoxText}
}
.word{
    margin:5px;
    padding-right:2px;
}
.hidden-input{
    opacity:0;
}
.current{
    border-left: 1px solid white;
    animation : blinking 2s infinite;
    animation-timing-function : ease;
    @keyframes blinking {
        0% {border-left-color: ${({theme})=>theme.textColor}}
        25% {border-left-color:${({theme})=> theme.background}}
        50% {border-left-color: ${({theme})=>theme.textColor}}
        75% {border-left-color:${({theme})=> theme.background}}
        100% { border-left-color: ${({theme})=>theme.textColor}}
    }
}

.current-right{
    border-right: 1px solid  ${({theme})=>theme.textColor};
    animation : blinkingRight 2s infinite;
    animation-timing-function : ease;
    @keyframes blinkingRight {
        0% {border-right-color: ${({theme})=>theme.textColor}}
        25% {border-right-color:${({theme})=> theme.background}}
        50% {border-right-color: ${({theme})=>theme.textColor}}
        75% {border-right-color:${({theme})=> theme.background}}
        100% { border-right-color: ${({theme})=>theme.textColor}}
    }
}

.correct{
    color:green;
}
.incorrect{
    color: red;
}
.upper-menu{
    display:flex;
    justify-content:space-between;
    width:1000px;
    margin-left:auto;
    margin-right:auto;
    font-size:1.35rem;
    padding: 0.5rem;
}
.modes{
    display:flex;
    gap: 1rem;
}
.time-mode:hover{
    color:green;
    cursor:pointer;
}
.icon-logout-div{
    display : flex;
    gap : 1.7rem;
}
.footer{
    display: flex;
    width : 1000px;
    margin-left: auto;
    margin-right : auto;
    justify-content : space-between;
}
.links{
    display : flex;
    gap : 1.5rem;
}
.links a{
    color : inherit;
    text-decoration : none;
}
.stats-box{
    display : flex;
    width : 1000px;
    margin-left : auto;
    margin-right : auto;

}
.left-box{
    padding : 30px;
    width : 30%;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
}
.data-figures{
    display : flex;
    flex-direction : column;
    gap : 0.5rem;
}
.char-info{
    font-size : 1rem;
}
.reload-btn{
    display : flex;
    justify-content : center;
    align-items : center;
    margin-top : 2rem;
    border : 2px solid;
    border-radius : 10%;
    width : 30%;
    padding : 0.3rem;
}

.right-box{
    width : 70%;
}
.title{
    font-size : 1.2rem;
    color : ${({theme})=> theme.typeBoxText}
}
.subtitle{
    font-size : 1.6rem;
}
.header{
    display : flex;
    width : 1000px;
    margin-left : auto;
    margin-right : auto;
    justify-content : space-between;

}
.user-profile{
    width : 1000px;
    margin : auto;
    display : flex;
    height : 15rem;
    background : ${({theme})=> theme.typeBoxText};
    color : ${({theme})=> theme.background};
    border-radius : 20px;
    padding : 1rem;
    justify-content : center;
    align-text : center;
}

.user{
    width : 50%;
    display : flex;
    margin-top : 30px;
    margin-bottom : 30px;
    font-size : 1.5rem;
    padding : 1rem;
    border-right : 2px solid;
}
.info{
    width : 60%;
    padding : 1rem;
    margin-top : 1rem;
}
.picture{
    width : 40%;
}
.total-tests{
    width : 50%;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    font-size : 2rem;
}
.graph-div, .table{
    margin-left: auto;
    margin-right : auto;
    width : 1000px;
}
.loading-div{
    display : flex;
    min-height : 100vh;
    justify-content : center;
    align-items : center;

}
@media screen and (max-width: 768px){
    .type-box{
        max-width : 50%;
        height : auto;
    }
    .header{
        max-width : 50%;
    }
    .footer{
        max-width : 50%;
    }
    .upper-menu{
        max-width : 50%;
    }
    .stats-box{
        max-width : 50%;
    }
    .graph-div, .table{
        max-width : 50%;
    }
}

@media screen and (max-width: 1200px){
    .type-box{
        max-width : 70%;
        height : auto;
    }
    .header{
        max-width : 70%;
    }
    .footer{
        max-width : 70%;
    }
    .upper-menu{
        max-width : 70%;
    }
    .stats-box{
        max-width : 70%;
    }
    .graph-div, .table{
        max-width : 70%;
    }
}
`