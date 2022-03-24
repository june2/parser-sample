import { sampleArray } from './converter.sample.data';
import { ConverterService } from './converter.service';

describe('Given, template이 2번', () => {
  let converterService: ConverterService;

  beforeEach(() => {
    converterService = new ConverterService();
    const template = `Name: <?=USER.info.name.given ?> <?=USER.info.name.family?>\n<? for ADDR in USER.info.addrs ?>\nAddress : <?= ADDR.addr1?> <?= ADDR.addr2?>\n<? endfor ?>\n\n`;
    converterService.setTemplate(template);
  });

  test('When, userData=누락 데이터 없을 때', (done) => {
    converterService.setData(sampleArray.slice(0, 1));
    converterService.do();

    const expected = `Name: HS KIM\nAddress : ABC CDE\n\n`;
    expect(converterService.getConvertedData()).toBe(expected);
    done();
  });

  test('When, userData=arrds 두개 이상일때', (done) => {
    converterService.setData(sampleArray.slice(1, 2));
    converterService.do();

    const expected = `Name: John Doe\nAddress : AAA BBB\nAddress : 123 234\n\n`;

    expect(converterService.getConvertedData()).toBe(expected);
    done();
  });
});
