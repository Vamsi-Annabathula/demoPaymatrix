import { useEffect, useState } from "react";
import "./styles.css";
import { url } from "./utils/constants";

export default function App() {
  const [data, setData] = useState([]);
  const [viewData, setViewData] = useState([]);
  const [currSet, setCurrSet] = useState(0);
  const [start, setStart] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url);
        const jsonRes = await res.json();
        setData(jsonRes);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const nextSet = (setNum) => {
    setViewData([...data.slice(currSet, setNum)]);
    setCurrSet(currSet + 5);
  };
  return (
    <div className="App">
      {start ? (
        <button
          onClick={() => {
            nextSet(5);
            setStart(false);
          }}
        >
          Get Data
        </button>
      ) : null}
      {viewData.map((ele) => {
        return (
          <div>
            <h1>
              <span>{ele.id}. </span>
              {ele.title}
            </h1>
            <h5>{ele.body}</h5>
          </div>
        );
      })}
      {!start ? (
        <button onClick={() => nextSet(currSet + 5)}>Next</button>
      ) : null}
    </div>
  );
}
