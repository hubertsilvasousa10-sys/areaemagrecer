
import React, { useState } from 'react';
import { Utensils, ClipboardCheck, Plus, Apple, Pizza, Trash2 } from 'lucide-react';
import { UserProgress, FoodLog } from '../types';

interface TrackingViewProps {
  progress: UserProgress;
  setProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

const TrackingView: React.FC<TrackingViewProps> = ({ progress, setProgress }) => {
  const [mealType, setMealType] = useState('Café da Manhã');
  const [description, setDescription] = useState('');
  const [isHealthy, setIsHealthy] = useState(true);

  const today = new Date().toISOString().split('T')[0];

  const addMeal = () => {
    if (!description.trim()) return;

    setProgress(prev => {
      const existingLogIndex = prev.foodLog.findIndex(log => log.date === today);
      const newMeal = { type: mealType, description, healthy: isHealthy };

      if (existingLogIndex >= 0) {
        const newLog = [...prev.foodLog];
        newLog[existingLogIndex].meals.push(newMeal);
        return { ...prev, foodLog: newLog };
      } else {
        return { 
          ...prev, 
          foodLog: [...prev.foodLog, { date: today, meals: [newMeal] }] 
        };
      }
    });

    setDescription('');
  };

  const removeMeal = (date: string, index: number) => {
    setProgress(prev => ({
      ...prev,
      foodLog: prev.foodLog.map(log => {
        if (log.date === date) {
          return { ...log, meals: log.meals.filter((_, i) => i !== index) };
        }
        return log;
      })
    }));
  };

  const todaysLog = progress.foodLog.find(l => l.date === today);

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-white p-6 rounded-3xl border shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Utensils className="text-orange-500" />
          Diário Alimentar
        </h1>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select 
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="p-3 bg-slate-50 border rounded-xl focus:ring-2 ring-orange-200 outline-none"
            >
              <option>Café da Manhã</option>
              <option>Lanche da Manhã</option>
              <option>Almoço</option>
              <option>Lanche da Tarde</option>
              <option>Jantar</option>
              <option>Ceia</option>
            </select>
            <input 
              type="text" 
              placeholder="O que você comeu?" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="md:col-span-2 p-3 bg-slate-50 border rounded-xl focus:ring-2 ring-orange-200 outline-none"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <label className={`
                flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer border transition-all
                ${isHealthy ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-100'}
              `}>
                <input type="radio" checked={isHealthy} onChange={() => setIsHealthy(true)} className="hidden" />
                <Apple size={18} /> Saudável
              </label>
              <label className={`
                flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer border transition-all
                ${!isHealthy ? 'bg-red-50 border-red-200 text-red-700' : 'bg-slate-50 border-slate-100'}
              `}>
                <input type="radio" checked={!isHealthy} onChange={() => setIsHealthy(false)} className="hidden" />
                <Pizza size={18} /> Escape
              </label>
            </div>
            <button 
              onClick={addMeal}
              className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-orange-100"
            >
              <Plus size={20} /> Adicionar
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <ClipboardCheck className="text-green-500" />
          Registros de Hoje ({today})
        </h2>
        
        {todaysLog && todaysLog.meals.length > 0 ? (
          <div className="space-y-3">
            {todaysLog.meals.map((meal, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${meal.healthy ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {meal.healthy ? <Apple size={20} /> : <Pizza size={20} />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">{meal.type}</p>
                    <p className="font-semibold text-slate-700">{meal.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeMeal(today, idx)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all md:opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 border-2 border-dashed rounded-3xl text-center text-slate-400">
            Nenhuma refeição registrada para hoje.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-3xl text-white shadow-xl">
          <h3 className="text-lg font-bold mb-2">Dica de Refeição</h3>
          <p className="text-emerald-50 opacity-90 text-sm leading-relaxed">
            Tente incluir uma fonte de proteína em todas as suas refeições. Isso ajuda na saciedade e manutenção da massa muscular durante o processo de emagrecimento.
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <h3 className="font-bold text-slate-800 mb-2">Meta de Água</h3>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <button key={i} className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
                💧
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">Clique nos copos conforme beber água hoje.</p>
        </div>
      </div>
    </div>
  );
};

export default TrackingView;
