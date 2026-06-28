import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import { X, Check } from 'lucide-react'

interface ImageCropperProps {
  imageSrc: string
  onCropComplete: (croppedAreaPixels: { x: number; y: number; width: number; height: number }) => void
  onCancel: () => void
  aspectRatio?: number
}

export function ImageCropper({
  imageSrc,
  onCropComplete,
  onCancel,
  aspectRatio = 1,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number
    y: number
    width: number
    height: number
  } | null>(null)

  const onCropCompleteCallback = useCallback(
    ( _: unknown, croppedArea: { x: number; y: number; width: number; height: number }) => {
      setCroppedAreaPixels(croppedArea)
    },
    []
  )

  const handleApply = () => {
    if (croppedAreaPixels) {
      onCropComplete(croppedAreaPixels)
    }
  }

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/50">
      <div className="bg-[var(--color-background)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">裁剪图片</h2>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-muted)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cropper */}
        <div className="relative h-96 bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteCallback}
          />
        </div>

        {/* Controls */}
        <div className="px-4 py-3 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-[var(--color-text-muted)] w-12">缩放</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 h-2 bg-[var(--color-background-muted)] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-primary)]"
            />
            <span className="text-sm text-[var(--color-text-secondary)] w-12 text-right">
              {zoom.toFixed(1)}x
            </span>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-[var(--radius-md)] text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-muted)]"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-2 rounded-[var(--radius-md)] text-sm bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
            >
              <Check className="w-4 h-4 inline mr-1" />
              应用裁剪
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
