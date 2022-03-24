import { parseData, readFile, writeFile } from '../../utils/fileUtil';
import { checkAdmin, findFor } from '../../utils/parseUtil';
import { UserDto } from '../dto/user.dto';

export class ConverterEngineUsers {
  private text: string;
  private template: string;
  private user: UserDto;
  private subTemplate: { target: string; extractText: string } | null;

  constructor(template: string) {
    this.template = template;
    this.subTemplate = findFor(this.template);
  }
}