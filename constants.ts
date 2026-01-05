
import { Exercise } from './types';

export const EXERCISES: Exercise[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Exercício ${i + 1}: ${['Polichinelo', 'Agachamento', 'Prancha', 'Flexão', 'Burpee', 'Avanço', 'Abdominal', 'Pular Corda', 'Escalador', 'Elevação de Quadril'][i % 10]}`,
  reps: '3 séries de 15',
  duration: '45 segundos',
  category: i % 3 === 0 ? 'Cardio' : i % 3 === 1 ? 'Força' : 'Alongamento',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
}));

export const MOTIVATIONAL_QUOTES = [
  "O único treino ruim é aquele que não aconteceu.",
  "Sua saúde é um investimento, não uma despespa.",
  "Não pare até se orgulhar.",
  "A disciplina é a ponte entre metas e realizações.",
  "Grandes coisas nunca vêm de zonas de conforto."
];

export const FAQ_DATA = [
  {
    q: "Preciso de equipamentos?",
    a: "Não! Todos os exercícios foram desenhados para serem feitos apenas com o peso do corpo."
  },
  {
    q: "Qual o melhor horário para treinar?",
    a: "O melhor horário é aquele em que você consegue manter a constância, seja de manhã ou à noite."
  },
  {
    q: "Posso pular um dia?",
    a: "O ideal é manter a sequência, mas se precisar parar, retome exatamente de onde parou no dia seguinte."
  }
];

export const EBOOK_CHAPTERS = [
  { id: 1, title: 'Introdução', desc: 'Boas-vindas e mentalidade correta.' },
  { id: 2, title: 'Capítulo 1 – Preparando o corpo', desc: 'Aquecimento e mobilidade.' },
  { id: 3, title: 'Capítulo 2 – 30 Exercícios Simples', desc: 'Detalhes técnicos de cada movimento.' },
  { id: 4, title: 'Capítulo 3 – Plano Semanal de Exercícios', desc: 'Como organizar sua rotina.' },
  { id: 5, title: 'Capítulo 4 – Dicas de Nutrição', desc: 'O que comer para acelerar resultados.' },
  { id: 6, title: 'Capítulo 5 – Acompanhamento do Progresso', desc: 'Como medir seus avanços.' }
];
