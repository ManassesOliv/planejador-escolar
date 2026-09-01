
import React, { useMemo } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { BookOpenIcon } from './icons';
import { Theme } from '../types';

interface HeaderProps {
  schoolName: string;
  setSchoolName: (name: string) => void;
  studentName: string;
  setStudentName: (name: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Helper to create a data URI for an SVG background pattern
const svgIconPattern = (color: string, opacity: number) => {
    const svg = `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <g stroke="${color}" opacity="${opacity}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
            <g transform="translate(20, 30) rotate(15)">
                <path d="M5 2 h20 v26 h-20 z" />
                <path d="M15 2 v26" />
            </g>
            <g transform="translate(150, 20) rotate(-25)">
                <path d="M0 0 l30 0 l5 5 l-30 0 z" />
                <path d="M30 0 l10 2.5 l-10 2.5" />
            </g>
            <g transform="translate(80, 100) rotate(10)">
                <path d="M10 20 C 10 10, 20 10, 20 20 S 30 30, 30 20 C 30 5, 10 5, 10 20" />
            </g>
            <g transform="translate(30, 160) rotate(-10)">
                <path d="M0 0 h25 a5,5 0 0 1 5,5 v10 a5,5 0 0 1 -5,5 h-25 a5,5 0 0 1 -5,-5 v-10 a5,5 0 0 1 5,-5 z" />
            </g>
              <g transform="translate(140, 150) rotate(30)">
                <rect width="30" height="8" rx="2" />
            </g>
        </g>
        </svg>`.replace(/\s+/g, ' ');

    const encoded = svg
        .replace(/"/g, "'")
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E');

    return `url("data:image/svg+xml;charset=utf-8,${encoded}")`;
};

const getPatternColor = (theme: Theme) => {
    switch(theme) {
        case Theme.Dark: return '#FFFFFF';
        case Theme.Light:
        default: return '#4b5563';
    }
};

const Header: React.FC<HeaderProps> = ({ schoolName, setSchoolName, studentName, setStudentName, theme, setTheme }) => {
  const patternUrl = useMemo(() => svgIconPattern(getPatternColor(theme), 0.08), [theme]);

  return (
    <header 
      className="relative overflow-hidden p-4 md:p-6 rounded-b-2xl shadow-lg bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700"
      style={{ backgroundImage: patternUrl, backgroundSize: '200px 200px' }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <BookOpenIcon className="w-10 h-10 text-blue-500" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Gerenciador Escolar Anual</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Seu assistente de estudos com IA</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder="Nome da Escola"
            className="w-full md:w-auto px-3 py-2 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
          />
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Nome do Aluno(a)"
            className="w-full md:w-auto px-3 py-2 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
          />
          <ThemeSwitcher setTheme={setTheme} currentTheme={theme} />
        </div>
      </div>
    </header>
  );
};

export default Header;
