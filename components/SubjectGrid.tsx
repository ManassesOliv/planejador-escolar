
import React, { useState, useMemo } from 'react';
import { Subject } from '../types';
import { MONTHS, MONTHS_FULL, SEMESTER_1_MONTHS, SEMESTER_2_MONTHS, PASSING_GRADE } from '../constants';
import { PlusIcon, TrashIcon } from './icons';

interface SubjectGridProps {
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
}

const SubjectGrid: React.FC<SubjectGridProps> = ({ subjects, setSubjects }) => {
  const [newSubjectName, setNewSubjectName] = useState('');

  const handleAddSubject = () => {
    if (newSubjectName.trim() === '') return;
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: newSubjectName.trim(),
      grades: MONTHS.map(month => ({ month, score: null })),
    };
    setSubjects(prev => [...prev, newSubject]);
    setNewSubjectName('');
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id));
  };

  const handleGradeChange = (subjectId: string, month: string, score: string) => {
    const newScore = score === '' ? null : Math.max(0, Math.min(25, parseFloat(score)));
    setSubjects(prev => 
      prev.map(subject => 
        subject.id === subjectId
          ? {
              ...subject,
              grades: subject.grades.map(grade => 
                grade.month === month ? { ...grade, score: newScore } : grade
              ),
            }
          : subject
      )
    );
  };
  
  const calculateAverage = (grades: (number | null)[]) => {
    const validGrades = grades.filter(g => g !== null) as number[];
    if (validGrades.length === 0) return null;
    const sum = validGrades.reduce((acc, curr) => acc + curr, 0);
    return (sum / validGrades.length).toFixed(1);
  };
  
  const subjectAverages = useMemo(() => {
    const averages: { [key: string]: { s1: string | null, s2: string | null, final: string | null } } = {};
    subjects.forEach(subject => {
        const s1Grades = subject.grades.filter(g => SEMESTER_1_MONTHS.includes(g.month)).map(g => g.score);
        const s2Grades = subject.grades.filter(g => SEMESTER_2_MONTHS.includes(g.month)).map(g => g.score);
        const s1Avg = calculateAverage(s1Grades);
        const s2Avg = calculateAverage(s2Grades);
        const finalAvg = calculateAverage([s1Avg ? parseFloat(s1Avg) : null, s2Avg ? parseFloat(s2Avg) : null]);
        averages[subject.id] = { s1: s1Avg, s2: s2Avg, final: finalAvg };
    });
    return averages;
  }, [subjects]);

  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-gray-500 dark:text-gray-400';
    return score < PASSING_GRADE ? 'text-red-500 font-bold' : 'text-green-600 dark:text-green-400 font-bold';
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Grade de Conteúdos e Notas</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 rounded-tl-lg">Matéria</th>
              {MONTHS.map((month, index) => (
                <th key={month} title={MONTHS_FULL[index]} className="p-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300 cursor-help">{month}</th>
              ))}
              <th className="p-3 text-center text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50">Média 1º Sem</th>
              <th className="p-3 text-center text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50">Média 2º Sem</th>
              <th className="p-3 text-center text-sm font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50">Média Final</th>
              <th className="p-3 rounded-tr-lg"></th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={subject.id} className={`border-b border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
                <td className="p-2 font-medium text-gray-900 dark:text-gray-200">{subject.name}</td>
                {subject.grades.map(grade => (
                  <td key={grade.month} className="p-1.5 text-center">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="25"
                      value={grade.score ?? ''}
                      onChange={e => handleGradeChange(subject.id, grade.month, e.target.value)}
                      className={`w-16 p-1.5 text-center bg-gray-100 dark:bg-gray-700 rounded-md border-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getScoreColor(grade.score)}`}
                    />
                  </td>
                ))}
                <td className={`p-2 text-center font-bold ${getScoreColor(subjectAverages[subject.id].s1 ? parseFloat(subjectAverages[subject.id].s1 as string) : null)}`}>{subjectAverages[subject.id].s1 ?? '-'}</td>
                <td className={`p-2 text-center font-bold ${getScoreColor(subjectAverages[subject.id].s2 ? parseFloat(subjectAverages[subject.id].s2 as string) : null)}`}>{subjectAverages[subject.id].s2 ?? '-'}</td>
                <td className={`p-2 text-center font-bold ${getScoreColor(subjectAverages[subject.id].final ? parseFloat(subjectAverages[subject.id].final as string) : null)}`}>{subjectAverages[subject.id].final ?? '-'}</td>
                <td className="p-2 text-center">
                  <button onClick={() => handleDeleteSubject(subject.id)} className="text-blue-500 dark:text-gray-400 hover:text-red-500 transition-colors">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
          placeholder="Nova matéria"
          className="flex-grow px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
        />
        <button onClick={handleAddSubject} className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
          <PlusIcon className="w-5 h-5" />
          Adicionar Matéria
        </button>
      </div>
    </div>
  );
};

export default SubjectGrid;
