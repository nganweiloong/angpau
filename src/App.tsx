import Angpao from "./components/Angpau";
import { useImmer } from "use-immer";
import Cookies from "js-cookie";
import { useEffect } from "react";

interface Angpao {
  reveal: boolean;
  userSelection: null | number;
  firstTimer: boolean;
  angpao: {
    id: number;
    hasCat: boolean;
  }[];
}

const COOKIES_NAME = "angpao";
const TNG_LINK = "https://link.tngdigital.com.my/T4eFpLiZP3YXDyGu9";
const COOKIE_ALLOW_REDIRECTION = "angpao_redirection_allow";

function App() {
  const INIT_ANGPAO: Angpao = {
    reveal: false,
    firstTimer: true,
    userSelection: null,
    angpao: [
      {
        id: 0,
        hasCat: false,
      },
      {
        id: 1,
        hasCat: false,
      },
    ],
  };

  const cookieInit = Cookies.get(COOKIES_NAME)
    ? JSON.parse(Cookies.get(COOKIES_NAME) || "")
    : INIT_ANGPAO;

  const [angpaos, setAngpao] = useImmer<Angpao>(cookieInit);
  const hasPicked = angpaos.reveal;
  const handleClick = (id: number) => {
    const result = Math.round(Math.random()); //give 1 or 0
    setAngpao(draft => {
      draft.reveal = true;
      draft.angpao[result].hasCat = true;
      draft.userSelection = id;
    });
  };

  Cookies.set(COOKIES_NAME, JSON.stringify(angpaos), { expires: 365 });

  const hasUserPickedTng =
    angpaos.userSelection === angpaos.angpao.findIndex(x => x.hasCat === false);

  const message = !hasPicked
    ? "🐲Pick One! 🐲"
    : hasUserPickedTng
    ? "Congratulation ;D"
    : "Try harder next year ;D";
  useEffect(() => {
    if (Cookies.get(COOKIE_ALLOW_REDIRECTION)) return;
    Cookies.set(COOKIE_ALLOW_REDIRECTION, "1");
  }, []);

  useEffect(() => {
    if (hasUserPickedTng && Cookies.get(COOKIE_ALLOW_REDIRECTION) === "1") {
      Cookies.set(COOKIE_ALLOW_REDIRECTION, "0");
      window.location.href = TNG_LINK;
    }
  }, [angpaos.firstTimer, hasUserPickedTng]);

  return (
    <>
      <button
        onClick={() => {
          setAngpao(INIT_ANGPAO);
          Cookies.set(COOKIE_ALLOW_REDIRECTION, "1");
        }}
      >
        Debugg clear cookie
      </button>
      <div className="">
        <h1 className="text-center text-xl">🐉恭喜发财🐉 </h1>
        <h1 className="text-center text-xl mt-[30px]">{message}</h1>
        <div className="flex justify-center items-center mt-5 gap-4">
          {angpaos.angpao.map(pao => (
            <Angpao
              hasPicked={hasPicked}
              key={pao.id}
              onClick={!hasPicked ? () => handleClick(pao.id) : undefined}
              isCat={pao.hasCat}
              userSelection={angpaos.userSelection === pao.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
