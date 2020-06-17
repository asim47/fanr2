import React from 'react';

import { View, Text, Linking,TouchableOpacity } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from "react-native-vector-icons/FontAwesome";
import Axios from 'axios';
import { api } from './Api';
class App extends React.PureComponent {
    componentDidMount() {
    }
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        Axios.post(api+"/cms/rest/document/viewDocument", { "sessionKey": this.props.SKey, "taskId": this.props.isd }).then((res) => {
            // console.log("dsgvdsvbdsx", res.data);
            Linking.canOpenURL(`${res.data.session}`).then(supported => {

                if (supported) {
                    Linking.openURL(`${res.data.session}`)
                }
                else {
                    alert('File not supported…');
                }
            })

        })
        this._menu.hide();

    };

    showMenu = () => {
        this._menu.show();
    };

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Menu
                    ref={this.setMenuRef}
                    button={<TouchableOpacity onPress={this.showMenu} style={{ paddingTop: -20,paddingRight:10 }}>
                         <Icon name="ellipsis-v" color="gray" style={{
                        fontSize: 20,
                        width: 20,
                        textAlign: "right",
                        zIndex: 999,
                        paddingLeft: 10
                    }} /></TouchableOpacity>}
                >
                    <MenuItem onPress={this.hideMenu}>View</MenuItem>
                </Menu>
            </View>
        );
    }
}

export default App;