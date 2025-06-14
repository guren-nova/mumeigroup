let kohi = false;
let kakusi = false;
let keyCount = 0;
let time = 1000;
let takoInterval;

function tako() {
    if (kohi === false){
        alert("ダニ！なにか異変が起こったぞ！");
        alert("うわぁ！ここに海洋生物が！")
        kohi = true;
        takoInterval = setInterval(() => {
            const takoEmoji = document.createElement("div");
            takoEmoji.className = "tako";
            takoEmoji.textContent = "🐙";
            const x = Math.random() * (window.innerWidth - 60);
            const y = Math.random() * (window.innerHeight - 60);
            takoEmoji.style.left = `${x}px`;
            takoEmoji.style.top = `${y}px`;
            document.body.appendChild(takoEmoji);
        }, (time));
    } else {
        alert("タコアラート発生中(??????)")
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "t") {
        keyCount++;
        if (!kakusi && keyCount === 10) {
            alert("暴走してしまった！");

            kakusi = true;
            keyCount = 0;
            time = 5;

            clearInterval(takoInterval);
            takoInterval = setInterval(() => {
                const takoEmoji = document.createElement("div");
                takoEmoji.className = "tako";
                takoEmoji.textContent = "🐙";
                const x = Math.random() * (window.innerWidth - 60);
                const y = Math.random() * (window.innerHeight - 60);
                takoEmoji.style.position = "fixed";
                takoEmoji.style.left = `${x}px`;
                takoEmoji.style.top = `${y}px`;
                document.body.appendChild(takoEmoji);
            }, time);
            const cleanupTako = () => {
                const randomInterval = 5000 + Math.random() * 5000;
                setTimeout(() => {
                    document.querySelectorAll(".tako").forEach(tako => tako.remove());
                    cleanupTako();
                }, randomInterval);
            };
            cleanupTako();

        } else if (kakusi) {
            alert("暴走中(🐙💥)「もとに戻すには、リロードしてください」");
        }
    }
});
