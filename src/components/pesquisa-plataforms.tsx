import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Home {
  id: number
  name: string
  link: string
  src: string
}

interface PesquisaPlataformasProps {
  homes: Home[]
  showHomesPopup: boolean
  setShowHomesPopup: (show: boolean) => void
}

export default function PesquisaPlataformas({ homes, showHomesPopup, setShowHomesPopup }: PesquisaPlataformasProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredHomes = useMemo(() => {
    return homes
      .filter((home) =>
        home.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => b.id - a.id) // Sort by id in descending order
  }, [homes, searchTerm])

  return (
    <Dialog open={showHomesPopup} onOpenChange={setShowHomesPopup}>
      <DialogContent className="max-w-[90%] rounded-xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pesquisar Plataformas</DialogTitle>
          <input
            type="text"
            placeholder="Buscar Plataformas"
            className="w-full p-2 rounded-md border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 mt-4 max-h-[60svh] overflow-y-scroll">
          {filteredHomes.map((home) => (
            <div key={home.id} className="flex flex-col items-center justify-center">
              <Link href={home.link} target='_blank'>
                <Image
                  width={100}
                  height={100}
                  quality={100}
                  priority
                  src={home.src}
                  alt={home.name}
                  className="w-[70px] h-[70px] object-fill rounded-full"
                />
                <p className="text-xs text-center mt-2 font-bold">{home.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
