import { useCallback, useState } from 'react'
import { Upload, X, Crop } from 'lucide-react'
import { ImageCropper } from '@/features/image-crop'

interface ImageUploaderProps {
  onImageLoad: (imageData: ImageData) => void
}

export function ImageUploader({ onImageLoad }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [showCropper, setShowCropper] = useState(false)

  const processImage = useCallback((img: HTMLImageElement, cropArea?: { x: number; y: number; width: number; height: number }) => {
    const canvas = document.createElement('canvas')

    if (cropArea) {
      canvas.width = cropArea.width
      canvas.height = cropArea.height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(
          img,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height,
          0,
          0,
          cropArea.width,
          cropArea.height
        )
      }
    } else {
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
      }
    }

    const newImageData = canvas.getContext('2d')?.getImageData(0, 0, canvas.width, canvas.height)
    if (newImageData) {
      onImageLoad(newImageData)
    }
  }, [onImageLoad])

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
        processImage(img)
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }, [processImage])

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

  const handleCropComplete = useCallback((cropArea: { x: number; y: number; width: number; height: number }) => {
    if (!preview) return

    const img = new Image()
    img.onload = () => {
      processImage(img, cropArea)
      setShowCropper(false)
    }
    img.src = preview
  }, [preview, processImage])

  return (
    <>
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
            <div className="absolute -top-2 -right-2 flex gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowCropper(true)
                }}
                className="p-1 rounded-full bg-[var(--color-primary)] text-white hover:opacity-80"
                title="裁剪"
              >
                <Crop className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  clearImage()
                }}
                className="p-1 rounded-full bg-[var(--color-error)] text-white hover:opacity-80"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
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

      {showCropper && preview && (
        <ImageCropper
          imageSrc={preview}
          onCropComplete={handleCropComplete}
          onCancel={() => setShowCropper(false)}
        />
      )}
    </>
  )
}
