import { UserDto } from '../converter/dto/user.dto';
import { readFile, parseData } from './fileUtil';

describe('fileUtil', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('data.json의 array길이는 3', (done) => {
    const text: string = readFile('files/data.json');
    const data: Array<UserDto> = parseData<Array<UserDto>>(text);
    expect(data.length).toBe(3);
    done();
  });
});
