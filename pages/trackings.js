import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import { AfterShip } from "aftership";

const Trackings = () => {
  const [apiKey, setApiKey] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [slug, setSlug] = useState("");
  const [trackingPostData, setTrackingPostData] = useState({});
  const [deleteTrackingData, setDeleteTrackingData] = useState({});
  const [getTrackingData, setGetTrackingData] = useState([]);
  const [getBySlugAndNumberData, setGetBySlugAndNumberData] = useState({});
  const [putTrackingData, setPutTrackingData] = useState({});
  const [
    postTrackingBySlugAndNumberData,
    setPostTrackingBySlugAndNumberData,
  ] = useState({});
  const [addtrackingNumber,setAddTrackingNumber] = useState("")

  useEffect(() => {
    const key = localStorage.getItem("apiKey");
    if (key) {
      setApiKey(key);
    }
    const trcNumber = localStorage.getItem("trackingNumber");
    if (trcNumber) {
      setTrackingNumber(trcNumber);
    }
    const slugs = localStorage.getItem("slug");
    if (slugs) {
      setSlug(slugs);
    }
  }, []);

  const handleChangeApiKey = (e) => {
    const val = e.target.value;
    setApiKey(val);
    localStorage.setItem("apiKey", val);
  };

  const handlePostTracking = (e) => {
    if (!apiKey) {
      alert("Please enter your API key first");
      return;
    }
    if(!addtrackingNumber){
      alert("please enter the trackingNumber");
      return ;
    }
    const aftership = new AfterShip(apiKey);
    const payload = {
      tracking: {
        slug: slug,
        tracking_number: addtrackingNumber,
        title: "Title Name",
        smses: ["+18555072509", "+18555072501"],
        emails: ["email@yourdomain.com", "another_email@yourdomain.com"],
        order_id: "ID 1234",
        order_id_path: "http://www.aftership.com/order_id=1234",
        custom_fields: {
          product_name: "iPhone Case",
          product_price: "USD19.99",
        },
      },
    };
    aftership.tracking
      .createTracking(payload)
      .then((result) => {
        setTrackingPostData(result.tracking);
      })
      .catch((e) => {
        alert(e.message)
      });
  };

  const handleChangeTrackingNumber = (e) => {
    const val = e.target.value;
    setTrackingNumber(val);
    localStorage.setItem("trackingNumber", val);
  };

  const handleSetSlug = (e) => {
    const val = e.target.value;
    setSlug(val);
    localStorage.setItem("slug", val);
  };
  const handleGetTrackingBySlugAndNumber = (e) => {
    if (!apiKey) {
      alert("Please enter your API key first");
      return;
    }

    if (!trackingNumber) {
      alert("Please enter the tracking number");
      return;
    }

    if (!slug) {
      alert("Please enter the slug");
      return;
    }
    const aftership = new AfterShip(apiKey);
    aftership.tracking
      .getTracking({
        slug: slug,
        tracking_number: trackingNumber,
      })
      .then((result) => {
        setGetBySlugAndNumberData(result.tracking);
        // console.log(result);
      })
      .catch((e) => alert(e.message));
  };

  const handleDeleteTrackingData = (e) => {
    if (!apiKey) {
      alert("Please enter your API key first");
      return;
    }

    if (!trackingNumber) {
      alert("Please enter the tracking number");
      return;
    }
    if (!slug) {
      alert("Please enter the slug");
      return;
    }
    const aftership = new AfterShip(apiKey);
    aftership.tracking
      .deleteTracking({
        slug: slug,
        tracking_number: trackingNumber,
      })
      .then((result) => {
        setDeleteTrackingData(result.tracking);
      })
      .catch((e) => alert(e.message));
  };

  const handleGetTracking = (e) => {
    if (!apiKey) {
      alert("Please enter your API key first");
      return;
    }
    const query = {
      slug: "dhl,ups,usps",
    };
    const aftership = new AfterShip(apiKey);
    aftership.tracking
      .listTrackings(query)
      .then((result) => {
        setGetTrackingData(result.trackings);
      })
      .catch((e) => alert(e.message));
  };

  const handlePutTrackingBySlugAndNumber = () => {
    if (!apiKey) {
      alert("Please enter your API key first");
      return;
    }
    if (!trackingNumber) {
      alert("Please enter the tracking number");
      return;
    }

    if (!slug) {
      alert("Please enter the slug");
      return;
    }

    const aftership = new AfterShip(apiKey);
    aftership.tracking
      .updateTracking({
        slug: slug,
        tracking_number: trackingNumber,
        optional_parameters: {
          tracking_postal_code: "1234",
          tracking_ship_date: "20200423",
        },
      })
      .then((result) => {
        setPutTrackingData(result.tracking);
      })
      .catch((e) => alert(e.message));
  };

  const handlePostBySlugAndTracking = () => {
    if (!apiKey) {
      alert("Please enter your API key first");
      return;
    }
    if (!trackingNumber) {
      alert("Please enter the tracking number");
      return;
    }

    if (!slug) {
      alert("Please enter the slug");
      return;
    }
    const aftership = new AfterShip(apiKey);
    aftership.tracking
      .retrack({
        slug: slug,
        tracking_number: trackingNumber,
      })
      .then((result) => {
        setPostTrackingBySlugAndNumberData(
          result.tracking
        );
      })
      .catch((e) => alert(e.message));
  };

  const handleAddTrackingNunber=(e)=>{
    setAddTrackingNumber(e.target.value)
  }
  return (
    <div className="container">
      <Head>
        <title>Trackings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Couriers endpoint</h1>

        <p className="description">
          Create trackings, update trackings, and get tracking results.
        </p>

        <div>
          <input
            type="text"
            placeholder="API key"
            className="api-key"
            defaultValue={apiKey}
            onChange={handleChangeApiKey}
          />
        </div>

        <div className="resource">
          <div className="card">
            <a onClick={handlePostTracking}>
              <code>POST /trackings</code>
            </a>
            <div className="fields">
              <input
                type="text"
                placeholder="trackingNumber"
                defaultValue={addtrackingNumber}
                onChange={handleAddTrackingNunber}
              />
            </div>
            <div>
              {Object.keys(trackingPostData).map((key) => 
                <div key={key}>
                  {key}:{JSON.stringify(trackingPostData[key])}
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <a onClick={handleDeleteTrackingData}>
              <code>DELETE /trackings/:slug/:tracking_number</code>
            </a>
            <div className="fields">
              <input
                type="text"
                placeholder="slug"
                defaultValue={slug}
                onChange={handleSetSlug}
              />
            </div>
            <div className="fields">
              <input
                type="text"
                placeholder="tracking number"
                defaultValue={trackingNumber}
                onChange={handleChangeTrackingNumber}
              />
            </div>
            <div>
              {Object.keys(deleteTrackingData).map((key) => (
                <div key={key}>
                  {key}:{JSON.stringify(deleteTrackingData[key])}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <a onClick={handleGetTracking}>
              <code>GET /trackings</code>
            </a>
            {getTrackingData.map((item) =>
              Object.keys(item).map((key) => (
                <div key={key}>
                  {key}:{JSON.stringify(item[key])}
                </div>
              ))
            )}
          </div>

          <div className="card">
            <a onClick={handleGetTrackingBySlugAndNumber}>
              <code>GET /trackings/:slug/:tracking_number</code>
            </a>
            <div className="fields">
              <input
                type="text"
                placeholder="slug"
                defaultValue={slug}
                onChange={handleSetSlug}
              />
            </div>
            <div className="fields">
              <input
                type="text"
                placeholder="tracking number"
                defaultValue={trackingNumber}
                onChange={handleChangeTrackingNumber}
              />
            </div>
            <div>{
               Object.keys(getBySlugAndNumberData).map((key) => (
                <div key={key}>
                  {key}:{JSON.stringify(getBySlugAndNumberData[key])}
                </div>
              ))
              }</div>
          </div>
          <div className="card">
            <a onClick={handlePutTrackingBySlugAndNumber}>
              <code>PUT /trackings/:slug/:tracking_number</code>
            </a>
            <div className="fields">
              <input
                type="text"
                placeholder="slug"
                defaultValue={slug}
                onChange={handleSetSlug}
              />
            </div>
            <div className="fields">
              <input
                type="text"
                placeholder="tracking number"
                defaultValue={trackingNumber}
                onChange={handleChangeTrackingNumber}
              />
            </div>
            <div>{
               Object.keys(putTrackingData).map((key) => (
                <div key={key}>
                  {key}:{JSON.stringify(putTrackingData[key])}
                </div>
              ))
              }</div>
          </div>
          <div className="card">
            <a onClick={handlePostBySlugAndTracking}>
              <code>POST /trackings/:slug/:tracking_number/retrack</code>
            </a>
            <div className="fields">
              <input
                type="text"
                placeholder="slug"
                defaultValue={slug}
                onChange={handleSetSlug}
              />
            </div>
            <div className="fields">
              <input
                type="text"
                placeholder="tracking number"
                defaultValue={trackingNumber}
                onChange={handleChangeTrackingNumber}
              />
            </div>
            <div>{
                 Object.keys(postTrackingBySlugAndNumberData).map((key) => (
                  <div>
                    {key}:{JSON.stringify(postTrackingBySlugAndNumberData[key])}
                  </div>
                ))}</div>
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        input {
          padding: 5px;
          font-size: 1rem;
        }

        input.api-key {
          width: 300px;
        }

        code {
          display: block;
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .resource {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex-direction: column;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          text-align: left;
        }

        .card a:hover {
          cursor: pointer;
        }

        .fields {
          display: block;
          padding: 10px 0;
          margin: 10px 0;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Trackings;
