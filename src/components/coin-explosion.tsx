// components/CoinExplosion.tsx
"use client";

import { useEffect } from "react";

export default function CoinExplosion() {
  const explodeCoins = () => {
    const coinRainContainer = document.getElementById('coinRainContainer');
    if (!coinRainContainer) return;

    const rect = coinRainContainer.getBoundingClientRect();

    for (let i = 0; i < 50; i++) {
      const coin = document.createElement('div');
      coin.classList.add('coin');
      document.body.appendChild(coin);

      coin.style.left = `${rect.left + rect.width / 2}px`;
      coin.style.top = `${rect.top + rect.height / 2}px`;

      const x = 100 - Math.random() * 200;
      const y = 100 - Math.random() * 200;
      coin.style.setProperty('--x', `${x}px`);
      coin.style.setProperty('--y', `${y}px`);

      coin.style.animation = `explode 1.00s forwards`;

      coin.addEventListener('animationend', () => {
        coin.remove();
      });
    }
  };

  useEffect(() => {
    // Execute the explosion every 3 seconds
    const interval = setInterval(explodeCoins, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <div id="coinRainContainer" />;
}
