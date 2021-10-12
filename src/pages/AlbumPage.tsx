import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonListHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import "../Styles/Home.css";
import "../Styles/Album.css";
import { useEffect, useState } from "react";
import SkeletonLoading from "../components/SkeletonLoading";
import {
  arrowBack,
  image,
  calendar,
  informationCircle,
  menuOutline,
  trash,
  person,
  map
} from "ionicons/icons";
import { useHistory, useParams } from "react-router";
const AlbumPage: React.FC = (props: any) => {
  const [showLoading, setShowLoading] = useState(false);
  const params = useParams<{ albumId: string }>();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [inviteId, setInviteId]=useState("");
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
  function alertInviteSuccess(){
    present(inviteId+'님을 앨범에 초대했습니다', [{ text: 'Ok' }]);
  }
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      window.location.assign("/login");
    }
    // album 정보를 가져오면 setShowLoading(false);
  }, []);

  return (
    <IonPage ref={onScroll}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>
            <div className="toolbar">ALBUM {params.albumId}</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      {showLoading ? (
        <>{SkeletonLoading()}</>
      ) : (
        <>
          <IonContent className="ion-padding">
            <IonListHeader>
              <IonLabel>앨범이름</IonLabel>
            </IonListHeader>
            {[1, 2, 3, 4, 5].map(() => {
              return (
                <div
                  className={"tabRow" + 1}
                  style={{
                    boxShadow: "none",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "70vw",
                  }}
                >
                  <div
                    className={"photoListItem"}
                    style={{
                      backgroundImage:
                        "url(http://image.babosarang.co.kr/product/detail/NTY/2007211531153423/_600.jpg)",
                    }}
                  ></div>
                  <div className="albumtextbox">
                    <div className={"dateText"}>
                      2020.01.01
                      <div className={"descriptionText"}>
                        설명
                        <IonIcon style={{ float: "right" }} icon={trash} />
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              );
            })}

            <IonFab
              vertical="bottom"
              horizontal="end"
              slot="fixed"
              style={{ position: "fixed" }}
            >
              <IonFabButton>
                <IonIcon icon={menuOutline} />
              </IonFabButton>
              <IonFabList side="top">
                <IonFabButton>
                  <IonIcon icon={image} />
                </IonFabButton>
                <IonFabButton
                  onClick={() => {history.push(`/album/${params.albumId}/place`)}}
                >
                  <IonIcon icon={map} />
                </IonFabButton>
                <IonFabButton
                 onClick={() => history.push(`/album/${params.albumId}/anniversary`)}
                >
                  <IonIcon icon={calendar} />
                </IonFabButton>
                <IonFabButton
                  onClick={() => history.push(`/album/${params.albumId}/info`)}
                >
                  <IonIcon icon={informationCircle} />
                </IonFabButton>
                <IonFabButton
                  onClick={() => {setOpen(true); setInviteId("")}}
                >
                  <IonIcon icon={person} />
                </IonFabButton>
               
              </IonFabList>
            </IonFab>
            <IonModal isOpen={open}>
              <div className="albumModal">
                <IonLabel position="stacked">
                  초대할 아이디
                </IonLabel>
                <IonItem style={{ marginBottom: "10vh", marginTop: "2vh" }}>
                  <IonInput
                    value={inviteId}
                    type="text"
                    onIonChange={(e) => setInviteId(e.detail.value!)}
                  ></IonInput>
                </IonItem>
                <IonButton
                  onClick={() => {
                      //앨범 초대
                      let msg = `아이디 : ${inviteId}`
                      present({
                        header: '앨범 접근을 허용합니다',
                        cssClass: 'my-css',
                        message: msg,
                        buttons: [
                          { text: '확인', handler: (d) => {
                            console.log("앨범초대 api post");
                            setOpen(false);
                            alertInviteSuccess();
                          }},
                          '취소',
                        ],
                        onDidDismiss: (e) => {},
                      })
                     
                  }}
                  expand="full"
                  style={{ marginBottom: "2vh" }}
                  disabled={inviteId.length==0}
                >
                  앨범 초대하기
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
};

export default AlbumPage;
