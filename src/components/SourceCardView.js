import React, {Component} from 'react';
import {Switch, Text, TouchableNativeFeedback, View} from "react-native";
import {Card} from "./Card";

class SourceCardView extends Component {

	render() {
		return (
			<Card>
				<TouchableNativeFeedback
					onPress={this.props.onPress}
					background={TouchableNativeFeedback.SelectableBackground()}
					>
					<View style={[this.props.style]}>
						<Text style={styles.sourceNameStyle}>
							{this.props.title}
						</Text>
						<Text style={styles.sourceDescStyle}>
							{this.props.desc}
						</Text>
					</View>
				</TouchableNativeFeedback>
			</Card>
		);
	}

}

const styles = {
	sourceNameStyle: {
		fontSize: 20,
		color: '#000',
		fontWeight: 'bold',
		margin: 10,
	},
	sourceDescStyle: {
		fontSize: 15,
		color: '#333',
		marginTop: 4,
		margin: 10
	},
};

export default SourceCardView;