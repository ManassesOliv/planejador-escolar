
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SubjectGrid from './components/SubjectGrid';
import Assignments from './components/Assignments';
import Notes from './components/Notes';
import StudyFocus from './components/StudyFocus';
import { Subject, Assignment, Theme, Grade } from './types';
import { MONTHS } from './constants';
import { getStudySuggestions } from './services/geminiService';

const initialSubjects: Subject[] = [
  { id: '1', name: 'Matemática', grades: MONTHS.map(m => ({ month: m, score: null })) as Grade[] },
  { id: '2', name: 'Português', grades: MONTHS.map(m => ({ month: m, score: null })) as Grade[] },
  { id: '3', name: 'Ciências', grades: MONTHS.map(m => ({ month: m, score: null })) as Grade[] },
  { id: '4', name: 'História', grades: MONTHS.map(m => ({ month: m, score: null })) as Grade[] },
];

const initialAssignments: Assignment[] = [
    {id: '1', subject: 'Ciências', title: 'Apresentação sobre Células', dueDate: '2024-05-15', completed: true},
    {id: '2', subject: 'História', title: 'Ensaio sobre a Revolução Francesa', dueDate: '2024-05-22', completed: false},
];

const getStoredItem = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key “${key}”:`, error);
    return defaultValue;
  }
};


function App() {
  const [schoolName, setSchoolName] = useState(() => getStoredItem('schoolName', 'Escola Exemplo'));
  const [studentName, setStudentName] = useState(() => getStoredItem('studentName', 'Aluno(a) Exemplo'));
  const [subjects, setSubjects] = useState<Subject[]>(() => getStoredItem('subjects', initialSubjects));
  const [assignments, setAssignments] = useState<Assignment[]>(() => getStoredItem('assignments', initialAssignments));
  const [notes, setNotes] = useState(() => getStoredItem('notes', 'Lembrar de revisar o capítulo 3 de Matemática antes da prova.'));
  const [theme, setTheme] = useState<Theme>(() => getStoredItem('theme', Theme.Light));

  const [studyAnalysis, setStudyAnalysis] = useState('');
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('schoolName', JSON.stringify(schoolName));
  }, [schoolName]);

  useEffect(() => {
    localStorage.setItem('studentName', JSON.stringify(studentName));
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    if (theme === Theme.Dark) {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);
  
  const handleAnalyze = async () => {
    setIsAnalysisLoading(true);
    setStudyAnalysis('');
    const suggestions = await getStudySuggestions(subjects);
    setStudyAnalysis(suggestions);
    setIsAnalysisLoading(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200`}>
      <Header 
        schoolName={schoolName}
        setSchoolName={setSchoolName}
        studentName={studentName}
        setStudentName={setStudentName}
        theme={theme}
        setTheme={setTheme}
      />
      <main className="container mx-auto p-4 md:p-6 space-y-6">
        <SubjectGrid subjects={subjects} setSubjects={setSubjects} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
             <StudyFocus 
                analysis={studyAnalysis}
                isLoading={isAnalysisLoading}
                onAnalyze={handleAnalyze}
             />
          </div>
          <div className="lg:col-span-1">
            <Assignments 
              assignments={assignments}
              setAssignments={setAssignments}
              subjects={subjects.map(s => s.name)}
            />
          </div>
          <div className="lg:col-span-1">
             <Notes notes={notes} setNotes={setNotes} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
