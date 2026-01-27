import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Module d'export PDF
export class PDFExporter {
  constructor() {
    this.jsPDF = jsPDF;
    this.html2canvas = html2canvas;
  }

  // Exporter les résultats de calcul en PDF
  async exportResults(resultsElement, filename = 'resultats-vmc.pdf') {
    try {
      // Créer un canvas de l'élément résultats
      const canvas = await html2canvas(resultsElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Créer le PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Calculer les dimensions pour s'adapter à la page A4
      const imgWidth = 210; // Largeur A4 en mm
      const pageHeight = 295; // Hauteur A4 en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Ajouter la première page
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Ajouter des pages supplémentaires si nécessaire
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Ajouter des métadonnées
      pdf.setProperties({
        title: 'Résultats de calcul VMC',
        subject: 'Vérification des débits VMC',
        author: 'Mémo VMC',
        keywords: 'VMC, ventilation, débit, calcul',
        creator: 'Mémo VMC Application'
      });

      // Télécharger le PDF
      pdf.save(filename);
      
      console.log('PDF exporté avec succès');
      
      // Tracker l'export PDF
      if (window.analytics) {
        window.analytics.trackPDFExport(filename);
      }
      
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      alert('Erreur lors de l\'export PDF. Veuillez réessayer.');
      return false;
    }
  }

  // Exporter une section complète en PDF
  async exportSection(sectionElement, title = 'Section VMC', filename = 'section-vmc.pdf') {
    try {
      const canvas = await html2canvas(sectionElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight > pageHeight ? pageHeight : imgHeight);

      pdf.setProperties({
        title: title,
        subject: 'Documentation VMC',
        author: 'Mémo VMC',
        creator: 'Mémo VMC Application'
      });

      pdf.save(filename);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'export de section:', error);
      return false;
    }
  }
}

// Fonction utilitaire pour ajouter un bouton d'export
export function addExportButton(container, resultsElement, filename = 'resultats-vmc.pdf') {
  const exportBtn = document.createElement('button');
  exportBtn.textContent = '📄 Exporter en PDF';
  exportBtn.className = 'btn btn-secondary export-pdf-btn';
  exportBtn.style.marginTop = '20px';
  exportBtn.style.marginLeft = '10px';

  exportBtn.addEventListener('click', async () => {
    const exporter = new PDFExporter();
    exportBtn.textContent = '⏳ Export en cours...';
    exportBtn.disabled = true;

    const success = await exporter.exportResults(resultsElement, filename);

    exportBtn.textContent = success ? '✅ Export réussi !' : '❌ Erreur d\'export';
    exportBtn.disabled = false;

    // Remettre le texte original après 3 secondes
    setTimeout(() => {
      exportBtn.textContent = '📄 Exporter en PDF';
      exportBtn.disabled = false;
    }, 3000);
  });

  container.appendChild(exportBtn);
}