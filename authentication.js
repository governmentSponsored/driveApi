var developerKey = "AIzaSyDq7Ix_RR7_mNqCobPUV2lcZbBEMmx3Miw",
developerKey2 = "AIzaSyDPBh6K0jEQLH1udDKw-esXeVIPm4d9wGA",
clientId = "1021752887834-le2b59vq7bv2q2kq42tk9mbtbglbbnal.apps.googleusercontent.com",
oauthToken;
function onApiLoad() {
	console.log('onApiLoad called');
	gapi.load('auth',{'callback':onAuthApiLoad});
	gapi.load('picker');
}
function onAuthApiLoad() {
	console.log('onAuthApiLoad called');
	window.gapi.auth.authorize({
		'client_id': clientId,
		'scope': ['https://www.googleapis.com/auth/drive']
	}, handleAuthResult);
}
function handleAuthResult(authResult) {
	console.log('handleAuthResult called');
    if(authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        createPicker();
	}
}
function createPicker() {
	console.log('createPicker called');
    var picker = new google.picker.PickerBuilder()
        .setOAuthToken(oauthToken)
		.addView(new google.picker.DocsUploadView())
		.addView(new google.picker.DocsView())
        .setDeveloperKey(developerKey)
        .build();
    picker.setVisible(true);
	console.log('createPicker finished');
}