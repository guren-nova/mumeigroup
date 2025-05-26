const webhookURL = 'https://discord.com/api/webhooks/1376156383438704784/dtRYOCzCTgfEix8Q43IFhoMrkYEyVxHFnv43qNOEqefeZI9meavJOaod7UFHEqoizMXz';

document.getElementById('send_message').addEventListener('click', () => {
  // ポップアップ作成
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%) scale(0.7)';
  popup.style.backgroundColor = '#fff';
  popup.style.padding = '30px';
  popup.style.borderRadius = '12px';
  popup.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
  popup.style.zIndex = '9999';
  popup.style.width = '90%';
  popup.style.maxWidth = '400px';
  popup.style.fontFamily = 'sans-serif';
  popup.style.textAlign = 'center';
  popup.style.opacity = '0';
  popup.style.transition = 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.35s ease';

  popup.innerHTML = `
  <h2 style="margin-bottom: 20px;">応援メッセージ作成</h2>
  <input type="text" id="nickname" placeholder="ニックネーム (必須)" style="width: 100%; padding: 10px; margin-bottom: 15px; border-radius: 8px; border: 1px solid #ccc; font-size: 14px;" required>
  <textarea id="message" placeholder="応援メッセージ (任意)" style="width: 100%; padding: 10px; margin-bottom: 20px; border-radius: 8px; border: 1px solid #ccc; font-size: 14px; height: 80px;"></textarea>
  <div style="display: flex; justify-content: space-between;">
    <button id="cancel_btn" style="flex: 1; background-color: #aaa; color: white; border: none; border-radius: 8px; padding: 10px; font-size: 14px; margin-right: 10px; cursor: pointer;">キャンセル</button>
    <button id="submit_btn" class="sousin" style="flex: 1;">応援</button>
  </div>
  `;

  document.body.appendChild(popup);

  // アニメーション開始
  requestAnimationFrame(() => {
    popup.style.transform = 'translate(-50%, -50%) scale(1.1)';
    popup.style.opacity = '1';

    setTimeout(() => {
      popup.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 350);
  });

  // キャンセルボタン処理
  document.getElementById('cancel_btn').addEventListener('click', () => {
    popup.remove();
  });

  // 送信ボタン処理
  document.getElementById('submit_btn').addEventListener('click', () => {
    const nickname = document.getElementById('nickname').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!nickname) {
      alert('ニックネームは必須です！');
      return;
    }

    if (!confirm('送信しますか？')) {
      return;
    }

    const content = `応援ボタンが押されました！ありがとう！\nニックネーム: ${nickname}\n応援メッセージ(任意): ${message || '（メッセージはありません）'}`;

    fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
    .then(res => {
      if (res.ok) {
        window.location.href = "https://mumeigroup.guren-nova.net/ouen_kanryou/";
      } else {
        alert('応援に失敗しました。もう一度試してみるか、後日もう一度ご挑戦ください');
      }
    })
    .catch(() => alert('エラーが発生してしまいました。。'));

    popup.remove();
  });
});