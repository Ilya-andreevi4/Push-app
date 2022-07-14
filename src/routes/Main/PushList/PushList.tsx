import { Alert, Button, Grid, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { IPush, LocalPushs } from "../../../app/models/IPush";
import PushDataServices from "../../../services/PushService";
import PushItem from "./PushItem";
import { localPushs, state } from "../../../services/provider/proxyStates";
import { useUserAuth } from "../../../services/provider/AuthProvider";

const PushList = () => {
  const snap = useSnapshot(state);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserAuth();

  const getPushs = async () => {
    setIsLoading(true);
    setError("");
    try {
      if (user) {
        const data: any = await PushDataServices.getAllPushs(user.uid);
        if (data.docs) {
          localPushs.pushs = data.docs.map(
            (doc: any) => ({ ...doc.data(), id: doc.id } as any)
          );
        } else {
          return;
        }
      } else {
        setError(
          "Зарегистрируйтесь или войдите в существующий аккаунт, чтобы увидеть историю сообщений."
        );
        const isPushList = sessionStorage.getItem("pushs");
        if (isPushList) {
          const sessionPushs: LocalPushs = JSON.parse(isPushList);
          if (sessionPushs.pushs) {
            localPushs.pushs = sessionPushs.pushs.map(
              (doc: IPush) => ({ ...doc, id: doc.id } as any)
            );
          }
        } else return;
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (id: any) => {
    setError("");
    try {
      if (user) {
        await PushDataServices.deletePush(id, user.uid);
      } else {
        await PushDataServices.deletePush(id);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
      getPushs();
    }
  };

  useEffect(() => {
    getPushs();
  }, [snap, user]);

  return (
    <div className="PushList">
      <Typography variant="h5" noWrap align="center" sx={{ mt: 0, mb: 2 }}>
        История сообщений
      </Typography>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          {localPushs && (
            <Button
              disableElevation
              color="primary"
              variant="outlined"
              onClick={getPushs}
              sx={{ float: "right", mb: 2 }}
            >
              Обновить
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <div className="message_list">
            {error && <Alert severity="error">{error}</Alert>}
            {isLoading && (
              <div>
                <Typography variant="h1">
                  <Skeleton sx={{ bgcolor: "#eee" }} />
                </Typography>
                <Typography variant="h3">
                  <Skeleton sx={{ bgcolor: "#e3e3e3" }} />
                </Typography>
                <Typography variant="h2">
                  <Skeleton sx={{ bgcolor: "#ececec" }} />
                </Typography>
              </div>
            )}
            {localPushs.pushs &&
              !isLoading &&
              localPushs.pushs
                .sort((a, b) => b.timePush - a.timePush)
                .map((push) => (
                  <PushItem remove={handleRemove} key={push.id} push={push} />
                ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PushList;
