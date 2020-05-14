import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { AfterShip } from 'aftership';

const Couriers = () => {
	const [apiKey, setApiKey] = useState('');
	const [couriers, setCouriers] = useState([]);
	const [allCouriers, setAllCouriers] = useState([]);
	const [detectCouriers, setDetectCouriers] = useState([]);
	const [trackingNumber, setTrackingNumber] = useState('');

	useEffect(() => {
		const key = localStorage.getItem('apiKey');
		if (key) {
			setApiKey(key);
		}
		const trcNumber = localStorage.getItem("trackingNumber")
		if(trcNumber){
			setTrackingNumber(trcNumber)
		}
	}, []);

	const handleChangeApiKey = (e) => {
		const val = e.target.value;
		setApiKey(val);
		localStorage.setItem('apiKey', val);
	};

	const handleListCouriers = (e) => {
		if (!apiKey) {
			alert('Please enter your API key first');
			return;
		}
		const aftership = new AfterShip(apiKey);
		aftership.courier
			.listCouriers()
			.then((res) => {
				setCouriers(res.couriers);
			})
			.catch((e) => {
				alert(e.message);
			});
	};

	const handleListAllCouriers = (e) => {
		if (!apiKey) {
			alert('Please enter your API key first');
			return;
		}

		const aftership = new AfterShip(apiKey);
		aftership.courier
			.listAllCouriers()
			.then((res) => {
				setAllCouriers(res.couriers);
			})
			.catch((e) => {
				alert(e.message);
			});
	};

	const handleChangeTrackingNumber = (e) => {
		const val = e.target.value;
		setTrackingNumber(val);
		localStorage.setItem('trackingNumber', val);
	};

	const handleDetectCouriers = (e) => {
		if (!apiKey) {
			alert('Please enter your API key first');
			return;
		}

		if (!trackingNumber) {
			alert('Please enter the tracking number');
			return;
		}

		const aftership = new AfterShip(apiKey);
		aftership.courier
			.detectCouriers({
				tracking: {
					tracking_number: trackingNumber,
				},
			})
			.then((res) => {
				setDetectCouriers(res.couriers);
			})
			.catch((e) => {
				alert(e.message);
			});
	};

	return (
		<div className='container'>
			<Head>
				<title>Couriers endpoint</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<h1 className='title'>Couriers endpoint</h1>

				<p className='description'>
					Get a list of AfterShip supported couriers.
				</p>

				<div>
					<input
						type='text'
						placeholder='API key'
						className='api-key'
						defaultValue={apiKey}
						onChange={handleChangeApiKey}
					/>
				</div>

				<div className='resource'>
					<div className='card'>
						<a onClick={handleListCouriers}>
							<code>GET /couriers</code>
						</a>
						<ul>
							{couriers.map((item) => (
								<li key={item.slug}>{item.name}</li>
							))}
						</ul>
					</div>
					<div className='card'>
						<a onClick={handleListAllCouriers}>
							<code>GET /couriers/all</code>
						</a>
						<ul>
							{allCouriers.map((item) => (
								<li key={item.slug}>{item.name}</li>
							))}
						</ul>
					</div>
					<div className='card'>
						<a onClick={handleDetectCouriers}>
							<code>POST /couriers/detect</code>
						</a>
						<div className='fields'>
							<input
								type='text'
								placeholder='tracking number'
								defaultValue={trackingNumber}
								onChange={handleChangeTrackingNumber}
							/>
						</div>
						<ul>
							{detectCouriers.map((item) => (
								<li key={item.slug}>{item.name}</li>
							))}
						</ul>
					</div>
				</div>
			</main>

			<footer>
				<a
					href='https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'
				>
					Powered by <img src='/zeit.svg' alt='ZEIT Logo' />
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

export default Couriers;
