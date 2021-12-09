import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../Styles/Home.css";
import { arrowBack, cloudUpload } from "ionicons/icons";
import "../Styles/Login.css";
import LoginStore, { Anniversary, LoginInfoDO, UserDO } from "../Store/LoginStore";
import { rootURL } from "../Utils/Constants";
import axios from "axios";
import crypto from "crypto";
import { SpringAxios } from "../Utils/Utils";
const ModifyPage: React.FC = () => {
  const history = useHistory();
  const [present] = useIonAlert();
  const postLoginInfo = async () => {
    SpringAxios.put(`/users/${localStorage.getItem("userid")}`, JSON.stringify({
      nickname: LoginStore.userInfo.nickName,
      birthday: LoginStore.userInfo.birthday,
      name: LoginStore.userInfo.name,
      anniversary: LoginStore.userInfo.anniversary,
      anniversaryDate: LoginStore.userInfo.anniversary.anniversaryDate,
      relation: LoginStore.userInfo.relation,
      picUrl:LoginStore.userInfo.picUrl
    })).then((res:any) => {
        LoginStore.userInfo=new UserDO(
          res.data.nickname,
          res.data.relation,
          res.data.name,
          res.data.pickUrl,
          new Anniversary(res.data.anniversary.anniversaryDate,res.data.anniversary.description, res.data.anniversary.relation),
          res.data.birthday,
          ""
        )
        LoginStore.fetchUserInfo().then(()=>{
          present("정보 수정이 완료되었습니다.", [
            { text: "Ok" },
          ]);
          history.goBack();
        });
      })
      .catch(() => {
        present("알수없는 에러 505", [
          { text: "Ok" },
        ]);
      });
  };
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      window.location.assign("/login");
    }
    if (localStorage.getItem("userid")) {
      LoginStore.fetchUserInfo();
    }
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>정보 수정</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="modify_title">사용자 정보</div>
        <div className="modify_avartar">
          <div className="container_avartar">
            <IonAvatar>
              <img className="back"src="https://i.pinimg.com/564x/0d/8e/2f/0d8e2fd4c4e15ed96491d7f15a08ec04.jpg" />
            </IonAvatar>
          </div>
        </div>
        <IonItem>
          <IonLabel position="stacked">이름</IonLabel>
          <IonInput
            value={LoginStore.userInfo.name}
            placeholder=""
            type="text"
            onIonChange={(e) => LoginStore.userInfo.name=e.detail.value!}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">닉네임</IonLabel>
          <IonInput
            value={LoginStore.userInfo.nickName}
            placeholder=""
            type="text"
            onIonChange={(e) => LoginStore.userInfo.nickName=e.detail.value!}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">생년월일</IonLabel>
          <IonDatetime
            displayFormat="YYYY.MM.DD"
            min="1900-01-01"
            value={LoginStore.userInfo.birthday}
            placeholder="2000.01.01"
            onIonChange={(e) => LoginStore.userInfo.birthday=e.detail.value!}
          ></IonDatetime>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">기념일 (수식어)</IonLabel>
          <IonInput
            value={LoginStore.userInfo.anniversary.description}
            placeholder="우리 만난지"
            type="text"
            onIonChange={(e) => LoginStore.userInfo.anniversary.description=e.detail.value!}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">기념일 (날짜)</IonLabel>
          <IonDatetime
            displayFormat="YYYY.MM.DD"
            min="1900-01-01"
            value={LoginStore.userInfo.anniversary.anniversaryDate}
            placeholder="2000.01.01"
            onIonChange={(e) => LoginStore.userInfo.anniversary.anniversaryDate=e.detail.value!}
          ></IonDatetime>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">상대와의 관계</IonLabel>
          <IonInput
            value={LoginStore.userInfo.relation}
            placeholder="OO의 남자친구"
            type="text"
            onIonChange={(e) => LoginStore.userInfo.relation=e.detail.value!}
          ></IonInput>
        </IonItem>
        <div className="my_modify_btn">
          <IonButton
            expand="full"
            color="primary"
            onClick={() => {
              postLoginInfo();
            }}
          >
            정보수정
          </IonButton>
        </div>
        <div className="my_close_btn">
          <IonButton
            expand="full"
            color="light"
            onClick={() => {
              history.goBack();
            }}
          >
            취소
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ModifyPage;
