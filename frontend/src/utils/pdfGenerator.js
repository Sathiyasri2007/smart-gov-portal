import { jsPDF } from 'jspdf';

export const generateApplicationReceipt = (application, user) => {
  try {
    console.log('Generating PDF for application:', application);
    console.log('User data:', user);

    const doc = new jsPDF();
    
    // Header with blue-grey background
    doc.setFillColor(104, 114, 122);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Smart Government Portal', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('Application Receipt', 105, 30, { align: 'center' });
    
    // Reset text color to black
    doc.setTextColor(0, 0, 0);
    
    // Section: Application Details
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Application Details', 20, 55);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    let yPos = 70;
    const lineHeight = 8;
    
    // Application ID
    doc.setFont('helvetica', 'bold');
    doc.text('Application ID:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(application._id || 'N/A', 80, yPos);
    yPos += lineHeight;
    
    // Scheme Name
    doc.setFont('helvetica', 'bold');
    doc.text('Scheme Name:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(application.scheme?.name || 'N/A', 80, yPos);
    yPos += lineHeight;
    
    // Category
    doc.setFont('helvetica', 'bold');
    doc.text('Category:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(application.scheme?.category || 'N/A', 80, yPos);
    yPos += lineHeight;
    
    // Status
    doc.setFont('helvetica', 'bold');
    doc.text('Status:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text((application.status || 'pending').toUpperCase(), 80, yPos);
    yPos += lineHeight;
    
    // Applied On
    doc.setFont('helvetica', 'bold');
    doc.text('Applied On:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date(application.createdAt).toLocaleDateString(), 80, yPos);
    yPos += lineHeight + 5;
    
    // Section: Applicant Details
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Applicant Details', 20, yPos);
    yPos += lineHeight + 2;
    
    doc.setFontSize(11);
    
    // Name
    doc.setFont('helvetica', 'bold');
    doc.text('Name:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(user?.name || 'N/A', 80, yPos);
    yPos += lineHeight;
    
    // Email
    doc.setFont('helvetica', 'bold');
    doc.text('Email:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(user?.email || 'N/A', 80, yPos);
    yPos += lineHeight;
    
    // Phone
    doc.setFont('helvetica', 'bold');
    doc.text('Phone:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(user?.phone || 'N/A', 80, yPos);
    yPos += lineHeight + 5;
    
    // Section: Application Information
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Application Information', 20, yPos);
    yPos += lineHeight + 2;
    
    doc.setFontSize(11);
    
    // Annual Income
    doc.setFont('helvetica', 'bold');
    doc.text('Annual Income:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(`Rs. ${application.income || 0}`, 80, yPos);
    yPos += lineHeight;
    
    // Family Members
    doc.setFont('helvetica', 'bold');
    doc.text('Family Members:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(String(application.familyMembers || 0), 80, yPos);
    yPos += lineHeight;
    
    // Documents Submitted
    doc.setFont('helvetica', 'bold');
    doc.text('Documents Submitted:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(String(application.documents?.length || 0), 80, yPos);
    
    // Footer
    const footerY = 270;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('This is a computer-generated receipt and does not require a signature.', 105, footerY, { align: 'center' });
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, footerY + 5, { align: 'center' });
    
    // Border
    doc.setDrawColor(104, 114, 122);
    doc.setLineWidth(0.5);
    doc.rect(10, 45, 190, 230);
    
    // Save PDF
    const filename = `Application_Receipt_${application._id}.pdf`;
    console.log('Saving PDF as:', filename);
    doc.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error in generateApplicationReceipt:', error);
    throw error;
  }
};
