import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class StopWatch extends Component {

    state = {
        timer: null,
        timerTitle: 'START',
        counter: 0,
        hours: '00',
        minutes: '00',
        seconds: '00',
        startDisabled: false,
        stopDisabled: true
    }

    constructor( props ) {
        super( props );

        this.onButtonStart = this.onButtonStart.bind(this);
        this.onButtonStop = this.onButtonStop.bind(this);
        this.onButtonClear = this.onButtonClear.bind(this);

        this.onStarStop = this.onStarStop.bind(this);
        
        this.start = this.start.bind(this);
    }

    componentDidMount() {
        //this.start();
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    start() {
        var self = this;
        let timer = setInterval(() => {
            var secondsRepresentation = (Number(this.state.seconds) + 1).toString(),
            minutesRepresentation = (Number(this.state.minutes)).toString(),
            hoursRepresentation = (Number(this.state.hours)).toString();

            if(Number(this.state.seconds) == 59 ) {
                secondsRepresentation = '00';

                this.state.minutes = (Number(this.state.minutes) + 1).toString();
                if(Number(this.state.seconds) == 59 ) {
                    minutesRepresentation = '00';

                    this.state.hours = (Number(this.state.hours) + 1).toString();
                    hoursRepresentation = (Number(this.state.hours)).toString();
                }
            }

            self.setState({
                counter: Number(this.state.counter) + 1,
                seconds: secondsRepresentation.length == 1 ? '0'+secondsRepresentation : secondsRepresentation,
                minutes: minutesRepresentation.length == 1 ? '0'+minutesRepresentation : minutesRepresentation,
                hours: hoursRepresentation.length == 1 ? '0'+hoursRepresentation : hoursRepresentation,
            });
        }, 1000);
        this.setState({timer});
    }

    onButtonStart() {
        this.start();
        this.setState({timerTitle: 'STOP'});
    }


    onButtonStop() {
        clearInterval(this.state.timer);
        this.setState({timerTitle: 'START'});
    }

    onButtonClear() {
        clearInterval(this.state.timer);
        this.setState({
            timerTitle: 'START',
            timer: null,
            counter: 0,
            hours: '00',
            minutes: '00',
            seconds: '00'
        });
    }

    onStarStop() {
        if (this.state.timer != null) {
            this.onButtonClear();
            this.props.onParkingActionChange(false);
        } else {
            this.onButtonStart();
            this.props.onParkingActionChange(true);
        }
        
    }

    render() {
        return(
            <View>
                <View style={styles.counterContainer}>
                    <Text style={styles.counter}>{this.state.minutes}:{this.state.hours}</Text>
                    <Text style={styles.miniCounter}>{this.state.seconds}</Text>
                </View>
                <TouchableOpacity 
                    onPress={this.onStarStop}>
                    <Text style={[styles.text, (this.state.timer == null ? styles.startBackground : styles.stopBackground)]}>{this.state.timerTitle}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    counter: {
        fontSize: 60,
        textAlign: 'center',
        height: 80,
    },
    miniCounter: {
        fontSize: 20,
        position: 'relative',
        marginTop: 15
    },
    text: {
        textAlign: 'center',
        marginHorizontal: 40,
        marginVertical: 10,
        padding: 15,
        width: 300,
        color: '#fff',
        borderRadius: 15,
    },
    startBackground: {
        backgroundColor: '#36855b'
    },
    stopBackground: {
        backgroundColor: '#FA385E'
    }
});