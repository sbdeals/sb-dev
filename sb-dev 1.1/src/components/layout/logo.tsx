"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center space-x-3 transition-opacity hover:opacity-90",
        className
      )}
    >
      <motion.div
        className="relative h-8 w-8 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-green-500"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </motion.div>
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="text-xl font-bold text-foreground">Swift</span>
        <span className="text-xl font-bold text-green-500">Burst</span>
      </motion.div>
    </Link>
  );
}
