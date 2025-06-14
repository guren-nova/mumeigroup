document.querySelector("button").addEventListener("click", function () {
    const firstConfirm = confirm("この内容で送信します");
    if (!firstConfirm) {
        alert("🚫 エントリー送信をキャンセルしました。");
        return;
    }

    const secondConfirm = confirm("最終確認 | この先はキャンセル不可能です。本当に大丈夫ですか？");
    if (!secondConfirm) {
        alert("🚫 エントリー送信をキャンセルしました。");
        return;
    }

    const payload = {
        content: "**新しいスタッフエントリーが届きました！**",
        embeds: [{
            title: "📥 エントリー情報",
            fields: [
                { name: "表示名", value: document.getElementById("discord_display").value || "（未記入）" },
                { name: "ユーザー名", value: document.getElementById("discord_user").value || "（未記入）" },
                { name: "ユーザーID", value: document.getElementById("discord_id").value || "（未記入）" },
                { name: "参加状況", value: document.getElementById("join_now").value || "（未選択）" },
                { name: "志望動機", value: document.getElementById("douki").value || "（未記入）" },
                { name: "希望スタッフ名", value: document.getElementById("rename").value || "（未記入）" },
                { name: "希望部署", value: document.getElementById("syu").value || "（希望無し）" },
                { name: "その他", value: document.getElementById("sonota").value || "（未記入）" }
            ],
            color: 0x00bfff
        }]
    };

    const webhookURL = "https://discord.com/api/webhooks/1383281127422164992/TqtvwNsYT9th6jkZr0oMaBHT26v-mkKE24WvDWTraOo1PAhPgANFrnaSZWFdZWBM71gb";

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
             window.location.href = "https://mumeigroup.guren-nova.net/entry/sousin";
        } else {
            alert("❌ エラーが発生しました。");
        }
    })
    .catch(error => {
        console.error("送信エラー:", error);
        alert("⚠️ 送信中に問題が発生しました。");
    });
});
