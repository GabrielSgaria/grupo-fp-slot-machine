import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function AnimalBox() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const totalImages = 38; // total de imagens dos animais
    const intervalRef = useRef<number | NodeJS.Timeout | null>(null); 

    // Função para alternar entre as imagens
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
        }, 4000); 

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current as NodeJS.Timeout); 
            }
        };
    }, []);

    // Define tamanhos diferentes para as imagens de acordo com o índice
    const getImageSize = (index: number) => {
        if (index === 2) return 160; // Imagem do meio, maior
        if (index === 1 || index === 3) return 130; // Imagens adjacentes, tamanho intermediário
        return 100; // Imagens nas extremidades, menores
    };

    return (
        <div className="animalBox flex space-x-4 justify-center items-end mt-5 absolute -bottom-1 px-10 z-50 ">
            {Array.from({ length: 5 }).map((_, index) => {
                const imageSize = getImageSize(index); // Define o tamanho da imagem com base na posição
                return (
                    <div key={index} className="animalIcon">
                        <Image
                            src={`/images/icons/animal/${(currentImageIndex + index) % totalImages + 1}.png`}
                            alt={`Animal ${index + 1}`}
                            width={imageSize} // Aplica o tamanho dinâmico
                            height={imageSize} // Aplica o tamanho dinâmico
                            className="object-cover transition-transform duration-500" // Adiciona transição suave
                        />
                    </div>
                );
            })}
        </div>
    );
};
