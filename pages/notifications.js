import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import { AfterShip } from "aftership";

const Notifications = () => {
  const [apiKey, setApiKey] = useState("");
  const [slug, setSlug] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [getData,setGetData] = useState({})
  const [addData,setAddData] = useState({})
  const [removeData,setRemoveData] = useState({})

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

  const handleGetNotificationsData = (e) => {
    if (!apiKey) {
      alert("Please enter your API key first");
      return;
    }
    if(!slug){
        alert('Please enter the slug');
        return;
     }
     if(!trackingNumber){
        alert('Please enter the trackingNumber');
        return;
     }
    const aftership = new AfterShip(apiKey);
    aftership.notification
      .getNotification({
        slug: slug,
        tracking_number: trackingNumber,
      })
      .then((result) => {
        setGetData(result.notification);
      })
      .catch((e) => alert(e.message));
  };

  const handleAddNotificationsData = (e) => {
    if (!apiKey) {
      alert("Please enter your API key first");
      return;
    }
    if(!slug){
        alert('Please enter the slug');
        return;
     }
     if(!trackingNumber){
        alert('Please enter the trackingNumber');
        return;
     }
    const aftership = new AfterShip(apiKey);
    const payload = {
      notification: {
        emails: [
          "user1@gmail.com",
          "user2@gmail.com",
          "invalid EMail @ Gmail. com",
        ],
        smses: ["+85291239123", "+85261236123", "Invalid Mobile Phone Number"],
      },
    };
    aftership.notification
      .addNotification(
        {
          slug: slug,
          tracking_number: trackingNumber,
        },
        payload
      )
      .then((result) => {
        setAddData(result.notification);
      })
      .catch((e) => alert(e.message));
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

  const handleRemoveNotificationsData = (e) => {
    if (!apiKey) {
      alert("Please enter your API key first");
      return;
    }

    if(!slug){
        alert('Please enter the slug');
        return;
     }
     if(!trackingNumber){
        alert('Please enter the trackingNumber');
        return;
     }

    const aftership = new AfterShip(apiKey);
    const payload = {
      notification: {
        emails: [
          "user1@gmail.com",
          "user2@gmail.com",
          "invalid EMail @ Gmail. com",
        ],
        smses: ["+85291239123", "+85261236123", "Invalid Mobile Phone Number"],
      },
    };
    aftership.notification
      .removeNotification(
        {
          slug: slug,
          tracking_number: trackingNumber,
        },
        payload
      )
      .then((result) => {
        setRemoveData(result.notification);
      })
      .catch((e) => alert(e.message));
  };

  return (
    <div className="container">
      <Head>
        <title>Notifications</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Notifications</h1>

        <p className="description">
          Get, add or remove contacts (sms or email) to be notified when the
          status of a tracking has changed.
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
        <div className="fields">
            <div>slug</div>
            <input
              type="text"
              placeholder="slug"
              defaultValue={slug}
              onChange={handleSetSlug}
            />
          </div>
          <div className="fields">
            <div>trackingNumber</div>
            <input
              type="text"
              placeholder="tracking number"
              defaultValue={trackingNumber}
              onChange={handleChangeTrackingNumber}
            />
          </div>

        <div className="resource">
          <div className="card">
            <a onClick={handleGetNotificationsData}>
              <code>GET /notifications/:slug/:tracking_number</code>
            </a>
             {Object.keys(getData).map((key) => (
              <div key={key}>
                {key}:{JSON.stringify(getData[key])}
              </div>
            ))}
          </div>
          <div className="card">
            <a onClick={handleAddNotificationsData}>
              <code>POST /notifications/:slug/:tracking_number/add</code>
            </a>
            {Object.keys(addData).map((key) => (
              <div key={key}>
                {key}:{JSON.stringify(addData[key])}
              </div>
            ))}
          </div>
          <div className="card">
            <a onClick={handleRemoveNotificationsData}>
              <code>POST /notifications/:slug/:tracking_number/remove</code>
            </a>
            {Object.keys(removeData).map((key) => (
              <div key={key}>
                {key}:{JSON.stringify(removeData[key])}
              </div>
            ))}
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
          margin-top: 1rem;
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

export default Notifications;
