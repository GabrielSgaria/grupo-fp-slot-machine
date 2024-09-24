"use client"

import { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { images } from '@/lib/homes'  

export default function SlotMachine() {
  const [spinning, setSpinning] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedHouse, setSelectedHouse] = useState<typeof images[0] | null>(null)
  const slotRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]

  const itemHeight = 160;  // Altura de cada imagem
  const itemSpacing = 16;  // Espaçamento entre os itens (16px no caso de `space-y-4`)
  const visibleAreaHeight = 140;  // Altura visível do slot (área com bg-white)

 
  const spinSlot = (slotIndex: number, stopId: number, callback: () => void) => {
    const slot = slotRefs[slotIndex].current
    if (!slot) return

    let currentPosition = 0
    let laps = 0
    const totalLaps = 2 //
    let running = true

    const step = () => {
      if (!running) return

      currentPosition += (itemHeight + itemSpacing) * 0.1

      if (currentPosition > (itemHeight + itemSpacing) * images.length) {
        currentPosition = currentPosition % ((itemHeight + itemSpacing) * images.length)
        laps++
      }

      slot.style.transform = `translateY(-${currentPosition}px)`
      const targetPos = images.findIndex(image => image.id === stopId) * (itemHeight + itemSpacing)

      const centerOffset = (visibleAreaHeight - itemHeight) / 2;

      if (laps >= totalLaps && currentPosition >= targetPos && currentPosition <= targetPos + (itemHeight + itemSpacing)) {
        running = false

        // Ajusta o `top` para `45px` ao encontrar o item correto, centralizando o item
        slot.style.transform = `translateY(calc(-${targetPos}px + ${centerOffset}px))`
        slot.style.top = '45px';  // Centraliza o card sorteado após o giro
        callback()
        return
      }

      requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }

  const spin = () => {
    setSpinning(true)
    
    // Sorteia o ID do item que será exibido. Aqui garantimos que o ID será sorteado corretamente, inclusive o ID 1.
    const winningIndex = Math.floor(Math.random() * images.length)
    const selectedId = images[winningIndex].id
    setSelectedHouse(images[winningIndex])

   
    slotRefs.forEach((_, index) => {
      spinSlot(index, selectedId, () => {
        console.log(`Slot ${index + 1} parou`)
        if (index === 2) {
       
          setTimeout(() => {
            setSpinning(false)
            setShowPopup(true)
          }, 3000)
        }
      })
    })

    setTimeout(() => {
      spinSlot(0, selectedId, () => console.log('Slot 1 parou'))
    }, 0) // O primeiro slot para imediatamente após atingir a imagem correta

    setTimeout(() => {
      spinSlot(1, selectedId, () => console.log('Slot 2 parou'))
    }, 1000) // O segundo slot para com 1000ms de delay

    setTimeout(() => {
      spinSlot(2, selectedId, () => console.log('Slot 3 parou'))
    }, 2000) //
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-green-500 to-lime-500 md:p-4 w-full h-[1150px] overflow-hidden ">
      <h1 className="text-4xl font-bold text-white mb-8">Grupo FP</h1>
      <div className="flex justify-center space-x-4 mb-8 bg-green-600 px-4 py-6 rounded-xl relative overflow-hidden ">
        <div className="absolute w-full h-10 inset-0 top-0 bg-gradient-to-t from-transparent to-black/30 pointer-events-none z-20" />
        <div className="absolute w-full h-10 bottom-0 right-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none z-20" />
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center h-[200px] w-[160px] overflow-hidden "
          >
            <div ref={slotRefs[index]} className="flex flex-col space-y-4 absolute top-[-130px]"> 
              {images.concat(images).map((image, i) => (
                <div className="h-[160px] w-[160px] p-3 bg-white/90 shadow-2xl rounded-2xl" key={i}>
                  <Image
                    width={320}
                    height={320}
                    src={image.src}
                    alt={image.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={spin}
        disabled={spinning}
        className="px-6 py-3 text-lg font-semibold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {spinning ? 'Girando...' : 'Girar!'}
      </Button>

      <Dialog open={showPopup} onOpenChange={setShowPopup}>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedHouse?.name}</DialogTitle>
            <DialogDescription>{selectedHouse?.info}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Image
              width={300}
              height={300}
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
