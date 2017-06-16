var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { View, Image, Text, TouchableOpacity, StatusBar, } from 'react-native';
import styles from './styles';
import ViewPager from 'react-native-viewpager';
import { GuideSignUp } from './guide_signup';
const MyStatusBar = (_a) => {
    var { backgroundColor } = _a, props = __rest(_a, ["backgroundColor"]);
    return (React.createElement(View, { style: [styles.statusBar, { backgroundColor }] },
        React.createElement(StatusBar, Object.assign({ backgroundColor: backgroundColor }, props))));
};
export class Guide extends React.Component {
    constructor(props, context) {
        super(props);
        const dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        let data = [
            (React.createElement(View, { style: styles.guide_container },
                React.createElement(Image, { source: require('../../../img/guide1.png'), style: styles.guide_image }),
                React.createElement(Text, { style: styles.guide_title }, "DISCOVER"),
                React.createElement(Text, { style: styles.guide_detail }, 'Discover amazing wines from some of the \n world`s best wineries. \n\n Our wine experts ' +
                    'select high-quality, premium,\n & limited-edition wines. \n\n Engage with our community ' +
                    'of wine lovers and \n learn the secrets of your favorite wines.'))),
            (React.createElement(View, { style: styles.guide_container },
                React.createElement(Image, { source: require('../../../img/guide2.png'), style: styles.guide_image }),
                React.createElement(Text, { style: styles.guide_title }, "BUY"),
                React.createElement(Text, { style: styles.guide_detail }, 'Every bottle you buy could be upgraded for free \n to a high-priced bottle. \n\n Random ' +
                    'upgrades include large-format, rare-\n vintage, and autographed bottle. \n\n Over half of ' +
                    'your bottles can be randomly \n upgraded-find out at checkout!'))),
            (React.createElement(View, { style: styles.guide_container },
                React.createElement(Image, { source: require('../../../img/guide3.png'), style: styles.guide_image }),
                React.createElement(Text, { style: styles.guide_title }, "COLLECT"),
                React.createElement(Text, { style: styles.guide_detail }, 'Collect & store your bottles for free in your \n \"CloudCellar\", and ship them anytime. ' +
                    '\n\n We take care of maintaining ideal temperature, \n humidity, and keeping your bottles ' +
                    'safe. \n\n Never worry about shipping fees: free shipping \n on 12+ bottles, and just $5 ' +
                    'to ship 6 bottles.')))
        ];
        if (!props.guideApp.isLoggedIn()) {
            data.push(React.createElement(View, { style: styles.guide_container },
                React.createElement(GuideSignUp, { gsApp: this.props.guideApp })));
        }
        this.state = {
            dataSource: dataSource.cloneWithPages(data)
        };
    }
    showHome() {
        if (this.props.guideApp) {
            this.props.guideApp.goHome();
        }
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(MyStatusBar, { backgroundColor: "#5E8D48", barStyle: "light-content" }),
            React.createElement(Image, { style: styles.background, source: require('../../../img/gradient.jpg') }),
            React.createElement(ViewPager, { style: styles.viewPager, dataSource: this.state.dataSource, renderPage: this._renderPage.bind(this), isLoop: false, autoPlay: false }),
            this.props.guideApp.isLoggedIn() && React.createElement(TouchableOpacity, { style: styles.btnCloseContainer, onPress: this.showHome.bind(this) },
                React.createElement(Image, { style: styles.btnImg, source: require('../../../img/close.png') }))));
    }
    _renderPage(data, pageID) {
        return data;
    }
}
//# sourceMappingURL=index.js.map