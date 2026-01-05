
import React, { useState } from 'react';
import { LifeBuoy, Mail, MessageCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { FAQ_DATA } from '../constants';

const SupportView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Contact Form */}
        <div className="flex-1 bg-white p-8 rounded-3xl border shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Mail className="text-orange-500" />
            Envie sua dúvida
          </h2>
          
          {submitted ? (
            <div className="bg-green-50 p-8 rounded-2xl border border-green-100 text-center animate-in zoom-in">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={32} />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Mensagem Enviada!</h3>
              <p className="text-green-700">Responderemos em até 24 horas úteis no seu e-mail cadastrado.</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-green-600 font-bold hover:underline">Enviar outra mensagem</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Assunto</label>
                <select className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 ring-orange-100">
                  <option>Dúvida sobre os exercícios</option>
                  <option>Ajuda técnica / Acesso</option>
                  <option>Sugestões</option>
                  <option>Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Mensagem</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="Descreva como podemos te ajudar..."
                  className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 ring-orange-100"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
              >
                <Send size={20} /> Enviar Mensagem
              </button>
            </form>
          )}
        </div>

        {/* Channels */}
        <div className="w-full md:w-80 space-y-4">
          <div className="bg-green-600 p-6 rounded-3xl text-white shadow-lg flex flex-col items-center text-center">
            <MessageCircle size={40} className="mb-4" />
            <h3 className="font-bold text-lg">WhatsApp VIP</h3>
            <p className="text-green-100 text-sm mb-6">Suporte imediato via chat com nossos especialistas.</p>
            <button className="w-full py-3 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all">
              Chamar Agora
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border shadow-sm flex flex-col items-center text-center">
            <LifeBuoy size={40} className="mb-4 text-slate-300" />
            <h3 className="font-bold text-slate-800">Horário de Atendimento</h3>
            <p className="text-slate-500 text-sm">Segunda a Sexta<br/>09h às 18h</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white p-8 rounded-3xl border shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">Dúvidas Frequentes</h2>
        <div className="space-y-4">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="border-b last:border-0 pb-4 last:pb-0">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between text-left group"
              >
                <span className="font-bold text-slate-700 group-hover:text-orange-600 transition-colors">{item.q}</span>
                {openFaq === i ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
              </button>
              {openFaq === i && (
                <div className="mt-4 text-slate-500 text-sm leading-relaxed animate-in slide-in-from-top-1">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportView;
