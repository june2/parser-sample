import { findFors, findJsonValueByKey, findReplaces, IFindForValueMap } from '../../utils/parseUtil';
import { UserDto } from '../dto/user.dto';

export abstract class ConverterEngine {
  private text: string;
  private template: string;
  private replaceMap: Map<string, string>;
  private findForMap: Map<string, IFindForValueMap>;
  private user: UserDto;

  constructor(template: string) {
    this.template = template;
    this.replaceMap = findReplaces(this.template);
    this.findForMap = findFors(this.template);
  }

  setUser(user: UserDto) {
    this.user = user;
    this.text = this.template;
    return this;
  }

  getText(): string {
    return this.text;
  }

  convertSingle(): ConverterEngine {
    for (const [key, value] of this.replaceMap) {
      this.text = this.text.replaceAll(key, findJsonValueByKey(this.user, value));
    }
    return this;
  }

  convertMulti(): ConverterEngine {
    for (const [key, value] of this.findForMap) {
      let subText = '';
      for (const obj of findJsonValueByKey(this.user, value.target)) {
        let line = value.extractText;
        for (const [objKey, ojbValue] of value.replaceMap) {
          line = line.replace(objKey, obj[ojbValue]);
        }
        subText += line + '\n';
      }
      this.text = this.text.replaceAll(key, subText === '' ? value.extractText : subText.slice(0, -1));
    }
    return this;
  }
}
