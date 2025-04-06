import html2canvas from 'html2canvas';

const generateIMG = async (domRefToSave) => {
  if (domRefToSave.current) {
    try {
      // Capture the DOM element as a canvas
      const canvas = await html2canvas(domRefToSave.current);

      // Convert the canvas to a Base64 image (PNG format)
      const imgData = canvas.toDataURL('image/png');

      // Return the Base64 image data
      return imgData;

    } catch (error) {
      console.error("generateIMG: Error generating image.", error);
      return null;
    }
  } else {
    console.error("generateIMG: Element not available.");
    return null;
  }
};

export default generateIMG;
