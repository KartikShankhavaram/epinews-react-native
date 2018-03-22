import React, {Component} from'react';
import {ImageBackground, Text, TouchableNativeFeedback, View} from 'react-native';
import {Card} from "./Card";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";

export default class NewsCardView extends Component {

	renderBody() {
		if(this.props.imgSrc === null) {
			return(
				<Card style={{height: 200, elevation: 0}}>
					<ImageBackground
						source={require('../../assets/placeholder-missing-image.png')}
						style={[{flexGrow: 1, height: null, width: null, flex: 1,}, this.props.imageStyle]}
					>
						<TouchableNativeFeedback
							onPress={this.props.onPress}
							background={TouchableNativeFeedback.SelectableBackground()}
						>
							<LinearGradient colors={['transparent', 'grey']} style={{flex: 1}}>
								<View style={styles.containerStyle}>
									<Text style={styles.titleStyle}>
										{this.props.title}
									</Text>
									<Text style={styles.authorStyle}>
										{this.props.author}
									</Text>
								</View>
							</LinearGradient>
						</TouchableNativeFeedback>
					</ImageBackground>
				</Card>
			);
		} else {
			return(
				<Card style={{height: 200, elevation: 0}}>
					<FastImage
						source={{uri: this.props.imgSrc}}
						style={[{flexGrow: 1, height: null, width: null, flex: 1,}, this.props.imageStyle]}
					>
						<TouchableNativeFeedback
							onPress={this.props.onPress}
							background={TouchableNativeFeedback.SelectableBackground()}
						>
							<LinearGradient colors={['transparent', 'grey']} style={{flex: 1}}>
								<View style={styles.containerStyle}>
									<Text style={styles.titleStyle}>
										{this.props.title}
									</Text>
									<Text style={styles.authorStyle}>
										{this.props.author}
									</Text>
								</View>
							</LinearGradient>
						</TouchableNativeFeedback>
					</FastImage>
				</Card>
			);
		}
	}

	render() {
		return(
			<View>
				{this.renderBody()}
			</View>
		);
	}
}

const styles = {
	titleStyle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'left',
	},
	authorStyle: {
		fontSize: 15,
		color: "white",
		paddingBottom: 10,
		textAlign: 'left',
	},
	containerStyle: {
		justifyContent: 'flex-end',
		flex: 1,
		alignItems: 'flex-start',
		padding: 10
	}
};