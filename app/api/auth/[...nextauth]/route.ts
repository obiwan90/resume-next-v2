import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import NextAuth from 'next-auth'

// 删除旧的 config 导出
// export const config = {
//   runtime: 'edge',
//   regions: ['iad1'],
// }

// 使用新的路由处理器配置方式
export const runtime = 'edge'
export const preferredRegion = 'iad1'

// 处理 GET 请求
export async function GET(request: NextRequest) {
    return NextResponse.json({ status: 'ok' })
}

// 处理 POST 请求
export async function POST(request: NextRequest) {
    return NextResponse.json({ status: 'ok' })
} 