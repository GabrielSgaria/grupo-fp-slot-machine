import type { Metadata } from 'next'
import { Star, ArrowLeft } from 'lucide-react'
import { MultiPlatformInstallButton } from '@/components/page-download/install-pwa-button'
import { InstallationTutorial } from '@/components/page-download/install-tutorial'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Download App - GRUPO FP",
  description: "Baixe nosso aplicativo PWA",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function DownloadPage() {
    return (
        <div className="min-h-screen bg-transparent text-white sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-4">
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                    >
                        <Link href="/" className='text-black'>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para o site
                        </Link>
                    </Button>
                </div>
                <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-6 sm:p-8 md:p-10">
                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gray-700 flex-shrink-0">
                                <Image
                                    width={600}
                                    height={600}
                                    quality={100}
                                    priority
                                    src="/favicon.png"
                                    alt="App icon"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-grow">
                                <h1 className="text-2xl md:text-3xl font-bold mb-2">Gerador De Sinais FP</h1>
                                <p className="text-gray-400 mb-4">Descubra os melhores sinais para seus jogos favoritos</p>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                    <MultiPlatformInstallButton />
                                    <InstallationTutorial />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-2">
                                <span className="text-4xl font-bold">4.9</span>
                                <div className="flex">
                                    {Array(5).fill(null).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-6 h-6 text-yellow-400"
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="text-sm text-gray-400">
                                <span className="font-semibold">9999+</span> Avaliações
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-bold mb-4">Avaliações dos usuários</h2>
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <div key={rating} className="flex items-center">
                                        <div className="flex items-center w-24">
                                            {Array(5).fill(null).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                                    fill={i < rating ? 'currentColor' : 'none'}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex-1 ml-4">
                                            <div className="h-2 bg-gray-700 rounded-full">
                                                <div
                                                    className="h-2 bg-yellow-400 rounded-full"
                                                    style={{
                                                        width: rating === 5 ? '85%' :
                                                            rating === 4 ? '10%' :
                                                                rating === 3 ? '3%' :
                                                                    rating === 2 ? '1%' : '1%'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Compatibilidade</h3>
                                <p>Android, iOS, Desktop</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Tamanho</h3>
                                <p>&lt; 5 MB (PWA)</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Última atualização</h3>
                                <p>2024-10-17 14:59:55</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Versão</h3>
                                <p>1.0.0</p>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-gray-700 rounded-lg text-sm text-gray-300">
                            <h3 className="font-semibold mb-2">Declaração de isenção:</h3>
                            <p>Este aplicativo é fornecido como um Progressive Web App (PWA).</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}