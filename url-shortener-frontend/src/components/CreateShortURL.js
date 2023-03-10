import React, { useState } from "react";
import axios from "axios";
import { Link, TextField, Button, Box } from "@mui/material";

function CreateShortURL() {
	const [longUrl, setLongUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");
	const [shortId, setShortId] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		getShortUrl(longUrl).then((result) => {
			setShortUrl(result);
		});
	};

	const handleShortUrlClick = () => {
		return axios
			.get(`http://localhost:3001/url/${shortId}`)
			.then((response) => {
				window.open("http://" + response.data.origUrl, "_blank");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const getShortUrl = (longUrl) => {
		return axios
			.post(`http://localhost:3001/url/shorten`, { origUrl: longUrl })
			.then((response) => {
				console.log(response.data);
				setShortId(response.data.shortId);
				const shortUrl = `${response.data.shortUrl}`;
				return shortUrl;
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
			flexDirection="column"
		>
			<Box>
				<form onSubmit={handleSubmit}>
					<TextField
						id="outlined-basic"
						label="Enter URL"
						variant="outlined"
						type="text"
						value={longUrl}
						onChange={(e) => setLongUrl(e.target.value)}
					></TextField>
					<Button
						margin-left="10px"
						size="large"
						variant="outlined"
						on="true"
						type="submit"
					>
						Shorten URL
					</Button>
				</form>
			</Box>
			<Box padding="10px">
				{shortUrl && (
					<div>
						<div>Shortened Url:</div>
						<Link onClick={handleShortUrlClick}>{shortUrl}</Link>
					</div>
				)}
			</Box>
		</Box>
	);
}

export default CreateShortURL;
