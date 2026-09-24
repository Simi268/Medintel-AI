import { useState } from "react";
import { Menu, X } from "lucide-react";

import Sidebar from "../sidebar/Sidebar";

// =================================================
// TYPES
// =================================================

interface Props {
  children: React.ReactNode;

  conversations: any[];

  onSelectConversation: (
    id: number
  ) => void;

  onNewConversation: () => void;

  onDeleteConversation: (
    id: number
  ) => void;

  rightPanel: React.ReactNode;
}

// =================================================
// COMPONENT
// =================================================

export default function MainLayout({
  children,
  rightPanel,
  conversations,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}: Props) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div
      className="
        min-h-screen
        flex
        overflow-x-hidden
        bg-[var(--app-bg)]
        text-[var(--app-text)]
        transition-colors
        duration-300
      "
    >

      {/* ================================================= */}
      {/* MOBILE DRAWER */}
      {/* ================================================= */}

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">

          {/* BACKDROP */}

          <div
            className="
              absolute
              inset-0
              bg-black/50
              backdrop-blur-sm
            "
            onClick={() =>
              setSidebarOpen(false)
            }
          />

          {/* DRAWER */}

          <div
            className="
              absolute
              left-0
              top-0
              h-full
              w-[320px]
              max-w-[85vw]
              overflow-y-auto
              border-r
              border-[var(--app-border)]
              bg-[var(--panel-bg)]
              text-[var(--app-text)]
              shadow-2xl
              transition-colors
              duration-300
            "
          >

            {/* CLOSE BUTTON */}

            <div className="flex justify-end p-4">

              <button
                onClick={() =>
                  setSidebarOpen(false)
                }
                className="
                  rounded-xl
                  p-2
                  text-[var(--app-text-secondary)]
                  hover:bg-[var(--hover-bg)]
                  hover:text-[var(--app-text)]
                  transition-all
                "
                aria-label="Close sidebar"
              >
                <X size={24} />
              </button>

            </div>

            <Sidebar
              conversations={conversations}

              onSelectConversation={(id) => {
                onSelectConversation(id);
                setSidebarOpen(false);
              }}

              onNewConversation={() => {
                onNewConversation();
                setSidebarOpen(false);
              }}

              onDeleteConversation={
                onDeleteConversation
              }
            />

          </div>

        </div>
      )}

      {/* ================================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ================================================= */}

      <div
        className="
          hidden
          lg:block
          w-[540px]
          border-r
          border-[var(--app-border)]
          bg-[var(--panel-bg)]
          overflow-y-auto
          transition-colors
          duration-300
        "
      >

        <Sidebar
          conversations={conversations}

          onSelectConversation={
            onSelectConversation
          }

          onNewConversation={
            onNewConversation
          }

          onDeleteConversation={
            onDeleteConversation
          }
        />

      </div>

      {/* ================================================= */}
      {/* CENTER */}
      {/* ================================================= */}

      <div
        className="
          flex-1
          flex
          flex-col
          relative
          min-w-0
          overflow-y-auto
          bg-[var(--center-bg)]
          text-[var(--app-text)]
          transition-colors
          duration-300
        "
      >

        {/* ================================================= */}
        {/* MOBILE HEADER */}
        {/* ================================================= */}

        <div
          className="
            lg:hidden
            h-16
            border-b
            border-[var(--app-border)]
            bg-[var(--panel-bg)]
            flex
            items-center
            justify-between
            px-4
            transition-colors
            duration-300
          "
        >

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="
              rounded-xl
              p-2
              text-[var(--app-text)]
              hover:bg-[var(--hover-bg)]
              transition-all
            "
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>

          <h1
            className="
              font-bold
              text-lg
              text-[var(--app-text)]
            "
          >
            MedIntel AI
          </h1>

          <div className="w-6" />

        </div>

        {/* ================================================= */}
        {/* MAIN CONTENT */}
        {/* ================================================= */}

        {children}

      </div>

      {/* ================================================= */}
      {/* RIGHT PANEL */}
      {/* ================================================= */}

      <div
        className="
          hidden
          xl:block
          w-[480px]
          border-l
          border-[var(--app-border)]
          bg-[var(--panel-bg)]
          overflow-y-auto
          transition-colors
          duration-300
        "
      >

        {rightPanel}

      </div>

    </div>
  );
}