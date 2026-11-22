'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Movie, AiMessage } from '@/lib/types';
import {
  Sparkles,
  Send,
  Trash2,
  Bot,
  User,
  Star,
  Play,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

interface AiChatWidgetProps {
  embedded?: boolean;
}

const SUGGESTED_PROMPTS = [
  'Menga Interstellar kabi filmlar top',
  'Eng yaxshi detektiv kinolarni tavsiya qil',
  'Bugun ko’rishga qiziqarli thriller kerak',
  '2024-yildan keyingi fantastik filmlarni top',
  'Oilam bilan ko’rish uchun filmlar tavsiya qil',
  'Leonardo DiCaprio ishtirokidagi filmlarni top',
  'Menga reytingi yuqori bo’lgan 10 ta kino top',
];

export const AiChatWidget: React.FC<AiChatWidgetProps> = ({ embedded = false }) => {
  const { openTrailer, recordAiQuery } = useStore();
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Assalomu alaykum! Men **Kino uz** sun'iy intellekt yordamchisiman. Sizga bugungi kayfiyatingizga, sevimli janringizga yoki aktyoringizga mos filmlarni tanlab berishim mumkin. Qanday film izlayapsiz?",
      created_at: new Date().toISOString(),
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    const userMsg: AiMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: textToSend,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        throw new Error('AI service error');
      }

      const data = await res.json();
      const botMsg: AiMessage = {
        id: 'bot-' + Date.now(),
        role: 'assistant',
        content: data.reply,
        recommended_movies: data.recommendedMovies || [],
        query_tags: data.queryTags || [],
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
      recordAiQuery();
    } catch (err) {
      console.error(err);
      const fallbackMsg: AiMessage = {
        id: 'bot-' + Date.now(),
        role: 'assistant',
        content:
          "Kechirasiz, qisqa uzilish yuz berdi. Ammo siz yuqoridagi qidiruv panelidan yoki tavsiya etilgan janrlar orqali filmlarni topishingiz mumkin.",
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content:
          "Suhbat tozalandi. Menga yangi kino istaklaringizni yozing yoki quyidagi takliflardan birini tanlang!",
        created_at: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div
      className={`flex flex-col rounded-3xl border border-kinodark-border bg-kinodark-card overflow-hidden shadow-2xl ${
        embedded ? 'h-[640px] w-full' : 'h-[720px] max-w-4xl mx-auto'
      }`}
    >
      {/* AI Chat Header */}
      <div className="flex items-center justify-between border-b border-kinodark-border/80 bg-kinodark-surface/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-kinopurple-primary to-[#7C3AED] shadow-glow-purple">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-base font-bold text-white">
                Kino uz AI Maslahatchisi
              </h3>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                Online
              </span>
            </div>
            <p className="text-xs text-kinotext-muted">
              O'zbek tilida aqlli kino, serial va anime tavsiyalari
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="flex items-center gap-1.5 rounded-xl border border-kinodark-border bg-kinodark-card px-3 py-1.5 text-xs font-medium text-kinotext-muted hover:border-rose-500/40 hover:text-rose-400 transition"
          title="Suhbatni tozalash"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Tozalash</span>
        </button>
      </div>

      {/* Suggested Query Chips */}
      <div className="border-b border-kinodark-border/40 bg-kinodark-bg/40 px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2">
        <span className="text-[11px] font-semibold text-kinotext-muted flex-shrink-0">
          Takliflar:
        </span>
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="flex-shrink-0 rounded-full border border-kinodark-border bg-kinodark-surface px-3 py-1 text-xs text-kinotext-muted hover:border-kinopurple-primary hover:text-kinopurple-secondary hover:bg-kinopurple-primary/10 transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3.5 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-kinopurple-primary/20 text-kinopurple-secondary border border-kinopurple-primary/40">
                <Bot className="h-4 w-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-kinopurple-primary to-[#7C3AED] text-white rounded-br-none shadow-md shadow-kinopurple-primary/20'
                  : 'bg-kinodark-surface border border-kinodark-border text-kinotext-main rounded-bl-none'
              }`}
            >
              {/* Message text with basic markdown formatting */}
              <div className="whitespace-pre-wrap space-y-2">{msg.content}</div>

              {/* Tags if any */}
              {msg.query_tags && msg.query_tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-kinodark-border/60">
                  {msg.query_tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded bg-kinopurple-primary/15 px-2 py-0.5 text-[10px] font-semibold text-kinopurple-secondary"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Recommended Movie Cards Grid */}
              {msg.recommended_movies && msg.recommended_movies.length > 0 && (
                <div className="mt-4 pt-3 border-t border-kinodark-border/60">
                  <p className="text-xs font-bold text-white mb-3 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-kinopurple-secondary" />
                    Tavsiya etilgan filmlar:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {msg.recommended_movies.map((movie) => (
                      <div
                        key={movie.id}
                        className="group flex gap-3 rounded-xl border border-kinodark-border bg-kinodark-card p-2.5 hover:border-kinopurple-primary/60 transition"
                      >
                        <img
                          src={movie.poster_path}
                          alt={movie.title}
                          className="h-20 w-14 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h5 className="font-heading text-xs font-bold text-white truncate group-hover:text-kinopurple-secondary transition">
                              {movie.title}
                            </h5>
                            <div className="flex items-center gap-2 text-[11px] text-kinotext-muted mt-1">
                              <span>{movie.release_date.substring(0, 4)}</span>
                              <span>•</span>
                              <span className="flex items-center gap-0.5 text-amber-400 font-semibold">
                                <Star className="h-3 w-3 fill-current" />
                                {movie.vote_average.toFixed(1)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <Link
                              href={`/movie/${movie.id}`}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-kinopurple-secondary hover:underline"
                            >
                              Ko'rish <ArrowRight className="h-3 w-3" />
                            </Link>
                            {movie.trailer_key && (
                              <button
                                onClick={() => openTrailer(movie.trailer_key!)}
                                className="text-[11px] text-kinotext-muted hover:text-white flex items-center gap-0.5"
                                title="Treylerni ochish"
                              >
                                <Play className="h-2.5 w-2.5 fill-current" /> Treyler
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-kinodark-surface text-kinotext-muted border border-kinodark-border">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3.5 justify-start">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-kinopurple-primary/20 text-kinopurple-secondary border border-kinopurple-primary/40">
              <Bot className="h-4 w-4 animate-spin" />
            </div>
            <div className="rounded-2xl rounded-bl-none bg-kinodark-surface border border-kinodark-border p-4 text-xs text-kinotext-muted flex items-center gap-2">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-kinopurple-primary" />
              <span>AI kinolarni tahlil qilmoqda va mos tavsiyalarni tayyorlamoqda...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="border-t border-kinodark-border/80 bg-kinodark-surface/60 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="O'zbek tilida yozing (masalan: Menga Kris Nolan filmlariga o'xshash kino top)..."
            className="flex-1 rounded-2xl border border-kinodark-border bg-kinodark-card px-4 py-3 text-sm text-kinotext-main placeholder-kinotext-muted/60 focus:border-kinopurple-primary focus:outline-none focus:ring-1 focus:ring-kinopurple-primary"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-kinopurple-primary to-[#7C3AED] text-white shadow-lg shadow-kinopurple-primary/30 hover:brightness-110 disabled:opacity-50 transition"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiChatWidget;
