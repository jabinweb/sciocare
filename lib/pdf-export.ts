import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface BatchReportData {
  batchName: string;
  className: string;
  teacherName: string;
  studentCount: number;
  generatedAt: string;
  students: Array<{
    name: string;
    email: string;
    topicsCompleted: number;
    totalTopics: number;
    totalTimeSpent: number;
    lastActivity: string;
  }>;
}

export const exportBatchPDF = (data: BatchReportData) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text(`Batch Report: ${data.batchName}`, 14, 22);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Program: ${data.className}`, 14, 30);
  doc.text(`Teacher: ${data.teacherName}`, 14, 35);
  doc.text(`Generated on: ${new Date(data.generatedAt).toLocaleString()}`, 14, 40);

  doc.setFontSize(12);
  doc.setTextColor(40);
  doc.text(`Total Students: ${data.studentCount}`, 14, 50);

  const tableColumn = ['Student Name', 'Email', 'Progress', 'Time Spent', 'Last Activity'];
  const tableRows = data.students.map((student) => [
    student.name,
    student.email,
    `${student.topicsCompleted}/${student.totalTopics} topics`,
    `${Math.floor(student.totalTimeSpent / 60)}h ${student.totalTimeSpent % 60}m`,
    student.lastActivity === 'No recent activity'
      ? student.lastActivity
      : new Date(student.lastActivity).toLocaleDateString(),
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 60,
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] },
  });

  doc.save(`batch_report_${data.batchName.replace(/\s+/g, '_').toLowerCase()}.pdf`);
};
