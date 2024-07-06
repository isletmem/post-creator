import '@fontsource/poppins'
import { zodResolver } from '@hookform/resolvers/zod'
import html2canvas from 'html2canvas'
import { Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ThemeProvider } from '@/components/theme-provider'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useDownload from '@/hooks/useDownload'

const FormSchema = z.object({
  h1: z.string().min(8, {
    message: '8 karakterden az olamaz.'
  }),
  h2: z.string().min(8, {
    message: '8 karakterden az olamaz.'
  }),
  p: z.string().min(8, {
    message: '8 karakterden az olamaz.'
  }),
  icon: z.string()
})

export default function App() {
  const canvasRef = useRef(null)
  const { download } = useDownload()
  const [images, setImages] = useState([])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      h1: "Google'da kaybolmak mı?",
      h2: 'Asla! İşletmeniz her zaman zirvede!',
      p: "Google'da kaybolmak mı?",
      icon: 'imlec.png'
    }
  })

  const { h1, h2, p, icon } = form.getValues()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createImage()
  }

  async function createImage() {
    if (canvasRef.current) {
      const canvas = await html2canvas(canvasRef.current, {
        useCORS: true,
        scale: 6
      })

      const data = canvas.toDataURL('image/jpeg')

      // setImages([...images, data])
      setImages([data])
    }
  }

  useEffect(() => {
    createImage()
  }, [])

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <main className="flex min-h-screen items-center justify-center p-8">
        <div className="gap-8 rounded-md border bg-card p-8 shadow">
          <div
            className="group relative aspect-square w-96 overflow-hidden rounded-md bg-muted"
            ref={canvasRef}
          >
            <img
              className="absolute h-full w-full"
              src="/background.jpg"
              alt="background"
            />
            <div className="font-poppins relative mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
              <div>
                <h1 className="font-semibold">{h1}</h1>
                <h2 className="text-md font-light">{h2}</h2>
              </div>
              <div className="absolute bottom-12 h-20">
                <img
                  className="h-full w-full"
                  src={`/icons/${icon}`}
                  alt="Logo"
                />
              </div>
              <div className="absolute bottom-3">
                <p className="text-xl font-extrabold text-black">{p}</p>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-all group-hover:opacity-100">
              <span
                className="cursor-pointer rounded-full bg-black/50 p-4"
                onClick={() => download(images)}
              >
                <Download />
              </span>
            </div>
          </div>

          <Form {...form}>
            <form
              className="mt-8 space-y-6"
              onChange={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="h1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Başlık</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="h2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alt Başlık</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="p"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anahtar Kelime</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </main>
    </ThemeProvider>
  )
}
