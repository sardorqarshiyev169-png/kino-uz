import { NextRequest, NextResponse } from 'next/server';
import { processUzbekMovieQuery, getOpenAiRecommendation } from '@/lib/ai-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, history } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Try OpenAI API first if key configured
    let result = null;
    if (process.env.OPENAI_API_KEY) {
      result = await getOpenAiRecommendation(prompt, history || []);
    }

    // Gracefully fallback to built-in Uzbek semantic movie recommendation engine
    if (!result) {
      result = processUzbekMovieQuery(prompt, history || []);
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('AI Recommend API error:', err);
    return NextResponse.json(
      { error: 'Internal server error', details: err.message },
      { status: 500 }
    );
  }
}
