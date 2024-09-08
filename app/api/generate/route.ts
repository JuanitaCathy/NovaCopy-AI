import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON request
    const { prompt, tone, format } = await request.json();

    // Forward the request to the FastAPI backend
    const response = await fetch('http://127.0.0.1:8000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt, 
        tone,   
        format,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from backend');
    }
    
    // Assuming backend sends data in { "generated_text": "..." } format
    const data = await response.json(); 
    return NextResponse.json(data);  // Ensure the response is passed back correctly
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate text' }, { status: 500 });
  }
}
