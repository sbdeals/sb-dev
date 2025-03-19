import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            fontSize: 128,
            background: 'linear-gradient(to bottom, white, #f9fafb)',
            width: '100%',
            height: '100%',
            padding: '50px',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '30px',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="120"
              height="120"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#10b981" stroke="#10b981" />
            </svg>
            <div style={{ display: 'flex', marginLeft: '20px' }}>
              <span style={{ fontWeight: 'bold', color: '#111827' }}>Swift</span>
              <span style={{ fontWeight: 'bold', color: '#10b981' }}>Burst</span>
            </div>
          </div>
          <div
            style={{
              fontSize: '60px',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '20px',
              lineHeight: 1.2,
            }}
          >
            Save Money on Food Delivery
          </div>
          <div
            style={{
              fontSize: '32px',
              color: '#4b5563',
              maxWidth: '80%',
            }}
          >
            Compare prices across multiple delivery platforms
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
