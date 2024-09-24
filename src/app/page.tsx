"use client"

import { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const images = [
  { src: '/images/bilhar.jpg', name: 'Casa de Bilhar', info: 'A melhor casa de bilhar da região.', link: 'https://casa-de-bilhar.com' },
  { src: '/images/cilios.jpg', name: 'Cílios Store', info: 'Oferecemos os melhores produtos de cílios.', link: 'https://cilios-store.com' },
  { src: '/images/vaqueiro.jpg', name: 'Vaqueiro Bet', info: 'Aposta em corridas de cavalos e rodeios.', link: 'https://vaqueiro-bet.com' },
  { src: '/images/danca.jpg', name: 'Dança Bet', info: 'O mundo das apostas de danças.', link: 'https://danca-bet.com' },
  { src: '/images/gesto.jpg', name: 'Gesto Apostas', info: 'Aposte no seu próximo grande gesto.', link: 'https://gesto-apostas.com' }
]

export default function Component() {
  const [spinning, setSpinning] = useState(false)
  const [results, setResults] = useState<number[]>(Array(3).fill(0).map(() => Math.floor(Math.random() * images.length)))
  const [showPopup, setShowPopup] = useState(false)
  const [selectedHouse, setSelectedHouse] = useState<typeof images[0] | null>(null)
  const slotRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]

  const spin = () => {
    setSpinning(true)
    const winningIndex = Math.floor(Math.random() * images.length)
    setSelectedHouse(images[winningIndex])

    const spinDuration = 3000
    const stopInterval = 1000

    const animateSlot = (slotIndex: number, duration: number) => {
      const slot = slotRefs[slotIndex].current
      if (!slot) return

      let start: number | null = null
      const totalImages = 20 // Increased number of images for smoother animation
      const imageHeight = slot.clientHeight

      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const elapsed = timestamp - start
        const progress = Math.min(elapsed / duration, 1)

        const totalDistance = imageHeight * totalImages
        const currentPosition = (progress * totalDistance) % imageHeight

        slot.style.transform = `translateY(${-currentPosition}px)`

        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          slot.style.transform = 'translateY(0)'
          setResults((prev) => {
            const newResults = [...prev]
            newResults[slotIndex] = winningIndex
            return newResults
          })
        }
      }

      requestAnimationFrame(step)
    }

    // Start all slots spinning simultaneously
    slotRefs.forEach((_, index) => {
      animateSlot(index, spinDuration + index * stopInterval)
    })

    // Stop slots sequentially
    setTimeout(() => {
      // First slot stops
    }, spinDuration)

    setTimeout(() => {
      // Second slot stops
    }, spinDuration + stopInterval)

    setTimeout(() => {
      // Third slot stops
      setSpinning(false)
      setShowPopup(true)
    }, spinDuration + 2 * stopInterval)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-blue-600 p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Slot Machine de Apostas</h1>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
        {[0, 1, 2].map((index) => (
          <div key={index} className="relative w-40 h-40 bg-white rounded-lg overflow-hidden shadow-lg">
            <div ref={slotRefs[index]} className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <Image
                  width={300}
                  height={300}
                  key={i}
                  src={images[(results[index] + i) % images.length].src}
                  alt={images[(results[index] + i) % images.length].name}
                  className="w-full h-40 object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={spin}
        disabled={spinning}
        className="px-6 py-3 text-lg font-semibold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={spinning ? 'Girando' : 'Girar slot machine'}
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