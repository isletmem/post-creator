import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import "@fontsource/poppins";
import useDownload from "./hooks/useDownload";

import "./App.css";

const data = [
  {
    h1: "Satışlar mı düşük?",
    h2: "Satışlarınızı artıran özellikler ile tanışın",
    p: "Bilinirlik",
    icon: "megafon.png",
  },
  {
    h1: "Müşteri Memnuniyeti mi azaldı?",
    h2: "Müşteri memnuniyetinizi yükseltmenin yollarını keşfedin",
    p: "Geri Bildirim",
    icon: "buyutec.png",
  },
  {
    h1: "Reklam giderleri mi yüksek?",
    h2: "Verimli reklam stratejileri ile tanışın",
    p: "Reklam",
    icon: "cash.png",
  },
  {
    h1: "Yeni pazarlara mı ulaşmak istiyorsunuz?",
    h2: "Global pazar stratejilerimiz ile tanışın",
    p: "Globalleşme",
    icon: "imlec.png",
  },
  {
    h1: "Ürün çeşitliliği mi artırmak istiyorsunuz?",
    h2: "Ürün yelpazenizi genişletmenin yollarını öğrenin",
    p: "Çeşitlendirme",
    icon: "megafon.png",
  },
  {
    h1: "Operasyonel maliyetler mi yüksek?",
    h2: "Maliyetlerinizi düşürmenin yollarını keşfedin",
    p: "Maliyet Azaltma",
    icon: "cash.png",
  },
  {
    h1: "Marka bilinirliğini mi artırmak istiyorsunuz?",
    h2: "Marka bilinirliğini artırmanın etkili yollarını öğrenin",
    p: "Marka",
    icon: "imlec.png",
  },
  {
    h1: "Dijital dönüşüme mi hazır değilsiniz?",
    h2: "Dijital dönüşüm stratejilerimiz ile tanışın",
    p: "Dijital Dönüşüm",
    icon: "megafon.png",
  },
  {
    h1: "Çalışan bağlılığı mı düşük?",
    h2: "Çalışan bağlılığını artırmanın yollarını keşfedin",
    p: "Bağlılık",
    icon: "imlec.png",
  },
  {
    h1: "Sosyal medya etkisi mi düşük?",
    h2: "Sosyal medya etkisini artırmanın yollarını öğrenin",
    p: "Sosyal Medya",
    icon: "buyutec.png",
  },
];

export default function App() {
  const canvasRef = useRef(null);
  const previewRef = useRef(null);
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(0);
  const { handleZip } = useDownload();
  const [form, setForm] = useState({
    h1: "Satışlar mı düşük?",
    h2: "Satışlarınızı artıran özellikler ile tanışın",
    p: "Bilinirlik",
    icon: "megafon.png",
  });

  const nextData = () => {
    setForm(data[count]);

    if (count < data.length - 1) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const generateCanvasImage = async () => {
    if (canvasRef.current) {
      const canvas = await html2canvas(canvasRef.current, {
        useCORS: true,
        scale: 6,
      });

      const data = canvas.toDataURL("image/jpeg");

      if (previewRef.current) {
        previewRef.current.src = data;
      }

      images.push(data);
      console.log(images);
    }
  };

  useEffect(() => {
    generateCanvasImage();
  }, [form]);

  const getClassForTextLength = (text, baseClass, thresholds) => {
    if (!text) return baseClass;
    for (let [length, size] of thresholds) {
      if (text.length > length) return `${baseClass} ${size}`;
    }
    return baseClass;
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex gap-4 mb-4">
        <div
          className="bg-gray-500 w-96 h-96 flex-shrink-0 relative"
          ref={canvasRef}
        >
          <img
            className="absolute w-full h-full"
            src="/background.jpg"
            alt="Background"
          />
          <div className="flex justify-center items-center h-full px-4 text-center font-poppins relative">
            <div>
              <h1
                className={getClassForTextLength(
                  form.h1,
                  "font-bold text-2xl",
                  [
                    [46, "text-lg"],
                    [28, "text-xl"],
                  ]
                )}
              >
                {form.h1}
              </h1>
              <h2 className="font-light text-md leading-6">{form.h2}</h2>
            </div>
            <div className="absolute bottom-12 h-20">
              <img
                className="w-full h-full"
                src={`/icons/${form.icon}`}
                alt="Logo"
              />
            </div>
            <div className="absolute bottom-3">
              <p className="text-xl text-black font-extrabold">{form.p}</p>
            </div>
          </div>
        </div>

        <img className="bg-gray-500 w-96 h-96" ref={previewRef} />
      </div>

      <div className="flex flex-col gap-4">
        <button className="border leading-6" onClick={nextData}>
          Next
        </button>
        <button className="border leading-6" onClick={() => handleZip(images)}>
          Download
        </button>
        <input
          className="border p-1"
          name="h1"
          value={form.h1}
          onChange={handleInputChange}
        />
        <input
          className="border p-1"
          name="h2"
          value={form.h2}
          onChange={handleInputChange}
        />
        <input
          className="border p-1"
          name="p"
          value={form.p}
          onChange={handleInputChange}
        />
      </div>
    </main>
  );
}
