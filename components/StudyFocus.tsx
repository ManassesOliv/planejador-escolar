
import React from 'react';
import { SparklesIcon } from './icons';

interface StudyFocusProps {
  analysis: string;
  isLoading: boolean;
  onAnalyze: () => void;
}

const StudyFocus: React.FC<StudyFocusProps> = ({ analysis, isLoading, onAnalyze }) => {
  
  function formatAnalysis(text: string) {
    const formattedText = text
      .replace(/### (.*)/g, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\* (.*)/g, '<li class="ml-5 list-disc">$1</li>')
      .replace(/\n/g, '<br />');
    
    // This is a bit of a hack to wrap list items in a ul
    const listWrapped = formattedText.replace(/(<li.*<\/li>)/gs, '<ul>$1</ul>').replace(/<\/ul><br \/><ul>/g, '');

    return listWrapped;
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg h-full flex flex-col">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <SparklesIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
        Foco nos Estudos (IA)
      </h3>
      <div className="flex-grow overflow-y-auto pr-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Analisando seu desempenho...</p>
          </div>
        ) : analysis ? (
          <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: formatAnalysis(analysis) }}></div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full">
             <SparklesIcon className="w-16 h-16 text-blue-200 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Clique no botão abaixo para receber sugestões de estudo personalizadas pela IA.</p>
          </div>
        )}
      </div>
      <button 
        onClick={onAnalyze} 
        disabled={isLoading}
        className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-md hover:from-purple-600 hover:to-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SparklesIcon className="w-5 h-5" />
        {isLoading ? 'Analisando...' : 'Analisar Desempenho'}
      </button>
    </div>
  );
};

export default StudyFocus;
