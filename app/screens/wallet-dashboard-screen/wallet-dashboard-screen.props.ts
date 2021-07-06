import { NavigationTabScreenProps } from "react-navigation-tabs"

import { ChainStore } from "../../models/chain-store"
import { UserStore } from "../../models/user-store"

export interface WalletDashboardScreenProps extends NavigationTabScreenProps {
  chain: ChainStore
  userStore: UserStore
}
