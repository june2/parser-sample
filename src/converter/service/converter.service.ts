import { parseData, readFile, writeFile } from '../../utils/fileUtil';
import { UserDto } from '../dto/user.dto';
import { ConverterEngineUser } from '../engine/converter.engine.user';

export class ConverterService {
  private outputFilePath: string = 'files/output.txt';
  private convertedText: string = '';
  private template: string;
  private data: Array<UserDto>;

  setTemplate(template: string): void {
    this.template = template;
  }

  getTemplate(): string {
    return this.template;
  }

  setData(data: Array<UserDto>): void {
    this.data = data;
  }

  getData(): Array<UserDto> {
    return this.data;
  }

  getConvertedText(): string {
    return this.convertedText;
  }

  setTemplateFilePath(templateFilePath: string): void {
    this.template = readFile(templateFilePath);
  }

  setInputFilePath(inputFilePath: string): void {
    const text: string = readFile(inputFilePath);
    this.data = parseData<Array<UserDto>>(text);
  }

  setOutputFilePath(outputFilePath: string): void {
    this.outputFilePath = outputFilePath;
  }

  do(): void {
    const converterEngine: ConverterEngineUser = new ConverterEngineUser(this.template);

    this.data.forEach((user: UserDto) => {
      const out = converterEngine.setUser(user).convertMulti().convertSingle().getText();
      this.convertedText += out;
    });
  }

  export(): void {
    this.do();
    writeFile(this.outputFilePath, this.convertedText);
  }
}
