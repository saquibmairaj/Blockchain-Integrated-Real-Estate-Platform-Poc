'use client'

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  ToastClose,
  ToastDescription,
  ToastPrimitive,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  toastSeverityClassNames,
  type ToastRole,
  type ToastSeverity,
} from '@/components/ui/toast'

type ToastMessage = {
  id: string
  title: string
  description?: string
  role: ToastRole
  severity: ToastSeverity
}

type ShowToastInput = {
  title: string
  description?: string
  role?: ToastRole
  severity?: ToastSeverity
}

type ToastContextValue = {
  showToast: (toast: ShowToastInput) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

type ToastProviderProps = {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback((toast: ShowToastInput) => {
    setToasts((currentToasts) => [
      ...currentToasts,
      {
        ...toast,
        id: crypto.randomUUID(),
        role: toast.role ?? 'status',
        severity: toast.severity ?? 'info',
      },
    ])
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map((toast) => {
          const severityClassNames = toastSeverityClassNames[toast.severity]

          return (
            <ToastRoot
              key={toast.id}
              role={toast.role}
              data-severity={toast.severity}
              className={severityClassNames.root}
              onOpenChange={(open) => !open && dismissToast(toast.id)}
            >
              <div className="grid gap-1">
                <ToastTitle className={severityClassNames.title}>{toast.title}</ToastTitle>
                {toast.description ? (
                  <ToastDescription className={severityClassNames.description}>
                    {toast.description}
                  </ToastDescription>
                ) : null}
              </div>
              <ToastClose className={severityClassNames.close} />
            </ToastRoot>
          )
        })}
        <ToastViewport />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return context
}
