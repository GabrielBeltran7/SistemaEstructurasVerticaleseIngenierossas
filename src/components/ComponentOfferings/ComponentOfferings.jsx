import { useNavigate } from "react-router-dom";
import style from "./ComponentOfferings.module.css"
const ComponentOfferings = () => {
  const navigate = useNavigate()
  const navigateOfrering=()=>{
    navigate("/registeroffering")
  }
  return (
    <div className={style.offeringsbutton}>
      <label className={style.title}>Ofrendas</label>
      <a onClick={navigateOfrering}
        
      >
        <img
          src="https://e7.pngegg.com/pngimages/104/456/png-clipart-computer-icons-money-scalable-graphics-fund-text-donation.png"
          alt="ofrendas"
          width="65px"
        />
      </a>
    </div>
  );
};

export default ComponentOfferings;
