import { findFors, findJsonValueByKey, findReplaces } from './parseUtil';

describe('parseUtil-findFor', () => {
  // test('<? for (.*) in (.*) ?><? endfor ?> 형태가 아닐때', (done) => {
  //   const text = '';
  //   const result = findFors(text);
  //   expect(result.size).toBe(0);
  //   done();
  // });
  // test('<? for (.*) in (.*) ?><? endfor ?> 형태 일때', (done) => {
  //   const text = `Name: <?=USER.info.name.given ?> <?=USER.info.name.family?>\n<? for ADDR in USER.info.addrs ?>\nAddress : <?= ADDR.addr1?> <?= ADDR.addr2?>\n<? endfor ?>\n\n`;
  //   const result = findFors(text);
  //   const [firstKey] = result.keys();
  //   const expcetedKey = `<? for ADDR in USER.info.addrs ?>\nAddress : <?= ADDR.addr1?> <?= ADDR.addr2?>\n<? endfor ?>`;
  //   expect(firstKey).toBe(expcetedKey);
  //   expect(result.get(firstKey)?.extractText).toBe(`Address : <?= ADDR.addr1?> <?= ADDR.addr2?>`);
  //   expect(result.get(firstKey)?.alias).toBe(`ADDR`);
  //   expect(result.get(firstKey)?.target).toBe(`info.addrs`);
  //   done();
  // });
});

describe('parseUtil-findReplace', () => {
  test('<?=(.*)?> 형태가 아닐때', (done) => {
    const text = '';
    const result = findReplaces(text);
    expect(result.size).toBe(0);
    done();
  });

  test('<?=   USER.info.name.family   ?> 형태 일때', (done) => {
    const text = `<?=USER.info.name.given ?>    <?= USER.info.name.family?>`;
    const map = findReplaces(text);
    expect(map.has('<?=USER.info.name.given ?>')).toBe(true);
    expect(map.has('<?= USER.info.name.family?>')).toBe(true);
    done();
  });
});

describe('findJsonValueByKey', () => {
  test('key 가 info.name.family 일때', (done) => {
    const json = {
      info: {
        name: {
          family: 'Doe',
          given: 'John',
          middle: 'Siva',
        },
        addrs: [
          { addr1: 'AAA', addr2: 'BBB' },
          { addr1: '123', addr2: '234' },
        ],
      },
      membership: {
        grade: 'SILVER',
        id: '67890',
      },
    };

    const result = findJsonValueByKey(json, 'info.name.family');
    expect(result).toBe('Doe');
    done();
  });

  test('key 가 info.name.family 가 없을 때', (done) => {
    const json = {
      info: {
        name: {},
        addrs: [
          { addr1: 'AAA', addr2: 'BBB' },
          { addr1: '123', addr2: '234' },
        ],
      },
    };

    const result = findJsonValueByKey(json, 'info.name.family');
    expect(result).toBe('?');
    done();
  });

  test('key 가 info.addrs.0.addr1 일때', (done) => {
    const json = {
      info: {
        name: {},
        addrs: [
          { addr1: 'AAA', addr2: 'BBB' },
          { addr1: '123', addr2: '234' },
        ],
      },
    };

    const result = findJsonValueByKey(json, 'info.addrs.0.addr1');
    expect(result).toBe('AAA');
    done();
  });

  test('key 가 info.addrs.0.addr1 이고 addrs 가 빈열일때', (done) => {
    const json = {
      info: {
        name: {},
        addrs: [],
      },
    };

    const result = findJsonValueByKey(json, 'info.addrs.0.addr1');
    expect(result).toBe('?');
    done();
  });
});
