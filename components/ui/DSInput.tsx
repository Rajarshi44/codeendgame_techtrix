'use client'

import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  rightIcon?: React.ReactNode
  note?: string
}

const DSInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, rightIcon, note, id, className = '', ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full group/input">
        {label && (
          <label
            htmlFor={id}
            className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#ffffff]/50 flex justify-between items-center"
          >
            {label}
            {error && <span className="text-[var(--stone-reality)] tracking-normal normal-case font-body text-xs">{error}</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            className={`
              w-full bg-[#050505]/80 border 
              ${error ? 'border-[var(--stone-reality)]' : 'border-white/10 group-hover/input:border-white/30'} 
              text-white font-mono text-sm md:text-base
              px-4 py-3 outline-none transition-all duration-300
              focus:bg-[#050505] focus:border-[var(--accent)] focus:shadow-[inset_4px_0_0_0_var(--accent)]
              placeholder:text-white/20 placeholder:font-body
              ${rightIcon ? 'pr-12' : ''}
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-black/50
              ${className}
            `}
            {...rest}
          />
          {rightIcon && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/input:text-[var(--accent)] transition-colors">
              {rightIcon}
            </span>
          )}
        </div>
        {note && !error && (
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest border-l border-white/10 pl-2">
            {note}
          </span>
        )}
      </div>
    )
  }
)
DSInput.displayName = 'DSInput'
export default DSInput
