import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import StopWatch from './StopWatch';
import Car from './Car';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      parkingActionStarted: false
    }

    this.handleParkingActionChange = this.handleParkingActionChange.bind(this);
  }

  handleParkingActionChange(isStartParkingAction) {
    this.setState({parkingActionStarted: isStartParkingAction});
  }

  render() {
    const startedParkingAction = this.state.parkingActionStarted;
    
    return (
      <View style={styles.container}>
        <Car
          startedParking={startedParkingAction}/>
        <View style={styles.bottom}>
          <StopWatch
            onParkingActionChange={this.handleParkingActionChange}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  }
});
