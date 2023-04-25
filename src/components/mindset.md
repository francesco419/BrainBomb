## 엘리먼트 사이에 지속적으로 연결이 가능한 선 제작

- 기본적으로 position / border-left / left / height / top / transform / transform-origin

1.  position = absolute
2.  border-left = 한쪽면의 선만 사용 (참고로 width는 0px, 넓이가 존재하지 않음);
3.  left, height, top = 선(line)의 위치 지정. left는 x좌표, height는 두 element 사이의 거리, top은 y좌표로 설정한다.
4.  transform = rotate를 사용하여 두 element의 사이에 기울어짐이 있다면 이를 적요하기 위함.
5.  transform-origin = 선(line)의 회전 중심축.

## 계산필요 식

- elementA(기준), elementB(대상)

1.  elementA를 대상으로 elementB를 지정
2.  A, B의 각각의 offset을 계산하여 선의 시작점(top.left), 끝점(height,transform(rotate))를 계산해야한다.
3.  top, left는 B(대상)의 중심점을 시작으로 하기에, left = offsetX - BOXwidth 와 top = offsetY - BOXheight를 계산.
4.  height, transform(rotate)를 A(기준)과의 거리계산 -> height는 서로의 offsetY 차이, transform(rotate)는 x좌표의 거리차이를 계산.

## 구성

- 마인드맵 구성에서 배열 사용.

1.  다차원 배열을 사용. ex> `[여행,[어디,제주도,...],[언제,4월,[5월,말,중순]],[...]]`
2.  각 연결점에 대한 코드를 어떻게 구성할 것인가
    - redux
    - prop
    - ?
3.  element 추가와 삭제
4.  전체적인 레이아웃

### 위치

- redux의 pathSlice 사용
