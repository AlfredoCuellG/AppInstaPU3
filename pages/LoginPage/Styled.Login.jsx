import styled from "styled-components";
import adornoImg from '../../media/imagens/degradado.png';

export const KeyboardView = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${({color}) => color ?? "#005a69"};
`;

export const StyledView = styled.View`
    width: 80%;    
`;

export const StyledImage = styled.Image`
    width: 240px;
    height: 200px;
    margin-left: 50px;
    margin-bottom: 5px;
`;

export const StyledInput = styled.TextInput`
    background-color: #ffffff;
    padding: 13px;
    border-radius: 10px;
    margin-top: 15px;
`;

export const StyledViewBtns = styled.View`
    width: 70%;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`;

export const StyledButton = styled.TouchableOpacity`
    background-color: ${({color}) => color ?? "#07e5f9"};
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    align-items: center;
`;

export const StyledButtonSignUp = styled.TouchableOpacity`
    background-color: ${({color}) => color ?? "transparent"};
    width: 50%;
    padding: 5px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin-top: 14px;
`;

export const StyledTextBtn = styled.Text`
    color: ${({color}) => color ?? "#000000"};
    font-weight: 700;
    font-size: 17px;
`;

export const StyledText = styled.Text`
    color: ${({color}) => color ?? "#ffffff"};
    font-size: 16px;
    margin-top: 20px;
    text-align: center;
`;
