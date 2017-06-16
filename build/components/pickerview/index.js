'use strict';
import * as React from 'react';
import { Component } from "react";
import { TouchableOpacity, Text, View, ListView, Alert } from 'react-native';
import styles from './styles';
import { CommonHeading } from "../heading";
export class PickerView extends Component {
    constructor(props, context) {
        super(props, context);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
    }
    componentDidMount() {
        let dataList = this.props.data;
        this.setState({ dataSource: this.state.dataSource.cloneWithRows(dataList) });
    }
    selectData(val, index) {
        if (typeof this.props.onValueSelected === 'function') {
            this.props.onValueSelected(val, index);
            this.props.app.goBack();
        }
        else {
            Alert.alert('Error', 'Please contact support for help with pickerview.');
        }
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(CommonHeading, { title: "Pick Item", onBack: () => this.props.app.goBack() }),
            React.createElement(ListView, { style: styles.listView, showsVerticalScrollIndicator: false, enableEmptySections: true, dataSource: this.state.dataSource, renderRow: (rowData, sectionID, rowID) => React.createElement(TouchableOpacity, { style: { flex: 1 }, onPress: () => this.selectData(rowData.toString(), rowID) },
                    React.createElement(Text, { style: styles.description }, rowData)) })));
    }
}
//# sourceMappingURL=index.js.map