/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HelpCircle, Smartphone, Monitor, Share } from 'lucide-react'
import Image from 'next/image'

export function InstallationTutorial() {
    const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'desktop'>('desktop')

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase()
        if (/iphone|ipad|ipod/.test(userAgent)) {
            setDeviceType('ios')
        } else if (/android/.test(userAgent)) {
            setDeviceType('android')
        } else {
            setDeviceType('desktop')
        }
    }, [])

    const tutorialContent = {
        ios: (
            <div className="space-y-4">
                <p className="text-gray-600">Siga estes passos para instalar o app no seu dispositivo iOS:</p>
                <ol className="space-y-4">
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-3">1</span>
                        <div>
                            <p className="font-semibold">Abra o site no Safari</p>
                            <p className="text-sm text-gray-600">Certifique-se de estar usando o navegador Safari</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-3">2</span>
                        <div>
                            <p className="font-semibold">Toque no ícone de compartilhamento</p>
                            <Share className="inline h-5 w-5 text-blue-500 mt-1" />
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-3">3</span>
                        <div>
                            <p className="font-semibold">Role para baixo e toque em "Adicionar à Tela de Início"</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-3">4</span>
                        <div>
                            <p className="font-semibold">Toque em "Adicionar" no canto superior direito</p>
                        </div>
                    </li>
                </ol>
                <Image
                    width={600}
                    height={600}
                    quality={100}
                    src="/ios-install-animation.gif"
                    alt="Instruções de instalação no iOS"
                    className="w-full rounded-lg shadow-lg mt-4"
                />
            </div>
        ),
        android: (
            <div className="space-y-4">
                <p className="text-gray-600">Siga estes passos para instalar o app no seu dispositivo Android:</p>
                <ol className="space-y-4">
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full mr-3">1</span>
                        <div>
                            <p className="font-semibold">Abra o site no Chrome</p>
                            <p className="text-sm text-gray-600">Certifique-se de estar usando o navegador Chrome</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full mr-3">2</span>
                        <div>
                            <p className="font-semibold">Toque no ícone de menu (três pontos) no canto superior direito</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full mr-3">3</span>
                        <div>
                            <p className="font-semibold">Selecione "Adicionar à tela inicial"</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full mr-3">4</span>
                        <div>
                            <p className="font-semibold">Toque em "Adicionar" para confirmar</p>
                        </div>
                    </li>
                </ol>
            </div>
        ),
        desktop: (
            <div className="space-y-4">
                <p className="text-gray-600">Siga estes passos para instalar o app no seu computador:</p>
                <ol className="space-y-4">
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full mr-3">1</span>
                        <div>
                            <p className="font-semibold">Abra o site no Chrome, Edge ou Firefox</p>
                            <p className="text-sm text-gray-600">Certifique-se de estar usando um navegador compatível</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full mr-3">2</span>
                        <div>
                            <p className="font-semibold">Procure pelo ícone de instalação na barra de endereço</p>
                            <p className="text-sm text-gray-600">Geralmente um '+' ou ícone de casa</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full mr-3">3</span>
                        <div>
                            <p className="font-semibold">Clique no ícone e selecione "Instalar"</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full mr-3">4</span>
                        <div>
                            <p className="font-semibold">Siga as instruções na tela para concluir a instalação</p>
                        </div>
                    </li>
                </ol>
            </div>
        )
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="text-blue-400 flex items-center hover:text-blue-300 transition duration-150 ease-in-out hover:bg-transparent">
                    <HelpCircle className="w-5 h-5 mr-1" />
                    Tutorial de instalação
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white text-black">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-xl font-bold">
                        {deviceType === 'ios' && <Smartphone className="mr-2 text-blue-500" />}
                        {deviceType === 'android' && <Smartphone className="mr-2 text-green-500" />}
                        {deviceType === 'desktop' && <Monitor className="mr-2 text-green-500" />}
                        Como instalar o app
                    </DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    {tutorialContent[deviceType]}
                </div>
            </DialogContent>
        </Dialog>
    )
}