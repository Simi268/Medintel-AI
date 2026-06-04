import {
  Brain,
  Plus,
  Trash2,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

// =================================================
// TYPES
// =================================================

interface Props {

  conversations: any[];

  onSelectConversation: (
    id: number
  ) => void;

  onNewConversation: () => void;

  onDeleteConversation: (
    id: number
  ) => void;
}

// =================================================
// COMPONENT
// =================================================

export default function Sidebar({

  conversations,

  onSelectConversation,

  onNewConversation,

  onDeleteConversation,

}: Props) {

  return (

    <div className="h-full flex flex-col bg-[#040816] text-white p-5">

      {/* ================================================= */}
      {/* LOGO */}
      {/* ================================================= */}

      <div className="rounded-[30px] border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-500/20 to-purple-500/5 p-5 shadow-[0_0_40px_rgba(217,70,239,0.08)]">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-500 flex items-center justify-center shadow-lg">

            <Brain size={28} />

          </div>

          <div>

            <h1 className="text-[34px] md:text-[50px] font-extrabold leading-none">

              MedIntel

            </h1>

            <p className="text-[13px] md:text-[30px] text-gray-300 mt-1">

              AI Healthcare Intelligence

            </p>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* NEW CHAT BUTTON */}
      {/* ================================================= */}

      <button

        onClick={onNewConversation}

        className="mt-6 h-[84px] rounded-[24px] bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-[30px] flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(217,70,239,0.25)] hover:scale-[1.02] transition-all"

      >

        <Plus size={22} />

        New Conversation

      </button>

      {/* ================================================= */}
      {/* CONVERSATIONS */}
      {/* ================================================= */}

      <div className="mt-8 flex-1 overflow-y-auto pr-2">

        <p className="text-[25px] tracking-[4px] uppercase text-gray-400 mb-5 font-bold">

          Recent Conversations

        </p>

        <div className="space-y-4">

          {conversations.length === 0 && (

            <div className="text-[20px] text-gray-400 bg-white/5 border border-white/10 rounded-3xl p-6 text-center font-bold">

              No conversations yet 💜

            </div>
          )}

          {conversations.map(

            (conversation) => (

              <div

                key={conversation.id}

                className="group rounded-[28px] border border-white/10 bg-[#111827] hover:border-fuchsia-500/30 hover:bg-[#151c2e] transition-all cursor-pointer"

              >

                <div

                  onClick={() =>
                    onSelectConversation(
                      conversation.id
                    )
                  }

                  className="p-5 flex items-center justify-between"

                >

                  {/* LEFT */}

                  <div className="flex-1 min-w-0">

                    <h3 className="font-semibold text-[17px] md:text-[18px] truncate text-white">

                      {conversation.title}

                    </h3>

                  </div>

                  {/* RIGHT */}

                  <div className="flex items-center gap-3 ml-4">

                    {/* DELETE */}

                    <button

                      onClick={(e) => {

                        e.stopPropagation();

                        onDeleteConversation(
                          conversation.id
                        );
                      }}

                      className="opacity-0 group-hover:opacity-100 transition-all text-red-400 hover:text-red-300"

                    >

                      <Trash2 size={17} />

                    </button>

                    {/* ARROW */}

                    <ChevronRight

                      size={18}

                      className="text-gray-500"

                    />

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

      {/* ================================================= */}
      {/* SETTINGS */}
      {/* ================================================= */}

      <div className="mt-5">

        <button className="w-full rounded-[28px] border border-white/10 bg-[#111827] hover:bg-[#151c2e] transition-all p-5 flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center">

            <Settings size={22} />

          </div>

          <div className="text-left">

            <p className="font-semibold text-[25px]">

              Settings

            </p>

            <p className="text-[20px] text-gray-400">

              Preferences & personalization

            </p>

          </div>

        </button>

        {/* LOGOUT */}

        <button

          onClick={() => {

            localStorage.removeItem(
              "token"
            );

            window.location.href =
              "/login";
          }}

          className="mt-4 w-full h-[62px] rounded-[24px] border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 font-semibold text-[17px] flex items-center justify-center gap-3 transition-all"

        >

          <LogOut size={25} />

          Logout

        </button>

      </div>

    </div>
  );
}
