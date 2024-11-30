import Image from "next/image"
import logoFp from '../../public/favicon.png'

export default function Loading() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-green-950">
            <div className="w-24 flex items-center justify-center relative">
                <div className="bg-green-900 s p-2 rounded-xl animate-ping absolute w-20 h-20 z-10"/>
                <Image 
                  src={logoFp} 
                  alt="Logo FP" 
                  width={900} 
                  height={900} 
                  quality={100} 
                  className="z-20"
                />
            </div>
        </div>
    )
}

