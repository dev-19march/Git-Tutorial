const fs = require('fs');
const pdf = require('pdf-parse');

const pdfFilePath = '/home/dev/Desktop/task2/pdf-json/test pdf.pdf';

const dataBuffer = fs.readFileSync(pdfFilePath);

pdf(dataBuffer)
  .then(function (data) {
    const textContent = data.text;

    const parsedContent = parsePDFContent(textContent);

    console.log(parsedContent);
  })
  .catch(function (error) {
    console.error(error);
  });

function parsePDFContent(textContent) {
  const paragraphs = textContent.split('\n');

  let h1Content = '';
  let h2Content = '';
  let h3Content = '';
  let h4Content = '';
  let h5Content = '';
  const images = [];

  for (const paragraph of paragraphs) {
    if (paragraph.includes('H1:')) {
      h1Content = paragraph.replace('H1:', '').trim();
    }

    if (paragraph.includes('H2:')) {
      h2Content = paragraph.replace('H2:', '').trim();
    }

    if (paragraph.includes('H3:')) {
      h3Content = paragraph.replace('H3:', '').trim();
    }

    if (paragraph.includes('H4:')) {
      h4Content = paragraph.replace('H4:', '').trim();
    }

    if (paragraph.includes('H5:')) {
      h5Content = paragraph.replace('H5:', '').trim();
    }

    const imageMatch = paragraph.match(/<img src="(.*?)"/);
    if (imageMatch) {
      const imagePath = imageMatch[1];
      images.push(imagePath);
    }
  }

  const jsonResult = {
    body: paragraphs,
    h1: h1Content,
    h2: h2Content,
    h3: h3Content,
    h4: h4Content,
    h5: h5Content,
    images,
  };

  return jsonResult;
}





