
import React from 'react';
import { Download, FileText, ChevronRight, Bookmark } from 'lucide-react';
import { EBOOK_CHAPTERS } from '../constants';

const EbookView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl border shadow-sm">
        <div className="w-48 h-64 bg-gradient-to-b from-orange-400 to-orange-600 rounded-xl shadow-xl flex flex-col items-center justify-center p-6 text-white text-center">
          <Bookmark size={48} className="mb-4" />
          <p className="font-bold text-lg">Emagrecimento em Casa</p>
          <div className="w-8 h-1 bg-white/30 my-4 rounded"></div>
          <p className="text-xs opacity-80 uppercase tracking-widest">Guia Oficial</p>
        </div>
        
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-slate-800">E-book Completo</h1>
          <p className="text-slate-500 max-w-lg leading-relaxed">
            Tenha acesso ao manual definitivo com todas as técnicas, planos alimentares e exercícios detalhados para transformar seu corpo em 30 dias.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200">
              <Download size={20} />
              Baixar PDF (12MB)
            </button>
            <button className="flex items-center gap-2 border border-slate-200 px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              Ler Online
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <FileText size={20} className="text-orange-500" />
          Sumário Interativo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EBOOK_CHAPTERS.map((chapter) => (
            <div 
              key={chapter.id} 
              className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-700 group-hover:text-orange-600 transition-colors">{chapter.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{chapter.desc}</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="mt-4 flex gap-2">
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase font-bold">Conteúdo</span>
                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded uppercase font-bold">Lido</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
        <h3 className="font-bold text-orange-800 mb-2">💡 Dica de Leitura</h3>
        <p className="text-orange-700 text-sm">
          Recomendamos ler os capítulos 1 e 2 antes de iniciar qualquer atividade física. Eles contêm informações cruciais sobre segurança e postura.
        </p>
      </div>
    </div>
  );
};

export default EbookView;
