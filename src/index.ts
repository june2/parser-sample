import { ConverterService } from './converter';

const templateFilePath = process.argv[2] ?? 'files/template1.txt';
const inputFilePath = process.argv[3] ?? 'files/data.json';
const outputFilePath = process.argv[4] ?? 'files/output.txt';

console.log(`templateFilePath: ${templateFilePath}\ninputFilePath: ${inputFilePath}\noutPutFilePath: ${outputFilePath}`);

const converter = new ConverterService();
converter.setTemplateFilePath(templateFilePath);
converter.setInputFilePath(inputFilePath);
converter.setOutputFilePath(outputFilePath);
converter.export();

console.log('done !');
