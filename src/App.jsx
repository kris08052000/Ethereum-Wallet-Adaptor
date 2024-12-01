import { useState } from 'react'
import './App.css'
import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './cofig'
import {  useConnect } from 'wagmi'
import { useAccount, useBalance, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'


const queryClient = new QueryClient()

function App() {
 
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider  client={queryClient}>
        <WalletConnector/>
        <Ethsend/>
      </QueryClientProvider>
    </WagmiProvider>
  )


}


function MyAddress(){

  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const balance = useBalance({
    address
  })

  return (
    <div>
      {address && <div>
        Your address - {address}
        Your balance - {balance.data?.formatted}
      </div>}
      
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>)
}

function WalletConnector(){

  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

function Ethsend(){

  const {data: hash, sendTransaction } = useSendTransaction()

  function sendEth(){
    sendTransaction({
      to : document.getElementById("address").value,
      value:"100000000000000000"  // 17 0s = 0.1 eth
    })
  }

  return (
    <>
     <div>
        <input id='address' type="text"></input>
        <button onClick={sendEth}>Send</button>
      </div>
    </>
  )
}


export default App
