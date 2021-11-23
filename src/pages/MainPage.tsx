import {
  IonAvatar,
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "../Styles/Home.css";
import firstImg from "../res/1.jpeg";
import secondImg from "../res/2.jpeg";
import thirdimg from "../res/3.jpeg";
import fourthImg from "../res/4.jpeg";
import wishList from "../res/5.jpeg";
import dDay from "../res/6.jpeg";
import { useEffect, useState } from "react";
import SkeletonLoading from "../components/SkeletonLoading";
import { useHistory } from "react-router";
import { AlbumDO } from "./MyPage";
import { SpringAxios } from "../Utils/Utils";
import AlbumStore from "../Store/AlbumStore";
import { useObserver } from "mobx-react";
import { Album } from "../Data/AlbumDO";
const MainPage: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const [present] = useIonAlert();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function onScroll(e: any) {
    console.log(e);
    // setPosition(e.target.scrollTop);
    // console.log(position);
  }
  const enrollAlbum = () => {
    SpringAxios.post(
      `/albums/${localStorage.getItem("userid")}`,
      new AlbumDO("", albumName, new Date().toString(), "", [])
    )
      .then((res: any) => {})
      .catch(() => {
        present("서버에러 ] 앨범을 생성할 수 없습니다", [{ text: "Ok" }]);
      });
  };
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      window.location.assign("/login");
    }
    AlbumStore.fetchAlbumList().then(() => {
      setShowLoading(false);
      console.log(AlbumStore.AlbumList);
    });
  }, []);
  return useObserver(() => {
    return (
      <IonPage ref={onScroll}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              <div className="toolbar">ALBUM</div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {showLoading ? (
          <>{SkeletonLoading()}</>
        ) : (
          <>
            <IonContent className="ion-padding">
              <IonButton expand="full" onClick={() => setOpen(true)}>
                앨범 만들기
              </IonButton>
              <IonListHeader>
                <IonLabel>내가 속한 앨범</IonLabel>
              </IonListHeader>
              <IonList>
                {AlbumStore.AlbumList.map((item: Album) => {
                  return (
                    <IonItem>
                      <div
                        className="user_title"
                        style={{ width: "100%" }}
                        onClick={() => {
                          history.push(`/album/${item.id}`);
                          AlbumStore.ClickedAlbum=item;
                        }}
                      >
                        <div className="user_pic">
                          <IonAvatar>
                            <img src="https://i.pinimg.com/564x/0d/8e/2f/0d8e2fd4c4e15ed96491d7f15a08ec04.jpg" />{" "}
                          </IonAvatar>
                        </div>
                        <div>{item.albumName}</div>
                      </div>
                    </IonItem>
                  );
                })}
              </IonList>
              <IonModal isOpen={open}>
                <div className="albumModal">
                  <IonLabel position="stacked">앨범 이름</IonLabel>
                  <IonItem style={{ marginTop: "2vh", marginBottom: "2vh" }}>
                    <IonInput
                      value={albumName}
                      placeholder="ex) 가족 앨범"
                      type="text"
                      onIonChange={(e) => setAlbumName(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                  <IonButton
                    onClick={() => {
                      enrollAlbum();
                    }}
                    expand="full"
                    style={{ marginBottom: "2vh" }}
                  >
                    확인
                  </IonButton>
                  <IonButton
                    onClick={() => handleClose()}
                    expand="full"
                    color="light"
                  >
                    닫기
                  </IonButton>
                </div>
              </IonModal>
            </IonContent>
          </>
        )}
      </IonPage>
    );
  });
};

export default MainPage;
