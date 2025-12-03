"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Clock } from "lucide-react";

const HeroVisual = () => {
  return (
    <div className="relative w-full">
      <div className="relative bg-white rounded-2xl border-2 border-slate-200 overflow-hidden">
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-14 bg-gradient-to-r from-[#005bbc] to-[#005bbc] flex items-center justify-between px-5"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                AI Customer Support
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-[#ffd600] rounded-full"
                />
              </div>
              <div className="text-xs text-white/80">Answering questions automatically</div>
            </div>
          </div>
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1.5"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-white/90 font-medium">Live</span>
          </motion.div>
        </motion.div>

        <div className="p-5 bg-slate-50 space-y-4 max-h-[500px] overflow-y-auto">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#005bbc] to-[#004a9f] flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg">
              C
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-900">Customer</span>
                <span className="text-[10px] text-slate-400">2 min ago</span>
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border-2 border-slate-200">
                <p className="text-sm text-slate-700">I want to book a demo. Can you help?</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end"
          >
            <div className="max-w-[80%]">
              <div className="bg-[#005bbc] p-3 rounded-2xl rounded-tr-none flex items-start gap-2 border-2 border-[#005bbc]">
                <Sparkles className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white mb-2">Great! I can help you book a demo. Available times:</p>
                  <div className="bg-white/10 rounded-lg p-2 border-2 border-white/20">
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <div className="w-3.5 h-3.5 bg-[#ffd600] rounded" />
                      <div>Today 2:00 PM • Tomorrow 10:00 AM • Friday 3:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1.5 justify-end">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span className="text-[10px] text-slate-500">Delivered</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="flex gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffd600] to-[#e6c200] flex items-center justify-center text-[#005bbc] text-xs font-bold shrink-0 shadow-lg">
              C
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-900">Customer</span>
                <span className="text-[10px] text-slate-400">5 min ago</span>
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border-2 border-slate-200">
                <p className="text-sm text-slate-700">What are your pricing plans?</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="flex justify-end"
          >
            <div className="max-w-[80%]">
              <div className="bg-[#005bbc] p-3 rounded-2xl rounded-tr-none flex items-start gap-2 border-2 border-[#005bbc]">
                <Sparkles className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white mb-2">Our plans start from $0/month. Here's what's included:</p>
                  <div className="bg-white/10 rounded-lg p-2 border-2 border-white/20 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <div className="w-3.5 h-3.5 bg-[#ffd600] rounded" />
                      <div>Free: 1 agent, 1K messages • Starter: $19/month • Pro: $29/month</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1.5 justify-end">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span className="text-[10px] text-slate-500">Delivered</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="p-4 bg-white border-t-2 border-slate-200"
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 h-10 bg-slate-50 rounded-xl border-2 border-slate-200 flex items-center px-4">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                readOnly
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-[#005bbc] rounded-xl flex items-center justify-center hover:bg-[#004a9f] transition-colors border-2 border-[#005bbc]"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
            </motion.button>
          </div>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Clock className="w-3 h-3 text-slate-400" />
            <span className="text-[10px] text-slate-400">AI responds in 0.8 seconds</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroVisual;
