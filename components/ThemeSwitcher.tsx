
import React from 'react';
import { Theme } from '../types';

interface ThemeSwitcherProps {
  setTheme: (theme: Theme) => void;
  currentTheme: Theme;
}

const THEMES = [
  { name: Theme.Light, color: 'bg-white' },
  { name: Theme.Dark, color: 'bg-gray-800' },
];

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ setTheme, currentTheme }) => {
  return (
    <div className="flex items-center space-x-2 p-1 bg-gray-200 dark:bg-gray-700 rounded-full">
      {THEMES.map((theme) => (
        <button
          key={theme.name}
          onClick={() => setTheme(theme.name)}
          className={`w-6 h-6 rounded-full ${theme.color} border-2 ${
            currentTheme === theme.name ? 'border-blue-500 scale-110' : 'border-transparent'
          } transition-transform`}
          aria-label={`Switch to ${theme.name} theme`}
        />
      ))}
    </div>
  );
};

export default ThemeSwitcher;
