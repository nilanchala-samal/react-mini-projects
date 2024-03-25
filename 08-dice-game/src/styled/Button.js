import styled from "styled-components";

export const Button = styled.button`
    min-width: 220px;
    padding: 10px 10px;
    color: white;
    border:none;
    background: #000000;
    border-radius: 5px;
    font-size: 16px ;
    border: 1px solid transparent;
    transition: 0.4s background ease;
    cursor: pointer;
    &:hover{
        background-color: white;
        color: black;
        border: 1px solid black;
        transition: 0.3s background ease;
    }
`
export const OutlineButton = styled(Button)`
    background-color: white;
    color: black;
    border: 1px solid black;
    &:hover{
        background-color: black;
        color: white;
        border: 1px solid transparent;
    }
`