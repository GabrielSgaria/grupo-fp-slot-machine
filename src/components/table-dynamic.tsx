import { useState, useEffect } from 'react';
import { homes } from '@/lib/homes';

interface RowData {
  formattedDate: string;
  id: string;
  randomPlatform: string;
  ganhos: string;
}

const generateRandomData = (): RowData => {
  const randomGanhos = (Math.random() * (12670 - 1) + 1).toFixed(2); 
  const randomPlatform = homes[Math.floor(Math.random() * homes.length)].name; 
  const randomId = `***${Math.floor(100  + Math.random() * 900)}**${Math.floor(10 + Math.random() * 90)}`; 

  const now = new Date(); 
  const formattedDate = now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  return {
    formattedDate,
    id: randomId,
    randomPlatform,
    ganhos: `R$ ${randomGanhos}`,
  };
};

const TableDynamic = () => {

  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    const initialRows = Array.from({ length: 100 }, () => generateRandomData());
    setRows(initialRows);

    const interval = setInterval(() => {
      setRows((prevRows) => {
        const newRow = generateRandomData();
        return [newRow, ...prevRows.slice(0, 9)];
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="w-full bg-green-fp flex flex-col overflow-hidden absolute h-[458px] md:h-[400px] rounded-b-xl items-center justify-start px-5 border-b-2xl bottom-0">
      <div className='flex h-[22px] mt-5 w-full text-lg font-bold items-center justify-center to-green-700 from-green-600 bg-gradient-to-t text-white py-5 rounded-t-xl'>
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
