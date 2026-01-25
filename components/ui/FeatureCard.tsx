"use client";
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div
        className={`
          p-6 bg-white rounded-xl border border-slate-200
          hover:border-slate-300
          transition-colors duration-200 h-full
        `}
      >
        <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center mb-4 border border-slate-200 transition-colors">
          <Icon className="w-7 h-7 text-slate-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;


