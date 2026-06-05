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

    <div className="h-screen bg-[#030712] text-white flex overflow-hidden">

      {/* ================================================= */}
      {/* MOBILE DRAWER */}
      {/* ================================================= */}

      {sidebarOpen && (

        <div className="fixed inset-0 z-50 lg:hidden">

          {/* BACKDROP */}

          <div
            className="absolute inset-0 bg-black/70"
            onClick={() =>
              setSidebarOpen(false)
            }
          />

          {/* DRAWER */}

          <div className="absolute left-0 top-0 h-full w-[320px] max-w-[85vw] bg-[#040816] border-r border-white/10">

            <div className="flex justify-end p-4">

              <button
                onClick={() =>
                  setSidebarOpen(false)
                }
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

      <div className="hidden lg:block w-[540px] border-r border-white/10 bg-[#040816] backdrop-blur-xl overflow-y-auto">

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

      <div className="flex-1 flex flex-col relative overflow-hidden min-w-0">

        {/* MOBILE HEADER */}

        <div className="lg:hidden h-16 border-b border-white/10 bg-[#040816] flex items-center justify-between px-4">

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <Menu size={24} />
          </button>

          <h1 className="font-bold text-lg">
            MedIntel AI
          </h1>

          <div className="w-6" />

        </div>

        {children}

      </div>

      {/* ================================================= */}
      {/* RIGHT PANEL */}
      {/* ================================================= */}

      <div className="hidden xl:block w-[480px] border-l border-white/10 bg-[#040816] backdrop-blur-xl overflow-y-auto">

        {rightPanel}

      </div>

    </div>

  );
}
