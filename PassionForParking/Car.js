import React, {Component} from 'react';
import {
    StyleSheet,
    Animated
} from 'react-native';

export default class Car extends Component {

    state = {
        initialPosition: 0,
        parkedPosition: 300,
        duration: 2000,
        animation : new Animated.Value(0)
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //
    }

    componentWillUnmount() {
        //
    }

    parkAnimation() {
        Animated.timing(this.state.animation,{
          toValue : this.state.parkedPosition,
          duration : this.state.duration
        }).start();
    }

    leaveAnimation() {
        Animated.timing(this.state.animation,{
          toValue : this.state.initialPosition,
          duration : this.state.duration
        }).start();
    }

    render() {
        const startedParking = this.props.startedParking;

        if (startedParking) {
            this.parkAnimation();
        } else {
            this.leaveAnimation();
        }

        const transformStyle = {
          transform : [{ 
            translateX : this.state.animation,
          }]
        }
        
        return (
            <Animated.Image 
                source={require('./img/car.png')}
                style={[styles.animatedBox, transformStyle]} />
        );
    }
}

const styles = StyleSheet.create({
    animatedBox:{
       marginTop: 200,
       left: -380,
       width : 500,
       height: 373,
    }
  });