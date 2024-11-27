'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Download, Share, Smartphone } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function MultiPlatformInstallButton() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    const checkPlatform = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      const isIOSDevice = /ipad|iphone|ipod/.test(userAgent) && !window.MSStream
      const isAndroidDevice = /android/.test(userAgent)
      
      setIsIOS(isIOSDevice)
      setIsAndroid(isAndroidDevice)

      const isStandaloneMode = 
        window.matchMedia('(display-mode: standalone)').matches ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://')

      setIsStandalone(isStandaloneMode)
    }

    const checkInstalledStatus = () => {
      if ('getInstalledRelatedApps' in navigator) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (navigator as any).getInstalledRelatedApps().then((relatedApps: any[]) => {
          setIsStandalone(relatedApps.length > 0)
        }).catch((error: Error) => {
          console.error('Error checking installed status:', error)
        })
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', () => {
      setIsStandalone(true)
      router.push('/') // Redireciona para a página inicial após a instalação
    })
    
    checkPlatform()
    checkInstalledStatus()

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [router])

  const handleInstallClick = async () => {
    if (isIOS) {
      alert('Para instalar no iOS:\n1. Toque no ícone de compartilhamento\n2. Escolha "Adicionar à Tela de Início"')
    } else if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('PWA foi instalado')
        setIsStandalone(true)
        router.push('/') // Redireciona para a página inicial após a instalação
      } else {
        console.log('Instalação do PWA foi recusada')
      }

      setDeferredPrompt(null)
    } else if (isAndroid) {
      alert('Para instalar no Android:\n1. Toque no menu do navegador (três pontos)\n2. Escolha "Adicionar à tela inicial"')
    }
  }

  if (!isMounted) {
    return null
  }

  if (isStandalone) {
    return (
      <Button disabled className="w-full sm:w-auto opacity-50 cursor-not-allowed" aria-label="Aplicativo já instalado">
        Já instalado
      </Button>
    )
  }

  return (
    <Button
      className="w-full sm:w-auto"
      onClick={handleInstallClick}
      aria-label={isIOS ? "Instalar no iOS" : isAndroid ? "Instalar no Android" : deferredPrompt ? "Instalar App" : "Adicionar à Tela Inicial"}
    >
      {isIOS ? (
        <>
          <Smartphone className="mr-2 h-5 w-5" aria-hidden="true" />
          Instalar no iOS
        </>
      ) : isAndroid ? (
        <>
          <Smartphone className="mr-2 h-5 w-5" aria-hidden="true" />
          Instalar no Android
        </>
      ) : deferredPrompt ? (
        <>
          <Download className="mr-2 h-5 w-5" aria-hidden="true" />
          Instalar App
        </>
      ) : (
        <>
          <Share className="mr-2 h-5 w-5" aria-hidden="true" />
          Adicionar à Tela Inicial
        </>
      )}
    </Button>
  )
}

