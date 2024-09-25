import { useState, useEffect } from 'react';
import { homes } from '@/lib/homes'; // Importando plataformas

// Definir o tipo correto para cada linha de dados
interface RowData {
  formattedDate: string;
  id: string;
  randomPlatform: string;
  ganhos: string;
}

// Função para gerar uma linha de dados aleatórios
const generateRandomData = (): RowData => {
  const randomGanhos = (Math.random() * (12670 - 1) + 1).toFixed(2); // Gerar ganhos aleatórios entre 1 e 12670
  const randomPlatform = homes[Math.floor(Math.random() * homes.length)].name; // Escolher plataforma aleatória
  const randomId = `***${Math.floor(1000 + Math.random() * 9000)}***${Math.floor(100 + Math.random() * 900)}`; // Gerar ID aleatório

  const now = new Date(); // Obter hora atual de Brasília
  const formattedDate = now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  return {
    formattedDate,
    id: randomId,
    randomPlatform,
    ganhos: `R$ ${randomGanhos}`,
  };
};

const TableDynamic = () => {
  // Definindo o estado como uma lista de objetos do tipo RowData
  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    // Gerar 100 linhas de dados ao montar o componente
    const initialRows = Array.from({ length: 100 }, () => generateRandomData());
    setRows(initialRows);

    const interval = setInterval(() => {
      // Remover a linha mais antiga e adicionar uma nova no topo da lista
      setRows((prevRows) => {
        const newRow = generateRandomData();
        return [newRow, ...prevRows.slice(0, 99)]; // Mantém no máximo 100 linhas
      });
    }, 1000); // Atualizar a cada 1 segundo

    return () => clearInterval(interval); // Limpar intervalo ao desmontar o componente
  }, []);

  return (
    <div className="w-full bg-[#fd3051] flex flex-col overflow-hidden absolute h-full items-center justify-start px-5">
      <div className='flex h-[22px] w-full text-lg font-bold items-center justify-center to-green-700 from-green-600 bg-gradient-to-t text-white py-5 rounded-t-xl'>
        <p className='flex-1 text-center'>Hora</p>
        <p className='flex-1 text-center'>Id</p>
        <p className='flex-1 text-center'>Plataforma</p>
        <p className='flex-1 text-center'>Ganhos</p>
      </div>
      <ul className='list-none w-full bg-green-800 relative text-white'>
        {rows.map((row, index) => (
          <li key={index} className='flex justify-around items-center border-b-[1px] border-white/20 py-2'>
            <span className='flex-1 text-xs text-center flex-wrap'>{row.formattedDate}</span>
            <span className='flex-1 text-xs text-center'>{row.id}</span>
            <span className='flex-1 text-xs text-center'>{row.randomPlatform}</span>
            <span className='flex-1 text-xs text-center'>{row.ganhos}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableDynamic;
