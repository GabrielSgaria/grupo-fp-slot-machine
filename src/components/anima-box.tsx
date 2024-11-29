import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function AnimalBox() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const totalImages = 38;
    const intervalRef = useRef<number | NodeJS.Timeout | null>(null); 

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

    const getImageSize = (index: number) => {
        if (index === 2) return 160;
        if (index === 1 || index === 3) return 130;
        return 100; 
    };

    return (
        <div className="animalBox flex space-x-4 justify-center items-end mt-5 absolute -bottom-5 px-10 z-50 ">
            {Array.from({ length: 5 }).map((_, index) => {
                const imageSize = getImageSize(index); 
                return (
                    <div key={index} className="animalIcon">
                        <Image
                            src={`/images/icons/animal/${(currentImageIndex + index) % totalImages + 1}.png`}
                            alt={`Animal ${index + 1}`}
                            width={imageSize}
                            height={imageSize} 
                            className="object-cover transition-transform duration-500" 
                        />
                    </div>
                );
            })}
        </div>
    );
};
