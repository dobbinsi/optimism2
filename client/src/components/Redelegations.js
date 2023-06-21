import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const Redelegations = () => {
  const [ninetyTotData, setNinetyTotData] = useState([]);
  const [oneTotData, setOneTotData] = useState([]);
  const [thirtyTotData, setThirtyTotData] = useState([]);
  const [ninetyReData, setNinetyReData] = useState([]);
  const [oneReData, setOneReData] = useState([]);
  const [thirtyReData, setThirtyReData] = useState([]);

  const [thirtyState, setThirtyState] = useState(true);
  const [ninetyState, setNinetyState] = useState(false);
  const [oneState, setOneState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);

  const chartDates30 = thirtyTotData.map((item) => {
    return item["BLOCK_TIMESTAMP::DATE"];
  });
  const chartDates90 = ninetyTotData.map((item) => {
    return item["BLOCK_TIMESTAMP::DATE"];
  });
  const chartDates180 = oneTotData.map((item) => {
    return item["BLOCK_TIMESTAMP::DATE"];
  });

  const chartAmounts30Tot = thirtyTotData.map((item) => {
    return item["OP_DELEGATED"];
  });
  const chartAmounts90Tot = ninetyTotData.map((item) => {
    return item["OP_DELEGATED"];
  });
  const chartAmounts180Tot = oneTotData.map((item) => {
    return item["OP_DELEGATED"];
  });
  const chartAmounts30Re = thirtyReData.map((item) => {
    return item["OP_DELEGATED"];
  });
  const chartAmounts90Re = ninetyReData.map((item) => {
    return item["OP_DELEGATED"];
  });
  const chartAmounts180Re = oneReData.map((item) => {
    return item["OP_DELEGATED"];
  });

  const thirtyHandler = () => {
    setThirtyState(true);
    setNinetyState(false);
    setOneState(false);
    setActive1(true);
    setActive2(false);
    setActive3(false);
  };

  const ninetyHandler = () => {
    setThirtyState(false);
    setNinetyState(true);
    setOneState(false);
    setActive1(false);
    setActive2(true);
    setActive3(false);
  };

  const oneHandler = () => {
    setThirtyState(false);
    setNinetyState(false);
    setOneState(true);
    setActive1(false);
    setActive2(false);
    setActive3(true);
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale
  );

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            family: "'Rubik', sans-serif",
          },
          color: "#8b949e",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            family: "'Rubik', sans-serif",
          },
          color: "#8b949e",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#8b949e",
        },
      },
      title: {
        display: true,
        text: "Total OP Tokens Delegated",
        font: {
          size: 18,
          family: "'Rubik', sans-serif",
          weight: "lighter",
        },
        color: "#8b949e",
      },
    },
  };

  const chartOptions2 = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            family: "'Rubik', sans-serif",
          },
          color: "#8b949e",
        },
        grid: {
          display: false,
        },
      },
      y: {
        min: 1000,
        max: 10000000,
        stepSize: 10000,
        ticks: {
          font: {
            family: "'Rubik', sans-serif",
          },
          color: "#8b949e",
        },
        grid: {
          display: false,
        },
        // display: true,
        type: "logarithmic",
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#8b949e",
        },
      },
      title: {
        display: true,
        text: "Total OP Tokens Delegated - Log Scale",
        font: {
          size: 18,
          family: "'Rubik', sans-serif",
          weight: "lighter",
        },
        color: "#8b949e",
      },
    },
  };

  const chartData30 = {
    labels: chartDates30,
    datasets: [
      {
        label: "OP Delegated",
        data: chartAmounts30Tot,
        backgroundColor: "#ff1420",
        borderColor: ["#3d4147"],
        borderWidth: 1.5,
      },
      {
        label: "OP Re-Delegated",
        data: chartAmounts30Re,
        backgroundColor: "#99a7bc",
        borderColor: ["#3d4147"],
        borderWidth: 1.5,
      },
    ],
  };

  const chartData90 = {
    labels: chartDates90,
    datasets: [
      {
        label: "OP Delegated",
        data: chartAmounts90Tot,
        backgroundColor: "#ff1420",
        borderColor: ["#3d4147"],
        borderWidth: 0.75,
      },
      {
        label: "OP Re-Delegated",
        data: chartAmounts90Re,
        backgroundColor: "#99a7bc",
        borderColor: ["#3d4147"],
        borderWidth: 0.75,
      },
    ],
  };

  const chartData180 = {
    labels: chartDates180,
    datasets: [
      {
        label: "OP Delegated",
        data: chartAmounts180Tot,
        backgroundColor: "#ff1420",
        borderColor: ["#3d4147"],
        borderWidth: 0.75,
      },
      {
        label: "OP Re-Delegated",
        data: chartAmounts180Re,
        backgroundColor: "#99a7bc",
        borderColor: ["#3d4147"],
        borderWidth: 0.75,
      },
    ],
  };

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/9c1aeed2-3937-4f36-8a62-0f4a532b1d43/data/latest"
      )
      .then((res) => {
        setThirtyTotData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/a6b5fc5b-0f3d-403a-a9c7-d8aad22f9aed/data/latest"
      )
      .then((res) => {
        setThirtyReData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/ae4ec031-aafb-46c6-a74f-2c2fdc317747/data/latest"
      )
      .then((res) => {
        setNinetyTotData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/f9e9bcfe-4a52-4c65-99d8-c7d7aa501ca1/data/latest"
      )
      .then((res) => {
        setNinetyReData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/e99e3623-f4a0-444f-9e58-f6d48de6f291/data/latest"
      )
      .then((res) => {
        setOneTotData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/3e155a9f-3b2c-44b6-972c-7950bd4521cc/data/latest"
      )
      .then((res) => {
        setOneReData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //   useEffect(() => {
  //     const flipside = new Flipside(
  //       API_KEY,
  //       "https://api-v2.flipsidecrypto.xyz"
  //     );

  //     const queryThirtyTot = {
  //       sql: "SELECT block_timestamp :: date, sum(raw_new_balance) / POW(10,21) AS OP_delegated FROM optimism.core.fact_delegations WHERE block_timestamp :: date >= CURRENT_DATE - 30 GROUP BY block_timestamp :: date ORDER BY block_timestamp :: date ASC",
  //       ttlMinutes: 60,
  //     };

  //     const resultThirtyTot = flipside.query
  //       .run(queryThirtyTot)
  //       .then((records) => {
  //         setThirtyTotData(records.rows);
  //         setLoading(false);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     const flipside = new Flipside(
  //       API_KEY,
  //       "https://api-v2.flipsidecrypto.xyz"
  //     );

  //     const queryThirtyRe = {
  //       sql: "SELECT block_timestamp :: date, sum(raw_new_balance) / POW(10,21) AS OP_delegated FROM optimism.core.fact_delegations WHERE block_timestamp :: date >= CURRENT_DATE - 30 AND delegation_type = 'Re-Delegation' GROUP BY block_timestamp :: date ORDER BY block_timestamp :: date ASC",
  //       ttlMinutes: 60,
  //     };

  //     const resultThirtyRe = flipside.query.run(queryThirtyRe).then((records) => {
  //       setThirtyReData(records.rows);
  //       setLoading(false);
  //     });
  //   }, []);

  //   useEffect(() => {
  //     const flipside = new Flipside(
  //       API_KEY,
  //       "https://api-v2.flipsidecrypto.xyz"
  //     );

  //     const queryNinetyTot = {
  //       sql: "SELECT block_timestamp :: date, sum(raw_new_balance) / POW(10,21) AS OP_delegated FROM optimism.core.fact_delegations WHERE block_timestamp :: date >= CURRENT_DATE - 90 GROUP BY block_timestamp :: date ORDER BY block_timestamp :: date ASC",
  //       ttlMinutes: 60,
  //     };

  //     const resultNinetyTot = flipside.query
  //       .run(queryNinetyTot)
  //       .then((records) => {
  //         setNinetyTotData(records.rows);
  //         setLoading(false);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     const flipside = new Flipside(
  //       API_KEY,
  //       "https://api-v2.flipsidecrypto.xyz"
  //     );

  //     const queryNinetyRe = {
  //       sql: "SELECT block_timestamp :: date, sum(raw_new_balance) / POW(10,21) AS OP_delegated FROM optimism.core.fact_delegations WHERE block_timestamp :: date >= CURRENT_DATE - 90 AND delegation_type = 'Re-Delegation' GROUP BY block_timestamp :: date ORDER BY block_timestamp :: date ASC",
  //       ttlMinutes: 60,
  //     };

  //     const resultNinetyRe = flipside.query.run(queryNinetyRe).then((records) => {
  //       setNinetyReData(records.rows);
  //       setLoading(false);
  //     });
  //   }, []);

  //   useEffect(() => {
  //     const flipside = new Flipside(
  //       API_KEY,
  //       "https://api-v2.flipsidecrypto.xyz"
  //     );

  //     const queryOneTot = {
  //       sql: "SELECT block_timestamp :: date, sum(raw_new_balance) / POW(10,21) AS OP_delegated FROM optimism.core.fact_delegations WHERE block_timestamp :: date >= CURRENT_DATE - 180 GROUP BY block_timestamp :: date ORDER BY block_timestamp :: date ASC",
  //       ttlMinutes: 60,
  //     };

  //     const resultOneTot = flipside.query.run(queryOneTot).then((records) => {
  //       setOneTotData(records.rows);
  //       setLoading(false);
  //     });
  //   }, []);

  //   useEffect(() => {
  //     const flipside = new Flipside(
  //       API_KEY,
  //       "https://api-v2.flipsidecrypto.xyz"
  //     );

  //     const queryOneRe = {
  //       sql: "SELECT block_timestamp :: date, sum(raw_new_balance) / POW(10,21) AS OP_delegated FROM optimism.core.fact_delegations WHERE block_timestamp :: date >= CURRENT_DATE - 180 AND delegation_type = 'Re-Delegation' GROUP BY block_timestamp :: date ORDER BY block_timestamp :: date ASC",
  //       ttlMinutes: 60,
  //     };

  //     const resultOneRe = flipside.query.run(queryOneRe).then((records) => {
  //       setOneReData(records.rows);
  //       setLoading(false);
  //     });
  //   }, []);

  return (
    <div className="single-main-leader">
      {loading ? (
        <div className="loader-blank"></div>
      ) : (
        <>
          <div className="title-date">
            <div className="table-title">
              <h1 className="leader-title">Trends: Delegation Activity</h1>
            </div>
            <div className="date-toggle">
              <p className="select-date">Select Date Range</p>
              <button
                style={{ color: active1 ? "#ff1420" : "#68778d" }}
                onClick={thirtyHandler}
              >
                30
              </button>
              <button
                style={{ color: active2 ? "#ff1420" : "#68778d" }}
                onClick={ninetyHandler}
              >
                90
              </button>
              <button
                style={{ color: active3 ? "#ff1420" : "#68778d" }}
                onClick={oneHandler}
              >
                180
              </button>
            </div>
          </div>
          {thirtyState && (
            <div className="chart-area">
              <Bar options={chartOptions} data={chartData30} />
            </div>
          )}
          {ninetyState && (
            <div className="chart-area">
              <Bar options={chartOptions} data={chartData90} />
            </div>
          )}
          {oneState && (
            <div className="chart-area">
              <Bar options={chartOptions2} data={chartData180} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Redelegations;
