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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem,
  IonLabel,
  IonListHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonViewWillEnter,
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
import { getImgsByPaging, ImgFile, uploadImg } from "../Data/ImgFileDO";
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
  const [disableInfiniteScroll, setDisableInfiniteScroll] =
    useState<boolean>(false);
  async function fetchData() {
    const imgs = await getImgsByPaging(page, params.albumId);
    console.log(imgs);
    if (imgs === undefined) {
      setDisableInfiniteScroll(true);
      return;
    } else {
      AlbumStore.ImgFileList = AlbumStore.ImgFileList.concat(imgs);
      AlbumStore.ImgFileList = [...AlbumStore.ImgFileList];
      setDisableInfiniteScroll(imgs.length < 5);
      if (imgs.length === 5) {
        setPage(page + 1);
      }
    }
  }
  async function searchNext($event: CustomEvent<void>) {
    console.log("???????????????", $event);
    setTimeout(async () => {
      await fetchData();
      ($event.target as HTMLIonInfiniteScrollElement).complete();
    }, 800);
  }
  useIonViewWillEnter(async () => {
    AlbumStore.initialize();
    await fetchData();
  });
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
    present(inviteId + "?????? ????????? ??????????????????", [{ text: "Ok" }]);
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
        setShowLoading(false);
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
                {AlbumStore.ClickedAlbum != null ? (
                  <>{AlbumStore.ClickedAlbum!.albumName}</>
                ) : (
                  <>?????????</>
                )}
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {showLoading ? (
          <>{SkeletonLoading()}</>
        ) : (
          <>
            <IonContent>
              {AlbumStore.ImgFileList.length === 0 && (
                <>
                  <div
                    className="posting_photo"
                    style={{
                      backgroundImage: `url(${emptyPic})`,
                      marginBottom: "1%",
                    }}
                  ></div>
                  <div className="empty_text">?????? ????????? ????????? ?????????</div>
                </>
              )}
              <div className="photo-container">
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
                                  header: "????????? ???????????????",
                                  cssClass: "my-css",
                                  message: "????????? ????????? ????????? ??? ????????????.",
                                  buttons: [
                                    {
                                      text: "??????",
                                      handler: (d) => {
                                        deletePhoto(item.fileId);
                                      },
                                    },
                                    "??????",
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
              </div>
              <IonFab
                vertical="bottom"
                horizontal="end"
                slot="fixed"
                style={{
                  position: "fixed",
                  zIndex: "100",
                  marginBottom: "50px",
                }}
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
                  <IonLabel position="stacked">????????? ?????????</IonLabel>
                  <IonItem style={{ marginBottom: "10vh", marginTop: "2vh" }}>
                    <IonInput
                      value={inviteId}
                      type="text"
                      onIonChange={(e) => setInviteId(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                  <IonButton
                    onClick={() => {
                      //?????? ??????
                      let msg = `????????? : ${inviteId}`;
                      present({
                        header: "?????? ????????? ???????????????",
                        cssClass: "my-css",
                        message: msg,
                        buttons: [
                          {
                            text: "??????",
                            handler: (d) => {
                              inviteMember(
                                AlbumStore.ClickedAlbum!.id,
                                inviteId
                              )
                                .then(() => {
                                  console.log("???????????? api post");
                                  setOpen(false);
                                  alertInviteSuccess();
                                })
                                .catch((e) => {
                                  console.log("??????");
                                });
                            },
                          },
                          "??????",
                        ],
                        onDidDismiss: (e) => {
                          console.log("??????");
                        },
                      });
                    }}
                    expand="full"
                    style={{ marginBottom: "2vh" }}
                    disabled={inviteId.length == 0 || alreadyInvited()}
                  >
                    ?????? ????????????
                  </IonButton>
                  <IonButton
                    onClick={() => handleClose()}
                    expand="full"
                    color="light"
                  >
                    ??????
                  </IonButton>
                </div>
              </IonModal>
              <IonModal isOpen={uploadModalOpen}>
                <div className="photoEnrollModal">
                  <IonLabel position="stacked">?????? ?????????</IonLabel>
                  {uploadedFile && (
                    <>
                      <div className="profile_preview_box">
                        <div>
                          <img className="profile_preview" src={previewFile} />
                        </div>
                      </div>
                    </>
                  )}
                  <IonButton expand="full" style={{ marginBottom: "2vh" }}>
                    <div>
                      <label className="input-file-button">
                        ?????? ????????????
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
                    <IonLabel position="stacked">?????? ??????</IonLabel>
                    <IonInput
                      value={description}
                      type="text"
                      onIonChange={(e) => setDescription(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                  <IonItem style={{ marginBottom: "5vh" }}>
                    <IonLabel position="stacked">??????</IonLabel>
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
                      )
                        .then((res) => {
                          setUploadModalOpen(false);
                          setUploadFile(undefined);
                          setDate("");
                          setDescription("");
                        })
                        .then(() => {
                          window.location.assign(`/album/${params.albumId}`);
                        });
                    }}
                    expand="full"
                    color="primary"
                    style={{ marginBottom: "2vh" }}
                    disabled={!uploadedFile}
                  >
                    ??????
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
                    ??????
                  </IonButton>
                </div>
              </IonModal>
              <IonInfiniteScroll
                threshold="100px"
                disabled={disableInfiniteScroll}
                onIonInfinite={(e: CustomEvent<void>) => {
                  searchNext(e);
                }}
              >
                <IonInfiniteScrollContent
                  className="ion-padding"
                  loadingText="Loading..."
                ></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            </IonContent>
          </>
        )}
      </IonPage>
    );
  });
};

export default AlbumPage;
