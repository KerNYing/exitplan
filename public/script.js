const signInWithGoogleBtn = document.getElementById('signInWithGoogleBtn');

signInWithGoogleBtn.addEventListener('click', async () => {
    const response = await fetch('/signinwithgoogle')
    const data = await response.json();

    console.log(data.oauth2ReqUrl);
    window.location.href = data.oauth2ReqUrl;
});