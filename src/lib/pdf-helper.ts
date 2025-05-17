import jsPDF from "jspdf"

interface Section {
  id: string
  title: string
  content: string
}

export const generateTermsPDF = (sections: Section[]) => {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Add title
  doc.setFontSize(20)
  doc.setTextColor(40, 40, 40)
  doc.text("Terms and Conditions", 20, 20)

  // Add date
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Last updated: ${new Date().toLocaleDateString()}`, 20, 30)

  let yPosition = 40

  // Add each section
  sections.forEach((section) => {
    // Add section title
    doc.setFontSize(14)
    doc.setTextColor(40, 40, 40)
    doc.text(section.title, 20, yPosition)
    yPosition += 10

    // Add section content
    doc.setFontSize(10)
    doc.setTextColor(80, 80, 80)

    // Split content into lines to fit page width
    const textLines = doc.splitTextToSize(section.content, 170)

    // Check if we need a new page
    if (yPosition + textLines.length * 5 > 280) {
      doc.addPage()
      yPosition = 20
    }

    doc.text(textLines, 20, yPosition)
    yPosition += textLines.length * 5 + 15

    // Add some space between sections
    if (yPosition > 280) {
      doc.addPage()
      yPosition = 20
    }
  })

  // Add footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `© ${new Date().getFullYear()} Your Company Name. All rights reserved. | Page ${i} of ${pageCount}`,
      20,
      285,
    )
  }

  // Save the PDF
  doc.save("terms-and-conditions.pdf")
} 