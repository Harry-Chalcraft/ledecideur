import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Switch, Slider, ScrollView } from 'react-native';
import {Header, Icon, CheckBox, Button} from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';


export default class Options extends React.Component {
  constructor() {
    super();
    this.state={
      checkFoodValue: false,
      checkActivityValue: false,
      checkPeopleValue: false,
      checkChoiceValue: false,
      switchValue: false,
      speedValue: 1
    }
  }

  componentDidMount () {
    ctx=this;
    AsyncStorage.getItem("speedValue",
      function(error, data){
        if(data){
          ctx.setState({speedValue: JSON.parse(data)})
        }
      }
    )
    AsyncStorage.getItem("switchValue",
      function(error, data){
        if(data){
          ctx.setState({switchValue: JSON.parse(data)})
        }
      }
    )
  }

  static navigationOptions= {
    drawerIcon: ({tintColor}) => (
      <Icon name='settings-outline' type='material-community' />
    )
  }

  switch = () => {
    this.setState({switchValue:!this.state.switchValue})
  }

  checkFood = () => {
    this.setState({checkFoodValue:!this.state.checkFoodValue})
  }
  checkActivity = () => {
    this.setState({checkActivityValue:!this.state.checkActivityValue})
  }
  checkPeople = () => {
    this.setState({checkPeopleValue:!this.state.checkPeopleValue})
  }
  checkChoice = () => {
    this.setState({checkChoiceValue:!this.state.checkChoiceValue})
  }

  confirm = () => {
    if(this.state.checkFoodValue){
       AsyncStorage.removeItem("foodSaved")
    }
    if(this.state.checkActivityValue){
       AsyncStorage.removeItem("activitySaved")
    }
    if(this.state.checkPeopleValue){
       AsyncStorage.removeItem("peopleSaved")
    }
    if(this.state.checkChoiceValue){
       AsyncStorage.removeItem("choiceSaved")
    }
    var switchValue = JSON.stringify(this.state.switchValue)
      AsyncStorage.setItem("switchValue", switchValue)

    var speedValue = JSON.stringify(this.state.speedValue)
     AsyncStorage.setItem("speedValue", speedValue)

    this.props.navigation.navigate("accueil")
  }

  render() {
    var thumbColor;
    if(this.state.switchValue){
      thumbColor= '#4B9742'
    }
    return (
      <View style={styles.container}>
        <Header backgroundColor='#4B9742'
          leftComponent= <Icon name="menu" onPress={()=> this.props.navigation.openDrawer()} color='#D8D8D8'/>
          centerComponent={{ text: 'Le Décideur', style: { color: '#D8D8D8', fontFamily: 'pacifico', fontSize:hp("3.25%") } }}
        />
        <View style= {{flex: 1, backgroundColor:"#fff", borderRadius:15, margin: wp("7%")}}>
          <Text style={{fontSize:hp("2.75%"), marginTop: hp("3%"), marginBottom:hp("1%"), marginLeft:wp("10%"), fontFamily:"Montserrat-SemiBold", color:"grey"}}>Réinitialiser les choix de :</Text>
          <CheckBox containerStyle={{backgroundColor:"#fff", borderColor:"#fff", margin:wp("1.5%"), padding:0, marginRight:wp("20%")}}
                    textStyle= {{fontSize:hp("2.35%"), fontFamily:"Montserrat-SemiBold", fontWeight:"normal", color:'grey'}}
                    checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor="#4B9742" right iconRight= {true}
                    title='quoi manger?'
                    onPress={this.checkFood}
                    onIconPress={this.checkFood}
                    checked={this.state.checkFoodValue}
          />
          <CheckBox containerStyle={{backgroundColor:"#fff", borderColor:"#fff", margin:wp("1.5%"), padding:0, marginRight:wp("20%")}}
                    textStyle= {{fontSize:hp("2.35%"), fontFamily:"Montserrat-SemiBold", fontWeight:"normal", color:'grey'}}
                    checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor="#4B9742" right iconRight= {true}
                    title='quoi faire ce soir?'
                    onPress={this.checkActivity}
                    onIconPress={this.checkActivity}
                    checked={this.state.checkActivityValue}
          />
          <CheckBox containerStyle={{backgroundColor:"#fff", borderColor:"#fff", margin:wp("1.5%"), padding:0, marginRight:wp("20%")}}
                    textStyle= {{fontSize:hp("2.35%"), fontFamily:"Montserrat-SemiBold", fontWeight:"normal", color:'grey'}}
                    checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor="#4B9742" right iconRight= {true}
                    title='qui a raison?'
                    onPress={this.checkPeople}
                    onIconPress={this.checkPeople}
                    checked={this.state.checkPeopleValue}
          />
          <CheckBox containerStyle={{backgroundColor:"#fff", borderColor:"#fff", margin:wp("1.5%"), padding:0, marginRight:wp("20%")}}
                    textStyle= {{fontSize:hp("2.35%"), fontFamily:"Montserrat-SemiBold", fontWeight:"normal", color:'grey'}}
                    checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor="#4B9742" right iconRight= {true}
                    title='choix personnalisé'
                    onPress={this.checkChoice}
                    onIconPress={this.checkChoice}
                    checked={this.state.checkChoiceValue}
          />
          <View style={{alignItems:"center"}}>
            <Text style={{color:'grey', fontSize:hp("2%")}}> ────────────────</Text>
          </View>

          <View style={{flexDirection: 'row',justifyContent:"flex-start", alignItems:"center"}}>
            <Text style={{fontSize:hp("2.75%"), margin: wp("4%"), marginLeft:wp("10%"), fontFamily:"Montserrat-SemiBold", color:"grey"}}>Son</Text>
            <Switch style={{marginLeft: wp("13%")}} onValueChange={this.switch} value={this.state.switchValue} trackColor={{true:"#4B9742"}} thumbColor= {thumbColor}/>
          </View>

          <View style={{alignItems:"center"}}>
            <Text style={{color:'grey', fontSize:hp("2%")}}> ────────────────</Text>
          </View>

          <View style={{justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize:hp("2.75%"), margin: wp("4%"), fontFamily:"Montserrat-SemiBold", color:"grey"}}>Vitesse de décision</Text>
            <Slider
              style= {{width:wp("55%")}}
              minimumTrackTintColor={"#4B9742"}
              thumbTintColor={"#4B9742"}
              value={this.state.speedValue}
              onValueChange={value => this.setState({ speedValue:value })}
              maximumValue={2}
              minimumValue={0}
              step={1}
            />
            <View style={{flexDirection: 'row', marginLeft:wp("4%")}}>
              <Text style={{marginBottom:hp("4%"), margin:wp("5%"), marginTop:0, fontFamily:"Montserrat-SemiBold", color:"grey", fontSize:hp("2.35%")}}>Lent</Text>
              <Text style={{marginBottom:hp("4%"), margin:wp("5%"), marginTop:0, fontFamily:"Montserrat-SemiBold", color:"grey", fontSize:hp("2.35%")}}>Normal</Text>
              <Text style={{marginBottom:hp("4%"), margin:wp("5%"), marginTop:0, fontFamily:"Montserrat-SemiBold", color:"grey", fontSize:hp("2.35%")}}>Rapide</Text>
            </View>

            <Button title= "Valider"
              onPress= {this.confirm}
              buttonStyle={{height:hp("8%"), width:wp("45%"), borderWidth:1, borderColor:"black", borderRadius:10, backgroundColor:'#4B9742'}}
              titleStyle={{fontSize:hp("3%"), fontFamily:'Montserrat-SemiBold'}}
            />
          </View>
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
