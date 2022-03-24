1.  과제 내용

제시된 템플릿 문법이 의도하는대로 값을 채워넣어 출력하는 템플릿 엔진을 작성하세요.

2. 요구사항

상/중/하 난이도 중 택1하여 진행 가능합니다.
템플릿과 데이터는 파일에서 읽어와서 처리합니다.
출력은 output.txt 파일에 출력하도록 합니다.
다른 구성의 템플릿과 데이터로도 작동해야 합니다.

3. 제약사항
   템플릿의 문법과 표현은 변경할 수 없습니다.
   JSON parse 이외의 외부 라이브러리는 사용할 수 없습니다.
   커맨드라인 어플리케이션으로 작성하도록 합니다.

4. 데이터
   데이터는 사용자 정보의 Array로 되어 있습니다.

5. 난이도 선택

- 선택1) 템플릿 난이도 하
  이 템플릿의 입력은 각 USER 입니다.

```
Family name: <?=USER.info.name.family?>\n
Given name: <?=USER.info.name.given ?>\n
Address : <?= USER.info.addrs.0.addr1?> <?= USER.info.addrs.0.addr2?>\n
MemberShip : <?=USER.membership.grade?> <?= USER.membership.id ?>\n
\n
```

기대결과

```
Family name: KIM
Given name: HS
Address : ABC CDE
MemberShip : GOLD 12345

Family name: Doe
Given name: John
Address : AAA BBB
MemberShip : SILVER 67890

Family name: Doe
Given name: Jane
Address : ? ?
MemberShip : BRONZE 99999
```

- 선택2) 템플릿 난이도 중
  이 템플릿의 입력은 각 USER 입니다.

```
Name: <?=USER.info.name.given ?> <?=USER.info.name.family?>\n
<? for ADDR in USER.info.addrs ?>
Address : <?= ADDR.addr1?> <?= ADDR.addr2?>\n
<? endfor ?>
\n
```

기대결과

```
Name: HS KIM
Address : ABC CDE

Name: John Doe
Address : AAA BBB
Address : 123 234

Name: Jane Doe
```

- 선택3) 템플릿 난이도 상
  이 템플릿의 입력은 USERS (최상위 Array) 입니다.

```
Admin\n
<? for ID in USERS.*.membership.id ?>
Membership Id : <?= ID ?>\n
<? endfor ?>
\n
```

기대결과

```
Admin
Membership Id : 12345
Membership Id : 67890
Membership Id : 99999
```
