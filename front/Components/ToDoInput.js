import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {Header, Icon, Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import url from '../config';


class ToDoInput extends React.Component {
  constructor() {
    super();
    this.state={
      activityList: [{name:'Séries', url: "https://i.ibb.co/16CFvY5/series.jpg"}, {name:'Restaurant', url: "https://i.ibb.co/k0hzcSN/restaurant.jpg"}, {name:'Soirée bien-être', url: "https://i.ibb.co/FqTHywF/spa.jpg"},
                    {name:'Cinéma', url: "https://i.ibb.co/8b5LCbs/cinema.jpg"}, {name:'Lecture', url: "https://i.ibb.co/0JdG5jb/book.jpg"}, {name:'Sortie entre amis', url:"https://i.ibb.co/mGb5FCB/friends.jpg"}],
      activities:[],
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
        activities: data.body.activities
      })
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });

    AsyncStorage.getItem("activitySaved",
      function(err, data) {
        var activitySaved = JSON.parse(data);
        if(activitySaved){
        ctx.setState({
          activityList:activitySaved.activity
        })
      }
      }
    )
  }

  static navigationOptions= {
    drawerIcon: ({tintColor}) => (
      <Icon name='weather-sunset' type='material-community' />
    )
  }
  addChoice = () => {
    var activityListCopy = [...this.state.activityList];
    activityListCopy.push({name:'', url:null});
    this.setState({
      activityList : activityListCopy
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
    var activityListCopy = [...this.state.activityList];
    var textCopy = [...this.state.text];
    textCopy=[];
    for (var y =0; y< activityListCopy.length;y++){
      if(!activityListCopy[y].url){
        var match = this.state.activities.find( activity => activity['name'] === e );
        if(match){
          activityListCopy[y].name=match.name;
          activityListCopy[y].url=match.url;
        } else {
          activityListCopy[y].name=e;
          activityListCopy[y].url="https://i.ibb.co/pJMC6ts/activities.jpg";
        }
      }
    }
    this.setState({
      text: textCopy,
      activityList : activityListCopy
    })
  }
  }

  deleteChoice  = (index) => {
    var activityListCopy = [...this.state.activityList];
    activityListCopy.splice(index,1);
     this.setState({
      activityList: activityListCopy
    })
  }

  check = () => {
    AsyncStorage.setItem("activitySaved", JSON.stringify({activity:this.state.activityList}))
    this.props.sendValues(this.state.activityList);
    this.props.navigation.navigate("Result")
  }


  render() {
    var activityChoice = this.state.activityList.map((activity, i) => {
      if(activity.name){
        return (
          <View key={i} style={{flex:1}} >
            <View style={{ alignItems:'center', flexDirection: 'row', marginBottom:hp("1%"),marginTop:hp("2.5%"), height:hp("8%")}}>
              <Image source= {{uri:activity.url}} style={{height: hp("8%"), width: wp("14.25%"), borderRadius:60, marginLeft: wp('5%'), borderWidth: 0.5,  borderColor: '#000'}}/>
              <Input
                editable= {false}
                value= {activity.name}
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
            <View style={{ alignItems:'center', flexDirection: 'row', marginBottom:hp("1%"),marginTop:hp("2.5%"), height:hp("8%")}}>
              <Image source= {{uri:activity.url}} style={{height: hp("8%"), width: wp("14.25%"), borderRadius:60, marginLeft: wp('5%'), borderWidth: 0.5,  borderColor: '#000'}}/>
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
          {activityChoice}
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
)(ToDoInput);
