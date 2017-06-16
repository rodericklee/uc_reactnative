import { Dimensions, StyleSheet } from 'react-native';
import { Fonts } from "../../../constants";
export default StyleSheet.create({
    container: {
        flex: 1,
        width: (Dimensions.get('window').width - 10) / 3,
        paddingLeft: 5,
        paddingRight: 5,
    },
    img_container: {
        flex: 1,
        height: 170,
        resizeMode: 'cover',
        borderColor: '#666',
        borderWidth: 1,
    },
    title: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        fontFamily: Fonts.body,
        marginTop: 10,
        backgroundColor: 'transparent',
    },
    upload_title: {
        fontSize: 15,
        color: 'white',
        fontFamily: Fonts.body,
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 10,
        top: 10,
    },
});
//# sourceMappingURL=styles.js.map