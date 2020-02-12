import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StopWatch from './StopWatch';
import Car from './Car';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      parkingActionStarted: false,
      licenseplate: "X-999-XX"
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
        <View style={styles.licenceplateContainer}>
            <Text style={styles.licenseplate}>{this.state.licenseplate}</Text>
        </View>
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
  licenceplateContainer: {
    marginTop: 50,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FAA421',
    borderRadius: 5,
  },
  licenseplate: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000'
  },
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
