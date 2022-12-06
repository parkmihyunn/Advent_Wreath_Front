import React, { useEffect, useState } from "react";
import { Modal, Image, Link } from "@nextui-org/react";
import axios from 'axios';


const ReindeerModal = ({ isVisible, onRClose }) => {
  if(!isVisible) return null;
  // 순록 데이터를 저장시킬 refinedData 
  const [refinedData, setRefinedData] = useState({});
  const [numDeer, setNumDeer] = useState();
  
  /* user 정보 가져오기 */
  const [user, setUser] = useState([]);
  useEffect(() => {
    if(typeof window !== 'undefined') {
      setUser(JSON.parse(window.sessionStorage.user))
    }
  },[])

  useEffect(() => {
    axios.get("http://localhost:3000/api/temp")
    .then(res => {
      console.log('성공');
      console.log(res.data);
      const deerNum = res.data[0].reindeers.length
      setRefinedData(res.data[0].reindeers[deerNum-1])
      setNumDeer(res.data[0].reindeers.length)
    })
    .catch(res => {
      console.log('실패');
      console.log(res);
    })
  }, []);

    return (
      <div>
      <Modal css={{background:"transparent"}} noPadding open={isVisible} preventClose onClose={onRClose} width={300} height={563} animated={false}>
        <Modal.Header className="flex flex-col items-center text-center w-full mt-36" css={{ position: "absolute", zIndex: "$1"}}>
          <div className="flex flex-col items-center text-center w-full">
            <div className="relative w-full mt-10">
              <div className="relative"><Image src={ refinedData.body} width={93} height={103}/></div>
              <div className="reindeer1 top-[63%] absolute"><Image src={ refinedData.bodydeco} width={45} height={25}/></div>
              <div className="reindeer1 top-[28%] absolute"><Image src={ refinedData.eye} width={37} height={8}/></div>
              <div className="reindeer1 top-[-13%] absolute"><Image src={ refinedData.horn} width={67} height={39}/></div>
              <div className="reindeer1 top-[-2%] absolute"><Image src={ refinedData.headdeco} width={23} height={14}/></div>
            </div>
            <div className="relative">
              <div className="pt-10 font-bold text-xl">{numDeer}번째 순록이 도착했어요 ♥</div>
              <div className="pt-8 text-sm">{user.name}님만의 특별한 순록이예요.</div>
              <div className="pt-1 text-sm">방문 앞의 순록도감에서 확인할 수 있어요!</div>
            </div>
              <Link href="/main"><button className="mt-16 px-4 py-2 text-white text-base rounded-2xl bg-red-800">맘에 들어요!</button></Link>
          </div>
        </Modal.Header>
        <Image src="/img/r_modal_bg.png" width={300} height={563}/>
      </Modal>
      </div>
    );
}

export default ReindeerModal