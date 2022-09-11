import Image from 'next/image'

export type GifsGridProps = {
  gifs: string[]
}

const GifGrid = ({ gifs }: GifsGridProps) => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {gifs.map(g => (
        <div key={g}>
          <Image src={g} alt={g} width={256} height={256} className='overflow-hidden rounded-lg' />
        </div>
      ))}
    </div>
  )
}

export default GifGrid
