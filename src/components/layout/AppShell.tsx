import type { ReactNode } from 'react'

interface AppShellProps {
  toolbar: ReactNode
  editToolbar?: ReactNode
  sidebar: ReactNode
  canvas: ReactNode
  inspector: ReactNode
  statusBar: ReactNode
}

export function AppShell({ toolbar, sidebar, canvas, inspector, statusBar, editToolbar }: AppShellProps) {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/* Toolbar - fixed top */}
      <header className="flex-shrink-0 border-b border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="h-12">{toolbar}</div>
        {editToolbar && <div className="border-t border-[var(--color-border)]">{editToolbar}</div>}
      </header>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - fixed left */}
        <aside className="w-64 flex-shrink-0 border-r border-[var(--color-border)] bg-[var(--color-background-subtle)] overflow-y-auto">
          {sidebar}
        </aside>

        {/* Canvas - fills remaining space */}
        <main className="flex-1 bg-[var(--color-canvas-bg)] overflow-hidden">
          {canvas}
        </main>

        {/* Inspector - fixed right */}
        <aside className="w-72 flex-shrink-0 border-l border-[var(--color-border)] bg-[var(--color-background)] overflow-y-auto">
          {inspector}
        </aside>
      </div>

      {/* Status Bar - fixed bottom */}
      <footer className="h-7 flex-shrink-0 border-t border-[var(--color-border)] bg-[var(--color-background)]">
        {statusBar}
      </footer>
    </div>
  )
}
