import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import Image from 'next/image'

const bettingHouses = [
  { src: '/images/bilhar.jpg', name: 'Casa de Bilhar', info: 'A melhor casa de bilhar da região.' },
  { src: '/images/cilios.jpg', name: 'Cílios Store', info: 'Oferecemos os melhores produtos de cílios.' },
  { src: '/images/vaqueiro.jpg', name: 'Vaqueiro Bet', info: 'Aposta em corridas de cavalos e rodeios.' },
  { src: '/images/danca.jpg', name: 'Dança Bet', info: 'O mundo das apostas de danças.' },
  { src: '/images/gesto.jpg', name: 'Gesto Apostas', info: 'Aposte no seu próximo grande gesto.' }
]

interface ReelProps {
  onStop: (result: number) => void
  isSpinning: boolean
}

const Reel: React.FC<ReelProps> = ({ onStop, isSpinning }) => {
  const controls = useAnimation()

  useEffect(() => {
    const spin = async () => {
      await controls.start({
        y: [0, -500],
        transition: {
          y: {
            repeat: 5,
            repeatType: "loop",
            duration: 0.5,
            ease: "linear",
          }
        }
      })

      const randomIndex = Math.floor(Math.random() * bettingHouses.length)
      const finalPosition = -100 * randomIndex

      await controls.start({
        y: finalPosition,
        transition: { duration: 1, ease: "easeOut" }
      })

      onStop(randomIndex)
    }

    if (isSpinning) {
      spin()
    }
  }, [isSpinning, controls, onStop])

  return (
    <div className="w-32 h-32 bg-gray-800 rounded-lg overflow-hidden">
      <motion.div animate={controls} className="flex flex-col">
        {[...bettingHouses, ...bettingHouses].map((house, i) => (
          <div key={i} className="w-32 h-32 flex-shrink-0">
            <Image src={house.src} alt={house.name} width={128} height={128} className="w-full h-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

interface SlotMachineProps {
  isSpinning: boolean
  setIsSpinning: (isSpinning: boolean) => void
}

const SlotMachine: React.FC<SlotMachineProps> = ({ isSpinning, setIsSpinning }) => {
  const [results, setResults] = useState<number[]>([])
  const [showPopup, setShowPopup] = useState(false)

  const handleReelStop = (index: number, result: number) => {
    setResults(prev => {
      const newResults = [...prev]
      newResults[index] = result
      if (newResults.length === 3 && newResults.every(r => r !== undefined)) {
        setIsSpinning(false)
        setShowPopup(true)
      }
      return newResults
    })
  }

  const getResultMessage = () => {
    if (results.length !== 3 || results.some(r => r === undefined)) {
      return "Aguarde o resultado..."
    }
    
    if (results.every(r => r === results[0])) {
      const winningHouse = bettingHouses[results[0]]
      return (
        <div>
          <p>Parabéns! Você ganhou na {winningHouse.name}!</p>
          <p className="mt-2">{winningHouse.info}</p>
        </div>
      )
    }
    
    return "Tente novamente para conseguir 3 casas iguais!"
  }

  return (
    <>
      <div className="flex justify-center space-x-4">
        {Array(3).fill(0).map((_, index) => (
          <Reel key={index} onStop={(result) => handleReelStop(index, result)} isSpinning={isSpinning} />
        ))}
      </div>
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resultado do Sorteio</DialogTitle>
            <DialogDescription>
              {getResultMessage()}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SlotMachine