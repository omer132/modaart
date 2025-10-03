/**
 * Image utility functions for handling file uploads and compression
 */

export interface ImageCompressOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  format?: 'jpeg' | 'png' | 'webp'
}

/**
 * Compress an image file and convert to data URL
 */
export const compressImage = (
  file: File, 
  options: ImageCompressOptions = {}
): Promise<string> => {
  const {
    maxWidth = 800,
    maxHeight = 600,
    quality = 0.8,
    format = 'jpeg'
  } = options

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      
      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height
        
        if (width > height) {
          width = maxWidth
          height = width / aspectRatio
        } else {
          height = maxHeight
          width = height * aspectRatio
        }
      }

      // Set canvas dimensions
      canvas.width = width
      canvas.height = height

      // Draw and compress
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height)
        
        const mimeType = `image/${format}`
        const compressedDataUrl = canvas.toDataURL(mimeType, quality)
        resolve(compressedDataUrl)
      } else {
        reject(new Error('Canvas context not available'))
      }
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    // Create object URL and load image
    const objectUrl = URL.createObjectURL(file)
    img.src = objectUrl
  })
}

/**
 * Validate image file
 */
export const validateImageFile = (file: File): string | null => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return 'Lütfen sadece görsel dosyası seçin'
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    return 'Görsel dosyası 10MB\'dan küçük olmalıdır'
  }

  // Check image type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return 'Desteklenen formatlar: JPEG, PNG, WebP'
  }

  return null
}

/**
 * Process multiple image files with compression
 */
export const processImageFiles = async (
  files: FileList,
  options: ImageCompressOptions = {}
): Promise<{ success: string[], errors: string[] }> => {
  const success: string[] = []
  const errors: string[] = []

  for (const file of Array.from(files)) {
    try {
      // Validate file
      const validationError = validateImageFile(file)
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`)
        continue
      }

      // Compress and convert
      const compressedUrl = await compressImage(file, options)
      success.push(compressedUrl)
    } catch (error) {
      errors.push(`${file.name}: İşlenirken hata oluştu`)
    }
  }

  return { success, errors }
}



