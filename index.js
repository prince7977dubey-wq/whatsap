const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const emojiBtn = document.getElementById("emojiBtn");
const emojiBox = document.getElementById("emojiBox");
const voiceBtn = document.getElementById("voiceBtn");
const cameraBtn = document.getElementById("cameraBtn");

sendBtn.addEventListener("click", sendMessage);

function sendMessage() {
    const text = messageInput.value.trim();

    if(text !== "") {
        const msg = document.createElement("div");
        msg.className = "message";
        msg.textContent = text;
        chatBox.appendChild(msg);

        messageInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

messageInput.addEventListener("keypress", e => {
    if(e.key === "Enter") sendMessage();
});

emojiBtn.addEventListener("click", () => {
    emojiBox.style.display =
    emojiBox.style.display === "block"
    ? "none"
    : "block";
});

emojiBox.addEventListener("click", e => {
    if(e.target.textContent) {
        messageInput.value += e.target.textContent;
    }
});

let mediaRecorder;
let audioChunks = [];

voiceBtn.addEventListener("click", async () => {

    if(!mediaRecorder || mediaRecorder.state === "inactive") {

        const stream =
        await navigator.mediaDevices.getUserMedia({
            audio:true
        });

        mediaRecorder =
        new MediaRecorder(stream);

        mediaRecorder.start();

        audioChunks = [];

        mediaRecorder.ondataavailable = e => {
            audioChunks.push(e.data);
        };

        voiceBtn.textContent = "⏹️";

    } else {

        mediaRecorder.stop();

        mediaRecorder.onstop = () => {

            const audioBlob =
            new Blob(audioChunks,{type:'audio/mp3'});

            const audioUrl =
            URL.createObjectURL(audioBlob);

            const audio =
            document.createElement("audio");

            audio.controls = true;
            audio.src = audioUrl;

            const msg =
            document.createElement("div");

            msg.className = "message";
            msg.appendChild(audio);

            chatBox.appendChild(msg);

            voiceBtn.textContent = "🎤";
        };
    }
});

cameraBtn.addEventListener("click", async () => {

    const stream =
    await navigator.mediaDevices.getUserMedia({
        video:true
    });

    const video =
    document.getElementById("video");

    document.querySelector(".camera-area")
    .style.display = "flex";

    video.srcObject = stream;

    setTimeout(() => {

        const canvas =
        document.getElementById("canvas");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx =
        canvas.getContext("2d");

        ctx.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );

        const img =
        document.createElement("img");

        img.src =
        canvas.toDataURL("image/png");

        img.style.width = "200px";
        img.style.borderRadius = "10px";

        const msg =
        document.createElement("div");

        msg.className = "message";
        msg.appendChild(img);

        chatBox.appendChild(msg);

        stream.getTracks()
        .forEach(track => track.stop());

        document.querySelector(".camera-area")
        .style.display = "none";

    },3000);
});function sendMessage() {
    const text = messageInput.value.trim();

    if (text !== "") {
        const msg = document.createElement("div");
        msg.className = "message";

        const now = new Date();
        const time =
            now.getHours().toString().padStart(2, "0") +
            ":" +
            now.getMinutes().toString().padStart(2, "0");

        msg.innerHTML = `
            <div>${text}</div>
            <small>${time} ✓✓</small>
        `;

        chatBox.appendChild(msg);

        saveMessages();

        messageInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}function saveMessages() {
    localStorage.setItem(
        "messages",
        chatBox.innerHTML
    );
}

window.onload = () => {
    chatBox.innerHTML =
        localStorage.getItem("messages") || "";
};document
.getElementById("darkModeBtn")
.addEventListener("click", () => {

    document.body.classList.toggle("dark");
});imageInput.addEventListener("change", e => {

    const file = e.target.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(event){

            const img = document.createElement("img");
            img.src = event.target.result;
            img.style.width = "200px";

            const msg = document.createElement("div");
            msg.className = "message";

            msg.appendChild(img);

            chatBox.appendChild(msg);

            saveMessages();
        };

        reader.readAsDataURL(file);
    }
});messageInput.addEventListener("input", () => {

    typing.innerText = "Typing...";

    clearTimeout(window.typingTimeout);

    window.typingTimeout =
        setTimeout(() => {
            typing.innerText = "";
        }, 1000);
});chatBox.addEventListener("dblclick", e => {

    if(e.target.classList.contains("message")){

        if(confirm("Delete this message?")){

            e.target.remove();

            saveMessages();
        }
    }
});msg.classList.add("sent");darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );
});

window.onload = () => {
    if(localStorage.getItem("darkMode") === "true"){
        document.body.classList.add("dark");
    }
};if(e.target.classList.contains("message"));function scrollBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
}