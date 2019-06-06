import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import { Audio, } from 'expo';
import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class Result extends React.Component {
  state = {
    timePassed: false,
  };

  isMounted= false

  componentDidMount() {
    var ctx=this;
    isMounted= true;
    AsyncStorage.getItem("speedValue",
      function(error, data){
        if(data=="2"){
          ctx.timeoutCheck = setTimeout(() => {
            ctx.setTimePassed();
          }, 1000);
        } else if (data=="0"){
          ctx.timeoutCheck = setTimeout(() => {
            ctx.setTimePassed();
          }, 6000);
        } else {
          ctx.timeoutCheck = setTimeout(() => {
            ctx.setTimePassed();
          }, 3000);
        }
      }
    )
  }

  componentWillUnmount () {
    isMounted=false
  }

  static navigationOptions = ({ navigation }) => {
    return{
      drawerLabel: () => null
    }
  }

  setTimePassed() {
    var ctx=this;
    if(isMounted){
      ctx.setState({timePassed: true});
      AsyncStorage.getItem("switchValue",
        function(error, data){
          if(data=="true"){
            ctx.playSound();
          }
        }
      )
    }
  }

  playSound = async ()=> {
    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/sound/tada.mp3'));
      await soundObject.playAsync();
    } catch (error) {
        console.log("SOUND", error);
      }
  }

  render() {
    if(!this.state.timePassed){
      return (
        <View style={styles.container}>
          <Header backgroundColor='#4B9742'
            leftComponent= <Icon name="menu" onPress={()=> this.props.navigation.openDrawer()} color='#D8D8D8'/>
            centerComponent={{ text: 'Le Décideur', style: { color: '#D8D8D8', fontFamily: 'pacifico', fontSize:hp("3.25%") } }}
          />
          <View style={{flex:1, alignItems:'center', justifyContent: 'center', marginTop:hp("5%")}}>
            <Text style={{textAlign:"center", fontFamily: 'pacifico', fontSize: hp("5%"), color:"#4B9742"}}>Un petit instant svp,{"\n"}le Décideur réfléchit...</Text>
            <Image source= {require("../assets/images/ledecideur/ledecideur4.png")} style={{marginBottom:hp("20%"), height: hp("40%"), width: wp("60%"), resizeMode:'contain'}}/>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Header backgroundColor='#4B9742'
          leftComponent= <Icon name="menu" onPress={()=> this.props.navigation.openDrawer()} color='#D8D8D8'/>
          centerComponent={{ text: 'Le Décideur', style: { color: '#D8D8D8', fontFamily: 'pacifico', fontSize:hp("3.25%") } }}
        />
        <View style={{flex:1, alignItems:'center', justifyContent: 'center', marginTop:hp("5%")}}>
          <Text style={{textAlign:"center", fontFamily: 'pacifico', fontSize: hp("5%"), color:"#4B9742"}}>Le Décideur a pris{"\n"}sa décision: <Text style={{fontSize: hp("6.5%"), color:'#984447'}}>{this.props.result.name}!</Text></Text>
          <Image source= {require("../assets/images/ledecideur/ledecideur3.png")} style={{marginBottom:hp("20%"), height: hp("40%"), width: wp("60%"), resizeMode:'contain'}}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8D8D8',
  },
});

function mapStateToProps(state) {
  return { result: state.result}
}

export default connect(
  mapStateToProps,
  null
)(Result);
