# react-netflix-clone

## Demo
https://bluepebble25.github.io/react-netflix-clone

## Screenshot
<img src="https://user-images.githubusercontent.com/71175587/186346287-66e67170-fd60-484b-a2a2-8c1b642c522b.PNG" alt="react-netflix-clone_screenshot" width="800" />

## 사용된 기술들
- React
- CSS
- Styled Components
- react-router-dom
- axios
<br><br>

## 만들면서 배운 것
<details>
  <summary>axios 인스턴스 만들어서 이용하기</summary>
  axios.create()로 인스턴스를 만든다. create의 파라미터로는 `{baseURL: "중복되는 url부분", parmas: {apikey: '', language: 'ko-KR'}}`와 같은 객체를 준다. axios.interceptors()로 미들웨어같은 역할을 하는 로직을 추가할 수도 있다. 이와 쌍으로 사용할 requests 파일에는 baseURL 뒤에 올 하위 주소를 담은 객체를 준비한다. axios와 request를 import해 `axios(requests.fetchComedyMovie)`처럼 사용하면 가독성과 데이터 관리에 좋다.
</details>

<details>
  <summary>useDebounce hook - 검색어 지연 hook.</summary>
  (사용자 입력값, 지연시간)을 파라미터로 받아서 일정 시간 후에 값을 debounce하는(다시 돌려주는) hook이다. 매 입력마다 불필요한 API의 호출을 막기 위해 사용한다. useEffect() 안에서 `setTimeout(() => setDebouncedValue(), 지연시간)`으로 타이머를 설정해놓고 기다리는 동안 새로운 입력이 들어온다면 이전 effect가 clear되어서 setDebounceValue의 반환은 이루어지지 않는다. 사용자의 입력이 느려지거나 멈추어 clear가 이뤄지지 않은 상황에서 setDebouncedValue가 온전히 실행되어 입력값을 반환한다.
</details>

<details>
  <summary>useOnClickOutside hook</summary>
  (ref, handler)을 파라미터로 받는다. ref는 예를 들면 모달창 같은 요소이고 handler는 바깥을 클릭하면 수행할 행동이다. 여기서는 모달창을 닫는 행동을 원하기 때문에 `setIsModalOpen(false)`를 handler로 준다. hook 내부에서 useEffect로 다음과 같은 행동을 하는 클릭 이벤트리스너를 등록한다. ref가 클릭한 곳(event.target)을 포함하지 않는다면 ref의 바깥을 클릭한 것이므로 handler를 실행한다. 이벤트의 등록이 클릭마다 중첩되면 안 되므로 useEffect()에서 이벤트를 clear하는 코드를 작성하는 것도 잊지 말아야 한다.
</details>

<details>
  <summary>Skeleton UI</summary>
  data fetch를 해 올 때 배열이 비어있으면 컴포넌트가 뭉텅 잘려보이는 것을 메우기 위해 빈 div를 채워준다. 그냥 단색의 사각형을 채우는 것도 좋지만 그라디언트를 가진 div가 옆으로 지나가게 해서 반짝임 효과를 내는 애니메이션도 연습해보자.
</details>

<details>
  <summary>반응형으로 Columns 개수 조절하기</summary>
  <ul>
    <li>
      컨테이너에는 `display: flex; flex-wrap: wrap` 속성을 준다. 그리고 colum의 오른쪽에 margin을 일정하게 준다.
    </li>
    <li>
      한 줄에 몇 개의 요소를 보여줄 것이냐에 따라 column의 width를 calc()로 계산해줘야 한다.<br>
      한 줄에 5개씩 보여주고 margin-right이 10px이라면 `width: calc((100% - 40px)/5)`
    </li>
    <li>
      한 줄의 맨 마지막 column의 오른쪽 여백도 0으로 만들어줘야 한다. nth-child를 이용하는데, 만약 한 줄에 5개씩 보여준다면 `nth-child(5n)`을 `margin-right: 0`을 준다. 주의해야 할 점은 화면에 좁아지면서 한 줄에 보여주는 column의 수가 줄어든다면 이전에 nth-child로 준 효과를 해제해야 한다는 점이다.<br>
      한 줄에 4개씩 보여준다면 `nth-child(5n) {margin-right: 10px}`로 다시 마진을 돌려주고 `nth-child(4n) {margin-right: 0}`을 한다. 3개, 2개, ... 되는 동안 이전의 nth-child로 줬던 효과가 중첩되므로 매 개수마다는 이전 nth-child 효과를 돌려놓는데에만 집중하면 된다.
    </li>
  </ul>
</details> 
<br><br>

## 수정할 요소
- [ ] 검색을 router-dom의 navigate로 구현했기 때문에 브라우저의 뒤로가기 버튼을 누르면 메인 화면이 아니라 이전 쿼리로 이동한다.
- [ ] 위와 마찬가지의 문제로 네비게이션의 검색창이 아니라 주소창에서 `/search?q=검색어`로 바로 접근하면 404 에러가 발생한다.