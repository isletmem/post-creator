import useDownload from '@/hooks/useDownload'
import '@fontsource/poppins'
import html2canvas from 'html2canvas'
import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import '@/styles/globals.css'

export default function App() {
  const canvasRef = useRef(null)
  const previewRef = useRef(null)
  const [images, setImages] = useState([])
  const { download } = useDownload()
  const [data, setData] = useState([])
  const [form, setForm] = useState({
    h1: 'Başlık',
    h2: 'Alt baslık',
    p: 'Anahtar kelime',
    icon: 'megafon.png'
  })

  const nextData = () => {
    let count = 0
    const myInterval = setInterval(() => {
      if (count < data.length) {
        setForm(data[count])
      }

      generateCanvasImage()

      count = count + 1
      console.log(count)

      if (count - 2 >= data.length) {
        clearInterval(myInterval)

        download(images)
      }
    }, 500)
  }

  const generateCanvasImage = async () => {
    if (canvasRef.current) {
      const canvas = await html2canvas(canvasRef.current, {
        useCORS: true,
        scale: 6
      })

      const data = canvas.toDataURL('image/jpeg')

      if (previewRef.current) {
        previewRef.current.src = data
      }

      images.push(data)
    }
  }

  const getClassForTextLength = (text, baseClass, thresholds) => {
    if (!text) return baseClass
    for (let [length, size] of thresholds) {
      if (text.length > length) return `${baseClass} ${size}`
    }
    return baseClass
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-4 flex gap-4">
        <div
          className="relative h-96 w-96 flex-shrink-0 bg-gray-500"
          ref={canvasRef}
        >
          <img
            className="absolute h-full w-full"
            src="/background.jpg"
            alt="Background"
          />
          <div className="relative flex h-full items-center justify-center px-4 text-center font-poppins">
            <div>
              <h1
                className={getClassForTextLength(
                  form.h1,
                  'text-2xl font-bold',
                  [
                    [46, 'text-lg'],
                    [28, 'text-xl']
                  ]
                )}
              >
                {form.h1}
              </h1>
              <h2 className="text-md font-light leading-6">{form.h2}</h2>
            </div>
            <div className="absolute bottom-12 h-20">
              <img
                className="h-full w-full"
                src={`/icons/${form.icon}`}
                alt="Logo"
              />
            </div>
            <div className="absolute bottom-3">
              <p className="text-xl font-extrabold text-black">{form.p}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          type="file"
          onChange={e => {
            const file = e.target.files[0]

            if (file) {
              const reader = new FileReader()

              reader.onload = function (event) {
                setData(JSON.parse(event.target.result))
              }

              reader.readAsText(file)
            }
          }}
        />
        <Button onClick={nextData}>Generate All Post</Button>
      </div>
    </main>
  )
}
