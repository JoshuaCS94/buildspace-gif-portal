import Image from 'next/image'

export type GifsGridProps = {
  gifs: string[]
}

const GifGrid = ({ gifs }: GifsGridProps) => {
  return (
    <div className='grid grid-cols-5 gap-4'>
      {gifs.map(g => (
        <div key={g}>
          <Image src={g} alt={g} width={192} height={128} className='overflow-hidden rounded-lg' />
        </div>
      ))}
    </div>
  )
}

export default GifGrid
