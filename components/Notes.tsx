
import React from 'react';
import { NoteIcon } from './icons';

interface NotesProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const Notes: React.FC<NotesProps> = ({ notes, setNotes }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg h-full flex flex-col">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <NoteIcon className="w-6 h-6 text-blue-500 dark:text-gray-100" />
        Anotações
      </h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Escreva suas observações, lembretes ou dúvidas aqui..."
        className="flex-grow w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 resize-none"
      />
    </div>
  );
};

export default Notes;
