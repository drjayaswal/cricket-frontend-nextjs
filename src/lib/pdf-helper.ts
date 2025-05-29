import { jsPDF } from "jspdf"

interface Section {
  id: string
  title: string
  content: string
}

export const generateTermsPDF = (sections: { title: string; content: string }[]) => {
  const doc = new jsPDF()
  let y = 20

  // Add title
  doc.setFontSize(20)
  doc.text("Terms & Conditions for Cricstock11", 20, y)
  y += 20

  // Add sections
  doc.setFontSize(12)
  sections.forEach((section) => {
    // Add section title
    doc.setFont("helvetica", "bold")
    doc.text(section.title, 20, y)
    y += 10

    // Add section content
    doc.setFont("helvetica", "normal")
    const splitText = doc.splitTextToSize(section.content, 170)
    doc.text(splitText, 20, y)
    y += splitText.length * 7 + 10

    // Add page break if needed
    if (y > 270) {
      doc.addPage()
      y = 20
    }
  })

  // Save the PDF
  doc.save("terms-and-conditions.pdf")
}

export const generateTermsWord = (sections: { title: string; content: string }[]) => {
  // Create a blob with the content
  const content = sections.map(section => 
    `${section.title}\n\n${section.content}\n\n`
  ).join("")

  // Create a blob with the content
  const blob = new Blob([content], { type: "application/msword" })
  
  // Create a download link
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "terms-and-conditions.doc"
  
  // Trigger the download
  document.body.appendChild(link)
  link.click()
  
  // Clean up
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
} 