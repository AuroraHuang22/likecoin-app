import { observer, inject } from "mobx-react"
import * as React from "react"
import { NavigationScreenProps, SafeAreaView } from "react-navigation"
import {
  Clipboard,
  Linking,
  Share,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import QRCode from 'react-native-qrcode-svg'

import { RootStore } from "../../models/root-store"
import { Wallet } from "../../models/wallet"

import { Button } from "../../components/button"
import { Screen } from "../../components/screen"
import { Sheet } from "../../components/sheet"
import { Text } from "../../components/text"

import { color, spacing } from "../../theme"

export interface ReceiveScreenProps extends NavigationScreenProps<{}> {
  wallet: Wallet,
}
const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.primary,
}
const SCREEN: ViewStyle = {
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
}
const HEADER_BAR: ViewStyle = {
  alignItems: "flex-end",
  width: "100%",
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[1],
}
const INNER: ViewStyle = {
  alignItems: "stretch",
  padding: spacing[4],
}
const SHEET: ViewStyle = {
  alignItems: "center",
  maxWidth: 208,
  marginVertical: spacing[5],
  padding: spacing[5],
  paddingBottom: spacing[0],
  backgroundColor: color.palette.white,
}
const COPY_BUTTON: TextStyle = {
  marginTop: spacing[3],
  textAlign: "center",
}
const ADDRESS: TextStyle = {
  marginTop: spacing[4],
}
const BOTTOM_BAR: ViewStyle = {
  alignItems: "center",
  width: "100%",
  padding: spacing[3],
  backgroundColor: color.palette.white,
}

@inject((rootStore: RootStore) => ({
  wallet: rootStore.chainStore.wallet,
}))
@observer
export class ReceiveScreen extends React.Component<ReceiveScreenProps, {}> {
  state = {
    isCopied: false
  }

  private onPressShareButton = () => {
    const { address: message } = this.props.wallet
    Share.share({ message })
  }

  private onPressCopyButton = () => {
    const { address: message } = this.props.wallet
    Clipboard.setString(message)
    this.setState({ isCopied: true })
  }

  private onPressCloseButton = () => {
    this.props.navigation.goBack()
  }

  private onPressViewExternalButton = () => {
    Linking.openURL(this.props.wallet.blockExplorerURL)
  }

  render () {
    const { address } = this.props.wallet

    const copyButtonTx = this.state.isCopied ? "common.copied" : "common.copy"

    return (
      <View style={ROOT}>
        <SafeAreaView style={HEADER_BAR}>
          <Button
            preset="icon"
            icon="share"
            onPress={this.onPressShareButton}
          />
        </SafeAreaView>
        <Screen
          preset="fixed"
          backgroundColor={color.transparent}
          style={SCREEN}
        >
          <View style={INNER}>
            <Text
              color="likeCyan"
              size="medium"
              align="center"
              weight="bold"
              tx="receiveScreen.shareYourAddress"
            />
            <Sheet style={SHEET}>
              <QRCode
                value={address}
                size={160}
              />
              <Text style={ADDRESS} text={address} />
              <Button
                textStyle={COPY_BUTTON}
                preset="link"
                tx={copyButtonTx}
                onPress={this.onPressCopyButton}
              />
            </Sheet>
            <Button
              preset="outlined"
              tx="common.viewOnBlockExplorer"
              onPress={this.onPressViewExternalButton}
            />
          </View>
        </Screen>
        <SafeAreaView
          forceInset={{ top: "never", bottom: "always" }}
          style={BOTTOM_BAR}
        >
          <Button
            preset="icon"
            icon="close"
            color="likeGreen"
            onPress={this.onPressCloseButton}
          />
        </SafeAreaView>
      </View>
    )
  }
}
