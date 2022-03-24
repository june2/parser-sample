export interface IFindForValueMap {
  origin: string;
  extractText: string;
  target: string;
  alias: string;
  replaceMap: Map<string, string>;
}

export const checkAdmin = (text: string): boolean => {
  const arr = text.match(`Admin\n`);
  return arr ? true : false;
};

export const findReplaces = (text: string, root: string = 'USER'): Map<string, string> => {
  const map = new Map();
  const regexp = new RegExp('<\\?=(.*?)\\?>', 'g');
  const matches = text.matchAll(regexp);

  for (const match of matches) {
    map.set(match[0], match[1].replace(root + '.', '').trim());
  }

  return map;
};

export const findFors = (text: string): Map<string, IFindForValueMap> => {
  const map = new Map();
  const regexp = new RegExp('<\\? for (.*) in (.*) \\?>\n(.*?)\n<\\? endfor \\?>', 'g');
  const matches = text.matchAll(regexp);

  for (const match of matches) {
    const target = match[2].replace('USER.', '');
    let obj = { extractText: match[3], target: '', alias: '', replaceMap: new Map() };
    obj.target = target;
    obj.alias = match[1];
    obj.replaceMap = findReplaces(obj.extractText, obj.alias);
    map.set(match[0], obj);
  }

  return map;
};

export const findJsonValueByKey = (json: any, key: string): any => {
  try {
    const keys = key.split('.');

    if (keys.length === 1) {
      return json[keys[0]] ?? '?';
    } else {
      const childJson = json[keys[0]];
      keys.shift();
      return findJsonValueByKey(childJson, keys.join('.'));
    }
  } catch (e) {
    return '?';
  }
};
