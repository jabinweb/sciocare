import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Log the incoming request for debugging
    console.log('Proxying form submission:', body);
    
    // Make the request to the external API
    const response = await fetch('https://www.sciolabs.in/api/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('External API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('External API error:', errorText);
      return NextResponse.json(
        { success: false, error: `External API error: ${response.status}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('External API response:', result);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Proxy API error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
