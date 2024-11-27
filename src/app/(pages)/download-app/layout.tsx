import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Download App - Gerador De Sinais FP',
    description: 'Page Download App Gerador de Sinais Slots - Grupo FP',
}

export default function DownloadAppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={`min-h-screen bg-gray-200 text-black`}>
            <section className="max-w-4xl mx-auto px-4 py-8">
                {children}
            </section>
        </div>
    )
}