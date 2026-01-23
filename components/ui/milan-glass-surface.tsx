'use client'

import React from 'react'
import GlassSurface, { GlassSurfaceProps } from '@/components/GlassSurface'

interface MilanGlassSurfaceProps extends Omit<GlassSurfaceProps, 'mixBlendMode'> {
  variant?: 'default' | 'pass' | 'card' | 'hero' | 'interactive'
  festivalAccent?: boolean
}

const variantConfigs = {
  default: {
    opacity: 0.93,
    blur: 11,
    brightness: 50,
    borderRadius: 20,
    mixBlendMode: 'difference' as const,
  },
  pass: {
    opacity: 0.95,
    blur: 12,
    brightness: 60,
    borderRadius: 24,
    saturation: 1.2,
    mixBlendMode: 'screen' as const,
  },
  card: {
    opacity: 0.9,
    blur: 10,
    brightness: 55,
    borderRadius: 16,
    mixBlendMode: 'normal' as const,
  },
  hero: {
    opacity: 0.97,
    blur: 15,
    brightness: 45,
    borderRadius: 30,
    distortionScale: -180,
    mixBlendMode: 'screen' as const,
  },
  interactive: {
    opacity: 0.92,
    blur: 9,
    brightness: 52,
    borderRadius: 18,
    mixBlendMode: 'overlay' as const,
  },
}

export const MilanGlassSurface: React.FC<MilanGlassSurfaceProps> = ({
  variant = 'default',
  festivalAccent = false,
  className = '',
  children,
  ...props
}) => {
  const config = variantConfigs[variant]

  const milanClassName = festivalAccent
    ? `${className} milan-glass-surface--festival`
    : `${className} milan-glass-surface`

  return (
    <GlassSurface
      {...config}
      {...props}
      className={milanClassName}
      style={{
        ...props.style,
        background: festivalAccent
          ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(219, 39, 119, 0.1))'
          : undefined,
      }}
    >
      {children}
    </GlassSurface>
  )
}

export default MilanGlassSurface
