import '@fontsource/poppins'
import html2canvas from 'html2canvas'
import { useRef, useState } from 'react'

import { ThemeProvider } from '@/components/theme-provider'
import useDownload from '@/hooks/useDownload'

export default function App() {
  const canvasRef = useRef(null)
  const { download } = useDownload()
  const [h1, setH1] = useState('')
  const [h2, setH2] = useState('')
  const [h3, setH3] = useState('')
  const [images, setImages] = useState([])
  async function createImage(content) {
    if (canvasRef.current) {
      const newImages = await Promise.all(
        content.map(async item => {
          setH1(Math.random())
          setH2(Math.random())
          setH3(Math.random())
          const canvas = await html2canvas(canvasRef.current, {
            useCORS: true,
            scale: 6
          })
          const data = canvas.toDataURL('image/jpeg')
          console.log(item)
          return data
        })
      )
      download(newImages)
      console.log(images)
    }
  }

  function clampBuilder(minWidthPx, maxWidthPx, minFontSize, maxFontSize) {
    const root = document.querySelector('html')
    const pixelsPerRem = Number(getComputedStyle(root).fontSize.slice(0, -2))

    const minWidth = minWidthPx / pixelsPerRem
    const maxWidth = maxWidthPx / pixelsPerRem

    const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth)
    const yAxisIntersection = -minWidth * slope + minFontSize

    return `clamp( ${minFontSize}rem, ${yAxisIntersection}rem + ${slope * 100}vw, ${maxFontSize}rem )`
  }
  function handleInput(e: any) {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = function (event) {
        console.log(JSON.parse(event.target.result))
        createImage(JSON.parse(event.target.result))
      }

      reader.readAsText(file)
    } else {
      console.log('No file selected')
    }
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <main className="flex min-h-screen items-center justify-center p-8">
        <div className="w-full max-w-[450px] gap-8 rounded-md border bg-card p-8 shadow">
          <div
            className="group relative aspect-square overflow-hidden rounded-md bg-muted"
            ref={canvasRef}
          >
            <img
              className="absolute h-full w-full"
              src="/background.jpg"
              alt="background"
            />
            <div className="relative flex h-full items-center justify-center text-center font-poppins">
              <div
                className="absolute"
                style={{
                  fontSize: clampBuilder(320, 514, 0.5, 1)
                }}
              >
                <h1 className="font-semibold">{h1}</h1>
                <h2 className="font-light">{h2}</h2>
              </div>
              <div
                className="absolute bottom-[10%]"
                style={{
                  height: clampBuilder(320, 450, 2, 5)
                }}
              >
                <img
                  className="h-full w-full"
                  src={`/icons/buyutec.png`}
                  alt="Logo"
                />
              </div>
              <div
                className="absolute bottom-[1%]"
                style={{
                  fontSize: clampBuilder(320, 450, 0.5, 1.3)
                }}
              >
                <h3 className="font-extrabold text-black">{h3}</h3>
              </div>
            </div>
          </div>
        </div>
        <input type="file" onChange={e => handleInput(e)}></input>
      </main>
    </ThemeProvider>
  )
}
