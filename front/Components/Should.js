import React from 'react';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

class Should extends React.Component {

  componentDidMount () {
    this.check()
  }

  static navigationOptions= {
    drawerIcon: ({tintColor}) => (
      <Icon name='check' type='font-awesome' />
    )
  }

  check = () => {
    var values=[{name:"Oui"}, {name:"Non"}];
    this.props.sendValues(values);
    this.props.navigation.navigate("Result")
  }

  render() {
    return(null)
  }
}

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
)(Should);
