import { useState } from "react";
import ReactCardFlip from "react-card-flip";
interface Props {
  message: string;
}
const MessageCard = ({ message }: Props) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="border-[#666] border-2 shadow-lg rounded-xl h-64 p-3 flex items-center justify-center">
        <button
          onClick={() => setIsFlipped(true)}
          className="text-sm border-[1px] text-white border-[#ccc] bg-transparent px-10 rounded py-1"
        >
          View
        </button>
      </div>

      <div
        onClick={() => setIsFlipped(false)}
        className="bg-white shadow-lg rounded-xl h-64 p-3 flex items-center justify-center"
      >
        <p className="text-sm">{message}</p>
      </div>
    </ReactCardFlip>
  );
};

export default MessageCard;
