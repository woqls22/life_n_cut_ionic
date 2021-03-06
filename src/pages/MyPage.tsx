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
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSkeletonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useObserver } from "mobx-react";
import "../Styles/Home.css";
import { useEffect, useState } from "react";
import "../Styles/Mypage.css";
import LoginStore, { Friend, LoginInfoDO, UserDO } from "../Store/LoginStore";
import axios from "axios";
import { rootURL } from "../Utils/Constants";
import { getYYYYMMDD, getDDay } from "../Utils/Utils";
import SkeletonLoading from "../components/SkeletonLoading";
import { useHistory } from "react-router";
import AlbumStore from "../Store/AlbumStore";
class UserInfo {
  constructor(id: string, username: string, token: string) {}
}
export class AlbumDO {
  id: string;
  albumName: string;
  createdate: string;
  description: string;
  authorIdList: string[];
  constructor(
    id: string,
    albumName: string,
    createdate: string,
    description: string,
    authorIdList: string[]
  ) {
    this.id = id;
    this.albumName = albumName;
    this.createdate = createdate;
    this.description = description;
    this.authorIdList = authorIdList;
  }
}
const MyPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")!)
  );
  const [present] = useIonAlert();
  const history = useHistory();
  const logOut = () => {
    LoginStore.setIsLoggedIn(false);
    LoginStore.setLoginInfo(new LoginInfoDO(""));
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userid");
    present("로그아웃 되었습니다!", [{ text: "Ok" }]);
    window.location.assign("/welcome");
  };
  const [showLoading, setShowLoading] = useState(true);
  const [id, setId] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      window.location.assign("/login");
    }
    if (localStorage.getItem("userid")) {
      let userId = localStorage.getItem("userid");
      let accessToken = localStorage.getItem("accessToken");
      axios
        .get(rootURL + "/users/" + userId, {
          headers: {
            Authorization: "Bearer " + accessToken, //the token is a variable which holds the token
          },
        })
        .then((res: any) => {
          setId(res.data.email);
          LoginStore.userInfo.nickName = res.data.nickname;
          LoginStore.userInfo.relation = res.data.relation;
          LoginStore.userInfo.anniversary = res.data.anniversary;
          LoginStore.userInfo.name = res.data.name;
          LoginStore.userInfo.picUrl = res.data.pickUrl;
          LoginStore.userInfo.birthday = res.data.birthday;
          LoginStore.friendsList = res.data.friends;
          setShowLoading(false);
        });
    }
  }, []);

  return useObserver(() => {
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
              <IonCardSubtitle>{LoginStore.userInfo.relation}</IonCardSubtitle>
              <IonCardTitle>
                <div className="user_title">
                  <div className="user_pic">
                    <IonAvatar>
                      <img src="https://i.pinimg.com/564x/0d/8e/2f/0d8e2fd4c4e15ed96491d7f15a08ec04.jpg" />
                    </IonAvatar>
                  </div>
                  <div>{LoginStore.userInfo.name}</div>
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
                <div className="card_value">
                  {getYYYYMMDD(LoginStore.userInfo.birthday)}
                </div>
              </div>
              <div className="card_section">
                <div className="card_title">
                  {LoginStore.userInfo.anniversary.description}
                </div>
                <div className="card_value">
                  {getDDay(LoginStore.userInfo.anniversary.anniversaryDate)}
                  <div style={{ fontSize: "smaller" }}>
                    {"(" +
                      getYYYYMMDD(
                        LoginStore.userInfo.anniversary.anniversaryDate
                      ) +
                      ")"}
                  </div>
                </div>
              </div>
              <div className="card_section">
                <div className="card_title">별명</div>
                <div className="card_value">{LoginStore.userInfo.nickName}</div>
              </div>
            </IonCardContent>
          </IonCard>
          <div>
            <div className="frined_title">
              <h4>나와 앨범을 공유하는 사람</h4>
            </div>
            <div className="freind_list">
              {LoginStore.friendsList.map((user: Friend) => {
                return (
                  <>
                    {LoginStore.userInfo.email === user.email ? (
                      <></>
                    ) : (
                      <>
                        <IonChip>
                          <IonAvatar>
                            {user.picUrl ? (
                              <>
                                <img src={user.picUrl} />
                              </>
                            ) : (
                              <>
                                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                              </>
                            )}
                          </IonAvatar>
                          <IonLabel>{user.name}</IonLabel>
                        </IonChip>
                      </>
                    )}
                  </>
                );
              })}
            </div>
          </div>

          <div className="btn_logout">
            <IonButton expand="full" onClick={logOut}>
              로그아웃
            </IonButton>
          </div>
          <div className="btn_quit">
            <IonButton
              expand="full"
              color="light"
              onClick={() => history.push("/my/modify")}
            >
              정보수정
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
  });
};

export default MyPage;
