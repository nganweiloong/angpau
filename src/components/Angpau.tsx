import angpaoImg from "./angpau.png";
import catImg from "./cat.jfif";
import angPaoTng from "./angpauTng.png";
import { twMerge } from "tailwind-merge";

interface AngpaoProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  // List your props here
  isCat?: boolean;
  hasPicked?: boolean;
}

const Angpao: React.FC<AngpaoProps> = ({ isCat, hasPicked, ...props }) => {
  return (
    <div className="border-red-500 rounded-lg">
      <div
        className="flip-card bg-transparent w-[150px] h-[150px] rounded-lg overflow-hidden block cursor-pointer"
        {...props}
      >
        <div
          className={twMerge(
            "flip-card-inner relative w-full h-full text-center transform duration-700",
            hasPicked && "flip-flip",
          )}
        >
          <div className="flip-card-front absolute w-full h-full ">
            <img width="150px" height="150px" src={angpaoImg} alt="Angpao" />
          </div>
          <div className="flip-card-back absolute w-full h-full  ">
            <img src={isCat ? catImg : angPaoTng} alt="Angpao reveal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Angpao;
