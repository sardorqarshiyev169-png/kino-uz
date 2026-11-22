'use client';

import React from 'react';
import AiChatWidget from '@/components/AiChatWidget';
import { Sparkles, Brain, Compass, MessageSquare } from 'lucide-react';

export default function AiAssistantPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-6 text-center space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-kinopurple-primary/20 border border-kinopurple-primary/40 px-4 py-1 text-xs font-bold text-kinopurple-secondary">
          <Sparkles className="h-4 w-4 text-kinopurple-primary animate-pulse" />
          Kino uz Intellektual Tizimi
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight">
          AI Kino Maslahatchisi
        </h1>
        <p className="text-sm text-kinotext-muted max-w-xl mx-auto">
          Kayfiyatingiz, sevimli aktyoringiz yoki ko'rmoqchi bo'lgan janringiz haqida o'zbek tilida erkin so'rang. Sun'iy intellekt sizga eng sara filmlarni sababi bilan tushuntirib beradi.
        </p>
      </div>

      {/* Main AI Chatbot Component */}
      <AiChatWidget embedded={false} />
    </div>
  );
}
