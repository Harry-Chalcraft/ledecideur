import React from 'react';
import { StyleSheet, Text, View, Linking, Image } from 'react-native';
import {Header, Icon, Button} from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class Contact extends React.Component {

  static navigationOptions= {
    drawerIcon: ({tintColor}) => (
      <Icon name='message-text' type='material-community'  />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header backgroundColor='#4B9742'
          leftComponent= <Icon name="menu" onPress={()=> this.props.navigation.openDrawer()} color='#D8D8D8'/>
          centerComponent={{ text: 'Le Décideur', style: { color: '#D8D8D8', fontFamily: 'pacifico', fontSize:hp("3.25%") } }}
        />
        <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
          <Image source= {require("../assets/images/ledecideur/ledecideur5.png")} style={{height: hp("40%"), width: wp("60%"), resizeMode:'contain'}}/>
          <Text style={{fontSize: hp("3%"), fontFamily:"Montserrat-SemiBold", color:"#505050", textAlign:"center", marginRight:wp("1%"), marginLeft:wp("1%")}}>N'hésitez pas à nous dire si vous aimez l'appli ou si vous avez des suggestions d'amélioration!</Text>
          <Button title= "Nous contacter"
            onPress= {() => Linking.openURL('mailto:assistance.ledecideur@gmail.com') }
            buttonStyle={{height:hp("8%"), width:wp("45%"), borderWidth:1, borderColor:"black", borderRadius:10, backgroundColor:'#4B9742', marginTop:hp("7%")}}
            titleStyle={{fontSize:hp("2.6%"), fontFamily:'Montserrat-SemiBold'}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8D8D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
