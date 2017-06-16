import * as React from 'react';
import { View, Image, Text, findNodeHandle, TouchableOpacity, Alert, } from 'react-native';
import styles from '../guide/styles';
import { GlobalStyles } from '../../constants';
import { BlurView } from 'react-native-blur';
import { isEmpty } from "../../utility";
import { SessionApi } from "../../api";
var PushNotification = require('react-native-push-notification');
export class GuideDealAlerts extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            viewRef: null,
        };
    }
    componentDidMount() {
    }
    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }
    appToken() { return this.props.app.state.pushToken || ''; }
    gotToken() {
        if (!this.props.app) {
            Alert.alert('Error', 'Please contact support@undergroundcellar.com with this message: this.props.app is null');
            return;
        }
        if (isEmpty(this.appToken())) {
            Alert.alert('Setting needed', 'Please open your device Settings and enable Push Notifications for this app.');
            return;
        }
        //then call api to bind it to the user
        const api = new SessionApi();
        api.sessionHandleEnrollApplePush({
            sessionId: this.props.app.getCurrentUserId(),
            model: {
                deviceToken: this.appToken(),
                entryPoint: 'RnHome'
            }
        }).then(result => {
            this.props.app.getCurrentUser().then(user => PushNotification.localNotification({
                title: `Woohoo ${user.sessionUserFname || ''}!`,
                message: "You've signed up for Underground Cellar DEAL ALERTS.  You'll be among the first to know " +
                    "about our most exciting wine deals before anyone else.",
                playSound: false,
                soundName: 'default',
                number: '1',
            }));
        }, err => {
            console.log(err);
            Alert.alert("Error", "Failed to enroll user for push notifications");
        });
    }
    getAlerts() {
        let tokenCallback = (token) => {
            this.setState({ deviceToken: token }, () => this.gotToken());
        };
        PushNotification.configure({
            onRegister: function (token) {
                tokenCallback(token);
            },
            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
            },
            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: "YOUR GCM SENDER ID",
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true,
        });
        this.props.app.setState({ showDealAlertsOverlay: false });
    }
    skip() {
        this.props.app.setState({ showDealAlertsOverlay: false });
    }
    or() {
        return React.createElement(View, { style: styles.orContainer },
            React.createElement(Text, { style: styles.normalLabel }, "OR"));
    }
    choice(text, callback) {
        return React.createElement(TouchableOpacity, { style: GlobalStyles.redButton, onPress: callback.bind(this) },
            React.createElement(Text, { style: styles.normalLabel }, text));
    }
    render() {
        return (React.createElement(View, { style: GlobalStyles.absolute },
            React.createElement(Image, { ref: (img) => {
                    this.backgroundImage = img;
                }, source: require('../../../img/nav_gradient.jpg'), style: GlobalStyles.absolute, onLoadEnd: this.imageLoaded.bind(this) }),
            !!this.state.viewRef && React.createElement(BlurView, { style: GlobalStyles.absolute, viewRef: this.state.viewRef, blurType: "dark", blurAmount: 5 }),
            React.createElement(View, { style: { flex: 1, alignItems: 'center', paddingTop: 72 } },
                React.createElement(Text, { style: styles.largeLabel }, "GET DEAL ALERTS"),
                React.createElement(View, { style: styles.descriptionContainer },
                    React.createElement(Text, { style: styles.headerLabel }, "You can unsubscribe at any time.")),
                this.choice('Get Alerts', this.getAlerts.bind(this)),
                this.or(),
                this.choice('Skip', this.skip.bind(this)))));
    }
}
//# sourceMappingURL=dealAlerts.js.map