import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'

import GifGrid from '../components/GifGrid'
import usePhantom from '../hooks/usePhantom'
import twitterImg from '../../public/twitter-logo.svg'

const TWITTER_HANDLE = '_buildspace'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

const TEST_DATA = [
  'https://media.giphy.com/media/xUPGcC4A6ElcqtUJck/giphy.gif',
  'https://media.giphy.com/media/3s0ddui7kadGg/giphy.gif',
  'https://media.giphy.com/media/3ygMHiJKa1GVzYodCv/giphy.gif',
  'https://media.giphy.com/media/3pTtbLJ7Jd0YM/giphy.gif',
  'https://media.giphy.com/media/YWB6Hi29vA3jG/giphy.gif',
]

const Home: NextPage = () => {
  const phantom = usePhantom()

  const [address, setAddress] = useState<string | null>(null)
  const [gifs, setGifs] = useState(TEST_DATA)
  const [newGif, setNewGif] = useState('')

  const handleConnect = () => {
    if (address) phantom?.disconnect()
    else phantom?.connect()
  }

  const handleAddGif = () => {
    if (newGif) {
      setGifs(gifs => gifs.concat(newGif))
      setNewGif('')
    }
  }

  useEffect(() => {
    phantom?.on('connect', pk => setAddress(pk.toString()))
    phantom?.on('disconnect', () => setAddress(null))
    phantom?.connect({ onlyIfTrusted: true })
  }, [phantom])

  return (
    <div className='flex min-h-screen flex-col bg-gray-800 text-center'>
      <div className='flex grow flex-col items-center justify-center px-8 text-white'>
        <div className='mt-24 flex flex-col'>
          <p className='text-5xl font-bold'>🖼 GIF Portal</p>
          <p className='my-4 text-2xl'>View your GIF collection in the metaverse ✨</p>
        </div>
        <div className='mb-8 flex items-center gap-2'>
          <input
            type='text'
            value={newGif}
            placeholder='Type URL here...'
            onChange={e => setNewGif(e.target.value)}
            className='input input-bordered w-96 text-gray-800'
          />
          <button onClick={handleAddGif} className='btn btn-primary'>
            Add GIF
          </button>
        </div>
        <div className='flex grow flex-col items-center'>
          {phantom ? (
            address ? (
              <GifGrid gifs={gifs} />
            ) : (
              <button onClick={handleConnect} className='btn btn-primary'>
                Connect wallet
              </button>
            )
          ) : (
            <p>
              Install Phantom wallet from&nbsp;
              <a href='https://phantom.app/download' className='link link-primary'>
                here
              </a>
            </p>
          )}
        </div>
        <div className='flex w-full items-center justify-center py-8'>
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
