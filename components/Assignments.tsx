
import React, { useState } from 'react';
import { Assignment } from '../types';
import { PlusIcon, TrashIcon, CheckIcon } from './icons';

interface AssignmentsProps {
  assignments: Assignment[];
  setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
  subjects: string[];
}

const Assignments: React.FC<AssignmentsProps> = ({ assignments, setAssignments, subjects }) => {
  const [newAssignment, setNewAssignment] = useState({ title: '', subject: subjects[0] || '', dueDate: '' });

  const handleAddAssignment = () => {
    if (!newAssignment.title || !newAssignment.subject || !newAssignment.dueDate) return;
    const newEntry: Assignment = {
      id: Date.now().toString(),
      ...newAssignment,
      completed: false,
    };
    setAssignments(prev => [...prev, newEntry].sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
    setNewAssignment({ title: '', subject: subjects[0] || '', dueDate: '' });
  };
  
  const toggleComplete = (id: string) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a));
  };
  
  const deleteAssignment = (id: string) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg h-full">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Trabalhos e Apresentações</h3>
      
      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-2">
        {assignments.map(assignment => (
          <div key={assignment.id} className={`flex items-center p-3 rounded-lg transition-all ${assignment.completed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
            <button onClick={() => toggleComplete(assignment.id)} className={`mr-3 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${assignment.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}>
              {assignment.completed && <CheckIcon className="w-4 h-4 text-white" />}
            </button>
            <div className="flex-grow">
              <p className={`font-semibold ${assignment.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>{assignment.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{assignment.subject} - <span className="font-medium">Entrega: {new Date(assignment.dueDate + 'T00:00:00-03:00').toLocaleDateString('pt-BR')}</span></p>
            </div>
            <button onClick={() => deleteAssignment(assignment.id)} className="ml-2 text-blue-500 dark:text-gray-400 hover:text-red-500 transition-colors">
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
        {assignments.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-4">Nenhum trabalho adicionado.</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
        <input type="text" placeholder="Título do trabalho" value={newAssignment.title} onChange={e => setNewAssignment(p => ({...p, title: e.target.value}))} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
        <select value={newAssignment.subject} onChange={e => setNewAssignment(p => ({...p, subject: e.target.value}))} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200">
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input type="date" value={newAssignment.dueDate} onChange={e => setNewAssignment(p => ({...p, dueDate: e.target.value}))} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
        <button onClick={handleAddAssignment} className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
          <PlusIcon className="w-5 h-5"/> Adicionar
        </button>
      </div>
    </div>
  );
};

export default Assignments;
