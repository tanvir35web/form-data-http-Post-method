import { useRef } from "react";
import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const photoRef = useRef(null);
    const [response, setResponse] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            username: userNameRef.current.value,
            password: passwordRef.current.value,
            photo: photoRef.current.files[0],
        };

        try {
            const { data } = await axios.post(
                "http://httpbin.org/post",
                payload
            );
            console.log(data);
            setResponse(data);
            setPhotoPreview(URL.createObjectURL(photoRef.current.files[0]));
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            <h1>Form HTTP Request Handling</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">User Name</label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    ref={userNameRef}
                />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    ref={passwordRef}
                />
                <br /> <br />
                <label htmlFor="photo">Select Photo</label> <br />
                <input
                    type="file"
                    accept="image/*"
                    id="photo"
                    name="photo"
                    ref={photoRef}
                />
                <br /> <br />
                <button type="submit">Submit</button>
            </form>

            {response && (
                <div>
                    <h2>User Details</h2>
                    <p>Username: {response.json.username}</p>
                    <p>Password: {response.json.password}</p>
                    <img
                        src={photoPreview}
                        alt="test photo"
                        style={{ width: "200px" }}
                    />
                </div>
            )}
        </>
    );
}

export default App;
