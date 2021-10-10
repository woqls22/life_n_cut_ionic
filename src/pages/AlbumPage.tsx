import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "../Styles/Home.css";
import "../Styles/Album.css";
import { useEffect, useState } from "react";
import SkeletonLoading from "../components/SkeletonLoading";
import {
  arrowBack,
  image,
  calendar,
  settings,
  informationCircle,
  menuOutline,
  trash,
} from "ionicons/icons";
import { useHistory, useParams } from "react-router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const AlbumPage: React.FC = (props: any) => {
  const [showLoading, setShowLoading] = useState(false);
  const params = useParams<{ albumId: string }>();
  const history = useHistory();
  const [open, setOpen] = useState(false);
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
                <IonFabButton>
                  <IonIcon icon={calendar} />
                </IonFabButton>
                <IonFabButton
                  onClick={() => history.push(`/album/${params.albumId}/info`)}
                >
                  <IonIcon icon={informationCircle} />
                </IonFabButton>
              </IonFabList>
            </IonFab>
          </IonContent>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </IonPage>
  );
};

export default AlbumPage;
