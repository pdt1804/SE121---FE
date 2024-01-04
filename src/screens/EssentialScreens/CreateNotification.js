import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import axios from "axios";
import { API_BASE_URL } from "../../../DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';

const CreateNotification = (props) => {
  const [blankContent, setBlankContent] = useState(true);
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");
  const [path, setPath] = useState(null)

  const handleCreatePost = async () => {
    
    if (titleText.length == 0)
    {
      alert('Hãy nhập tiêu đề')
      return;
    }
    
    if (contentText.length == 0)
    {
      alert('Hãy nhập nội dung')
      return;
    }

    let notification = {
      header: titleText,
      content: contentText,
      image: path,
    }

    const response = await axios.post(API_BASE_URL + "/api/v1/notifycation/create?groupID=" + await AsyncStorage.getItem('groupID') + "&userName=" + await AsyncStorage.getItem('username'), notification)
    alert("Tạo thành công")
    goBack();
  };


  //navigation
  const { navigate, goBack } = props.navigation;

  //Quickly delete written content
  useEffect(() => {
    contentText == "" ? setBlankContent(true) : setBlankContent(false);
  });

  //Auto focus on TextInput when the screen is touched
  const textInputRef = useRef(null);
  const handleTouch = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const selectImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      
      try {

        setPath(result.uri);

      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

  };

  return (
    <View style={styles.container}>
      <UIHeader
        title={'Tạo thông báo'}
        leftIconName={blankContent ? images.backIcon : images.cancelIcon}
        rightIconName={images.sendMessageCursorIcon}
        onPressLeftIcon={() => {
          blankContent ? goBack() : (setContentText(""), setTitleText(""));
        }}
        onPressRightIcon={() => {
          handleCreatePost();
        }}
      />

      <ScrollView onTouchStart={handleTouch}>
        <TextInput /* title */
          style={styles.titleTextInput}
          inputMode="text"
          maxLength={180}
          onChangeText={(text) => {
            setTitleText(text);
          }}
          value={titleText}
          placeholder={"Tiêu đề"}
          placeholderTextColor={colors.inactive}
        />
        <TextInput /* content */
          ref={textInputRef}
          style={styles.contentTextInput}
          inputMode="text"
          multiline
          onChangeText={(text) => {
            setContentText(text);
          }}
          value={contentText}
          placeholder={"Soạn thông báo"}
          placeholderTextColor={colors.inactive}
        />
        <TouchableOpacity style={styles.imgClickable} onPress={selectImage}>
          <Image source={{uri: path}} style={styles.image} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default CreateNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  contentTextInput: {
    paddingStart: 15,
    padding: 10,
  },
  titleTextInput: {
    paddingStart: 15,
    padding: 10,
    borderColor: colors.inactive,
    borderBottomWidth: 1,
    marginTop: 20,
    height: 50,
    marginBottom: 20,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "cover",
    margin: 15,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 5,
    alignSelf: "center",
  },
  imgClickable: {
    backgroundColor: colors.transparentWhite,
  },
});
