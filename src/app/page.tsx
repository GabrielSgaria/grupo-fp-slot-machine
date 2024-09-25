"use client"

import { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { images } from '@/lib/homes'
import Link from 'next/link'

export default function SlotMachine() {
  const [spinning, setSpinning] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedHouse, setSelectedHouse] = useState<typeof images[0] | null>(null)
  const slotRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]

  const itemHeight = 105;  // Altura de cada imagem
  const itemSpacing = 16;  // Espaçamento entre os itens
  // const visibleAreaHeight = 161;  // Altura visível do slot (área com bg-white)
  const startTop = -73;  // Posição inicial (acima da área visível)
  const centerPosition = 45; // Centralizar a imagem no meio da área visível

  // Função para rodar cada slot e garantir que ele passe pelas imagens pelo menos 2x
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

      if (currentPosition > (itemHeight + itemSpacing) * images.length) {
        currentPosition = currentPosition % ((itemHeight + itemSpacing) * images.length)
        laps++
      }

      slot.style.transform = `translateY(-${currentPosition}px)`

      const targetPos = images.findIndex(image => image.id === stopId) * (itemHeight + itemSpacing)

      if (laps >= totalLaps && currentPosition >= targetPos && currentPosition <= targetPos + (itemHeight + itemSpacing)) {
        running = false
        // Centraliza o item sorteado no centro da área visível
        const finalTop = centerPosition;  // Centraliza a imagem sorteada no centro da área visível
        slot.style.transform = `translateY(-${targetPos}px)`;  // Posiciona a imagem sorteada
        slot.style.top = `${finalTop}px`;  // Ajusta o valor de top para centralização
        callback()
        return
      }

      requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }

  const spin = () => {
    setSpinning(true)

    // Sorteia o ID do item que será exibido
    const winningIndex = Math.floor(Math.random() * images.length)
    const selectedId = images[winningIndex].id
    setSelectedHouse(images[winningIndex])

    // Todos os slots começam a girar ao mesmo tempo
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
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-green-500 to-lime-500 md:p-4 w-full h-[1150px] overflow-hidden ">
      <div className='w-full min-w-[475px] max-w-[475px] md:w-[510px] md:max-w-[510px] h-[1150px] relative shadow-2xl shadow-black rounded-xl bg-fundo bg-contain'>
        <Image
          width={72}
          height={72}
          alt='Baú'
          src='/images/gifs/custom-menu-icon.gif'
          className='rounded-full absolute top-3 left-3 z-20'
        />
        <div className='h-[350px] w-full relative z-20'>
          <div className='rounded-full bg-no-repeat shadow-2xl w-[170px] h-[170px] left-[33%] bg-logo-fp bg-contain absolute z-30 top-[20%]' />
        </div>

        <div className='flex bg-image-machine w-full h-[459px] bg-no-repeat bg-top bg-cover relative flex-nowrap px-[60px] md:px-[66px] items-center'>
          <div className="rounded-2xl h-[161px] md:h-[168.3px] overflow-hidden flex flex-nowrap justify-center items-center bg-green-700 absolute w-[353px] md:w-[375px] top-[112px] md:top-[122px]">
            <div className="absolute w-full h-10 inset-0 top-0 bg-gradient-to-t from-transparent to-black/30 pointer-events-none z-20" />
            <div className="absolute w-full h-10 bottom-0 right-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none z-20" />

            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center h-[200px] w-[160px] overflow-hidden relative"
              >
                <div ref={slotRefs[index]} className="flex flex-col space-y-4 absolute" style={{ top: `${startTop}px` }}>
                  {images.concat(images).map((image, i) => (
                    <div className="w-[105px] h-[105px]  bg-white p-2 rounded-xl" key={i}>
                      <Link href={image.link} target='_blank'>
                        <Image
                          width={320}
                          height={320}
                          quality={100}
                          priority
                          src={image.src}
                          alt={image.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
          <Button
            onClick={spin}
            disabled={spinning}
            className="w-[200px] h-[60px] left-[29%] md:left-[30%] bg-yellow-500/20 hover:bg-yellow-500/50 text-black font-bold py-2 px-4 rounded absolute bottom-[110px] md:bottom-[90px]"
          >
            {spinning ? 'Girando...' : 'Girar!'}
          </Button>
        </div>
        <div className='w-full bg-[#fd3051] flex flex-col overflow-hidden absolute h-full items-center justify-start px-5 '>
          <div className='flex h-[22px] w-full text-lg font-bold items-center justify-center to-green-700 from-green-600 bg-gradient-to-t text-white py-5 rounded-t-xl'>
            <p className='flex-1 text-center'>Hora</p>
            <p className='flex-1 text-center'>Id</p>
            <p className='flex-1 text-center'>Plataforma</p>
            <p className='flex-1 text-center'>Ganhos</p>
          </div>
          <ul className='list-none w-full bg-green-800 relative text-white'>
            <li className='flex justify-around items-center border-b-[1px] border-white/20 py-2'>
              <span className='flex-1 text-xs text-center flex-wrap'>21/09/24, 17:03:10</span>
              <span className='flex-1 text-xs text-center'>***2132***123</span>
              <span className='flex-1 text-xs text-center'>grupofp.com</span>
              <span className='flex-1 text-xs text-center'>R$5.000,00</span>
            </li>
            <li className='flex justify-around items-center border-b-[1px] border-white/20 py-2'>
              <span className='flex-1 text-xs text-center flex-wrap'>21/09/24, 17:03:10</span>
              <span className='flex-1 text-xs text-center'>***2132***123</span>
              <span className='flex-1 text-xs text-center'>grupofp.com</span>
              <span className='flex-1 text-xs text-center'>R$5.000,00</span>
            </li>
            <li className='flex justify-around items-center border-b-[1px] border-white/20 py-2'>
              <span className='flex-1 text-xs text-center flex-wrap'>21/09/24, 17:03:10</span>
              <span className='flex-1 text-xs text-center'>***2132***123</span>
              <span className='flex-1 text-xs text-center'>grupofp.com</span>
              <span className='flex-1 text-xs text-center'>R$5.000,00</span>
            </li>
            <li className='flex justify-around items-center border-b-[1px] border-white/20 py-2'>
              <span className='flex-1 text-xs text-center flex-wrap'>21/09/24, 17:03:10</span>
              <span className='flex-1 text-xs text-center'>***2132***123</span>
              <span className='flex-1 text-xs text-center'>grupofp.com</span>
              <span className='flex-1 text-xs text-center'>R$5.000,00</span>
            </li>
            <li className='flex justify-around items-center border-b-[1px] border-white/20 py-2'>
              <span className='flex-1 text-xs text-center flex-wrap'>21/09/24, 17:03:10</span>
              <span className='flex-1 text-xs text-center'>***2132***123</span>
              <span className='flex-1 text-xs text-center'>grupofp.com</span>
              <span className='flex-1 text-xs text-center'>R$5.000,00</span>
            </li>
            <li className='flex justify-around items-center border-b-[1px] border-white/20 py-2'>
              <span className='flex-1 text-xs text-center flex-wrap'>21/09/24, 17:03:10</span>
              <span className='flex-1 text-xs text-center'>***2132***123</span>
              <span className='flex-1 text-xs text-center'>grupofp.com</span>
              <span className='flex-1 text-xs text-center'>R$5.000,00</span>
            </li>
          </ul>
        </div>
      </div>
      <Dialog open={showPopup} onOpenChange={setShowPopup}>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedHouse?.name}</DialogTitle>
            <DialogDescription>{selectedHouse?.info}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Image
              width={800}
              height={800}
              priority
              quality={100}
              src={selectedHouse?.src || '/placeholder.svg'}
              alt={selectedHouse?.name || 'Placeholder'}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <Button
              onClick={() => window.open(selectedHouse?.link, '_blank')}
              className="w-full"
            >
              Visitar Site
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
