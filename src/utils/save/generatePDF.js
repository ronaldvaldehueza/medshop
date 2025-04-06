import jsPDF from 'jspdf' 
import html2canvas from 'html2canvas'


const generatePDF = async (domRefToSave, pageOrientation, destinationFile, saveSwitch) => { 
  if (domRefToSave.current) {
        try {
          const canvas = await html2canvas(domRefToSave.current)
          const imgData = canvas.toDataURL('image/png')
          const pdf = new jsPDF({orientation: pageOrientation})

          // PDF width and height in points (1 point = 1/72 inch)
          const pdfWidth = pdf.internal.pageSize.getWidth()
          const pdfHeight = pdf.internal.pageSize.getHeight()
          
          // Image width and height in pixels
          const imgWidth = canvas.width
          const imgHeight = canvas.height

          // Calculate aspect ratios
          const pdfAspectRatio = pdfWidth / pdfHeight
          const imgAspectRatio = imgWidth / imgHeight

          let renderWidth, renderHeight

          // Compare aspect ratios to fit the image within PDF dimensions
          if (pdfAspectRatio > imgAspectRatio) {
            renderHeight = pdfHeight
            renderWidth = imgWidth * renderHeight / imgHeight
          } else {
            renderWidth = pdfWidth
            renderHeight = imgHeight * renderWidth / imgWidth
          }
          
          // Add image to PDF, centering it
          const offsetX = (pdfWidth - renderWidth) / 2
          const offsetY = (pdfHeight - renderHeight) / 2

          pdf.addImage(imgData, 'PNG', offsetX, offsetY, renderWidth, renderHeight)

          // console.log("Entered async generatePDF...")
          if (saveSwitch) pdf.save(destinationFile) 
         
          return pdf 

        } catch (error) {
            console.error("savePDF: Error generating PDF.", error)
          return null
        }
  } else {
    console.error("savePDF: Element not available.")
  }

}

export default generatePDF