import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {Header, Icon, Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import url from '../config';


class EatInput extends React.Component {
  constructor() {
    super();
    this.state={
      foodList:[{name:'Pizza', url:"https://i.ibb.co/SwpXqCh/pizza.png"}, {name:'Salade', url: "https://i.ibb.co/t4JcSmv/salad.jpg"}, {name:'Chinois', url: "https://i.ibb.co/6P0TK7M/chinese.jpg"},
                {name:'Burger', url:"https://i.ibb.co/m43DHZQ/burger.png"}, {name:'Indien', url: "https://i.ibb.co/JR4fmS9/indian.jpg"}, {name:'Sushi', url:"https://i.ibb.co/R7R9NTP/sushi.jpg"}],
      foods:[],
      text:[],
    }
  }

  componentDidMount (){
    ctx = this
    fetch(`${url}/lists`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      ctx.setState({
        foods: data.body.foods
      })
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });

    AsyncStorage.getItem("foodSaved",
      function(err, data) {
        var foodSaved = JSON.parse(data);
        if(foodSaved){
        ctx.setState({
          foodList:foodSaved.food
        })
      }
      }
    )
  }

  static navigationOptions= {
    drawerIcon: ({tintColor}) => (
      <Icon name='food' type='material-community'  />
    )
  }

  addChoice = () => {
    var foodListCopy = [...this.state.foodList];
    foodListCopy.push({name:'', url:null});
    this.setState({
      foodList : foodListCopy
    })
  }

  inputChange = (value,i) => {
    var textCopy= [...this.state.text];
    textCopy[i]=value;
    this.setState({
      text: textCopy
    })
  }

  endEditing = () => {
    if(this.state.text[this.state.text.length -1]){
    var e = this.state.text[this.state.text.length -1].toLowerCase()
    e = e.charAt(0).toUpperCase() + e.slice(1)
    var foodListCopy = [...this.state.foodList];
    var textCopy = [...this.state.text];
    textCopy=[];
    for (var y =0; y< foodListCopy.length;y++){
      if(!foodListCopy[y].url){
        var match = this.state.foods.find( food => food['name'] === e );
        if(match){
          foodListCopy[y].name=match.name;
          foodListCopy[y].url=match.url;
        } else {
          foodListCopy[y].name=e;
          foodListCopy[y].url="https://i.ibb.co/C9K3HnW/food.jpg";
        }
      }
    }
    this.setState({
      text: textCopy,
      foodList : foodListCopy
    })
    }
  }

    deleteChoice  = (index) => {
      var foodListCopy = [...this.state.foodList];
      foodListCopy.splice(index,1);
       this.setState({
        foodList: foodListCopy
      })
    }

 check = () => {
    AsyncStorage.setItem("foodSaved", JSON.stringify({food:this.state.foodList}))
    this.props.sendValues(this.state.foodList);
    this.props.navigation.navigate("Result")
  }

  render() {
    var foodChoice = this.state.foodList.map((food, i) => {
      if(food.name){
        return (
          <View key={i} style={{flex:1}} >
            <View style={{ alignItems:'center', flexDirection: 'row', marginBottom:hp("1%"),marginTop:hp("2.5%"), height:hp("8%")}}>
              <Image source= {{uri:food.url}} style={{height: hp("8%"), width: wp("14.25%"), borderRadius:60, marginLeft: wp('5%'), borderWidth: 0.5,  borderColor: '#000'}}/>
              <Input
                editable= {false}
                value= {food.name}
                inputStyle= {{textAlign:'center', fontFamily:'comfortaa', fontSize: hp("3.25%")}}
                inputContainerStyle= {{borderBottomColor: 'rgba(255, 255, 255, 0)'}}
                containerStyle= {{backgroundColor: "#FFFFFF", alignItems:"center", justifyContent:"center", opacity: 0.8, borderColor: '#4B9742', borderWidth: 2, borderRadius:15, height:hp("8%"), width: wp("60%"), margin: wp('3.5%')}}
              />
              <TouchableOpacity onPress= {() => this.deleteChoice(i)}>
                <Icon size= {35} color='#686868' name='close-circle-outline' type='material-community'  />
              </TouchableOpacity>
            </View>
          </View>
        )
      } else {
        return (
          <View key={i} style={{flex:1}} >
            <View style={{  alignItems:'center', flexDirection: 'row', marginBottom:hp("1%"),marginTop:hp("2.5%"), height:hp("8%")}}>
              <Image source= {{uri:food.url}} style={{height: hp("8%"), width: wp("14.25%"), borderRadius:60, marginLeft: wp('5%'), borderWidth: 0.5,  borderColor: '#000'}}/>
              <Input
                onChangeText={(value) => this.inputChange(value, i)}
                onEndEditing={() => this.endEditing()}
                inputStyle= {{textAlign:'center', fontFamily:'comfortaa', fontSize: hp("3.25%")}}
                inputContainerStyle= {{borderBottomColor: 'rgba(255, 255, 255, 0)'}}
                containerStyle= {{backgroundColor: "#FFFFFF", alignItems:"center", justifyContent:"center", opacity: 0.8, borderColor: '#4B9742', borderWidth: 2, borderRadius:15, height:hp("8%"), width: wp("60%"), margin: wp('3.5%')}}
              />
              <TouchableOpacity onPress= {() => this.deleteChoice(i)}>
              <Icon size= {35} color='#686868' name='close-circle-outline' type='material-community'  />
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    })

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Header backgroundColor='#4B9742'
          leftComponent= <Icon name="menu" onPress={()=> this.props.navigation.openDrawer()} color='#D8D8D8'/>
          centerComponent={{ text: 'Le Décideur', style: { color: '#D8D8D8', fontFamily: 'pacifico', fontSize:hp("3.25%") } }}
        />
        <ScrollView>
          {foodChoice}
          <TouchableOpacity style= {{flexDirection:'row', alignItems:'center'}} onPress= {this.addChoice}>
            <Icon iconStyle={{marginLeft: wp("7.5%"), marginRight:wp("2%")}} size= {35} color='#686868' name='plus-circle' type='material-community'  />
            <Text style={{fontSize:hp("2.5%"), fontFamily:'Montserrat-SemiBold'}}>Ajouter un choix</Text>
          </TouchableOpacity>
          <View style={{alignItems:'center', justifyContent:'center', marginTop:hp("1.5%")}}>
            <Button title= "C'est parti!"
            onPress= {this.check}
            buttonStyle={{height:hp("8.5%"), width:wp("48%"), borderWidth:1, borderColor:"black", borderRadius:10, backgroundColor:'#4B9742', marginBottom:hp("4%")}}
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

function mapDispatchToProps(dispatch) {
  return {
    sendValues: function(values) {
        dispatch( {type: 'send', values: values} )
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(EatInput);
