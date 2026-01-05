
import React from 'react';
/* Added CheckSquare to imports */
import { Trophy, Clock, Target, ArrowRight, Quote, CheckSquare } from 'lucide-react';
import { AppRoute, UserProgress } from '../types';
import { MOTIVATIONAL_QUOTES } from '../constants';

interface DashboardProps {
  progress: UserProgress;
  setRoute: (r: AppRoute) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ progress, setRoute }) => {
  const percentage = Math.min(100, Math.round((progress.completedDays.length / 30) * 100));
  const dailyQuote = MOTIVATIONAL_QUOTES[new Date().getDate() % MOTIVATIONAL_QUOTES.length];

  const quickLinks = [
    { route: AppRoute.EBOOK, label: 'Baixar E-book', color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { route: AppRoute.EXERCISES, label: 'Treino do Dia', color: 'bg-orange-50 text-orange-600 border-orange-100' },
    { route: AppRoute.RESULTS, label: 'Lançar Peso', color: 'bg-green-50 text-green-600 border-green-100' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Olá, {progress.name}! 👋</h1>
          <p className="text-slate-500 mt-1">Bem-vindo(a) à sua jornada de transformação.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full border shadow-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-slate-600">Jornada 30 Dias Ativa</span>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" />
            Seu Progresso Atual
          </h2>
          <span className="text-slate-400 text-sm">{progress.completedDays.length}/30 Dias</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-4 mb-6 relative overflow-hidden">
          <div 
            className="bg-gradient-to-r from-orange-400 to-orange-600 h-full transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Target size={20} /></div>
            <div>
              <p className="text-xs text-slate-500">Meta</p>
              <p className="font-bold text-slate-700">30 Dias</p>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg"><CheckSquare size={20} /></div>
            <div>
              <p className="text-xs text-slate-500">Concluído</p>
              <p className="font-bold text-slate-700">{progress.completedDays.length} Dias</p>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Clock size={20} /></div>
            <div>
              <p className="text-xs text-slate-500">Faltam</p>
              <p className="font-bold text-slate-700">{30 - progress.completedDays.length} Dias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickLinks.map((link, idx) => (
          <button
            key={idx}
            onClick={() => setRoute(link.route)}
            className={`p-4 border rounded-xl flex items-center justify-between group transition-all hover:shadow-md ${link.color}`}
          >
            <span className="font-semibold">{link.label}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        ))}
      </div>

      {/* Motivation Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <Quote className="opacity-20 mb-4" size={40} />
          <h3 className="text-xl md:text-2xl font-medium italic leading-relaxed mb-4">
            "{dailyQuote}"
          </h3>
          <p className="text-indigo-100 text-sm">— Motivação do Dia</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </div>

      {/* Challenge Calendar (Simplified) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="font-bold text-lg text-slate-800 mb-4">Desafios Semanais</h2>
        <div className="space-y-3">
          {[
            { title: 'Semana 1: O Começo', task: 'Complete 4 treinos de cardio', status: 'Em andamento' },
            { title: 'Semana 2: Foco Total', task: 'Não pule nenhuma refeição saudável', status: 'Bloqueado' }
          ].map((challenge, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-xl">
              <div>
                <p className="font-bold text-slate-700">{challenge.title}</p>
                <p className="text-sm text-slate-500">{challenge.task}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${i === 0 ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-400'}`}>
                {challenge.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
