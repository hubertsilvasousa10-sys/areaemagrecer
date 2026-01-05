
import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
// Added TrendingUp to the imports from lucide-react
import { Ruler, Scale, Percent, Camera, Plus, TrendingDown, TrendingUp, Target } from 'lucide-react';
import { UserProgress, WeightEntry } from '../types';

interface ResultsViewProps {
  progress: UserProgress;
  setProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

const ResultsView: React.FC<ResultsViewProps> = ({ progress, setProgress }) => {
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [bodyFat, setBodyFat] = useState('');

  const addEntry = () => {
    const val = parseFloat(weight);
    if (isNaN(val)) return;

    const newEntry: WeightEntry = {
      date: new Date().toISOString().split('T')[0],
      weight: val,
      waist: waist ? parseFloat(waist) : undefined,
      bodyFat: bodyFat ? parseFloat(bodyFat) : undefined
    };

    setProgress(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        weightHistory: [...prev.weightHistory, newEntry]
      };
    });

    setWeight('');
    setWaist('');
    setBodyFat('');
  };

  const chartData = progress.weightHistory.map(entry => ({
    name: entry.date.split('-').reverse().slice(0,2).join('/'),
    peso: entry.weight
  }));

  const hasHistory = progress.weightHistory.length > 0;
  const lastWeight = hasHistory ? progress.weightHistory[progress.weightHistory.length - 1].weight : 0;
  const firstWeight = hasHistory ? progress.weightHistory[0].weight : 0;
  const lost = hasHistory ? (firstWeight - lastWeight).toFixed(1) : "0";

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border shadow-sm text-center">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Scale size={24} />
          </div>
          <p className="text-slate-500 text-sm">Peso Atual</p>
          <p className="text-2xl font-bold text-slate-800">{hasHistory ? `${lastWeight} kg` : '--'}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm text-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingDown size={24} />
          </div>
          <p className="text-slate-500 text-sm">Eliminado</p>
          <p className="text-2xl font-bold text-green-600">{lost} kg</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm text-center">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Ruler size={24} />
          </div>
          <p className="text-slate-500 text-sm">Cintura</p>
          <p className="text-2xl font-bold text-slate-800">{hasHistory && progress.weightHistory[progress.weightHistory.length-1].waist ? `${progress.weightHistory[progress.weightHistory.length-1].waist} cm` : '--'}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm text-center">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Percent size={24} />
          </div>
          <p className="text-slate-500 text-sm">Gordura Corp.</p>
          <p className="text-2xl font-bold text-slate-800">{hasHistory && progress.weightHistory[progress.weightHistory.length-1].bodyFat ? `${progress.weightHistory[progress.weightHistory.length-1].bodyFat}%` : '--'}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Target className="text-orange-500" /> Registrar Minhas Métricas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Meu Peso (kg)</label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 ring-orange-100" 
              placeholder="00.0" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Cintura (cm)</label>
            <input 
              type="number" 
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 ring-orange-100" 
              placeholder="opcional" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Gordura (%)</label>
            <input 
              type="number" 
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 ring-orange-100" 
              placeholder="opcional" 
            />
          </div>
          <button 
            onClick={addEntry}
            className="bg-orange-600 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-100"
          >
            <Plus size={20} /> Salvar Métricas
          </button>
        </div>
      </div>

      {hasHistory ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Minha Evolução</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                  />
                  <Area type="monotone" dataKey="peso" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorPeso)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
              <Camera size={40} />
            </div>
            <h3 className="font-bold text-slate-800">Fotos de Progresso</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">As fotos são fundamentais para ver a mudança estética que a balança não mostra.</p>
            <button className="w-full py-3 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold hover:bg-slate-100 transition-all">
              Adicionar Fotos
            </button>
          </div>
        </div>
      ) : (
        <div className="p-20 bg-white rounded-3xl border-2 border-dashed text-center space-y-4">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
            <TrendingUp size={32} />
          </div>
          <div className="max-w-xs mx-auto">
            <p className="font-bold text-slate-700">Ainda não há dados</p>
            <p className="text-sm text-slate-500">Faça seu primeiro registro acima para começar a visualizar seu gráfico de evolução.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsView;
