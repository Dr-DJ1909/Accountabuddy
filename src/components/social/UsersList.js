import React, {Component} from 'react';
import {Image, Text, View, FlatList, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {UsersView} from '../../styles';
import {newFriend} from '../../api/FriendsRoute';
import {newChat} from '../../api/ChatRoute'

export default function ListUsers(props) {
  return (
    <UsersView>
      <Text>{props.item.email}</Text>
      <Button
        title="Add"
        onPress={() => {
          newFriend(props.uId, props.item.uId);
          newFriend(props.item.uId, props.uId);
        }}
      ></Button>
    </UsersView>
  );
}
