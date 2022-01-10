import React from 'react'
import {Switch, Route } from 'react-router-dom';
import Login from "./Auth/Login"
import Signup from "./Auth/Signup"
import Stake from "./Staking/Stake"
import Trade from "./Trading/Trade"
import Swap from "./InternalSwap/Swap"
import Boot from "./Boot/Boot"
import Ptop from "./Ptop/Ptop"
import Seller from "./Seller/Seller"
import Referral from "./Referral/Referral"
import Buyer from "./Buyer/Buyer"
import Wallet from "./Wallet/Wallet"
import Stakewithdrawal from './Staking/Stakewithdrawal'
import Verifymobile from './Auth/Verifymobile'
import Profile from "./Profile/Profile"
import SellerReview from "./Seller/SellerReview"
const App = () =>{
  return (
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/sellerreview" component={SellerReview}/>
        <Route exact path="/verifymobile" component={Verifymobile}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/signup/:referralid" component={Signup}/>
        <Route exact path="/stakes" component={Stake}/>
        <Route exact path="/trades" component={Trade}/>
        <Route exact path="/swaps" component={Swap}/>
        <Route exact path="/boots" component={Boot}/>
        <Route exact path="/ptops" component={Ptop}/>
        <Route exact path="/wallets" component={Wallet}/>
        <Route exact path="/referrals" component={Referral}/>
        <Route exact path="/seller/:id" component={Seller}/>
        <Route exact path="/stakewithdrawal/:id" component={Stakewithdrawal}/>
        <Route exact path="/buyer" component={Buyer}/>
      </Switch>
  )
}

export default App
