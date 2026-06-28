import { useState } from 'react'
import type { ReactNode } from 'react'
import { Menu, X } from 'lucide-react'

interface AppShellProps {
  toolbar: ReactNode
  editToolbar?: ReactNode
  sidebar: ReactNode
  canvas: ReactNode
  inspector: ReactNode
  statusBar: ReactNode
}

export function AppShell({ toolbar, sidebar, canvas, inspector, statusBar, editToolbar }: AppShellProps) {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showInspector, setShowInspector] = useState(false)

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/* Toolbar - fixed top */}
      <header className="flex-shrink-0 border-b border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="h-12 flex items-center gap-2">
          {/* Mobile menu buttons */}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden p-2 hover:bg-[var(--color-background-muted)] rounded-md"
            aria-label="Toggle sidebar"
          >
            {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1">{toolbar}</div>
          <button
            onClick={() => setShowInspector(!showInspector)}
            className="lg:hidden p-2 hover:bg-[var(--color-background-muted)] rounded-md"
            aria-label="Toggle inspector"
          >
            {showInspector ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {editToolbar && <div className="border-t border-[var(--color-border)]">{editToolbar}</div>}
      </header>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - desktop left, mobile overlay */}
        <aside className={`
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:w-64 w-64 flex-shrink-0 border-r border-[var(--color-border)] bg-[var(--color-background-subtle)] overflow-y-auto absolute lg:relative h-full z-30 transition-transform duration-200
        `}>
          {sidebar}
        </aside>

        {/* Mobile sidebar backdrop */}
        {showSidebar && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-20"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Canvas - fills remaining space */}
        <main className="flex-1 bg-[var(--color-canvas-bg)] overflow-hidden">
          {canvas}
        </main>

        {/* Inspector - desktop right, mobile overlay */}
        <aside className={`
          ${showInspector ? 'translate-x-0' : 'translate-x-full'}
          lg:translate-x-0 lg:w-72 w-72 flex-shrink-0 border-l border-[var(--color-border)] bg-[var(--color-background)] overflow-y-auto absolute lg:relative right-0 h-full z-30 transition-transform duration-200
        `}>
          {inspector}
        </aside>

        {/* Mobile inspector backdrop */}
        {showInspector && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-20"
            onClick={() => setShowInspector(false)}
          />
        )}
      </div>

      {/* Status Bar - fixed bottom */}
      <footer className="h-7 flex-shrink-0 border-t border-[var(--color-border)] bg-[var(--color-background)]">
        {statusBar}
      </footer>
    </div>
  )
}
