'use client'

import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { X } from 'lucide-react'
import { cn } from '@/components/ui/utils'

type ToastRole = 'status' | 'alert'
type ToastSeverity = 'info' | 'success' | 'warning' | 'error'

type ToastSeverityStyles = {
  root: string
  title: string
  description: string
  close: string
}

const toastSeverityClassNames: Record<ToastSeverity, ToastSeverityStyles> = {
  info: {
    root: 'border-white/10 bg-gray-950',
    title: 'text-white',
    description: 'text-gray-300',
    close: 'text-gray-400 hover:text-white focus-visible:ring-white/40',
  },
  success: {
    root: 'border-l-4 border-emerald-500/70 bg-emerald-950/90 ring-1 ring-emerald-400/25',
    title: 'text-emerald-100',
    description: 'text-emerald-200/90',
    close: 'text-emerald-200/80 hover:text-emerald-50 focus-visible:ring-emerald-300/60',
  },
  warning: {
    root: 'border-l-4 border-amber-500/80 bg-amber-950/90 ring-1 ring-amber-400/25',
    title: 'text-amber-100',
    description: 'text-amber-200/90',
    close: 'text-amber-200/80 hover:text-amber-50 focus-visible:ring-amber-300/60',
  },
  error: {
    root: 'border-l-8 border-red-500 bg-red-900/95 ring-1 ring-red-400/70 shadow-red-950/60',
    title: 'text-red-100',
    description: 'text-red-200/90',
    close: 'text-red-200/80 hover:text-red-50 focus-visible:ring-red-300/60',
  },
}

const ToastRoot = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(
      'group pointer-events-auto relative flex w-full items-start justify-between gap-3 overflow-hidden rounded-lg border border-white/10 bg-gray-950 p-4 text-white shadow-lg shadow-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-right-full sm:max-w-sm sm:data-[state=open]:slide-in-from-bottom-full',
      className,
    )}
    {...props}
  />
))
ToastRoot.displayName = ToastPrimitive.Root.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn('text-sm text-gray-300', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      'rounded-md p-1 opacity-90 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1',
      className,
    )}
    {...props}
  >
    <X className="h-4 w-4" aria-hidden="true" />
    <span className="sr-only">Close notification</span>
  </ToastPrimitive.Close>
))
ToastClose.displayName = ToastPrimitive.Close.displayName

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'fixed right-4 top-4 z-[100] flex max-h-screen w-[calc(100vw-2rem)] flex-col gap-2 outline-none sm:bottom-4 sm:top-auto sm:w-full sm:max-w-sm',
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

export {
  ToastPrimitive,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
  toastSeverityClassNames,
}
export type { ToastRole, ToastSeverity }
