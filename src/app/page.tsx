"use client"

import { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { homes } from '@/lib/homes'
import Link from 'next/link'
import DynamicTable from '@/components/table-dynamic'

export default function SlotMachine() {
  const [spinning, setSpinning] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showHomesPopup, setShowHomesPopup] = useState(false) // Estado para o Dialog do ícone
  const [searchTerm, setSearchTerm] = useState("") // Adiciona o estado para o termo de pesquisa
  const [selectedHouse, setSelectedHouse] = useState<typeof homes[0] | null>(null)
  const [leverPulled, setLeverPulled] = useState(false) // Estado para controlar a animação da alavanca
  const slotRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]

  const itemHeight = 105;  // Altura de cada imagem
  const itemSpacing = 16;  // Espaçamento entre os itens
  const startTop = -73;  // Posição inicial (acima da área visível)
  const centerPosition = 45; // Centralizar a imagem no meio da área visível

  const spinSlot = (slotIndex: number, stopId: number, callback: () => void) => {
    const slot = slotRefs[slotIndex].current
    if (!slot) return

    let currentPosition = 0
    let laps = 0
    const totalLaps = 2 // Mínimo de voltas completas
    let running = true

    const step = () => {
      if (!running) return

      currentPosition += (itemHeight + itemSpacing) * 0.1  // Controla a velocidade da rotação

      if (currentPosition > (itemHeight + itemSpacing) * homes.length) {
        currentPosition = currentPosition % ((itemHeight + itemSpacing) * homes.length)
        laps++
      }

      slot.style.transform = `translateY(-${currentPosition}px)`

      const targetPos = homes.findIndex(image => image.id === stopId) * (itemHeight + itemSpacing)

      if (laps >= totalLaps && currentPosition >= targetPos && currentPosition <= targetPos + (itemHeight + itemSpacing)) {
        running = false
        const finalTop = centerPosition
        slot.style.transform = `translateY(-${targetPos}px)`
        slot.style.top = `${finalTop}px`
        callback()
        return
      }

      requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }

  const spin = () => {
    // Iniciar a animação da alavanca antes de começar a rotação dos slots
    setLeverPulled(true) // Ativa a animação da alavanca
    setTimeout(() => {
      setSpinning(true)
      setLeverPulled(false) // Volta o estado da alavanca ao normal

      const winningIndex = Math.floor(Math.random() * homes.length)
      const selectedId = homes[winningIndex].id
      setSelectedHouse(homes[winningIndex])

      slotRefs.forEach((_, index) => {
        spinSlot(index, selectedId, () => {
          if (index === 2) {
            setTimeout(() => {
              setSpinning(false)
              setShowPopup(true)
            }, 3000)
          }
        })
      })

      setTimeout(() => {
        spinSlot(0, selectedId, () => { })
      }, 0)
      setTimeout(() => {
        spinSlot(1, selectedId, () => { })
      }, 1000)
      setTimeout(() => {
        spinSlot(2, selectedId, () => { })
      }, 2000)
    }, 1000) // Adiciona um delay de 1 segundo para a animação da alavanca
  }

  // Filtra as casas de acordo com o termo de pesquisa
  const filteredHomes = homes.filter((home) =>
    home.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col items-center justify-center w-full h-[1150px] overflow-hidden py-5">
      <div className='w-full min-w-[435px] max-w-[435px] md:w-[510px] md:max-w-[510px] h-full relative  bg-fundo bg-contain shadow-2xl shadow-black rounded-xl '>
        <Image
          width={72}
          height={72}
          alt='Baú'
          src='/images/gifs/custom-menu-icon.gif'
          className='rounded-full absolute top-3 left-6 md:left-5 z-40 cursor-pointer'
          onClick={() => setShowHomesPopup(true)}
        />

        <div className='h-[270px] w-full relative z-20'>
          <div className='rounded-full bg-no-repeat shadow-2xl w-[140px] h-[140px] left-[36%] bg-logo-fp bg-contain absolute z-30 top-[20%]' />
        </div>

        <div className='flex bg-image-machine w-full h-[562px] bg-no-repeat bg-top bg-cover relative flex-nowrap px-[60px] md:px-[66px] items-center'>
          <div className="rounded-2xl h-[148px] md:h-[168.3px] overflow-hidden flex flex-nowrap justify-center items-center bg-green-700 absolute w-[312px] md:w-[355px] left-[61px] md:left-[79px] top-[248px] md:top-[292px]">
            <div className="absolute w-full h-10 inset-0 top-0 bg-gradient-to-t from-transparent to-black/30 pointer-events-none z-20" />
            <div className="absolute w-full h-10 bottom-0 right-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none z-20" />

            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center h-[200px] w-[160px] overflow-hidden relative"
              >
                <div ref={slotRefs[index]} className="flex flex-col space-y-4 absolute" style={{ top: `${startTop}px` }}>
                  {homes.concat(homes).map((image, i) => (
                    <div className="w-[97px] h-[105px] bg-white p-2 rounded-xl" key={i}>
                      <Link href={image.link} target='_blank'>
                        <Image
                          width={320}
                          height={320}
                          quality={100}
                          priority
                          src={image.src}
                          alt={image.name}
                          className="w-full h-full object-fill rounded-md"
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>

          {/* Alavanca ao lado do botão */}
          <Image
            src="/images/icons/icon-lever.png"
            alt="Alavanca"
            width={220}
            height={400}
            className={`absolute w-10 right-[17%] md:right-[18%] bottom-[115px] md:bottom-[40px] transform transition-transform z-50 cursor-pointer ${leverPulled ? 'translate-y-[14px] md:translate-y-[16px] translate-x-[6px] md:translate-x-[8px]' : ''}`} // Animação de puxar a alavanca
            onClick={spin} // Ao clicar na alavanca, ativa a função de spin
          />

          <Button
            onClick={spin}
            disabled={spinning}
            className="w-[194px] h-[70px] md:w-[224px] md:h-[81px] left-[28%] md:left-[28%] bottom-[91px] md:bottom-[11px] absolute hover:bg-transparent bg-transparent shadow-none"
          >
            <Image
              width={320}
              height={320}
              quality={100}
              priority
              src="/images/icons/button.png"
              alt="Button spin"
              className={`w-full h-full object-fill transition-all opacity-95 ${spinning ? "brightness-100" : "brightness-110 animate-pulse"}`}
            />
          </Button>
        </div>
        <DynamicTable />
      </div>

      <Dialog open={showHomesPopup} onOpenChange={setShowHomesPopup}>
        <DialogContent className="max-w-[90%] rounded-xl sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pesquisar Plataformas</DialogTitle>
            <input
              type="text"
              placeholder="encontrar"
              className="w-full p-2 rounded-md border border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
            />
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {filteredHomes.map((home) => (
              <div key={home.id} className="flex flex-col items-center justify-center">
                <Link href={home.link} target='_blank'>
                  <Image
                    width={70}
                    height={70}
                    src={home.src}
                    alt={home.name}
                    className="w-[70px] h-[70px] object-cover rounded-full"
                  />
                  <p className="text-xs text-center mt-2">{home.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="max-w-[90%] rounded-xl sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedHouse?.name}</DialogTitle>
            <DialogDescription>{selectedHouse?.info}</DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col items-center">
            <Image
              width={800}
              height={800}
              priority
              quality={100}
              src={selectedHouse?.src || '/placeholder.svg'}
              alt={selectedHouse?.name || 'Placeholder'}
              className="w-48 h-48 object-cover rounded-lg mb-4"
            />
            <Button
              onClick={() => window.open(selectedHouse?.link, '_blank')}
              className="w-full bg-green-700 hover:bg-green-600"
            >
              Visitar Site
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
