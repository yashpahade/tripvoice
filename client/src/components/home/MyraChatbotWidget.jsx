import React, { useState, useCallback } from 'react';
import { Bot, X, Send } from 'lucide-react';

const MyraChatbotWidget = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I am Myra, your AI travel assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = useCallback((e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      let botReply = "I can help you find flights, check hotel deals, or track booking status. Where would you like to travel?";
      if (userText.toLowerCase().includes('flight') || userText.toLowerCase().includes('delhi') || userText.toLowerCase().includes('bengaluru')) {
        botReply = "I found great one-way fares from Delhi to Bengaluru starting at ₹4,299! Would you like me to book this for you?";
      } else if (userText.toLowerCase().includes('hotel') || userText.toLowerCase().includes('goa')) {
        botReply = "Top beachfront resorts in Goa currently have up to 40% off with free cancellation!";
      } else if (userText.toLowerCase().includes('pnr') || userText.toLowerCase().includes('status')) {
        botReply = "Please enter your 10-digit PNR or Booking ID to get live status.";
      }
      setMessages((prev) => [...prev, { role: 'bot', text: botReply }]);
    }, 600);
  }, [input]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[420px] animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0D9488] to-[#0F766E] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-black leading-tight">Myra</h4>
                <p className="text-[10px] text-teal-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online Travel AI
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#F8FAFC] text-xs">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-2.5 rounded-xl ${
                    m.role === 'user' 
                      ? 'bg-[#0D9488] text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-slate-200 rounded-tl-none shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Ask Myra anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0D9488]"
            />
            <button 
              type="submit"
              className="p-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#0F766E] transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Trigger Button with Speech Bubble */}
      <div className="flex items-center gap-2.5">
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="cursor-pointer bg-white px-3.5 py-1.5 rounded-xl shadow-lg border border-slate-200 text-right animate-bounce duration-1000"
          >
            <p className="text-[10px] text-gray-500 font-semibold leading-tight">Hey</p>
            <p className="text-xs font-black text-[#0D9488] leading-tight">I am Myra</p>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-13 h-13 rounded-full bg-white shadow-2xl border-2 border-teal-400 p-1 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group cursor-pointer"
          title="Chat with Myra"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#0D9488] to-[#0F766E] flex items-center justify-center text-white shadow-inner">
            <Bot className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
});

MyraChatbotWidget.displayName = 'MyraChatbotWidget';

export default MyraChatbotWidget;
