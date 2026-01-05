
import React, { useState } from 'react';
import { Calendar, CheckCircle2, PlayCircle, Lock, Info } from 'lucide-react';
import { EXERCISES } from '../constants';
import { UserProgress } from '../types';

interface ExercisePlanProps {
  progress: UserProgress;
  setProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

const ExercisePlan: React.FC<ExercisePlanProps> = ({ progress, setProgress }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const toggleDayCompletion = (day: number) => {
    setProgress(prev => {
      const isCompleted = prev.completedDays.includes(day);
      return {
        ...prev,
        completedDays: isCompleted 
          ? prev.completedDays.filter(d => d !== day) 
          : [...prev.completedDays, day]
      };
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Plano de 30 Dias</h1>
          <p className="text-slate-500">Cada dia um novo degrau para sua melhor versão.</p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
            <div className="w-3 h-3 bg-white border rounded"></div> Disponível
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-orange-600">
            <div className="w-3 h-3 bg-orange-500 rounded"></div> Concluído
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-3">
        {Array.from({ length: 30 }, (_, i) => {
          const day = i + 1;
          const isCompleted = progress.completedDays.includes(day);
          const isLocked = day > progress.completedDays.length + 1 && !isCompleted;
          
          return (
            <button
              key={day}
              disabled={isLocked}
              onClick={() => setSelectedDay(day)}
              className={`
                aspect-square rounded-xl flex flex-col items-center justify-center gap-1 border transition-all relative overflow-hidden
                ${isCompleted ? 'bg-orange-500 border-orange-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:border-orange-300'}
                ${isLocked ? 'opacity-40 grayscale cursor-not-allowed bg-slate-100' : ''}
              `}
            >
              {isLocked ? <Lock size={16} /> : <span className="text-lg font-bold">{day}</span>}
              <span className="text-[10px] uppercase font-bold opacity-60">Dia</span>
              {isCompleted && <CheckCircle2 size={12} className="absolute top-1 right-1" />}
            </button>
          );
        })}
      </div>

      {selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Dia {selectedDay}</h2>
                <p className="text-orange-600 font-medium">{EXERCISES[selectedDay-1].category}</p>
              </div>
              <button 
                onClick={() => setSelectedDay(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <Lock size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="aspect-video bg-slate-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
                <iframe 
                  className="w-full h-full"
                  src={EXERCISES[selectedDay-1].videoUrl} 
                  title="Video"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                  <p className="text-xs text-orange-600 font-bold uppercase mb-1">Repetições</p>
                  <p className="text-lg font-bold text-slate-800">{EXERCISES[selectedDay-1].reps}</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                  <p className="text-xs text-blue-600 font-bold uppercase mb-1">Duração</p>
                  <p className="text-lg font-bold text-slate-800">{EXERCISES[selectedDay-1].duration}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border flex gap-3">
                <Info className="text-slate-400 shrink-0" size={20} />
                <p className="text-sm text-slate-600 italic">
                  Foque na execução correta. Se sentir dor aguda, pare imediatamente e consulte um médico.
                </p>
              </div>
            </div>

            <div className="p-6 border-t bg-slate-50 flex gap-3">
              <button 
                onClick={() => {
                  toggleDayCompletion(selectedDay);
                  setSelectedDay(null);
                }}
                className={`
                  flex-1 py-4 rounded-xl font-bold transition-all shadow-lg
                  ${progress.completedDays.includes(selectedDay) 
                    ? 'bg-slate-200 text-slate-600' 
                    : 'bg-orange-600 text-white shadow-orange-200 hover:bg-orange-700'}
                `}
              >
                {progress.completedDays.includes(selectedDay) ? 'Marcar como não feito' : 'Concluir Dia de Treino'}
              </button>
              <button 
                onClick={() => setSelectedDay(null)}
                className="px-6 py-4 bg-white border rounded-xl font-bold text-slate-600 hover:bg-slate-100"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="p-6 bg-white border rounded-2xl shadow-sm">
          <h3 className="font-bold text-slate-800 mb-2">Cardio</h3>
          <p className="text-sm text-slate-500">Treinos para queima calórica e resistência.</p>
        </div>
        <div className="p-6 bg-white border rounded-2xl shadow-sm">
          <h3 className="font-bold text-slate-800 mb-2">Força</h3>
          <p className="text-sm text-slate-500">Tonificação muscular e aceleração metabólica.</p>
        </div>
        <div className="p-6 bg-white border rounded-2xl shadow-sm">
          <h3 className="font-bold text-slate-800 mb-2">Alongamento</h3>
          <p className="text-sm text-slate-500">Mobilidade e recuperação muscular.</p>
        </div>
      </div>
    </div>
  );
};

export default ExercisePlan;
