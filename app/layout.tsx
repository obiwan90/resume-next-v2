import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
import { Template } from "@/components/layout/template"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Template>
              {children}
            </Template>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

export const metadata = {
  title: 'Portfolio',
  description: 'My personal portfolio',
}
