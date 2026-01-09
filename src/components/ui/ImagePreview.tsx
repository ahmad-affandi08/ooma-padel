'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

interface ImagePreviewProps {
  src: string
  alt: string
  className?: string
}

export function ImagePreview({ src, alt, className = '' }: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Thumbnail with zoom indicator */}
      <div
        className={`relative cursor-pointer group ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Zoom overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Full Screen Preview Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/90 z-50 backdrop-blur-sm cursor-zoom-out"
            />

            {/* Image Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25 }}
                className="relative max-w-7xl max-h-full pointer-events-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-12 right-0 md:-top-14 md:-right-14 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                  aria-label="Close preview"
                >
                  <X className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </button>

                {/* Image */}
                <img
                  src={src}
                  alt={alt}
                  className="max-w-full max-h-[85vh] w-auto h-auto rounded-lg shadow-2xl object-contain"
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Image Caption */}
                <div className="absolute -bottom-12 left-0 right-0 text-center">
                  <p className="text-white text-sm md:text-base font-medium drop-shadow-lg">
                    {alt}
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
