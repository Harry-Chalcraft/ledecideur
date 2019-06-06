import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {Header, Icon, Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class CustomizeInput extends React.Component {
  constructor() {
    super();
    this.state={
      choiceList: [{name:'Choix n°1', url: "https://i.ibb.co/QXSLhGc/choice1.jpg"}, {name:'Choix n°2', url: "https://i.ibb.co/7nm1vZs/choice2.jpg"},
                  {name:'Choix n°3', url: "https://i.ibb.co/LtWpm06/choice3.jpg"}, {name:'Choix n°4', url: "https://i.ibb.co/XxZYnh5/choice4.jpg"}],
      text: [],
    }
  }

  componentDidMount (){
    ctx = this;
    AsyncStorage.getItem("choiceSaved",
      function(err, data) {
        var choiceSaved = JSON.parse(data);
        if(choiceSaved){
        ctx.setState({
          choiceList:choiceSaved.choice
        })
      }
      }
    )
  }

  static navigationOptions= {
    drawerIcon: ({tintColor}) => (
      <Icon name='user' type='font-awesome' />
    )
  }
  addChoice = () => {
    var choiceListCopy = [...this.state.choiceList];
    if ((choiceListCopy.length+1)===2){
      choiceListCopy.push({name:'Choix n°'+ (choiceListCopy.length+1), url:"https://i.ibb.co/7nm1vZs/choice2.jpg"});
    } else if ((choiceListCopy.length+1)===3){
      choiceListCopy.push({name:'Choix n°'+ (choiceListCopy.length+1), url:"https://i.ibb.co/LtWpm06/choice3.jpg"});
    } else if ((choiceListCopy.length+1)===4){
      choiceListCopy.push({name:'Choix n°'+ (choiceListCopy.length+1), url:"https://i.ibb.co/XxZYnh5/choice4.jpg"});
    } else if ((choiceListCopy.length+1)===5){
      choiceListCopy.push({name:'Choix n°'+ (choiceListCopy.length+1), url:"https://i.ibb.co/qJ5sTCC/choice5.jpg"});
    } else if ((choiceListCopy.length+1)===6){
      choiceListCopy.push({name:'Choix n°'+ (choiceListCopy.length+1), url:"https://i.ibb.co/ZmMhF6d/choice6.jpg"});
    } else if ((choiceListCopy.length+1)===7){
      choiceListCopy.push({name:'Choix n°'+ (choiceListCopy.length+1), url:"https://i.ibb.co/7nZhyFm/choice7.jpg"});
    } else if ((choiceListCopy.length+1)===8){
      choiceListCopy.push({name:'Choix n°'+ (choiceListCopy.length+1), url:"https://i.ibb.co/kX6y0cq/choice8.jpg"});
    } else if ((choiceListCopy.length+1)===9){
      choiceListCopy.push({name:'Choix n°'+ (choiceListCopy.length+1), url:"https://i.ibb.co/GWr8r6Z/choice9.jpg"});
    } else {
      choiceListCopy.push({name:'Choix n°'+ (choiceListCopy.length+1), url:"https://i.ibb.co/QXSLhGc/choice1.jpg"});
    }
    this.setState({
      choiceList : choiceListCopy
    })
  }

  inputChange = (value,i) => {
    var textCopy= [...this.state.text];
    textCopy[i]=value;
    this.setState({
      text: textCopy
    })
  }

  endEditing = (index) => {
    if(this.state.text[this.state.text.length -1]){
      var e = this.state.text[this.state.text.length -1].toLowerCase()
      e = e.charAt(0).toUpperCase() + e.slice(1)
      var choiceListCopy = [...this.state.choiceList];
      var textCopy = [...this.state.text];
      textCopy=[];
      choiceListCopy[index].name = e;
      this.setState({
        text: textCopy,
        choiceList : choiceListCopy
    })
  }
  }

  deleteChoice = (index) => {
    var choiceListCopy = [...this.state.choiceList];
    choiceListCopy.splice(index,1);
     this.setState({
      choiceList: choiceListCopy
    })
  }

  check = () => {
    AsyncStorage.setItem("choiceSaved", JSON.stringify({choice:this.state.choiceList}))
    this.props.sendValues(this.state.choiceList);
    this.props.navigation.navigate("Result")
  }

  render() {
    var choices = this.state.choiceList.map((choice, i) => {
      return (
        <View key={i} style={{flex:1}} >
          <View style={{ alignItems:'center', flexDirection: 'row', marginBottom:hp("1%"),marginTop:hp("2.5%"), height:hp("8%")}}>
            <Image source= {{uri:choice.url}} style={{height: hp("8%"), width: wp("14.25%"), borderRadius:60, marginLeft: wp('5%'), borderWidth: 0.5,  borderColor: '#000'}}/>
            <Input
              placeholder= {choice.name}
              placeholderTextColor= '#000'
              onChangeText={(value) => this.inputChange(value, i)}
              onEndEditing={() => this.endEditing(i)}
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
    })

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Header backgroundColor='#4B9742'
          leftComponent= <Icon name="menu" onPress={()=> this.props.navigation.openDrawer()} color='#D8D8D8'/>
          centerComponent={{ text: 'Le Décideur', style: { color: '#D8D8D8', fontFamily: 'pacifico', fontSize:hp("3.25%") } }}
        />
        <ScrollView>
          {choices}
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
)(CustomizeInput);
