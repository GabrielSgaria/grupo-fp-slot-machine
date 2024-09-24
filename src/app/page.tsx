"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'


const images = [
  { src: '/images/bilhar.jpg', name: 'Casa de Bilhar', info: 'A melhor casa de bilhar da região.' },
  { src: '/images/cilios.jpg', name: 'Cílios Store', info: 'Oferecemos os melhores produtos de cílios.' },
  { src: '/images/vaqueiro.jpg', name: 'Vaqueiro Bet', info: 'Aposta em corridas de cavalos e rodeios.' },
  { src: '/images/danca.jpg', name: 'Dança Bet', info: 'O mundo das apostas de danças.' },
  { src: '/images/gesto.jpg', name: 'Gesto Apostas', info: 'Aposte no seu próximo grande gesto.' }
  
]

// Frases aleatórias para personalizar o texto do popup
const randomTexts = [
  "Você foi sortudo dessa vez!",
  "Essa casa de apostas é uma das melhores.",
  "Hoje é o seu dia de sorte!",
  "Ganhe mais com essa casa de apostas!",
  "Parabéns pela escolha acertada!"
]

// Tipagem dos parâmetros do ReelComponent
interface ReelComponentProps {
  index: number
  resultImage: string // Imagem final a ser exibida
  triggerSpin: boolean
  hasStopped: boolean // Controla se o slot já parou
  onStop: () => void
}

const ReelComponent = ({ index, resultImage, triggerSpin, hasStopped, onStop }: ReelComponentProps) => {
  const controls = useAnimation()
  const containerRef = useRef(null)

  useEffect(() => {
    const startSpin = async () => {
      const imageHeight = 100 // Altura de cada imagem no slot
      const slotHeight = 100 // Altura do slot

      // Gira as imagens por um tempo específico, mas só se o slot ainda não parou
      if (!hasStopped) {
        await controls.start({
          y: [0, -600],
          transition: {
            y: {
              repeat: 5, // Gira por 5 ciclos
              duration: 0.3,
              ease: "linear",
            }
          }
        })

        // Para o slot individualmente com um atraso
        setTimeout(async () => {
          const finalPosition = -(imageHeight * images.findIndex(img => img.src === resultImage)) + (slotHeight / 2) - (imageHeight / 2)
          await controls.start({
            y: finalPosition,
            transition: { duration: 0.3, ease: "easeOut" }
          })
          onStop() // Chama a função quando o slot parar
        }, index * 3000) // Delay de 3 segundos para cada slot
      }
    }

    if (triggerSpin) {
      startSpin()
    }
  }, [triggerSpin, hasStopped, controls, resultImage, onStop, index])

  return (
    <div className="w-full h-full flex px-2 md:px-1">
      <motion.div ref={containerRef} animate={controls} className="flex flex-col w-20 md:w-24 h-full gap-2 md:gap-3 ">
        {images.map((image, i) => (
          <div key={i} className="w-[105px] h-[105px] md:w-28 md:h-28 bg-white p-2 md:p-3 rounded-xl ">
            <Link href="">
              <Image src={image.src} alt={`Image ${i + 1}`} width={100} height={100} className="w-full h-full object-cover" />
            </Link>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function SlotMachine() {
  const [spinning, setSpinning] = useState(false) // Estado para controle do botão
  const [triggerSpin, setTriggerSpin] = useState(false)
  const [resultImage, setResultImage] = useState(images[0].src) // Imagem final sorteada
  const [selectedHouse, setSelectedHouse] = useState(images[0]) // Dados da casa de aposta sorteada
  const [showPopup, setShowPopup] = useState(false) // Estado do popup
  const [randomText, setRandomText] = useState("") // Texto aleatório para o popup
  const [stoppedSlots, setStoppedSlots] = useState([false, false, false]) // Controla quais slots já pararam

  const spin = () => {
    setSpinning(true) // Define o estado "girando"
    setTriggerSpin(true) // Inicia a rotação dos slots
    setStoppedSlots([false, false, false]) // Reinicia o estado dos slots

    // Escolhe uma casa de apostas aleatória para ser exibida em todos os slots
    const randomHouse = images[Math.floor(Math.random() * images.length)]
    setResultImage(randomHouse.src)
    setSelectedHouse(randomHouse)

    // Define um texto aleatório para o popup
    const randomPopupText = randomTexts[Math.floor(Math.random() * randomTexts.length)]
    setRandomText(randomPopupText)
  }

  const handleSlotStop = (slotIndex: number) => {
    setStoppedSlots(prev => {
      const newStoppedSlots = [...prev]
      newStoppedSlots[slotIndex] = true // Marca o slot como parado
      if (newStoppedSlots.every(slot => slot)) {
        setTimeout(() => {
          setSpinning(false) // Todos os slots pararam
          setTriggerSpin(false)
          // setShowPopup(true) // Exibe o popup após todas as animações terminarem
        }, 2000) // Delay para garantir que a última animação finalize antes do popup
      }
      return newStoppedSlots
    })
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-green-500 to-lime-500 md:p-4 w-full h-[1150px] overflow-hidden ">
      <div className='w-full min-w-[475px] max-w-[475px] md:w-[510px] md:max-w-[510px]  h-[1150px] relative shadow-2xl shadow-black rounded-xl bg-fundo bg-contain '>
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
          <div className=" rounded-2xl h-[161px] md:h-[168.3px] overflow-hidden flex flex-nowrap justify-center items-center bg-green-700 absolute w-[353px] md:w-[375px] top-[112px] md:top-[122px]">
            <div className="flex items-center justify-center w-full pr-2 pl-1 md:px-2 h-fit">
              {Array(3).fill(0).map((_, index) => (
                <ReelComponent
                  key={index}
                  index={index}
                  triggerSpin={triggerSpin}
                  resultImage={resultImage}
                  hasStopped={stoppedSlots[index]}
                  onStop={() => handleSlotStop(index)}
                />
              ))}
            </div>
          </div>
          <Button
            onClick={spin}
            disabled={spinning}
            className="w-[200px] h-[60px] left-[30%] bg-yellow-500/20 hover:bg-yellow-500/50 text-black font-bold py-2 px-4 rounded absolute bottom-[90px]"
          >
            {spinning ? 'Girando...' : 'GIRAR'}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedHouse.name}</DialogTitle>
            <DialogDescription>
              {randomText} <br />
              {selectedHouse.info}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowPopup(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}