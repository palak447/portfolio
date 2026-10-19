const path = require('path');
const fs = require('fs');

function downloadCv(format) {
  const files = {
    pdf: { name: 'Palak_Srivastava_CV.pdf', type: 'application/pdf' },
    docx: { name: 'Palak_Srivastava_CV.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
  };
  const file = files[format];

  return (req, res, next) => {
    const filePath = path.join(__dirname, '../../files', file.name);
    fs.access(filePath, fs.constants.R_OK, (accessError) => {
      if (accessError) {
        if (accessError.code === 'ENOENT') {
          return res.status(404).json({ message: `CV ${format.toUpperCase()} file is not available.` });
        }
        return next(accessError);
      }

      res.download(filePath, file.name, { headers: { 'Content-Type': file.type } }, (downloadError) => {
        if (!downloadError) return;
        if (!res.headersSent) return next(downloadError);
      });
    });
  };
}

module.exports = { downloadCv };
