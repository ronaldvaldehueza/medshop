import jsPDF from 'jspdf' 
// import html2canvas from 'html2canvas'
    import React, { useEffect, useRef } from 'react'

const printPDF = (domRefToSave, pageOrientation, destinationFile) => { 
  if (domRefToSave.current) {
    savePDF(domRefToSave, pageOrientation, destinationFile)

  const iframeRef = useRef(null)

  useEffect(() => {
    // Generate your PDF here (assuming you have a jsPDF instance called 'pdf')
    const pdf = new jsPDF()
    // ... (populate the pdf)
    const pdfDataUrl = pdf.output('dataurlstring')

    // Set iframe src and trigger print when iframe loads
    const handleIframeLoad = () => {
      iframeRef.current.contentWindow.print()
    }

    iframeRef.current.src = pdfDataUrl
    iframeRef.current.addEventListener('load', handleIframeLoad)

    // Cleanup after print
    return () => {
      iframeRef.current.removeEventListener('load', handleIframeLoad)
    }
  }, [])  // Empty dependency array means this useEffect runs once when component mounts

  return (
    <iframe
      ref={iframeRef}
      style={{ display: 'none' }}
      title="Print PDF"
    />
  )

  } else {
    console.error("printPDF: Element not available.")
  }

}

export default printPDF