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
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "../Styles/Home.css";
import { useState } from "react";
import "../Styles/Mypage.css";
import LoginStore, { LoginInfoDO } from "../Store/LoginStore";
import { pin, wifi, wine, warning, walk } from "ionicons/icons";
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
            <IonCardSubtitle>OO의 남자친구</IonCardSubtitle>
            <IonCardTitle>
              <div className="user_title">
                <div className="user_pic">
                  <IonAvatar>
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                  </IonAvatar>
                </div>
                <div>{userInfo.username}</div>
              </div>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="card_section">
              <div className="card_title">성별</div>
              <div className="card_value">남자</div>
            </div>
            <div className="card_section">
              <div className="card_title">생년월일</div>
              <div className="card_value">1995.08.10</div>
            </div>
            <div className="card_section">
              <div className="card_title">기념일</div>
              <div className="card_value">2019.05.25</div>
            </div>
            <div className="card_section">
              <div className="card_title">별명</div>
              <div className="card_value">야채쿵야</div>
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
