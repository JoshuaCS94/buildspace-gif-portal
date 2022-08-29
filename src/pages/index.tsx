import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'

import usePhantom from '../hooks/usePhantom'
import twitterImg from '../../public/twitter-logo.svg'

const TWITTER_HANDLE = '_buildspace'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

const Home: NextPage = () => {
  const phantom = usePhantom()

  const [address, setAddress] = useState<string | null>(null)

  const handleConnect = () => {
    if (address) phantom?.disconnect()
    else phantom?.connect()
  }

  useEffect(() => {
    phantom?.on('connect', pk => setAddress(pk.toString()))
    phantom?.on('disconnect', () => setAddress(null))
  }, [phantom])

  return (
    <div className='h-screen bg-gray-800 text-center'>
      <div className='relative flex h-full flex-col justify-center px-8 text-white'>
        <div className='flex flex-col p-8'>
          <p className='text-5xl font-bold'>🖼 GIF Portal</p>
          <p className='my-8 text-2xl'>View your GIF collection in the metaverse ✨</p>
        </div>
        <div>
          {phantom ? (
            <button onClick={handleConnect} className='btn btn-primary'>
              {address ? 'Disconnect' : 'Connect'} wallet
            </button>
          ) : (
            <p>
              Install Phantom wallet from&nbsp;
              <a href='https://phantom.app/download' className='link link-primary'>
                here
              </a>
            </p>
          )}
          {address && <p className='mt-4'>Address: {`${address}`}</p>}
        </div>
        <div className='absolute bottom-0 left-0 flex w-full items-center justify-center pb-8'>
          <Image alt='Twitter Logo' width={35} height={35} src={twitterImg} />
          <a className='font-bold' href={TWITTER_LINK} target='_blank' rel='noreferrer'>
            {`built on @${TWITTER_HANDLE}`}
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
