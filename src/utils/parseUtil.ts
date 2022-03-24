export interface IFindForValueMap {
  origin: string;
  extractText: string;
  target: string;
  alias: string;
  replaceMap: Map<string, string>;
}

/**
 * template이 Admin인용인지 구별하는 함수
 * @param text 타겟 텍스트
 * @returns booealn
 */
export const checkAdmin = (text: string): boolean => {
  const arr = text.match(`Admin\n`);
  return arr ? true : false;
};

/**
 * Family name: <?=USER.info.name.family?> 같은 문장에서 '<\\?=(.*?)\\?>' 형식 추출하는 함수
 *
 * @param text 타겟 텍스트
 * @param root USER.info.name.family 에서 USER 루트값을 제거하는 용도
 * @returns Map<string, string> => <<?=USER.info.name.family?>, info.name.family>
 */
export const findReplaces = (text: string, root: string = 'USER'): Map<string, string> => {
  const map = new Map();
  const regexp = new RegExp('<\\?=(.*?)\\?>', 'g');
  const matches = text.matchAll(regexp);

  for (const match of matches) {
    map.set(match[0], match[1].replace(root + '.', '').trim());
  }

  return map;
};

/**
 * <? for ADDR in USER.info.addrs ?>Address : <?= ADDR.addr1?> <?= ADDR.addr2?><? endfor ?>
 * for문 형식 문장에서 '<\\? for (.*) in (.*) \\?>\n(.*?)\n<\\? endfor \\?>' 형식 추출하는 함수
 *
 * @param text 타겟 텍스트
 * @returns Map<string, IFindForValueMap>
 */
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

/**
 * @param json 타겟 json
 * @param key json에서 찾으려는 키 (info.name.family)
 * @returns any
 */
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
