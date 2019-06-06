import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Home from'./Home'
import Result from "./Result"
import CustomizeInput from "./CustomizeInput"
import EatInput from "./EatInput"
import ToDoInput from "./ToDoInput"
import WhenChoice from "./WhenChoice"
import WhosRightInput from "./WhosRightInput"
import Contact from "./Contact"
import Should from "./Should"
import Options from "./Options"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import Library from "./Library"



export default class Navigation extends React.Component {
  render() {
    return (
      <AppDrawerNavigator/>
    );
  }
}

var CustomDrawerComponent= (props)=> (
  <SafeAreaView style={{flex:1}}>
    <View style={{height: hp("15.5%"), backgroundColor: "#4B9742", alignItems:'center', justifyContent: 'center'}}>
      <Image source= {require("../assets/images/ledecideur/ledecideur2.png")} style={{height: hp("70%"), width: wp("25%"), borderRadius:60, resizeMode:'center'}}/>
    </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)

var StackNavigator = createStackNavigator({
  Result:Result,
}, {headerMode: 'none'})

var AppDrawerNavigator = createDrawerNavigator({
  SignIn: SignIn,
  SignUp: SignUp,
  "accueil": Home,
  "quoi manger?": EatInput,
  "quoi faire ce soir?": ToDoInput,
  "qui a raison?": WhosRightInput,
  "devrais-je?": Should,
  "quand le faire?": WhenChoice,
  "choix personnalisé": CustomizeInput,
  "historique":Library,
  "options": Options,
  "nous contacter": Contact,
  Result: Result
}, {
  drawerWidth: wp("80%"),
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor:'#4B9742',
    labelStyle:{fontSize:hp("2.5%"), fontWeight:'normal', fontFamily:'Montserrat-SemiBold'},
    itemStyle:{borderWidth: 0.2, borderColor:"#E0E0E0"},
  }
})
