"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "rgb(17 24 39)",
          "--normal-text": "#ffffff",
          "--normal-border": "#ffffff50",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
