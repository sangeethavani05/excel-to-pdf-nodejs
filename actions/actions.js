const XLSX = require('xlsx');
const PDF = require('html-pdf-node');

class Actions{
  constructor(app){
    this.app = app;
  }

  async uploadFile(file){
    try{
      // Uploaded XLSX file
      const xlsx_file = this.app.path.join(__dirname,'../',file.file.originalname);

      // Read XLSX File and HTML Conversion
      const xlsx_data = await XLSX.readFile(xlsx_file);
      const html_data = await XLSX.write(xlsx_data,{type:'binary',bookType:'html'});

      // HTML to PDF File Conversion
      const pdf_file_name = file.file.originalname.substring(0, file.file.originalname.length - 5)+'.pdf';
      const pdf_file_path = this.app.path.join(__dirname,'../',pdf_file_name);
      const pdf_file = await PDF.generatePdf({content: html_data},{ path: pdf_file_path });

      // Result
      let result = Buffer.isBuffer(pdf_file);
      console.log(`${new Date()} ${file.file.originalname} Conversion: ${result ? 'Success' : 'Failed'}`);
        
      return result;
    }
    catch(e){
      console.log(`${new Date()} Catch in Upload File: ${JSON.stringify(e)}`);
      return e;
    }    
  }
}

module.exports = Actions;