
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

  return (

    <div className="h-screen bg-[#030712] text-white flex flex-col lg:flex-row overflow-hidden">

      {/* ================================================= */}
      {/* LEFT SIDEBAR */}
      {/* ================================================= */}

      <div className="w-full lg:w-[540px] border-r border-white/10 bg-[#040816] backdrop-blur-xl overflow-y-auto">

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

      <div className="flex-1 flex flex-col relative overflow-hidden">

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
