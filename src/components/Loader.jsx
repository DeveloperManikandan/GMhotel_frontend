import { useState} from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  let [loading, setLoading] = useState(true);

  return (
    <div style={{marginTop:'200px' ,marginLeft:'45%'}}>
      <div className="sweet-loading text-center">
        <HashLoader
          color='#000'
          loading={loading}
          size={80}
        />
      </div>
    </div>
  );
}

export default Loader;
