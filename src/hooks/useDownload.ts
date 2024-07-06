import JSZip from 'jszip'

const base64ToBlob = (base64Data, contentType) => {
  const binaryString = atob(base64Data)
  const len = binaryString.length
  const bytes = new Uint8Array(len)

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return new Blob([bytes], { type: contentType })
}

const downloadBlob = (blob, filename) => {
  const link = document.createElement('a')

  link.href = window.URL.createObjectURL(blob)
  link.download = filename
  link.click()

  window.URL.revokeObjectURL(link.href)
}

const useDownload = () => {
  const download = async images => {
    if (images.length === 1) {
      const base64Data = images[0].split(',')[1]
      const blob = base64ToBlob(base64Data, 'image/jpeg')

      downloadBlob(blob, 'image.jpg')
    } else {
      const zip = new JSZip()

      images.forEach((image, index) => {
        const base64Data = image.split(',')[1]
        const blob = base64ToBlob(base64Data, 'image/jpeg')

        zip.file(`image${index + 1}.jpg`, blob)
      })

      try {
        const zipData = await zip.generateAsync({
          type: 'blob',
          streamFiles: true
        })

        downloadBlob(zipData, 'images.zip')
      } catch (error) {
        console.error('Error generating ZIP file', error)
      }
    }
  }

  return { download }
}

export default useDownload
