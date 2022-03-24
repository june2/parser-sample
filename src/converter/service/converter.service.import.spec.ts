import { ConverterService } from "./converter.service"

describe("Given, data = data.json", () => {
  const converterService = new ConverterService()

  beforeAll(() => {
    // jest
    //   .spyOn(ConverterService.prototype, 'import')
    //   .mockImplementation();
    // jest
    //   .spyOn(ConverterService.prototype, 'export')
    //   .mockImplementation();
  })

  test("When, template이 1번 defulat", (done) => {
    converterService.setTemplateFilePath("files/template1.txt")
    const template = converterService.getTemplate()

    // then
    const expected = `Family name: <?=USER.info.name.family?>\nGiven name: <?=USER.info.name.given ?>\nAddress : <?= USER.info.addrs.0.addr1?> <?= USER.info.addrs.0.addr2?>\nMemberShip : <?=USER.membership.grade?> <?= USER.membership.id ?>\n\n`
    expect(template).toBe(expected)
    done()
  })

  test("When, template이 2번일때", (done) => {
    converterService.setTemplateFilePath("files/template2.txt")
    const template = converterService.getTemplate()

    // then
    const expected = `Name: <?=USER.info.name.given ?> <?=USER.info.name.family?>\n<? for ADDR in USER.info.addrs ?>\nAddress : <?= ADDR.addr1?> <?= ADDR.addr2?>\n<? endfor ?>\n\n`
    expect(template).toBe(expected)
    done()
  })

  test("When, template이 3번일때", (done) => {
    converterService.setTemplateFilePath("files/template3.txt")
    const template = converterService.getTemplate()

    // then
    const expected = `Admin\n<? for ID in USERS.*.membership.id ?>\nMembership Id : <?= ID ?>\n<? endfor ?>\n\n`
    expect(template).toBe(expected)
    done()
  })
})
