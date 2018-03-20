import React, {Component} from 'react';
import {View, Text} from 'react-native';

class SelectedSourceView extends Component {

	render() {
		return(
			<View style={styles.containerStyle}>
				<Text style={styles.textStyle}>
					{this.props.selectedSources}
				</Text>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		backgroundColor: 'blue',
		justifyContent: 'flex-start',
	},
	textStyle: {
		color: 'white',
		fontSize: 20,
		marginStart: 10,
	}
};

export default SelectedSourceView;