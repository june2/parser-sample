import { parseData, readFile, writeFile } from "../../utils/fileUtil"
import { UserDto } from "../dto/user.dto"
import { ConverterEngineUser } from "../engine/converter.engine.user"

export class ConverterService {
  private outputFilePath: string = "files/output.txt"
  private convertedData: string = ""
  private template: string
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
    this.template = readFile(templateFilePath)
  }

  setInputFilePath(inputFilePath: string) {
    const text: string = readFile(inputFilePath)
    this.data = parseData<Array<UserDto>>(text)
  }

  setOutputFilePath(outputFilePath: string) {
    this.outputFilePath = outputFilePath
  }

  do(): void {
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
}
