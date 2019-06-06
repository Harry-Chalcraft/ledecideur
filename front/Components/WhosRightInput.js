import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {Header, Icon, Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class WhosRight extends React.Component {
  constructor() {
    super();
    this.state={
      peopleList: [{name:'Personne 1', url: "https://i.ibb.co/7ztyhN1/person1.jpg"}, {name:'Personne 2', url: "https://i.ibb.co/zFYPxDC/person2.jpg"}],
      text:[],
    }
  }

  componentDidMount (){
    ctx = this;
    AsyncStorage.getItem("peopleSaved",
      function(err, data) {
        var peopleSaved = JSON.parse(data);
        if(peopleSaved){
        ctx.setState({
          peopleList:peopleSaved.people
        })
      }
      }
    )
  }

  static navigationOptions= {
    drawerIcon: ({tintColor}) => (
      <Icon name='users' type='font-awesome' />
    )
  }
  addChoice = () => {
    var peoplelistCopy = [...this.state.peopleList];
    if((peoplelistCopy.length+1)===2){
      peoplelistCopy.push({name:'Personne '+ (peoplelistCopy.length+1), url:"https://i.ibb.co/zFYPxDC/person2.jpg"});
    } else if((peoplelistCopy.length+1)===3){
      peoplelistCopy.push({name:'Personne '+ (peoplelistCopy.length+1), url:"https://i.ibb.co/9tR63LT/person3.jpg"});
    } else if ((peoplelistCopy.length+1)===4){
      peoplelistCopy.push({name:'Personne '+ (peoplelistCopy.length+1), url:"https://i.ibb.co/cQQzm7L/person4.jpg"});
    } else if ((peoplelistCopy.length+1)===5){
      peoplelistCopy.push({name:'Personne '+ (peoplelistCopy.length+1), url:"https://i.ibb.co/c38tjt7/person5.jpg"});
    } else if ((peoplelistCopy.length+1)===6){
      peoplelistCopy.push({name:'Personne '+ (peoplelistCopy.length+1), url:"https://i.ibb.co/fpmf2qT/person6.jpg"});
    } else if ((peoplelistCopy.length+1)===7){
      peoplelistCopy.push({name:'Personne '+ (peoplelistCopy.length+1), url:"https://i.ibb.co/9yWH7pT/person7.jpg"});
    } else if ((peoplelistCopy.length+1)===8){
      peoplelistCopy.push({name:'Personne '+ (peoplelistCopy.length+1), url:"https://i.ibb.co/VBKMYq3/person8.jpg"});
    } else if ((peoplelistCopy.length+1)===9){
      peoplelistCopy.push({name:'Personne '+ (peoplelistCopy.length+1), url:"https://i.ibb.co/KDvtgDz/person9.jpg"});
    } else if ((peoplelistCopy.length+1)===10){
      peoplelistCopy.push({name:'Personne '+ (peoplelistCopy.length+1), url:"https://i.ibb.co/YZsD3jH/person10.jpg"});
    } else if ((peoplelistCopy.length+1)===11){
      peoplelistCopy.push({name:'Personne '+ (peoplelistCopy.length+1), url:"https://i.ibb.co/McjCdh4/person11.jpg"});
    } else if((peoplelistCopy.length+1)===12){
      peoplelistCopy.push({name:'Personne '+ (peoplelistCopy.length+1), url:"https://i.ibb.co/r61MMq1/person12.jpg"});
    } else {
      peoplelistCopy.push({name:'Personne '+ (peoplelistCopy.length+1), url:"https://i.ibb.co/7ztyhN1/person1.jpg"});
    }
    this.setState({
      peopleList : peoplelistCopy
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
      var peoplelistCopy = [...this.state.peopleList];
      var textCopy = [...this.state.text];
      textCopy=[];
      peoplelistCopy[index].name = e;
      this.setState({
        text: textCopy,
        peopleList : peoplelistCopy
    })
  }
  }

  deleteChoice = (index) => {
    var peoplelistCopy = [...this.state.peopleList];
    peoplelistCopy.splice(index,1);
     this.setState({
      peopleList: peoplelistCopy
    })
  }

  check = () => {
    AsyncStorage.setItem("peopleSaved", JSON.stringify({people:this.state.peopleList}))
    this.props.sendValues(this.state.peopleList);
    this.props.navigation.navigate("Result")
  }

  render() {
    var peopleChoice = this.state.peopleList.map((people, i) => {
      return (
        <View key={i} style={{flex:1}} >
          <View style={{ alignItems:'center', flexDirection: 'row', marginBottom:hp("1%"),marginTop:hp("2.5%"), height:hp("8%")}}>
            <Image source= {{uri:people.url}} style={{height: hp("8%"), width: wp("14.25%"), borderRadius:60, marginLeft: wp('5%'), borderWidth: 0.5,  borderColor: '#000'}}/>
            <Input
              placeholder= {people.name}
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
          {peopleChoice}
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
)(WhosRight);
