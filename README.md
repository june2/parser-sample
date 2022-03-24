### 체크 리스트

[x] template1 난이도 하
[x] template2 난이도 중
[ ] template3 난이도 상
[x] template1,2 혼합 사용

[x] template 새로운 필드 키 적용
[x] template 필드 중복 적용
[x] template loop 적용
[x] template loop 중복 적용

### 실행방법

```
#npm 모듈 설치
yarn

#test code 실행
$ yarn test

#application 실행
$ yarn start

#CLI 활용

$ yarn start [template파일 위치] [input data 파일 위치] [output 파일 위치]
$ yarn start files/template1.txt files/data.json output.txt

** args 미입력시, files/template1.txt files/data.json output.txt 으로 default 셋업
```
