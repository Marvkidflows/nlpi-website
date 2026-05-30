import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Reusable Button
 * variant: 'gold' | 'outline' | 'ghost'
 * size:    'sm' | 'md' | 'lg'
 */
export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'gold',
  size = 'md',
  className = '',
  icon,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-spartan font-bold rounded tracking-wider no-underline cursor-pointer border transition-all duration-200 select-none'

  const variants = {
    gold:    'bg-gold text-navy border-gold hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/30 active:scale-95',
    outline: 'bg-transparent text-white border-white/50 hover:border-white hover:bg-white/10',
    navy:    'bg-navy text-white border-navy hover:bg-navy/90',
    ghost:   'bg-transparent text-navy border-transparent hover:bg-navy/5',
  }

  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
  }

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  const inner = (
    <>
      {icon && <span>{icon}</span>}
      {children}
    </>
  )

  if (to)   return <Link to={to} className={cls} {...rest}>{inner}</Link>
  if (href)  return <a href={href} className={cls} target="_blank" rel="noreferrer" {...rest}>{inner}</a>
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cls}
      {...rest}
    >
      {inner}
    </motion.button>
  )
}
