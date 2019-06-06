import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {Header, Icon, Input, Button, ListItem} from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import url from '../config';


export default class Library extends React.Component {
  constructor() {
    super();
    this.state={
      library:[]
    }
  }

  componentDidMount (){
    ctx = this;
    fetch(`${url}/library`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      ctx.setState({library: data.library})
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });
    }

  static navigationOptions= {
    drawerIcon: ({tintColor}) => (
      <Icon name='history' type='font-awesome' />
    )
  }

  delete = () => {
    fetch(`${url}/delete`);
    this.props.navigation.navigate("accueil")
  }

  render() {
    var list = this.state.library.map((decision, i) => {

      var dateUTC = new Date(decision.date);
      var day = dateUTC.getDate();
      if(day < 10){
        day= "0"+day
      }
      var month = dateUTC.getMonth()+1;
      if(month < 10){
        month= "0"+month
      }
      var year = dateUTC.getFullYear();
      var hour = dateUTC.getHours()-2;
      if(hour < 10){
        hour= "0"+hour
      }
      var minute = dateUTC.getMinutes();
      if(minute < 10){
        minute= "0"+minute
      }

      var date = "Le "+day+"/"+month+"/"+year+" à "+hour+"h"+minute;
      var img ;
      if(decision.url=="undefined"){
        img = "https://i.ibb.co/wpgYN7q/ledecideur6bis.png";
      } else {
        img = decision.url;
      }

      return (
        <ListItem
        key ={i}
        leftAvatar={{ source: { uri: img } , size:hp("8%") }}
        title={"Le Décideur a choisi: "+ decision.result}
        titleStyle={{fontSize:hp("2.5%"), fontFamily:'Montserrat-Medium'}}
        subtitle={date}
        subtitleStyle={{fontSize:hp("2%"), fontFamily:'Montserrat-Medium'}}
        />
      )
    })
    return (
      <View style={styles.container}>
        <Header backgroundColor='#4B9742'
          leftComponent= <Icon name="menu" onPress={()=> this.props.navigation.openDrawer()} color='#D8D8D8'/>
          centerComponent={{ text: 'Le Décideur', style: { color: '#D8D8D8', fontFamily: 'pacifico', fontSize:hp("3.25%") } }}
        />
        <ScrollView>
          {list}
          <View style={{justifyContent:"center", alignItems:"center"}}>
          <Button title= "Supprimer l'historique"
            onPress= {this.delete}
            buttonStyle={{height:hp("6%"), width:wp("45%"), borderWidth:1, borderColor:"black", borderRadius:7, backgroundColor:'#4B9742', marginTop: hp("3%"), marginBottom: hp("3%")}}
            titleStyle={{fontSize:hp("2,75%"), fontFamily:'Montserrat-SemiBold'}}
          />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
