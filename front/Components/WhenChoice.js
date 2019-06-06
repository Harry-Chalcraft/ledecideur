import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Header, Icon, Button } from 'react-native-elements';
import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class WhenChoice extends React.Component {

  static navigationOptions= {
    drawerIcon: ({tintColor}) => (
      <Icon name='calendar' type='font-awesome' />
    )
  }

  btn_week = () => {
    var weekDays = [{name:"Lundi"}, {name:"Mardi"}, {name:"Mercredi"}, {name:"Jeudi"}, {name:"Vendredi"}, {name:"Samedi"}, {name:"Dimanche"}];
    this.props.sendValues(weekDays);
    this.props.navigation.navigate("Result")
  }

  btn_month = () => {
    var months = [{name:"Janvier"}, {name:"Février"}, {name:"Mars"}, {name:"Avril"}, {name:"Mai"}, {name:"Juin"}, {name:"Juillet"}, {name:"Août"}, {name:"Septembre"}, {name:"Octobre"}, {name:"Novembre"}, {name:"Décembre"}];
    this.props.sendValues(months);
    this.props.navigation.navigate("Result")
  }

  render() {
    return (
      <View style={styles.container}>
        <Header backgroundColor='#4B9742'
          leftComponent= <Icon name="menu" onPress={()=> this.props.navigation.openDrawer()} color='#D8D8D8'/>
          centerComponent={{ text: 'Le Décideur', style: { color: '#D8D8D8', fontFamily: 'pacifico', fontSize:hp("3.25%") } }}
        />
        <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
          <Button title= "Semaine"
          onPress= {this.btn_week}
          buttonStyle={{height:hp("10%"), width:wp("50%"), borderWidth:1, borderColor:"black", borderRadius:10, backgroundColor:'#4B9742', margin:hp("10%")}}
          titleStyle={{fontSize:hp("3.5%"), fontFamily:'Montserrat-SemiBold'}}
          />
          <Text style= {{fontSize:hp("2.25%"), fontFamily:'Montserrat-SemiBold'}}> ────────  OU  ────────</Text>
          <Button title= "Mois"
            onPress= {this.btn_month}
            buttonStyle={{height:hp("10%"), width:wp("50%"), borderWidth:1, borderColor:"black", borderRadius:10, backgroundColor:'#4B9742', margin:hp("10%")}}
            titleStyle={{fontSize:hp("3.5%"), fontFamily:'Montserrat-SemiBold'}}
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
)(WhenChoice);
