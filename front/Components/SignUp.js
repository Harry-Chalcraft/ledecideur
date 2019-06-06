import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import {Header, Icon, Button, Input } from 'react-native-elements';
import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import url from '../config';

export default class SignUp extends React.Component {

  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  static navigationOptions = ({ navigation }) => {
    return{
      drawerLabel: () => null
    }
  }

  showAlert = () =>{
      Alert.alert("Erreur", "Cet email est déjà utilisé. Merci d'en saisir un nouveau.")
   }

  signUp = () => {
    fetch(`${url}/signup`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email=${this.state.email}&password=${this.state.password}`
    }).then((res, err)  => res.json()
      ).then(data => {
        if(data.isUserExist){
          this.setState({name:'', email:'', password:''});
          this.showAlert();
          this.props.navigation.navigate('SignUp');
        }else{
          this.props.navigation.navigate("SignIn")
        }
      }).catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Header backgroundColor='#4B9742'
          centerComponent={{ text: 'Le Décideur', style: { color: '#D8D8D8', fontFamily: 'pacifico', fontSize:hp("3.25%") } }}
        />

        <ScrollView>
        <View  style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <Icon name='user-plus' type='font-awesome' size={100} color="grey" containerStyle={{margin:hp("3%")}}/>

        <Input
        placeholder="Nom d'utilisateur"
        inputStyle= {{fontWeight:'normal', fontFamily:'Montserrat-SemiBold', fontSize: hp("2.5%")}}
        value={this.state.name}
        inputContainerStyle= {{borderBottomColor: 'rgba(255, 255, 255, 0)'}}
        containerStyle= {{backgroundColor: "#FFFFFF", alignItems:"center", justifyContent:"center", opacity: 0.8, borderColor: '#4B9742', borderWidth: 2, borderRadius:15, height:hp("8%"), width: wp("60%"), margin: wp('5%')}}
        leftIcon={
          <Icon
            name='user'
            type='font-awesome'
            size={18}
            color='#969FAA'
          />
        }
        leftIconContainerStyle= {{paddingRight: hp("3%")}}
        onChangeText={(e) => this.setState({name: e})}
      />

        <Input
        placeholder='Email'
        inputStyle= {{fontWeight:'normal', fontFamily:'Montserrat-SemiBold', fontSize: hp("2.5%")}}
        value={this.state.email}
        inputContainerStyle= {{borderBottomColor: 'rgba(255, 255, 255, 0)'}}
        containerStyle= {{backgroundColor: "#FFFFFF", alignItems:"center", justifyContent:"center", opacity: 0.8, borderColor: '#4B9742', borderWidth: 2, borderRadius:15, height:hp("8%"), width: wp("60%"), margin: wp('5%')}}
        leftIcon={
          <Icon
            name='envelope'
            type='font-awesome'
            size={18}
            color='#969FAA'
          />
        }
        leftIconContainerStyle= {{paddingRight: hp("3%")}}
        onChangeText={(e) => this.setState({email: e})}
      />

      <Input
        secureTextEntry={true}
        inputStyle= {{fontFamily:'Montserrat-SemiBold', fontSize: hp("2.5%")}}
        value={this.state.password}
        placeholder='Mot de passe'
        inputContainerStyle= {{borderBottomColor: 'rgba(255, 255, 255, 0)'}}
        containerStyle= {{backgroundColor: "#FFFFFF", alignItems:"center", justifyContent:"center", opacity: 0.8, borderColor: '#4B9742', borderWidth: 2, borderRadius:15, height:hp("8%"), width: wp("60%"), margin: wp('5%')}}
        leftIcon={
          <Icon
            name='lock'
            type='font-awesome'
            size={22}
            color='#969FAA'
          />
        }
        leftIconContainerStyle= {{paddingRight: hp("3%")}}
        onChangeText={(e) => this.setState({password: e})}
      />

      <Button title= "Valider"
        onPress= {this.signUp}
        buttonStyle={{height:hp("8%"), width:wp("45%"), borderWidth:1, borderColor:"black", borderRadius:10, backgroundColor:'#4B9742', marginTop: hp("3%")}}
        titleStyle={{fontSize:hp("3%"), fontFamily:'Montserrat-SemiBold'}}
      />
      </View>
        </ScrollView>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8D8D8'
  },
});
