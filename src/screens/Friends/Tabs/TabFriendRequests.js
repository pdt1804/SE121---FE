import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import TabFriendRequestsItems from "./TabFriendRequestsItems";
import { images, colors, fontSizes } from "../../../constants";
import { API_BASE_URL } from "../../../../DomainAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function TabFriendRequests(props) {
  //list of group example = state
  
  const [invitation, setInvitation] = useState([]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");
  const [username, setUsername] = useState("")

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
      try {

        const username = await AsyncStorage.getItem('username');
        setUsername(username);

        const response = await axios.get(API_BASE_URL + "/api/v1/friendship/getAllInvitationFriendList?myUserName=" + username);

        setInvitation(response.data)
        console.log(response.data)

                
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };
    fetchData();
  }, [props.userName]);

  return (
    <View style={styles.container}>
      <View /* Search bar */ style={styles.searchBarView}>
        <TextInput
          style={styles.searchBarTypingArea}
          autoCorrect={false}
          inputMode="search"
          onChangeText={(text) => {
            setSearchText(text);
          }}
          placeholder="Tìm kiếm..."
          placeholderTextColor={colors.inactive}
        />
        <Image source={images.searchIcon} style={styles.searchBarImage} />
      </View>

      <View style={styles.blackLine} />

      <ScrollView>
        {invitation
          .map((eachInvitation) => (
            <TabFriendRequestsItems
              invitation={eachInvitation}
              key={eachInvitation.information.infoID}
              onPress={() => {
                navigate("ShowProfileRequest", { 
                  userName: eachInvitation.userName,
                  image: eachInvitation.information.image, 
                  fulName: eachInvitation.information.fulName, 
                  phoneNumber: eachInvitation.information.phoneNumber, 
                  gender: eachInvitation.information.gender, 
                  yearOfBirth: eachInvitation.information.yearOfBirth,
                  email: eachInvitation.email 
                });
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}
export default TabFriendRequests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  searchBarView: {
    height: "7%",
    paddingHorizontal: 7,
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: colors.transparentWhite,
  },
  searchBarTypingArea: {
    height: "95%",
    flex: 1,
    paddingStart: 45,
  },
  searchBarImage: {
    width: 20,
    height: 20,
    position: "absolute",
    top: "45%",
    left: "6%",
    tintColor: colors.inactive,
  },
  blackLine: {
    backgroundColor: colors.inactive,
    height: 1,
    width: "95%",
    alignSelf: "center",
  },
});
