import * as React from "react"
import { inject, observer } from "mobx-react"
import { NavigationStackScreenProps } from "react-navigation-stack"
import styled from "styled-components/native"

import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { WalletConnectSessionRequestView } from "../../components/wallet-connect-session-request-view"

import { WalletConnectStore } from "../../models/wallet-connect-store"

import { color } from "../../theme"

const RootView = styled(Screen)`
  flex: 1;
  background-color: ${({ theme }) => theme.color.background.feature.primary};
`

const HeaderText = styled(Text)`
  color: ${({ theme }) => theme.color.text.feature.highlight.primary};
  font-size: ${({ theme }) => theme.text.size.lg};
  font-weight: 500;
  text-align: center;
`

export interface WalletConnectRequestScreenProps extends NavigationStackScreenProps<{
  peerId: string,
  peerMeta: any;
  payload: any;
}> {
  walletConnectStore: WalletConnectStore
}

@inject("walletConnectStore")
@observer
export class WalletConnectRequestScreen extends React.Component<WalletConnectRequestScreenProps, {}> {
  get payload() {
    return this.props.navigation.getParam("payload")
  }

  get peerMeta() {
    return this.props.navigation.getParam("peerMeta")
  }

  get requestor() {
    const peerId = this.props.navigation.getParam("peerId")
    return this.props.walletConnectStore.getClient(peerId)
  }

  private approveRequest = async () => {
    this.requestor.approveRequest(this.payload)
    this.close()
  }

  private rejectRequest = async () => {
    this.requestor.rejectRequest(this.payload)
    this.close()
  }

  private close = () => {
    this.props.navigation.goBack()
  }

  private renderRequestView() {
    if (!this.payload) {
      return null
    }

    return (
      <WalletConnectSessionRequestView
        payload={this.payload}
        peerMeta={this.peerMeta}
        onApprove={this.approveRequest}
        onReject={this.rejectRequest}
      />
    )
  }

  render () {
    return (
      <RootView
        backgroundColor={color.palette.likeGreen}
        preset="scroll"
      >
        <HeaderText tx="walletConnectRequestScreen_title" />
        {this.renderRequestView()}
      </RootView>
    )
  }
}
