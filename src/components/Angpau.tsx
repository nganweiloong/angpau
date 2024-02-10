import angpaoImg from "./angpau.png";
import angPaoTng from "./angpauTng.png";
import { twMerge } from "tailwind-merge";
import catt from "./cat.jpg";
interface AngpaoProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  // List your props here
  isCat?: boolean;
  hasPicked?: boolean;
  userSelection?: boolean;
}

const Angpao: React.FC<AngpaoProps> = ({
  isCat,
  hasPicked,
  userSelection,
  ...props
}) => {
  return (
    <div className="relative">
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
            <img
              width="150px"
              height="150px"
              src={isCat ? catt : angPaoTng}
              alt="Angpao reveal"
              loading="eager"
            />
          </div>
        </div>
      </div>
      {userSelection && (
        <p className="absolute left-[50%] -translate-x-1/2 text-red-500 font-bold">
          Your pick
        </p>
      )}
    </div>
  );
};

export default Angpao;
