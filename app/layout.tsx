import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
import { Template } from "@/components/layout/template"
import "./globals.css"
import { Toaster } from "react-hot-toast"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <Template>
              {children}
            </Template>
          </ClerkProvider>
        </ThemeProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Portfolio',
  description: 'My personal portfolio',
}
