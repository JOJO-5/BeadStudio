import { useCallback, useState } from 'react'
import { Upload, X } from 'lucide-react'

interface ImageUploaderProps {
  onImageLoad: (imageData: ImageData) => void
}

export function ImageUploader({ onImageLoad }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setPreview(dataUrl)

      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          onImageLoad(imageData)
        }
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }, [onImageLoad])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }, [handleFile])

  const clearImage = useCallback(() => {
    setPreview(null)
    onImageLoad(new ImageData(0, 0))
  }, [onImageLoad])

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-[var(--radius-lg)] p-4 text-center transition-all
        ${isDragging
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
          : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
        }
        ${preview ? 'bg-[var(--color-background)]' : ''}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleInputChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="max-h-32 mx-auto rounded-[var(--radius-md)] object-contain"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              clearImage()
            }}
            className="absolute -top-2 -right-2 p-1 rounded-full bg-[var(--color-error)] text-white hover:opacity-80"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <>
          <Upload className="w-8 h-8 mx-auto mb-2 text-[var(--color-text-muted)]" />
          <p className="text-sm text-[var(--color-text-secondary)]">
            点击或拖拽上传图片
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            支持 PNG, JPG, WEBP
          </p>
        </>
      )}
    </div>
  )
}
