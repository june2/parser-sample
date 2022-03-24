import fs from 'fs';

export const parseData = <T>(data: string): T => {
  try {
    return JSON.parse(data);
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const readFile = (inputPath: string) => {
  try {
    const data = fs.readFileSync(`${__dirname}/../${inputPath}`, 'utf8');
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const readFileStream = (inputPath: string) => {
  const stream = fs.createReadStream(`${__dirname}/../${inputPath}`, {
    start: 1,
    end: 5,
  });
  stream.on('data', (chunk) => console.log(chunk.toString()));
};

export const writeFile = (outputPath: string, data: string) => {
  try {
    fs.appendFileSync(`${__dirname}/../${outputPath}`, `${data}\r\n`);
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
