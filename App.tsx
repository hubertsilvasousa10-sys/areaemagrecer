
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Dumbbell, 
  CheckSquare, 
  Gift, 
  LifeBuoy, 
  TrendingUp, 
  Menu, 
  X,
  LogOut,
  User,
  Mail
} from 'lucide-react';
import { AppRoute, UserProgress } from './types';
import Dashboard from './views/Dashboard';
import EbookView from './views/EbookView';
import ExercisePlan from './views/ExercisePlan';
import TrackingView from './views/TrackingView';
import BonusesView from './views/BonusesView';
import SupportView from './views/SupportView';
import ResultsView from './views/ResultsView';

const STORAGE_KEY = 'emagrecimento_progresso_v1';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState<UserProgress | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [userNameInput, setUserNameInput] = useState('');
  const [userEmailInput, setUserEmailInput] = useState('');

  // Persistence
  useEffect(() => {
    if (progress) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  const handleStartJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userNameInput.trim() || !userEmailInput.trim()) return;
    
    const newProgress: UserProgress = {
      name: userNameInput,
      email: userEmailInput,
      startDate: new Date().toISOString(),
      completedDays: [],
      completedExercises: [],
      weightHistory: [],
      foodLog: [],
      lastLogin: new Date().toISOString()
    };
    setProgress(newProgress);
  };

  const handleResetApp = () => {
    if (confirm("Isso apagará todo o progresso atual para que uma nova pessoa possa começar com seus próprios dados. Tem certeza?")) {
      localStorage.removeItem(STORAGE_KEY);
      setProgress(null);
      setCurrentRoute(AppRoute.DASHBOARD);
    }
  };

  if (!progress) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center space-y-6 border border-slate-100 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-200">
            <Dumbbell size={40} className="text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-800">Crie seu Acesso</h1>
            <p className="text-slate-500">Inicie sua jornada personalizada de 30 dias.</p>
          </div>
          <form onSubmit={handleStartJourney} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Nome Completo" 
                  value={userNameInput}
                  onChange={(e) => setUserNameInput(e.target.value)}
                  className="w-full p-4 pl-12 bg-slate-50 border rounded-2xl outline-none focus:ring-2 ring-orange-200 transition-all font-semibold text-slate-700"
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  value={userEmailInput}
                  onChange={(e) => setUserEmailInput(e.target.value)}
                  className="w-full p-4 pl-12 bg-slate-50 border rounded-2xl outline-none focus:ring-2 ring-orange-200 transition-all font-semibold text-slate-700"
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100"
            >
              Iniciar Minha Jornada
            </button>
          </form>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Área de Membros Individualizada
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: AppRoute.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppRoute.EBOOK, label: 'E-book', icon: BookOpen },
    { id: AppRoute.EXERCISES, label: 'Plano de Treino', icon: Dumbbell },
    { id: AppRoute.TRACKING, label: 'Checklists', icon: CheckSquare },
    { id: AppRoute.RESULTS, label: 'Meus Resultados', icon: TrendingUp },
    { id: AppRoute.BONUSES, label: 'Bônus VIP', icon: Gift },
    { id: AppRoute.SUPPORT, label: 'Suporte', icon: LifeBuoy },
  ];

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.DASHBOARD: return <Dashboard progress={progress} setRoute={setCurrentRoute} />;
      case AppRoute.EBOOK: return <EbookView />;
      case AppRoute.EXERCISES: return <ExercisePlan progress={progress} setProgress={setProgress} />;
      case AppRoute.TRACKING: return <TrackingView progress={progress} setProgress={setProgress} />;
      case AppRoute.RESULTS: return <ResultsView progress={progress} setProgress={setProgress} />;
      case AppRoute.BONUSES: return <BonusesView progress={progress} />;
      case AppRoute.SUPPORT: return <SupportView />;
      default: return <Dashboard progress={progress} setRoute={setCurrentRoute} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <header className="md:hidden bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Dumbbell size={18} className="text-white" />
          </div>
          <span className="font-bold text-slate-800">Emagrecimento</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-slate-600">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="p-6 border-b hidden md:flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
            <Dumbbell size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 leading-tight">Emagrecimento</h1>
            <p className="text-xs text-slate-400">Área de Membros</p>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentRoute(item.id);
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${currentRoute === item.id 
                  ? 'bg-orange-50 text-orange-600 font-semibold shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
              `}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-slate-50/50 space-y-3">
          <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
              <User size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-700 truncate leading-none mb-1">{progress.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{progress.email}</p>
            </div>
          </div>
          <button 
            onClick={handleResetApp}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all border border-red-100"
          >
            <LogOut size={14} /> Sair / Nova Pessoa
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen relative">
        <div className="max-w-6xl mx-auto p-4 md:p-8 pb-24 md:pb-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
