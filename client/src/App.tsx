import { useAccount, useReadContract, useWriteContract } from "wagmi";
import MessageCard from "./components/MessageCard";
import { ContractData } from "./config/ContractData";
import { useEffect, useRef, useState } from "react";
import { useConnect, } from 'wagmi'
import { metaMask } from "wagmi/connectors";
import { toast } from "react-toastify";
import Loader from "./components/Loader";
import ETH from "./assets/eth.svg"
import Identicon from "@polkadot/react-identicon";
const App = () => {
  const { connect, } = useConnect()
  const {  writeContract, isPending,isError,error,isSuccess } = useWriteContract()
  const { isConnected, address, chain } = useAccount()
  const [loading, setLoading] = useState<boolean>(true)
  const [messages, setMessages] = useState<string[]>([])
  const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS as `0x${string}`;
  const messageInputRef = useRef<HTMLTextAreaElement>(null)

  if(isError){
    toast.error(error?.name)
  }

  if(isSuccess){
    toast.success("Message sent... waiting for confirmation")
    setMessages([...messages,messageInputRef.current!.value.trim()])
    messageInputRef!.current!.value = "";
  }
  function submit() {
    if (!messageInputRef.current?.value.trim().length) return;
    writeContract({
      address: contractAddress,

      abi: ContractData.abi,
      functionName: 'addMessage',
      args: [messageInputRef.current?.value],

    })



  }

  const { data } = useReadContract({
    address: contractAddress,
    abi: ContractData.abi,
    functionName: "getMessage",
  });



  useEffect(() => {
    if (data && (data as any).length) {
      setLoading(false);
      setMessages(data as any[])
    }
  }, [data])


  return (
    <div>

      <nav className="fixed top-0 w-full z-50 shadow-[#666] bg-[#0B0317] shadow py-3">
        <div className="container flex items-center justify-between">
           <div className="flex items-center gap-3">
            <Identicon
      value={address??"0x00000000000000000000000000000000"}
      size={32}
      theme="ethereum"
    />
    <h2 className="text-xl font-[600] text-[#666]">PYDE PYPER</h2>
           </div>
         <div className="">
           {isConnected ? <div className=" shadow-lg bg-white rounded-full py-3 px-5">


            <div onClick={async () => {
              await navigator.clipboard.writeText(address!.toString())
              toast.success("Copied address to clipboard")
            }} className="flex cursor-pointer items-center gap-2">
              <img src={ETH} className="w-5 h-5" alt="" />
              <small>{` ${chain?.name} ${address?.slice(0, 7)}...${address?.slice(address.length - 5)}`  }</small>
            </div>

          </div> : <button className="bg-blue-500 text-sm text-white p-3 rounded-full" onClick={() => connect({ connector: metaMask() })}>Connect wallet</button>}

         </div>
        </div>
      </nav>
      <div className="grid grid-cols-12 -z-50 mt-20 ">
        <div className="col-span-8 min-h-screen h-full border-r-2 border-r-[#666] pt-10">
          {loading ? <div className="flex items-center justify-center">

            <Loader />

          </div> : <div className="container">
          <p>Messages</p>

            <div className="grid grid-cols-3 gap-5">
              {
                messages.map(message => {
                  return <MessageCard message={message} />;
                })
              }

            </div>
          </div>}
        </div>
        <div className="col-span-4 pt-10">
          <form onSubmit={e => {
            e.preventDefault()
            submit();
          }} className="px-5">
            <div className="">
              <label className="text-[#ccc]" htmlFor="">
                Add message:
              </label>
              <textarea
                ref={messageInputRef}
                name=""
                id=""
                rows={4}
                className="border-[1px] border-[#666] w-full mt-1 bg-transparent text-white rounded outline-none resize-none p-2"
                placeholder="Message..."
              ></textarea>
            </div>

            <button disabled={isPending} type="submit" className="bg-blue-500 flex items-center justify-center text-white text-sm w-full p-2 rounded-lg mt-5">
              {isPending ? <Loader color="fill-white" size="w-4 h-4" /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
