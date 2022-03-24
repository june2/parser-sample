test('When, userData=arrds 두개 이상일때', (done) => {
  done();
});
// import { sampleArray } from './converter.sample.data';
// import { ConverterService } from './converter.service';

// describe('Given, template이 2번', () => {
//   const converterService = new ConverterService();
//   const template = `Admin\n<? for ID in USERS.*.membership.id ?>\nMembership Id : <?= ID ?>\n<? endfor ?>\n\n`;
//   converterService.setTemplate(template);

//   test('When, user 데이터 한개일때', (done) => {
//     converterService.setData(sampleArray.slice(0, 1));
//     converterService.do();

//     const expected = `Admin\nMembership Id : 12345\n\n`;

//     expect(converterService.getConvertedData()).toBe(expected);
//     done();
//   });

//   test('When, user 데이터 3개일때', (done) => {
//     converterService.setData(sampleArray);
//     converterService.do();

//     const expected = `Admin\nMembership Id : 12345\nMembership Id : 67890\nMembership Id : 99999\n\n`;
//     expect(converterService.getConvertedData()).toBe(expected);
//     done();
//   });
// });
