import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ToastAndroid

} from 'react-native';

var SoundPlayer = require('react-native-sound')
var song = null

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			play: false,
			pause: false,

		}
	}

	componentWillMount() {
		song = new SoundPlayer('bad.mp3', SoundPlayer.MAIN_BUNDLE, (error) => {
			if (error) {
				ToastAndroid.show('Erro ao iniciar o som!!', ToastAndroid.SHORT)
			}
		})
	}

	onPressButtonPlayPause() {
		if (song !== null) {
			if (!this.state.play) {
				song.play()
				this.setState({ pause: false, play: true })
			} else {
				song.pause()
				this.setState({ pause: true, play: false })
			}
		}
	}

	onPressButtonStop() {
		if (song !== null && (this.state.play || this.state.pause)) {
			if (this.state.pause) {
				song.play()
			}
			song.stop()
			this.setState({ play: false })
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this.onPressButtonPlayPause.bind(this)}  >
					<Text style={styles.buttonText}>{!this.state.play ? 'Play' : 'Pause'}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.onPressButtonStop.bind(this)}   >
					<Text style={styles.buttonText}>Stop</Text>
				</TouchableOpacity>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F5FCFF',
	},
	buttonText: {
		fontSize: 30,
		color: 'black'
	},
})