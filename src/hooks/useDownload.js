import JSZip from "jszip";

const useDownload = () => {
  async function handleZip(images) {
    const zip = new JSZip();

    // Add Images to the zip file
    for (let i = 0; i < images.length; i++) {
      // Split the Base64 string to get the data part
      const base64Data = images[i].split(",")[1];

      // Convert Base64 string to binary data
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let j = 0; j < len; j++) {
        bytes[j] = binaryString.charCodeAt(j);
      }
      const blob = new Blob([bytes], { type: "image/jpeg" });

      // Add the blob to the zip file with a proper filename
      zip.file(`image${i + 1}.jpg`, blob);
    }

    // Generate the zip file
    const zipData = await zip.generateAsync({
      type: "blob",
      streamFiles: true,
    });

    // Create a download link for the zip file
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(zipData);
    link.download = "name-zip-folder.zip";
    link.click();
  }

  return { handleZip };
};

export default useDownload;
