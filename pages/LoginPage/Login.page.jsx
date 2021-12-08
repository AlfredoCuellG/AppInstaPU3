import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {KeyboardView, StyledView, StyledImage, StyledInput, 
  StyledViewBtns, StyledButton, StyledButtonSignUp, StyledTextBtn, 
  StyledText, StyledViewInputContainerWithIcon} from './Styled.Login'; 

import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from "../../localization/i18n"; 

import { auth } from "../../dataFire/firebase";
import logo from '../../media/imagens/logoApp.png'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState(""); 

  const navigation = useNavigation();

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsuscribe;
  }, []);
  
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, pwd)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <KeyboardView behavior="height">
      <StyledView>
        <StyledImage source={logo} />
        <StyledInput
          placeholder={I18n.t("placeholderEmail")}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <StyledInput
            placeholder={I18n.t("placeholderPwd")}
            value={pwd}
            onChangeText={(text) => setPwd(text)}
            secureTextEntry
        />
      </StyledView>
      <StyledViewBtns>
        <StyledButton onPress={handleLogin}>
          <StyledTextBtn>
            <Ionicons name="ios-log-in" size={18}/>  {I18n.t("buttonLogin")}
          </StyledTextBtn>
        </StyledButton>
        <StyledText>{I18n.t("messageLogin")}</StyledText>
        <StyledButtonSignUp 
          onPress={() => navigation.replace("SignUp")}>
          <StyledTextBtn color={"#00d9ff"}>{I18n.t("buttonSignUp")}</StyledTextBtn>
        </StyledButtonSignUp>
      </StyledViewBtns>
    </KeyboardView>
  );
};

export default Login; 
