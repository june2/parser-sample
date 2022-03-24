import { parseData, readFile, writeFile } from "../../utils/fileUtil"
import { UserDto } from "../dto/user.dto"
import { ConverterEngineUser } from "../engine/converter.engine.user"

export class ConverterService {
  private templateFilePath: string = "files/template1.txt"
  private inputFilePath: string = "files/data.json"
  private outputFilePath: string = "files/output.txt"
  private template: string
  private convertedData: string = ""
  private data: Array<UserDto>

  setTemplate(template: string) {
    this.template = template
  }

  getTemplate() {
    return this.template
  }

  setData(data: Array<UserDto>) {
    this.data = data
  }

  getData() {
    return this.data
  }

  getConvertedData() {
    return this.convertedData
  }

  setTemplateFilePath(templateFilePath: string) {
    this.templateFilePath = templateFilePath
  }

  setOutputFilePath(outputFilePath: string) {
    this.outputFilePath = outputFilePath
  }

  setInputFilePath(inputFilePath: string) {
    this.inputFilePath = inputFilePath
  }

  importData(): void {
    const text: string = readFile(this.inputFilePath)
    this.data = parseData<Array<UserDto>>(text)
  }

  importTemplate(): void {
    this.template = readFile(this.templateFilePath)
  }

  do(): void {
    this.importTemplate()
    this.importData()

    const converterEngine: ConverterEngineUser = new ConverterEngineUser(this.template)

    this.data.forEach((user: UserDto) => {
      const out = converterEngine.setUser(user).convertMulti().convertSingle().getText()
      this.convertedData += out
    })
  }

  export(): void {
    this.do()
    writeFile(this.outputFilePath, this.convertedData)
  }

  // if (checkAdmin(this.template)) {
  //   let membershipText = '';
  //   const result = findFor(this.template);

  //   if (result) {
  //     this.data.forEach((user: UserDto, i: number) => {
  //       membershipText += result?.extractText.replace('<?= ID ?>', user.membership?.id ?? '?');
  //       if (i + 1 !== this.data.length) {
  //         membershipText += '\n';
  //       }
  //     });
  //     this.convertedData = this.template.replace(result?.target, membershipText);
  //   }
  // } else {
  //   this.data.forEach((user: UserDto) => {
  //     this.convertedData = this.convert(user);
  //   });
  // }
}
