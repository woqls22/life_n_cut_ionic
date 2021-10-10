import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonLoading,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "../Styles/Home.css";
import { useEffect, useState } from "react";
import "../Styles/Mypage.css";
import LoginStore, { LoginInfoDO } from "../Store/LoginStore";
import { pin, wifi, wine, warning, walk } from "ionicons/icons";
import axios from "axios";
import { rootURL } from "../Utils/Constants";
class UserInfo {
  constructor(id: string, username: string, token: string) {}
}
export class AlbumDO {
    id: string;
    albumName: string;
    createdate: string;
    dday: string;
    description: string;
    ddayDescription: string;
    authorIdList: string[];
  constructor(
    id: string,
    albumName: string,
    createdate: string,
    dday: string,
    description: string,
    ddayDescription: string,
    authorIdList: string[]
  ) {
    this.id=id;
    this.albumName=albumName;
    this.createdate=createdate;
    this.dday=dday;
    this.description=description;
    this.ddayDescription=ddayDescription;
    this.authorIdList=authorIdList;
  }
}
export function getYYYYMMDD(dtr:string){
  if(dtr.length==0){
    return "";
  }
  let date = new Date(dtr);
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let day = date.getDate();
  return year+"년 "+month+"월 "+day+"일";
}
export function getDDay (dateStr : string){
  // D-Day 날짜 지정
  const setDate = new Date(dateStr);
  // D-day 날짜의 연,월,일 구하기
  const setDateYear = setDate.getFullYear();
  // getMonth 메서드는 0부터 세기 때문에 +1 해준다.
  const setDateMonth = setDate.getMonth() + 1;
  const setDateDay = setDate.getDate();

  // 현재 날짜를 new 연산자를 사용해서 Date 객체를 생성
  const now = new Date();

  // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다. 
  const distance = now.getTime()-setDate.getTime();
  
  // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
  // 밀리초 값이기 때문에 1000을 곱한다. 
  // 1000*60 => 60초(1분)*60 => 60분(1시간)*24 = 24시간(하루)
  // 나머지 연산자(%)를 이용해서 시/분/초를 구한다.
  const day = Math.floor(distance/(1000*60*60*24))+1;
  // D-Day 날짜를 가져오고,
  // 삼항 연산자를 사용해서 값이 10보다 작을 경우에 대해 조건부 렌더링을 해준다.
  let text = 
    `${day}일`;
  return text;
  }
const MyPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")!)
  );
  const logOut = () => {
    LoginStore.setIsLoggedIn(false);
    LoginStore.setLoginInfo(new LoginInfoDO(""));
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userid");
    alert("로그아웃 되었습니다!");
    window.location.assign("/welcome");
  };
  const [showLoading, setShowLoading] = useState(true);
  const [id, setId]=useState("");
  const [nickName, setNickname]=useState("");
  const [birthday, setBirthday]=useState("");
  const [name, setName]=useState("");
  const [anniversary, setAnniversary]=useState("");
  const [anniversaryDate, setAnniversaryDate]=useState("");
  const [relation,setRelation]=useState("");
  useEffect(()=>{
    if(!localStorage.getItem("userInfo")){
      window.location.assign("/login");
    }
    if (localStorage.getItem("userid")) {
      let userId = localStorage.getItem("userid");
      let accessToken = localStorage.getItem("accessToken");
      axios.get(rootURL + "/user/" + userId, {
        headers: {
          Authorization: 'Bearer ' + accessToken //the token is a variable which holds the token
        }
       }).then((res:any) => {
        console.log(res.data);
        setId(res.data.email);
        setNickname(res.data.nickname);
        setRelation(res.data.relation);
        setAnniversaryDate(res.data.anniversaryDate)
        setName(res.data.name);
        setAnniversary(res.data.anniversary);
        if (res.data.birthday) {
          setBirthday(res.data.birthday);
        }
        setShowLoading(false);
      });
    }
  },[])
  if(showLoading){
    return(
      <IonContent>
      <IonLoading
        cssClass='my-custom-class'
        isOpen={showLoading}
        message={'로딩중입니다...'}
        duration={5000}
      />
    </IonContent>
    );
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="toolbar">내 정보</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
          <div></div>
        </div>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{relation}</IonCardSubtitle>
            <IonCardTitle>
              <div className="user_title">
                <div className="user_pic">
                  <IonAvatar>
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                </div>
                <div>{name}</div>
              </div>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="card_section">
              <div className="card_title">아이디</div>
              <div className="card_value">{id}</div>
            </div>
            <div className="card_section">
              <div className="card_title">생년월일</div>
              <div className="card_value">{getYYYYMMDD(birthday)}</div>
            </div>
            <div className="card_section">
              <div className="card_title">{anniversary}</div>
              <div className="card_value">{getDDay(anniversaryDate)}</div>
            </div>
            <div className="card_section">
              <div className="card_title">별명</div>
              <div className="card_value">{nickName}</div>
            </div>
          </IonCardContent>
        </IonCard>
        <div>
          <div className="frined_title"><h4>앨범을 공유하는 사람</h4></div>
          <div className="freind_list">
          <IonChip>
            <IonAvatar>
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar>
            <IonLabel>여자친구</IonLabel>
          </IonChip>
          <IonChip>
            <IonAvatar>
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar>
            <IonLabel>친구1</IonLabel>
          </IonChip>
          <IonChip>
            <IonAvatar>
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar>
            <IonLabel>친구2</IonLabel>
          </IonChip>
          <IonChip>
            <IonAvatar>
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar>
            <IonLabel>엄마</IonLabel>
          </IonChip>
          <IonChip>
            <IonAvatar>
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar>
            <IonLabel>아빠</IonLabel>
          </IonChip>
          </div>
        </div>

        <div className="btn_logout">
          <IonButton expand="full" onClick={logOut}>
            로그아웃
          </IonButton>
        </div>
        <div className="btn_quit">
          <IonButton expand="full" color="light">
            회원탈퇴
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MyPage;
