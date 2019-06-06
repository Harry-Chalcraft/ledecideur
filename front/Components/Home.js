import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Header, Icon} from 'react-native-elements'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Home extends React.Component {

  static navigationOptions= {
    drawerIcon: ({tintColor}) => (
      <Icon name='home' type='material-community' />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header backgroundColor='#4B9742'
          leftComponent= <Icon name="menu" onPress={()=> this.props.navigation.openDrawer()} color='#D8D8D8'/>
          centerComponent={{ text: 'Le Décideur', style: { color: '#D8D8D8', fontFamily: 'pacifico', fontSize:hp("3.25%") } }}
        />
        <View style={{flex:1, alignItems:'center', justifyContent:'space-around'}}>
          <Text style={{fontFamily: 'pacifico', fontSize: 50, color:"#4B9742"}}>Le Décideur</Text>
          <Image source= {require("../assets/images/ledecideur/ledecideur1.png")} style={{marginBottom:hp("22%"), height: hp("40%"), width: wp("60%")}}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8D8D8'
  },
});
