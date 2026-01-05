
import React, { useState, useEffect } from 'react';
import { Gift, Sparkles, Coffee, Timer, FileDown, Lock, Unlock } from 'lucide-react';
import { UserProgress } from '../types';

interface BonusesViewProps {
  progress: UserProgress;
}

const BonusesView: React.FC<BonusesViewProps> = ({ progress }) => {
  const [daysRemaining, setDaysRemaining] = useState<number>(7);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const checkUnlock = () => {
      const start = new Date(progress.startDate).getTime();
      const now = new Date().getTime();
      const diffTime = now - start;
      const diffDays = diffTime / (1000 * 3600 * 24);
      
      const remaining = 7 - diffDays;
      setDaysRemaining(Math.max(0, Math.ceil(remaining)));
      setIsUnlocked(diffDays >= 7);
    };

    checkUnlock();
    const interval = setInterval(checkUnlock, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [progress.startDate]);

  const bonuses = [
    {
      title: 'Guia de Alimentação Saudável',
      desc: 'Receitas práticas e baratas para o dia a dia acelerado.',
      icon: Coffee,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Exercícios de Recuperação',
      desc: 'Série de alongamentos para evitar dores pós-treino.',
      icon: Timer,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Planner de Resultados',
      desc: 'Documento PDF para impressão e registro manual.',
      icon: FileDown,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      title: 'Workshop Queima Turbo',
      desc: 'Aula exclusiva em vídeo com técnicas de alta intensidade.',
      icon: Sparkles,
      color: 'bg-purple-100 text-purple-600',
    }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-top-4 duration-500">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className={`inline-flex p-4 rounded-full transition-all duration-700 ${isUnlocked ? 'bg-green-100 text-green-600 animate-bounce' : 'bg-orange-100 text-orange-600'}`}>
          {isUnlocked ? <Unlock size={32} /> : <Gift size={32} />}
        </div>
        <h1 className="text-3xl font-bold text-slate-800">Seus Bônus Especiais</h1>
        <p className="text-slate-500">
          {isUnlocked 
            ? "Parabéns por completar sua primeira semana! Todo o conteúdo extra está liberado."
            : "Como prova do seu compromisso, liberamos os bônus após seus primeiros 7 dias de jornada."
          }
        </p>
        
        {!isUnlocked && (
          <div className="inline-block bg-orange-50 border border-orange-200 px-6 py-2 rounded-full">
            <p className="text-orange-700 font-bold text-sm flex items-center gap-2">
              <Timer size={16} /> Desbloqueia em {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bonuses.map((bonus, idx) => (
          <div 
            key={idx} 
            className={`
              relative p-8 rounded-3xl border transition-all duration-300
              ${!isUnlocked ? 'bg-slate-50 opacity-75 grayscale' : 'bg-white hover:shadow-2xl hover:-translate-y-1 border-slate-100'}
            `}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl ${bonus.color}`}>
                  <bonus.icon size={28} />
                </div>
                {!isUnlocked && (
                  <div className="p-2 bg-slate-200 text-slate-500 rounded-full">
                    <Lock size={16} />
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <h3 className="font-bold text-slate-800 text-xl">{bonus.title}</h3>
                <p className="text-slate-500 leading-relaxed">{bonus.desc}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50">
                {isUnlocked ? (
                  <button className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-slate-200">
                    <FileDown size={18} /> Baixar Conteúdo
                  </button>
                ) : (
                  <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Aguarde o desbloqueio
                  </div>
                )}
              </div>
            </div>
            
            {isUnlocked && (
              <div className="absolute top-4 right-4 text-orange-400 opacity-20 animate-pulse">
                <Sparkles size={40} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 p-8 rounded-3xl text-white overflow-hidden relative shadow-2xl shadow-indigo-100">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Dica de Especialista</h2>
          <p className="text-indigo-100 mb-6 max-w-md leading-relaxed">
            Use os primeiros 7 dias para focar 100% na técnica dos exercícios. Quando os bônus chegarem, seu corpo estará pronto para o próximo nível.
          </p>
        </div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default BonusesView;
