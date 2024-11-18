import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text') || 'Placeholder';

    // 创建一个简单的SVG占位图
    const svg = `
    <svg width="100%" height="100%" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#2C3E50"/>
      <text
        x="50%"
        y="50%"
        font-family="system-ui, sans-serif"
        font-size="24"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${text}
      </text>
    </svg>
  `;

    return new NextResponse(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
} 