import { useIsClient } from 'usehooks-ts'

const usePhantom = () => {
  return useIsClient() && window.phantom ? window.phantom.solana : null
}

export default usePhantom
