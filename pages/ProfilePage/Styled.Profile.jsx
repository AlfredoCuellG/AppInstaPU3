import styled from "styled-components";

export const ViewContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${({color}) => color ?? "#E2E2E2"};
`;

export const BtnContainerPhoto = styled.TouchableOpacity`
    background-color: #ffffff;
    width: 197px;
    height: 197px;
    justify-content: center;
    border-radius: 100px;
    border: 4px solid #004c79;
`;

export const StyledPhoto = styled.Image`
    width: 190px;
    height: 190px;
    border-radius: 100px;
`;

export const StyledTextName = styled.Text`
    color: ${({color}) => color ?? "#003d66"};
    font-size: 33px;
    margin-top: 25px;
    font-weight: bold;
    margin-bottom: 50px;
`;

export const StyledTextGeneral = styled.Text`
    color: ${({color}) => color ?? "#000000"};
    font-size: ${({sizeFont}) => sizeFont ?? "18px"};
    margin-top: 5px;
    font-weight: ${({isBold}) => isBold ?? "100"};
`;

export const StyledButton = styled.TouchableOpacity`
    background-color: ${({color}) => color ?? "#005a69"};
    width: 60%;
    padding: 15px;
    border-radius: 10px;
    align-items: center;
    margin-top: 55px;
`;

export const StyledBtnText = styled.Text`
    color: ${({color}) => color ?? "#ffffff"};
    font-weight: bold;
    font-size: 16px;
`;

//Componentes de la vista Modal 
export const ModalViewAll = styled.View`
    flex: 1;
    align-items: center;
    width: 100%;
    margin: 52px;
    margin-left: 0px;
    flex-direction: column;
    background-color: rgba(52, 52, 52, 0.7);
`;

export const ModalView = styled.View`
    width: 97%;
    background-color: #005a69;
    border-radius: 15px;
    padding: 15px;
    align-items: center;
    margin-top: ${({toop}) => toop ?? "119%"};
`;

export const ModalTextTitle = styled.Text`
    color: ${({color}) => color ?? "#ffffff"};
    font-weight: bold;
    font-size: 25px;
`;

export const ModalButton = styled.TouchableOpacity`
    background-color: ${({color}) => color ?? "#ffffff"};
    width: 75%;
    padding: 10px;
    border-radius: 10px;
    align-items: flex-start;
    margin-top: 20px;
    border: 2px solid #000000;
`;

export const ModalTextBtn = styled.Text`
    color: ${({color}) => color ?? "#000000"};
    font-size: 16px;
    font-weight: bold;
`;