import React from 'react';
import { View, Text, ListView, } from 'react-native';
import styles from './styles';
import { SectionHeader } from './sectionheader';
import { OfferAvatar } from './offeravatar';
import { AboutWine } from './aboutwine';
import { OfferDetail } from './offerdetail';
export class Offer extends React.Component {
    constructor(props, context) {
        super(props, context);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
            dataSource: ds.cloneWithRowsAndSections({}, [], []),
            offer: {},
        };
    }
    componentDidMount() {
        let offer = this.props.offer;
        const { dataBlob, sectionIds, rowIds } = this.formatData(offer);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
            offer: offer
        });
    }
    formatData(data) {
        const dataBlob = {};
        const sectionIds = [];
        const rowIds = [];
        for (let i = 0; i < 3; i++) {
            let sectionID = `${i}`;
            sectionIds.push(sectionID);
            rowIds[sectionID] = [];
            dataBlob[sectionID] = data;
            if (i === 0) {
                dataBlob[sectionID] = false;
            }
            else if (i === 1) {
                dataBlob[sectionID] = "About the Winery";
            }
            else {
                dataBlob[sectionID] = "About the Offer";
            }
            for (let j = 0; j < 1; j++) {
                const rowId = `${i}:${j}`;
                rowIds[sectionID].push(rowId);
                dataBlob[rowId] = data;
            }
        }
        return { dataBlob, sectionIds, rowIds };
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(ListView, { style: styles.listView, enableEmptySections: true, dataSource: this.state.dataSource, renderRow: (rowData, sectionID) => {
                    switch (parseInt(sectionID.toString())) {
                        case 0:
                            return React.createElement(View, null,
                                React.createElement(OfferAvatar, { data: this.state.offer }));
                        case 1:
                            return React.createElement(View, null,
                                React.createElement(AboutWine, { data: this.state.offer }));
                        case 2:
                            return React.createElement(View, null,
                                React.createElement(OfferDetail, { data: this.state.offer }));
                        default:
                            return React.createElement(Text, null, "Unknown sectionID");
                    }
                }, renderSectionHeader: (sectionData) => sectionData && React.createElement(SectionHeader, { data: sectionData }) || null })));
    }
}
//# sourceMappingURL=index.js.map