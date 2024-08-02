import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  AlreadyDisplayedRecentChatsAtom,
  MeAtom,
  RecentChatsAtom,
} from "../../../../../../../store/PlayersAtom";
import { useCallback, useEffect, useState } from "react";
import { useAnimatedText } from "../../../../../../hooks/useAnimatedText";
import { Billboard, Text } from "@react-three/drei";

export const ChatBubble = ({ player, chat }) => {
  const [recentChats, setRecentChats] = useRecoilState(RecentChatsAtom);
  const setAlreadyDisplayedRecentChats = useSetRecoilState(
    AlreadyDisplayedRecentChatsAtom
  );

  const set = useCallback(() => {
    if (!chat) return;
    setAlreadyDisplayedRecentChats((prev) => [...prev, chat]);
  }, [chat, setAlreadyDisplayedRecentChats]);

  const { displayText } = useAnimatedText(
    (chat?.text.length ?? 0) > 30
      ? `"${chat?.text.slice(0, 30)}..."`
      : `"${chat?.text}"`,
    true,
    set
  );

  const me = useRecoilValue(MeAtom);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!chat) return;
    setVisible(true);
    const timeout = setTimeout(() => {
      setRecentChats((prev) => {
        return prev.filter(
          (rc) =>
            rc.timestamp !== chat?.timestamp && rc.senderId !== chat?.senderId
        );
      });
      setVisible(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [
    chat,
    chat?.timestamp,
    recentChats,
    setAlreadyDisplayedRecentChats,
    setRecentChats,
  ]);

  if (!chat?.text) return null;

  return (
    <Billboard
      visible={visible}
      position={[
        player.position[0],
        player.position[1] + 4,
        player.position[2],
      ]}
      name={`chat-bubble-billboard-${player.id}`}
    >
      <Text
        font={"/NotoSansKR-Regular.ttf"}
        fontSize={0.3}
        color={me.id === player.id ? 0x004acc : 0x222222}
      >
        {displayText}
      </Text>
    </Billboard>
  );
};
