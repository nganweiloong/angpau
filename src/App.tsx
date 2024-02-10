import Angpao from "./components/Angpau";
import { useImmer } from "use-immer";
import Cookies from "js-cookie";
interface Angpao {
  reveal: boolean;
  angpao: {
    id: number;
    hasCat: boolean;
  }[];
}
const COOKIES_NAME = "angpao";
function App() {
  const INIT_ANGPAO: Angpao = {
    reveal: false,
    angpao: [
      {
        id: 1,
        hasCat: false,
      },
      {
        id: 2,
        hasCat: false,
      },
    ],
  };
  const cookieInit = Cookies.get(COOKIES_NAME)
    ? JSON.parse(Cookies.get(COOKIES_NAME) || "")
    : INIT_ANGPAO;

  const [angpaos, setAngpao] = useImmer<Angpao>(cookieInit);
  const hasPicked = angpaos.reveal;
  const handleClick = () => {
    const result = Math.round(Math.random()); //give 1 or 0
    setAngpao(draft => {
      draft.reveal = true;
      draft.angpao[result].hasCat = true;
    });
  };
  Cookies.set(COOKIES_NAME, JSON.stringify(angpaos), { expires: 365 });
  return (
    <>
      <div className="">
        <h1 className="text-center text-xl">🐉恭喜发财🐉 </h1>
        <h1 className="text-center text-xl mt-[30px]">🐲Pick One! 🐲</h1>
        <div className="flex justify-center items-center mt-5 gap-4">
          {angpaos.angpao.map(pao => (
            <Angpao
              hasPicked={hasPicked}
              key={pao.id}
              onClick={!hasPicked ? handleClick : undefined}
              isCat={pao.hasCat}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
