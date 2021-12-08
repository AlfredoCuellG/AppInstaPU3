import { useNavigation } from "@react-navigation/core";
import React, {useState, useEffect} from "react";
import { Modal, Alert, Platform } from "react-native";
import { auth, storage, db } from "../../dataFire/firebase";
import {ViewContainer, BtnContainerPhoto, StyledPhoto, 
  StyledTextGeneral, StyledTextName, StyledButton, StyledBtnText,
  ModalViewAll, ModalView, ModalTextTitle, ModalButton, ModalTextBtn } from '../ProfilePage/Styled.Profile'; 
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from "../../localization/i18n"; 

import imgUserUnknown from '../../media/imagens/userunknow.png';

const Profile = (props) => {
    const navigation = useNavigation();
    const photo = props.photo;
    const setPhoto = props.setPhoto; 
  
    const [modalVisible, setModalVisible] = useState(false);
    const [profile, setProfile] = useState();

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { statusGallery } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (!statusGallery == 'granted') {
            alert('Sorry, we need gallery permissions to make this work!');
          }
        }
      })();
      (async () => {
        if (Platform.OS !== 'web') {
          const { statusCamera } = await ImagePicker.requestCameraPermissionsAsync(); 
          if(!statusCamera == 'granted'){
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
      loadImage(); 
    }, []);

    const listProfile = (setProfile) => {
      const myUserId = auth.currentUser?.uid;
      const userRef = db.ref("Users").orderByChild("id").equalTo(myUserId);
      let userProfile = {};
      userRef.on("value", (snapshot) => {
        const profile = snapshot.val();
        for (let id in profile) {
          userProfile = profile[id];
        }
        setProfile(userProfile);
      });
    };

    useEffect(() => {
      listProfile(setProfile);
    }, []);
  
    //Función para subir la imagen al storage. 
    const uploadImage = (uri) => {
      return new Promise((resolve, reject) => {
       let xhr = new XMLHttpRequest(); 
        xhr.onerror = reject; 
        xhr.onreadystatechange = () => {
         if(xhr.readyState === 4){
           resolve(xhr.response); 
         }
       };
       xhr.open("GET", uri); 
       xhr.responseType = "blob"; 
       xhr.send(); 
      });
    }
  
    //Función para cargar la imagen
    const loadImage = async () => {
      const nameImg = auth.currentUser?.uid; 
      storage.ref(`images/${nameImg}.jpg`).getDownloadURL().then(resolve => {
        console.log(resolve); 
        setPhoto(resolve); 
      }).catch(error => {
        console.log(error); 
      });
    }

    useEffect(() => {
      loadImage();
    }, [profile]);

    //Función para actualizar foto usuario en base de datos
    const updateImageUser = () => {
      const myUserId = auth.currentUser?.uid;
      const userRef = db.ref("Users").orderByChild("id").equalTo(myUserId);
      let profileId;
      userRef.on("value", (snapshot) => {
        const profile = snapshot.val();
        for (let id in profile) {
          profileId = id;
        }
        const profileRef = db.ref("Users").child(profileId);
        profileRef.update({
          imageUser: myUserId + ".jpg",
        });
      });
    };
  
    const pickFromGallery = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 1,
      });
  
      console.log("Gallery photo");
      console.log(result);
  
      if (!result.cancelled) {
        setPhoto(result.uri);
  
        const imageUri = result.uri; 
        let nameImg = auth.currentUser?.uid; 
  
        uploadImage(imageUri)
          .then(resolve => {
            let ref = storage.ref().child(`images/${nameImg}.jpg`); 
            ref.put(resolve).then(resolve => {
              console.log("Imagen subida correctamente - galería");
              updateImageUser();
            }).catch(error => {
              console.log("Error al subir la imagen")
              console.log(error); 
            });
          }).catch(error => {
            console.log(error); 
        });
      }
      setModalVisible(!modalVisible); 
    };
  
    const pickFromCamera = async ()=>{
      let data =  await ImagePicker.launchCameraAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect:[5,5],
        quality: 0.1,
      });
      
      console.log("Camera photo");
      console.log(data);
  
      if(!data.cancelled){
        setPhoto(data.uri); 
  
        const imageUri = data.uri; 
        let nameImg = auth.currentUser?.uid; 
  
        uploadImage(imageUri)
          .then(resolve => {
            let ref = storage.ref().child(`images/${nameImg}.jpg`); 
            ref.put(resolve).then(resolve => {
              console.log("Imagen subida correctamente - cámara"); 
              updateImageUser();
            }).catch(error => {
              console.log("Error al subir la imagen")
              console.log(error); 
            });
          }).catch(error => {
            console.log(error); 
        });
      }
      setModalVisible(!modalVisible); 
    };
  
    const handleSignOut = () => {
      auth
        .signOut()
        .then(() => {
          navigation.replace("Login");
        })
        .catch((error) => {
          alert(error.message);
        });
    };
    
    return (
      <ViewContainer>
        <BtnContainerPhoto onPress={()=>setModalVisible(true)}>
          <StyledPhoto source={profile?.imageUser ? {uri: photo} : imgUserUnknown}/>
        </BtnContainerPhoto>
        <StyledTextName>{profile?.name} {profile?.lastname}</StyledTextName>
        <StyledTextGeneral isBold={"bold"} sizeFont={"22px"}>{I18n.t("titleDataUser")}</StyledTextGeneral>
        <StyledTextGeneral>{profile?.username}</StyledTextGeneral>
        <StyledTextGeneral>{auth.currentUser?.email}</StyledTextGeneral>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }} >
            <ModalViewAll>
              <ModalView>
                <ModalTextTitle>Choose an option:</ModalTextTitle>
                <ModalButton onPress={pickFromGallery}>
                  <ModalTextBtn>
                    <Ionicons name="ios-images" size={18}/>  {I18n.t("modalProfile1")}
                  </ModalTextBtn>
                </ModalButton>
                <ModalButton onPress={pickFromCamera}>
                  <ModalTextBtn>
                    <Ionicons name="ios-camera" size={18}/>  {I18n.t("modalProfile2")}
                  </ModalTextBtn>
                </ModalButton>
                <ModalButton onPress={()=>setModalVisible(!modalVisible)} color={"#a2e9ff"}>
                  <ModalTextBtn>
                    <Ionicons name="ios-close-circle" size={18}/>  {I18n.t("modalCancel")}
                  </ModalTextBtn>
                </ModalButton>
              </ModalView>
            </ModalViewAll>
        </Modal>
        <StyledButton onPress={handleSignOut}>
          <StyledBtnText>
            <Ionicons name="ios-log-out" size={18}/>  {I18n.t("buttonSignOut")}
          </StyledBtnText>
        </StyledButton>
      </ViewContainer>
    );
  };
  export default Profile;
    