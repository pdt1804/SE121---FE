import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../constants";

function NotificationItems(props) {

  let {header, notifycationType, content, dateSent} = props.group;
  
  const dateSentNotification = new Date(dateSent)
  const {onPress} = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={styles.img}
        source={notifycationType == 'admin' ?
          images.globeIcon : images.personCircleIcon}
      />
      <View style={styles.textView}>
        <Text style={styles.titleText} numberOfLines={1}>{header}</Text>
        <Text style={styles.contentText} numberOfLines={2}>{content}</Text>
      </View>
      <Text style={styles.timeText}>{dateSentNotification.getHours()}:{dateSentNotification.getMinutes()} {dateSentNotification.getDate()}/{dateSentNotification.getMonth() + 1}</Text>
    </TouchableOpacity>
  );
}
export default NotificationItems;

const styles = StyleSheet.create({
  container: {
    height: 63,
    marginBottom: 15,
    flexDirection: "row",
  },
  img: {
    width: 33,
    height: 33,
    resizeMode: "stretch",
    marginTop: 11,
    marginHorizontal: 10,
    tintColor: colors.active,
  },
  textView: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    color: colors.active,
    fontSize: fontSizes.h6,
    fontWeight: "400",
  },
  contentText: {
    color: "black",
    fontSize: fontSizes.h7,
    fontWeight: "300",
  },
  timeText: {
    width: 70,
    padding: 10,
    paddingLeft: 0,
    color: "black",
    fontSize: fontSizes.h8,
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "right",
    color: colors.inactive,
    marginBottom: 15,
    marginTop: -10,
  },
});
