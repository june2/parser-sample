import { sampleArray } from './converter.sample.data';
import { ConverterService } from './converter.service';

describe('Given, template이 1번', () => {
  let converterService: ConverterService;
  beforeEach(() => {
    converterService = new ConverterService();
    const template = `Family name: <?=USER.info.name.family?>\nGiven name: <?=USER.info.name.given ?>\nAddress : <?= USER.info.addrs.0.addr1?> <?= USER.info.addrs.0.addr2?>\nMemberShip : <?=USER.membership.grade?> <?= USER.membership.id ?>\n\n`;
    converterService.setTemplate(template);
  });

  test('When, userData=누락 데이터 없을 때', (done) => {
    converterService.setData(sampleArray.slice(0, 1));
    converterService.do();

    const expected = `Family name: KIM\nGiven name: HS\nAddress : ABC CDE\nMemberShip : GOLD 12345\n\n`;

    expect(converterService.getConvertedText()).toBe(expected);
    done();
  });

  test('When, userData=arrds 두개 이상일때', (done) => {
    converterService.setData(sampleArray.slice(1, 2));
    converterService.do();

    const expected = `Family name: Doe\nGiven name: John\nAddress : AAA BBB\nMemberShip : SILVER 67890\n\n`;
    expect(converterService.getConvertedText()).toBe(expected);
    done();
  });

  test('When, userData=addrs누락시', (done) => {
    converterService.setData(sampleArray.slice(2, 3));
    converterService.do();

    const expected = `Family name: Doe\nGiven name: Jane\nAddress : ? ?\nMemberShip : BRONZE 99999\n\n`;
    expect(converterService.getConvertedText()).toBe(expected);
    done();
  });
});
