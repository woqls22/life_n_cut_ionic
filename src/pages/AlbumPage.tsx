import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
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
  map,
} from "ionicons/icons";
import { useHistory, useParams } from "react-router";
import AlbumStore from "../Store/AlbumStore";
import { ImgFile, uploadImg } from "../Data/ImgFileDO";
import { rootURL } from "../Utils/Constants";
import { getYYYYMMDD } from "../Utils/Utils";
import emptyPic from "../res/posting_photo.svg";
import { deletePhoto, inviteMember, User } from "../Data/AlbumDO";
import { useObserver } from "mobx-react";
const AlbumPage: React.FC = (props: any) => {
  const [showLoading, setShowLoading] = useState(true);
  const params = useParams<{ albumId: string }>();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [inviteId, setInviteId] = useState("");
  const [uploadedFile, setUploadFile] = useState<File>();
  const [previewFile, setPreviewFile] = useState<any>();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(0);
  const [present] = useIonAlert();
  function alreadyInvited() {
    AlbumStore.ClickedAlbum?.userMapping.map((item: User) => {
      if (item.email == inviteId) {
        return true;
      }
    });
    return false;
  }
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
  function alertInviteSuccess() {
    present(inviteId + "님을 앨범에 초대했습니다", [{ text: "Ok" }]);
  }
  function handleFileOnChange(event: any) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onload = () => {
      setUploadFile(file);
      setPreviewFile(reader.result);
    };
    reader.readAsDataURL(file);
  }
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      window.location.assign("/login");
    }
    AlbumStore.initialize();
    AlbumStore.clickAlbum(params.albumId).then(() => {
      if (AlbumStore.ClickedAlbum) {
        AlbumStore.fetchImgsByPaging(params.albumId, page).then(() => {
          setShowLoading(false);
        });
      }
    });
  }, []);

  return useObserver(() => {
    return (
      <IonPage ref={onScroll}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="secondary">
              <IonButton
                onClick={() => {
                  history.goBack();
                  AlbumStore.ImgFileList = [];
                }}
              >
                <IonIcon slot="icon-only" icon={arrowBack} />
              </IonButton>
            </IonButtons>
            <IonTitle>
              <div className="toolbar">
                {AlbumStore.ClickedAlbum!=null ? (
                  <>{AlbumStore.ClickedAlbum!.albumName}</>
                ) : (
                  <>로딩중</>
                )}
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {showLoading ? (
          <>{SkeletonLoading()}</>
        ) : (
          <>
            <IonContent className="ion-padding">
              {AlbumStore.ImgFileList.length === 0 && (
                <>
                  <div
                    className="posting_photo"
                    style={{
                      backgroundImage: `url(${emptyPic})`,
                      marginBottom: "1%",
                    }}
                  ></div>
                  <div className="empty_text">아직 등록된 사진이 없어요</div>
                </>
              )}
              {AlbumStore.ImgFileList.map((item: ImgFile) => {
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
                        backgroundImage: `url(${rootURL}/imgURL?imagename=${item.filename})`,
                      }}
                    ></div>
                    <div className="albumtextbox">
                      <div className={"dateText"}>
                        {getYYYYMMDD(item.date)}
                        <div className={"descriptionText"}>
                          {item.description}
                          <IonIcon
                            style={{ float: "right" }}
                            icon={trash}
                            onClick={() => {
                              present({
                                header: "사진을 삭제합니다",
                                cssClass: "my-css",
                                message: "삭제된 사진은 복구할 수 없습니다.",
                                buttons: [
                                  {
                                    text: "확인",
                                    handler: (d) => {
                                      deletePhoto(item.fileId);
                                    },
                                  },
                                  "취소",
                                ],
                                onDidDismiss: (e) => {},
                              });
                            }}
                          />
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
                  <IonFabButton
                    onClick={() => {
                      setUploadModalOpen(true);
                    }}
                  >
                    <IonIcon icon={image} />
                  </IonFabButton>
                  <IonFabButton
                    onClick={() => {
                      history.push(`/album/${params.albumId}/place`);
                    }}
                  >
                    <IonIcon icon={map} />
                  </IonFabButton>
                  <IonFabButton
                    onClick={() =>
                      history.push(`/album/${params.albumId}/anniversary`)
                    }
                  >
                    <IonIcon icon={calendar} />
                  </IonFabButton>
                  <IonFabButton
                    onClick={() =>
                      history.push(`/album/${params.albumId}/info`)
                    }
                  >
                    <IonIcon icon={informationCircle} />
                  </IonFabButton>
                  <IonFabButton
                    onClick={() => {
                      setOpen(true);
                      setInviteId("");
                    }}
                  >
                    <IonIcon icon={person} />
                  </IonFabButton>
                </IonFabList>
              </IonFab>
              <IonModal isOpen={open}>
                <div className="albumModal">
                  <IonLabel position="stacked">초대할 아이디</IonLabel>
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
                      let msg = `아이디 : ${inviteId}`;
                      present({
                        header: "앨범 접근을 허용합니다",
                        cssClass: "my-css",
                        message: msg,
                        buttons: [
                          {
                            text: "확인",
                            handler: (d) => {
                              inviteMember(
                                AlbumStore.ClickedAlbum!.id,
                                inviteId
                              )
                                .then(() => {
                                  console.log("앨범초대 api post");
                                  setOpen(false);
                                  alertInviteSuccess();
                                })
                                .catch((e) => {
                                  console.log("실패");
                                });
                            },
                          },
                          "취소",
                        ],
                        onDidDismiss: (e) => {
                          console.log("종료");
                        },
                      });
                    }}
                    expand="full"
                    style={{ marginBottom: "2vh" }}
                    disabled={inviteId.length == 0 || alreadyInvited()}
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
              <IonModal isOpen={uploadModalOpen}>
                <div className="photoEnrollModal">
                  <IonLabel position="stacked">파일 업로드</IonLabel>
                  {uploadedFile && (
                    <>
                      <div className="profile_preview_box">
                        <div>
                          <img className="profile_preview" src={previewFile} />
                        </div>
                      </div>
                    </>
                  )}
                  <IonButton
                    expand="full"
                    style={{ marginBottom: "2vh" }}
                    color="dark"
                  >
                    <div>
                      <label className="input-file-button">
                        사진 불러오기
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="raised-button-file"
                          type="file"
                          onChange={(e: any) => {
                            handleFileOnChange(e);
                          }}
                        />
                      </label>
                    </div>
                  </IonButton>
                  <IonItem>
                    <IonLabel position="stacked">사진 설명</IonLabel>
                    <IonInput
                      value={description}
                      type="text"
                      onIonChange={(e) => setDescription(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                  <IonItem style={{ marginBottom: "5vh" }}>
                    <IonLabel position="stacked">날짜</IonLabel>
                    <IonDatetime
                      displayFormat="YYYY.MM.DD"
                      min="1900-01-01"
                      value={date}
                      placeholder="2000.01.01"
                      onIonChange={(e) => setDate(e.detail.value!)}
                    ></IonDatetime>
                  </IonItem>
                  <IonButton
                    onClick={() => {
                      uploadImg(
                        uploadedFile!,
                        date,
                        params.albumId,
                        description
                      ).then((res) => {
                        setUploadModalOpen(false);
                        setUploadFile(undefined);
                        setDate("");
                        setDescription("");
                      });
                    }}
                    expand="full"
                    color="primary"
                    style={{ marginBottom: "2vh" }}
                    disabled={!uploadedFile}
                  >
                    확인
                  </IonButton>
                  <IonButton
                    onClick={() => {
                      setUploadModalOpen(false);
                      setUploadFile(undefined);
                      setDate("");
                      setDescription("");
                    }}
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

export default AlbumPage;
